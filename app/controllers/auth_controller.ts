import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Anggota from '#models/anggota'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  public async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  public async register({ request, response, session }: HttpContext) {
    const { email, password, nama, nim, alamat, no_hp } = request.only([
      'email', 'password', 'nama', 'nim', 'alamat', 'no_hp'
    ])

    try {
      const user = await User.create({
        email,
        password,
        fullName: nama, // ⬅️ pake dari input nama
        role: 'user',
      })

      await Anggota.create({
        userId: user.id,
        nama, // ⬅️ sama juga
        nim,
        alamat,
        no_hp,
      })

      session.flash('success', 'Pendaftaran berhasil! Silakan login.')
      return response.redirect('/login')
    } catch {
      session.flash('errors', { register: 'Gagal register, cek input Anda.' })
      return response.redirect().back()
    }
  }

  public async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.findBy('email', email)
      if (!user || !(await hash.verify(user.password, password))) {
        throw new Error('Invalid credentials')
      }

      await auth.use('web').login(user)

      // Cek role, redirect sesuai role
      if (user.role === 'admin') {
        return response.redirect('/admin')
      } else {
        return response.redirect('/dashboard') // atau halaman user biasa
      }

    } catch {
      session.flash('errors', { login: 'Email atau password salah' })
      return response.redirect().back()
    }
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}