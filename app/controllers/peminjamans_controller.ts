import type { HttpContext } from '@adonisjs/core/http'
import Peminjaman from '#models/peminjaman'
import Buku from '#models/buku'
import Anggota from '#models/anggota'
import { DateTime } from 'luxon'

export default class PeminjamansController {
  async index({ view }: HttpContext) {
    const peminjamans = await Peminjaman
      .query()
      .preload('buku')
      .preload('anggota')
      .orderBy('created_at', 'desc')

    const bukus = await Buku.all()
    const anggotas = await Anggota.all()

    const sedangDipinjam = peminjamans.filter(p => !p.tanggal_kembali).length

    return view.render('peminjaman/index', {
      peminjamans,
      bukus,
      anggotas,
      sedangDipinjam
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['bukuId', 'anggotaId', 'tanggal_pinjam'])
    const now = DateTime.now()
    const awalBulan = now.startOf('month')
    const akhirBulan = now.endOf('month')

    const count = await Peminjaman.query()
      .where('anggota_id', data.anggotaId)
      .where('buku_id', data.bukuId)
      .whereBetween('tanggal_pinjam', [awalBulan.toISODate(), akhirBulan.toISODate()])
      .count('* as total')

    if (Number(count[0].$extras.total) >= 3) {
      return response.badRequest({ message: 'Buku ini sudah dipinjam maksimal 3 kali oleh anggota tersebut bulan ini.' })
    }

    const peminjaman = await Peminjaman.create(data)
    await peminjaman.load('buku')
    await peminjaman.load('anggota')

    return response.created({ message: 'Peminjaman berhasil ditambahkan', peminjaman })
  }

  async destroy({ params, response }: HttpContext) {
    const peminjaman = await Peminjaman.findOrFail(params.id)
    await peminjaman.delete()
    return response.json({ message: 'Data peminjaman berhasil dihapus' })
  }

  async returnPeminjaman({ params, response }: HttpContext) {
    const peminjaman = await Peminjaman.findOrFail(params.id)
    if (peminjaman.tanggal_kembali) {
      return response.badRequest({ message: 'Buku sudah dikembalikan.' })
    }

    peminjaman.tanggal_kembali = DateTime.now()
    await peminjaman.save()
    return response.json({ message: 'Buku berhasil dikembalikan' })
  }
}
