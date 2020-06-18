import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateBackgroundFieldOnUsersTable1592449992108
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'background_id',
        type: 'uuid',
        isNullable: true,
        default: null,
      })
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'UserBackground',
        columnNames: ['background_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'UserBackground');

    await queryRunner.dropColumn('users', 'background_id');
  }
}
