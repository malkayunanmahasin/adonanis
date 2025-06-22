import type { HttpContext } from '@adonisjs/core/http'
import Buku from '#models/buku'
import Kategori from '#models/kategori'
import Rak from '#models/rak'

export default class BukusController {
  async index({ view }: HttpContext) {
    const bukus = await Buku.query().preload('kategori').preload('rak')
    const kategoris = await Kategori.query().orderBy('id', 'asc')
    const raks = await Rak.query().orderBy('id', 'asc')
    console.log(bukus)
    console.log(kategoris)
    console.log(raks)

    return view.render('buku/index', {
      bukus: bukus.map((b) => ({
        id: b.id,
        judul: b.judul,
        penulis: b.penulis,
        tahunTerbit: b.tahun_terbit,
        kategoriId: b.kategoriId,
        rakId: b.rakId,
        namaKategori: b.kategori.nama_kategori,
        namaRak: b.rak.kode_rak + ' - ' + b.rak.lokasi
      })),
      kategoris,
      raks
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['judul', 'penulis', 'tahunTerbit', 'kategoriId', 'rakId'])

    const buku = await Buku.create({
      judul: data.judul,
      penulis: data.penulis,
      tahun_terbit: data.tahunTerbit,
      kategoriId: data.kategoriId,
      rakId: data.rakId
    })

    return response.ok({ message: 'Buku berhasil ditambahkan!', buku })
  }

  async update({ request, params, response }: HttpContext) {
    const data = request.only(['judul', 'penulis', 'tahunTerbit', 'kategoriId', 'rakId'])
    const buku = await Buku.findOrFail(params.id)

    buku.merge({
      judul: data.judul,
      penulis: data.penulis,
      tahun_terbit: data.tahunTerbit,
      kategoriId: data.kategoriId,
      rakId: data.rakId
    })

    await buku.save()

    return response.ok({ message: 'Buku berhasil diupdate!' })
  }

  async destroy({ params, response }: HttpContext) {
    const buku = await Buku.findOrFail(params.id)
    await buku.delete()

    return response.ok({ message: 'Buku berhasil dihapus!' })
  }
}