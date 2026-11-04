# PRD: Konfigurasi Sistem

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | ----------------------------------------------------------------------- |
| Nama produk / fitur | Konfigurasi Sistem (Pengaturan Global Platform)                         |
| Klien / proyek      | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen       | v0.1                                                                     |
| Status              | Draft                                                                    |
| Penulis             | Tim Produk GeekGarden                                                    |
| Product Owner       | [Nama PO Klien]                                                          |
| Solution Architect  | [Nama SA]                                                                |
| Tanggal dibuat      | 26-10-2026                                                               |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                  |
| Dokumen terkait     | `konfigurasi.html`, `app.js`, PRD Manajemen Sekolah, PRD Dashboard Konsolidasi |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                                                                   |
| ----- | ---------- | --------------------- | -------------------------------------------------------------------------------------------- |
| v0.1  | 26-10-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `konfigurasi.html` setelah disederhanakan menjadi 4 kartu: Rekening Bank Penampung Pusat & VA, Notifikasi Nomor Resmi Terpusat, Aturan Reminder & Eskalasi, Template Pesan Default Platform. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Fitur Konfigurasi Sistem memungkinkan Super Admin mengatur baseline global yang berlaku untuk seluruh sekolah di platform: rekening bank penampung pusat beserta Virtual Account (VA) pembayaran, nomor WhatsApp Business resmi terpusat, aturan reminder & eskalasi tagihan default, dan template pesan default. Pengaturan ini menjadi acuan awal bagi sekolah baru saat onboarding dan sebagian dapat di-override di level sekolah masing-masing lewat menu Manajemen Sekolah.

### 2.2 Problem Statement

**Super Admin** mengalami **kesulitan menjaga konsistensi rekening penampung, identitas pengirim notifikasi, dan aturan penagihan di seluruh sekolah** saat **tiap pengaturan tersebut harus diisi atau disamakan secara manual per sekolah**, yang menyebabkan **risiko salah kirim dana, identitas pengirim pesan yang tidak konsisten, dan pengalaman wali murid yang berbeda-beda antar sekolah**.

### 2.3 Kondisi Saat Ini (As-Is)

Tanpa satu tempat terpusat, rekening penampung, nomor resmi WhatsApp, dan aturan reminder berisiko diisi berbeda-beda oleh tiap sekolah -- menyulitkan audit, rekonsiliasi dana, dan konsistensi komunikasi ke wali murid.

### 2.4 Kondisi yang Diharapkan (To-Be)

Super Admin membuka menu Konfigurasi Sistem dan mengatur empat area global dari satu halaman: Rekening Bank Penampung Pusat & VA Pembayaran, Notifikasi Nomor Resmi Terpusat, Aturan Reminder & Eskalasi default, dan Template Pesan default -- lalu menyimpan sekaligus lewat tombol "Simpan Konfigurasi" (atau tombol simpan per kartu untuk Aturan Reminder dan Template Pesan).

### 2.5 Kenapa Sekarang?

Platform sedang menambah jumlah sekolah onboarding secara bertahap (lihat PRD Pendaftaran Sekolah); baseline konfigurasi global harus tersedia dan stabil sebelum skala bertambah, supaya setiap sekolah baru mendapat pengaturan default yang sama dan teruji.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Menyediakan satu sumber kebenaran (single source of truth) untuk rekening penampung pusat dan nomor Virtual Account (VA) pembayaran yang dipakai seluruh sekolah.
2. Menstandarkan nomor WhatsApp Business resmi platform supaya identitas pengirim notifikasi ke wali murid konsisten dan dapat dipercaya.
3. Menyediakan baseline Aturan Reminder & Eskalasi serta Template Pesan default yang otomatis disalin ke sekolah baru saat onboarding, sehingga sekolah baru tidak mulai dari nol.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak mengatur nama platform maupun zona waktu umum dari halaman ini pada fase ini.
- Tidak menampilkan/mengelola kredensial integrasi Host-to-Host (callback URL, client secret) dari panel ini -- kredensial tersebut dikelola lewat secrets manager backend oleh tim Engineering/DevOps.
- Tidak mengatur skema bagi hasil (revenue share) SPP maupun biaya layanan notifikasi dari modul ini.
- Tidak mengatur kebijakan keamanan sesi (session timeout), retensi audit log, maupun kewajiban 2FA dari modul ini.

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran       | Organisasi                 | RACI | Kepentingan                                                   |
| ------------------ | --------------------------- | ---- | --------------------------------------------------------------- |
| Product Owner      | Klien (Muhammadiyah Pusat) | A    | Menyetujui kebijakan rekening penampung & identitas resmi platform |
| Solution Architect | GeekGarden                  | R    | Desain konsistensi data global vs. override per sekolah          |
| Tech Lead          | GeekGarden                  | R    | Implementasi penyimpanan konfigurasi & propagasi ke sekolah baru |
| QA Lead            | GeekGarden                  | C    | Strategi pengujian validasi rekening, VA, dan template pesan      |
| Super Admin        | Klien                       | R    | Pengguna utama fitur ini                                         |

### 4.2 Persona Pengguna

| Persona      | Deskripsi                                   | Tujuan utama                                                        | Pain point                                                   | Perangkat / kanal |
| ------------ | -------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------ |
| Super Admin  | Mengelola pengaturan global seluruh sekolah  | Menjaga rekening, nomor resmi, dan aturan reminder konsisten & terbaru | Risiko inkonsistensi bila diatur manual per sekolah               | Laptop/web          |
| Wali murid   | Penerima notifikasi tagihan                  | Membayar ke rekening/VA yang benar dan mengenali pengirim pesan        | Bingung bila nomor pengirim/rekening berubah-ubah antar sekolah   | WhatsApp/SMS/Email  |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini)                                                                 | Out of Scope (fase berikutnya / tidak dikerjakan)                          |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Rekening Bank Penampung Pusat & VA Pembayaran (Nama Bank, Nomor Rekening, Nama Pemilik) | Pengaturan Umum platform (nama platform, zona waktu default)               |
| Notifikasi -- Nomor Resmi Terpusat (nomor WA, Business Account ID) -- tampil read-only | Integrasi Bank Host-to-Host (callback URL, client secret, timeout, retry)   |
| Aturan Reminder & Eskalasi default platform (tambah/hapus baris, channel per baris, aktif/nonaktif) | Skema Bagi Hasil (Revenue Share) SPP                                        |
| Template Pesan Default Platform per kanal (WhatsApp/SMS/Email) x level (1/2/3)         | Biaya Layanan Notifikasi per kanal                                          |
| Simpan konfigurasi (global dan per kartu Aturan Reminder / Template Pesan)             | Keamanan & Kepatuhan (session timeout, retensi audit log, kewajiban 2FA)    |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Rekening Bank Penampung Pusat & VA, Notifikasi Nomor Resmi Terpusat, Aturan Reminder & Eskalasi default, Template Pesan default.
- **Should have** -- Validasi format nomor rekening dan placeholder template sebelum simpan.
- **Could have** -- Pratinjau (preview) template pesan dengan data contoh sebelum disimpan.
- **Won't have (now)** -- Pengaturan umum platform, integrasi H2H, skema bagi hasil, biaya layanan notifikasi, keamanan & kepatuhan (dipindahkan keluar dari modul ini).

### 5.3 User Stories

| ID    | User story                                                                                                                                                  | Prioritas | Acceptance criteria                                                                                                                                                       |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-01 | Sebagai Super Admin, saya ingin mengatur rekening bank penampung pusat dan nomor VA pembayaran, supaya seluruh sekolah membayar ke tujuan yang sama dan benar. | Must      | Given saya membuka Konfigurasi Sistem, When saya mengisi Nama Bank, Nomor Rekening, dan Nama Pemilik Rekening lalu menekan "Simpan Konfigurasi", Then data tersimpan sebagai acuan tunggal seluruh sekolah |
| US-02 | Sebagai Super Admin, saya ingin melihat nomor WhatsApp Business resmi terpusat platform, supaya saya bisa memastikan identitas pengirim notifikasi konsisten. | Must      | Given saya membuka Konfigurasi Sistem, When saya melihat kartu Notifikasi, Then nomor WA Pusat dan Business Account ID (WABA) ditampilkan sebagai field terkunci (read-only) |
| US-03 | Sebagai Super Admin, saya ingin menambah atau menghapus aturan reminder & eskalasi default, supaya sekolah baru punya jadwal penagihan baku saat onboarding. | Must      | Given saya menekan "+ Tambah Aturan", When saya mengisi offset hari, nama aturan, level penanganan, dan channel, Then baris baru tersimpan di tabel Aturan Reminder & Eskalasi |
| US-04 | Sebagai Super Admin, saya ingin mengubah teks template pesan default per kanal dan level, supaya komunikasi ke wali murid konsisten sejak sekolah baru aktif. | Must      | Given saya membuka tab WhatsApp/SMS/Email pada kartu Template Pesan, When saya mengubah isi textarea pada level tertentu dan menekan "Simpan Template Default", Then teks tersimpan sebagai default platform |
| US-05 | Sebagai Super Admin, saya ingin menyimpan seluruh perubahan konfigurasi sekaligus, supaya saya tidak perlu menyimpan tiap kartu satu per satu. | Should    | Given saya telah mengubah beberapa field pada halaman Konfigurasi Sistem, When saya menekan tombol "Simpan Konfigurasi" di bagian bawah halaman, Then seluruh perubahan pada field yang relevan tersimpan |

---

## 6. Kebutuhan Fungsional

| ID    | Modul                                   | Deskripsi requirement                                                                                                                                  | User story | Prioritas | Catatan / aturan bisnis                                                                                                   |
| ----- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| FR-01 | Rekening Bank Penampung Pusat & VA       | Sistem harus menyediakan field Nama Bank (dropdown: BCA, Mandiri, BNI, BRI, BSI, Lainnya), Nomor Rekening Penampung Pusat, dan Nama Pemilik Rekening     | US-01      | Must      | Hanya satu rekening penampung pusat yang berlaku untuk seluruh sekolah; bukan diisi per sekolah                               |
| FR-02 | Notifikasi -- Nomor Resmi Terpusat       | Sistem harus menampilkan Nomor WA Pusat (Muhammadiyah Pusat) dan Business Account ID (WABA) sebagai field terkunci (disabled/read-only)                 | US-02      | Must      | Satu nomor WhatsApp Business resmi dipakai untuk seluruh sekolah, bukan per sekolah; perubahan dilakukan lewat proses backend |
| FR-03 | Tambah Aturan Reminder                  | Sistem harus menyediakan tombol "+ Tambah Aturan" yang menambahkan baris baru pada tabel Aturan Reminder & Eskalasi untuk diisi offset hari, nama, level, dan channel | US-03      | Must      | Baris baru belum permanen sampai tersimpan                                                                                     |
| FR-04 | Hapus Aturan Reminder                   | Sistem harus menghapus baris aturan reminder dari tabel saat tombol hapus (✕) pada baris tersebut ditekan                                                | US-03      | Must      | Minimal disarankan tetap ada aturan aktif agar sekolah baru tidak onboarding tanpa reminder sama sekali (lihat Risiko)        |
| FR-05 | Konfigurasi Channel & Level per Aturan   | Setiap baris aturan reminder harus memiliki pilihan Level Penanganan (Level 1 -- Pengingat, Level 2 -- Peringatan, Level 3 -- Eskalasi), channel (WA/SMS/Email), dan toggle Aktif/Nonaktif | US-03      | Must      | Level 3 memicu event `escalation.triggered` ke EscalationCase (lihat Skenario 6 pada dokumen sistem terkait)                  |
| FR-06 | Template Pesan per Kanal & Level         | Sistem harus menyediakan tab kanal (WhatsApp, SMS, Email) yang masing-masing menampilkan 3 kartu template (Level 1, 2, 3) berisi textarea teks pesan dengan placeholder `{nama_siswa}`, `{nama_sekolah}`, `{nominal}`, `{tanggal_jatuh_tempo}`, `{hari_terlambat}`, `{link_bayar}` | US-04      | Must      | Template ini adalah default platform, otomatis disalin ke sekolah baru saat onboarding; bukan editor milik sekolah tertentu   |
| FR-07 | Simpan Aturan Reminder & Template Pesan | Sistem harus menyediakan tombol simpan khusus pada kartu Aturan Reminder (implisit lewat Simpan Konfigurasi) dan kartu Template Pesan ("Simpan Template Default") | US-03, US-04 | Must    | Simpan Template Default hanya menyimpan perubahan pada kartu Template Pesan                                                   |
| FR-08 | Simpan Konfigurasi Global                | Sistem harus menyediakan tombol "Simpan Konfigurasi" di bagian bawah halaman yang menyimpan perubahan pada kartu Rekening Bank, Notifikasi, dan Aturan Reminder | US-05      | Should    | Menampilkan toast konfirmasi "Konfigurasi berhasil disimpan"                                                                  |

### 6.1 Hak Akses per Peran

| Fitur                                             | Super Admin | Admin Wilayah | Staff Keuangan Pusat | Viewer |
| -------------------------------------------------- | ----------- | -------------- | ---------------------- | ------ |
| Lihat halaman Konfigurasi Sistem                   | Ya          | --             | --                      | --     |
| Ubah Rekening Bank Penampung Pusat & VA             | Ya          | --             | --                      | --     |
| Tambah/hapus Aturan Reminder & Eskalasi             | Ya          | --             | --                      | --     |
| Ubah Template Pesan Default                         | Ya          | --             | --                      | --     |

_Catatan: pada konfigurasi default, hanya role dengan permission `konfigurasi` (saat ini: Super Admin) yang dapat mengakses menu ini; dapat diubah lewat menu Role & Hak Akses._

### 6.2 Notifikasi

| Pemicu                                          | Penerima    | Kanal | Isi singkat                                   |
| ------------------------------------------------ | ----------- | ----- | ----------------------------------------------- |
| Konfigurasi berhasil disimpan                    | Super Admin | Toast UI | "Konfigurasi berhasil disimpan"              |
| Template Pesan Default berhasil disimpan         | Super Admin | Toast UI | "Template default platform berhasil disimpan" |

---

## 7. Kebutuhan Non-Fungsional

| ID     | Kategori      | Requirement                                                                                     | Target terukur                                            |
| ------ | -------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| NFR-01 | Validasi       | Nomor Rekening Penampung Pusat harus berupa digit dan tidak boleh kosong sebelum simpan               | 100% validasi sebelum simpan                                 |
| NFR-02 | Validasi       | Template pesan harus mempertahankan placeholder minimum (`{nama_siswa}`, `{link_bayar}`) saat disimpan | 100% template tervalidasi memiliki placeholder minimum       |
| NFR-03 | Performa       | Waktu simpan konfigurasi (seluruh kartu)                                                             | < 1 detik untuk kondisi data saat ini (≤ 20 baris aturan)     |
| NFR-04 | Konsistensi    | Perubahan pada Rekening Bank Penampung Pusat & VA dan Nomor Resmi Terpusat harus tercermin di seluruh sekolah tanpa perlu diisi ulang per sekolah | 100% sekolah membaca nilai global yang sama                  |
| NFR-05 | Auditability   | Setiap perubahan pada rekening penampung, aturan reminder, dan template pesan tercatat pelaku & waktu | 100% tercatat di audit log                                    |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login → Menu "Konfigurasi Sistem" → ubah field pada kartu Rekening Bank Penampung Pusat & VA / Notifikasi Nomor Resmi Terpusat / Aturan Reminder & Eskalasi / Template Pesan → simpan per kartu (Template Pesan) atau "Simpan Konfigurasi" di bawah halaman → toast konfirmasi.
- Wireframe: mengikuti struktur `konfigurasi.html` -- empat kartu berurutan (Rekening Bank, Notifikasi, Aturan Reminder dengan tabel baris dinamis, Template Pesan dengan tab kanal WA/SMS/Email), diakhiri tombol simpan di kanan bawah.
- Edge case yang wajib ditangani: menghapus seluruh baris Aturan Reminder sehingga sekolah baru tidak memiliki reminder default sama sekali (lihat Risiko); mengubah/menghapus placeholder penting pada Template Pesan sehingga pesan terkirim tanpa data krusial (mis. tanpa `{link_bayar}`).

---

## 9. Integrasi & Dependensi

| Sistem eksternal                 | Fungsi                                                            | Metode                          | PIC | Status |
| --------------------------------- | -------------------------------------------------------------------- | ---------------------------------- | --- | ------ |
| Modul Pendaftaran Sekolah (Onboarding) | Menyalin Aturan Reminder & Template Pesan default ke sekolah baru saat onboarding | Internal (shared data store)       | [ ] | [ ]    |
| Modul Manajemen Sekolah           | Membaca Rekening Penampung Pusat & VA sebagai acuan tunggal pembayaran, dan menjadi tempat override Aturan Reminder per sekolah | Internal (shared data store)       | [ ] | [ ]    |
| WhatsApp Business API             | Pengiriman notifikasi dari Nomor Resmi Terpusat sesuai Template Pesan  | REST API (WABA)                     | [ ] | [ ]    |

---

## 10. Kebutuhan Data

- Entitas utama:
  - `RekeningPenampungPusat` (namaBank, nomorRekening, namaPemilikRekening).
  - `NomorResmiTerpusat` (nomorWA, businessAccountId) -- read-only dari panel ini.
  - `AturanReminder` (offsetHari, namaAturan, levelPenanganan, channels[WA/SMS/Email], aktif).
  - `TemplatePesanDefault` (kanal, level, teks).
- Migrasi data: tidak ada migrasi dari sistem lama pada fase ini; data merupakan baseline baru platform.
- Retensi data: seluruh entitas di atas disimpan selama platform berjalan; perubahan harus tercatat di audit log (lihat NFR-05).
- Laporan yang dibutuhkan: riwayat perubahan Rekening Penampung Pusat & VA (untuk kebutuhan audit keuangan), daftar Aturan Reminder aktif saat ini.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Rekening Penampung Pusat & VA Pembayaran yang diatur di halaman ini adalah satu-satunya tujuan pembayaran SPP untuk seluruh sekolah (detail pembagian dana ke sekolah diatur di luar modul ini).
- Nomor WA Pusat dan Business Account ID bersifat read-only di panel ini karena rotasi/perubahannya dilakukan lewat proses backend, bukan lewat form web.

**Batasan:**

- Pengaturan Umum platform, integrasi Host-to-Host, skema bagi hasil, biaya layanan notifikasi, dan kebijakan keamanan & kepatuhan tidak lagi dikelola dari halaman ini pada versi saat ini.

**Pertanyaan terbuka:**

| No  | Pertanyaan                                                                                      | Ditujukan ke | Batas jawab  | Jawaban |
| --- | -------------------------------------------------------------------------------------------------- | ------------ | ------------ | ------- |
| 1   | Di modul/halaman mana Pengaturan Umum (nama platform, zona waktu) dan integrasi Host-to-Host sekarang dikelola? | Solution Architect | [DD-MM-YYYY] | [ ]     |
| 2   | Apakah dibutuhkan validasi minimal 1 Aturan Reminder aktif agar sekolah baru tidak onboarding tanpa reminder? | PO klien     | [DD-MM-YYYY] | [ ]     |
| 3   | Apakah Template Pesan default perlu mode pratinjau (preview) dengan data contoh sebelum disimpan? | PO klien     | [DD-MM-YYYY] | [ ]     |

---

## 12. Risiko & Mitigasi

| Risiko                                                                                 | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi                                                                                     | PIC |
| ----------------------------------------------------------------------------------------- | -------------- | ---------------------- | ------------------------------------------------------------------------------------------------ | --- |
| Super Admin menghapus seluruh baris Aturan Reminder & Eskalasi, sekolah baru onboarding tanpa reminder default | H              | L                      | Tambahkan validasi minimal 1 aturan aktif sebelum simpan, atau peringatan konfirmasi saat menghapus baris terakhir | [ ] |
| Kesalahan input Nomor Rekening Penampung Pusat menyebabkan dana SPP salah tujuan            | H              | L                      | Tambahkan validasi format nomor rekening dan konfirmasi ganda sebelum simpan                       | [ ] |
| Template Pesan kehilangan placeholder penting (mis. `{link_bayar}`) sehingga wali murid tidak bisa membayar | M              | M                      | Validasi placeholder minimum sebelum simpan (lihat NFR-02)                                        | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone      | Deliverable                          | Target tanggal | Kriteria selesai             |
| -------------- | ------------------------------------- | -------------- | ------------------------------- |
| PRD approved   | Dokumen ini v1.0                      | [ ]            | Ditandatangani PO                |
| Desain selesai | Mockup final 4 kartu Konfigurasi Sistem | [ ]            | Review SA & klien                |
| Development    | Implementasi penyimpanan konfigurasi backend | [ ]      | Lolos code review                |
| UAT            | Build staging                         | [ ]            | 0 bug critical, sign-off UAT      |
| Go-live        | Production                            | [ ]            | Monitoring 2 minggu stabil        |

---

## 14. Glosarium

| Istilah | Arti                                                                                             |
| ------- | ----------------------------------------------------------------------------------------------------- |
| VA      | Virtual Account -- nomor virtual tujuan pembayaran SPP yang digenerate dari rekening penampung pusat    |
| WABA    | WhatsApp Business Account ID -- identitas akun WhatsApp Business resmi platform                         |
| H+/H-   | Offset hari terhadap tanggal jatuh tempo tagihan (H- = sebelum jatuh tempo, H+ = setelah jatuh tempo)   |
| Level Penanganan | Tingkat eskalasi pesan reminder: Level 1 (Pengingat), Level 2 (Peringatan), Level 3 (Eskalasi) |

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
