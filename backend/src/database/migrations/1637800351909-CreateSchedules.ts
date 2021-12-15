import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSchedules1639479663790 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedules',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'provider_id',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: false
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
        ]
      })
    )

    await queryRunner.createForeignKey(
      'schedules',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      })
    )
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('schedules');
  }

}
