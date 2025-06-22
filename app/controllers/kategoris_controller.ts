import type { HttpContext } from '@adonisjs/core/http'
import Kategori from '#models/kategori'
import { schema } from '@adonisjs/validator'

export default class KategorisController {
  async index({ view }: HttpContext) {
    const kategoris = (await Kategori.query().orderBy('id', 'asc')).map(k => k.toJSON())
    console.log(kategoris)
    return view.render('kategori/index', { kategoris })
  }

  async store({ request, response }: HttpContext) {
    const newKategoriSchema = schema.create({
      nama_kategori: schema.string(),
    })
    const data = await request.validate({ schema: newKategoriSchema })
    const kategori = await Kategori.create(data)
    // AJAX response
    if (request.ajax()) {
      return response.json({ kategori, message: 'Kategori berhasil ditambahkan!' })
    }
    return response.redirect().toRoute('kategori.index')
  }

  async update({ params, request, response }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    const data = await request.validate({
      schema: schema.create({
        nama_kategori: schema.string(),
      }),
    })
    kategori.merge(data)
    await kategori.save()
    if (request.ajax()) {
      return response.json({ kategori, message: 'Kategori berhasil diperbarui!' })
    }
    return response.redirect().toRoute('kategori.index')
  }

  async destroy({ params, request, response }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    await kategori.delete()
    if (request.ajax()) {
      return response.json({ message: 'Kategori berhasil dihapus!' })
    }
    return response.redirect().toRoute('kategori.index')
  }
}