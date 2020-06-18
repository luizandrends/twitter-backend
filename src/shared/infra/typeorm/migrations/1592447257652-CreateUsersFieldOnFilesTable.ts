import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateUsersFieldOnFilesTable1592447257652
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
        default: null,
      })
    );

    await queryRunner.createForeignKey(
      'files',
      new TableForeignKey({
        name: 'FileUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('files', 'FileUser');

    await queryRunner.dropColumn('files', 'user_id');
  }
}
