import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bukus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('judul').notNullable()
      table.string('penulis').notNullable()
      table.integer('tahun_terbit').notNullable()

      table
        .integer('kategori_id')
        .unsigned()
        .references('id')
        .inTable('kategoris')
        .onDelete('CASCADE')

      table
        .integer('rak_id')
        .unsigned()
        .references('id')
        .inTable('raks')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
