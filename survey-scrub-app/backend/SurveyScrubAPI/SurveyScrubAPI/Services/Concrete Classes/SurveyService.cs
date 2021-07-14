using AutoMapper;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using SurveyScrubAPI.DTO;
using SurveyScrubAPI.Helpers;
using SurveyScrubAPI.Models;
using SurveyScrubAPI.Repositories.Interfaces;
using SurveyScrubAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using static SurveyScrubAPI.DTO.AnsweredQuestions;
using static SurveyScrubAPI.DTO.CompletedSurveyDto;
using static SurveyScrubAPI.DTO.StackedChartData;

namespace SurveyScrubAPI.Services.Concrete_Classes
{
    public class SurveyService: ISurveyService
    {
        private readonly ISurveyRepository _surveyRepository;
        private readonly IMapper _mapper;

        public SurveyService(ISurveyRepository surveyRepository, IMapper mapper)
        {
            _surveyRepository = surveyRepository;
            _mapper = mapper;
        }

        public async Task<bool> CreateNewSurvey(SurveyDto surveyDto)
        {
            var S3FilenameGuid = Guid.NewGuid();

            Survey survey = new Survey
            {
                SurveyName = surveyDto.surveyName,
                StartDate = surveyDto.startDate,
                EndDate = surveyDto.endDate,
                S3Filename = S3FilenameGuid,
                CompanyId = new Guid(surveyDto.companyId),
                AllowedFraudRate = surveyDto.allowedFraudRate,
                SurveyDescription = surveyDto.surveyDescription
            };

            var file = surveyDto.file;
            string newFilename = survey.S3Filename.ToString() + ".xlsx";

            AmazonS3Uploader amazonS3Uploader = new AmazonS3Uploader();
            await amazonS3Uploader.UploadFileAsync(file, newFilename);

            return await _surveyRepository.CreateNewSurvey(survey);
        }

        public async Task<IEnumerable<Survey>> GetAllSurveys(Guid companyId)
        {
            var listOfSurveys = await _surveyRepository.GetAllSurveys(companyId);
            return listOfSurveys;
        }

        public async Task<QuestionsDto> GetSurvey(Guid surveyId)
        {
            var survey = await _surveyRepository.GetSurvey(surveyId);

            AmazonS3Uploader amazonS3Uploader = new AmazonS3Uploader();

            var surveyFilename = surveyId.ToString() + ".xlsx";

            var stream = await amazonS3Uploader.GetObjectFromS3Async(surveyFilename);
            XLWorkbook wb = new XLWorkbook(stream, XLEventTracking.Disabled);
            IXLWorksheet workSheet = wb.Worksheet(1);
            
            QuestionsDto surveyQuestions = new QuestionsDto();
            surveyQuestions.surveyId = surveyId.ToString();
            surveyQuestions.surveyName = survey.SurveyName;
            surveyQuestions.surveyDescription = survey.SurveyDescription;
            surveyQuestions.endDate = survey.EndDate;

            List<QuestionsAnswersDto> surveyQuestionsAnswers = new List<QuestionsAnswersDto>();

            foreach (IXLRow row in workSheet.Rows())
            {
                bool isQuestion = true;

                QuestionsAnswersDto questionsAnswers = new QuestionsAnswersDto();
                List<string> answers = new List<string>();

                foreach (IXLCell cell in row.Cells())
                {

                    if (isQuestion == true)
                    {
                        questionsAnswers.question = cell.Value.ToString();
                        isQuestion = false;
                    }
                    else
                    {
                        answers.Add(cell.Value.ToString());
                    }
                }

                questionsAnswers.answers = answers;
                surveyQuestionsAnswers.Add(questionsAnswers);
            }

            surveyQuestions.surveyQuestions = surveyQuestionsAnswers;

            return surveyQuestions;
        }
        public async Task<QuestionsDto> PostSurvey(CompletedSurveyDto completedSurvey)
        {

            DataTable dt = new DataTable
            {
                TableName = "tableone.xlsx"
            };

            dt.Columns.Add("datetime", typeof(int));
            dt.Columns.Add("length_time", typeof(int));
            dt.Columns.Add("placing", typeof(int));
            dt.Columns.Add("q_word_count", typeof(int));

            foreach(var question in completedSurvey.surveyQuestions)
            {
                DataRow dr = dt.NewRow();
                long unixTime = ((DateTimeOffset)question.datetime).ToUnixTimeSeconds();

                dr[0] = unixTime;
                dr[1] = question.time;
                dr[2] = question.placing;
                dr[3] = question.questionWordCount;

                dt.Rows.Add(dr);
            }

            dt.AcceptChanges();

            var stream = new MemoryStream();

            string filename = "completedsurvey.xlsx";

            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.Worksheets.Add(dt);
                using (stream)
                {
                    wb.SaveAs(stream);
                }
            }

            //URL for Flask application where Keras ML model is located
            string apiUrl = "http://127.0.0.1:5001/postcsv";

            HttpClient client = new HttpClient();

            //Prepare request header
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
            client.DefaultRequestHeaders.Add("Api-Key", "xxxyyyzzz");

            //cache
            CacheControlHeaderValue cacheControl = new CacheControlHeaderValue
            {
                NoCache = true
            };

            client.DefaultRequestHeaders.CacheControl = cacheControl;

            byte[] bytes = stream.ToArray();
            HttpContent fileContent = new ByteArrayContent(bytes);
            fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

            List<ProcessedQuestions> processedQuestions = new List<ProcessedQuestions>();

            try { 

                var response = await client.PostAsync(apiUrl, new MultipartFormDataContent
                {
                    {fileContent, "\"file\"", "\"" + filename +"\""}
                });

                var responseJSONString = await response.Content.ReadAsStringAsync();
                processedQuestions = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ProcessedQuestions>>(responseJSONString);

            }

            catch (Exception ex)
            {
                string message = ex.Message;
                Console.WriteLine(message); ;
            }

            int count = 0;
            int fraudCount = 0;
            bool isSurveyFraud = false;

            int fraudPercentage = 0;

            Guid completionInstance = Guid.NewGuid();

            foreach (CompletedQuestions questions in completedSurvey.surveyQuestions)
            {

                SurveyQuestionResults surveyQuestionResults = new SurveyQuestionResults
                {
                    InstanceId = new Guid(),
                    CompletionInstance = completionInstance,
                    SurveyId = completedSurvey.surveyId,
                    Question = questions.question,
                    Answer = questions.answer,
                    Datetime = questions.datetime,
                    Time = questions.time,
                    Placing = questions.placing,
                    QuestionWordCount = questions.questionWordCount,
                    IsFraud = Convert.ToBoolean(Convert.ToInt16(processedQuestions[count].is_fraud))
                };

                if (processedQuestions[count].is_fraud == 1)
                {
                    fraudCount++;
                }

                count++;

                await _surveyRepository.SaveSurveyQuestionResults(surveyQuestionResults);
            }

            if (fraudCount > count/fraudPercentage)
            {
                isSurveyFraud = true;
            }

            SurveyResults surveyResults = new SurveyResults
            {
                InstanceId = Guid.NewGuid(),
                SurveyId = completedSurvey.surveyId,
                CompletionInstance = completionInstance,
                IsFraud = isSurveyFraud
            };

            await _surveyRepository.SaveSurveyResults(surveyResults);

            QuestionsDto surveyQuestions = new QuestionsDto();
            return surveyQuestions;
        }

        public async Task<StackedChartData> GetChartData(Guid surveyId)
        {
            var surveyQuestionResults = await _surveyRepository.GetChartData(surveyId);

            var survey =  GetSurvey(surveyId).Result;

            List<AnsweredQuestions> listAnsweredQuestions = new List<AnsweredQuestions>();

            StackedChartData stackedChartData = new StackedChartData();
            List<string> catagories = new List<string>();

            //int catagoryCount = 0;

            //foreach (var question in survey.surveyQuestions)
            //{
            //    AnsweredQuestions answeredQuestions = new AnsweredQuestions();
            //    List<CountedAnswers> counts = new List<CountedAnswers>();
            //    answeredQuestions.question = question.question;

            //    List<BarData> barDataList = new List<BarData>();
            //    List<int> data = new List<int>();

            //    foreach (var answer in question.answers)
            //    {
            //        CountedAnswers countedAnswers = new CountedAnswers();
            //        countedAnswers.answer = answer;
            //        countedAnswers.count = 0;

            //        BarData barData = new BarData();

            //        barData.answer = answer;

            //        foreach (var surveyResults in surveyQuestionResults)
            //        {
            //            if (surveyResults.Answer == countedAnswers.answer)
            //            {
            //                countedAnswers.count++;
            //            }
            //        }

            //        counts.Add(countedAnswers);
            //        data.Add(countedAnswers.count);

            //        barData.data = data;
            //        barDataList.Add(barData);

            //    }

            //    answeredQuestions.countedAnswers = counts;

            //    listAnsweredQuestions.Add(answeredQuestions);

            //    stackedChartData.barData = barDataList;

            //    catagoryCount++;

            //    catagories.Add("Question " + catagoryCount.ToString());
                
            //}

            //stackedChartData.catagories = catagories;

            return stackedChartData;
        }
    }
}
