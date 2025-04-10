import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameExpenseMonthTableToUseUnderscore1744248744899 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('expenses-month', 'expenses_month');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('expenses_month', 'expenses-month');
    }
}
