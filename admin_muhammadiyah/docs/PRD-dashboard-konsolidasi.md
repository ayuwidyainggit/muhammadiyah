# PRD: Dashboard Konsolidasi

## 1. Informasi Dokumen

| Atribut | Isi |
| --- | --- |
| Nama produk / fitur | Dashboard Konsolidasi |
| Klien / proyek | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen | v0.1 |
| Status | Draft |
| Penulis | Tim Produk GeekGarden |
| Product Owner | [Nama PO Klien] |
| Solution Architect | [Nama SA] |
| Tanggal dibuat | 25-10-2026 |
| Target rilis | [DD-MM-YYYY / Sprint X] |
| Dokumen terkait | `dashboard-konsolidasi.html`, `app.js`, PRD Manajemen Sekolah, PRD Pendaftaran Sekolah |

### Riwayat Revisi

| Versi | Tanggal | Penulis | Perubahan |
| --- | --- | --- | --- |
| v0.1 | 25-10-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `dashboard-konsolidasi.html` |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Dashboard Konsolidasi memberi Super Admin dan Admin Wilayah gambaran performa pembayaran SPP seluruh jaringan sekolah Muhammadiyah secara nasional dalam satu halaman, mencakup KPI agregat, ranking wilayah, tren transaksi, dan daftar sekolah terbaik/terburuk berdasarkan collection rate. Tujuannya agar Pusat bisa mengambil keputusan intervensi (pendampingan, eskalasi) tanpa harus merekap manual dari tiap sekolah.

### 2.2 Problem Statement

**Admin Pusat & Pengurus Wilayah** mengalami **kesulitan memantau kesehatan pembayaran SPP ribuan sekolah secara real-time** saat **data pembayaran tersebar di masing-masing sekolah/wilayah**, yang menyebabkan **keterlambatan deteksi sekolah bermasalah dan intervensi yang reaktif, bukan proaktif**.

### 2.3 Kondisi Saat Ini (As-Is)

Rekap performa pembayaran dikumpulkan manual dari laporan masing-masing PWM/PDM/sekolah (Excel, WhatsApp, email), sehingga data yang sampai ke Pusat sudah lama (lagging) dan tidak konsisten formatnya antar wilayah.

### 2.4 Kondisi yang Diharapkan (To-Be)

Super Admin login ke satu dashboard dan langsung melihat KPI nasional bulan berjalan, collection rate per wilayah, tren transaksi, serta sekolah dengan performa terbaik dan terburuk -- semua ter-update otomatis dari data transaksi platform, tanpa rekap manual.

### 2.5 Kenapa Sekarang?

Platform invoicing & payment SPP sudah menangani onboarding dan transaksi sekolah; tanpa dashboard konsolidasi, data yang terkumpul tidak termanfaatkan untuk pengambilan keputusan Pusat, sehingga nilai platform bagi manajemen belum terasa.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memberikan visibilitas real-time atas collection rate nasional dan per wilayah kepada Pusat.
2. Mempercepat identifikasi sekolah/wilayah bermasalah untuk pendampingan oleh PWM/PDM/PCM.
3. Mengurangi waktu penyusunan laporan performa pembayaran dari manual (hari) menjadi instan (dashboard).

### 3.2 Non-Tujuan (Out of Goal)

- Tidak menyediakan drill-down transaksi per siswa dari dashboard ini (drill-down detail ada di Manajemen Sekolah).
- Tidak melakukan ekspor laporan (PDF/Excel) di fase ini.
- Filter tren transaksi (tahun/bulan/wilayah/jenjang) pada fase ini adalah contoh interaksi UI; data grafik belum dinamis mengikuti filter.

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| Waktu Pusat mendapat laporan performa nasional | 3-5 hari (rekap manual) | Real-time (< 1 menit, saat login) | Observasi penggunaan dashboard | 1 bulan setelah rilis |
| % Super Admin/Admin Wilayah yang mengakses dashboard mingguan | 0% (belum ada fitur) | ≥ 80% | Log akses halaman | 2 bulan setelah rilis |
| Jumlah sekolah bottom-10 yang menerima pendampingan dalam 30 hari sejak teridentifikasi | [ ] | [ ] | Catatan tindak lanjut PWM/PDM | 3 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran | Organisasi | RACI | Kepentingan |
| --- | --- | --- | --- |
| Product Owner | Klien (Muhammadiyah Pusat) | A | Menyetujui scope KPI yang ditampilkan |
| Solution Architect | GeekGarden | R | Desain sumber data & agregasi KPI |
| Tech Lead | GeekGarden | R | Implementasi dashboard & performa query |
| QA Lead | GeekGarden | C | Validasi akurasi perhitungan KPI |
| Staff Keuangan Pusat | Klien | C | Validasi definisi collection rate & tunggakan |
| Pengurus PWM/PDM/PCM | Klien | I | Menerima insight untuk pendampingan sekolah |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Super Admin Pusat | Admin platform tingkat nasional, akses penuh | Memantau kesehatan pembayaran seluruh jaringan sekolah | Data performa tersebar, lambat direkap | Laptop/web |
| Admin Wilayah (PWM) | Mengelola sekolah di wilayahnya | Memantau sekolah di wilayahnya, menindaklanjuti yang bermasalah | Tidak punya visibilitas nasional untuk pembanding | Laptop/web |
| Staff Keuangan Pusat | Memantau performa pembayaran & data sekolah | Memastikan collection rate sesuai target | Rekonsiliasi manual antar sekolah | Laptop/web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| KPI ringkas nasional (total sekolah, siswa, tagihan, pembayaran, collection rate, tunggakan, transaksi, sekolah aktif) | Ekspor laporan (PDF/Excel) |
| Ranking collection rate per wilayah (PWM) dengan indikator warna | Drill-down transaksi per siswa/per sekolah dari dashboard |
| Tren transaksi nasional 7 bulan terakhir (grafik) | Filter grafik yang benar-benar dinamis mengubah data (saat ini statis/demo) |
| Top 10 & Bottom 10 sekolah berdasarkan collection rate | Notifikasi otomatis ke PWM/PDM untuk sekolah bottom-list |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- KPI nasional, ranking wilayah, Top/Bottom 10 sekolah.
- **Should have** -- Tren transaksi nasional dengan grafik.
- **Could have** -- Filter grafik yang benar-benar fungsional (tahun/bulan/wilayah/jenjang).
- **Won't have (now)** -- Ekspor laporan, drill-down transaksi detail.

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai Super Admin, saya ingin melihat KPI nasional (total sekolah, siswa, tagihan, pembayaran, collection rate, tunggakan) saat login, supaya saya tahu kesehatan platform secara cepat. | Must | Given Super Admin login, When membuka Dashboard Konsolidasi, Then 8 kartu KPI tampil dengan nilai bulan berjalan tanpa perlu refresh manual |
| US-02 | Sebagai Admin Wilayah, saya ingin melihat ranking collection rate per wilayah, supaya saya tahu posisi wilayah saya dibanding wilayah lain. | Must | Given data wilayah tersedia, When membuka panel "Collection Rate per Wilayah", Then daftar wilayah terurut dari rate tertinggi ke terendah dengan indikator warna (hijau ≥85%, kuning 70-84%, merah <70%) |
| US-03 | Sebagai Super Admin, saya ingin melihat daftar 10 sekolah dengan collection rate terendah, supaya saya bisa menugaskan PWM/PDM untuk pendampingan. | Must | Given data performa sekolah tersedia, When membuka panel "Bottom 10 Sekolah", Then tabel menampilkan 10 sekolah terurut dari collection rate terendah beserta jumlah siswa, tagihan, dan terbayar |
| US-04 | Sebagai Super Admin, saya ingin melihat tren jumlah transaksi nasional 7 bulan terakhir, supaya saya bisa menilai arah pertumbuhan/penurunan transaksi. | Should | Given data transaksi bulanan tersedia, When membuka panel "Trend Transaksi Nasional", Then grafik garis menampilkan jumlah transaksi per bulan selama 7 bulan terakhir |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | KPI Nasional | Sistem harus menampilkan 8 kartu KPI: Total Sekolah, Total Siswa Aktif, Total Tagihan, Total Pembayaran, Collection Rate, Tunggakan, Transaksi, Sekolah Aktif, seluruhnya dihitung untuk bulan berjalan | US-01 | Must | Collection Rate = Total Pembayaran / Total Tagihan; Tunggakan = Total Tagihan - Total Pembayaran |
| FR-02 | Ranking Wilayah | Sistem harus menampilkan daftar PWM terurut descending berdasarkan collection rate, dengan bar visual dan kode warna ambang (≥85% hijau, 70-84% kuning, <70% merah) | US-02 | Must | Ambang warna mengikuti legend: baik / perlu dipantau / perlu tindak lanjut |
| FR-03 | Tren Transaksi | Sistem harus menampilkan grafik garis jumlah transaksi nasional untuk 7 bulan terakhir, dengan filter tahun, bulan, wilayah, dan jenjang | US-04 | Should | Pada fase awal filter boleh bersifat kosmetik (UI saja); versi produksi filter wajib memengaruhi data grafik |
| FR-04 | Ranking Sekolah | Sistem harus menampilkan Top 10 dan Bottom 10 sekolah berdasarkan collection rate (bukan nominal pembayaran), masing-masing menampilkan rank, nama sekolah, jenjang & wilayah, jumlah siswa, total tagihan, total terbayar, dan collection rate | US-03 | Must | Pengurutan wajib berbasis collection rate agar sekolah kecil dengan pengelolaan baik tetap dinilai adil dibanding sekolah besar |
| FR-05 | Hak Akses Halaman | Sistem harus membatasi akses Dashboard Konsolidasi berdasarkan permission role `dashboard-konsolidasi`; role tanpa izin diarahkan ke halaman default role tersebut | US-01 | Must | Mengikuti matriks Role & Hak Akses (lihat PRD Role & Hak Akses) |

### 6.1 Hak Akses per Peran

| Fitur | Super Admin | Admin Wilayah | Staff Keuangan Pusat | Viewer |
| --- | --- | --- | --- | --- |
| Lihat KPI nasional | Read | Read | Read | Read |
| Lihat ranking wilayah & sekolah | Read | Read | Read | Read |
| Ubah filter tren transaksi | Ya | Ya | Ya | Ya |
| Ekspor laporan | -- (belum ada) | -- | -- | -- |

### 6.2 Notifikasi

Tidak ada notifikasi otomatis pada fase ini; dashboard bersifat pull (pengguna membuka halaman untuk melihat data), bukan push.

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Performa | Waktu muat seluruh KPI & grafik dashboard | p95 < 2 detik untuk ≤ 1.500 sekolah |
| NFR-02 | Skalabilitas | Jumlah sekolah yang didukung tanpa degradasi tampilan | ≥ 5.000 sekolah terdaftar |
| NFR-03 | Ketersediaan | Uptime halaman dashboard | 99,5% per bulan |
| NFR-04 | Keamanan | Data KPI hanya dapat diakses role dengan permission `dashboard-konsolidasi` | Enforced di server-side, tidak hanya UI |
| NFR-05 | Akurasi data | Konsistensi angka antar KPI (Top/Bottom list, ranking wilayah, KPI agregat) | Selisih 0% antar sumber data yang sama dalam satu snapshot |
| NFR-06 | Usability | Pengguna baru dapat memahami status kesehatan platform tanpa panduan | < 1 menit untuk mengidentifikasi wilayah/sekolah bermasalah |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login → (role memiliki akses) → Dashboard Konsolidasi tampil otomatis sebagai halaman pertama bagi role dengan prioritas akses tertinggi ke modul ini.
- Wireframe: mengikuti struktur `dashboard-konsolidasi.html` (kartu KPI, panel wilayah, grafik tren, tabel Top/Bottom 10).
- Edge case yang wajib ditangani: wilayah/sekolah tanpa data transaksi bulan berjalan, bulan pertama sekolah baru diaktifkan (belum ada histori 7 bulan untuk tren).

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Modul Transaksi/Payment (H2H BSI) | Sumber data tagihan & pembayaran untuk KPI | Internal data pipeline / API | [ ] | [ ] |
| Modul Manajemen Sekolah | Sumber data jumlah sekolah aktif & status | Internal (shared data store) | [ ] | [ ] |
| Modul Pendaftaran Sekolah | Sumber data total sekolah terdaftar | Internal (shared data store) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: Sekolah, Siswa, Tagihan, Pembayaran, Wilayah (PWM/PDM/PCM), Transaksi.
- Agregasi yang dibutuhkan: total per bulan berjalan, per wilayah, per sekolah; histori 7 bulan untuk tren.
- Retensi data: data transaksi & agregat historis disimpan sesuai kebijakan retensi platform (lihat PRD terkait keuangan/audit).
- Laporan yang dibutuhkan ke depan: ekspor KPI nasional & ranking sekolah per periode (out of scope fase ini).

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Data transaksi dan tagihan dari seluruh sekolah sudah tersinkronisasi secara near-real-time ke data store yang dipakai dashboard.
- Definisi "bulan berjalan" dan "collection rate" sudah disepakati seragam oleh seluruh wilayah.

**Batasan:**

- Dashboard ini hanya menampilkan agregat; tidak menggantikan laporan keuangan resmi/audit.

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Apakah filter tren transaksi (tahun/bulan/wilayah/jenjang) wajib fungsional penuh di rilis pertama, atau boleh menyusul? | PO klien | [DD-MM-YYYY] | [ ] |
| 2 | Apakah dibutuhkan ekspor laporan (PDF/Excel) dari dashboard ini pada rilis pertama? | PO klien | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Data agregat tidak konsisten antar sumber (KPI vs tabel ranking) | H | M | Satu sumber kebenaran (single source of truth) untuk perhitungan collection rate, divalidasi QA sebelum rilis | [ ] |
| Volume sekolah besar (>5.000) membuat query agregat lambat | M | M | Precompute/cache KPI harian, bukan query real-time penuh | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain data pipeline KPI | Arsitektur agregasi | [ ] | Review SA |
| Development | KPI + ranking + grafik | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| Collection Rate | Persentase total pembayaran terhadap total tagihan pada periode tertentu |
| PWM / PDM / PCM | Pimpinan Wilayah / Daerah / Cabang Muhammadiyah -- struktur organisasi yang menaungi sekolah |
| H2H | Host-to-Host, integrasi langsung dengan sistem bank mitra |

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

- [x] Problem statement didukung konteks penggunaan (asumsi perlu divalidasi dengan data riil klien)
- [x] Setiap tujuan punya KPI dengan baseline dan target
- [x] Out of scope ditulis eksplisit
- [x] Setiap user story punya acceptance criteria Given-When-Then
- [x] NFR ditulis dengan angka terukur
- [ ] Semua integrasi punya PIC dan status (menunggu konfirmasi PIC)
- [ ] Pertanyaan terbuka punya batas waktu jawab (menunggu tanggal dari PO)
- [x] PRD tidak membahas detail teknis implementasi
