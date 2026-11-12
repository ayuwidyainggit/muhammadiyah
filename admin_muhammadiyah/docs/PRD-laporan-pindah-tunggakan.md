# PRD: Laporan Pindah Sekolah & Tunggakan

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| Nama produk / fitur | Laporan Pindah Sekolah & Tunggakan (Laporan Konsolidasi Admin Pusat)        |
| Klien / proyek      | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen       | v0.4                                                                      |
| Status              | Draft                                                                     |
| Penulis             | Tim Produk GeekGarden                                                     |
| Product Owner       | [Nama PO Klien]                                                           |
| Solution Architect  | [Nama SA]                                                                 |
| Tanggal dibuat      | 08-11-2026                                                                |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                   |
| Dokumen terkait     | `laporan-pindah-tunggakan.html`, `app.js`, PRD Manajemen Sekolah, Portal Sekolah (Approval Write-off), Aplikasi Wali Murid (Ajukan Pindah Sekolah) |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                                                                                   |
| ----- | ---------- | --------------------- | ------------------------------------------------------------------------------------------------------------- |
| v0.1  | 08-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `laporan-pindah-tunggakan.html`, bagian dari sidebar baru "Laporan" di Admin Pusat. |
| v0.2  | 08-11-2026 | Tim Produk GeekGarden | Menambahkan fitur Export Laporan (tombol "Export Excel" menghasilkan file **CSV asli**, bukan trik HTML-disamarkan-jadi-`.xls`) berisi dua bagian: ringkasan Daftar Siswa Pindah Sekolah dan Detail Tunggakan per Invoice, menghormati filter status yang aktif. Fitur ini sebelumnya tercatat sebagai Out of Scope/Could-have di v0.1, kini pindah ke In Scope/Must-have. |
| v0.3  | 08-11-2026 | Tim Produk GeekGarden | (1) Menambahkan filter pencarian nama siswa (menyatu dengan filter status pada tabel maupun export); (2) kolom identitas Siswa pada tabel, panel "Lihat Detail", dan export diubah dari Nama+Kelas menjadi **Nama+NIS**, supaya identitas siswa konsisten dengan NIS yang dipakai Portal Sekolah & Aplikasi Wali Murid. |
| v0.4  | 08-11-2026 | Tim Produk GeekGarden | (1) Menambahkan **filter Sekolah** dan **filter Periode** (bulan efektif pindah) pada tabel, statistik, dan export -- periode selalu wajib terisi satu bulan (default periode terbaru), **tidak ada opsi "Semua Periode"**, selaras dengan pola filter periode di Laporan Pemasukan. (2) Menambahkan **pembatasan data berdasarkan cakupan akses pengguna** (Pusat/Wilayah-PWM/Daerah-PDM/Cabang-PCM) memakai field `wilayah`/`daerah`/`cabang` per sekolah (selaras Manajemen Sekolah) dan field `cakupan` per pengguna (selaras menu Pengguna) -- pengguna non-Pusat hanya melihat sekolah dalam cakupannya di statistik, tabel, filter, panel detail, maupun export; ditampilkan lewat banner cakupan di atas halaman. (3) Statistik ringkasan yang sebelumnya statis (tidak ikut berubah saat filter status/nama diterapkan) kini ikut diperbarui otomatis setiap filter (Sekolah/Nama/Status/Periode) berubah. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Fitur Laporan Pindah Sekolah & Tunggakan menyediakan rekap konsolidasi bagi Admin Pusat atas seluruh siswa yang mengajukan pindah sekolah di semua sekolah dalam platform, beserta tunggakan SPP/tagihan lain yang masih harus dilunasi walau siswa sudah pindah. Data ini diturunkan dari alur "Ajukan Pindah Sekolah" di aplikasi Wali Murid dan proses persetujuan Write-off (Hapus Buku) oleh Kepala Sekolah di Portal Sekolah.

### 2.2 Problem Statement

**Staff Keuangan Pusat / Super Admin** mengalami **kesulitan memantau status pindah sekolah dan tunggakan terkait secara nasional** saat **data tersebut hanya tersedia tersebar di masing-masing Portal Sekolah**, yang menyebabkan **keterlambatan deteksi tunggakan yang berisiko tidak tertagih dan kurangnya visibilitas lintas sekolah untuk kebutuhan rekonsiliasi keuangan pusat**.

### 2.3 Kondisi Saat Ini (As-Is)

Setiap sekolah mencatat dan menyetujui pengajuan pindah sekolah/write-off secara independen di Portal Sekolah masing-masing (menu Approval Write-off). Admin Pusat tidak memiliki rekap gabungan dan harus menghubungi tiap sekolah satu per satu untuk mengetahui status & nilai tunggakan terkait siswa yang pindah sekolah.

### 2.4 Kondisi yang Diharapkan (To-Be)

Super Admin/Staff Keuangan Pusat dapat membuka menu "Laporan Pindah Sekolah & Tunggakan" dan langsung melihat seluruh kasus pindah sekolah dikelompokkan per sekolah asal, lengkap dengan status persetujuan, sekolah tujuan, tanggal efektif pindah, rencana pelunasan, dan rincian tunggakan per invoice -- tanpa perlu menghubungi sekolah satu per satu.

### 2.5 Kenapa Sekarang?

Dengan makin banyak sekolah yang onboarding ke platform (lihat PRD Manajemen Sekolah) dan proses pindah sekolah/write-off yang sudah berjalan di level Portal Sekolah & aplikasi Wali Murid, dibutuhkan satu titik konsolidasi di Admin Pusat untuk audit keuangan dan pemantauan risiko tunggakan secara nasional.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memberi visibilitas terpusat atas seluruh pengajuan pindah sekolah dan nilai tunggakannya di seluruh sekolah.
2. Mempercepat deteksi tunggakan yang berisiko tidak tertagih akibat siswa pindah sekolah, untuk keperluan tindak lanjut/penagihan.
3. Mendukung audit dan rekonsiliasi keuangan pusat atas keputusan hapus buku (write-off) yang diambil tiap sekolah.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak menyediakan aksi approve/reject write-off dari halaman ini -- tetap menjadi kewenangan Kepala Sekolah di Portal Sekolah (segregation of duties).
- Tidak mendukung ekspor laporan ke PDF pada fase ini (ekspor CSV/Excel sudah tersedia -- lihat FR-07).
- Tidak menghitung ulang atau mengubah nominal tunggakan -- hanya menampilkan data yang sudah tercatat di Portal Sekolah.

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran          | Organisasi                 | RACI | Kepentingan                                                |
| --------------------- | --------------------------- | ---- | ----------------------------------------------------------- |
| Product Owner         | Klien (Muhammadiyah Pusat)  | A    | Menyetujui kebutuhan laporan & kebijakan tunggakan           |
| Solution Architect    | GeekGarden                  | R    | Desain integrasi data dengan Portal Sekolah & Wali Murid     |
| Tech Lead             | GeekGarden                  | R    | Implementasi agregasi & tampilan laporan                     |
| QA Lead               | GeekGarden                  | C    | Strategi pengujian konsistensi data lintas sekolah           |
| Super Admin           | Klien                       | R    | Pengguna utama fitur ini                                    |
| Staff Keuangan Pusat  | Klien                       | R    | Pemantau tunggakan & rekonsiliasi dana                       |

### 4.2 Persona Pengguna

| Persona               | Deskripsi                                      | Tujuan utama                                                   | Pain point                                                   | Perangkat / kanal |
| ---------------------- | ----------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------- | ------------------- |
| Super Admin (cakupan Pusat) | Mengawasi seluruh operasional platform          | Memantau kasus pindah sekolah & tunggakan di semua sekolah       | Harus menghubungi tiap sekolah satu per satu untuk info ini    | Laptop/web          |
| Staff Keuangan Pusat (cakupan Pusat)   | Fokus pada tunggakan & rekonsiliasi dana         | Mendeteksi tunggakan berisiko tidak tertagih sedini mungkin      | Tidak ada rekap nasional, data tersebar per Portal Sekolah      | Laptop/web          |
| Admin Wilayah (cakupan PWM)    | Memantau sekolah di wilayahnya (satu PWM)                  | Mengetahui kasus pindah sekolah & tunggakan di sekolah wilayahnya saja            | Visibilitas terbatas tanpa laporan terpusat; khawatir melihat/dilihat memegang data wilayah lain di luar wewenangnya                    | Laptop/web          |
| Admin Daerah (cakupan PDM)     | Memantau sekolah di daerahnya (satu PDM, bagian dari satu PWM) | Mengetahui kasus pindah sekolah & tunggakan di sekolah daerahnya saja | Sama seperti Admin Wilayah, namun pada cakupan lebih sempit (level kabupaten/kota) | Laptop/web |
| Admin Cabang (cakupan PCM)     | Memantau sekolah di cabangnya (satu PCM, bagian dari satu PDM) | Mengetahui kasus pindah sekolah & tunggakan di sekolah cabangnya saja | Sama seperti Admin Wilayah/Daerah, namun pada cakupan paling sempit (level kecamatan) | Laptop/web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini)                                                        | Out of Scope (fase berikutnya / tidak dikerjakan)                 |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Daftar siswa pindah sekolah dikelompokkan per sekolah asal                   | Approve/reject write-off dari laporan ini                             |
| Filter berdasarkan status persetujuan (Menunggu Persetujuan/Disetujui)       | Filter manual eksplisit per Wilayah(PWM)/Daerah(PDM)/Cabang(PCM) sebagai dropdown bebas pilih -- cakupan saat ini otomatis mengikuti akun login, bukan pilihan bebas |
| Statistik ringkasan (Total Siswa Pindah, Total Tunggakan, Menunggu, Disetujui), bereaksi otomatis terhadap seluruh filter aktif | Ekspor laporan ke PDF                                                |
| Detail tunggakan per invoice (No. Invoice, Keterangan, Jatuh Tempo, Telat, Nominal) | Notifikasi otomatis ke sekolah/wali murid dari halaman ini           |
| Kelengkapan wajib Sekolah Tujuan, Efektif Pindah, dan Rencana Bayar per kasus | Perhitungan otomatis "Telat Hari" berbasis tanggal sistem berjalan     |
| Export laporan ke CSV/Excel (ringkasan + detail tunggakan per invoice), menghormati seluruh filter aktif (Sekolah/Nama/Status/Periode) & cakupan akses | Filter rentang multi-periode (laporan hanya menampilkan satu bulan efektif pindah per waktu) |
| Filter pencarian nama siswa (digabung dengan filter lain, berlaku juga saat export) | |
| Identitas siswa ditampilkan sebagai Nama + NIS (bukan Nama + Kelas) | |
| **Filter Sekolah** (dropdown, opsi dibatasi hanya sekolah dalam cakupan akses pengguna) | |
| **Filter Periode** (bulan efektif pindah, wajib terisi satu bulan, default periode terbaru, tanpa opsi "Semua Periode") | |
| **Pembatasan data otomatis berdasarkan cakupan akses pengguna** (Pusat/Wilayah-PWM/Daerah-PDM/Cabang-PCM), berlaku ke statistik, tabel, filter Sekolah/Periode, panel detail, dan export | |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Daftar kasus pindah sekolah per sekolah, filter status, filter pencarian nama siswa, filter Sekolah, filter Periode (tanpa opsi "Semua"), pembatasan data berdasarkan cakupan akses (Pusat/PWM/PDM/PCM), statistik ringkasan reaktif terhadap seluruh filter, detail tunggakan per invoice, kelengkapan data wajib (Sekolah Tujuan/Efektif Pindah/Rencana Bayar), export laporan ke CSV/Excel.
- **Should have** -- Badge status yang jelas (warna beda untuk Menunggu Persetujuan vs Disetujui), banner yang menjelaskan cakupan akses akun yang sedang login.
- **Could have** -- Filter eksplisit tambahan per Wilayah/Daerah/Cabang (independen dari cakupan akun login, mis. untuk Pusat yang ingin melihat satu wilayah tertentu tanpa login sebagai akun wilayah tersebut), ekspor laporan ke PDF.
- **Won't have (now)** -- Approve/reject write-off dari laporan ini, notifikasi otomatis, integrasi API real-time ke Portal Sekolah, filter rentang multi-periode.

### 5.3 User Stories

| ID    | User story                                                                                                                                                      | Prioritas | Acceptance criteria                                                                                                                                                                                      |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| US-01 | Sebagai Staff Keuangan Pusat, saya ingin melihat daftar siswa pindah sekolah dikelompokkan per sekolah asal, supaya saya tahu sekolah mana yang punya kasus aktif. | Must      | Given saya membuka menu Laporan Pindah Sekolah & Tunggakan, When halaman dimuat, Then tabel menampilkan baris per siswa dikelompokkan dengan header nama sekolah asal, termasuk sekolah tanpa kasus        |
| US-02 | Sebagai Super Admin, saya ingin memfilter daftar berdasarkan status persetujuan, supaya saya bisa fokus pada kasus yang masih menunggu keputusan Kepala Sekolah.  | Must      | Given saya memilih "Menunggu Persetujuan" pada filter Status, When filter diterapkan, Then hanya baris berstatus tersebut yang ditampilkan per sekolah, header sekolah tetap tampil                       |
| US-03 | Sebagai Staff Keuangan Pusat, saya ingin melihat rincian tunggakan per invoice untuk satu kasus, supaya saya tahu persis tagihan mana yang masih harus ditagih.    | Must      | Given saya menekan "Lihat Detail (n invoice)" pada satu baris, When panel detail terbuka, Then ditampilkan tabel invoice dengan No. Invoice, Keterangan, Jatuh Tempo, Telat (hari), Nominal, dan totalnya |
| US-04 | Sebagai Super Admin, saya ingin memastikan setiap kasus pindah sekolah selalu punya info sekolah tujuan, tanggal efektif pindah, dan rencana bayar tunggakan, supaya tidak ada kasus dengan data tidak lengkap. | Must      | Given data kasus pindah sekolah ditampilkan, When baris dirender, Then kolom Sekolah Tujuan, Efektif Pindah, dan Rencana Bayar selalu berisi nilai (tidak pernah kosong/placeholder "belum diisi")        |
| US-05 | Sebagai Staff Keuangan Pusat, saya ingin mengekspor laporan ini ke file CSV/Excel sesuai filter yang sedang aktif, supaya saya bisa menganalisis atau membagikan data tunggakan secara offline/ke rapat keuangan pusat. | Must      | Given saya menekan tombol "Export Excel" dengan filter status tertentu aktif, When file diunduh, Then isinya berupa CSV asli (bukan HTML yang diberi ekstensi `.xls`) berisi ringkasan kasus yang cocok dengan filter beserta rincian tunggakan per invoice, dan terbuka tanpa peringatan format di Microsoft Excel |
| US-06 | Sebagai Staff Keuangan Pusat, saya ingin mencari kasus berdasarkan nama siswa, supaya saya bisa langsung menemukan satu siswa tertentu tanpa menyusuri seluruh daftar per sekolah. | Must      | Given saya mengetik sebagian nama siswa di kotak pencarian, When hasil pencarian diterapkan, Then tabel hanya menampilkan kasus yang nama siswanya cocok (tidak case-sensitive), digabung dengan filter status yang aktif, dan hasil export juga ikut mengikuti pencarian ini |
| US-07 | Sebagai Admin Wilayah/Daerah/Cabang, saya ingin laporan ini otomatis membatasi data hanya untuk sekolah dalam cakupan akun saya, supaya saya tidak melihat atau tidak terlihat memegang data sekolah di luar tanggung jawab saya. | Must | Given saya login dengan akun yang cakupannya Wilayah (PWM)/Daerah (PDM)/Cabang (PCM) tertentu, When saya membuka Laporan Pindah Sekolah & Tunggakan, Then hanya sekolah yang berada dalam cakupan saya yang muncul di banner cakupan, statistik, tabel, pilihan filter Sekolah, pilihan filter Periode, panel detail, dan hasil export -- sekolah di luar cakupan tidak muncul sama sekali |
| US-08 | Sebagai Staff Keuangan Pusat, saya ingin memfilter laporan berdasarkan satu sekolah tertentu, supaya saya bisa fokus pada sekolah tersebut tanpa menyaring manual dari daftar panjang semua sekolah. | Must | Given saya memilih satu sekolah pada filter Sekolah (pilihan hanya berisi sekolah dalam cakupan saya), When filter diterapkan, Then hanya baris kasus dari sekolah tersebut yang tampil di tabel, statistik ringkasan, dan hasil export |
| US-09 | Sebagai Super Admin, saya ingin laporan ini selalu terfokus ke satu periode (bulan efektif pindah) tertentu, supaya saya tidak perlu memproses seluruh histori kasus sekaligus saat jumlah kasus sudah banyak. | Must | Given saya membuka laporan ini, When halaman dimuat, Then filter Periode otomatis terisi periode (bulan efektif pindah) terbaru dalam cakupan saya tanpa opsi "Semua Periode", dan saya tetap dapat memilih bulan lain yang tersedia dalam cakupan saya |

---

## 6. Kebutuhan Fungsional

| ID    | Modul                            | Deskripsi requirement                                                                                                                                  | User story | Prioritas | Catatan / aturan bisnis                                                                                                              |
| ----- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| FR-01 | Daftar Pindah Sekolah per Sekolah | Sistem harus menampilkan tabel dikelompokkan per sekolah asal (header baris khusus), dengan kolom Siswa (Nama+NIS), Sekolah Tujuan, Efektif Pindah, Total Tunggakan, Rencana Bayar, Status, Aksi | US-01      | Must      | Sekolah tanpa kasus ditampilkan dengan pesan "Tidak ada siswa pindah sekolah" di bawah header sekolahnya; NIS dipakai sebagai identitas kedua pengganti Kelas agar konsisten dengan Portal Sekolah & Aplikasi Wali Murid |
| FR-02 | Filter Status                    | Sistem harus menyediakan dropdown filter Semua Status / Menunggu Persetujuan / Disetujui yang memfilter baris kasus tanpa menyembunyikan header sekolah | US-02      | Must      | Filter diterapkan ke seluruh sekolah sekaligus, bukan per sekolah                                                                      |
| FR-03 | Statistik Ringkasan               | Sistem harus menampilkan 4 kartu statistik: Total Siswa Pindah, Total Tunggakan, Menunggu Persetujuan, Disetujui, dihitung dari kasus yang cocok dengan cakupan akses & seluruh filter aktif (Sekolah/Nama/Status/Periode)           | US-01      | Must      | Nilai dihitung ulang setiap filter berubah (pada v0.1--v0.3 statistik bersifat statis & tidak ikut berubah saat filter status/nama diterapkan -- diperbaiki di v0.4)                                                              |
| FR-04 | Detail Tunggakan per Invoice      | Sistem harus menyediakan tombol "Lihat Detail (n invoice)" yang membuka panel berisi tabel invoiceRef, keterangan, jatuh tempo, telat (hari), nominal, dan total | US-03      | Must      | Tombol hanya tampil jika kasus memiliki tunggakanList; jika tidak ada tunggakan, tampil teks "Tidak ada tunggakan"                     |
| FR-05 | Kelengkapan Data Wajib            | Sekolah Tujuan, Efektif Pindah, dan Rencana Bayar wajib terisi untuk setiap kasus yang ditampilkan di laporan ini                                        | US-04      | Must      | Data bersumber dari Portal Sekolah (write-off) & aplikasi Wali Murid (pengajuan pindah); sekolah wajib melengkapi ketiga field ini sebelum kasus dianggap valid untuk tampil di laporan pusat |
| FR-06 | Badge Status                      | Status `pending_approval` ditampilkan sebagai "Menunggu Persetujuan" (warna amber), `approved` ditampilkan sebagai "Disetujui" (warna hijau)             | US-02      | Should    | Konsisten dengan badge status yang dipakai di Portal Sekolah (menu Approval Write-off)                                                 |
| FR-07 | Export Laporan ke CSV/Excel       | Sistem harus menyediakan tombol "Export Excel" yang mengunduh file berisi dua bagian: ringkasan Daftar Siswa Pindah Sekolah dan Detail Tunggakan per Invoice, hanya untuk kasus yang cocok dengan filter status aktif | US-05      | Must      | File yang diunduh harus berformat CSV asli (`.csv`, dengan BOM UTF-8) -- bukan file HTML yang diberi ekstensi `.xls`, supaya Microsoft Excel tidak menampilkan peringatan "format dan ekstensi file tidak cocok" saat dibuka |
| FR-08 | Filter Pencarian Nama Siswa       | Sistem harus menyediakan kotak pencarian nama siswa yang memfilter baris kasus berdasarkan kecocokan substring (tidak case-sensitive), digabung (AND) dengan filter lain yang aktif (Sekolah/Status/Periode) | US-06      | Must      | Filter nama ikut diterapkan pada tombol "Export Excel" (FR-07), supaya isi file export selalu konsisten dengan tabel yang sedang ditampilkan |
| FR-09 | Cakupan Akses Data (Pusat/Wilayah-PWM/Daerah-PDM/Cabang-PCM) | Sistem harus membatasi seluruh sekolah yang ditampilkan (statistik, tabel, pilihan filter Sekolah, pilihan filter Periode, panel detail, dan export) hanya untuk sekolah yang berada dalam cakupan akun yang sedang login: Pusat = seluruh sekolah; Wilayah = sekolah dengan `wilayah` sama dengan `cakupan.pwm` milik pengguna; Daerah = sekolah dengan `daerah` sama dengan `cakupan.pdm`; Cabang = sekolah dengan `cabang` sama dengan `cakupan.pcm` | US-07      | Must      | Field `wilayah`/`daerah`/`cabang` per sekolah harus selaras (sama persis) dengan field `wilayah`/`daerah`/`cabang` di Manajemen Sekolah; field `cakupan` per pengguna bersumber dari menu Pengguna. Cakupan ditampilkan ke pengguna lewat banner info di atas halaman (lihat 8. Alur Pengguna & Desain) |
| FR-10 | Filter Sekolah                    | Sistem harus menyediakan dropdown filter "Semua Sekolah" + daftar nama sekolah, dengan pilihan dibatasi hanya sekolah yang berada dalam cakupan akses pengguna (FR-09) | US-08      | Must      | Digabung (AND) dengan filter Nama/Status/Periode yang aktif; ikut diterapkan pada export (FR-07) |
| FR-11 | Filter Periode                    | Sistem harus menyediakan dropdown filter periode (bulan efektif pindah, format `YYYY-MM`) berisi hanya bulan-bulan yang benar-benar punya kasus dalam cakupan pengguna, **tanpa opsi "Semua Periode"**, dengan periode terbaru terpilih secara default saat halaman dimuat | US-09      | Must      | Periode dihitung dari field `tglEfektifPindah` tiap kasus; jika cakupan pengguna/sekolah terpilih tidak memiliki kasus sama sekali, dropdown menampilkan "Tidak ada data periode" dan filter periode diabaikan (tidak memfilter apa pun) |

### 6.1 Hak Akses per Peran

| Fitur                                  | Super Admin | Admin Wilayah/Daerah/Cabang | Staff Keuangan Pusat | Viewer |
| ---------------------------------------- | ----------- | -------------- | ---------------------- | ------ |
| Lihat Laporan Pindah Sekolah & Tunggakan | Ya          | Ya             | Ya                     | --     |
| Filter status                            | Ya          | Ya             | Ya                     | --     |
| Filter pencarian nama siswa              | Ya          | Ya             | Ya                     | --     |
| Filter Sekolah                           | Ya          | Ya             | Ya                     | --     |
| Filter Periode                           | Ya          | Ya             | Ya                     | --     |
| Export laporan ke CSV/Excel              | Ya          | Ya             | Ya                     | --     |
| Approve/reject write-off                 | --          | --             | --                     | --     |

_Catatan: approve/reject write-off tidak tersedia di modul ini pada peran apa pun -- tetap dilakukan Kepala Sekolah di Portal Sekolah (segregation of duties). Hak akses baca/aksi modul ini (kolom di atas) diatur lewat menu Role & Hak Akses (key `laporan-pindah-tunggakan`) dan berlaku sama untuk semua level cakupan -- **cakupan tidak menambah/mengurangi aksi apa yang boleh dilakukan, hanya membatasi sekolah mana yang datanya terlihat** (lihat 6.1.1)._

#### 6.1.1 Cakupan Data per Level Akun (Pusat/PWM/PDM/PCM)

Terlepas dari peran (Super Admin/Admin/Staff Keuangan), setiap pengguna punya field `cakupan` (diatur di menu Pengguna) yang menentukan sekolah mana saja yang datanya terlihat di laporan ini:

| Level Cakupan   | Contoh akun                          | Sekolah yang terlihat di laporan ini                                   |
| ---------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| Pusat             | Super Admin, Staff Keuangan Pusat     | Seluruh sekolah, di seluruh Wilayah (PWM)/Daerah (PDM)/Cabang (PCM)         |
| Wilayah (PWM)     | Admin Wilayah (mis. cakupan PWM Jawa Timur) | Hanya sekolah yang `wilayah`-nya sama dengan PWM pada cakupan akun          |
| Daerah (PDM)      | Admin Daerah (mis. cakupan PDM Sidoarjo) | Hanya sekolah yang `daerah`-nya sama dengan PDM pada cakupan akun          |
| Cabang (PCM)      | Admin Cabang (mis. cakupan PCM Wonokromo) | Hanya sekolah yang `cabang`-nya sama dengan PCM pada cakupan akun          |

_Catatan: pembatasan ini berlaku otomatis mengikuti field `cakupan` akun yang sedang login -- bukan pilihan bebas yang bisa diubah pengguna sendiri dari halaman laporan ini. Untuk mengubah cakupan seorang pengguna, ubah lewat menu Pengguna (lihat juga Pertanyaan Terbuka No. 4 terkait kebutuhan filter Wilayah/Daerah/Cabang eksplisit bagi Pusat)._

### 6.2 Notifikasi

| Pemicu                                  | Penerima                      | Kanal                               | Isi singkat                                   |
| ----------------------------------------- | ------------------------------ | -------------------------------------- | ------------------------------------------------ |
| Kasus write-off baru disetujui/ditolak    | Super Admin/Staff Keuangan Pusat (disarankan) | Email/Dashboard (belum diimplementasi) | Pemberitahuan ada kasus pindah sekolah baru yang berubah status |

---

## 7. Kebutuhan Non-Fungsional

| ID     | Kategori          | Requirement                                                                                     | Target terukur                                   |
| ------ | ------------------ | --------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| NFR-01 | Konsistensi data   | Nilai Total Tunggakan pada tabel ringkasan dan panel detail harus selalu identik untuk kasus yang sama | 100% konsisten antar tampilan                      |
| NFR-02 | Performa           | Waktu render tabel & penerapan filter                                                              | < 1 detik untuk ≤ 100 sekolah/≤ 1.000 kasus          |
| NFR-03 | Auditability       | Histori perubahan status write-off (approve/reject) tercatat pelaku & waktu di sumber data Portal Sekolah | 100% tercatat di audit log Portal Sekolah           |
| NFR-04 | Kelengkapan data   | Field Sekolah Tujuan, Efektif Pindah, dan Rencana Bayar tidak boleh null/kosong saat ditampilkan     | 100% validasi sebelum kasus tampil di laporan pusat |
| NFR-05 | Kompatibilitas file export | File hasil ekspor harus berupa CSV asli yang terbuka tanpa peringatan format di Microsoft Excel/Google Sheets, bukan HTML yang diberi ekstensi `.xls` | 0 peringatan "format tidak cocok" saat dibuka di Excel versi umum |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login → Menu "Laporan" → "Laporan Pindah Sekolah & Tunggakan" → sistem menentukan cakupan akses dari akun yang login & menampilkan banner cakupan ("📍 Cakupan akun Anda: ...") di atas halaman → filter Sekolah & filter Periode otomatis terisi (opsi dibatasi sesuai cakupan; Periode default ke bulan efektif pindah terbaru) → lihat statistik ringkasan & tabel per sekolah → cari nama siswa dan/atau filter Sekolah/Status/Periode (opsional, saling melengkapi -- AND) → klik "Lihat Detail (n invoice)" pada satu kasus → tinjau rincian tunggakan → "Tutup Detail". Opsional: klik "Export Excel" kapan saja untuk mengunduh data yang cocok dengan cakupan akses & seluruh filter aktif sebagai file CSV.
- Wireframe: mengikuti struktur `laporan-pindah-tunggakan.html` (banner cakupan, 4 kartu statistik, filter bar berisi dropdown Sekolah - kotak cari Nama - dropdown Status - dropdown Periode - tombol Export, tabel dikelompokkan per sekolah dengan baris header abu-abu per sekolah, panel detail tunggakan muncul di bawah tabel saat dibuka).
- Edge case yang wajib ditangani: sekolah tanpa kasus pindah sekolah periode ini, sekolah berstatus Nonaktif/Draft (tetap ditampilkan dengan catatan konteks, misal proses merger sekolah), kasus tanpa tunggakan (tombol detail disembunyikan, tampil teks "Tidak ada tunggakan"), filter status/sekolah/periode yang tidak menyisakan kasus pada satu/seluruh sekolah, akun dengan cakupan (Wilayah/Daerah/Cabang) yang tidak memiliki sekolah sama sekali dalam cakupannya (filter Sekolah & Periode kosong, tabel menampilkan "Tidak ada sekolah yang cocok dengan filter"), sekolah dalam cakupan namun tidak punya kasus pada periode manapun (dropdown Periode menampilkan "Tidak ada data periode").

---

## 9. Integrasi & Dependensi

| Sistem eksternal                                   | Fungsi                                                                 | Metode                        | PIC | Status |
| ----------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------- | --- | ------ |
| Portal Sekolah (modul Approval Write-off)             | Sumber data kasus pindah sekolah/hapus buku per sekolah                  | Internal (shared data store)    | [ ] | [ ]    |
| Aplikasi Wali Murid (fitur Ajukan Pindah Sekolah)     | Sumber pengajuan awal pindah sekolah dari orang tua/wali murid           | Internal (shared data store)    | [ ] | [ ]    |
| Modul Manajemen Sekolah                               | Konteks status sekolah (Aktif/Nonaktif/Draft) yang memengaruhi narasi kasus (misal merger); sumber field `wilayah`/`daerah`/`cabang` per sekolah yang dipakai untuk pembatasan cakupan akses (FR-09) | Internal (shared data store)    | [ ] | [ ]    |
| Modul Pengguna (field Cakupan)                        | Sumber level cakupan akses (Pusat/Wilayah/Daerah/Cabang) & nilai PWM/PDM/PCM per pengguna yang menentukan sekolah mana saja yang terlihat di laporan ini (FR-09) | Internal (shared data store)    | [ ] | [ ]    |

---

## 10. Kebutuhan Data

- Entitas utama: `Sekolah` (nama, wilayah [PWM], daerah [PDM], cabang [PCM]), `KasusPindahSekolah` (sekolah, siswa, nis, alasan, status, tglEfektifPindah, sekolahTujuan, rencanaBayarTunggakan), `TunggakanInvoice` (invoiceRef, keterangan, nominal, jatuhTempo, telatHari), `CakupanPengguna` (level [Pusat/Wilayah/Daerah/Cabang], pwm, pdm, pcm -- bersumber dari entitas Pengguna).
- Periode laporan ini = bulan efektif pindah (`tglEfektifPindah.slice(0,7)`, format `YYYY-MM`), bukan bulan transaksi pembayaran seperti pada Laporan Pemasukan.
- Migrasi data: tidak ada migrasi khusus -- struktur data mengikuti `writeoffData` yang sudah berjalan di Portal Sekolah.
- Retensi data: data pindah sekolah & tunggakan disimpan selama histori keuangan sekolah terkait masih relevan untuk audit (rekomendasi minimal 5 tahun, perlu konfirmasi kebijakan retensi klien).
- Laporan yang dibutuhkan: rekap tunggakan akibat pindah sekolah per periode, daftar sekolah dengan kasus pindah sekolah terbanyak.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Satu kasus pindah sekolah hanya terkait satu siswa (tidak ada kasus gabungan kakak-adik dalam satu baris).
- Data yang ditampilkan adalah snapshot read-only dari data Portal Sekolah, belum real-time via API pada fase prototipe ini.
- Field `wilayah`/`daerah`/`cabang` per sekolah (sumber: Manajemen Sekolah) dan field `cakupan.pwm`/`cakupan.pdm`/`cakupan.pcm` per pengguna (sumber: menu Pengguna) selalu ditulis dengan string yang identik (mis. selalu "PWM Jawa Timur", tidak pernah "Jawa Timur" saja) -- pencocokan cakupan akses bersifat exact-match, bukan pencarian sebagian.
- Satu akun hanya memiliki satu level cakupan aktif pada satu waktu (tidak ada akun dengan multi-cakupan, mis. menangani dua PWM berbeda sekaligus).

**Batasan:**

- Filter Sekolah & Periode (bulan efektif pindah) sudah tersedia (lihat FR-10, FR-11); filter eksplisit tambahan per Wilayah/Daerah/Cabang yang independen dari cakupan akun (mis. Pusat ingin melihat satu wilayah tertentu tanpa login sebagai akun wilayah tersebut) belum didukung -- lihat Pertanyaan Terbuka No. 4.
- Filter Periode hanya mendukung satu bulan per waktu, belum mendukung rentang multi-bulan.
- Perhitungan "Telat Hari" bersifat statis pada data demo, belum dihitung otomatis dari tanggal sistem berjalan.
- Pembatasan cakupan akses (FR-09) baru diterapkan di laporan ini -- Laporan Pemasukan dan modul lain belum menerapkan pembatasan serupa (lihat Pertanyaan Terbuka No. 5).

**Pertanyaan terbuka:**

| No  | Pertanyaan                                                                                     | Ditujukan ke | Batas jawab  | Jawaban |
| --- | -------------------------------------------------------------------------------------------------- | ------------ | ------------ | ------- |
| 1   | Apakah dibutuhkan ekspor laporan ke PDF juga untuk keperluan rapat keuangan pusat (CSV/Excel sudah tersedia -- lihat FR-07)? | PO klien     | [DD-MM-YYYY] | [ ]     |
| 2   | Berapa lama kasus pindah sekolah yang sudah "Disetujui" perlu tetap muncul di laporan ini (ada batas periode)? | PO klien     | [DD-MM-YYYY] | [ ]     |
| 3   | Apakah filter Periode perlu mendukung rentang multi-bulan (mis. "Juni--Agustus 2026") untuk kebutuhan rekap triwulanan/semesteran pusat? | PO klien     | [DD-MM-YYYY] | [ ]     |
| 4   | Selain pembatasan otomatis berdasarkan cakupan akun login, apakah Pusat/PWM perlu dropdown filter eksplisit per Wilayah/Daerah/Cabang untuk melihat subset tertentu tanpa harus login sebagai akun di level tersebut? | PO klien     | [DD-MM-YYYY] | [ ]     |
| 5   | Apakah pembatasan cakupan akses (Pusat/PWM/PDM/PCM) yang diterapkan di laporan ini juga perlu diterapkan secara konsisten ke Laporan Pemasukan dan modul lain (Manajemen Sekolah, Dashboard Konsolidasi)? | PO klien / Solution Architect | [DD-MM-YYYY] | [ ]     |

---

## 12. Risiko & Mitigasi

| Risiko                                                                                                  | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi                                                                                                   | PIC |
| ------------------------------------------------------------------------------------------------------------ | -------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- | --- |
| Data tunggakan di laporan pusat tidak sinkron dengan perubahan terbaru di Portal Sekolah (snapshot statis)   | H              | M                      | Integrasikan dengan API/shared database real-time sebelum go-live produksi                                     | [ ] |
| Field Sekolah Tujuan/Efektif Pindah/Rencana Bayar yang wajib diisi hanya sekadar "melengkapi" tanpa data valid | M              | M                      | Tambahkan validasi format tanggal & nama sekolah tujuan di level input Portal Sekolah, bukan hanya di laporan ini | [ ] |
| Field cakupan pengguna (`pwm`/`pdm`/`pcm`) salah ketik atau tidak persis sama dengan field `wilayah`/`daerah`/`cabang` di Manajemen Sekolah, sehingga pengguna non-Pusat tidak melihat data apa pun tanpa pesan error yang jelas | M              | M                      | Isi field cakupan lewat dropdown cascading yang sudah ada di menu Pengguna (bukan input teks bebas), bukan ketik manual; pertimbangkan pesan khusus "cakupan Anda tidak memiliki sekolah terdaftar" saat hasil scoping kosong | [ ] |
| Pembatasan cakupan hanya diterapkan di laporan ini, sementara Laporan Pemasukan & modul lain belum -- berisiko inkonsistensi ekspektasi akses data antar modul bagi pengguna non-Pusat | M              | M                      | Selaraskan penerapan cakupan akses ke seluruh laporan/modul terkait sekolah pada iterasi berikutnya (lihat Pertanyaan Terbuka No. 5) | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone      | Deliverable                          | Target tanggal | Kriteria selesai             |
| -------------- | ------------------------------------- | -------------- | ----------------------------- |
| PRD approved   | Dokumen ini v1.0                      | [ ]            | Ditandatangani PO             |
| Desain selesai | Mockup & struktur data final          | [ ]            | Review SA & klien             |
| Development    | Laporan Pindah Sekolah & Tunggakan    | [ ]            | Lolos code review             |
| UAT            | Build staging                         | [ ]            | 0 bug critical, sign-off UAT  |
| Go-live        | Production                            | [ ]            | Monitoring 2 minggu stabil    |

---

## 14. Glosarium

| Istilah          | Arti                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| Write-off/Hapus Buku | Penghapusan tagihan yang tidak bisa ditagih lagi, umumnya karena siswa pindah sekolah                |
| Tunggakan          | Tagihan yang sudah jatuh tempo namun belum dibayar                                                   |
| Telat Hari          | Jumlah hari keterlambatan pembayaran, dihitung dari tanggal jatuh tempo invoice sampai hari ini      |
| Rencana Bayar       | Tanggal yang dijanjikan wali murid/sekolah untuk melunasi tunggakan meski siswa sudah pindah sekolah |
| PWM                 | Pimpinan Wilayah Muhammadiyah -- struktur organisasi setingkat provinsi, menaungi beberapa PDM |
| PDM                 | Pimpinan Daerah Muhammadiyah -- struktur organisasi setingkat kabupaten/kota, menaungi beberapa PCM |
| PCM                 | Pimpinan Cabang Muhammadiyah -- struktur organisasi setingkat kecamatan, menaungi sekolah-sekolah di wilayahnya |
| Cakupan (akun)      | Batas data sekolah yang bisa dilihat satu akun -- Pusat (seluruh sekolah), Wilayah (satu PWM), Daerah (satu PDM), atau Cabang (satu PCM); diatur lewat menu Pengguna |
| Periode (laporan ini) | Bulan efektif pindah (`tglEfektifPindah`, format `YYYY-MM`) yang jadi dasar filter Periode -- berbeda dari "periode" di Laporan Pemasukan yang berbasis bulan transaksi pembayaran |

---

## 15. Persetujuan

| Peran                 | Nama | Tanda tangan | Tanggal |
| ---------------------- | ---- | ------------ | ------- |
| Product Owner (klien) | [ ]  | [ ]          | [ ]     |
| Project Manager        | [ ]  | [ ]          | [ ]     |
| Solution Architect     | [ ]  | [ ]          | [ ]     |
| Tech Lead              | [ ]  | [ ]          | [ ]     |

---

### Checklist Kualitas PRD

- [x] Problem statement didukung konteks penggunaan (perlu divalidasi dengan data riil klien)
- [x] Setiap tujuan punya KPI dengan baseline dan target
- [x] Out of scope ditulis eksplisit
- [x] Setiap user story punya acceptance criteria Given-When-Then
- [x] NFR ditulis dengan angka terukur
- [ ] Semua integrasi punya PIC dan status (menunggu konfirmasi PIC)
- [ ] Pertanyaan terbuka punya batas waktu jawab (menunggu tanggal dari PO)
- [x] PRD tidak membahas detail teknis implementasi
