import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddUserIdToAnggotas extends BaseSchema {
  protected tableName = 'anggotas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .unique()
        .after('id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
    })
  }
}
