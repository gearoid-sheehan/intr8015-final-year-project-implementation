using Microsoft.EntityFrameworkCore.Migrations;

namespace SurveyScrubAPI.Migrations
{
    public partial class ThurdayMigr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FraudRate",
                table: "Surveys",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FraudRate",
                table: "Surveys");
        }
    }
}
