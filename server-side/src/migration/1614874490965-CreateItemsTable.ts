import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateItemsTable1614874490965 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '127',
            isNullable: false,
          },
          {
            name: 'type',
            length: '127',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'category',
            length: '127',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'int',
            length: '20',
            default: 0,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleteAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items');
  }
}
