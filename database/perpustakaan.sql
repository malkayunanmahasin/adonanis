-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Jun 2025 pada 10.22
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(2, 'database/migrations/01_create_kategoris_table', 1, '2025-06-21 09:02:48'),
(3, 'database/migrations/02_create_raks_table', 1, '2025-06-21 09:02:48'),
(4, 'database/migrations/03_create_bukus_table', 1, '2025-06-21 09:02:48'),
(5, 'database/migrations/04_create_anggotas_table', 1, '2025-06-21 09:02:48'),
(6, 'database/migrations/05_create_peminjamen_table', 1, '2025-06-21 09:02:48'),
(7, 'database/migrations/1750492494154_create_users_table', 1, '2025-06-21 09:02:48'),
(8, 'database/migrations/1750571981285_create_add_user_id_to_anggotas_table', 2, '2025-06-22 06:00:38'),
(9, 'database/migrations/1750573147844_create_add_role_to_users_table', 3, '2025-06-22 06:19:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `adonis_schema_versions`
--

CREATE TABLE `adonis_schema_versions` (
  `version` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `adonis_schema_versions`
--

INSERT INTO `adonis_schema_versions` (`version`) VALUES
(2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `anggotas`
--

CREATE TABLE `anggotas` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  `nim` varchar(255) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `no_hp` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `anggotas`
--

INSERT INTO `anggotas` (`id`, `user_id`, `nama`, `nim`, `alamat`, `no_hp`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Andi Setiawan', '220101', 'Jl. Merpati No. 12', '081234567890', '2025-06-22 05:34:43', '2025-06-21 23:36:53'),
(2, NULL, 'Budi Santoso', '220102', 'Jl. Kenari No. 5', '082345678901', '2025-06-22 05:34:43', '2025-06-22 05:34:43'),
(3, NULL, 'Citra Lestari', '220103', 'Jl. Anggrek No. 9', '083456789012', '2025-06-22 05:34:43', '2025-06-22 05:34:43'),
(4, NULL, 'Dewi Amelia', '220104', 'Jl. Melati No. 21', '084567890123', '2025-06-22 05:34:43', '2025-06-22 05:34:43'),
(5, NULL, 'Eka Pratama', '220105', 'Jl. Kamboja No. 7', '085678901234', '2025-06-22 05:34:43', '2025-06-22 05:34:43'),
(7, 1, 'Admin Perpustakaan', '000001', 'Kantor Pusat', '08123456789', '2025-06-22 06:13:24', '2025-06-22 06:13:24'),
(8, 2, 'Jamaludin', '123456', 'Jl. Jalan 123', '087654321', '2025-06-22 06:28:45', '2025-06-22 06:28:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bukus`
--

CREATE TABLE `bukus` (
  `id` int(10) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `penulis` varchar(255) NOT NULL,
  `tahun_terbit` int(11) NOT NULL,
  `kategori_id` int(10) UNSIGNED DEFAULT NULL,
  `rak_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `bukus`
--

INSERT INTO `bukus` (`id`, `judul`, `penulis`, `tahun_terbit`, `kategori_id`, `rak_id`, `created_at`, `updated_at`) VALUES
(1, 'Belajar JavaScript', 'Andi Prasetyo', 2020, 1, 1, '2025-06-22 03:55:07', '2025-06-22 03:55:07'),
(2, 'Misteri Hutan Gelap', 'Rina Wulandari', 2019, 2, 2, '2025-06-22 03:55:07', '2025-06-22 03:55:07'),
(3, 'Dunia Fisika', 'Budi Santosa', 2021, 3, 3, '2025-06-22 03:55:07', '2025-06-22 06:21:23'),
(4, 'Napoleon: Sang Jenderal', 'Agus Hermawan', 2018, 4, 4, '2025-06-22 03:55:07', '2025-06-22 03:55:07'),
(5, 'Psikologi Remaja', 'Dewi Lestari', 2022, 5, 5, '2025-06-22 03:55:07', '2025-06-21 22:08:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategoris`
--

CREATE TABLE `kategoris` (
  `id` int(10) UNSIGNED NOT NULL,
  `nama_kategori` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kategoris`
--

INSERT INTO `kategoris` (`id`, `nama_kategori`, `created_at`, `updated_at`) VALUES
(1, 'Teknologi', NULL, NULL),
(2, 'Fiksi', NULL, NULL),
(3, 'Sains', NULL, NULL),
(4, 'Sejarah', NULL, NULL),
(5, 'Psikologi', NULL, '2025-06-21 14:29:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjamen`
--

CREATE TABLE `peminjamen` (
  `id` int(10) UNSIGNED NOT NULL,
  `buku_id` int(10) UNSIGNED DEFAULT NULL,
  `anggota_id` int(10) UNSIGNED DEFAULT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_kembali` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `peminjamen`
--

INSERT INTO `peminjamen` (`id`, `buku_id`, `anggota_id`, `tanggal_pinjam`, `tanggal_kembali`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-06-01', '2025-06-08', '2025-06-22 07:09:06', '2025-06-22 07:09:06'),
(2, 2, 1, '2025-06-10', '2025-06-17', '2025-06-22 07:09:06', '2025-06-22 07:09:06'),
(3, 1, 1, '2025-06-15', NULL, '2025-06-22 07:09:06', '2025-06-22 07:09:06'),
(4, 3, 2, '2025-06-02', '2025-06-09', '2025-06-22 07:09:06', '2025-06-22 07:09:06'),
(5, 4, 2, '2025-06-05', '2025-06-12', '2025-06-22 07:09:06', '2025-06-22 07:09:06'),
(6, 5, 2, '2025-06-08', '2025-06-15', '2025-06-22 07:09:06', '2025-06-22 07:09:06'),
(7, 2, 3, '2025-06-20', NULL, '2025-06-22 07:09:06', '2025-06-22 00:26:23'),
(8, 1, 4, '2025-06-12', '2025-06-19', '2025-06-22 07:09:06', '2025-06-22 07:09:06'),
(9, 3, 5, '2025-06-01', '2025-06-08', '2025-06-22 07:09:06', '2025-06-22 07:09:06'),
(10, 4, 5, '2025-06-21', NULL, '2025-06-22 07:09:06', '2025-06-22 07:09:06'),
(12, 1, 8, '2025-06-22', '2025-06-22', '2025-06-22 07:34:51', '2025-06-22 07:34:59'),
(13, 1, 8, '2025-06-22', '2025-06-22', '2025-06-22 07:35:01', '2025-06-22 07:35:05'),
(14, 4, 8, '2025-06-22', '2025-06-22', '2025-06-22 07:41:16', '2025-06-22 07:41:22'),
(15, 1, 8, '2025-06-22', NULL, '2025-06-22 07:52:11', '2025-06-22 07:52:11'),
(16, 3, 8, '2025-06-22', NULL, '2025-06-22 07:52:19', '2025-06-22 07:52:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `raks`
--

CREATE TABLE `raks` (
  `id` int(10) UNSIGNED NOT NULL,
  `kode_rak` varchar(255) NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `raks`
--

INSERT INTO `raks` (`id`, `kode_rak`, `lokasi`, `created_at`, `updated_at`) VALUES
(1, 'RAK-A1', 'Lantai 1 - Sisi Kanan', NULL, NULL),
(2, 'RAK-A2', 'Lantai 1 - Sisi Kiri', NULL, NULL),
(3, 'RAK-B1', 'Lantai 2 - Tengah', NULL, NULL),
(4, 'RAK-C1', 'Lantai 3 - Belakang', NULL, NULL),
(5, 'RAK-D1', 'Ruang Referensi', NULL, '2025-06-21 20:46:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Admin', 'admin@mail.com', '$scrypt$n=16384,r=8,p=1$lhBh0PtWV8HT/OsM27gnog$Q0y/EtP3tnmruNGFRdAObCBs9RXBj6uSrXoxHJWKn3FRw6cEotKPRfFqMTjfWrxl9SB+F28dqjwGFKqWe2SbIA', '2025-06-22 06:20:20', '2025-06-21 23:13:24', 'admin'),
(2, 'Jamaludin', 'jamaludin@gmail.com', '$scrypt$n=16384,r=8,p=1$F3xLXXgDtGFu9PRGaUPgLw$q3J7lEPEGdEWvK14yWSmOEh9WDTP1XlRGjgDolMZf5wgDcj2ACXMKGXihlpvpL7ScMnlHiN5WoQxIfaYfbSiMQ', '2025-06-21 23:28:45', '2025-06-21 23:28:45', 'user');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `adonis_schema_versions`
--
ALTER TABLE `adonis_schema_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indeks untuk tabel `anggotas`
--
ALTER TABLE `anggotas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `anggotas_nim_unique` (`nim`),
  ADD UNIQUE KEY `anggotas_user_id_unique` (`user_id`);

--
-- Indeks untuk tabel `bukus`
--
ALTER TABLE `bukus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bukus_kategori_id_foreign` (`kategori_id`),
  ADD KEY `bukus_rak_id_foreign` (`rak_id`);

--
-- Indeks untuk tabel `kategoris`
--
ALTER TABLE `kategoris`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `peminjamen`
--
ALTER TABLE `peminjamen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `peminjamen_buku_id_foreign` (`buku_id`),
  ADD KEY `peminjamen_anggota_id_foreign` (`anggota_id`);

--
-- Indeks untuk tabel `raks`
--
ALTER TABLE `raks`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `anggotas`
--
ALTER TABLE `anggotas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `bukus`
--
ALTER TABLE `bukus`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `kategoris`
--
ALTER TABLE `kategoris`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `peminjamen`
--
ALTER TABLE `peminjamen`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `raks`
--
ALTER TABLE `raks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `anggotas`
--
ALTER TABLE `anggotas`
  ADD CONSTRAINT `anggotas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `bukus`
--
ALTER TABLE `bukus`
  ADD CONSTRAINT `bukus_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `kategoris` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bukus_rak_id_foreign` FOREIGN KEY (`rak_id`) REFERENCES `raks` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `peminjamen`
--
ALTER TABLE `peminjamen`
  ADD CONSTRAINT `peminjamen_anggota_id_foreign` FOREIGN KEY (`anggota_id`) REFERENCES `anggotas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `peminjamen_buku_id_foreign` FOREIGN KEY (`buku_id`) REFERENCES `bukus` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
