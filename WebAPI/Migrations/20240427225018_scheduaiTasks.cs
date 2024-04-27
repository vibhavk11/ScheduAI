using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class scheduaiTasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduaiTask_Users_UserId",
                table: "ScheduaiTask");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ScheduaiTask",
                table: "ScheduaiTask");

            migrationBuilder.RenameTable(
                name: "ScheduaiTask",
                newName: "ScheduaiTasks");

            migrationBuilder.RenameIndex(
                name: "IX_ScheduaiTask_UserId",
                table: "ScheduaiTasks",
                newName: "IX_ScheduaiTasks_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ScheduaiTasks",
                table: "ScheduaiTasks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduaiTasks_Users_UserId",
                table: "ScheduaiTasks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduaiTasks_Users_UserId",
                table: "ScheduaiTasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ScheduaiTasks",
                table: "ScheduaiTasks");

            migrationBuilder.RenameTable(
                name: "ScheduaiTasks",
                newName: "ScheduaiTask");

            migrationBuilder.RenameIndex(
                name: "IX_ScheduaiTasks_UserId",
                table: "ScheduaiTask",
                newName: "IX_ScheduaiTask_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ScheduaiTask",
                table: "ScheduaiTask",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduaiTask_Users_UserId",
                table: "ScheduaiTask",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
