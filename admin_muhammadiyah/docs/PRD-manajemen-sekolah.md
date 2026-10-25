# PRD: Manajemen Sekolah

## 1. Informasi Dokumen

| Atribut | Isi |
| --- | --- |
| Nama produk / fitur | Manajemen Sekolah |
| Klien / proyek | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen | v0.1 |
| Status | Draft |
| Penulis | Tim Produk GeekGarden |
| Product Owner | [Nama PO Klien] |
| Solution Architect | [Nama SA] |
| Tanggal dibuat | 25-10-2026 |
| Target rilis | [DD-MM-YYYY / Sprint X] |
| Dokumen terkait | `manajemen.html`, `app.js`, PRD Pendaftaran Sekolah, PRD Dashboard Konsolidasi |

### Riwayat Revisi

| Versi | Tanggal | Penulis | Perubahan |
| --- | --- | --- | --- |
| v0.1 | 25-10-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `manajemen.html` (daftar sekolah, Info Sekolah, Rekening Penampung, Reminder & Template, nonaktifkan/aktifkan sekolah) |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Manajemen Sekolah memungkinkan Super Admin/Admin Wilayah melihat daftar seluruh sekolah terdaftar dan mengelola konfigurasi masing-masing: data info sekolah, rekening penampung fee, override aturan reminder & template pesan tagihan, serta menonaktifkan/mengaktifkan kembali sekolah. Fitur ini adalah pusat kendali operasional sekolah pasca-onboarding.

### 2.2 Problem Statement

**Admin Pusat/Wilayah** mengalami **kesulitan mengelola konfigurasi spesifik tiap sekolah (rekening, aturan reminder, status operasional) secara terpisah dan konsisten** saat **jumlah sekolah bertambah dan tiap sekolah punya kebutuhan sedikit berbeda dari default platform**, yang menyebabkan **inkonsistensi konfigurasi dan risiko kesalahan saat menonaktifkan sekolah yang masih punya tunggakan siswa**.

### 2.3 Kondisi Saat Ini (As-Is)

Perubahan data sekolah, rekening, atau aturan reminder dilakukan via permintaan manual ke tim backend; status aktif/nonaktif sekolah tidak punya kontrol terpusat sehingga risiko sekolah dinonaktifkan tanpa mempertimbangkan tunggakan siswa yang belum lunas.

### 2.4 Kondisi yang Diharapkan (To-Be)

Admin dapat membuka daftar sekolah, memilih satu sekolah, dan mengelola seluruh konfigurasinya dalam 3 tab (Info Sekolah, Rekening Penampung, Reminder & Template) dari satu halaman, termasuk proses nonaktifkan/aktifkan yang mewajibkan alasan dan menampilkan peringatan tunggakan bila ada.

### 2.5 Kenapa Sekarang?

Setelah sekolah mulai aktif bertransaksi, kebutuhan pengelolaan harian (ubah rekening, sesuaikan aturan reminder, nonaktifkan sekolah yang merger/tutup) menjadi rutin dan harus bisa dilakukan mandiri oleh Admin Pusat/Wilayah tanpa menunggu tim teknis.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memberikan satu titik kendali bagi Admin untuk mengelola konfigurasi tiap sekolah (info, rekening, reminder) tanpa melibatkan tim backend.
2. Mencegah sekolah dinonaktifkan tanpa disertai pencatatan alasan dan kesadaran akan tunggakan siswa yang belum lunas.
3. Memungkinkan sekolah menyesuaikan aturan reminder & template pesan dari default platform sesuai kebutuhan lokal, tanpa memengaruhi sekolah lain.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak mendukung penghapusan (delete) data sekolah secara permanen -- hanya status Aktif/Nonaktif.
- Tidak mendukung bulk edit/nonaktifkan banyak sekolah sekaligus pada fase ini.
- Tidak menangani write-off tunggakan dari halaman ini (write-off tunduk pada proses terpisah dengan approval Kepala Sekolah).

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| Waktu rata-rata update konfigurasi sekolah (rekening/reminder) | [ ] (manual, via tiket backend) | < 5 menit (self-service) | Timestamp submit form | 2 bulan setelah rilis |
| % proses nonaktivasi sekolah yang menyertakan alasan tercatat | 0% (belum ada fitur) | 100% | Audit log alasan nonaktivasi | 1 bulan setelah rilis |
| Jumlah kasus sekolah dinonaktifkan tanpa sadar ada tunggakan siswa | [ ] | 0 kasus | Insiden yang dilaporkan vs total nonaktivasi | 3 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran | Organisasi | RACI | Kepentingan |
| --- | --- | --- | --- |
| Product Owner | Klien (Muhammadiyah Pusat) | A | Menyetujui alur nonaktivasi & aturan reminder override |
| Solution Architect | GeekGarden | R | Desain relasi data sekolah, rekening, aturan reminder |
| Tech Lead | GeekGarden | R | Implementasi tab & validasi form |
| QA Lead | GeekGarden | C | Strategi pengujian skenario tunggakan saat nonaktivasi |
| Admin Wilayah (PWM) | Klien | C/R | Pengguna utama yang mengelola sekolah di wilayahnya |
| Bendahara/Kepala Sekolah | Klien | I | Terdampak saat sekolah dinonaktifkan (tidak bisa login) |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Super Admin Pusat | Mengelola seluruh sekolah nasional | Update konfigurasi sekolah cepat & aman | Tidak ada kontrol terpusat sebelumnya | Laptop/web |
| Admin Wilayah (PWM) | Mengelola sekolah di wilayahnya | Sesuaikan aturan reminder sesuai kebijakan sekolah setempat | Perubahan aturan default memengaruhi semua sekolah | Laptop/web |
| Staff Keuangan Pusat | Memantau status & rekening sekolah | Pastikan rekening fee benar sebelum pencairan | Data rekening tidak terverifikasi | Laptop/web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Daftar sekolah (nama, NPSN, wilayah, rekening penampung, status) | Bulk action (nonaktifkan/edit banyak sekolah sekaligus) |
| Tab Info Sekolah (profil, status, struktur organisasi, riwayat status) | Penghapusan permanen data sekolah |
| Tab Rekening Penampung (Nama Bank, No Rek, Nama Pemilik) | Write-off tunggakan (proses terpisah) |
| Tab Reminder & Template (override aturan H-7/H-3/H-1/H+... dan template WA/SMS/Email per sekolah) | Approval berjenjang untuk override aturan reminder |
| Nonaktifkan Sekolah (dengan alasan wajib + peringatan tunggakan) & Aktifkan Kembali | Notifikasi otomatis ke wali murid saat sekolah dinonaktifkan |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Daftar sekolah, Tab Info Sekolah, Nonaktifkan/Aktifkan dengan validasi tunggakan.
- **Should have** -- Tab Rekening Penampung, Tab Reminder & Template override.
- **Could have** -- Riwayat status sekolah yang lebih detail (multi-entry, bukan hanya entri terakhir).
- **Won't have (now)** -- Bulk action, penghapusan permanen, write-off dari halaman ini.

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai Admin, saya ingin melihat daftar seluruh sekolah terdaftar beserta status dan rekening penampungnya, supaya saya bisa memilih sekolah yang perlu dikelola. | Must | Given saya membuka Manajemen Sekolah, When halaman dimuat, Then tabel menampilkan Nama Sekolah, NPSN, Wilayah, Rekening Penampung, Status, dan tombol "Kelola" untuk setiap sekolah |
| US-02 | Sebagai Admin, saya ingin mengubah data Info Sekolah (nama, NPSN, jenjang), supaya data sekolah tetap akurat. | Must | Given saya di tab Info Sekolah, When saya mengubah field dan menyimpan, Then data tersimpan dan tercermin di daftar sekolah |
| US-03 | Sebagai Admin, saya ingin memperbarui rekening penampung sekolah (Nama Bank, No Rek, Nama Pemilik), supaya pencairan fee sekolah ini mengarah ke rekening yang benar. | Must | Given saya di tab Rekening Penampung, When saya mengubah Nama Bank/No Rek/Nama Pemilik dan menekan "Simpan", Then sistem menampilkan konfirmasi "Rekening Penampung berhasil disimpan" |
| US-04 | Sebagai Admin, saya ingin menonaktifkan sekolah yang sudah tidak beroperasi (misal merger), supaya staf sekolah tersebut tidak bisa login dan tidak ada tagihan baru diterbitkan. | Must | Given sekolah berstatus Aktif dan punya tunggakan siswa, When saya menekan "Nonaktifkan Sekolah", Then sistem menampilkan jumlah siswa & nominal tunggakan, mewajibkan saya mengisi alasan dan mencentang pernyataan paham tunggakan tetap harus ditagih, sebelum tombol konfirmasi aktif |
| US-05 | Sebagai Admin, saya ingin mengaktifkan kembali sekolah yang sebelumnya dinonaktifkan, supaya sekolah tersebut bisa beroperasi normal lagi. | Should | Given sekolah berstatus Nonaktif, When saya menekan "Aktifkan Kembali" dan konfirmasi, Then status sekolah berubah menjadi Aktif dan staf sekolah bisa login kembali |
| US-06 | Sebagai Admin Wilayah, saya ingin mengubah aturan reminder & template pesan khusus untuk satu sekolah, supaya gaya komunikasi penagihan sesuai kebijakan sekolah tersebut tanpa memengaruhi sekolah lain. | Should | Given saya di tab Reminder & Template, When saya mengubah offset hari/level/channel suatu aturan atau isi template dan menyimpan, Then perubahan hanya berlaku untuk sekolah ini, sekolah lain tetap memakai Default Platform |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Daftar Sekolah | Sistem harus menampilkan tabel seluruh sekolah dengan kolom Nama Sekolah, NPSN, Wilayah, Rekening Penampung, Status, dan aksi "Kelola" | US-01 | Must | Status ditampilkan dengan badge warna (Aktif/Nonaktif/Draft) |
| FR-02 | Info Sekolah | Sistem harus menyediakan form edit Nama Sekolah, NPSN, Jenjang, Status (readonly), Struktur Organisasi (readonly), dan riwayat status jika pernah dinonaktifkan | US-02 | Must | Struktur organisasi tidak bisa diubah dari tab ini (diatur saat pendaftaran) |
| FR-03 | Rekening Penampung | Sistem harus menyediakan form edit Nama Bank (dropdown), No Rek, Nama Pemilik untuk sekolah terpilih, dengan tombol "Simpan" | US-03 | Must | Hanya untuk pencairan fee sekolah, bukan rekening penampung SPP wali murid (terpusat) |
| FR-04 | Nonaktifkan Sekolah | Sistem harus menampilkan modal konfirmasi berisi jumlah siswa & nominal tunggakan (jika ada), field Alasan Nonaktivasi (wajib), dan checkbox pernyataan paham tunggakan tetap harus ditagih (wajib jika ada tunggakan) sebelum tombol konfirmasi bisa ditekan | US-04 | Must | Tombol konfirmasi disabled sampai alasan diisi dan (jika ada tunggakan) checkbox dicentang |
| FR-05 | Aktifkan Kembali | Sistem harus menyediakan modal konfirmasi sederhana untuk mengubah status sekolah Nonaktif menjadi Aktif | US-05 | Should | Setelah aktif, staf sekolah bisa login dan tagihan baru mulai diterbitkan sesuai jadwal normal |
| FR-06 | Riwayat Status | Sistem harus menyimpan dan menampilkan riwayat nonaktivasi terakhir (tanggal, pelaku, alasan) di tab Info Sekolah | US-04 | Should | Format: "Dinonaktifkan [tanggal] oleh [nama] ([role]) -- Alasan: [teks]" |
| FR-07 | Reminder & Template Override | Sistem harus menyediakan tabel aturan reminder (offset hari, nama aturan, level penanganan, channel WA/SMS/Email, aktif/nonaktif) dan editor template pesan per channel & level, khusus untuk sekolah terpilih, awalnya berupa salinan Default Platform | US-06 | Should | Perubahan di sini tidak memengaruhi Default Platform maupun sekolah lain |
| FR-08 | Tambah/Hapus Aturan Reminder | Sistik harus mengizinkan Admin menambah baris aturan baru atau menghapus baris aturan yang ada pada tab Reminder & Template sekolah ini | US-06 | Could | Minimal 1 aturan aktif disarankan, meski tidak dipaksakan di validasi |

### 6.1 Hak Akses per Peran

| Fitur | Super Admin | Admin Wilayah | Staff Keuangan Pusat | Viewer |
| --- | --- | --- | --- | --- |
| Lihat daftar sekolah | Read | Read | Read | -- |
| Edit Info Sekolah | CRUD | CRUD | -- | -- |
| Edit Rekening Penampung | CRUD | CRUD | -- | -- |
| Nonaktifkan/Aktifkan sekolah | Ya | Ya | -- | -- |
| Edit Reminder & Template sekolah | CRUD | CRUD | -- | -- |

### 6.2 Notifikasi

| Pemicu | Penerima | Kanal | Isi singkat |
| --- | --- | --- | --- |
| Sekolah dinonaktifkan | Staf sekolah (Admin/Kepsek/Bendahara) | Email/WhatsApp (disarankan) | Status sekolah berubah menjadi Nonaktif |
| Sekolah diaktifkan kembali | Staf sekolah | Email/WhatsApp (disarankan) | Status sekolah berubah menjadi Aktif, bisa login kembali |
| Rekening penampung diubah | Staff Keuangan Pusat (disarankan) | Internal/audit log | Perubahan rekening fee sekolah X |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Performa | Waktu muat daftar sekolah | p95 < 1,5 detik untuk ≤ 5.000 sekolah (dengan paginasi/lazy-load) |
| NFR-02 | Validasi | Tombol konfirmasi nonaktivasi tidak aktif sebelum alasan & checklist terpenuhi | 100% enforced di client & server |
| NFR-03 | Konsistensi | Status sekolah di daftar dan di detail selalu sinkron setelah aksi aktifkan/nonaktifkan | 0% selisih status antar tampilan dalam satu sesi |
| NFR-04 | Auditability | Setiap nonaktivasi tercatat waktu, pelaku, dan alasan | 100% tercatat, dapat ditelusuri |
| NFR-05 | Isolasi data | Override Reminder & Template satu sekolah tidak memengaruhi sekolah lain atau Default Platform | 0% kebocoran konfigurasi antar sekolah |
| NFR-06 | Usability | Admin dapat menyelesaikan 1 siklus edit konfigurasi (buka sekolah → ubah → simpan) tanpa panduan | < 3 menit |

---

## 8. Alur Pengguna & Desain

- Alur utama: Menu "Manajemen Sekolah" → Daftar Sekolah → klik "Kelola" → Detail Sekolah (tab Info Sekolah / Rekening Penampung / Reminder & Template) → ubah data → Simpan, atau → Nonaktifkan/Aktifkan via modal konfirmasi.
- Wireframe: mengikuti struktur `manajemen.html` (list panel & detail panel dengan channel-tabs).
- Edge case yang wajib ditangani: sekolah berstatus Draft (aksi nonaktifkan/aktifkan tidak relevan dan disembunyikan), sekolah dengan tunggakan nol (modal nonaktivasi menampilkan pesan "tidak ada tunggakan" tanpa checklist tambahan), sekolah dinonaktifkan lalu diaktifkan berkali-kali (riwayat status terbaru menimpa yang lama pada fase ini).

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Modul Pendaftaran Sekolah | Sumber data awal sekolah (profil, struktur organisasi, rekening awal) | Internal (shared data store) | [ ] | [ ] |
| Modul Invoicing/Reminder Default Platform | Sumber salinan awal aturan reminder saat override pertama dibuat | Internal API | [ ] | [ ] |
| Modul RBAC & Pengguna | Validasi siapa yang bisa login setelah status sekolah berubah | Internal API | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: Sekolah, RekeningPenampungSekolah, AturanReminderSekolah (override), TemplatePesanSekolah (override), RiwayatStatusSekolah, Tunggakan (agregat per sekolah).
- Retensi data: riwayat status sekolah & alasan nonaktivasi disimpan permanen untuk audit.
- Laporan yang dibutuhkan: daftar sekolah per status, daftar sekolah dengan override reminder aktif, daftar sekolah dengan tunggakan saat nonaktivasi.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Data tunggakan siswa per sekolah sudah tersedia secara real-time dari modul transaksi/invoicing saat modal nonaktivasi dibuka.
- Satu sekolah hanya memiliki satu set override Reminder & Template aktif pada satu waktu.

**Batasan:**

- Nonaktivasi sekolah tidak menghapus/write-off tunggakan secara otomatis; write-off tetap memerlukan proses & approval tersendiri.

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Apakah riwayat status perlu menyimpan seluruh histori (multi-entry), bukan hanya entri terakhir? | PO klien | [DD-MM-YYYY] | [ ] |
| 2 | Apakah perlu notifikasi otomatis ke wali murid saat sekolah dinonaktifkan? | PO klien | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Sekolah dinonaktifkan tanpa Admin sadar ada tunggakan besar | H | M | Modal nonaktivasi wajib menampilkan jumlah & nominal tunggakan beserta checklist pemahaman | [ ] |
| Override Reminder & Template keliru diterapkan ke sekolah lain | H | L | Isolasi data per sekolah divalidasi di level backend, bukan hanya UI | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Mockup tab & modal konfirmasi | [ ] | Review SA & klien |
| Development | Daftar + 3 tab + nonaktif/aktifkan | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| Rekening Penampung | Rekening sekolah untuk pencairan bagi hasil fee, berbeda dari rekening penampung pusat SPP |
| Write-off | Penghapusan piutang/tunggakan dengan approval, biasanya untuk siswa pindah sekolah |
| Override | Aturan khusus satu sekolah yang menggantikan default platform tanpa memengaruhi sekolah lain |

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
