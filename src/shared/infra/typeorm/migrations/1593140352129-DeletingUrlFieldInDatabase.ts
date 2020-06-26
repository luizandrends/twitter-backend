import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DeletingUrlFieldInDatabase1593140352129
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('files', 'url');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'url',
        type: 'varchar',
      })
    );
  }
}
