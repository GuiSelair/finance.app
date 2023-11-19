import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddIsRecurringColumnInExpensesTable1700433537854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'expenses',
          new TableColumn({
            name: 'is_recurring',
            type: 'boolean',
            isNullable: false,
            default: false,
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('expenses', 'is_recurring');
    }

}
