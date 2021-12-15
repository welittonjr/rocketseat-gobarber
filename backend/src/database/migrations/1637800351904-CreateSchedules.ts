import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
            name: 'provider',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('schedules')
  }

}
