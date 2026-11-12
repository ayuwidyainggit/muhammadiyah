# PRD: Konfigurasi Notifikasi Wali Murid

## 1. Informasi Dokumen

| Atribut | Isi |
| --- | --- |
| Nama produk / fitur | Konfigurasi Notifikasi (Preferensi Kanal) Wali Murid |
| Klien / proyek | Wali Murid -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen | v0.1 |
| Status | Draft |
| Penulis | Tim Produk GeekGarden |
| Product Owner | [Nama PO Klien] |
| Solution Architect | [Nama SA] |
| Tanggal dibuat | 08-11-2026 |
| Target rilis | [DD-MM-YYYY / Sprint X] |
| Dokumen terkait | `notifikasi.html`, `app.js`, `riwayat.html`, PRD Login & SSO Wali Murid, PRD Konfigurasi Sistem (Admin Pusat -- Aturan Reminder & Template Default) |

### Riwayat Revisi

| Versi | Tanggal | Penulis | Perubahan |
| --- | --- | --- | --- |
| v0.1 | 08-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `notifikasi.html` (halaman "Konfigurasi Notifikasi" di bottom nav Portal Wali Murid). |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

`notifikasi.html` adalah halaman preferensi kanal notifikasi di Portal Wali Murid. Wali murid dapat menyalakan/mematikan kanal WhatsApp, SMS, Email, dan Push Notifikasi secara individual untuk menerima reminder tagihan, kuitansi, dan update pembayaran. Kanal "Notifikasi Aplikasi" (in-app) selalu aktif dan tidak bisa dimatikan, sebagai catatan riwayat minimal di dalam aplikasi. Halaman ini **bukan** kotak masuk/daftar notifikasi -- ikon lonceng di header mengarah ke `riwayat.html` untuk melihat item yang perlu ditindaklanjuti (mis. konfirmasi pembayaran manual yang menunggu verifikasi).

### 2.2 Problem Statement

**Wali murid** mengalami **ketidakcocokan kanal reminder dengan kebiasaan komunikasi masing-masing** saat **seluruh wali murid menerima reminder lewat kanal default yang sama tanpa bisa dipersonalisasi**, yang menyebabkan **reminder tagihan/kuitansi terlewat karena dikirim ke kanal yang tidak dipantau (mis. SMS saat wali murid hanya memantau WhatsApp), atau sebaliknya wali murid merasa terlalu banyak menerima notifikasi di kanal yang tidak diinginkan**.

### 2.3 Kondisi Saat Ini (As-Is)

Aturan reminder & template pesan default ditentukan di sisi platform (Admin Pusat -- lihat PRD Konfigurasi Sistem) dan dikirim ke seluruh wali murid tanpa lapisan personalisasi kanal per individu.

### 2.4 Kondisi yang Diharapkan (To-Be)

Wali murid dapat membuka "Konfigurasi Notifikasi" dari bottom nav, melihat deskripsi tiap kanal, menyalakan/mematikan WhatsApp/SMS/Email/Push Notifikasi sesuai kebutuhannya, dan menyimpan preferensinya -- dengan Notifikasi Aplikasi tetap aktif sebagai jaring pengaman minimal yang tidak bisa dimatikan.

### 2.5 Kenapa Sekarang?

Semakin banyak wali murid aktif bertransaksi (lihat PRD Login & SSO Wali Murid), sehingga volume reminder & notifikasi transaksi juga meningkat -- personalisasi kanal mengurangi gangguan yang tidak perlu dan meningkatkan kemungkinan reminder penting benar-benar terbaca.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memberi wali murid kendali personalisasi kanal notifikasi tanpa mengorbankan ketersediaan informasi kritikal (Notifikasi Aplikasi selalu ada).
2. Mengurangi reminder/notifikasi yang tidak relevan atau tidak terbaca karena dikirim ke kanal yang tidak dipantau wali murid.
3. Menjaga konsistensi lima kanal yang sama (WA/SMS/Email/Push/Notifikasi Aplikasi) dengan yang dikelola di Konfigurasi Sistem Admin Pusat.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak menyediakan daftar/kotak masuk riwayat notifikasi di halaman ini -- item yang perlu ditindaklanjuti dilihat lewat ikon lonceng yang mengarah ke `riwayat.html`.
- Tidak mengatur isi/template pesan reminder -- itu domain Konfigurasi Sistem Admin Pusat.
- Tidak menyediakan pengaturan jadwal "jam tenang" (quiet hours) notifikasi pada fase ini.
- Tidak menyimpan preferensi secara persisten ke backend pada versi prototipe ini (lihat Batasan).

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| % wali murid yang menyesuaikan preferensi dari default dalam 1 bulan pertama | [ ] | 20% | Log perubahan preferensi | 1 bulan setelah rilis |
| Penurunan komplain "salah terima reminder di kanal yang tidak dipantau" | [ ] | -50% | Tiket dukungan terkait notifikasi | 2 bulan setelah rilis |
| % preferensi yang gagal/tidak tersimpan setelah reload halaman | 100% (belum ada persistensi) | 0% | QA regresi setelah backend persistence diimplementasi | sebelum go-live produksi |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran | Organisasi | RACI | Kepentingan |
| --- | --- | --- | --- |
| Product Owner | Klien (Muhammadiyah Pusat/Sekolah) | A | Menyetujui kanal default & kebijakan Notifikasi Aplikasi wajib aktif |
| Solution Architect | GeekGarden | R | Desain penyimpanan preferensi & integrasi dengan sistem pengiriman notifikasi |
| Tech Lead | GeekGarden | R | Implementasi toggle & persistensi preferensi |
| QA Lead | GeekGarden | C | Pengujian kombinasi kanal aktif/nonaktif |
| Wali Murid | Klien (pengguna akhir) | R | Pengguna utama halaman ini |
| Staff Keuangan Pusat/Admin Sekolah | Klien | I | Terdampak bila wali murid mematikan kanal yang dipakai untuk reminder tagihan |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Wali murid pengguna aktif WhatsApp | Memantau WA sepanjang hari, jarang cek email | Matikan kanal yang tidak dipantau (mis. Email) | Menerima kuitansi/reminder ganda di kanal yang tidak dibuka | Mobile |
| Wali murid tanpa smartphone pribadi | Mengandalkan SMS/telepon rumah | Pastikan SMS tetap aktif sebagai cadangan | Push/Email tidak relevan untuknya | Feature phone/SMS |
| Wali murid minim gangguan | Ingin seminim mungkin notifikasi eksternal | Matikan semua kanal eksternal, cukup cek aplikasi saat sempat | Khawatir terlewat info penting bila semua kanal dimatikan | Mobile/web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Toggle individual untuk kanal WhatsApp, SMS, Email, dan Push Notifikasi | Daftar/kotak masuk riwayat notifikasi |
| Notifikasi Aplikasi (in-app) selalu aktif & tidak bisa dimatikan, dengan penjelasan alasannya | Pengaturan isi/template pesan reminder |
| Tombol "Simpan Preferensi" dengan toast konfirmasi | Jadwal "jam tenang" (quiet hours) |
| Deskripsi singkat kegunaan tiap kanal | Persistensi preferensi ke backend/API (prototipe ini hanya in-memory) |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Toggle WhatsApp/SMS/Email/Push, Notifikasi Aplikasi selalu ON (disabled dari interaksi), tombol Simpan Preferensi + toast konfirmasi.
- **Should have** -- Deskripsi tiap kanal, catatan penjelasan kenapa Notifikasi Aplikasi wajib aktif.
- **Could have** -- Indikator status pengiriman terakhir per kanal (berhasil/gagal terkirim).
- **Won't have (now)** -- Kotak masuk notifikasi, jam tenang, template pesan custom per wali murid, persistensi backend (pada fase prototipe).

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai wali murid, saya ingin menyalakan/mematikan kanal WhatsApp/SMS/Email/Push secara individual, supaya saya hanya menerima notifikasi lewat kanal yang saya pantau. | Must | Given saya membuka Konfigurasi Notifikasi, When saya mengubah salah satu toggle kanal (selain Notifikasi Aplikasi), Then status toggle berubah dan tersimpan di state preferensi saat saya menekan "Simpan Preferensi" |
| US-02 | Sebagai wali murid, saya ingin Notifikasi Aplikasi selalu aktif walau saya matikan semua kanal lain, supaya saya tidak kehilangan info penting seperti status pembayaran. | Must | Given saya membuka halaman ini, When saya melihat toggle "Notifikasi Aplikasi", Then toggle tersebut selalu dalam posisi aktif dan tidak dapat diklik/diubah, disertai penjelasan alasannya |
| US-03 | Sebagai wali murid, saya ingin mendapat konfirmasi setelah menyimpan preferensi, supaya saya yakin perubahan saya berhasil. | Must | Given saya sudah mengubah satu atau lebih toggle, When saya menekan "Simpan Preferensi", Then toast "✓ Preferensi notifikasi disimpan" muncul |
| US-04 | Sebagai wali murid, saya ingin memahami kegunaan masing-masing kanal sebelum memutuskan mematikannya, supaya saya tidak salah menonaktifkan kanal yang penting. | Should | Given saya melihat daftar kanal, When halaman dimuat, Then setiap kanal menampilkan deskripsi singkat kegunaannya (mis. WhatsApp = kanal utama reminder & kuitansi) |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Toggle Kanal Eksternal | Sistem harus menyediakan toggle aktif/nonaktif untuk WhatsApp, SMS, Email, dan Push Notifikasi, dengan state awal sesuai preferensi saat ini (default demo: WA aktif, SMS nonaktif, Email aktif, Push aktif) | US-01 | Must | Perubahan toggle langsung memperbarui state preferensi di memori (`onNotifToggle`); lihat FR-03 untuk status "tersimpan" |
| FR-02 | Notifikasi Aplikasi Wajib Aktif | Toggle "Notifikasi Aplikasi" harus selalu tercentang dan dinonaktifkan dari interaksi pengguna, disertai catatan info yang menjelaskan alasannya | US-02 | Must | Ini adalah catatan riwayat minimal dalam aplikasi (status pembayaran, hasil verifikasi konfirmasi manual) yang harus tetap ada walau semua kanal eksternal dimatikan |
| FR-03 | Simpan Preferensi | Tombol "Simpan Preferensi" harus menampilkan toast konfirmasi setelah ditekan | US-03 | Must | Pada versi prototipe ini, tombol hanya menampilkan toast dan tidak memanggil penyimpanan persisten apa pun -- lihat Batasan (bagian 11) |
| FR-04 | Deskripsi Kanal | Setiap kanal harus menampilkan judul dan deskripsi singkat kegunaannya | US-04 | Should | Teks statis menjelaskan peran masing-masing kanal (reminder, kuitansi, cadangan, dsb.) |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Kejelasan status | Perubahan toggle yang belum ditekan "Simpan Preferensi" harus jelas statusnya bagi pengguna (tersimpan vs belum) | 0% ambiguitas -- perlu konfirmasi desain final, lihat Pertanyaan Terbuka #2 |
| NFR-02 | Reliabilitas pengiriman | Kanal yang dimatikan wali murid tidak boleh menerima pengiriman reminder/kuitansi dari sistem backend reminder setelah terintegrasi | 0% pengiriman ke kanal nonaktif |
| NFR-03 | Aksesibilitas kontrol | Toggle "Notifikasi Aplikasi" harus secara visual & fungsional jelas berbeda (disabled state) dari toggle lain yang bisa diubah | 100% dapat dibedakan pengguna |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login → bottom nav "Notifikasi" → lihat 5 kanal beserta deskripsinya → ubah toggle yang diinginkan → tekan "Simpan Preferensi" → toast konfirmasi muncul.
- Wireframe: mengikuti struktur `notifikasi.html` -- header (nama wali murid, ikon lonceng dengan badge jumlah item menunggu verifikasi yang mengarah ke `riwayat.html`, child-switch), judul "Konfigurasi Notifikasi", satu kartu berisi 5 baris toggle, kotak info biru khusus Notifikasi Aplikasi, tombol "Simpan Preferensi", dan bottom nav (Profil/Notifikasi/Bayar/Riwayat).
- Edge case yang wajib ditangani: wali murid mematikan seluruh kanal eksternal (WA/SMS/Email/Push) sekaligus -- tetap harus menerima Notifikasi Aplikasi; wali murid reload halaman setelah mengubah toggle tanpa menekan "Simpan Preferensi" -- preferensi kembali ke default karena belum ada persistensi (lihat Batasan); wali murid dengan lebih dari satu anak (child-switch) -- preferensi notifikasi bersifat per akun wali murid, bukan per anak.

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Sistem pengiriman reminder (gateway WA/SMS/Email/Push) | Penerima akhir preferensi kanal untuk menentukan ke kanal mana reminder/kuitansi dikirim | Internal/gateway pihak ketiga | [ ] | [ ] |
| Modul Konfigurasi Sistem (Admin Pusat) -- Aturan Reminder & Template Default | Sumber kebijakan default & isi pesan; preferensi di halaman ini adalah lapisan personalisasi di atasnya | Internal (shared data store) | [ ] | [ ] |
| `riwayat.html` (ikon lonceng) | Menampilkan item konfirmasi pembayaran manual yang menunggu verifikasi (bukan kotak masuk notifikasi) | Internal (shared data store) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: PreferensiNotifikasiWaliMurid (`wa`, `sms`, `email`, `push`, `inapp` -- boolean), terikat ke satu akun wali murid.
- Pada prototipe ini disimpan sebagai objek JS in-memory (`notifPrefs`) dan hilang saat halaman di-reload -- perlu dipindahkan ke penyimpanan persisten (API/database) sebelum produksi.
- Tidak ada migrasi data khusus untuk fitur ini.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Preferensi notifikasi berlaku untuk satu akun wali murid secara keseluruhan, tidak berbeda per anak walau wali murid memiliki fitur child-switch untuk multi-anak.
- Notifikasi Aplikasi dianggap kanal "fallback" minimal yang harus selalu tersedia terlepas dari preferensi kanal lain.

**Batasan:**

- Preferensi yang diubah hanya tersimpan di memori JS selama sesi berjalan (`notifPrefs`) dan hilang saat halaman di-reload -- belum ada endpoint API penyimpanan.
- Tidak ada indikator status pengiriman riil per kanal (berhasil/gagal terkirim ke WA/SMS/Email tertentu).

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Apakah preferensi notifikasi perlu disimpan per anak (bukan hanya per akun wali murid), mengingat ada fitur child-switch multi-anak? | PO klien | [DD-MM-YYYY] | [ ] |
| 2 | Apakah toggle kanal berlaku efektif langsung saat diklik, atau baru efektif setelah "Simpan Preferensi" ditekan? (perilaku saat ini ambigu di prototipe) | PO klien/SA | [DD-MM-YYYY] | [ ] |
| 3 | Apakah dibutuhkan jadwal "jam tenang" (quiet hours) agar notifikasi tidak masuk di luar jam tertentu? | PO klien | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Preferensi yang diubah wali murid tidak benar-benar tersimpan karena belum ada backend persistence pada prototipe ini | H | H | Implementasikan API penyimpanan preferensi sebelum rilis produksi | [ ] |
| Wali murid mematikan seluruh kanal eksternal tanpa sadar berisiko terlambat mengetahui tagihan jatuh tempo (hanya mengandalkan Notifikasi Aplikasi yang harus dibuka manual) | M | M | Tambahkan peringatan/konfirmasi tambahan saat wali murid mematikan seluruh kanal eksternal sekaligus | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Mockup final & keputusan persistensi preferensi | [ ] | Review SA & klien |
| Development | Toggle kanal, Notifikasi Aplikasi wajib aktif, integrasi penyimpanan preferensi | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| Notifikasi Aplikasi (in-app) | Catatan riwayat minimal dalam aplikasi yang selalu aktif dan tidak bisa dimatikan |
| Kanal Eksternal | WhatsApp, SMS, Email, dan Push Notifikasi -- dapat dinyalakan/dimatikan individual oleh wali murid |
| Push Notifikasi | Notifikasi pop-up di perangkat wali murid walau aplikasi sedang tertutup |
| Bell Badge | Indikator jumlah item (konfirmasi pembayaran manual) yang masih menunggu verifikasi, ditampilkan pada ikon lonceng di header, mengarah ke `riwayat.html` |

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
