using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SurveyScrubAPI.Migrations
{
    public partial class SurveyResults : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SurveyResults",
                columns: table => new
                {
                    InstanceId = table.Column<Guid>(nullable: false),
                    SurveyId = table.Column<Guid>(nullable: false),
                    Question = table.Column<string>(nullable: true),
                    Answer = table.Column<string>(nullable: true),
                    Datetime = table.Column<DateTime>(nullable: false),
                    Time = table.Column<int>(nullable: false),
                    Placing = table.Column<int>(nullable: false),
                    QuestionWordCount = table.Column<int>(nullable: false),
                    IsFraud = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyResults", x => x.InstanceId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurveyResults");
        }
    }
}
