import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateIngredient1630239322954
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ingredient',
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
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'ingredient_group_id',
            type: 'varchar',
          },
          {
            name: 'unit_id',
            type: 'varchar',
          },
          {
            name: 'purchase_price',
            type: 'number',
          },
          {
            name: 'unit_price',
            type: 'number',
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

    await queryRunner.createForeignKey(
      'ingredient',
      new TableForeignKey({
        name: 'IngredientGroupFK',
        columnNames: ['ingredient_group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ingredient_group',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ingredient',
      new TableForeignKey({
        name: 'UnitFK',
        columnNames: ['unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'unit',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ingredient', 'IngredientFK');
    await queryRunner.dropForeignKey('ingredient', 'UnitFK');
    await queryRunner.dropTable('ingredient');
  }
}
