using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class scheduaiTasksUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "ScheduaiTasks");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "ScheduaiTasks");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "ScheduaiTasks");

            migrationBuilder.AddColumn<int>(
                name: "DueTime",
                table: "ScheduaiTasks",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EndTime",
                table: "ScheduaiTasks",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StartTime",
                table: "ScheduaiTasks",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueTime",
                table: "ScheduaiTasks");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "ScheduaiTasks");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "ScheduaiTasks");

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "ScheduaiTasks",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "ScheduaiTasks",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "ScheduaiTasks",
                type: "timestamp with time zone",
                nullable: true);
        }
    }
}
