import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Halaman Home bisa bebas diakses
router.on('/').render('pages/home')

// Auth routes
router.get('/login', '#controllers/auth_controller.showLogin')
router.post('/login', '#controllers/auth_controller.login')
router.get('/register', '#controllers/auth_controller.showRegister')
router.post('/register', '#controllers/auth_controller.register')
router.get('/logout', '#controllers/auth_controller.logout')

// Middleware khusus admin
router.group(() => {
  router.get('/admin', '#controllers/admin_controller.index')
  router.resource('buku', '#controllers/bukus_controller')
  router.resource('anggota', '#controllers/anggotas_controller')
  router.resource('peminjaman', '#controllers/peminjamans_controller')
  router.resource('kategori', '#controllers/kategoris_controller')
  router.resource('rak', '#controllers/raks_controller')
  router.post('/peminjaman/:id/return', '#controllers/peminjamans_controller.returnPeminjaman')
}).use([middleware.auth(), middleware.admin()])

// 🔐 Middleware user login (non-admin)
router.group(() => {
  // 📖 Dashboard User
  router.get('/dashboard', '#controllers/users_controller.dashboard').use(middleware.auth())
  // 📚 Lihat daftar buku
  router.get('/buku-user', '#controllers/users_controller.daftarBuku')
  // 📥 Pinjam buku
  router.post('/buku-user/:id/pinjam', '#controllers/users_controller.pinjamBuku')
  // 📖 Riwayat peminjaman
  router.get('/riwayat', '#controllers/users_controller.riwayatPeminjaman')
  // 🔁 Kembalikan buku
  router.post('/kembalikan/:id', '#controllers/users_controller.kembalikanBuku')
}).use(middleware.auth())
