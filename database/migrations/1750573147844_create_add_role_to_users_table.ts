import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up () {
    this.schema.alterTable('users', (table) => {
      table.string('role').defaultTo('user') // default = user
    })
  }

  async down () {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('role')
    })
  }
}