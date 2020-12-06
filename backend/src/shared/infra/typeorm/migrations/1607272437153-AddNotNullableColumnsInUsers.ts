import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export default class AddNotNullableColumnsInUsers1607272437153
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('users', [
      {
        oldColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
          isNullable: false,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'email',
          type: 'varchar',
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: 'email',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'password',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'password',
          type: 'varchar',
          isNullable: false,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
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
      }),
    );
  }
}
