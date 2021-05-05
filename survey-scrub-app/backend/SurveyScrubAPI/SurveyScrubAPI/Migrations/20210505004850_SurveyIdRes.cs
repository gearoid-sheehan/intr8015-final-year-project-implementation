using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SurveyScrubAPI.Migrations
{
    public partial class SurveyIdRes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SurveyId",
                table: "SurveyResults",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SurveyId",
                table: "SurveyResults");
        }
    }
}
