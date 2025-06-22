/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'peminjamen'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('buku_id')
        .unsigned()
        .references('id')
        .inTable('bukus')
        .onDelete('CASCADE')

      table
        .integer('anggota_id')
        .unsigned()
        .references('id')
        .inTable('anggotas')
        .onDelete('CASCADE')

      table.date('tanggal_pinjam').notNullable()
      table.date('tanggal_kembali')
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}