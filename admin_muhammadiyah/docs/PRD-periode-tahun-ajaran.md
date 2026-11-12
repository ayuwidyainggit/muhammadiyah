# PRD: Periode Tahun Ajaran

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | ----------------------------------------------------------------------- |
| Nama produk / fitur | Periode Tahun Ajaran (Kalender Tahun Ajaran Terpusat)                   |
| Klien / proyek      | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen       | v0.1                                                                     |
| Status              | Draft                                                                    |
| Penulis             | Tim Produk GeekGarden                                                    |
| Product Owner       | [Nama PO Klien]                                                          |
| Solution Architect  | [Nama SA]                                                                |
| Tanggal dibuat      | 09-11-2026                                                               |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                  |
| Dokumen terkait     | `periode-tahun-ajaran.html`, `app.js`, PRD Konfigurasi Sistem, PRD Role & Hak Akses, Portal Sekolah (Kelas, Master Data Tagihan, Manajemen Murid -- konsumen read-only) |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                                                                   |
| ----- | ---------- | --------------------- | -------------------------------------------------------------------------------------------- |
| v0.1  | 09-11-2026 | Tim Produk GeekGarden | Draft awal. Fitur ini sebelumnya adalah halaman tersendiri `periode.html` di Portal Sekolah (per sekolah), lalu sempat digabung sebagai salah satu kartu di PRD Konfigurasi Sistem (v0.2), dan sejak revisi ini **dipisah menjadi fitur & halaman tersendiri** (`periode-tahun-ajaran.html`) yang ditempatkan di bawah grup sidebar "Konfigurasi" -- bukan lagi kartu di dalam halaman Konfigurasi Sistem -- supaya fitur ini punya siklus PRD, RBAC, dan navigasi sendiri yang jelas. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Fitur Periode Tahun Ajaran menyediakan satu kalender tahun ajaran terpusat (Tahun Ajaran, Tanggal Mulai, Tanggal Selesai, status Aktif) yang berlaku sama untuk **seluruh sekolah** di platform. Super Admin mengelolanya dari satu halaman tersendiri di Admin Pusat (`periode-tahun-ajaran.html`, di bawah grup sidebar "Konfigurasi"); Portal Sekolah di tiap sekolah hanya membaca daftar ini secara read-only untuk kebutuhan dropdown/filter di menu Kelas, Master Data Tagihan, dan Manajemen Murid.

### 2.2 Problem Statement

**Super Admin** mengalami **kesulitan menjaga satu kalender tahun ajaran yang konsisten di seluruh sekolah** saat **sebelumnya tiap sekolah mengatur periode tahun ajarannya sendiri-sendiri lewat Portal Sekolah masing-masing**, yang menyebabkan **risiko tanggal tahun ajaran berbeda-beda antar sekolah, sulit diaudit, dan tidak ada satu acuan tunggal untuk laporan lintas sekolah yang berbasis periode (mis. Laporan Pemasukan per periode)**.

### 2.3 Kondisi Saat Ini (As-Is)

Sebelum revisi ini, Periode Tahun Ajaran dikelola masing-masing sekolah lewat halaman `periode.html` di Portal Sekolah (dihapus), lalu sempat dipindah menjadi satu kartu di dalam halaman Konfigurasi Sistem Admin Pusat (v0.2) -- bercampur dengan pengaturan lain seperti Rekening Penampung dan Template Pesan, sehingga sulit ditemukan dan tidak punya RBAC granular sendiri.

### 2.4 Kondisi yang Diharapkan (To-Be)

Super Admin membuka menu tersendiri "Periode Tahun Ajaran" di sidebar (grup "Konfigurasi", tepat di bawah "Konfigurasi Sistem") dan mengelola daftar periode tahun ajaran dari satu halaman yang fokus pada fitur ini saja: Tambah, Edit, Hapus, dan Jadikan Aktif -- terpisah dari pengaturan rekening/notifikasi/reminder/template, dengan hak akses yang bisa diatur sendiri lewat menu Role & Hak Akses.

### 2.5 Kenapa Sekarang?

Setelah Periode Tahun Ajaran dipindah ke Admin Pusat (v0.2) demi satu sumber data, fitur ini ternyata cukup berdiri sendiri (punya alur Tambah/Edit/Hapus/Jadikan Aktif yang lengkap, dipakai banyak modul di Portal Sekolah) sehingga lebih jelas dan mudah dirawat sebagai halaman & PRD tersendiri, alih-alih menumpuk di satu halaman Konfigurasi Sistem yang sudah padat.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Menyediakan satu sumber kebenaran (single source of truth) untuk kalender tahun ajaran yang dipakai seluruh sekolah di platform.
2. Memisahkan siklus pengelolaan & hak akses Periode Tahun Ajaran dari pengaturan global lain (Rekening, Notifikasi, Reminder, Template), supaya masing-masing lebih mudah ditemukan, diaudit, dan diberi RBAC granular.
3. Menjadi acuan periode yang konsisten untuk laporan lintas sekolah berbasis periode (mis. Laporan Pemasukan).

### 3.2 Non-Tujuan (Out of Goal)

- Tidak mengatur pengaturan global lain (Rekening Penampung, Nomor Resmi, Aturan Reminder, Template Pesan) -- tetap di PRD & halaman Konfigurasi Sistem.
- Tidak menyediakan override Periode Tahun Ajaran per sekolah -- satu kalender nasional berlaku mutlak untuk seluruh sekolah pada fase ini (lihat Asumsi).
- Tidak memvalidasi otomatis apakah suatu periode sudah dipakai data siswa/tagihan di sekolah manapun sebelum diizinkan Edit/Hapus pada fase ini (lihat Batasan).

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran       | Organisasi                 | RACI | Kepentingan                                                   |
| ------------------ | --------------------------- | ---- | --------------------------------------------------------------- |
| Product Owner      | Klien (Muhammadiyah Pusat) | A    | Menyetujui kebijakan kalender tahun ajaran nasional               |
| Solution Architect | GeekGarden                  | R    | Desain satu sumber data & validasi lintas sekolah di masa depan  |
| Tech Lead          | GeekGarden                  | R    | Implementasi penyimpanan & propagasi periode ke Portal Sekolah   |
| QA Lead            | GeekGarden                  | C    | Strategi pengujian validasi periode & dampaknya ke Portal Sekolah |
| Super Admin        | Klien                       | R    | Pengguna utama fitur ini                                         |

### 4.2 Persona Pengguna

| Persona      | Deskripsi                                   | Tujuan utama                                                        | Pain point                                                   | Perangkat / kanal |
| ------------ | -------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------ |
| Super Admin  | Mengelola kalender tahun ajaran seluruh sekolah | Memastikan satu kalender tahun ajaran yang sama dipakai semua sekolah | Dulu harus memastikan tiap sekolah mengisi tanggal yang sama sendiri-sendiri | Laptop/web          |
| Bendahara/Admin sekolah (Portal Sekolah) | Memakai periode aktif saat membuat tagihan & mengelola kelas/murid | Melihat daftar periode & periode aktif yang selalu benar tanpa harus mengelolanya sendiri | Tidak bisa lagi menambah/mengubah periode sendiri sejak fitur ini dipindah (hanya baca) | Laptop/web (Portal Sekolah) |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini)                                                                 | Out of Scope (fase berikutnya / tidak dikerjakan)                          |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Halaman tersendiri "Periode Tahun Ajaran" di bawah grup sidebar "Konfigurasi"         | Override Periode Tahun Ajaran per sekolah                                   |
| Tambah Periode Tahun Ajaran (Tahun Ajaran, Tanggal Mulai, Tanggal Selesai, opsional langsung jadikan aktif) | Validasi otomatis "periode sudah terpakai data siswa/tagihan" lintas sekolah (lihat Batasan) |
| Edit Periode Tahun Ajaran yang sudah ada                                              | Filter/riwayat perubahan periode (audit trail) di UI -- dicatat di audit log umum saja |
| Hapus Periode Tahun Ajaran (minimal 1 periode harus tetap ada)                         | Ekspor/impor daftar periode                                                  |
| Jadikan Aktif (hanya 1 periode aktif pada satu waktu, dengan konfirmasi)               |                                                                                |
| Pencarian periode berdasarkan Tahun Ajaran                                             |                                                                                |
| Hak akses granular (RBAC) tersendiri, terpisah dari modul Konfigurasi Sistem           |                                                                                |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Halaman tersendiri, Tambah/Edit/Hapus/Jadikan Aktif, pencarian, RBAC tersendiri.
- **Should have** -- Konfirmasi sebelum Jadikan Aktif/Hapus (karena berdampak ke seluruh sekolah).
- **Could have** -- Validasi lintas sekolah untuk mengunci periode yang sudah terpakai data siswa/tagihan (lihat Pertanyaan Terbuka No. 2).
- **Won't have (now)** -- Override per sekolah, ekspor/impor, riwayat perubahan di UI.

### 5.3 User Stories

| ID    | User story                                                                                                                                                  | Prioritas | Acceptance criteria                                                                                                                                                       |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-01 | Sebagai Super Admin, saya ingin membuka menu "Periode Tahun Ajaran" sebagai halaman tersendiri di sidebar, supaya saya tidak perlu mencarinya di antara pengaturan lain yang tidak berhubungan. | Must | Given saya login sebagai Super Admin, When saya melihat sidebar grup "Konfigurasi", Then "Periode Tahun Ajaran" tampil sebagai menu tersendiri tepat di bawah "Konfigurasi Sistem", terpisah dari "Pengguna" dan "Role & Hak Akses" |
| US-02 | Sebagai Super Admin, saya ingin menambah periode tahun ajaran baru, supaya seluruh sekolah punya kalender tahun ajaran terbaru yang sama. | Must | Given saya menekan "+ Tambah Periode Tahun Ajaran" dan mengisi Tahun Ajaran, Tanggal Mulai, Tanggal Selesai lalu menekan "Simpan", Then periode baru tersimpan di tabel dan tersedia sebagai pilihan di seluruh Portal Sekolah |
| US-03 | Sebagai Super Admin, saya ingin mengubah data periode yang sudah ada, supaya saya bisa memperbaiki kesalahan input tanggal tanpa harus menghapus dan membuat ulang. | Must | Given saya menekan "Edit" pada satu baris, When saya mengubah field dan menekan "Simpan", Then data periode tersebut diperbarui, dengan konfirmasi terlebih dahulu |
| US-04 | Sebagai Super Admin, saya ingin menjadikan satu periode sebagai periode aktif, supaya periode tersebut otomatis jadi pilihan default saat sekolah mana pun membuat tagihan baru. | Must | Given ada lebih dari satu periode tahun ajaran, When saya menekan "Jadikan Aktif" pada salah satu baris dan mengonfirmasi, Then periode tersebut berstatus Aktif dan periode yang sebelumnya aktif berubah menjadi Nonaktif -- hanya satu periode aktif pada satu waktu |
| US-05 | Sebagai Super Admin, saya ingin menghapus periode yang salah/tidak terpakai, dengan perlindungan agar tidak menghapus semua periode. | Must | Given saya menekan hapus pada satu baris dan mengonfirmasi, When periode tersebut bukan satu-satunya yang tersisa, Then periode terhapus; jika periode tersebut satu-satunya yang tersisa, penghapusan ditolak dengan pesan "Minimal harus ada 1 periode tahun ajaran" |
| US-06 | Sebagai Admin Pusat, saya ingin mengatur siapa saja yang boleh mengelola Periode Tahun Ajaran secara terpisah dari modul Konfigurasi Sistem, supaya hak akses bisa lebih granular bila dibutuhkan di masa depan. | Should | Given saya membuka menu Role & Hak Akses, When saya melihat daftar modul, Then "Periode Tahun Ajaran" tampil sebagai modul tersendiri dengan izin Create/Read/Update/Delete yang bisa diatur independen dari modul "Konfigurasi Sistem" |

---

## 6. Kebutuhan Fungsional

| ID    | Modul                                   | Deskripsi requirement                                                                                                                                  | User story | Prioritas | Catatan / aturan bisnis                                                                                                   |
| ----- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| FR-01 | Halaman & Menu Tersendiri                | Sistem harus menyediakan halaman `periode-tahun-ajaran.html` dengan menu sidebar sendiri di grup "Konfigurasi", ditempatkan tepat di bawah "Konfigurasi Sistem" | US-01      | Must      | Tidak lagi berupa kartu di dalam halaman Konfigurasi Sistem (lihat Riwayat Revisi)                                             |
| FR-02 | Tambah/Ubah Periode Tahun Ajaran         | Sistem harus menyediakan tombol "+ Tambah Periode Tahun Ajaran" dan aksi "Edit" per baris yang membuka panel berisi field Tahun Ajaran, Tanggal Mulai, Tanggal Selesai, dan toggle "Jadikan periode aktif", dengan validasi: field wajib terisi, Tahun Ajaran tidak boleh duplikat, Tanggal Mulai tidak boleh setelah Tanggal Selesai | US-02, US-03 | Must    | Mengaktifkan toggle "Jadikan periode aktif" saat simpan otomatis menonaktifkan periode aktif sebelumnya (hanya 1 aktif per waktu); perubahan pada periode yang sudah ada meminta konfirmasi |
| FR-03 | Jadikan Periode Aktif                    | Sistem harus menyediakan tombol "Jadikan Aktif" per baris periode yang belum aktif, dengan konfirmasi sebelum diterapkan                                  | US-04      | Must      | Konfirmasi menegaskan bahwa perubahan ini berlaku untuk seluruh sekolah, bukan hanya satu sekolah                              |
| FR-04 | Hapus Periode Tahun Ajaran                | Sistem harus menyediakan tombol hapus per baris periode dengan konfirmasi; minimal harus tetap ada 1 periode tahun ajaran setelah dihapus; jika periode yang dihapus sedang aktif, periode pertama yang tersisa otomatis dijadikan aktif | US-05      | Must      | Penghapusan tidak boleh menyisakan 0 periode -- tombol hapus pada baris terakhir ditolak dengan pesan "Minimal harus ada 1 periode tahun ajaran" |
| FR-05 | Pencarian Periode                        | Sistem harus menyediakan kotak pencarian yang memfilter tabel berdasarkan kecocokan substring pada Tahun Ajaran                                            | US-02--US-05 | Should  | Tidak case-sensitive                                                                                                            |
| FR-06 | RBAC Tersendiri                          | Sistem harus memperlakukan "Periode Tahun Ajaran" sebagai modul RBAC tersendiri (key `periode-tahun-ajaran`) di menu Role & Hak Akses, terpisah dari key `konfigurasi` | US-06      | Should    | Secara default disetel sama dengan izin modul `konfigurasi` (hanya Super Admin) namun dapat diubah independen lewat Role & Hak Akses |

### 6.1 Hak Akses per Peran

| Fitur                                             | Super Admin | Admin Wilayah | Staff Keuangan Pusat | Viewer |
| -------------------------------------------------- | ----------- | -------------- | ---------------------- | ------ |
| Lihat halaman Periode Tahun Ajaran                 | Ya          | --             | --                      | --     |
| Tambah/Ubah/Hapus/Jadikan Aktif Periode Tahun Ajaran | Ya         | --             | --                      | --     |

_Catatan: default izin mengikuti pola modul `konfigurasi` (hanya Super Admin), namun disimpan sebagai key RBAC tersendiri (`periode-tahun-ajaran`) sehingga dapat diubah independen lewat menu Role & Hak Akses tanpa memengaruhi akses ke Konfigurasi Sistem, atau sebaliknya. Di sisi Portal Sekolah, seluruh role (Kepala Sekolah/Bendahara/Admin) hanya bisa **membaca** daftar Periode Tahun Ajaran lewat dropdown/filter yang relevan -- tidak ada lagi role di Portal Sekolah yang bisa mengubahnya, sejak halaman `periode.html` dihapus dari Portal Sekolah._

### 6.2 Notifikasi

| Pemicu                                          | Penerima    | Kanal | Isi singkat                                   |
| ------------------------------------------------ | ----------- | ----- | ----------------------------------------------- |
| Periode Tahun Ajaran disimpan                    | Super Admin | Toast UI | "✓ Periode Tahun Ajaran berhasil disimpan"   |
| Periode Tahun Ajaran dihapus                     | Super Admin | Toast UI | "✓ Periode \"...\" berhasil dihapus"          |
| Periode dijadikan aktif                          | Super Admin | Toast UI | "✓ ... dijadikan periode aktif"               |

---

## 7. Kebutuhan Non-Fungsional

| ID     | Kategori      | Requirement                                                                                     | Target terukur                                            |
| ------ | -------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| NFR-01 | Validasi       | Tahun Ajaran, Tanggal Mulai, Tanggal Selesai wajib terisi; Tahun Ajaran tidak boleh duplikat; Tanggal Mulai tidak boleh setelah Tanggal Selesai | 100% validasi sebelum simpan                                 |
| NFR-02 | Konsistensi    | Hanya satu periode yang berstatus Aktif pada satu waktu                                              | 100% invarian terjaga di setiap operasi simpan/hapus/jadikan aktif |
| NFR-03 | Performa       | Waktu simpan/hapus/jadikan aktif                                                                     | < 1 detik untuk kondisi data saat ini (≤ 20 periode)          |
| NFR-04 | Konsistensi lintas sistem | Perubahan pada daftar Periode Tahun Ajaran harus tercermin di seluruh Portal Sekolah tanpa perlu diisi ulang per sekolah | 100% sekolah membaca daftar periode yang sama                |
| NFR-05 | Auditability   | Setiap perubahan (tambah/ubah/hapus/jadikan aktif) tercatat pelaku & waktu                           | 100% tercatat di audit log                                    |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login → Sidebar grup "Konfigurasi" → "Periode Tahun Ajaran" → "+ Tambah Periode Tahun Ajaran" (atau "Edit" pada baris yang sudah ada) → isi Tahun Ajaran/Tanggal Mulai/Tanggal Selesai, opsional centang "Jadikan periode aktif" → "Simpan" → toast konfirmasi.
- Alur Jadikan Aktif: tabel Periode Tahun Ajaran → tombol "Jadikan Aktif" pada baris yang belum aktif → konfirmasi ("berlaku untuk seluruh sekolah") → toast konfirmasi.
- Alur Hapus: tombol hapus pada baris → konfirmasi (ditolak otomatis bila baris terakhir) → toast konfirmasi; bila periode yang dihapus sedang aktif, periode pertama yang tersisa otomatis dijadikan aktif.
- Wireframe: mengikuti struktur `periode-tahun-ajaran.html` -- satu kartu berisi filter pencarian + tombol tambah, tabel daftar periode, dan panel tambah/edit yang muncul di bawah tabel saat dibuka.
- Edge case yang wajib ditangani: menghapus periode tahun ajaran hingga tersisa 0 (ditolak sistem, lihat FR-04); menghapus/mengubah periode yang sedang aktif (periode pertama yang tersisa otomatis dijadikan aktif, lihat FR-04); menambah periode dengan Tahun Ajaran yang sudah ada (ditolak dengan pesan duplikat); Tanggal Mulai lebih besar dari Tanggal Selesai (ditolak dengan pesan validasi).

---

## 9. Integrasi & Dependensi

| Sistem eksternal                 | Fungsi                                                            | Metode                          | PIC | Status |
| --------------------------------- | -------------------------------------------------------------------- | ---------------------------------- | --- | ------ |
| Portal Sekolah (menu Kelas, Master Data Tagihan, Manajemen Murid) | Membaca daftar Periode Tahun Ajaran (read-only) untuk dropdown/filter & nominal tagihan per periode -- sebelumnya dikelola sendiri lewat halaman `periode.html` yang kini dihapus | Internal (shared data store), pada prototipe disalin manual ke `periodeTahunAjaranData` di `app.js` Portal Sekolah | [ ] | [ ]    |
| Modul Laporan Pemasukan (Admin Pusat) | Konsumen potensial periode aktif/daftar periode untuk pengelompokan laporan berbasis periode | Internal (shared data store), belum diintegrasikan pada prototipe ini | [ ] | [ ]    |

---

## 10. Kebutuhan Data

- Entitas utama: `PeriodeTahunAjaran` (nama, mulai, selesai, aktif) -- satu sumber data untuk seluruh sekolah.
- Migrasi data: datanya **dipindahkan** dari `periodeTahunAjaranData` di Portal Sekolah (bukan data baru) saat fitur ini dipindah ke Admin Pusat; tidak ada migrasi tambahan pada revisi pemisahan halaman ini (v0.1 dokumen ini).
- Retensi data: disimpan selama platform berjalan; perubahan harus tercatat di audit log (lihat NFR-05).
- Laporan yang dibutuhkan: riwayat perubahan periode aktif (untuk audit kapan tahun ajaran berganti).

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Satu kalender tahun ajaran nasional berlaku sama untuk seluruh sekolah di platform -- tidak ada sekolah dengan tanggal mulai/selesai tahun ajaran berbeda dari sekolah lain.
- Hak akses modul ini pada kondisi default (hanya Super Admin) memadai sampai ada kebutuhan eksplisit untuk peran lain mengelolanya sendiri.

**Batasan:**

- Edit & Hapus Periode Tahun Ajaran pada fase ini **belum** memvalidasi apakah periode tersebut sudah dipakai data siswa/tagihan di sekolah manapun (berbeda dari versi lama di Portal Sekolah yang mengunci periode terpakai dari Edit/Hapus menggunakan data lokal sekolah itu sendiri) -- karena Admin Pusat belum punya akses agregat ke data siswa/tagihan tiap sekolah pada prototipe ini. Lihat Pertanyaan Terbuka No. 2 dan Risiko terkait.
- Belum ada riwayat perubahan (audit trail) yang bisa dilihat langsung di UI halaman ini.

**Pertanyaan terbuka:**

| No  | Pertanyaan                                                                                      | Ditujukan ke | Batas jawab  | Jawaban |
| --- | -------------------------------------------------------------------------------------------------- | ------------ | ------------ | ------- |
| 1   | Apakah pernah dibutuhkan pengecualian kalender tahun ajaran per sekolah (mis. sekolah di luar negeri/kalender khusus), atau satu kalender nasional ini memang berlaku mutlak untuk semua sekolah tanpa pengecualian? | PO klien     | [DD-MM-YYYY] | [ ]     |
| 2   | Sebelum go-live, bagaimana cara Admin Pusat mengetahui bahwa suatu Periode Tahun Ajaran sudah dipakai data siswa/tagihan di satu atau lebih sekolah (agar bisa dikunci dari Edit/Hapus)? Apakah lewat API agregasi real-time ke seluruh Portal Sekolah, atau laporan terjadwal? | Solution Architect | [DD-MM-YYYY] | [ ]     |
| 3   | Apakah hak akses modul ini perlu dibuka ke peran lain (mis. Staff Keuangan Pusat) di luar Super Admin pada fase berikutnya? | PO klien     | [DD-MM-YYYY] | [ ]     |

---

## 12. Risiko & Mitigasi

| Risiko                                                                                 | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi                                                                                     | PIC |
| ----------------------------------------------------------------------------------------- | -------------- | ---------------------- | ------------------------------------------------------------------------------------------------ | --- |
| Admin Pusat menghapus atau mengubah tanggal Periode Tahun Ajaran yang sudah dipakai data siswa/tagihan di satu atau lebih sekolah (tidak terdeteksi karena belum ada validasi lintas sekolah, lihat Batasan) -- berisiko merusak riwayat akademik/tagihan sekolah tersebut | H              | M                      | Implementasikan validasi lintas sekolah via API sebelum go-live produksi (lihat Pertanyaan Terbuka No. 2); sampai saat itu, terapkan SOP manual (konfirmasi ke seluruh sekolah sebelum ubah/hapus periode yang sudah berjalan) | [ ] |
| Satu kalender tahun ajaran nasional tidak cocok untuk sekolah dengan kebutuhan kalender berbeda (mis. hasil merger, sekolah baru onboarding di tengah tahun ajaran) | M              | L                      | Konfirmasi ke PO apakah pengecualian per sekolah pernah dibutuhkan (lihat Pertanyaan Terbuka No. 1) sebelum menutup opsi override per sekolah secara permanen | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone      | Deliverable                          | Target tanggal | Kriteria selesai             |
| -------------- | ------------------------------------- | -------------- | ------------------------------- |
| PRD approved   | Dokumen ini v1.0                      | [ ]            | Ditandatangani PO                |
| Desain selesai | Mockup halaman tersendiri             | [ ]            | Review SA & klien                |
| Development    | Implementasi penyimpanan & RBAC tersendiri | [ ]       | Lolos code review                |
| UAT            | Build staging                         | [ ]            | 0 bug critical, sign-off UAT      |
| Go-live        | Production                            | [ ]            | Monitoring 2 minggu stabil        |

---

## 14. Glosarium

| Istilah | Arti                                                                                             |
| ------- | ----------------------------------------------------------------------------------------------------- |
| Periode Tahun Ajaran | Rentang tanggal satu tahun ajaran (mis. "2026/2027", 01 Jul 2026 -- 30 Jun 2027) -- hanya satu yang berstatus Aktif pada satu waktu, menjadi pilihan default saat sekolah membuat tagihan baru |
| Satu Sumber Data (Single Source of Truth) | Prinsip bahwa suatu data (di sini: Periode Tahun Ajaran) hanya dikelola di satu tempat (Admin Pusat) dan dibaca read-only di tempat lain (Portal Sekolah), supaya tidak ada versi data yang berbeda-beda antar sekolah |

---

## 15. Persetujuan

| Peran                 | Nama | Tanda tangan | Tanggal |
| ---------------------- | ---- | ------------- | ------- |
| Product Owner (klien)  | [ ]  | [ ]           | [ ]     |
| Project Manager        | [ ]  | [ ]           | [ ]     |
| Solution Architect     | [ ]  | [ ]           | [ ]     |
| Tech Lead              | [ ]  | [ ]           | [ ]     |

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
