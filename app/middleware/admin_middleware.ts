import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle({ auth, response }: HttpContext, next: () => Promise<void>) {
    const user = auth.use('web').user!

    if (user?.role === 'admin') {
      await next()
    } else {
      return response.unauthorized('Kamu tidak punya akses ke halaman admin.')
    }
  }
}