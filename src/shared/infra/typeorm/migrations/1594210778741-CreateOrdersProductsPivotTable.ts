import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOrdersProductsPivotTable1594210778741
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            type: 'uuid',
            name: 'order_id',
            isNullable: false,
          },
          {
            type: 'uuid',
            name: 'product_id',
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

    await queryRunner.createForeignKeys('orders_products', [
      new TableForeignKey({
        name: 'orders_products_product_fk',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'orders_products_order_fk',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      'orders_products',
      'orders_products_order_fk',
    );
    await queryRunner.dropForeignKey(
      'orders_products',
      'orders_products_product_fk',
    );

    await queryRunner.dropTable('orders_products');
  }
}
