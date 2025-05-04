import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddExpenseMonthSharePersonTable1742954114730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
          name: 'expenses_month_share_people',
          columns: [
              {
                  name: 'id',
                  type: "serial4",
                  isPrimary: true,
                  generationStrategy: 'increment'
              },
              {
                  name: 'expense_month_id',
                  type: 'uuid',
                  isNullable: false
              },
              {
                  name: 'share_expense_person_id',
                  type: 'integer',
                  isNullable: false
              },
              {
                  name: 'amount',
                  type: 'float4',
                  isNullable: false
              },
              {
                  name: 'is_paid',
                  type: 'boolean',
                  default: false
              },
              {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()'
              },
              {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()'
              }
          ],
          foreignKeys: [
            {
              name: 'fk_expenses_month_id',
              columnNames: ['expense_month_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'expenses-month',
              onDelete: 'CASCADE'
            },
            {
              name: 'fk_share_expense_person_id',
              columnNames: ['share_expense_person_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'share_expense_people',
              onDelete: 'CASCADE'
            }
          ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('expenses_month_share_people');
  }
}
