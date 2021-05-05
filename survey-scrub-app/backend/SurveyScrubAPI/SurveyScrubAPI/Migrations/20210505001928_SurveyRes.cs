using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SurveyScrubAPI.Migrations
{
    public partial class SurveyRes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SurveyResults",
                table: "SurveyResults");

            migrationBuilder.DropColumn(
                name: "Answer",
                table: "SurveyResults");

            migrationBuilder.DropColumn(
                name: "Datetime",
                table: "SurveyResults");

            migrationBuilder.DropColumn(
                name: "Placing",
                table: "SurveyResults");

            migrationBuilder.DropColumn(
                name: "Question",
                table: "SurveyResults");

            migrationBuilder.DropColumn(
                name: "QuestionWordCount",
                table: "SurveyResults");

            migrationBuilder.DropColumn(
                name: "SurveyId",
                table: "SurveyResults");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "SurveyResults");

            migrationBuilder.AddColumn<Guid>(
                name: "CompletionInstance",
                table: "SurveyResults",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_SurveyResults",
                table: "SurveyResults",
                column: "CompletionInstance");

            migrationBuilder.CreateTable(
                name: "SurveyQuestionResults",
                columns: table => new
                {
                    InstanceId = table.Column<Guid>(nullable: false),
                    SurveyId = table.Column<Guid>(nullable: false),
                    CompletionInstance = table.Column<Guid>(nullable: false),
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
                    table.PrimaryKey("PK_SurveyQuestionResults", x => x.InstanceId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurveyQuestionResults");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SurveyResults",
                table: "SurveyResults");

            migrationBuilder.DropColumn(
                name: "CompletionInstance",
                table: "SurveyResults");

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                table: "SurveyResults",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Datetime",
                table: "SurveyResults",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Placing",
                table: "SurveyResults",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Question",
                table: "SurveyResults",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuestionWordCount",
                table: "SurveyResults",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "SurveyId",
                table: "SurveyResults",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Time",
                table: "SurveyResults",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SurveyResults",
                table: "SurveyResults",
                column: "InstanceId");
        }
    }
}
