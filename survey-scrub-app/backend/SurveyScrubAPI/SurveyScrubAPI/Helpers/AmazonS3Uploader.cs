using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using System.IO;
using Amazon.S3.Model;
using Amazon.Runtime;
using Microsoft.AspNetCore.Http;

namespace SurveyScrubAPI.Helpers
{
    public class AmazonS3Uploader
    {
        public async Task UploadFileAsync(IFormFile file, string newFilename)
        {
            var credentials = new BasicAWSCredentials("AKIAIRQ7TSVMGCEGJDNQ", "uFxYkrrGjIc5ni334omoBs1SJ6rTOi+PtguQ6NlE");
            var config = new AmazonS3Config
            {
                RegionEndpoint = Amazon.RegionEndpoint.EUWest1
            };

            using var client = new AmazonS3Client(credentials, config);

            await using var newMemoryStream = new MemoryStream();
            file.CopyTo(newMemoryStream);

            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = newMemoryStream,
                Key = newFilename,
                BucketName = "survey-scrub-xml-files",
                CannedACL = S3CannedACL.PublicRead
            };

            var fileTransferUtility = new TransferUtility(client);
            await fileTransferUtility.UploadAsync(uploadRequest);
        }

        public async Task<MemoryStream> GetObjectFromS3Async(string surveyid)
        {
            string bucketname = "survey-scrub-xml-files";

            try
            {
                var request = new GetObjectRequest()
                {
                    BucketName = bucketname,
                    Key = surveyid
                };

                var credentials = new BasicAWSCredentials("AKIAIRQ7TSVMGCEGJDNQ", "uFxYkrrGjIc5ni334omoBs1SJ6rTOi+PtguQ6NlE");
                var config = new AmazonS3Config
                {
                    RegionEndpoint = Amazon.RegionEndpoint.EUWest1
                };

                var client = new AmazonS3Client(credentials, config);

                GetObjectResponse response = await client.GetObjectAsync(request);
                MemoryStream memoryStream = new MemoryStream();

                using (Stream responseStream = response.ResponseStream)
                {
                    responseStream.CopyTo(memoryStream);
                }

                return memoryStream;
            }

            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}