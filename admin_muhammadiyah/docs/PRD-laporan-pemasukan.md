# PRD: Laporan Pemasukan

## 1. Informasi Dokumen

| Atribut | Isi |
| --- | --- |
| Nama produk / fitur | Laporan Pemasukan (Laporan Konsolidasi Admin Pusat) |
| Klien / proyek | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen | v0.3 |
| Status | Draft |
| Penulis | Tim Produk GeekGarden |
| Product Owner | [Nama PO Klien] |
| Solution Architect | [Nama SA] |
| Tanggal dibuat | 08-11-2026 |
| Target rilis | [DD-MM-YYYY / Sprint X] |
| Dokumen terkait | `laporan-pemasukan.html`, `pengguna.html`, `app.js`, PRD Laporan Pindah Sekolah & Tunggakan, PRD Dashboard Konsolidasi, PRD Pengguna, PRD Manajemen Sekolah, Aplikasi Wali Murid (paymentHistory), Portal Sekolah (paymentData) |

### Riwayat Revisi

| Versi | Tanggal | Penulis | Perubahan |
| --- | --- | --- | --- |
| v0.1 | 08-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `laporan-pemasukan.html`, bagian dari sidebar "Laporan" di Admin Pusat. |
| v0.2 | 08-11-2026 | Tim Produk GeekGarden | Sinkronisasi dengan prototipe terkini: (1) tambah fitur **Ekspor Laporan** (tombol "⬇ Export Excel") yang mengunduh file CSV asli berisi ringkasan per sekolah + detail Transaksi Berhasil + detail Invoice Belum Terbayar, menghormati filter aktif -- lihat FR-08; (2) kolom **Metode** pada baris Invoice Belum Terbayar kini menampilkan "-" khusus untuk status `belum_terbayar` (karena belum ada upaya pembayaran sehingga metode belum relevan), sedangkan status `failed` tetap menampilkan metode yang sungguh dicoba -- lihat FR-05. |
| v0.3 | 08-11-2026 | Tim Produk GeekGarden | Sinkronisasi dengan perubahan RBAC terkini (lihat PRD Pengguna): (1) role **"Admin Wilayah (PWM)"** digeneralisasi menjadi role tunggal **"Admin"**, dengan cakupan data (Pusat/Wilayah/Daerah/Cabang) ditentukan per pengguna lewat field **Cakupan** di menu Pengguna, bukan lagi melekat pada nama role; (2) role **"Staff Keuangan Pusat"** berganti nama menjadi **"Staff Keuangan"** (cakupannya juga mengikuti field Cakupan, tidak lagi selalu Pusat secara implisit); (3) role **"Viewer"** dihapus dari platform; (4) tambah kebutuhan fungsional baru **FR-09**: data yang ditampilkan di Laporan Pemasukan (stat row, tabel, panel detail, dan ekspor CSV) harus dibatasi sesuai Cakupan pengguna yang login -- cakupan Pusat melihat seluruh sekolah, cakupan Wilayah hanya sekolah di PWM-nya, cakupan Daerah hanya sekolah di PDM-nya, dan cakupan Cabang hanya sekolah di PCM-nya. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Fitur Laporan Pemasukan menyediakan rekap pemasukan pembayaran per sekolah bagi Admin Pusat, diturunkan dari transaksi yang tercatat lewat aplikasi Wali Murid (QRIS, VA BSI, Transfer Manual) dan Portal Sekolah. Fitur ini juga menyediakan drill-down ke level transaksi per siswa untuk kebutuhan rekonsiliasi & audit, tanpa perlu membuka aplikasi Wali Murid atau Portal Sekolah satu per satu.

### 2.2 Problem Statement

**Staff Keuangan / Super Admin** mengalami **kesulitan memantau pemasukan pembayaran SPP secara nasional** saat **data transaksi tersebar di masing-masing aplikasi Wali Murid & Portal Sekolah tiap sekolah**, yang menyebabkan **lambatnya deteksi invoice yang belum terbayar/gagal dan kurangnya visibilitas pemasukan lintas sekolah untuk kebutuhan rekonsiliasi & pelaporan ke pimpinan**.

### 2.3 Kondisi Saat Ini (As-Is)

Setiap sekolah mencatat transaksinya sendiri lewat aplikasi Wali Murid/Portal Sekolah. Admin Pusat tidak memiliki rekap gabungan dan harus menghubungi/menarik data tiap sekolah secara manual untuk mengetahui total pemasukan dan invoice yang belum terbayar.

### 2.4 Kondisi yang Diharapkan (To-Be)

Super Admin/Staff Keuangan dapat membuka menu "Laporan Pemasukan" dan langsung melihat ringkasan pemasukan seluruh sekolah, memfilter per sekolah dan status sekolah, lalu membuka detail transaksi (Berhasil & Belum Terbayar/Failed) per sekolah tanpa perlu menghubungi sekolah satu per satu.

### 2.5 Kenapa Sekarang?

Dengan makin banyak sekolah yang onboarding dan aktif bertransaksi (lihat PRD Manajemen Sekolah & PRD Pendaftaran Sekolah), Staff Keuangan membutuhkan satu titik pemantauan pemasukan untuk menjamin fee tertagih dan invoice bermasalah terdeteksi tepat waktu.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memberi visibilitas terpusat atas pemasukan pembayaran SPP seluruh sekolah dalam platform.
2. Mempercepat deteksi invoice belum terbayar/gagal supaya bisa ditindaklanjuti sebelum menumpuk.
3. Mendukung rekonsiliasi & pelaporan keuangan ke pimpinan Muhammadiyah Pusat/PWM dengan data yang konsisten terhadap aplikasi Wali Murid & Portal Sekolah.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak menyediakan aksi create/update/delete transaksi dari halaman ini -- seluruh role hanya memiliki hak Read (lihat 6.1).
- Tidak mendukung ekspor ke format `.xlsx`/`.pdf` asli (styling/formatting Excel, sheet terpisah, grafik, dsb.) -- ekspor yang tersedia berupa file CSV polos (lihat FR-08).
- Tidak menangani aksi tindak lanjut penagihan (reminder, dsb) dari halaman ini.
- Tidak merinci kasus pindah sekolah/write-off tunggakan secara mendalam -- itu domain **Laporan Pindah Sekolah & Tunggakan**.

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| Waktu rata-rata Admin Pusat mengetahui total pemasukan seluruh sekolah | [ ] (manual, hubungi tiap sekolah) | < 5 menit (self-service) | Timestamp akses halaman vs waktu proses manual sebelumnya | 1 bulan setelah rilis |
| % invoice belum terbayar/gagal yang terdeteksi dalam 24 jam sejak status muncul | [ ] | 90% | Selisih waktu status muncul vs waktu dibuka/ditinjau di laporan | 2 bulan setelah rilis |
| Selisih nominal Total Pemasukan antara laporan ini dan rekonsiliasi manual keuangan pusat | [ ] | 0% selisih | Audit bulanan | 3 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran | Organisasi | RACI | Kepentingan |
| --- | --- | --- | --- |
| Product Owner | Klien (Muhammadiyah Pusat) | A | Menyetujui definisi "pemasukan" dan kebijakan status transaksi |
| Solution Architect | GeekGarden | R | Desain integrasi data dengan aplikasi Wali Murid & Portal Sekolah |
| Tech Lead | GeekGarden | R | Implementasi agregasi & tampilan laporan |
| QA Lead | GeekGarden | C | Strategi pengujian konsistensi nominal lintas sekolah |
| Super Admin | Klien | R | Pengguna utama fitur ini |
| Staff Keuangan | Klien | R | Pemantau pemasukan & rekonsiliasi dana |
| Admin (cakupan Wilayah/Daerah/Cabang) | Klien | C/R | Memantau pemasukan sekolah dalam cakupannya saja |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Super Admin Pusat | Mengawasi seluruh operasional platform | Memantau pemasukan nasional per sekolah | Tidak ada rekap terpusat sebelumnya | Laptop/web |
| Staff Keuangan | Fokus pada pemasukan & tunggakan invoice | Mendeteksi invoice belum terbayar/gagal sedini mungkin & merekonsiliasi dana | Data tersebar per aplikasi Wali Murid/Portal Sekolah | Laptop/web |
| Admin (cakupan Wilayah/Daerah/Cabang) | Mengelola sekolah dalam satu Wilayah (PWM)/Daerah (PDM)/Cabang (PCM) sesuai Cakupan yang diset di menu Pengguna | Mengetahui performa pemasukan sekolah dalam cakupannya, tanpa terdistraksi data sekolah lain | Sebelumnya tidak ada pembatasan data otomatis -- harus memilah manual mana sekolah yang relevan | Laptop/web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Statistik ringkasan (Total Pemasukan, Transaksi Berhasil, Total Invoice Belum Terbayar, Pemasukan Tertinggi), reaktif terhadap filter aktif | Ekspor ke format `.xlsx`/`.pdf` asli (styling/formatting Excel, sheet terpisah, grafik, dsb.) |
| Tabel rekap pemasukan per sekolah (siswa aktif, transaksi berhasil, total pemasukan, invoice belum terbayar, metode terbanyak) | Filter periode/rentang tanggal transaksi |
| Filter Sekolah dan Status Sekolah (Aktif/Nonaktif/Draft) | Aksi tindak lanjut penagihan (kirim reminder, tandai ditindaklanjuti) untuk invoice belum terbayar |
| Detail transaksi per sekolah: tabel Transaksi Berhasil & tabel Invoice Belum Terbayar (termasuk Failed dengan catatan bank, dan Metode "-" untuk status Belum Terbayar) | Create/Update/Delete transaksi dari Admin Pusat |
| Definisi & nomenklatur status transaksi yang konsisten dengan aplikasi Wali Murid & Portal Sekolah | Rekap mendalam kasus pindah sekolah/write-off (domain Laporan Pindah Sekolah & Tunggakan) |
| Ekspor laporan ke CSV (3 bagian: ringkasan per sekolah, detail Transaksi Berhasil, detail Invoice Belum Terbayar), menghormati filter Sekolah/Status Sekolah aktif | Penjadwalan ekspor otomatis (terkirim ke email secara berkala) |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Stat row ringkasan, tabel rekap per sekolah, filter Sekolah & Status Sekolah, detail Transaksi Berhasil, definisi status transaksi yang konsisten lintas aplikasi.
- **Should have** -- Detail Invoice Belum Terbayar/Failed dengan catatan bank, badge status siswa "Pindah Sekolah" pada tabel detail, ekspor laporan ke CSV yang menghormati filter aktif.
- **Could have** -- Filter periode/rentang tanggal.
- **Won't have (now)** -- Aksi tindak lanjut penagihan dari halaman ini, create/update/delete transaksi, approve/reject apa pun.

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai Staff Keuangan, saya ingin melihat ringkasan pemasukan seluruh sekolah dalam beberapa kartu statistik, supaya saya cepat menilai performa pemasukan secara nasional. | Must | Given saya membuka Laporan Pemasukan, When halaman dimuat, Then 4 kartu statistik (Total Pemasukan, Transaksi Berhasil, Total Invoice Belum Terbayar, Pemasukan Tertinggi) tampil dihitung dari seluruh sekolah |
| US-02 | Sebagai Super Admin, saya ingin memfilter rekap pemasukan berdasarkan sekolah dan status sekolah, supaya saya bisa fokus pada sekolah tertentu. | Must | Given saya memilih nilai pada filter Sekolah dan/atau Status Sekolah, When filter diterapkan, Then stat row dan tabel hanya menghitung sekolah yang cocok dengan kombinasi filter (AND) |
| US-03 | Sebagai Staff Keuangan, saya ingin melihat rincian transaksi berhasil per siswa pada satu sekolah, supaya saya bisa merekonsiliasi pemasukan dengan data aplikasi Wali Murid. | Must | Given saya menekan "Lihat Detail" pada satu sekolah, When panel detail terbuka, Then tabel Transaksi Berhasil menampilkan tanggal pembayaran, siswa, status siswa, jenis tagihan, metode, nominal, dan no. kuitansi untuk setiap transaksi berstatus success |
| US-04 | Sebagai Staff Keuangan, saya ingin melihat daftar invoice belum terbayar/gagal beserta alasannya, supaya saya bisa menindaklanjuti penagihan di luar sistem. | Must | Given panel detail terbuka, When saya melihat bagian Invoice Belum Terbayar, Then setiap baris menampilkan status (Belum Terbayar/Failed) dan catatan bank bila berstatus Failed |
| US-05 | Sebagai Admin, saya ingin status "Belum Terbayar" dan "Failed" dibedakan jelas, supaya saya tidak salah menyimpulkan wali murid belum berusaha membayar padahal transaksinya gagal dari sisi bank. | Should | Given terdapat invoice berstatus Failed, When ditampilkan di tabel, Then badge "Failed" beserta catatan bank (sumber callback BSI H2H) ditampilkan terpisah dari badge "Belum Terbayar"; And untuk baris berstatus Belum Terbayar, kolom Metode menampilkan "-" karena belum ada metode yang benar-benar dicoba |
| US-07 | Sebagai Admin dengan Cakupan Wilayah/Daerah/Cabang, saya hanya ingin melihat data pemasukan sekolah dalam cakupan saya, supaya saya tidak melihat data sekolah yang bukan tanggung jawab saya. | Must | Given saya login sebagai pengguna dengan Cakupan level Wilayah (PWM tertentu)/Daerah (PDM tertentu)/Cabang (PCM tertentu), When saya membuka Laporan Pemasukan, Then stat row, tabel, panel detail, dan ekspor CSV hanya menghitung sekolah yang Wilayah/Daerah/Cabang-nya cocok dengan Cakupan saya; And pengguna dengan Cakupan level Pusat (termasuk Super Admin) tetap melihat seluruh sekolah tanpa pembatasan |
| US-06 | Sebagai Staff Keuangan, saya ingin mengekspor rekap pemasukan yang sedang ditampilkan ke file yang bisa dibuka Excel, supaya saya bisa melampirkannya ke laporan rapat keuangan tanpa menyalin data secara manual. | Should | Given saya menekan tombol "⬇ Export Excel" pada tabel Pemasukan per Sekolah, When proses ekspor berjalan, Then sebuah file CSV asli (bukan HTML yang disamarkan jadi `.xls`) terunduh berisi 3 bagian -- ringkasan per sekolah, detail Transaksi Berhasil, dan detail Invoice Belum Terbayar -- sesuai filter Sekolah/Status Sekolah yang sedang aktif; And jika tidak ada sekolah yang cocok dengan filter, sistem menampilkan toast "Tidak ada data untuk diexport" tanpa mengunduh file apa pun |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Stat Row Ringkasan | Sistem harus menampilkan 4 kartu statistik: Total Pemasukan, Transaksi Berhasil, Total Invoice Belum Terbayar, Pemasukan Tertinggi, dihitung dari sekolah yang lolos filter aktif | US-01, US-02 | Must | Hanya transaksi berstatus `success` yang dihitung sebagai pemasukan; Pemasukan Tertinggi menampilkan nama sekolah dengan total pemasukan terbesar di antara hasil filter |
| FR-02 | Filter Sekolah & Status | Sistem harus menyediakan dropdown filter Nama Sekolah (opsi "Semua Sekolah") dan Status Sekolah (Aktif/Nonaktif/Draft, opsi "Semua Status Sekolah") | US-02 | Must | Kombinasi filter bersifat AND; mengubah salah satu filter memicu re-render stat row dan tabel tanpa reload halaman |
| FR-03 | Tabel Pemasukan per Sekolah | Sistem harus menampilkan tabel dengan kolom Nama Sekolah (+catatan khusus bila ada), Status, Siswa Aktif, Transaksi Berhasil, Total Pemasukan, Invoice Belum Terbayar (jumlah+nominal), Metode Terbanyak, Aksi | US-01, US-02 | Must | Sekolah tanpa transaksi menampilkan teks "Tidak ada transaksi" pada kolom Aksi (bukan tombol); filter tanpa hasil menampilkan pesan "Tidak ada sekolah yang cocok dengan filter." |
| FR-04 | Detail Transaksi Berhasil | Sistem harus menyediakan tombol "Lihat Detail" yang membuka panel berisi tabel transaksi `success`: tanggal pembayaran, siswa, status siswa, jenis tagihan, metode, nominal, no. kuitansi | US-03 | Must | Panel menampilkan ringkasan teks (jumlah transaksi, jumlah berhasil & totalnya, jumlah belum terbayar & totalnya) sebelum tabel; panel otomatis scroll ke tengah layar saat dibuka |
| FR-05 | Detail Invoice Belum Terbayar | Panel yang sama harus menampilkan tabel invoice berstatus `belum_terbayar`/`failed`: tanggal jatuh tempo, siswa, status siswa, jenis tagihan, metode, nominal, status (+catatan bank bila `failed`) | US-04, US-05 | Must | "Belum Terbayar" = belum ada upaya pembayaran sama sekali; "Failed" = sudah ada upaya pembayaran namun gagal di sisi bank, diketahui lewat callback BSI H2H, bukan dari aksi wali murid di aplikasi. Kolom **Metode** pada baris berstatus `belum_terbayar` ditampilkan "-" karena belum ada metode yang benar-benar dicoba; baris berstatus `failed` tetap menampilkan metode aslinya karena upaya pembayaran sudah terjadi (hanya gagal di bank) |
| FR-06 | Badge Status Siswa | Siswa berstatus `pindah_sekolah` harus ditandai badge "Pindah Sekolah" pada tabel detail transaksi, berbeda dari badge "Aktif" | US-05 | Should | Konsisten dengan status siswa yang dipakai di PRD Laporan Pindah Sekolah & Tunggakan |
| FR-07 | Konsistensi Nomenklatur Status Transaksi | Field dan status transaksi (`success`/`belum_terbayar`/`failed`) harus konsisten dengan field `paymentHistory` di aplikasi Wali Murid dan `paymentData` di Portal Sekolah | US-01..05 | Must | Mencegah ambiguitas saat rekonsiliasi lintas aplikasi; perubahan nomenklatur di salah satu aplikasi wajib disinkronkan ke laporan ini |
| FR-08 | Ekspor Laporan (CSV) | Sistem harus menyediakan tombol "⬇ Export Excel" yang mengunduh file CSV asli (bukan trik HTML-table-disamarkan-jadi-`.xls`) berisi 3 bagian berurutan: ringkasan Pemasukan per Sekolah, detail Transaksi Berhasil, dan detail Invoice Belum Terbayar | US-06 | Should | Data yang diekspor mengikuti filter Sekolah/Status Sekolah yang sedang aktif; kolom nominal diekspor sebagai angka mentah (bukan string "Rp...") agar tetap numerik di Excel; nama file mengikuti pola `laporan-pemasukan-YYYY-MM-DD.csv`; jika hasil filter kosong, ekspor dibatalkan dan sistem menampilkan toast "Tidak ada data untuk diexport" |
| FR-09 | Pembatasan Data Berdasarkan Cakupan Pengguna | Sistem harus membatasi sekolah yang dihitung/ditampilkan di stat row, tabel, panel detail, dan ekspor CSV sesuai field **Cakupan** milik pengguna yang login (diatur di menu Pengguna, lihat PRD Pengguna): Cakupan `Pusat` → seluruh sekolah; `Wilayah` → hanya sekolah dengan Wilayah (PWM) yang sama dengan `cakupan.pwm`; `Daerah` → hanya sekolah dengan Daerah (PDM) yang sama dengan `cakupan.pdm`; `Cabang` → hanya sekolah dengan Cabang (PCM) yang sama dengan `cakupan.pcm` | US-07 | Must | Pembatasan ini berlaku **di atas** filter Sekolah/Status Sekolah yang dipilih manual (bukan menggantikannya) -- pengguna tidak bisa memilih sekolah di luar cakupannya sekalipun lewat dropdown filter Sekolah. Berlaku untuk seluruh role yang punya hak Read ke modul ini (Super Admin, Admin, Staff Keuangan), bukan hanya role tertentu -- karena Cakupan adalah field per pengguna, bukan per role (lihat 6.1) |

### 6.1 Hak Akses per Peran

| Fitur | Super Admin | Admin | Staff Keuangan |
| --- | --- | --- | --- |
| Lihat Laporan Pemasukan | Read | Read | Read |
| Filter Sekolah & Status Sekolah | Read | Read | Read |
| Lihat detail transaksi per sekolah | Read | Read | Read |
| Create/Update/Delete transaksi dari halaman ini | -- | -- | -- |
| Pembatasan data sesuai Cakupan (Wilayah/Daerah/Cabang) | Tidak berlaku -- Super Admin selalu dianggap Cakupan `Pusat` | Berlaku sesuai Cakupan pengguna (Pusat/Wilayah/Daerah/Cabang) | Berlaku sesuai Cakupan pengguna (Pusat/Wilayah/Daerah/Cabang) |

*Catatan: seluruh role hanya memiliki hak Read pada modul `laporan-pemasukan` (lihat `rolesData` di `app.js`); tidak ada role yang memiliki hak Create/Update/Delete pada modul ini karena transaksi dicatat otomatis dari aplikasi Wali Murid & Portal Sekolah, bukan diinput manual di Admin Pusat. Role "Viewer" yang sebelumnya ada di platform telah dihapus (lihat Riwayat Revisi v0.3) -- tidak ada lagi role yang sama sekali tidak memiliki akses ke modul ini selain lewat status "Nonaktif" pada akun pengguna. Pembatasan Cakupan (baris terakhir) ditentukan oleh field **Cakupan** per pengguna di menu Pengguna, bukan oleh nama role -- dua pengguna dengan role "Admin" yang sama bisa memiliki Cakupan berbeda (mis. satu Wilayah Jawa Timur, satu Wilayah Jawa Barat) dan masing-masing hanya melihat sekolah di wilayahnya sendiri.*

### 6.2 Notifikasi

| Pemicu | Penerima | Kanal | Isi singkat |
| --- | --- | --- | --- |
| Invoice berubah status menjadi Failed (callback BSI H2H) | Staff Keuangan (disarankan) | Email/Dashboard (belum diimplementasi) | Pemberitahuan ada pembayaran gagal di sisi bank untuk siswa tertentu |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Konsistensi data | Nilai Total Pemasukan pada stat row dan tabel per sekolah harus selalu identik dengan hasil kalkulasi di panel detail untuk sekolah yang sama | 100% konsisten antar tampilan |
| NFR-02 | Performa | Waktu render tabel & penerapan filter | < 1 detik untuk ≤ 200 sekolah/≤ 5.000 transaksi |
| NFR-03 | Auditability | Nomor kuitansi (`RCPT-...`) pada setiap transaksi `success` harus unik dan dapat ditelusuri ke sumbernya (aplikasi Wali Murid/Portal Sekolah) | 100% transaksi success memiliki kuitansi tertelusuri |
| NFR-04 | Akses | Halaman hanya bisa diakses oleh role dengan hak Read pada modul `laporan-pemasukan` | 100% enforced via `enforcePageAccess`, baik di client maupun server |
| NFR-05 | Konsistensi ekspor | Nilai pada file CSV hasil ekspor (FR-08) harus identik dengan nilai yang ditampilkan di tabel/panel untuk filter yang sama pada saat ekspor ditekan | 100% konsisten antara tampilan dan file hasil ekspor |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login → Menu "Laporan" → "Laporan Pemasukan" → lihat statistik ringkasan & tabel per sekolah → filter Sekolah/Status Sekolah (opsional) → klik "Lihat Detail" pada satu sekolah → tinjau Transaksi Berhasil & Invoice Belum Terbayar → "Tutup Detail".
- Alur ekspor: pada tabel Pemasukan per Sekolah → klik "⬇ Export Excel" → file CSV (`laporan-pemasukan-YYYY-MM-DD.csv`) otomatis terunduh sesuai filter Sekolah/Status Sekolah yang sedang aktif → toast konfirmasi "✓ Laporan Pemasukan berhasil diexport" muncul.
- Wireframe: mengikuti struktur `laporan-pemasukan.html` -- 4 kartu statistik di atas, filter bar (berisi filter Sekolah, filter Status Sekolah, dan tombol "⬇ Export Excel") di atas tabel rekap per sekolah, dan panel detail dengan 2 sub-tabel (Transaksi Berhasil & Invoice Belum Terbayar) yang muncul di bawah tabel saat dibuka.
- Edge case yang wajib ditangani: sekolah tanpa transaksi sama sekali (kolom Aksi menampilkan teks, bukan tombol "Lihat Detail"), sekolah berstatus Nonaktif/Draft dengan catatan konteks (misal merger, onboarding pending), filter yang tidak menyisakan sekolah (tabel menampilkan pesan kosong, bukan tabel blank, dan tombol ekspor menampilkan toast peringatan tanpa mengunduh file), invoice Failed dengan catatan bank yang panjang, invoice Belum Terbayar yang kolom Metode-nya "-" (lihat FR-05), serta siswa berstatus `pindah_sekolah` yang masih punya transaksi/tunggakan tercatat di sekolah asal.

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Aplikasi Wali Murid (`paymentHistory`) | Sumber transaksi pembayaran (QRIS/VA BSI/Transfer Manual) beserta status success/belum_terbayar/failed | Internal (shared data store) | [ ] | [ ] |
| Portal Sekolah (`paymentData`) | Sumber transaksi yang dicatat/diinput di level sekolah | Internal (shared data store) | [ ] | [ ] |
| Callback BSI H2H | Sumber status `failed` pasca-upaya pembayaran gagal di sisi bank | Integrasi bank (host-to-host) | [ ] | [ ] |
| Modul Manajemen Sekolah | Konteks status sekolah (Aktif/Nonaktif/Draft) yang memengaruhi narasi di kolom catatan; juga sumber field Wilayah (PWM)/Daerah (PDM)/Cabang (PCM) per sekolah yang dibutuhkan FR-09 | Internal (shared data store) | [ ] | [ ] |
| Modul Pengguna (field Cakupan) | Sumber Cakupan (Pusat/Wilayah/Daerah/Cabang, beserta `pwm`/`pdm`/`pcm` terpilih) milik pengguna yang login -- menentukan pembatasan data laporan (FR-09) | Internal (shared data store) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: Sekolah (nama, status, siswaAktif, catatan), Transaksi (tanggal/jatuhTempo, siswa, statusSiswa, jenis tagihan, metode, nominal, status, kuitansi, catatanBank).
- Entitas Sekolah perlu ditambahkan field **Wilayah (PWM)**, **Daerah (PDM)**, **Cabang (PCM)** -- sudah ada di Manajemen Sekolah, namun **belum ada** di data demo `schoolsIncomeData` pada `laporan-pemasukan.html` saat ini (lihat Batasan). Field ini wajib ada agar FR-09 bisa mencocokkan sekolah dengan Cakupan pengguna yang login.
- Entitas Pengguna sudah memiliki field `cakupan` (`{ level, pwm, pdm, pcm }`) sejak `pengguna.html` -- field ini menjadi input utama FR-09, dibaca dari `currentUser.cakupan` saat laporan dimuat.
- Tidak ada migrasi khusus lain -- struktur data mengikuti `schoolsIncomeData` yang diselaraskan dengan `paymentHistory` (aplikasi Wali Murid) & `paymentData` (Portal Sekolah).
- Retensi data: transaksi & kuitansi disimpan selama histori keuangan sekolah terkait masih relevan untuk audit (rekomendasi minimal 5 tahun, perlu konfirmasi kebijakan retensi klien).
- Laporan yang dibutuhkan: rekap pemasukan per periode per sekolah, daftar invoice belum terbayar/failed lintas sekolah.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Status transaksi (`success`/`belum_terbayar`/`failed`) sudah final saat ditampilkan di laporan ini -- tidak ada status transisi tambahan pada fase ini.
- Satu transaksi hanya terkait satu siswa dan satu jenis tagihan (tidak ada transaksi gabungan beberapa tagihan dalam satu baris).

**Batasan:**

- Fase ini belum mendukung filter periode/rentang tanggal transaksi -- hanya filter Sekolah dan Status Sekolah.
- Data saat ini bersifat snapshot read-only (`schoolsIncomeData`), belum real-time via API produksi.
- Ekspor laporan (FR-08) berupa file CSV polos -- bukan file `.xlsx`/`.pdf` asli, sehingga belum mendukung styling/formatting Excel lanjutan (warna, sheet terpisah, grafik, dsb.).
- Data demo `schoolsIncomeData` pada prototipe ini **belum memiliki field Wilayah (PWM)/Daerah (PDM)/Cabang (PCM)** per sekolah, sehingga pembatasan Cakupan (FR-09) belum bisa diperagakan end-to-end di prototipe saat ini -- data sekolah perlu disesuaikan (disamakan dengan struktur di Manajemen Sekolah) sebelum FR-09 diimplementasikan.
- Pembatasan Cakupan (FR-09) didesain berlaku di sisi tampilan (client); keputusan apakah backend/API juga perlu memvalidasi ulang cakupan ada di Risiko (bagian 12).

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Apakah laporan ini perlu filter tambahan periode/rentang tanggal transaksi? | PO klien | [DD-MM-YYYY] | [ ] |
| 2 | Apakah dibutuhkan ekspor laporan (Excel/PDF) untuk kebutuhan rapat keuangan pusat? | PO klien | [DD-MM-YYYY] | Sebagian terjawab di v0.2: tersedia ekspor CSV (FR-08) yang bisa dibuka Excel/Google Sheets. Masih perlu konfirmasi apakah format `.xlsx`/`.pdf` asli (dengan styling) tetap dibutuhkan |
| 3 | Apakah diperlukan aksi tindak lanjut (kirim reminder) langsung dari invoice belum terbayar/failed di laporan ini? | PO klien | [DD-MM-YYYY] | [ ] |
| 4 | Apakah role Staff Keuangan juga bisa memiliki Cakupan selain Pusat (mis. Staff Keuangan Wilayah), atau role ini selalu dianggap Pusat secara kebijakan? | PO klien | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Data pemasukan di laporan pusat tidak sinkron dengan transaksi terbaru di aplikasi Wali Murid/Portal Sekolah (snapshot statis) | H | M | Integrasikan dengan API/shared database real-time sebelum go-live produksi | [ ] |
| Invoice berstatus Failed disalahartikan sebagai kelalaian wali murid, padahal gagal di sisi bank | M | M | Pastikan badge & catatan "Failed" selalu ditampilkan terpisah dari "Belum Terbayar" dengan penjelasan sumber (callback BSI H2H) | [ ] |
| Pembatasan Cakupan (FR-09) hanya diterapkan di sisi client (JS), sehingga pengguna dengan Cakupan Wilayah/Daerah/Cabang secara teknis masih bisa mengakses data di luar cakupannya lewat manipulasi request langsung ke backend/API | H | M | Validasi Cakupan wajib juga diterapkan di sisi API/backend sebelum data dikirim ke client, tidak hanya disembunyikan di UI | [ ] |
| Data sekolah di luar lingkup demo (non-Jawa Timur, dsb.) belum punya field Wilayah/Daerah/Cabang yang konsisten, sehingga Admin dengan Cakupan tertentu berisiko tidak melihat sekolah yang semestinya masuk cakupannya (false negative) | M | M | Audit kelengkapan field Wilayah/Daerah/Cabang pada seluruh data sekolah sebelum FR-09 dirilis ke produksi | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Mockup & struktur data final | [ ] | Review SA & klien |
| Development | Stat row, tabel rekap per sekolah, filter, panel detail transaksi | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| Pemasukan | Nominal transaksi berstatus `success` -- satu-satunya status yang dihitung sebagai pemasukan |
| Belum Terbayar | Invoice terbit, wali murid belum melakukan upaya pembayaran apa pun |
| Failed | Sudah ada upaya pembayaran namun gagal di sisi bank, diketahui lewat callback BSI H2H, bukan dari aksi wali murid di aplikasi |
| Callback BSI H2H | Mekanisme Host-to-Host dari Bank BSI yang melaporkan status akhir transaksi VA secara otomatis ke sistem |
| Kuitansi (RCPT-...) | Nomor bukti pembayaran yang diterbitkan untuk setiap transaksi berstatus `success` |
| Metode Terbanyak | Metode pembayaran dengan jumlah transaksi `success` terbanyak pada satu sekolah |
| Ekspor CSV | Comma-separated values -- format teks sederhana yang dibuka langsung oleh Excel/Google Sheets tanpa peringatan "format tidak cocok"; dipakai pada tombol "⬇ Export Excel" di laporan ini (bukan file `.xlsx` asli, dan bukan trik HTML-table-disamarkan-jadi-`.xls`) |
| Cakupan | Field pada data Pengguna (diatur di menu Pengguna) yang menentukan lingkup data yang bisa dilihat pengguna tersebut: `Pusat` (semua), `Wilayah` (satu PWM), `Daerah` (satu PDM), atau `Cabang` (satu PCM) -- independen dari nama role |
| PWM / PDM / PCM | Pimpinan Wilayah/Daerah/Cabang Muhammadiyah -- tingkat struktur organisasi (provinsi/kota-kabupaten/kecamatan) yang dipakai sebagai field Wilayah/Daerah/Cabang pada data sekolah maupun Cakupan pengguna |

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
