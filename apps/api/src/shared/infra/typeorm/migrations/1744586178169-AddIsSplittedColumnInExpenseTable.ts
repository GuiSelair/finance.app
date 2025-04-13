import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddIsSplittedColumnInExpenseTable1744586178169 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('expenses', new TableColumn({
        name: 'is_splitted',
        type: 'boolean',
        default: false,
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('expenses', 'is_splitted');
    }

}
