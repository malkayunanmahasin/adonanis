import type { HttpContext } from '@adonisjs/core/http'
import Buku from '#models/buku'
import Anggota from '#models/anggota'
import Peminjaman from '#models/peminjaman'
import Kategori from '#models/kategori'
import { DateTime } from 'luxon'

export default class AdminController {
  public async index({ view }: HttpContext) {
    const totalBuku = await Buku.query().count('* as count').first()
    const totalAnggota = await Anggota.query().count('* as count').first()
    const totalPeminjaman = await Peminjaman.query().count('* as count').first()
    const totalKategori = await Kategori.query().count('* as count').first()

    const totalDipinjam = await Peminjaman.query().whereNull('tanggal_kembali').count('* as count').first()

    const peminjamanTerbaru = await Peminjaman
      .query()
      .preload('anggota')
      .preload('buku')
      .orderBy('tanggal_pinjam', 'desc')
      .limit(5)

    // Grafik Peminjaman per Bulan (12 bulan terakhir)
    const now = DateTime.local()
    const start = now.minus({ months: 11 }).startOf('month')
    const labelsBulan: string[] = []
    const dataPeminjaman: number[] = []

    for (let i = 0; i < 12; i++) {
        const month = start.plus({ months: i })
        const label = month.toFormat('MMM yyyy') // contoh: Jun 2024
        const monthStr = month.toFormat('yyyy-MM') // contoh: 2024-06

        const count = await Peminjaman
            .query()
            .whereRaw('DATE_FORMAT(tanggal_pinjam, "%Y-%m") = ?', [monthStr])
            .count('* as count')
            .first()

        labelsBulan.push(label)
        dataPeminjaman.push(Number(count?.$extras.count || 0))
    }

    // Grafik Pie Kategori
    const kategoriList = await Kategori.query().preload('bukus')
    const labelsKategori = kategoriList.map(k => k.nama_kategori)
    const dataKategori = kategoriList.map(k => k.bukus.length)

    return view.render('admin/index', {
      totalBuku: totalBuku?.$extras.count || 0,
      totalAnggota: totalAnggota?.$extras.count || 0,
      totalPeminjaman: totalPeminjaman?.$extras.count || 0,
      totalKategori: totalKategori?.$extras.count || 0,
      totalDipinjam: totalDipinjam?.$extras.count || 0,
      peminjamanTerbaru,
      labelsBulan: JSON.stringify(labelsBulan),
      dataPeminjaman: JSON.stringify(dataPeminjaman),
      labelsKategori: JSON.stringify(labelsKategori),
      dataKategori: JSON.stringify(dataKategori),
    })
  }
}
