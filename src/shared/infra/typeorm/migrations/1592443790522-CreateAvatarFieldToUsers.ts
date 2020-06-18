import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateAvatarFieldToUsers1592443790522
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar_id',
        type: 'uuid',
        isNullable: true,
        default: null,
      })
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'UserAvatar',
        columnNames: ['avatar_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'UserAvatar');

    await queryRunner.dropColumn('users', 'avatar_id');
  }
}
