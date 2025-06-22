import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Buku from './buku.js'
import Anggota from './anggota.js'

export default class Peminjaman extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bukuId: number

  @column()
  declare anggotaId: number

  @column.date()
  declare tanggal_pinjam: DateTime

  @column.date()
  declare tanggal_kembali: DateTime

  @belongsTo(() => Buku)
  declare buku: BelongsTo<typeof Buku>

  @belongsTo(() => Anggota)
  declare anggota: BelongsTo<typeof Anggota>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
