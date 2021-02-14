import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeColumnDueDateToDueDay1613341230038
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'cards',
      new TableColumn({
        name: 'due_date',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'due_day',
        type: 'integer',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'cards',
      new TableColumn({
        name: 'due_day',
        type: 'integer',
      }),
      new TableColumn({
        name: 'due_date',
        type: 'varchar',
      }),
    );
  }
}
