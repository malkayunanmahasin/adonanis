import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Kategori from './kategori.js'
import Rak from './rak.js'

export default class Buku extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare judul: string

  @column()
  declare penulis: string

  @column()
  declare tahun_terbit: number

  @column()
  declare kategoriId: number

  @column()
  declare rakId: number

  @belongsTo(() => Kategori)
  declare kategori: BelongsTo<typeof Kategori>

  @belongsTo(() => Rak)
  declare rak: BelongsTo<typeof Rak>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
