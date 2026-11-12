# PRD: Riwayat Pembayaran & Konfirmasi (Wali Murid)

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| Nama produk / fitur | Riwayat Pembayaran & Konfirmasi Pembayaran Saya (Aplikasi Wali Murid)     |
| Klien / proyek      | Aplikasi Wali Murid -- Platform Invoicing & Payment SPP (GeekGarden)     |
| Versi dokumen       | v0.1                                                                      |
| Status              | Draft                                                                     |
| Penulis             | Tim Produk GeekGarden                                                     |
| Product Owner       | [Nama PO Klien]                                                           |
| Solution Architect  | [Nama SA]                                                                 |
| Tanggal dibuat       | 08-11-2026                                                                |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                   |
| Dokumen terkait     | `riwayat.html`, `app.js`, `bayar.html`, `profil.html`, PRD Profil Wali Murid, PRD Laporan Pemasukan (Admin Pusat), Portal Sekolah (verifikasi Bendahara) |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                   |
| ----- | ---------- | --------------------- | -------------------------------------------- |
| v0.1  | 08-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `riwayat.html`, menu "Riwayat" pada bottom navigation aplikasi Wali Murid. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Halaman Riwayat menampilkan dua hal bagi Wali Murid: (1) **Riwayat Pembayaran** -- daftar seluruh transaksi pembayaran (QRIS/VA BSI/Transfer) yang pernah dilakukan untuk anak yang sedang aktif, lengkap dengan status & detail kuitansi; dan (2) **Riwayat Konfirmasi Pembayaran Saya** -- daftar konfirmasi transfer manual dan rencana pembayaran yang pernah dikirim ke Bendahara, beserta status tindak lanjutnya. Halaman ini juga berfungsi sebagai tujuan ikon lonceng (notifikasi) di seluruh aplikasi, karena bagian Konfirmasi berperan sebagai "kotak masuk" status tindak lanjut Bendahara bagi Wali Murid.

### 2.2 Problem Statement

**Wali Murid** mengalami **kesulitan melacak status pembayaran yang sudah dilakukan maupun konfirmasi yang sudah dikirim ke Bendahara** saat **tidak ada satu tempat yang merekap riwayat transaksi beserta status tindak lanjutnya**, yang menyebabkan **wali murid tidak tahu apakah transfer manual/rencana bayarnya sudah diverifikasi, dan harus menyimpan bukti pembayaran secara manual di luar aplikasi untuk keperluan audit/klarifikasi**.

### 2.3 Kondisi Saat Ini (As-Is)

Status pembayaran dan status verifikasi konfirmasi hanya diketahui lewat notifikasi WA/pemberitahuan sekolah atau dengan menghubungi Bendahara secara langsung. Tidak ada rekap mandiri yang bisa diakses Wali Murid kapan saja dari aplikasi.

### 2.4 Kondisi yang Diharapkan (To-Be)

Wali Murid dapat membuka menu "Riwayat" kapan saja untuk melihat seluruh riwayat pembayaran anak yang sedang aktif (berhasil/gagal/kedaluwarsa), membuka detail & kuitansi setiap transaksi, serta memantau status setiap konfirmasi transfer manual/rencana bayar yang pernah dikirim (Terjadwal/Menunggu Verifikasi/Terverifikasi/Ditolak) tanpa perlu menghubungi Bendahara.

### 2.5 Kenapa Sekarang?

Dengan makin banyak Wali Murid membayar lewat QRIS/VA BSI dan mengirim konfirmasi transfer manual dari halaman Bayar (lihat PRD terkait), dibutuhkan satu tempat transparan untuk melacak status tindak lanjutnya agar kepercayaan terhadap aplikasi tetap terjaga dan beban tanya-jawab ke Bendahara berkurang.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memberi Wali Murid visibilitas mandiri atas riwayat & status seluruh pembayaran anaknya tanpa perlu menghubungi sekolah/Bendahara.
2. Mengurangi volume pertanyaan "apakah transfer saya sudah diverifikasi?" ke Bendahara dengan menampilkan status konfirmasi secara transparan.
3. Menyediakan bukti pembayaran (kuitansi) yang bisa diakses ulang kapan saja untuk keperluan arsip pribadi Wali Murid.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak menyediakan aksi verifikasi/approve/reject konfirmasi dari halaman ini -- itu kewenangan Bendahara di Portal Sekolah.
- Tidak mendukung pembatalan/penarikan kembali konfirmasi yang sudah terkirim.
- Tidak menghasilkan file PDF kuitansi yang sesungguhnya pada fase prototipe ini (lihat FR-04 & catatan implementasi).
- Tidak menampilkan riwayat pembayaran anak lain selain anak yang sedang aktif dipilih (tidak ada tampilan gabungan lintas anak dalam satu daftar).

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| % Wali Murid yang membuka halaman Riwayat dalam 7 hari setelah melakukan pembayaran/konfirmasi | [ ] | &ge; 60% | Analitik kunjungan halaman vs event pembayaran/konfirmasi | 1 bulan setelah rilis |
| Jumlah pertanyaan "status pembayaran/verifikasi" yang masuk ke Bendahara per bulan | [ ] (manual, via WA/datang langsung) | Turun &ge; 40% | Perbandingan log pertanyaan sebelum vs sesudah rilis | 2 bulan setelah rilis |
| Selisih status yang ditampilkan di halaman ini dengan status riil di Portal Sekolah/Bendahara | [ ] | 0% selisih | Audit sampling bulanan | 2 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran          | Organisasi                 | RACI | Kepentingan                                                |
| --------------------- | --------------------------- | ---- | ----------------------------------------------------------- |
| Product Owner         | Klien (Muhammadiyah Pusat/Sekolah) | A | Menyetujui definisi status & kebijakan tampilan riwayat |
| Solution Architect    | GeekGarden                  | R    | Desain integrasi data dengan halaman Bayar & Portal Sekolah (Bendahara) |
| Tech Lead             | GeekGarden                  | R    | Implementasi halaman Riwayat & sinkronisasi status           |
| QA Lead               | GeekGarden                  | C    | Strategi pengujian konsistensi status lintas halaman         |
| Wali Murid (Orang Tua/Wali) | Klien (pengguna akhir) | R    | Pengguna utama fitur ini                                     |
| Bendahara             | Klien                        | I    | Pihak yang memverifikasi konfirmasi transfer manual/rencana bayar yang statusnya ditampilkan di halaman ini |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Wali Murid (Ayah/Ibu/Wali) | Orang tua/wali yang pernah membayar dan/atau mengirim konfirmasi transfer manual untuk anaknya | Memantau status pembayaran & konfirmasi, menyimpan bukti pembayaran | Tidak tahu status verifikasi tanpa menghubungi Bendahara; bukti pembayaran tercecer | Smartphone (aplikasi mobile web) |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Daftar Riwayat Pembayaran anak aktif dengan filter Semua/Berhasil/Gagal-Expired | Riwayat gabungan lintas semua anak dalam satu daftar |
| Detail transaksi per pembayaran (anak, tagihan, nominal, metode, provider, waktu, no. kuitansi) | Verifikasi/approve/reject konfirmasi dari halaman ini |
| Unduh/lihat kuitansi untuk transaksi berhasil | Pembatalan/penarikan kembali konfirmasi yang sudah terkirim |
| Daftar Riwayat Konfirmasi Pembayaran Saya (transfer manual & rencana bayar) beserta status tindak lanjut | Ekspor riwayat ke CSV/PDF oleh Wali Murid |
| Reaktif terhadap child-switch di header (riwayat & daftar konfirmasi ikut berganti sesuai anak aktif) | Notifikasi push/WA otomatis saat status konfirmasi berubah (saat ini hanya terlihat bila Wali Murid membuka halaman ini) |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Daftar Riwayat Pembayaran dengan filter status, detail transaksi per pembayaran, daftar Riwayat Konfirmasi Pembayaran Saya dengan status tindak lanjut, reaktif terhadap child-switch.
- **Should have** -- Unduh kuitansi untuk transaksi berhasil.
- **Could have** -- Pencarian/filter tambahan pada daftar konfirmasi (misal per metode/status).
- **Won't have (now)** -- Verifikasi/approve/reject dari halaman ini, pembatalan konfirmasi, ekspor riwayat, riwayat gabungan lintas anak.

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai Wali Murid, saya ingin melihat seluruh riwayat pembayaran anak yang sedang aktif, supaya saya tahu transaksi mana yang berhasil, gagal, atau kedaluwarsa. | Must | Given saya membuka menu Riwayat, When halaman dimuat, Then daftar transaksi `paymentHistory` milik anak aktif ditampilkan terbaru di atas, masing-masing dengan ikon status, nama tagihan, metode & tanggal, nominal, dan badge status |
| US-02 | Sebagai Wali Murid, saya ingin memfilter riwayat pembayaran berdasarkan status (Semua/Berhasil/Gagal-Expired), supaya saya bisa cepat menemukan transaksi yang bermasalah. | Must | Given saya menekan salah satu tab filter, When filter diterapkan, Then daftar hanya menampilkan transaksi yang cocok dengan filter tersebut untuk anak aktif |
| US-03 | Sebagai Wali Murid, saya ingin membuka detail satu transaksi, supaya saya bisa melihat nomor kuitansi, metode, provider, dan waktu pembayaran secara lengkap. | Must | Given saya menekan salah satu baris riwayat, When sheet detail terbuka, Then ditampilkan anak, tagihan, nominal, metode, provider, waktu, dan no. kuitansi (atau "--" bila tidak ada) sesuai status transaksi |
| US-04 | Sebagai Wali Murid dengan transaksi berhasil, saya ingin mengunduh kuitansi pembayaran, supaya saya punya bukti pembayaran untuk keperluan pribadi/sekolah. | Should | Given transaksi berstatus berhasil, When saya menekan "Unduh Kuitansi (PDF)" pada sheet detail, Then sistem menyediakan file kuitansi yang bisa disimpan Wali Murid |
| US-05 | Sebagai Wali Murid yang pernah mengirim konfirmasi transfer manual atau rencana bayar, saya ingin melihat status tindak lanjutnya, supaya saya tahu apakah sudah diverifikasi Bendahara atau masih menunggu. | Must | Given saya pernah mengirim konfirmasi (transfer manual/rencana bayar) untuk anak aktif, When saya membuka bagian "Riwayat Konfirmasi Pembayaran Saya", Then setiap konfirmasi ditampilkan dengan metode, detail (nominal+bank atau tanggal rencana), dan badge status (Terjadwal/Menunggu Verifikasi/Terverifikasi/Ditolak) |
| US-06 | Sebagai Wali Murid dengan lebih dari satu anak, saya ingin riwayat pembayaran & konfirmasi otomatis mengikuti anak yang saya pilih di header, supaya saya tidak salah melihat data anak lain. | Must | Given saya mengganti anak aktif lewat child-switch di header, When perpindahan selesai, Then daftar Riwayat Pembayaran dan Riwayat Konfirmasi Pembayaran Saya langsung memperbarui isinya sesuai anak yang baru dipilih |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Filter Riwayat Pembayaran | Sistem harus menyediakan 3 tab filter (Semua/Berhasil/Gagal-Expired) yang memfilter daftar `paymentHistory` milik anak aktif | US-02 | Must | Filter "Gagal/Expired" mencakup seluruh transaksi berstatus selain `success` (termasuk `expired` dan `failed`) |
| FR-02 | Daftar Riwayat Pembayaran | Sistem harus menampilkan setiap transaksi dengan ikon status (✓/✕), nama tagihan (`invoiceRef`), metode & tanggal transaksi, nominal, dan badge status (Berhasil/Kedaluwarsa/Gagal) | US-01 | Must | Daftar kosong menampilkan empty state "Belum ada riwayat" dengan ikon 🧾 |
| FR-03 | Detail Transaksi | Sistem harus menyediakan sheet detail saat satu baris riwayat ditekan, berisi ikon besar status, judul status, Anak, Tagihan, Nominal, Metode, Provider, Waktu, dan No. Kuitansi | US-03 | Must | No. Kuitansi menampilkan "--" apabila transaksi tidak berhasil (tidak memiliki nomor kuitansi) |
| FR-04 | Unduh Kuitansi | Sheet detail transaksi berhasil harus menampilkan tombol "⬇ Unduh Kuitansi (PDF)" | US-04 | Should | **Catatan implementasi saat ini**: tombol pada prototipe hanya menampilkan toast "✓ Kuitansi diunduh" tanpa menghasilkan file PDF sesungguhnya -- lihat 11. Pertanyaan Terbuka No. 1 |
| FR-05 | Daftar Riwayat Konfirmasi Pembayaran Saya | Sistem harus menampilkan daftar `pengajuanData` milik anak aktif, dengan ikon berbeda untuk jenis "Rencana Bayar" (🗓️) dan "Transfer Manual" (💵), subjudul sesuai jenis (tanggal rencana atau nominal+bank), dan badge status | US-05 | Must | Daftar kosong menampilkan empty state "Belum ada konfirmasi" yang mengarahkan ke menu Bayar |
| FR-06 | Badge Status Konfirmasi | Status konfirmasi harus ditampilkan sebagai salah satu dari: Terjadwal (biru), Menunggu Verifikasi (kuning), Terverifikasi (hijau), Ditolak (merah) | US-05 | Must | Konsisten dengan status yang dipakai di sisi Bendahara/Portal Sekolah untuk konfirmasi pembayaran |
| FR-07 | Reaktivitas terhadap Child-Switch | Kedua daftar (Riwayat Pembayaran & Riwayat Konfirmasi) harus otomatis dimuat ulang saat anak aktif berganti lewat header | US-06 | Must | Dipicu oleh `selectChild()` yang memanggil `renderRiwayat()` dan `renderPengajuanList()` |
| FR-08 | Akses dari Ikon Notifikasi | Ikon lonceng (🔔) pada header seluruh halaman aplikasi harus mengarah ke halaman Riwayat, karena bagian Konfirmasi berfungsi sebagai kotak masuk status tindak lanjut bagi Wali Murid | -- | Should | Badge jumlah pada ikon lonceng dihitung dari jumlah konfirmasi berstatus "Menunggu Verifikasi" milik anak aktif (`updateBellBadge()`); lihat 11. Pertanyaan Terbuka No. 2 terkait halaman `notifikasi.html` yang terpisah |

### 6.1 Hak Akses per Peran

| Fitur | Wali Murid (akun aktif) | Wali Murid (menunggu approval / ditolak) |
| --- | --- | --- |
| Lihat Riwayat Pembayaran | Ya | -- (tidak bisa masuk ke aplikasi) |
| Lihat detail transaksi & unduh kuitansi | Ya | -- |
| Lihat Riwayat Konfirmasi Pembayaran Saya | Ya | -- |
| Verifikasi/approve/reject konfirmasi | -- | -- |

*Catatan: verifikasi konfirmasi tidak tersedia di modul ini pada peran apa pun -- tetap dilakukan Bendahara di Portal Sekolah. Akses ke halaman ini ditentukan oleh `requireLogin()`, sama seperti seluruh halaman lain pada aplikasi ini.*

### 6.2 Notifikasi

| Pemicu | Penerima | Kanal | Isi singkat |
| --- | --- | --- | --- |
| Konfirmasi transfer manual/rencana bayar terverifikasi atau ditolak Bendahara | Wali Murid (pengirim) | In-app (hanya terlihat saat membuka halaman Riwayat; belum ada push/WA otomatis) | Perubahan badge status pada daftar Riwayat Konfirmasi Pembayaran Saya |
| Kuitansi diunduh | Wali Murid (pengirim) | In-app toast | "✓ Kuitansi diunduh" |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Konsistensi data | Status & nominal pada Riwayat Pembayaran harus identik dengan data yang dicatat saat transaksi terjadi di halaman Bayar | 100% konsisten antar tampilan |
| NFR-02 | Konsistensi status | Badge status konfirmasi pada halaman ini harus identik dengan status yang diputuskan Bendahara di Portal Sekolah | 100% konsisten antar tampilan |
| NFR-03 | Keamanan sesi | Halaman Riwayat hanya dapat diakses oleh Wali Murid dengan sesi login aktif | 100% enforced via `requireLogin()` di setiap pemuatan halaman |
| NFR-04 | Performa | Waktu render daftar Riwayat Pembayaran & Riwayat Konfirmasi saat halaman dimuat atau filter/anak aktif berganti | &lt; 1 detik untuk &le; 200 transaksi per anak |
| NFR-05 | Privasi data | Riwayat yang ditampilkan hanya milik anak-anak yang terdaftar pada akun Wali Murid yang sedang login | 100% terfilter per `childId` milik akun yang sedang login |

---

## 8. Alur Pengguna & Desain

- Alur utama (riwayat pembayaran): Login &rarr; buka menu "Riwayat" lewat bottom navigation (atau ikon 🔔 di header manapun) &rarr; pilih tab filter (opsional) &rarr; tekan salah satu baris transaksi &rarr; tinjau detail pada sheet &rarr; (jika berhasil) "⬇ Unduh Kuitansi (PDF)" &rarr; "Tutup".
- Alur sekunder (riwayat konfirmasi): pada halaman Riwayat, scroll ke bagian "Riwayat Konfirmasi Pembayaran Saya" &rarr; tinjau status setiap konfirmasi transfer manual/rencana bayar yang pernah dikirim dari menu Bayar.
- Wireframe: mengikuti struktur `riwayat.html` -- header dengan child-switch, segment filter 3 tab di atas kartu daftar Riwayat Pembayaran, lalu kartu "Riwayat Konfirmasi Pembayaran Saya" dengan judul & subjudul penjelas di bawahnya, serta sheet detail transaksi yang muncul dari bawah.
- Edge case yang wajib ditangani: anak aktif tanpa riwayat pembayaran sama sekali (empty state 🧾), anak aktif tanpa konfirmasi apa pun (empty state 📝 mengarahkan ke menu Bayar), transaksi gagal/kedaluwarsa tanpa nomor kuitansi (tampil "--", tombol unduh tidak muncul), konfirmasi jenis "Rencana Bayar" tanpa catatan (baris catatan disembunyikan).

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Halaman Bayar (aplikasi ini) | Sumber data `paymentHistory` (hasil pembayaran QRIS/VA/simulasi sukses) dan `pengajuanData` (konfirmasi transfer manual/rencana bayar yang dikirim) | Internal (shared data store) | [ ] | [ ] |
| Portal Sekolah (Bendahara -- verifikasi konfirmasi) | Pihak yang mengubah status konfirmasi menjadi Terverifikasi/Ditolak | Internal (shared data store, belum real-time) | [ ] | [ ] |
| Laporan Pemasukan (Admin Pusat) | Konsumen agregat data `paymentHistory` lintas sekolah untuk kebutuhan laporan pusat | Internal (shared data store) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: `PaymentHistory` (id, childId, invoiceRef, tanggal, metode, provider, nominal, status, kuitansi), `PengajuanKonfirmasi` (id, childId, metode, invoiceRef, nominal, bank, fileName, catatan, status, tanggal).
- Tidak ada migrasi khusus -- struktur data mengikuti objek `paymentHistory` dan `pengajuanData` di `app.js` pada prototipe ini.
- Retensi data: riwayat pembayaran & konfirmasi disimpan selama histori keuangan siswa terkait masih relevan untuk audit (rekomendasi minimal 5 tahun, perlu konfirmasi kebijakan retensi klien).
- Data saat ini bersifat snapshot dalam memori JavaScript (bukan database/API produksi) -- hilang saat sesi browser berakhir; status konfirmasi tidak pernah benar-benar berubah menjadi Terverifikasi/Ditolak pada prototipe karena belum ada aksi Bendahara yang terhubung langsung ke halaman ini.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Satu transaksi/konfirmasi hanya terkait satu anak dan satu tagihan (tidak ada transaksi/konfirmasi gabungan).
- Riwayat yang relevan bagi Wali Murid hanya riwayat anak yang sedang aktif dipilih, bukan gabungan seluruh anak.

**Batasan:**

- Data bersifat snapshot read-only dalam memori JavaScript, belum terhubung ke API/database produksi, sehingga status konfirmasi tidak berubah otomatis walau Bendahara memverifikasi di sistem lain.
- Belum ada notifikasi push/WA otomatis saat status konfirmasi berubah -- Wali Murid harus membuka halaman ini secara manual untuk mengetahuinya.
- Tombol "Unduh Kuitansi (PDF)" belum menghasilkan file sesungguhnya pada fase prototipe ini.

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Format kuitansi yang diunduh (FR-04) perlu berupa PDF asli dengan kop/logo sekolah, atau cukup gambar/struk sederhana? | PO klien | [DD-MM-YYYY] | [ ] |
| 2 | Ikon lonceng (🔔) di seluruh halaman mengarah ke halaman Riwayat, bukan ke `notifikasi.html` (yang berisi pengaturan preferensi notifikasi) -- apakah ini sudah sesuai maksud, atau sebaiknya lonceng mengarah ke daftar notifikasi tersendiri yang memuat lebih dari sekadar status konfirmasi? | PO klien | [DD-MM-YYYY] | [ ] |
| 3 | Apakah diperlukan notifikasi push/WA otomatis ke Wali Murid saat status konfirmasi berubah menjadi Terverifikasi/Ditolak, di luar tampilan di halaman ini? | PO klien | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Status konfirmasi di halaman ini tidak sinkron real-time dengan keputusan Bendahara di Portal Sekolah (snapshot statis) | H | M | Integrasikan dengan API/shared database real-time sebelum go-live produksi | [ ] |
| Wali Murid tidak mengetahui status konfirmasi berubah karena tidak ada notifikasi push/WA, hanya terlihat saat membuka halaman ini | M | H | Tambahkan notifikasi push/WA otomatis saat status konfirmasi berubah (lihat Pertanyaan Terbuka No. 3) | [ ] |
| Tombol "Unduh Kuitansi" tidak menghasilkan file nyata, berisiko Wali Murid mengira sudah punya bukti pembayaran tersimpan padahal belum | M | M | Implementasikan generator PDF kuitansi sesungguhnya sebelum go-live produksi (lihat Pertanyaan Terbuka No. 1) | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Mockup & struktur data final | [ ] | Review SA & klien |
| Development | Riwayat Pembayaran, detail transaksi, Riwayat Konfirmasi Pembayaran Saya | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| Riwayat Pembayaran | Daftar transaksi pembayaran (QRIS/VA BSI/Transfer) yang pernah dilakukan untuk seorang anak, beserta status akhirnya |
| Kuitansi (RCPT-...) | Nomor bukti pembayaran yang diterbitkan untuk setiap transaksi berstatus berhasil |
| Konfirmasi Pembayaran | Pemberitahuan dari Wali Murid ke Bendahara terkait transfer manual yang sudah dilakukan atau rencana tanggal pembayaran yang dijanjikan |
| Terjadwal | Status konfirmasi jenis "Rencana Bayar" yang masih menunggu tanggal pembayaran yang dijanjikan tiba |
| Menunggu Verifikasi | Status konfirmasi transfer manual yang bukti transfernya belum diperiksa Bendahara |
| Terverifikasi / Ditolak | Hasil akhir pemeriksaan Bendahara atas konfirmasi transfer manual |

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
