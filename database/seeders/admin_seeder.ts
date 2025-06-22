import User from '#models/user'
import Anggota from '#models/anggota'

export default class AdminSeeder {
  public async run () {
    const user = await User.create({
      fullName: 'Admin',
      email: 'admin@mail.com',
      password: 'admin123',
    })

    await Anggota.create({
      userId: user.id,
      nama: 'Admin Perpustakaan',
      nim: '000001',
      alamat: 'Kantor Pusat',
      no_hp: '08123456789'
    })
  }
}
