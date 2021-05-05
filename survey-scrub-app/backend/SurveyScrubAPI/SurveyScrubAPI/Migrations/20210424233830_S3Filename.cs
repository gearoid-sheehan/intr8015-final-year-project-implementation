using Microsoft.EntityFrameworkCore.Migrations;

namespace SurveyScrubAPI.Migrations
{
    public partial class S3Filename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SurveyDataFile",
                table: "Surveys");

            migrationBuilder.AddColumn<string>(
                name: "S3Filename",
                table: "Surveys",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "S3Filename",
                table: "Surveys");

            migrationBuilder.AddColumn<string>(
                name: "SurveyDataFile",
                table: "Surveys",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
