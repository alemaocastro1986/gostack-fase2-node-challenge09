import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProductsTable1593118517411
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            type: 'varchar',
            name: 'name',
            isUnique: true,
            isNullable: false,
          },
          {
            type: 'integer',
            name: 'quantity',
            isNullable: false,
          },
          {
            type: 'decimal',
            name: 'price',
            scale: 2,
            precision: 5,
            isNullable: false,
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('products');
  }
}
