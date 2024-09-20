import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddYearCollumnInExpenseMonth1662838473511
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'expenses-month',
      new TableColumn({
        name: 'year',
        type: 'int4',
        isNullable: false,
        default: 2022,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('expenses-month', 'year');
  }
}
