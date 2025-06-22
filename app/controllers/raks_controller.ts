import type { HttpContext } from '@adonisjs/core/http'
import Rak from '#models/rak'

export default class RaksController {
  async index({ view }: HttpContext) {
    const raks = (await Rak.query().orderBy('id', 'asc')).map((r) => r.toJSON())
    return view.render('rak/index', { raks })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['kode_rak', 'lokasi'])
    const rak = await Rak.create(data)
    return response.status(201).json({ message: 'Rak ditambahkan!', rak })
  }

  async update({ request, params, response }: HttpContext) {
    const data = request.only(['kodeRak', 'lokasi'])
    const rak = await Rak.findOrFail(params.id)
    rak.merge(data)
    await rak.save()
    return response.json({ message: 'Rak diperbarui!', rak })
  }

  async destroy({ params, response }: HttpContext) {
    const rak = await Rak.findOrFail(params.id)
    await rak.delete()
    return response.json({ message: 'Rak dihapus!' })
  }
}