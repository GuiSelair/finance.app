import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettingsMonthTable1731979180804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "settings-month",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment"
          },
          {
            name: "key",
            type: "varchar",
          },
          {
            name: "value",
            type: "text"
          },
          {
            name: "user_id",
            type: "uuid"
          },
          {
            name: "month",
            type: "int",
            isNullable: true,
            default: null
          },
          {
            name: "year",
            type: "int",
            isNullable: true,
            default: null
          },
          {
            name: "default",
            type: "boolean",
            default: true,
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: "config_user_fk",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
          }
        ],
        indices: [
          {
            name: 'idx_configurations_user_id_key',
            columnNames: ['key', 'user_id' ],
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("settings-month")
    }

}
