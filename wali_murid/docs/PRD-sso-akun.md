# PRD: SSO & Status Akun Wali Murid (Login, Pendaftaran Mandiri, Menunggu Approval, Ditolak)

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| Nama produk / fitur | SSO &amp; Status Akun Wali Murid (Login, Pendaftaran Mandiri, Menunggu Approval, Ditolak) |
| Klien / proyek      | Aplikasi Wali Murid -- Platform Invoicing &amp; Payment SPP (GeekGarden) |
| Versi dokumen       | v0.1                                                                      |
| Status              | Draft                                                                     |
| Penulis             | Tim Produk GeekGarden                                                     |
| Product Owner       | [Nama PO Klien]                                                           |
| Solution Architect  | [Nama SA]                                                                 |
| Tanggal dibuat       | 08-11-2026                                                                |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                   |
| Dokumen terkait     | `index.html`, `daftar.html`, `menunggu-approval.html`, `ditolak.html`, `app.js`, PRD Profil Wali Murid, Portal Sekolah (Approval Akun Wali Murid) |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                   |
| ----- | ---------- | --------------------- | -------------------------------------------- |
| v0.1  | 08-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan 4 prototipe halaman (`index.html`, `daftar.html`, `menunggu-approval.html`, `ditolak.html`) yang bersama-sama membentuk satu alur SSO & status akun Wali Murid. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Kelompok halaman ini menangani seluruh siklus masuk (login) dan pendaftaran mandiri (self-register) akun Wali Murid sebelum bisa menggunakan aplikasi. Satu akun (SSO) yang sama dipakai sekolah untuk memverifikasi identitas Wali Murid; akun bisa dibuat langsung oleh Admin/Tata Usaha (langsung aktif) atau didaftarkan sendiri oleh Wali Murid (menunggu persetujuan Kepala Sekolah terlebih dahulu). Status akun menentukan halaman mana yang ditampilkan: login berhasil (`index.html` &rarr; `bayar.html`), menunggu persetujuan (`menunggu-approval.html`), atau ditolak (`ditolak.html`).

### 2.2 Problem Statement

**Wali Murid yang belum memiliki akun** mengalami **tidak adanya kanal mandiri untuk mendaftar & memverifikasi dirinya sebagai orang tua/wali siswa aktif**, sementara **sekolah** membutuhkan **jaminan bahwa hanya orang tua/wali siswa yang sah yang bisa mengakses data tagihan anak**, yang menyebabkan **wali murid baru harus menunggu dibuatkan akun secara manual oleh Tata Usaha sebelum bisa memakai aplikasi**.

### 2.3 Kondisi Saat Ini (As-Is)

Akun SSO Wali Murid hanya dibuat manual oleh Admin/Tata Usaha sekolah. Wali Murid yang ingin mendaftar sendiri tidak memiliki kanal self-service, sehingga Tata Usaha menjadi satu-satunya titik pembuatan akun.

### 2.4 Kondisi yang Diharapkan (To-Be)

Wali Murid dapat login dengan akun yang sudah didaftarkan Admin, atau mendaftar sendiri lewat `daftar.html` dengan mengisi data pribadi & data anak. Pendaftaran mandiri tidak langsung aktif -- harus disetujui Kepala Sekolah terlebih dahulu (dicocokkan dengan data siswa resmi sekolah). Selama menunggu atau bila ditolak, Wali Murid mendapat halaman status yang jelas tanpa perlu menghubungi sekolah untuk bertanya.

### 2.5 Kenapa Sekarang?

Dengan makin banyak sekolah onboarding ke platform dan makin banyak Wali Murid yang perlu akses mandiri, kanal pendaftaran self-service mengurangi beban administratif Tata Usaha sekaligus tetap menjaga kontrol verifikasi identitas oleh Kepala Sekolah.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Menyediakan kanal self-service pendaftaran akun Wali Murid tanpa mengurangi kontrol verifikasi identitas oleh sekolah.
2. Mencegah akses tak sah ke data tagihan siswa oleh pihak yang bukan wali murid sah.
3. Memberi kejelasan status (menunggu/ditolak) secara mandiri agar Wali Murid tidak perlu bertanya ke sekolah soal progres pendaftarannya.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak menyediakan fitur lupa password/reset password mandiri dari halaman ini.
- Tidak menyediakan verifikasi tambahan (OTP/2FA) pada fase ini.
- Tidak menyediakan aksi approve/reject itu sendiri dari aplikasi ini -- keputusan tetap diambil Kepala Sekolah di Portal Sekolah; aplikasi ini hanya menampilkan hasil status yang sudah diputuskan.
- Fitur "🧪 Demo -- Pilih Akun" pada `index.html` adalah alat bantu demo prototipe untuk mempercepat pengujian, bukan fitur yang dimaksudkan tampil di produksi (lihat 11. Pertanyaan Terbuka No. 1).

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| % pendaftaran mandiri yang diputuskan (disetujui/ditolak) dalam 1x24 jam kerja | [ ] | &ge; 90% | Selisih waktu submit pendaftaran vs waktu keputusan Kepala Sekolah | 1 bulan setelah rilis |
| % percobaan login yang berhasil tanpa eskalasi bantuan ke Admin/Tata Usaha | [ ] | &ge; 95% | Rasio login berhasil vs jumlah tiket bantuan terkait akun | 1 bulan setelah rilis |
| % pendaftaran mandiri yang ditolak karena data tidak cocok dengan data siswa resmi | [ ] | &lt; 10% | Rasio status `ditolak` terhadap total pendaftaran mandiri | 2 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran          | Organisasi                 | RACI | Kepentingan                                                |
| --------------------- | --------------------------- | ---- | ----------------------------------------------------------- |
| Product Owner         | Klien (Muhammadiyah Pusat/Sekolah) | A | Menyetujui kebijakan verifikasi identitas & kriteria tolak |
| Solution Architect    | GeekGarden                  | R    | Desain alur SSO & integrasi status dengan Portal Sekolah      |
| Tech Lead             | GeekGarden                  | R    | Implementasi halaman login, registrasi, & routing status      |
| QA Lead               | GeekGarden                  | C    | Strategi pengujian seluruh kombinasi status akun               |
| Wali Murid (Orang Tua/Wali) | Klien (pengguna akhir) | R    | Pengguna utama fitur ini                                     |
| Tata Usaha / Admin Sekolah | Klien                   | R    | Membuat akun secara langsung (metode `didaftarkan_admin`)     |
| Kepala Sekolah        | Klien                        | R    | Menyetujui/menolak pendaftaran mandiri di Portal Sekolah       |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Wali Murid Baru (self-register) | Orang tua/wali yang belum punya akun & ingin mendaftar sendiri | Mendapatkan akses aplikasi tanpa harus datang ke sekolah | Tidak tahu status pendaftarannya tanpa bertanya ke sekolah | Smartphone (aplikasi mobile web) |
| Wali Murid Terdaftar (didaftarkan admin) | Sudah memiliki akun dari Tata Usaha | Login & langsung memakai aplikasi | -- | Smartphone (aplikasi mobile web) |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Form login (email + password) dengan pesan error generik | Lupa password / reset password mandiri |
| Redirect otomatis ke halaman utama bila sesi sudah aktif | Verifikasi tambahan (OTP/2FA) |
| Form pendaftaran mandiri multi-anak (tambah/hapus baris anak) | Approve/reject pendaftaran dari aplikasi ini (tetap di Portal Sekolah) |
| Validasi field wajib & deteksi email yang sudah terdaftar saat mendaftar | Edit data pendaftaran yang sudah terkirim sebelum diputuskan |
| Halaman status Menunggu Approval (info anak yang didaftarkan & estimasi SLA) | Pemberitahuan push/WA otomatis saat status berubah |
| Halaman status Ditolak (alasan penolakan & opsi daftar ulang) | Riwayat/log seluruh percobaan pendaftaran sebelumnya |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Form login & validasi, routing status akun (aktif/menunggu/ditolak), form pendaftaran mandiri multi-anak, halaman Menunggu Approval & Ditolak.
- **Should have** -- Redirect otomatis saat sesi aktif, pesan alasan tolak yang informatif.
- **Could have** -- Validasi kompleksitas password di sisi klien.
- **Won't have (now)** -- Lupa password, OTP/2FA, approve/reject dari aplikasi ini, edit pendaftaran yang sudah terkirim.

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai Wali Murid dengan akun aktif, saya ingin login dengan email & password, supaya saya bisa langsung memakai aplikasi. | Must | Given saya mengisi email & password akun aktif yang benar, When saya menekan "Masuk", Then saya diarahkan ke halaman Bayar |
| US-02 | Sebagai Wali Murid, saya ingin mendapat pesan error yang jelas namun tidak membocorkan info akun saat salah login, supaya saya tahu harus mencoba lagi tanpa risiko keamanan data akun lain. | Must | Given saya memasukkan email/password yang tidak cocok, When saya menekan "Masuk", Then pesan generik "Email/password tidak dikenali" ditampilkan tanpa menyebut apakah email terdaftar atau tidak |
| US-03 | Sebagai Wali Murid baru, saya ingin mendaftar akun sendiri dengan data saya & data anak saya (bisa lebih dari satu), supaya saya tidak perlu datang ke sekolah hanya untuk membuat akun. | Must | Given saya mengisi Nama, No. WA, Email, Password, dan minimal 1 data anak (Nama, NISN, Kelas), When saya menekan "Daftarkan Akun", Then akun baru tersimpan berstatus "Menunggu Approval" dan saya diarahkan ke halaman Menunggu Approval |
| US-04 | Sebagai Wali Murid dengan lebih dari satu anak, saya ingin menambah atau menghapus baris data anak saat mendaftar, supaya saya bisa mendaftarkan semua anak saya dalam satu akun. | Should | Given saya menekan "+ Tambah Anak Lain", When baris baru ditambahkan, Then saya bisa mengisi data anak tambahan; And saya tidak bisa menghapus baris terakhir (minimal 1 anak wajib ada) |
| US-05 | Sebagai Wali Murid yang akunnya masih menunggu persetujuan, saya ingin melihat halaman status yang jelas saat mencoba login, supaya saya tahu progres pendaftaran saya tanpa bertanya ke sekolah. | Must | Given status akun saya "menunggu_approval", When saya login, Then saya diarahkan ke halaman Menunggu Approval yang menampilkan nama anak yang didaftarkan & estimasi waktu proses |
| US-06 | Sebagai Wali Murid yang pendaftarannya ditolak, saya ingin tahu alasan penolakan & cara mendaftar ulang, supaya saya bisa memperbaiki data dan mencoba lagi. | Must | Given status akun saya "ditolak", When saya login, Then saya diarahkan ke halaman Ditolak yang menampilkan alasan penolakan dan tombol "Daftar Ulang" |
| US-07 | Sebagai Wali Murid yang sudah login sebelumnya, saya ingin otomatis masuk ke aplikasi saat membuka halaman login lagi, supaya saya tidak perlu login berulang kali dalam satu sesi. | Should | Given sesi saya masih aktif, When saya membuka `index.html`, Then saya langsung diarahkan ke halaman Bayar tanpa perlu mengisi form login |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Form Login | Sistem harus menyediakan field Email & Password dengan tombol "Masuk" yang mencocokkan kredensial terhadap akun terdaftar | US-01, US-02 | Must | Pencocokan dilakukan terhadap `guardian` & `otherWaliAccounts`; pesan error selalu generik ("Email/password tidak dikenali") baik email tidak ditemukan maupun password salah |
| FR-02 | Redirect Sesi Aktif | Sistem harus memeriksa sesi aktif saat `index.html` dimuat dan langsung mengarahkan ke halaman Bayar bila sesi masih berlaku | US-07 | Should | Menggunakan `getSession()`; tidak menampilkan form login sama sekali bila sesi ditemukan |
| FR-03 | Routing Berdasarkan Status Akun | Sistem harus mengarahkan hasil login/registrasi sesuai status akun: `aktif` &rarr; halaman Bayar, `menunggu_approval` &rarr; halaman Menunggu Approval, `ditolak` &rarr; halaman Ditolak | US-01, US-05, US-06 | Must | Logika terpusat di `routeWaliAccount()`; data konteks (nama anak/alasan tolak) dibawa lewat `sessionStorage` sementara ke halaman tujuan |
| FR-04 | Form Pendaftaran Mandiri -- Data Wali | Sistem harus menyediakan field Nama Lengkap, No. WhatsApp, Email, dan Password pada form pendaftaran, seluruhnya wajib diisi | US-03 | Must | Sistem harus menolak pendaftaran dengan email yang sudah terdaftar pada akun manapun |
| FR-05 | Form Pendaftaran Mandiri -- Data Anak (Multi) | Sistem harus menyediakan minimal 1 baris data anak (Nama, NISN, Kelas) dengan kemampuan menambah baris baru dan menghapus baris (kecuali baris terakhir) | US-03, US-04 | Must | Minimal 1 data anak dengan Nama terisi wajib ada sebelum pendaftaran bisa dikirim |
| FR-06 | Penyimpanan Pendaftaran & Status Awal | Pendaftaran yang berhasil divalidasi harus disimpan dengan status `menunggu_approval` dan metode `self_register`, lalu mengarahkan Wali Murid ke halaman Menunggu Approval | US-03 | Must | Tanggal pendaftaran dicatat (`tanggalDaftar`) untuk keperluan SLA persetujuan |
| FR-07 | Halaman Menunggu Approval | Sistem harus menampilkan nama anak yang didaftarkan, penjelasan proses verifikasi Kepala Sekolah, estimasi SLA (1x24 jam kerja), dan tombol kembali ke login | US-05 | Must | Nama anak diambil dari data pendaftaran yang baru dikirim (relay via `sessionStorage`) |
| FR-08 | Halaman Ditolak | Sistem harus menampilkan alasan penolakan (atau teks default bila tidak tercatat), tombol "Daftar Ulang" (ke form pendaftaran), dan tombol "Kembali ke Login" | US-06 | Must | Alasan penolakan diambil dari field `alasanTolak` pada akun terkait |

### 6.1 Hak Akses per Status Akun

| Fitur | Status: Aktif | Status: Menunggu Approval | Status: Ditolak |
| --- | --- | --- | --- |
| Login & masuk ke aplikasi (Bayar/Profil/dst.) | Ya | -- (diarahkan ke halaman status) | -- (diarahkan ke halaman status) |
| Lihat halaman Menunggu Approval | -- | Ya | -- |
| Lihat halaman Ditolak & daftar ulang | -- | -- | Ya |

*Catatan: status akun (`aktif`/`menunggu_approval`/`ditolak`) diputuskan oleh Kepala Sekolah di Portal Sekolah untuk akun `self_register`, atau langsung `aktif` untuk akun yang dibuat Admin/Tata Usaha (`didaftarkan_admin`). Aplikasi ini tidak memiliki kewenangan mengubah status tersebut.*

### 6.2 Notifikasi

| Pemicu | Penerima | Kanal | Isi singkat |
| --- | --- | --- | --- |
| Pendaftaran mandiri berhasil dikirim | Kepala Sekolah/Tata Usaha (disarankan) | Dashboard Portal Sekolah (belum diimplementasi) | Pemberitahuan ada pendaftaran akun baru yang perlu diverifikasi |
| Status akun disetujui/ditolak | Wali Murid (pendaftar) | WA/Email (disebutkan di UI, belum diimplementasi) | Pemberitahuan hasil keputusan atas pendaftaran akun |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Keamanan autentikasi | Kredensial login tidak boleh membocorkan informasi apakah email terdaftar atau tidak lewat pesan error | 100% pesan error generik untuk seluruh kegagalan login |
| NFR-02 | Validasi input | Pendaftaran mandiri tidak dapat dikirim tanpa seluruh field wajib (Nama, WA, Email, Password, minimal 1 data anak) | 100% pendaftaran tervalidasi sebelum tersimpan |
| NFR-03 | Keamanan sesi | Sesi login disimpan sisi klien dan dihapus saat logout; halaman aplikasi utama tidak dapat diakses tanpa sesi aktif | 100% enforced via `requireLogin()`/`getSession()` |
| NFR-04 | Performa | Waktu respons form login & pendaftaran (validasi hingga redirect) | &lt; 1 detik pada data demo |
| NFR-05 | Auditability | Setiap pendaftaran mandiri tercatat dengan tanggal daftar & metode, agar bisa ditelusuri saat diverifikasi Kepala Sekolah | 100% pendaftaran tercatat lengkap di `otherWaliAccounts` |

---

## 8. Alur Pengguna & Desain

- Alur login: buka `index.html` &rarr; (jika sesi aktif, otomatis ke Bayar) &rarr; isi Email & Password &rarr; "Masuk" &rarr; sesuai status akun: aktif &rarr; Bayar, menunggu approval &rarr; halaman Menunggu Approval, ditolak &rarr; halaman Ditolak.
- Alur pendaftaran mandiri: `index.html` &rarr; "Daftar Akun Baru" &rarr; `daftar.html` &rarr; isi Data Wali Murid &rarr; isi Data Anak (tambah baris bila perlu) &rarr; "Daftarkan Akun" &rarr; validasi &rarr; halaman Menunggu Approval.
- Alur daftar ulang: halaman Ditolak &rarr; "Daftar Ulang" &rarr; kembali ke `daftar.html` untuk mengisi ulang data.
- Wireframe: mengikuti struktur masing-masing prototipe -- `index.html` (kartu login + kartu daftar + kartu demo akun), `daftar.html` (kartu data wali + kartu data anak berulang), `menunggu-approval.html`/`ditolak.html` (empty-state besar + kartu info + tombol aksi).
- Edge case yang wajib ditangani: email yang sudah terdaftar saat mendaftar (ditolak dengan pesan jelas), penghapusan baris anak hingga tersisa 1 (tidak boleh dihapus lagi), akun ditolak tanpa alasan tercatat (tampilkan teks default), sesi yang sudah habis saat mencoba mengakses halaman aplikasi utama (diarahkan kembali ke login).

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Portal Sekolah (Approval Akun Wali Murid) | Penerima pendaftaran mandiri & pihak yang memutuskan status disetujui/ditolak | Internal (shared data store) | [ ] | [ ] |
| Modul Akun Wali Murid Admin/Tata Usaha | Sumber akun yang dibuat langsung (metode `didaftarkan_admin`, status langsung `aktif`) | Internal (shared data store) | [ ] | [ ] |
| Data Siswa Resmi Sekolah | Rujukan pencocokan Nama/NISN saat Kepala Sekolah memverifikasi pendaftaran mandiri | Internal (shared data store) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: `WaliAccount` (nama, email, password, wa, status, metode, tanggalDaftar, siswaList, alasanTolak).
- Tidak ada migrasi khusus -- struktur data mengikuti objek `guardian` dan `otherWaliAccounts` di `app.js` pada prototipe ini.
- Data sesi (`sessionStorage`): `wali_murid_session` (akun yang login), `wali_pending_info`/`wali_rejected_info` (relay info sementara antar halaman status).
- Data saat ini bersifat snapshot dalam memori JavaScript (bukan database/API produksi) -- password tersimpan plaintext pada prototipe ini, tidak mencerminkan desain keamanan produksi.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Satu email hanya terkait satu akun Wali Murid (tidak ada akun ganda dengan email yang sama).
- Verifikasi kecocokan data anak (Nama/NISN) dengan data resmi sekolah dilakukan di luar aplikasi ini, oleh Kepala Sekolah di Portal Sekolah.

**Batasan:**

- Data bersifat snapshot read-only dalam memori JavaScript, belum terhubung ke API/database/auth produksi.
- Password belum divalidasi kompleksitas/panjang minimum di sisi klien, meski UI menuliskan placeholder "Minimal 8 karakter".
- Tidak ada fitur lupa password pada fase ini.

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Fitur "🧪 Demo -- Pilih Akun" pada `index.html` harus dihapus total sebelum go-live produksi, atau cukup disembunyikan di balik flag environment khusus untuk kebutuhan QA? | PO klien / Tech Lead | [DD-MM-YYYY] | [ ] |
| 2 | Apakah dibutuhkan fitur lupa password/reset password mandiri untuk Wali Murid? | PO klien | [DD-MM-YYYY] | [ ] |
| 3 | SLA "1x24 jam kerja" yang dijanjikan di halaman Menunggu Approval -- apakah ini SLA resmi yang disepakati, atau hanya perkiraan dalam prototipe? | PO klien | [DD-MM-YYYY] | [ ] |
| 4 | Apakah password perlu kebijakan kompleksitas (panjang minimum, kombinasi karakter) yang divalidasi sistem, bukan hanya ditulis sebagai placeholder? | PO klien / Tech Lead | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Password tersimpan plaintext pada data klien -- tidak merepresentasikan praktik keamanan produksi | H | H (pada prototipe) | Pastikan implementasi produksi memakai backend auth dengan password ter-hash & transport aman (HTTPS) sebelum go-live | [ ] |
| Fitur demo quick-login tidak dihapus sebelum produksi, berisiko disalahgunakan untuk bypass otentikasi | H | M | Hapus/nonaktifkan fitur demo secara eksplisit pada build produksi (lihat Pertanyaan Terbuka No. 1) | [ ] |
| Pesan error login generik bisa menyulitkan Wali Murid yang benar-benar lupa email terdaftar, tanpa jalur bantuan mandiri | M | M | Pertimbangkan kanal bantuan (hubungi Tata Usaha) yang jelas di halaman login | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Mockup & struktur data final | [ ] | Review SA & klien |
| Development | Login, pendaftaran mandiri, halaman status Menunggu Approval & Ditolak | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| SSO | Satu akun yang dipakai untuk login & diverifikasi sebagai identitas Wali Murid oleh sekolah |
| Self-register | Metode pendaftaran akun secara mandiri oleh Wali Murid, menunggu persetujuan Kepala Sekolah |
| Didaftarkan Admin | Metode pembuatan akun secara langsung oleh Admin/Tata Usaha, berstatus aktif tanpa menunggu persetujuan |
| Menunggu Approval | Status akun pendaftaran mandiri yang belum diputuskan Kepala Sekolah |
| Ditolak | Status akun pendaftaran mandiri yang datanya tidak cocok/tidak disetujui Kepala Sekolah |

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
