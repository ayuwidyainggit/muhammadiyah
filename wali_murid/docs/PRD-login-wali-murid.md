# PRD: Login &amp; SSO Wali Murid

## 1. Informasi Dokumen

| Atribut | Isi |
| --- | --- |
| Nama produk / fitur | Login & SSO Wali Murid (halaman masuk Portal Wali Murid) |
| Klien / proyek | Wali Murid -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen | v0.1 |
| Status | Draft |
| Penulis | Tim Produk GeekGarden |
| Product Owner | [Nama PO Klien] |
| Solution Architect | [Nama SA] |
| Tanggal dibuat | 08-11-2026 |
| Target rilis | [DD-MM-YYYY / Sprint X] |
| Dokumen terkait | `index.html`, `app.js`, `daftar.html`, `menunggu-approval.html`, `ditolak.html`, `bayar.html`, PRD Pengguna (Admin Pusat), PRD Role & Hak Akses |

### Riwayat Revisi

| Versi | Tanggal | Penulis | Perubahan |
| --- | --- | --- | --- |
| v0.1 | 08-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `index.html` (layar masuk Portal Wali Murid, SSO, dan navigasi akun demo). |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

`index.html` adalah layar pertama yang dibuka wali murid saat mengakses Portal Wali Murid. Halaman ini menyediakan form login (SSO -- satu akun yang sama dipakai sekolah untuk memverifikasi identitas wali murid), tautan ke pendaftaran akun baru (`daftar.html`), dan logika navigasi yang mengarahkan wali murid ke `bayar.html` (beranda pembayaran), `menunggu-approval.html`, atau `ditolak.html` sesuai status akun mereka.

### 2.2 Problem Statement

**Wali murid** mengalami **kebingungan soal akun mana yang dipakai untuk masuk dan apa yang terjadi bila akun belum/tidak disetujui sekolah** saat **status approval akun (aktif/menunggu approval/ditolak) tidak dikomunikasikan dengan jelas di titik masuk aplikasi**, yang menyebabkan **wali murid mencoba login berulang kali tanpa tahu alasan gagal, atau justru berhasil masuk padahal akunnya seharusnya belum diverifikasi sekolah**.

### 2.3 Kondisi Saat Ini (As-Is)

Status akun wali murid (aktif, menunggu approval, ditolak) dikelola di sisi sekolah (Portal Sekolah > Akun Wali Murid), namun titik masuk aplikasi wali murid perlu menerjemahkan status tersebut menjadi pengalaman yang jelas -- bukan sekadar pesan error generik.

### 2.4 Kondisi yang Diharapkan (To-Be)

Wali murid membuka `index.html`, memasukkan email & password SSO, lalu sistem memvalidasi kredensial dan **merutekan** mereka sesuai status akun: langsung ke beranda pembayaran bila aktif, ke layar "Menunggu Approval" bila masih diproses Kepala Sekolah, atau ke layar "Ditolak" (lengkap dengan alasan) bila pendaftaran self-register-nya ditolak. Wali murid yang sudah pernah login dan sesinya masih berlaku langsung diarahkan ke beranda tanpa perlu login ulang.

### 2.5 Kenapa Sekarang?

Layar ini adalah pintu masuk tunggal ke seluruh Portal Wali Murid (pembayaran SPP, riwayat transaksi, notifikasi, profil) -- pengalaman login yang membingungkan di titik ini berisiko menurunkan adopsi aplikasi sejak awal, terutama bagi wali murid yang baru pertama kali mendaftar sendiri (self-register).

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memastikan hanya wali murid dengan akun terverifikasi (status aktif) yang dapat mengakses data pembayaran anaknya.
2. Memberikan kejelasan status akun (menunggu approval/ditolak) sejak titik masuk, tanpa wali murid perlu menghubungi sekolah untuk bertanya.
3. Menjaga satu identitas SSO yang konsisten dengan data "Akun Wali Murid" yang dikelola sekolah di Portal Sekolah.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak mencakup proses pendaftaran akun baru secara detail (form & validasi `daftar.html`) -- didokumentasikan sebagai PRD terpisah bila diperlukan.
- Tidak mencakup proses approval/penolakan akun oleh Kepala Sekolah -- itu bagian dari Portal Sekolah.
- Tidak menyediakan fitur "Lupa Password" / reset password pada versi ini.
- Tidak menyediakan login sosial (Google/Apple) atau OTP -- SSO saat ini terbatas pada email + password.
- Panel "🧪 Demo -- Pilih Akun" pada halaman ini bersifat alat bantu demo/testing, **wajib dihapus** sebelum rilis produksi.

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| % percobaan login oleh akun berstatus menunggu approval/ditolak yang memahami status tanpa menghubungi sekolah | [ ] | 90% | Survei/feedback wali murid pasca-rilis | 1 bulan setelah rilis |
| Tingkat keberhasilan login pada percobaan pertama untuk akun aktif | [ ] | > 95% | Log aplikasi (sukses vs gagal) | 1 bulan setelah rilis |
| Jumlah akun aktif yang tidak bisa masuk karena bug routing status | [ ] | 0 kasus | Tiket dukungan terkait login | 2 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran | Organisasi | RACI | Kepentingan |
| --- | --- | --- | --- |
| Product Owner | Klien (Muhammadiyah Pusat/Sekolah) | A | Menyetujui alur SSO & kebijakan status akun |
| Solution Architect | GeekGarden | R | Desain integrasi SSO dengan data Akun Wali Murid di Portal Sekolah |
| Tech Lead | GeekGarden | R | Implementasi autentikasi & routing status akun |
| QA Lead | GeekGarden | C | Strategi pengujian 3 skenario status akun (aktif/menunggu/ditolak) |
| Kepala Sekolah | Klien | I | Pihak yang menyetujui/menolak akun self-register (di Portal Sekolah) |
| Wali Murid | Klien (pengguna akhir) | R | Pengguna utama layar ini |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Wali murid akun aktif (didaftarkan admin) | Akun dibuat langsung oleh sekolah saat pendaftaran siswa | Masuk cepat untuk bayar SPP/cek riwayat | Lupa kredensial yang diberikan sekolah | Mobile/web |
| Wali murid self-register baru | Mendaftar sendiri lewat "Daftar Akun Baru", menunggu verifikasi | Tahu kapan akunnya bisa dipakai | Tidak tahu status pendaftarannya setelah submit | Mobile/web |
| Wali murid yang ditolak | Pendaftaran self-register-nya ditolak sekolah (mis. data anak tidak cocok) | Memahami alasan ditolak & cara memperbaikinya | Tidak tahu harus berbuat apa setelah ditolak | Mobile/web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Form login (email + password) dengan validasi kredensial | Form & validasi pendaftaran akun baru (`daftar.html`) secara detail |
| Routing otomatis berdasarkan status akun (aktif/menunggu_approval/ditolak) | Proses approval/penolakan akun oleh Kepala Sekolah |
| Auto-redirect ke beranda (`bayar.html`) bila sesi login masih berlaku | Fitur "Lupa Password" / reset password |
| Tautan ke pendaftaran akun baru | Login sosial (Google/Apple) atau OTP |
| Panel demo pemilihan akun (hanya untuk keperluan demo/testing) | Rate limiting / proteksi brute-force percobaan login |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Form login dengan validasi email+password, routing status akun (aktif/menunggu_approval/ditolak), auto-redirect bila sesi masih berlaku.
- **Should have** -- Pesan error yang jelas saat kredensial salah, tautan ke pendaftaran akun baru.
- **Could have** -- Fitur "Lupa Password".
- **Won't have (now)** -- Login sosial/OTP, rate limiting percobaan login, panel demo (harus dihapus di produksi).

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai wali murid dengan akun aktif, saya ingin masuk dengan email & password, supaya saya bisa langsung mengecek dan membayar tagihan SPP anak saya. | Must | Given saya mengisi email & password akun aktif yang benar, When saya menekan "Masuk", Then saya diarahkan ke halaman `bayar.html` dan sesi login saya tersimpan |
| US-02 | Sebagai wali murid yang akunnya masih menunggu persetujuan Kepala Sekolah, saya ingin diberi tahu status tersebut saat mencoba login, supaya saya tidak bingung kenapa belum bisa masuk. | Must | Given status akun saya `menunggu_approval`, When saya login dengan kredensial yang benar, Then saya diarahkan ke `menunggu-approval.html` yang menampilkan nama anak yang didaftarkan, bukan ke beranda pembayaran |
| US-03 | Sebagai wali murid yang pendaftarannya ditolak sekolah, saya ingin melihat alasan penolakannya, supaya saya tahu apa yang perlu diperbaiki. | Must | Given status akun saya `ditolak`, When saya login dengan kredensial yang benar, Then saya diarahkan ke `ditolak.html` yang menampilkan alasan penolakan dari sekolah |
| US-04 | Sebagai wali murid yang salah memasukkan email/password, saya ingin melihat pesan kesalahan yang jelas, supaya saya tahu harus mencoba lagi. | Must | Given saya memasukkan kombinasi email/password yang tidak cocok dengan akun manapun, When saya menekan "Masuk", Then pesan error ditampilkan di atas form tanpa membocorkan apakah emailnya terdaftar atau tidak |
| US-05 | Sebagai wali murid yang sudah pernah login dan sesinya masih berlaku, saya ingin langsung masuk ke beranda tanpa login ulang saat membuka aplikasi lagi. | Must | Given saya memiliki sesi login aktif tersimpan, When saya membuka `index.html`, Then saya otomatis diarahkan ke `bayar.html` tanpa melihat form login |
| US-06 | Sebagai wali murid baru, saya ingin menemukan tautan untuk mendaftar akun, supaya saya bisa membuat akun jika belum terdaftar oleh sekolah. | Should | Given saya belum punya akun, When saya menekan "Daftar Akun Baru", Then saya diarahkan ke `daftar.html` |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Form Login | Sistem harus menyediakan input Email dan Password beserta tombol "Masuk" yang memvalidasi kombinasi keduanya terhadap data akun wali murid | US-01, US-04 | Must | Pencarian akun bersifat case-insensitive pada email (`findWaliAccount`); password dicocokkan secara exact match |
| FR-02 | Routing Status Akun | Setelah kredensial valid, sistem harus merutekan wali murid sesuai field `status` pada akunnya: `aktif` → `bayar.html`, `menunggu_approval` → `menunggu-approval.html`, `ditolak` → `ditolak.html` | US-01, US-02, US-03 | Must | Info kontekstual (nama anak untuk status menunggu, alasan untuk status ditolak) dititipkan lewat `sessionStorage` (`wali_pending_info`, `wali_rejected_info`) karena setiap layar adalah halaman terpisah, bukan SPA |
| FR-03 | Pesan Error Login | Sistem harus menampilkan pesan error generik saat email tidak ditemukan atau password salah, tanpa membedakan kedua kasus tersebut | US-04 | Must | Mencegah enumerasi akun (apakah email terdaftar) lewat pesan error yang berbeda |
| FR-04 | Auto-Redirect Sesi Aktif | Sistem harus memeriksa sesi login (`getSession()`) saat `index.html` dimuat; jika ada sesi valid, langsung arahkan ke `bayar.html` tanpa menampilkan form login | US-05 | Must | Sesi disimpan di `sessionStorage` dengan key `wali_murid_session` -- hilang saat tab/browser ditutup (bukan persistent login) |
| FR-05 | Tautan Daftar Akun Baru | Sistem harus menyediakan tombol/tautan "Daftar Akun Baru" yang mengarahkan ke `daftar.html` | US-06 | Should | Detail form pendaftaran di luar lingkup PRD ini |
| FR-06 | Panel Demo Pilih Akun | Sistem (versi demo/prototipe) harus menampilkan daftar akun contoh (1 akun aktif + 2 akun `otherWaliAccounts`) dengan ikon status, yang saat diklik otomatis mengisi & mengirim form login | -- | Won't (production) | Panel ini murni alat bantu demo untuk memperagakan ketiga status akun; **wajib dihilangkan** sebelum rilis produksi karena membocorkan data & kredensial akun lain |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Keamanan | Password tidak boleh ditampilkan dalam bentuk plain text di UI (hanya di field `type="password"`) | 100% field password bermode masked |
| NFR-02 | Keamanan | Pesan error login tidak membocorkan apakah suatu email terdaftar di sistem | 100% pesan error generik untuk kombinasi email/password salah |
| NFR-03 | Konsistensi | Status akun (`aktif`/`menunggu_approval`/`ditolak`) yang dipakai di halaman ini harus selalu sinkron dengan status "Akun Wali Murid" yang dikelola di Portal Sekolah | 0% selisih status antar sistem |
| NFR-04 | Performa | Waktu proses dari submit form login sampai redirect ke halaman tujuan | < 1 detik (validasi di sisi client, tanpa network roundtrip pada prototipe ini) |

---

## 8. Alur Pengguna & Desain

- Alur utama (akun aktif): Buka `index.html` → isi Email & Password → tekan "Masuk" → redirect ke `bayar.html`.
- Alur menunggu approval: Buka `index.html` → isi kredensial akun `menunggu_approval` → tekan "Masuk" → redirect ke `menunggu-approval.html` (menampilkan nama anak yang didaftarkan).
- Alur ditolak: Buka `index.html` → isi kredensial akun `ditolak` → tekan "Masuk" → redirect ke `ditolak.html` (menampilkan alasan penolakan).
- Alur sesi aktif: Buka `index.html` dengan sesi login masih tersimpan → langsung redirect ke `bayar.html` tanpa melihat form sama sekali.
- Alur akun baru: Buka `index.html` → tekan "Daftar Akun Baru" → lanjut ke `daftar.html` (di luar lingkup PRD ini).
- Wireframe: mengikuti struktur `index.html` -- tampilan mobile (`.phone`) dengan status bar dekoratif, logo & nama sekolah, kartu form login, kartu tautan daftar akun, dan (khusus demo) kartu daftar akun contoh.
- Edge case yang wajib ditangani: email tidak ditemukan sama sekali, password salah untuk email yang valid, akun dengan status selain tiga status yang dikenal (fallback perlu didefinisikan), serta pengguna yang membuka halaman ini langsung dengan sesi yang sudah kedaluwarsa/terhapus browser.

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Portal Sekolah (Akun Wali Murid) | Sumber kebenaran status akun (aktif/menunggu_approval/ditolak) dan alasan penolakan | Internal (shared data store) | [ ] | [ ] |
| Modul Pendaftaran Siswa (data anak) | Validasi kecocokan NISN/nama anak saat self-register | Internal (shared data store) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: Akun Wali Murid (`nama`, `email`, `password`, `status`, `metode` [`didaftarkan_admin`/`self_register`], `tanggalDaftar`, `alasanTolak`, `siswaList`).
- Sesi login disimpan di `sessionStorage` (key `wali_murid_session`), bukan token/JWT terenkripsi pada prototipe ini -- perlu digantikan mekanisme sesi/token yang aman sebelum produksi.
- Data konteks antar-halaman (`wali_pending_info`, `wali_rejected_info`) juga dititipkan lewat `sessionStorage` sebagai jembatan sementara karena setiap layar adalah halaman HTML terpisah.
- Password pada prototipe ini tersimpan plain text di data JS sisi klien -- **tidak boleh dibawa ke produksi**; wajib di-hash & divalidasi di backend.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Satu wali murid hanya memiliki satu akun SSO yang dipakai di semua layar aplikasi ini.
- Status akun (aktif/menunggu_approval/ditolak) sudah final saat ditampilkan di halaman ini -- perubahan status terjadi di Portal Sekolah, bukan di sini.

**Batasan:**

- Autentikasi pada prototipe ini seluruhnya berjalan di sisi client dengan data hardcoded (`guardian`, `otherWaliAccounts`) -- belum terhubung ke backend/API autentikasi nyata.
- Tidak ada mekanisme "Lupa Password" atau pemulihan akun pada versi ini.
- Panel demo pemilihan akun membocorkan kredensial & status seluruh akun contoh -- hanya boleh ada di lingkungan demo/staging, tidak pernah di produksi.

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Apakah dibutuhkan fitur "Lupa Password" pada rilis awal? | PO klien | [DD-MM-YYYY] | [ ] |
| 2 | Berapa lama sesi login wali murid seharusnya bertahan (saat ini hilang begitu tab ditutup)? | PO klien | [DD-MM-YYYY] | [ ] |
| 3 | Apakah perlu rate limiting/penguncian sementara setelah beberapa kali percobaan login gagal? | Tech Lead/SA | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Panel demo pemilihan akun tidak dihapus sebelum rilis produksi, membocorkan kredensial & data akun lain | H | M | Tambahkan gate build (flag environment) yang menyembunyikan panel demo di luar lingkungan development/staging | [ ] |
| Password tersimpan plain text di sisi client pada prototipe terbawa ke implementasi produksi | H | L | Wajibkan review keamanan sebelum go-live; autentikasi harus pindah ke backend dengan password ter-hash | [ ] |
| Status akun di halaman ini tidak sinkron real-time dengan keputusan terbaru Kepala Sekolah di Portal Sekolah | M | M | Integrasikan dengan API/shared database real-time, bukan snapshot statis | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Mockup final layar login & 3 skenario status | [ ] | Review SA & klien |
| Development | Form login, routing status akun, auto-redirect sesi, integrasi backend autentikasi | [ ] | Lolos code review & security review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production (panel demo dihapus) | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| SSO | Single Sign-On -- satu akun yang sama dipakai wali murid untuk masuk ke aplikasi ini dan diverifikasi identitasnya oleh sekolah |
| Status `aktif` | Akun sudah terverifikasi/disetujui dan bisa langsung masuk ke aplikasi |
| Status `menunggu_approval` | Akun hasil self-register yang belum diputuskan Kepala Sekolah |
| Status `ditolak` | Akun hasil self-register yang ditolak sekolah, disertai alasan |
| `didaftarkan_admin` | Metode pembuatan akun langsung oleh sekolah/admin, otomatis berstatus aktif |
| `self_register` | Metode pembuatan akun oleh wali murid sendiri lewat "Daftar Akun Baru", harus menunggu approval |

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
