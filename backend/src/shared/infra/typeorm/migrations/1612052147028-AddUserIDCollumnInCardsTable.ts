import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class AddUserIDCollumnInCardsTable1612052147028
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
      }),
    );

    queryRunner.createForeignKey(
      'cards',
      new TableForeignKey({
        name: 'CardOwner',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey('cards', 'CardOwner');
    queryRunner.dropColumn('cards', 'user_id');
  }
}
