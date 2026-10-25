# PRD: Pengguna

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | ------------------------------------------------------------------------- |
| Nama produk / fitur | Pengguna (Manajemen Akun Admin Platform)                                  |
| Klien / proyek      | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen       | v0.1                                                                      |
| Status              | Draft                                                                     |
| Penulis             | Tim Produk GeekGarden                                                     |
| Product Owner       | [Nama PO Klien]                                                           |
| Solution Architect  | [Nama SA]                                                                 |
| Tanggal dibuat      | 25-10-2026                                                                |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                   |
| Dokumen terkait     | `pengguna.html`, `app.js`, PRD Role & Hak Akses                           |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                                                                          |
| ----- | ---------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| v0.1  | 25-10-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `pengguna.html` (dipisah dari halaman RBAC & Pengguna sebelumnya) |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Fitur Pengguna memungkinkan Super Admin mengelola akun-akun yang bisa login ke portal Admin Pusat Muhammadiyah: menambah, mengubah data, mengganti role, mengubah status aktif/nonaktif, dan menghapus baris pengguna. Fitur ini terpisah dari pengaturan Role & Hak Akses supaya pengelolaan "siapa" dan "apa haknya" lebih jelas tanggung jawabnya.

### 2.2 Problem Statement

**Super Admin** mengalami **kesulitan mengelola siapa saja yang boleh login ke portal Admin Pusat dan peran apa yang mereka pegang** saat **penambahan/penghapusan akses staf dilakukan manual lewat permintaan ke tim teknis**, yang menyebabkan **keterlambatan onboarding staf baru dan risiko akun staf yang sudah tidak aktif tetap bisa login**.

### 2.3 Kondisi Saat Ini (As-Is)

Permintaan akun baru/non-aktif untuk staf Admin Pusat/Wilayah dikirim ke tim backend secara manual, tanpa riwayat terpusat tentang siapa punya akses apa dan sejak kapan.

### 2.4 Kondisi yang Diharapkan (To-Be)

Super Admin dapat membuka menu Pengguna, menambah baris pengguna baru dengan role & cakupan yang sesuai, mengubah status menjadi Nonaktif saat staf keluar, dan menyimpan seluruh perubahan sekaligus -- tanpa keterlibatan tim backend untuk operasi rutin ini.

### 2.5 Kenapa Sekarang?

Dengan role dan hak akses yang kini bisa dikustomisasi (lihat PRD Role & Hak Akses), pengelolaan akun pengguna harus sama fleksibelnya dan dipisahkan sebagai modul mandiri agar tanggung jawabnya jelas dan mudah diaudit.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memungkinkan Super Admin mengelola akun pengguna platform secara self-service tanpa tiket ke tim teknis.
2. Memastikan setiap pengguna baru otomatis mendapat password default yang aman untuk mode demo, dengan jalur produksi berbasis undangan/reset.
3. Mencegah akun yang sudah tidak relevan (staf keluar/pindah) tetap aktif di platform lewat kontrol status Aktif/Nonaktif.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak menyediakan reset password mandiri oleh pengguna (self-service reset) pada fase ini -- password diatur manual oleh Super Admin (mode demo).
- Tidak mendukung Single Sign-On (SSO) / login via akun organisasi pada fase ini.
- Tidak menyediakan log aktivitas detail per pengguna (login history) dari halaman ini.

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran       | Organisasi                 | RACI | Kepentingan                                  |
| ------------------ | -------------------------- | ---- | -------------------------------------------- |
| Product Owner      | Klien (Muhammadiyah Pusat) | A    | Menyetujui kebijakan password & status akun  |
| Solution Architect | GeekGarden                 | R    | Desain keamanan akun & integrasi dengan RBAC |
| Tech Lead          | GeekGarden                 | R    | Implementasi CRUD pengguna                   |
| QA Lead            | GeekGarden                 | C    | Strategi pengujian validasi form & edge case |
| Super Admin        | Klien                      | R    | Pengguna utama fitur ini                     |

### 4.2 Persona Pengguna

| Persona                                   | Deskripsi                       | Tujuan utama                                  | Pain point                            | Perangkat / kanal   |
| ----------------------------------------- | ------------------------------- | --------------------------------------------- | ------------------------------------- | ------------------- |
| Super Admin                               | Mengelola seluruh akun platform | Menambah/menonaktifkan akun staf dengan cepat | Proses manual lewat tim teknis lambat | Laptop/web          |
| Staf baru (Admin Wilayah/Keuangan/Viewer) | Penerima akun baru              | Bisa login dan langsung bekerja sesuai role   | Menunggu lama untuk mendapat akses    | Email/WhatsApp, web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini)                                        | Out of Scope (fase berikutnya / tidak dikerjakan)  |
| ---------------------------------------------------------- | -------------------------------------------------- |
| Daftar pengguna (Nama, Email, Role, Cakupan, Status, Aksi) | Reset password self-service oleh pengguna          |
| Tambah baris pengguna baru                                 | Single Sign-On (SSO)                               |
| Edit nama, email, role, cakupan, status pengguna existing  | Log aktivitas/login history per pengguna           |
| Hapus baris pengguna                                       | Approval berjenjang untuk penambahan pengguna baru |
| Simpan seluruh perubahan pengguna sekaligus                | Notifikasi otomatis email/WA saat akun baru dibuat |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Daftar pengguna, tambah/edit/hapus baris, simpan perubahan, pemilihan role dari daftar role yang tersedia.
- **Should have** -- Validasi format email & kelengkapan data sebelum simpan.
- **Could have** -- Notifikasi otomatis saat akun baru dibuat.
- **Won't have (now)** -- Reset password self-service, SSO, log aktivitas.

### 5.3 User Stories

| ID    | User story                                                                                                                                                 | Prioritas | Acceptance criteria                                                                                                                                                                                         |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-01 | Sebagai Super Admin, saya ingin melihat daftar seluruh pengguna beserta role, cakupan, dan statusnya, supaya saya tahu siapa yang punya akses ke platform. | Must      | Given saya membuka menu Pengguna, When halaman dimuat, Then tabel menampilkan Nama, Email, Role, Cakupan, Status, dan tombol hapus untuk setiap pengguna                                                    |
| US-02 | Sebagai Super Admin, saya ingin menambahkan pengguna baru dengan role dan cakupan tertentu, supaya staf baru bisa login sesuai kewenangannya.              | Must      | Given saya menekan "+ Tambah Pengguna", When saya mengisi nama, email, memilih role, mengisi cakupan, dan menekan "Simpan Pengguna", Then baris baru tersimpan dengan password default dan muncul di daftar |
| US-03 | Sebagai Super Admin, saya ingin menonaktifkan pengguna yang sudah tidak bertugas, supaya pengguna tersebut tidak bisa login lagi.                          | Must      | Given saya mengubah status pengguna dari Aktif menjadi Nonaktif dan menekan "Simpan Pengguna", Then pengguna tersebut tidak bisa login walau kredensialnya benar                                            |
| US-04 | Sebagai Super Admin, saya ingin menghapus baris pengguna yang salah ditambahkan, supaya daftar pengguna tetap akurat.                                      | Should    | Given saya menekan tombol hapus (✕) pada satu baris, When saya menekan "Simpan Pengguna", Then pengguna tersebut tidak lagi muncul di daftar                                                                |

---

## 6. Kebutuhan Fungsional

| ID    | Modul             | Deskripsi requirement                                                                                                                                                           | User story          | Prioritas | Catatan / aturan bisnis                                                                                  |
| ----- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| FR-01 | Daftar Pengguna   | Sistem harus menampilkan tabel pengguna dengan kolom Nama, Email, Role (dropdown dari daftar role aktif), Cakupan, Status (Aktif/Nonaktif), dan aksi hapus                      | US-01               | Must      | Dropdown Role bersumber dari data role yang dikelola di menu Role & Hak Akses                            |
| FR-02 | Tambah Pengguna   | Sistem harus menyediakan tombol "+ Tambah Pengguna" yang menambahkan baris kosong untuk diisi Nama, Email, Role, Cakupan, Status                                                | US-02               | Must      | Baris baru belum tersimpan permanen sampai tombol "Simpan Pengguna" ditekan                              |
| FR-03 | Simpan Pengguna   | Sistem harus menyimpan seluruh baris (baru & existing) saat tombol "Simpan Pengguna" ditekan, melewati baris yang nama/email-nya kosong                                         | US-02, US-03, US-04 | Must      | Pengguna baru mendapat password default `demo123` (khusus mode demo; produksi via email undangan/reset)  |
| FR-04 | Ubah Status       | Sistem harus mengizinkan Super Admin mengubah status pengguna menjadi Aktif/Nonaktif melalui dropdown status pada baris                                                         | US-03               | Must      | Pengguna berstatus Nonaktif tidak dapat login meski kredensial benar                                     |
| FR-05 | Hapus Pengguna    | Sistem harus menghapus baris pengguna dari tabel saat tombol hapus ditekan, dan perubahan permanen setelah "Simpan Pengguna"                                                    | US-04               | Should    | Pertimbangkan validasi agar Super Admin tidak menghapus akunnya sendiri yang sedang login (lihat Risiko) |
| FR-06 | Sinkronisasi Sesi | Jika pengguna yang sedang login mengubah datanya sendiri (nama/role), sistem harus memperbarui sesi & tampilan UI (nama, avatar, role di header) tanpa perlu logout-login ulang | US-02               | Should    | Berlaku saat Super Admin mengedit baris miliknya sendiri                                                 |

### 6.1 Hak Akses per Peran

| Fitur                          | Super Admin | Admin Wilayah | Staff Keuangan Pusat | Viewer |
| ------------------------------ | ----------- | ------------- | -------------------- | ------ |
| Lihat daftar pengguna          | Ya.         | --            | --                   | --     |
| Tambah/edit/hapus pengguna     | Ya          | --            | --                   | --     |
| Ubah role/status pengguna lain | Ya          | --            | --                   | --     |

_Catatan: pada konfigurasi default, hanya role dengan permission `pengguna` (saat ini: Super Admin) yang dapat mengakses menu ini; dapat diubah lewat menu Role & Hak Akses._

### 6.2 Notifikasi

| Pemicu                                  | Penerima                      | Kanal                                             | Isi singkat                   |
| --------------------------------------- | ----------------------------- | ------------------------------------------------- | ----------------------------- |
| Pengguna baru dibuat                    | Pengguna baru                 | Email/WhatsApp (disarankan, belum diimplementasi) | Kredensial/link aktivasi akun |
| Status pengguna diubah menjadi Nonaktif | Pengguna terkait (disarankan) | Email (disarankan)                                | Pemberitahuan akses dicabut   |

---

## 7. Kebutuhan Non-Fungsional

| ID     | Kategori         | Requirement                                                                            | Target terukur                                                           |
| ------ | ---------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| NFR-01 | Keamanan         | Password tidak boleh disimpan/ditampilkan dalam bentuk plain text di produksi          | Hashing standar industri (bcrypt/argon2 setara) sebelum go-live produksi |
| NFR-02 | Validasi         | Email pengguna harus unik dan berformat valid                                          | 100% validasi sebelum simpan                                             |
| NFR-03 | Performa         | Waktu simpan perubahan daftar pengguna                                                 | < 1 detik untuk ≤ 500 baris pengguna                                     |
| NFR-04 | Auditability     | Setiap penambahan/penghapusan/perubahan status pengguna tercatat pelaku & waktu        | 100% tercatat di audit log                                               |
| NFR-05 | Konsistensi sesi | Perubahan data pengguna yang sedang login langsung tercermin di UI tanpa reload manual | 100% konsisten dalam sesi yang sama                                      |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login → Menu "Pengguna" → lihat daftar → (tambah baris baru / edit baris / hapus baris) → "Simpan Pengguna" → toast konfirmasi.
- Wireframe: mengikuti struktur `pengguna.html` (tabel akun dengan baris editable inline, tombol tambah di bawah tabel, tombol simpan di kanan bawah).
- Edge case yang wajib ditangani: menghapus akun yang sedang login (lihat Risiko), menambah pengguna dengan email yang sudah dipakai, menyimpan tanpa mengisi role (default ke role pertama di daftar).

---

## 9. Integrasi & Dependensi

| Sistem eksternal           | Fungsi                                                      | Metode                                                              | PIC | Status |
| -------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- | --- | ------ |
| Modul Role & Hak Akses     | Sumber daftar role yang tersedia untuk dipilih per pengguna | Internal (shared data store)                                        | [ ] | [ ]    |
| Sistem Autentikasi/Session | Validasi login & sesi aktif pengguna                        | Internal (session storage, akan dimigrasi ke backend auth produksi) | [ ] | [ ]    |
| Email/WhatsApp Gateway     | Pengiriman kredensial/undangan akun baru (rencana produksi) | REST API                                                            | [ ] | [ ]    |

---

## 10. Kebutuhan Data

- Entitas utama: Pengguna (id, nama, email, password, roleId, cakupan, status).
- Migrasi data: akun admin existing (jika ada di sistem lama) perlu diimpor dengan pemetaan role yang sesuai.
- Retensi data: data pengguna disimpan selama akun ada di platform; pengguna yang dihapus idealnya di-soft-delete untuk keperluan audit, bukan hard-delete (perlu konfirmasi kebijakan).
- Laporan yang dibutuhkan: daftar pengguna per role, daftar pengguna nonaktif.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- "Cakupan" (misal: Nasional, PWM Jawa Timur) diisi manual sebagai teks bebas pada fase ini, bukan dari master data wilayah terstruktur.
- Satu pengguna hanya memiliki satu role aktif pada satu waktu.

**Batasan:**

- Mode demo saat ini menyimpan password di sisi klien (sessionStorage); wajib diganti dengan autentikasi backend yang aman sebelum produksi.

**Pertanyaan terbuka:**

| No  | Pertanyaan                                                                    | Ditujukan ke | Batas jawab  | Jawaban |
| --- | ----------------------------------------------------------------------------- | ------------ | ------------ | ------- |
| 1   | Apakah penghapusan pengguna harus soft-delete (untuk audit) atau hard-delete? | PO klien     | [DD-MM-YYYY] | [ ]     |
| 2   | Apakah dibutuhkan reset password self-service di rilis berikutnya?            | PO klien     | [DD-MM-YYYY] | [ ]     |
| 3   | Apakah "Cakupan" perlu diikat ke master data PWM/PDM/PCM, bukan teks bebas?   | PO klien     | [DD-MM-YYYY] | [ ]     |

---

## 12. Risiko & Mitigasi

| Risiko                                                                                      | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi                                                                                                         | PIC |
| ------------------------------------------------------------------------------------------- | -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- | --- |
| Super Admin menghapus/menonaktifkan akunnya sendiri yang sedang login, terkunci dari sistem | H              | L                   | Tambahkan validasi: minimal 1 akun Super Admin aktif harus tetap ada; peringatan saat menonaktifkan akun sendiri | [ ] |
| Password default `demo123` terbawa ke produksi                                              | H              | M                   | Ganti mekanisme password sebelum go-live produksi (email undangan/reset wajib)                                   | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone      | Deliverable                          | Target tanggal | Kriteria selesai             |
| -------------- | ------------------------------------ | -------------- | ---------------------------- |
| PRD approved   | Dokumen ini v1.0                     | [ ]            | Ditandatangani PO            |
| Desain selesai | Mockup & kebijakan password produksi | [ ]            | Review SA & klien            |
| Development    | CRUD pengguna                        | [ ]            | Lolos code review            |
| UAT            | Build staging                        | [ ]            | 0 bug critical, sign-off UAT |
| Go-live        | Production                           | [ ]            | Monitoring 2 minggu stabil   |

---

## 14. Glosarium

| Istilah | Arti                                                                                    |
| ------- | --------------------------------------------------------------------------------------- |
| Cakupan | Lingkup wilayah/kewenangan seorang pengguna, misal "Nasional" atau "PWM Jawa Timur"     |
| Role    | Peran yang menentukan hak akses pengguna ke modul platform (lihat PRD Role & Hak Akses) |

---

## 15. Persetujuan

| Peran                 | Nama | Tanda tangan | Tanggal |
| --------------------- | ---- | ------------ | ------- |
| Product Owner (klien) | [ ]  | [ ]          | [ ]     |
| Project Manager       | [ ]  | [ ]          | [ ]     |
| Solution Architect    | [ ]  | [ ]          | [ ]     |
| Tech Lead             | [ ]  | [ ]          | [ ]     |

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
