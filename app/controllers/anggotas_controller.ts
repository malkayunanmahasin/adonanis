import type { HttpContext } from '@adonisjs/core/http'
import Anggota from '#models/anggota'

export default class AnggotasController {
  async index({ view }: HttpContext) {
    const anggotas = await Anggota.query().orderBy('id', 'asc')
    return view.render('anggota/index', { anggotas })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nama', 'nim', 'alamat', 'no_hp'])
    const anggota = await Anggota.create(data)
    return response.status(201).json({ message: 'Anggota berhasil ditambahkan', anggota })
  }

  async update({ request, params, response }: HttpContext) {
    const data = request.only(['nama', 'nim', 'alamat', 'no_hp'])
    const anggota = await Anggota.findOrFail(params.id)
    anggota.merge(data)
    await anggota.save()
    return response.json({ message: 'Anggota berhasil diperbarui', anggota })
  }

  async destroy({ params, response }: HttpContext) {
    const anggota = await Anggota.findOrFail(params.id)
    await anggota.delete()
    return response.json({ message: 'Anggota berhasil dihapus' })
  }
}