# PRD: Pendaftaran Sekolah

## 1. Informasi Dokumen

| Atribut             | Isi                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------- |
| Nama produk / fitur | Pendaftaran Sekolah (Onboarding Sekolah Baru)                                           |
| Klien / proyek      | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden)               |
| Versi dokumen       | v0.1                                                                                    |
| Status              | Draft                                                                                   |
| Penulis             | Tim Produk GeekGarden                                                                   |
| Product Owner       | [Nama PO Klien]                                                                         |
| Solution Architect  | [Nama SA]                                                                               |
| Tanggal dibuat      | 25-10-2026                                                                              |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                                 |
| Dokumen terkait     | `pendaftaran.html`, `app.js`, PRD Manajemen Sekolah, PRD Pengguna, PRD Role & Hak Akses |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                                                                                            |
| ----- | ---------- | --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| v0.1  | 25-10-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `pendaftaran.html` (4 langkah: Data Sekolah, Akun Awal, Rekening Penampung, Review) |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Pendaftaran Sekolah adalah wizard 4 langkah bagi Super Admin/Admin Wilayah untuk mendaftarkan sekolah baru ke platform: mengisi data induk sekolah, membuat satu akun Admin awal, mencatat rekening penampung fee sekolah, lalu meninjau seluruh data sebelum sekolah diaktifkan. Hasilnya, sekolah baru bisa langsung beroperasi di platform tanpa proses manual bolak-balik dokumen.

### 2.2 Problem Statement

**Admin Pusat/Wilayah** mengalami **proses onboarding sekolah baru yang lambat dan rawan data tidak lengkap** saat **data sekolah, akun, dan rekening dikumpulkan secara manual lewat dokumen/email**, yang menyebabkan **sekolah baru tertunda aktif di platform dan admin harus mengulang verifikasi data**.

### 2.3 Kondisi Saat Ini (As-Is)

Data sekolah baru (profil, struktur organisasi, kontak, rekening bagi hasil fee) dikumpulkan via formulir fisik/email ke Pusat, lalu dientri manual ke sistem oleh tim backend/DevOps -- termasuk kredensial integrasi bank yang bersifat sensitif, berisiko human error dan keterlambatan.

### 2.4 Kondisi yang Diharapkan (To-Be)

Super Admin/Admin Wilayah mengisi satu wizard terstruktur 4 langkah, meninjau ringkasan di langkah akhir, lalu menekan "Daftarkan Sekolah" -- status sekolah otomatis berubah dari Draft menjadi Aktif dan event onboarding diterbitkan ke seluruh service terkait.

### 2.5 Kenapa Sekarang?

Pertumbuhan jumlah sekolah yang bergabung ke platform (ribuan sekolah ditargetkan secara nasional) tidak bisa lagi mengandalkan entri manual oleh tim backend; proses onboarding harus self-service oleh Admin Wilayah/Pusat agar skalabel.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Mempercepat waktu onboarding sekolah baru dari proses manual (berhari-hari) menjadi wizard self-service (menit).
2. Memastikan kelengkapan data sekolah (struktur organisasi, akun admin, rekening penampung) sebelum sekolah diaktifkan, lewat langkah Review wajib.
3. Memisahkan kredensial integrasi bank sensitif (dikelola backend/DevOps terpusat) dari data yang diinput admin saat onboarding, demi keamanan.
4. Menegaskan bahwa layanan H2H (Host-to-Host) dikelola di level Admin Muhammadiyah Pusat, bukan per sekolah -- sehingga pembayaran SPP wali murid (VA/QRIS) langsung masuk ke rekening Pusat, dan wizard onboarding tidak perlu mengatasi integrasi bank per sekolah.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak mendukung pembuatan lebih dari 1 akun di tahap onboarding (hanya 1 akun Admin; Kepala Sekolah & Bendahara diundang kemudian oleh Admin Sekolah).
- Tidak mendukung approval berjenjang (multi-level sign-off) untuk pendaftaran sekolah di fase ini.
- Tidak menyediakan draft tersimpan otomatis (auto-save) antar sesi pada fase ini -- pengisian wizard diasumsikan selesai dalam satu sesi.
- Tidak menyediakan validasi rekening penampung per sekolah
- Tidak mengotomasi sistem bagi hasil (revenue sharing) antara sekolah dan GeekGarden dari dana pembayaran SPP wali murid (via VA/QRIS) yang masuk ke rekening Pusat -- proses ini dilakukan manual di luar sistem.

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran           | Organisasi                 | RACI | Kepentingan                                            |
| ---------------------- | -------------------------- | ---- | ------------------------------------------------------ |
| Product Owner          | Klien (Muhammadiyah Pusat) | A    | Menyetujui alur onboarding & data wajib                |
| Solution Architect     | GeekGarden                 | R    | Desain integrasi bank H2H & event `school.onboarded`   |
| Tech Lead              | GeekGarden                 | R    | Implementasi wizard & validasi data                    |
| QA Lead                | GeekGarden                 | C    | Strategi pengujian tiap langkah wizard                 |
| Admin Wilayah (PWM)    | Klien                      | C/R  | Pengguna utama yang mendaftarkan sekolah di wilayahnya |
| Tim Engineering/DevOps | GeekGarden                 | R    | Mengelola kredensial H2H terpusat (di luar wizard)     |

### 4.2 Persona Pengguna

| Persona                       | Deskripsi                                 | Tujuan utama                                              | Pain point                                    | Perangkat / kanal   |
| ----------------------------- | ----------------------------------------- | --------------------------------------------------------- | --------------------------------------------- | ------------------- |
| Super Admin Pusat             | Mendaftarkan sekolah dari seluruh wilayah | Onboarding sekolah cepat & data lengkap                   | Data sekolah tersebar, verifikasi manual lama | Laptop/web          |
| Admin Wilayah (PWM)           | Mendaftarkan sekolah di wilayahnya        | Sekolah di wilayahnya cepat aktif & bisa menagih SPP      | Harus menunggu Pusat untuk entri data         | Laptop/web          |
| Admin Sekolah (penerima akun) | Staf sekolah yang menerima link aktivasi  | Aktivasi akun & mulai mengundang Kepala Sekolah/Bendahara | Tidak tahu kapan sekolah resmi aktif          | WhatsApp/email, web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini)                                                                     | Out of Scope (fase berikutnya / tidak dikerjakan)       |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Step 1: Data Sekolah (profil, jenjang, struktur PWM/PDM/PCM, alamat, status awal Draft) | Approval berjenjang sebelum sekolah diaktifkan          |
| Step 2: Akun Awal Admin Sekolah + Kontak Sekolah                                        | Pembuatan lebih dari 1 akun saat onboarding             |
| Step 3: Rekening Penampung (Nama Bank, No Rek, Nama Pemilik)                            | Validasi otomatis nama rekening via API bank saat input |
| Step 4: Review seluruh input Step 1-3 sebelum submit                                    | Auto-save draft antar sesi                              |
|                                                                                           | Sistem hitung & bagi hasil (revenue sharing) antara sekolah dan GeekGarden dari dana di rekening Pusat -- dilakukan manual di luar sistem |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Step 1-4 wizard lengkap, validasi data wajib, perubahan status Draft → Aktif.
- **Should have** -- Review step yang merangkum seluruh input sebelum submit.

### 5.3 User Stories

| ID    | User story                                                                                                                                                                             | Prioritas | Acceptance criteria                                                                                                                                                                                                                                           |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-01 | Sebagai Admin Wilayah, saya ingin mengisi data induk sekolah (nama, NPSN, jenjang, struktur organisasi, alamat), supaya sekolah tercatat dengan benar di platform.                     | Must      | Given saya berada di Step 1, When saya mengisi semua field wajib dan menekan "Lanjut", Then sistem berpindah ke Step 2 dengan data tersimpan sementara                                                                                                        |
| US-02 | Sebagai Admin Wilayah, saya ingin membuat satu akun Admin Sekolah beserta kontak sekolah, supaya sekolah punya satu titik kontak awal yang bisa mengundang staf lain.                  | Must      | Given saya di Step 2, When saya mengisi nama, No. WhatsApp, dan email akun Admin serta kontak sekolah, Then data tersimpan dan saya bisa lanjut ke Step 3                                                                                                     |
| US-03 | Sebagai Admin Wilayah, saya ingin mencatat rekening penampung fee sekolah (Nama Bank, No Rek, Nama Pemilik), supaya pencairan bagi hasil fee sekolah punya tujuan rekening yang benar. | Must      | Given saya di Step 3, When saya mengisi Nama Bank, No Rek, dan Nama Pemilik, Then data tersimpan dan saya bisa lanjut ke Step 4                                                                                                                               |
| US-04 | Sebagai Admin Wilayah, saya ingin meninjau seluruh data dari Step 1-3 sebelum mendaftarkan sekolah, supaya saya bisa memastikan tidak ada kesalahan input sebelum sekolah diaktifkan.  | Must      | Given saya di Step 4, When halaman dimuat, Then seluruh data Step 1-3 (data sekolah, akun admin, kontak, rekening penampung) ditampilkan dalam satu tabel ringkasan, dan setelah saya menekan "Daftarkan Sekolah", status sekolah berubah dari Draft ke Aktif |

---

## 6. Kebutuhan Fungsional

| ID    | Modul              | Deskripsi requirement                                                                                                                                                                                                                  | User story | Prioritas | Catatan / aturan bisnis                                                                                                                             |
| ----- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-01 | Data Sekolah       | Sistem harus menyediakan form Step 1 berisi Nama Sekolah, NPSN, Jenjang, Perkiraan Jumlah Siswa Aktif, Wilayah (PWM), Daerah (PDM), Cabang (PCM), Status Awal (readonly: Draft), dan Alamat Lengkap                                    | US-01      | Must      | Dropdown PDM & PCM mengikuti pilihan PWM yang dipilih (dependent select)                                                                            |
| FR-02 | Akun Awal          | Sistem harus menyediakan form Step 2 untuk 1 akun dengan peran otomatis "Admin" (Nama, No. WhatsApp, Email) dan Kontak Sekolah (Email Sekolah, Nama Kontak Person, No. WhatsApp Kontak Person)                                         | US-02      | Must      | Akun ini menerima link aktivasi (bukan kredensial langsung) setelah sekolah Aktif; akun ini yang berhak mengundang Kepala Sekolah & Bendahara       |
| FR-03 | Rekening Penampung | Sistem harus menyediakan form Step 3 dengan tepat 3 field: Nama Bank (dropdown), No Rek, Nama Pemilik                                                                                                                                  | US-03      | Must      | Rekening ini hanya untuk pencairan bagi hasil fee sekolah, bukan rekening penampung pembayaran SPP wali murid (yang terpusat di Konfigurasi Sistem) |
| FR-04 | Review             | Sistem harus menampilkan ringkasan seluruh data Step 1-3 (Nama Sekolah, NPSN, Jenjang, Jumlah Siswa, Struktur Organisasi, Alamat, Status Awal, Akun Admin, Kontak Sekolah, Rekening Penampung) di Step 4 sebelum tombol submit ditekan | US-04      | Must      | Review bersifat read-only summary, bukan form edit ulang                                                                                            |
| FR-05 | Aktivasi Sekolah   | Sistem harus mengubah status sekolah dari "Draft" menjadi "Aktif" dan menerbitkan event `school.onboarded` ke service terkait saat tombol "Daftarkan Sekolah" ditekan di Step 4                                                        | US-04      | Must      | Event ini memicu proses lain (misal: pembuatan akses login Admin Sekolah, mulai jadwal invoicing)                                                   |
| FR-06 | Navigasi Wizard    | Sistem harus menyediakan tombol "Lanjut"/"Kembali" antar step dan indikator stepper (Data Sekolah → Akun Awal → Rekening Penampung → Review)                                                                                           | US-01      | Must      | Tombol "Kembali" nonaktif di Step 1; tombol "Lanjut" berubah teks jadi "Daftarkan Sekolah" di Step 4                                                |

### 6.1 Hak Akses per Peran

| Fitur                       | Super Admin | Admin Wilayah | Staff Keuangan Pusat | Viewer |
| --------------------------- | ----------- | ------------- | -------------------- | ------ |
| Halaman Pendaftaran Sekolah | Ya          | YA.           | --                   | --     |

### 6.2 Notifikasi

| Pemicu                                      | Penerima                                           | Kanal              | Isi singkat               |
| ------------------------------------------- | -------------------------------------------------- | ------------------ | ------------------------- |
| Sekolah berhasil didaftarkan (status Aktif) | Akun Admin Sekolah                                 | WhatsApp / Email   | Link aktivasi akun        |
| Event `school.onboarded` diterbitkan        | Service internal terkait (invoicing, RBAC sekolah) | Event bus internal | ID sekolah & status Aktif |

---

## 7. Kebutuhan Non-Fungsional

| ID     | Kategori         | Requirement                                                                   | Target terukur                                                                   |
| ------ | ---------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| NFR-01 | Performa         | Waktu transisi antar step wizard                                              | < 300 ms per perpindahan step (client-side)                                      |
| NFR-02 | Validasi         | Field wajib tidak boleh kosong sebelum lanjut step                            | 100% validasi client-side + server-side sebelum submit akhir                     |
| NFR-03 | Keamanan         | Kredensial integrasi bank H2H tidak pernah diinput/ditampilkan di wizard ini  | Terpisah total dari form, dikelola di Konfigurasi Sistem oleh Engineering/DevOps |
| NFR-04 | Konsistensi data | Data yang tampil di Review (Step 4) identik dengan yang tersimpan di Step 1-3 | 0% selisih antara input dan ringkasan                                            |
| NFR-05 | Usability        | Admin baru dapat menyelesaikan seluruh wizard tanpa panduan tambahan          | < 10 menit untuk 1 pendaftaran sekolah                                           |
| NFR-06 | Auditability     | Perubahan status Draft → Aktif tercatat dengan waktu & pelaku                 | Tercatat di audit log/riwayat status sekolah                                     |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login → Menu "Pendaftaran Sekolah" → Step 1 Data Sekolah → Step 2 Akun Awal → Step 3 Rekening Penampung → Step 4 Review → submit → status Aktif.
- Wireframe: mengikuti struktur `pendaftaran.html` (stepper 4 langkah di bagian atas, form per step, tombol navigasi di bawah).
- Edge case yang wajib ditangani: NPSN duplikat, admin menutup browser di tengah wizard (data belum tersimpan permanen sampai submit akhir), No. WhatsApp/email akun Admin tidak valid format.

---

## 9. Integrasi & Dependensi

| Sistem eksternal                                   | Fungsi                                                                   | Metode                   | PIC | Status |
| -------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------ | --- | ------ |
| Konfigurasi Sistem (Integrasi Bank Global H2H BSI) | Sumber kredensial & konfigurasi bank terpusat, tidak diisi di wizard ini | Internal (shared config) | [ ] | [ ]    |
| Modul RBAC & Pengguna                              | Pembuatan akun Admin Sekolah awal & pemetaan role                        | Internal API             | [ ] | [ ]    |
| WhatsApp/Email Gateway                             | Pengiriman link aktivasi ke akun Admin Sekolah                           | REST API                 | [ ] | [ ]    |

---

## 10. Kebutuhan Data

- Entitas utama: Sekolah, StrukturOrganisasi (PWM/PDM/PCM), AkunAdminSekolah, KontakSekolah, RekeningPenampungSekolah.
- Migrasi data: sekolah existing (jika ada) di luar platform perlu proses migrasi/impor tersendiri (di luar scope wizard ini).
- Retensi data: data pendaftaran disimpan permanen sebagai bagian profil sekolah, termasuk riwayat status (Draft/Aktif/Nonaktif).
- Laporan yang dibutuhkan: daftar sekolah per status pendaftaran, waktu rata-rata onboarding.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Integrasi H2H (Host-to-Host) ada di level **Admin Muhammadiyah Pusat**, bukan per sekolah. Satu kerja sama bank H2H terpusat (BSI) dipakai bersama oleh seluruh sekolah.
- Pembayaran SPP oleh wali murid (via Virtual Account/QRIS) **langsung masuk ke rekening penampung Pusat**, bukan ke rekening sekolah. Rekening penampung yang diisi di Step 3 wizard ini adalah rekening tujuan **pencairan bagi hasil fee ke sekolah**, bukan rekening penerima pembayaran SPP.
- NPSN bersifat unik per sekolah dan tersedia saat pendaftaran.

**Batasan:**

- Wizard hanya mendukung pembuatan 1 akun Admin di awal; penambahan Kepala Sekolah/Bendahara dilakukan di luar modul ini (oleh Admin Sekolah).
- **Out of scope:** mekanisme hitung & bagi hasil (revenue sharing) antara sekolah dan GeekGarden dari dana yang terkumpul di rekening Pusat. Proses ini dilakukan **manual di luar sistem** (rekonsiliasi & pencairan fee tidak diotomasi oleh platform pada fase ini).

**Pertanyaan terbuka:**

| No  | Pertanyaan                                                                         | Ditujukan ke | Batas jawab  | Jawaban |
| --- | ---------------------------------------------------------------------------------- | ------------ | ------------ | ------- |
| 1   | Apakah NPSN perlu divalidasi ke database Kemendikbud secara real-time?             | PO klien     | [DD-MM-YYYY] | [ ]     |
| 2   | Apakah dibutuhkan mekanisme simpan draft sebelum submit akhir di rilis berikutnya? | PO klien     | [DD-MM-YYYY] | [ ]     |

---

## 12. Risiko & Mitigasi

| Risiko                                                        | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi                                                                                              | PIC |
| ------------------------------------------------------------- | -------------- | ------------------- | ----------------------------------------------------------------------------------------------------- | --- |
| Data NPSN/rekening salah input tidak terdeteksi sebelum Aktif | H              | M                   | Tambahkan validasi format & konfirmasi di Review step; pertimbangkan verifikasi rekening via API bank | [ ] |
| Admin menutup browser di tengah wizard, data hilang           | M              | M                   | Evaluasi kebutuhan auto-save/draft di rilis berikutnya                                                | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone      | Deliverable                    | Target tanggal | Kriteria selesai             |
| -------------- | ------------------------------ | -------------- | ---------------------------- |
| PRD approved   | Dokumen ini v1.0               | [ ]            | Ditandatangani PO            |
| Desain selesai | Mockup wizard + validasi field | [ ]            | Review SA & klien            |
| Development    | Step 1-4 + event onboarding    | [ ]            | Lolos code review            |
| UAT            | Build staging                  | [ ]            | 0 bug critical, sign-off UAT |
| Go-live        | Production                     | [ ]            | Monitoring 2 minggu stabil   |

---

## 14. Glosarium

| Istilah            | Arti                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| PWM/PDM/PCM        | Pimpinan Wilayah/Daerah/Cabang Muhammadiyah, struktur organisasi berjenjang |
| H2H                | Host-to-Host, integrasi langsung ke sistem bank mitra                       |
| NPSN               | Nomor Pokok Sekolah Nasional                                                |
| `school.onboarded` | Event internal yang diterbitkan saat sekolah berubah status jadi Aktif      |

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
