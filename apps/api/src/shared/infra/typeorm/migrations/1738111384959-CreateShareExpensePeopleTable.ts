import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateShareExpensePeopleTable1738111384959 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "share_expense_people",
        columns: [
          {
            name: "id",
            type: "serial4",
            isPrimary: true,
            generationStrategy: "increment"
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "whatsapp",
            type: "varchar"
          },
          {
            name: "day_to_send_message",
            type: "int"
          },
          {
            name: "user_id",
            type: "uuid"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          }
        ],
        foreignKeys: [
          {
            name: "fk_config_user",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
          }
        ],
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("share_expense_people")
    }

}
