import Anggota from '#models/anggota'
import Buku from '#models/buku'
import Peminjaman from '#models/peminjaman'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class UsersController {
  public async daftarBuku({ view, request, session }: HttpContext) {
    const q = request.input('q', '').trim()
    let bukuQuery = Buku.query().preload('kategori').preload('rak')

    if (q) {
        bukuQuery = bukuQuery.where((query) => {
        query
            .whereILike('judul', `%${q}%`)
            .orWhereILike('penulis', `%${q}%`)
        })
    }

    const bukuList = await bukuQuery
    return view.render('user/daftar_buku', { bukuList, q, session }) // 🔥 ini penting
  }

  // 📥 Pinjam buku (POST)
  public async pinjamBuku({ params, auth, request, response }: HttpContext) {
    try {
      await auth.use('web').check()
      const user = auth.use('web').user!
      const anggota = await Anggota.query().where('userId', user.id).firstOrFail()

      // Validasi maksimal 3x per bulan untuk buku yang sama
      const now = DateTime.local()
      const awalBulan = now.startOf('month').toSQLDate()
      const akhirBulan = now.endOf('month').toSQLDate()
      const jumlahPeminjamanBukuIni = await Peminjaman.query()
        .where('anggota_id', anggota.id)
        .where('buku_id', params.id)
        .whereBetween('tanggal_pinjam', [awalBulan, akhirBulan])
        .count('* as count')
        .first()

      if ((jumlahPeminjamanBukuIni?.$extras.count || 0) >= 3) {
        return response.status(400).json({ success: false, message: 'Anda hanya bisa meminjam buku ini maksimal 3 kali dalam sebulan.' })
      }

      await Peminjaman.create({
        bukuId: params.id,
        anggotaId: anggota.id,
        tanggal_pinjam: now,
      })

      return response.json({ success: true, message: 'Buku berhasil dipinjam!' })
    } catch (error) {
      console.error(error)
      return response.status(400).json({ success: false, message: 'Gagal meminjam buku.' })
    }
  }

  // 🕘 Riwayat peminjaman user
  public async riwayatPeminjaman({ auth, view, session, response }: HttpContext) {
    try {
      const user = auth.use('web').user!
      const anggota = await Anggota.query().where('userId', user.id).firstOrFail()

      const riwayat = await Peminjaman
        .query()
        .where('anggota_id', anggota.id)
        .preload('buku')
        .orderBy('tanggal_pinjam', 'desc')

      return view.render('user/riwayat', { riwayat })
    } catch {
      session.flash('error', 'Data anggota tidak ditemukan.')
      return response.redirect('/')
    }
  }

  // ✅ Kembalikan buku
  public async kembalikanBuku({ params, auth, response, session }: HttpContext) {
    try {
      const user = auth.use('web').user!
      const anggota = await Anggota.query().where('userId', user.id).firstOrFail()

      const peminjaman = await Peminjaman
        .query()
        .where('id', params.id)
        .where('anggota_id', anggota.id)
        .whereNull('tanggal_kembali')
        .firstOrFail()

      peminjaman.tanggal_kembali = DateTime.local()
      await peminjaman.save()

      session.flash('success', 'Buku berhasil dikembalikan.')
    } catch {
      session.flash('error', 'Peminjaman tidak ditemukan atau sudah dikembalikan.')
    }

    return response.redirect('/riwayat')
  }

  // 📊 Statistik peminjaman
  public async statistikPeminjaman({ view }: HttpContext) {
    const totalDipinjam = await Peminjaman.query().whereNull('tanggal_kembali').count('* as count').first()
    return view.render('user/statistik_peminjaman', { totalDipinjam: totalDipinjam?.$extras.count || 0 })
  }

  public async dashboard({ auth, view }: HttpContext) {
    const user = auth.use('web').user!
    const anggota = await Anggota.query().where('userId', user.id).firstOrFail()

    // Buku yang sedang dipinjam (belum dikembalikan)
    const sedangDipinjam = await Peminjaman.query()
      .where('anggota_id', anggota.id)
      .whereNull('tanggal_kembali')
      .count('* as count')
      .first()

    // Total peminjaman bulan ini
    const now = DateTime.local()
    const awalBulan = now.startOf('month').toSQLDate()
    const akhirBulan = now.endOf('month').toSQLDate()
    const totalBulanIni = await Peminjaman.query()
      .where('anggota_id', anggota.id)
      .whereBetween('tanggal_pinjam', [awalBulan, akhirBulan])
      .count('* as count')
      .first()

    return view.render('user/dashboard', {
      user,
      sedangDipinjam: sedangDipinjam?.$extras.count || 0,
      totalBulanIni: totalBulanIni?.$extras.count || 0,
    })
  }
}
