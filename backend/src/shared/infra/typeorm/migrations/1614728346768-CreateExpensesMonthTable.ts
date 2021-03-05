import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateExpensesMonthTable1614728346768
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'expenses-month',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'expense_id',
            type: 'uuid',
          },
          {
            name: 'number_current_of_parcel',
            type: 'integer',
          },
          {
            name: 'number_total_of_parcel',
            type: 'integer',
          },
          {
            name: 'month',
            type: 'integer',
          },
          {
            name: 'value_of_parcel',
            type: 'float',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'expenseMonth',
            columnNames: ['expense_id'],
            referencedTableName: 'expenses',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('expense-month', 'expenseMonth');
    await queryRunner.dropTable('expenses-month');
  }
}
