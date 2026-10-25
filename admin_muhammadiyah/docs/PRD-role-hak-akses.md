# PRD: Role & Hak Akses

## 1. Informasi Dokumen

| Atribut | Isi |
| --- | --- |
| Nama produk / fitur | Role & Hak Akses (RBAC -- Role Management) |
| Klien / proyek | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen | v0.1 |
| Status | Draft |
| Penulis | Tim Produk GeekGarden |
| Product Owner | [Nama PO Klien] |
| Solution Architect | [Nama SA] |
| Tanggal dibuat | 25-10-2026 |
| Target rilis | [DD-MM-YYYY / Sprint X] |
| Dokumen terkait | `rbac.html`, `app.js`, PRD Pengguna |

### Riwayat Revisi

| Versi | Tanggal | Penulis | Perubahan |
| --- | --- | --- | --- |
| v0.1 | 25-10-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `rbac.html` (CRUD role penuh: tambah, ubah, hapus role & matriks hak akses modul) |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Role & Hak Akses memungkinkan Super Admin mendefinisikan role (peran) baru, mengubah nama/ikon/deskripsi role yang ada, menghapus role yang tidak dipakai, dan mengatur modul apa saja yang boleh diakses tiap role lewat matriks checkbox. Fitur ini adalah fondasi kontrol akses seluruh platform.

### 2.2 Problem Statement

**Super Admin** mengalami **keterbatasan dalam menyesuaikan struktur peran & hak akses platform sesuai kebutuhan organisasi yang terus berkembang** saat **role dan permission-nya hardcoded/tetap**, yang menyebabkan **platform tidak bisa mengakomodasi peran baru (misal: Admin Keuangan Wilayah) tanpa perubahan kode oleh tim developer**.

### 2.3 Kondisi Saat Ini (As-Is)

Daftar role (Super Admin, Admin Wilayah, Staff Keuangan Pusat, Viewer) dan hak aksesnya didefinisikan secara tetap di kode aplikasi; penambahan atau penghapusan role, maupun penyesuaian hak akses modulnya, memerlukan perubahan kode dan rilis ulang oleh tim developer.

### 2.4 Kondisi yang Diharapkan (To-Be)

Super Admin dapat menambah role baru, mengubah nama/ikon/deskripsi, mencentang/mencentang-ulang modul yang boleh diakses tiap role, dan menghapus role yang sudah tidak terpakai -- semua lewat UI, tanpa menyentuh kode maupun menunggu rilis baru.

### 2.5 Kenapa Sekarang?

Semakin banyak modul yang ditambahkan ke platform (Dashboard, Pendaftaran, Manajemen Sekolah, Konfigurasi Sistem, Pengguna, Role & Hak Akses), kebutuhan kombinasi hak akses antar role juga makin beragam antar wilayah/klien, sehingga pengelolaan role harus fleksibel dan mandiri (self-service).

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memungkinkan Super Admin membuat/mengubah/menghapus role tanpa keterlibatan tim developer.
2. Menjamin selalu ada minimal satu role (Super Admin) dengan akses penuh termasuk ke modul ini sendiri, agar platform tidak pernah terkunci tanpa pengelola akses.
3. Mencegah penghapusan role yang masih dipakai pengguna aktif, untuk menghindari pengguna kehilangan akses secara tidak sengaja.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak mendukung hak akses granular per-aksi (create/read/update/delete) di level modul pada fase ini -- hak akses bersifat on/off per modul (boleh akses halaman atau tidak).
- Tidak mendukung role hierarki/pewarisan (role turunan yang mewarisi sebagian izin role induk).
- Tidak mendukung pembatasan hak akses berdasarkan cakupan wilayah secara otomatis dari modul ini (cakupan wilayah diatur di data pengguna, bukan role).

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| Waktu rata-rata membuat role baru & mengatur izinnya | [ ] (perubahan kode + rilis, berhari-hari) | < 5 menit (self-service) | Timestamp "Simpan Role & Hak Akses" | 1 bulan setelah rilis |
| Jumlah insiden "role terkunci" (tidak ada role yang bisa kelola RBAC) | [ ] | 0 insiden | Monitoring/insiden tercatat | Selamanya (ongoing) |
| % percobaan hapus role gagal karena masih dipakai pengguna (validasi berjalan) | [ ] | 100% dari percobaan yang seharusnya diblok memang diblok | Log percobaan hapus role | 2 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran | Organisasi | RACI | Kepentingan |
| --- | --- | --- | --- |
| Product Owner | Klien (Muhammadiyah Pusat) | A | Menyetujui struktur role & modul yang bisa diatur |
| Solution Architect | GeekGarden | R | Desain model permission & enforcement server-side |
| Tech Lead | GeekGarden | R | Implementasi CRUD role & matriks |
| QA Lead | GeekGarden | C | Strategi pengujian guard (tidak bisa hapus Super Admin/role terpakai) |
| Super Admin | Klien | R | Pengguna utama fitur ini |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Super Admin | Pengelola akses platform tingkat tertinggi | Menyesuaikan role & hak akses sesuai struktur organisasi | Harus minta developer untuk ubah role/izin | Laptop/web |
| Admin Wilayah/Staff Keuangan (role lain) | Pengguna dengan role terbatas | Hanya bisa mengakses modul yang relevan dengan tugasnya | Kadang butuh akses modul baru yang belum diizinkan role-nya | Laptop/web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Tabel matriks Role x Modul dengan checkbox hak akses on/off | Hak akses granular per-aksi (create/read/update/delete) |
| Tambah role baru (ikon, nama, deskripsi, hak akses awal) | Role hierarki/pewarisan izin |
| Edit nama/ikon/deskripsi/hak akses role existing (kecuali Super Admin dikunci) | Pembatasan akses berbasis cakupan wilayah otomatis dari modul ini |
| Hapus role, dengan guard: ditolak jika masih dipakai pengguna aktif atau jika role adalah Super Admin | Audit trail detail siapa mengubah izin role kapan (saat ini hanya toast konfirmasi) |
| Simpan seluruh perubahan matriks sekaligus | Approval berjenjang untuk perubahan hak akses |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Matriks Role x Modul, tambah/edit/hapus role, guard Super Admin & role terpakai.
- **Should have** -- Validasi nama role tidak boleh kosong/duplikat.
- **Could have** -- Riwayat perubahan hak akses (audit trail) per role.
- **Won't have (now)** -- Hak akses granular per-aksi, role hierarki.

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai Super Admin, saya ingin melihat matriks seluruh role dan modul yang bisa mereka akses, supaya saya paham struktur hak akses platform saat ini. | Must | Given saya membuka menu Role & Hak Akses, When halaman dimuat, Then tabel menampilkan setiap role sebagai baris dan setiap modul sebagai kolom checkbox, dengan baris Super Admin tercentang penuh dan terkunci |
| US-02 | Sebagai Super Admin, saya ingin menambahkan role baru dengan nama, ikon, deskripsi, dan hak akses modul tertentu, supaya saya bisa mengakomodasi struktur organisasi baru tanpa menunggu developer. | Must | Given saya menekan "+ Tambah Role", When saya mengisi nama role, mencentang modul yang diizinkan, dan menekan "Simpan Role & Hak Akses", Then role baru tersimpan dan langsung tersedia sebagai pilihan role di menu Pengguna |
| US-03 | Sebagai Super Admin, saya ingin mengubah hak akses modul suatu role yang sudah ada, supaya izin aksesnya sesuai kebutuhan terbaru. | Must | Given saya mencentang/menghilangkan centang pada kolom modul untuk suatu role (bukan Super Admin), When saya menekan "Simpan Role & Hak Akses", Then seluruh pengguna dengan role tersebut mengikuti izin baru pada sesi berikutnya |
| US-04 | Sebagai Super Admin, saya ingin menghapus role yang sudah tidak dipakai, supaya daftar role tetap rapi. | Must | Given suatu role tidak memiliki pengguna aktif yang memakainya, When saya menekan tombol hapus (✕) pada baris role tersebut dan menyimpan, Then role tersebut tidak lagi muncul di matriks maupun di dropdown role pada menu Pengguna |
| US-05 | Sebagai Super Admin, saya ingin dicegah menghapus role yang masih dipakai pengguna, supaya pengguna tidak kehilangan role secara tidak sengaja. | Must | Given suatu role masih dipakai minimal 1 pengguna aktif, When saya menekan tombol hapus pada baris role tersebut, Then sistem menampilkan pesan bahwa role masih dipakai dan baris tidak terhapus |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Matriks Role x Modul | Sistem harus menampilkan tabel dengan setiap role sebagai baris (kolom Icon, Nama Role, Deskripsi, lalu satu kolom checkbox per modul platform) dan kolom Aksi di ujung kanan | US-01 | Must | Daftar modul: Dashboard Konsolidasi, Pendaftaran Sekolah, Manajemen Sekolah, Konfigurasi Sistem, Pengguna, Role & Hak Akses |
| FR-02 | Role Super Admin Terkunci | Sistem harus mengunci baris Super Admin: field ikon & nama tidak bisa diubah, seluruh checkbox tercentang & disabled, dan tombol hapus tidak ditampilkan | US-01 | Must | Mencegah kondisi di mana tidak ada satu pun role yang bisa mengelola modul Role & Hak Akses |
| FR-03 | Tambah Role | Sistem harus menyediakan tombol "+ Tambah Role" yang menambah baris baru dengan field kosong (ikon, nama, deskripsi) dan seluruh checkbox modul dalam keadaan tidak tercentang | US-02 | Must | Baris baru belum tersimpan permanen sampai tombol "Simpan Role & Hak Akses" ditekan |
| FR-04 | Edit Role | Sistem harus mengizinkan Super Admin mengubah ikon, nama, deskripsi, dan checkbox hak akses modul untuk role selain Super Admin | US-03 | Must | Perubahan baru berlaku setelah disimpan |
| FR-05 | Hapus Role (dengan guard) | Sistem harus memvalidasi sebelum menghapus baris role: (a) role bukan Super Admin, dan (b) tidak ada pengguna aktif dengan `roleId` tersebut; jika salah satu gagal, tampilkan pesan penolakan dan batalkan penghapusan | US-04, US-05 | Must | Pesan: "Role masih dipakai pengguna -- pindahkan role pengguna tersebut dulu di menu Pengguna" |
| FR-06 | Simpan Matriks | Sistem harus menyimpan seluruh baris (baru & existing) saat tombol "Simpan Role & Hak Akses" ditekan, melewati baris yang nama role-nya kosong, dan memberi ID baru untuk role baru | US-02, US-03 | Must | Role Super Admin selalu dipaksa seluruh izinnya `true` saat disimpan, terlepas dari status checkbox |
| FR-07 | Sinkronisasi Sidebar | Setelah menyimpan matriks, sistem harus memperbarui tampilan menu sidebar sesuai izin terbaru role milik pengguna yang sedang login | US-03 | Should | Jika pengguna yang login kehilangan akses ke halaman yang sedang dibuka, arahkan ke halaman default role tersebut |

### 6.1 Hak Akses per Peran

| Fitur | Super Admin | Admin Wilayah | Staff Keuangan Pusat | Viewer |
| --- | --- | --- | --- | --- |
| Lihat matriks role & hak akses | CRUD | -- | -- | -- |
| Tambah/edit/hapus role | Ya | -- | -- | -- |
| Role Super Admin dapat dihapus/diubah | Tidak (selalu terkunci) | -- | -- | -- |

*Catatan: hanya role dengan permission `rbac` (default: Super Admin) yang dapat mengakses menu ini.*

### 6.2 Notifikasi

| Pemicu | Penerima | Kanal | Isi singkat |
| --- | --- | --- | --- |
| Hak akses suatu role diubah | Pengguna dengan role tersebut (disarankan) | Email/in-app (belum diimplementasi) | Pemberitahuan ada perubahan modul yang bisa diakses |
| Role dihapus ditolak karena masih dipakai | Super Admin (toast di UI) | In-app toast | Nama role & instruksi tindak lanjut |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Keamanan | Hak akses modul harus ditegakkan di server-side, tidak hanya menyembunyikan menu di UI | 100% endpoint API memvalidasi permission role sebelum memproses request |
| NFR-02 | Integritas | Role Super Admin tidak dapat dihapus atau kehilangan akses penuh dalam kondisi apa pun | 0% kemungkinan sistem kehilangan role dengan akses penuh ke modul Role & Hak Akses |
| NFR-03 | Validasi | Penghapusan role yang masih dipakai pengguna harus diblok 100% dari percobaan | 0% role terhapus saat masih ada pengguna aktif memakainya |
| NFR-04 | Performa | Waktu simpan perubahan matriks role | < 1 detik untuk ≤ 50 role x ≤ 20 modul |
| NFR-05 | Auditability | Setiap perubahan hak akses role (tambah/ubah/hapus) tercatat pelaku & waktu | 100% tercatat di audit log |
| NFR-06 | Usability | Super Admin dapat membuat role baru dengan hak akses yang benar tanpa panduan tambahan | < 3 menit per role baru |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login (sebagai Super Admin) → Menu "Role & Hak Akses" → lihat matriks → (tambah baris role baru / ubah checkbox / hapus baris) → "Simpan Role & Hak Akses" → toast konfirmasi atau penolakan.
- Wireframe: mengikuti struktur `rbac.html` (tabel matriks dengan kolom Icon/Nama Role/Deskripsi/[modul...]/Aksi, tombol tambah di bawah tabel).
- Edge case yang wajib ditangani: mencoba menghapus role yang sedang dipakai pengguna yang sedang login, menyimpan dengan nama role kosong (baris diabaikan), mencoba mencentang izin pada baris Super Admin (diabaikan karena disabled).

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Modul Pengguna | Validasi role masih dipakai sebelum izin hapus; sumber dropdown role saat menambah/edit pengguna | Internal (shared data store) | [ ] | [ ] |
| Seluruh modul platform (Dashboard, Pendaftaran, Manajemen, Konfigurasi) | Penegakan permission saat navigasi/akses halaman | Internal (guard per halaman) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: Role (id, ikon, nama, deskripsi, perms per modul), Modul/Permission Key (daftar modul platform yang bisa diberi izin).
- Retensi data: role yang dihapus idealnya tercatat di audit log historis, meski entitasnya sendiri dihapus dari daftar aktif.
- Laporan yang dibutuhkan: daftar role beserta jumlah pengguna yang memakainya, daftar modul dan role mana saja yang punya akses.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Daftar modul platform (Dashboard, Pendaftaran, Manajemen Sekolah, Konfigurasi, Pengguna, Role & Hak Akses) relatif stabil dan hanya bertambah seiring modul baru dirilis, bukan dihapus sembarangan.
- Satu role dapat dipakai oleh banyak pengguna sekaligus.

**Batasan:**

- Role "Super Admin" tidak dapat dihapus, diganti nama, atau dikurangi izinnya -- ini adalah batasan desain yang disengaja untuk mencegah platform terkunci.

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Apakah dibutuhkan hak akses granular per-aksi (create/read/update/delete) di rilis berikutnya? | PO klien | [DD-MM-YYYY] | [ ] |
| 2 | Apakah perubahan hak akses role perlu approval dari pihak lain sebelum berlaku efektif? | PO klien | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Hak akses modul hanya ditegakkan di UI (client-side), bisa dibypass lewat API langsung | H | M | Wajib implementasi penegakan permission di server-side sebelum produksi | [ ] |
| Guard "role masih dipakai" lolos karena race condition (pengguna ditambahkan ke role bersamaan dengan penghapusan role) | M | L | Validasi ulang di server saat proses simpan, bukan hanya di client | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Model permission & guard rules | [ ] | Review SA & klien |
| Development | CRUD role + matriks + guard | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| RBAC | Role-Based Access Control, model kontrol akses berbasis peran |
| Permission key | Kunci unik yang mewakili satu modul/halaman yang bisa diberi izin akses |
| Guard | Pemeriksaan validasi yang mencegah aksi tidak sah (misal hapus role yang masih dipakai) |

---

## 15. Persetujuan

| Peran | Nama | Tanda tangan | Tanggal |
| --- | --- | --- | --- |
| Product Owner (klien) | [ ] | [ ] | [ ] |
| Project Manager | [ ] | [ ] | [ ] |
| Solution Architect | [ ] | [ ] | [ ] |
| Tech Lead | [ ] | [ ] | [ ] |

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
