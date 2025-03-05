import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AddDeletedAtInShareExpensePeopleTable1740619229757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('share_expense_people', new TableColumn({
        name: 'deleted_at',
        type: "timestamp",
        isNullable: true,
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('share_expense_people', 'deleted_at');
    }

}
