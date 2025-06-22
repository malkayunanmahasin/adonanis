import type { HttpContext } from '@adonisjs/core/http'

export default class AuthMiddleware {
  async handle({ auth, response, request }: HttpContext, next: () => Promise<void>) {
    const isLoginPage = ['/login', '/register'].includes(request.url())
    const guard = auth.use('web')

    await guard.check()

    if (!guard.isAuthenticated && !isLoginPage) {
      return response.redirect('/login')
    }

    await next()
  }
}
