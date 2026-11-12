# PRD: Pembayaran Tagihan (Wali Murid)

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| Nama produk / fitur | Pembayaran Tagihan (QRIS, Virtual Account, Transfer Manual & Konfirmasi Rencana Bayar) |
| Klien / proyek      | Aplikasi Wali Murid -- Platform Invoicing & Payment SPP (GeekGarden)     |
| Versi dokumen       | v0.1                                                                      |
| Status              | Draft                                                                     |
| Penulis             | Tim Produk GeekGarden                                                     |
| Product Owner       | [Nama PO Klien]                                                           |
| Solution Architect  | [Nama SA]                                                                 |
| Tanggal dibuat       | 08-11-2026                                                                |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                   |
| Dokumen terkait     | `bayar.html`, `app.js`, `riwayat.html`, `profil.html`, PRD Riwayat Pembayaran & Konfirmasi, PRD Laporan Pemasukan (Admin Pusat), Portal Sekolah (Bendahara) |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                   |
| ----- | ---------- | --------------------- | -------------------------------------------- |
| v0.1  | 08-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `bayar.html`, menu "Bayar" pada bottom navigation aplikasi Wali Murid. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Halaman Bayar adalah fitur inti aplikasi Wali Murid: menampilkan ringkasan total tunggakan anak yang sedang aktif, daftar tagihan yang perlu dibayar, dan tiga cara pembayaran -- QRIS, Virtual Account (multi-bank), dan Transfer Manual yang diverifikasi Bendahara. Halaman ini juga menyediakan jalur "Konfirmasi" bagi Wali Murid yang belum bisa membayar sekarang namun ingin memberi tahu Bendahara rencana tanggal pembayarannya.

### 2.2 Problem Statement

**Wali Murid** mengalami **kesulitan membayar tagihan SPP dengan cara yang fleksibel dan melaporkan status pembayarannya** saat **pembayaran hanya bisa dilakukan secara tunai/transfer manual tanpa verifikasi otomatis, dan tidak ada cara memberi tahu sekolah bila belum bisa membayar tepat waktu**, yang menyebabkan **proses pembayaran lambat, rawan selisih pencatatan, dan Bendahara kesulitan membedakan tagihan yang benar-benar diabaikan dari yang sudah ada rencana pelunasan**.

### 2.3 Kondisi Saat Ini (As-Is)

Pembayaran SPP dilakukan secara tunai ke sekolah atau transfer manual yang dicocokkan belakangan oleh Bendahara secara manual lewat mutasi rekening, tanpa metode elektronik otomatis (QRIS/VA) dan tanpa cara sistematis bagi Wali Murid memberi tahu rencana pembayaran yang tertunda.

### 2.4 Kondisi yang Diharapkan (To-Be)

Wali Murid dapat membuka menu "Bayar", melihat seluruh tagihan yang perlu dibayar untuk anak aktif, membayar lewat QRIS atau Virtual Account yang terverifikasi otomatis, atau mengirim konfirmasi transfer manual dengan bukti transfer untuk diverifikasi Bendahara, serta mengirim rencana tanggal pembayaran bila belum bisa membayar sekarang.

### 2.5 Kenapa Sekarang?

Sebagai fitur paling sering dipakai Wali Murid, pembayaran elektronik otomatis (QRIS/VA) mengurangi keterlambatan pencatatan pelunasan, sementara jalur Konfirmasi & Transfer Manual menjaga fleksibilitas bagi Wali Murid yang terbiasa membayar lewat teller/rekening bukan atas nama sendiri.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Mempercepat pelunasan tagihan SPP dengan menyediakan metode pembayaran elektronik otomatis (QRIS, Virtual Account).
2. Mengurangi beban rekonsiliasi manual Bendahara dengan menyediakan jalur konfirmasi transfer manual yang terstruktur (bukti, nominal, bank pengirim).
3. Menurunkan tunggakan yang "hilang tanpa kabar" dengan menyediakan jalur Konfirmasi rencana tanggal pembayaran.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak menyediakan verifikasi otomatis atas transfer manual -- tetap diverifikasi manual oleh Bendahara di Portal Sekolah.
- Tidak mendukung pembayaran sebagian (partial payment) dari satu tagihan dalam satu transaksi pada fase ini.
- Tidak menyediakan metode pembayaran lain (kartu kredit/debit, e-wallet langsung tanpa QRIS, dsb.) di luar QRIS, Virtual Account, dan Transfer Manual.
- Tidak menangani penagihan/eskalasi tagihan yang lewat jatuh tempo dari halaman ini (lihat status "Jatuh Tempo Terlewat" -- tindak lanjutnya di luar scope).

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| % pembayaran yang dilakukan lewat QRIS/VA (elektronik otomatis) dibanding transfer manual | [ ] | &ge; 60% | Rasio `metode` pada `paymentHistory` | 2 bulan setelah rilis |
| Waktu rata-rata dari tagihan terbit hingga lunas | [ ] (manual, tidak terukur) | Turun &ge; 30% | Selisih tanggal terbit vs tanggal lunas pada data pembayaran | 2 bulan setelah rilis |
| % konfirmasi transfer manual yang diverifikasi Bendahara dalam 1x24 jam | [ ] | &ge; 90% | Selisih waktu kirim konfirmasi vs waktu verifikasi | 1 bulan setelah rilis |
| % tagihan dengan rencana pembayaran yang benar-benar dilunasi sesuai tanggal yang dijanjikan | [ ] | &ge; 70% | Perbandingan tanggal rencana bayar vs tanggal lunas riil | 3 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran          | Organisasi                 | RACI | Kepentingan                                                |
| --------------------- | --------------------------- | ---- | ----------------------------------------------------------- |
| Product Owner         | Klien (Muhammadiyah Pusat/Sekolah) | A | Menyetujui metode pembayaran & kebijakan verifikasi manual |
| Solution Architect    | GeekGarden                  | R    | Desain integrasi payment gateway (QRIS/VA) & verifikasi Bendahara |
| Tech Lead             | GeekGarden                  | R    | Implementasi halaman Bayar & alur ketiga metode pembayaran    |
| QA Lead               | GeekGarden                  | C    | Strategi pengujian seluruh kombinasi metode & status tagihan   |
| Wali Murid (Orang Tua/Wali) | Klien (pengguna akhir) | R    | Pengguna utama fitur ini                                     |
| Bendahara             | Klien                        | R    | Memverifikasi konfirmasi transfer manual & memantau rencana bayar |
| Provider H2H Bank (BSI) | Pihak ketiga               | R    | Penyedia layanan QRIS & Virtual Account otomatis               |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Wali Murid (Ayah/Ibu/Wali) | Orang tua/wali yang perlu membayar tagihan SPP anaknya | Membayar tagihan dengan cara yang paling mudah sesuai kebiasaan (QRIS/VA/transfer manual) | Tidak tahu cara melapor bila belum bisa bayar tepat waktu; transfer manual rawan tidak terdeteksi sekolah | Smartphone (aplikasi mobile web) |
| Bendahara (konsumen tidak langsung) | Memverifikasi konfirmasi transfer manual & memantau rencana pembayaran | Memastikan seluruh pelunasan tercatat akurat | Rekonsiliasi manual lambat tanpa data terstruktur dari Wali Murid | Portal Sekolah (di luar scope aplikasi ini) |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Ringkasan Total Tunggakan anak aktif & catatan status (lunas/jumlah tagihan/ada yang lewat jatuh tempo) | Pembayaran sebagian (partial payment) dari satu tagihan |
| Daftar tagihan yang perlu dibayar dengan badge status (Belum Dibayar/Jatuh Tempo Terlewat/Dihapus Buku) | Metode pembayaran lain (kartu kredit/debit, e-wallet langsung) |
| Pembayaran via QRIS (kode QR simulasi, countdown kedaluwarsa, simulasi "Saya Sudah Bayar") | Verifikasi otomatis atas transfer manual |
| Pembayaran via Virtual Account multi-bank (BCA/BSI/Mandiri/BNI/BRI) dengan instruksi m-Banking/ATM/Internet Banking | Penagihan/eskalasi otomatis untuk tagihan jatuh tempo terlewat |
| Transfer Manual ke rekening Bendahara + form konfirmasi (tanggal, nominal, bank pengirim, bukti transfer, catatan) | Integrasi real-time dengan payment gateway produksi (saat ini simulasi) |
| Konfirmasi Rencana Bayar (tanggal rencana pembayaran + catatan) tanpa transfer sekarang | |
| Invoice berstatus "Dihapus Buku" (writeoff) ditampilkan informatif tanpa aksi bayar | |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Ringkasan tunggakan, daftar tagihan dengan badge status, pembayaran QRIS, pembayaran Virtual Account, Transfer Manual + konfirmasi dengan bukti, Konfirmasi Rencana Bayar.
- **Should have** -- Instruksi pembayaran VA per metode (m-Banking/ATM/Internet Banking), salin nomor VA/rekening ke clipboard.
- **Could have** -- Pembayaran sebagian (partial payment).
- **Won't have (now)** -- Metode pembayaran lain di luar QRIS/VA/Transfer Manual, penagihan otomatis dari halaman ini.

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai Wali Murid, saya ingin melihat total tunggakan & daftar tagihan anak yang sedang aktif, supaya saya tahu apa saja yang harus saya bayar. | Must | Given saya membuka menu Bayar, When halaman dimuat, Then kartu ringkasan menampilkan Total Tunggakan dan daftar tagihan (kecuali yang sudah lunas/draft) ditampilkan dengan status masing-masing |
| US-02 | Sebagai Wali Murid, saya ingin membayar tagihan lewat QRIS, supaya saya bisa membayar cepat lewat aplikasi m-Banking/e-wallet apa pun. | Must | Given saya menekan "Bayar" pada satu tagihan dan memilih tab QRIS, When saya menekan "Saya Sudah Bayar", Then tagihan berubah status menjadi Lunas dan tercatat di Riwayat Pembayaran dengan metode QRIS |
| US-03 | Sebagai Wali Murid, saya ingin membayar tagihan lewat Virtual Account bank pilihan saya, supaya saya bisa bayar lewat m-Banking/ATM/Internet Banking bank yang saya pakai. | Must | Given saya memilih tab Virtual Account dan salah satu bank, When saya menekan "Cek Status Pembayaran" setelah membayar, Then tagihan berubah status menjadi Lunas dan tercatat di Riwayat Pembayaran dengan metode VA bank terpilih |
| US-04 | Sebagai Wali Murid yang sudah transfer manual, saya ingin mengirim konfirmasi berisi bukti transfer, supaya Bendahara bisa memverifikasi & menandai tagihan lunas. | Must | Given saya mengisi tanggal transfer, nominal, bank pengirim, dan mengunggah bukti transfer pada tab Transfer, When saya menekan "Kirim Konfirmasi ke Bendahara", Then konfirmasi tersimpan berstatus "Menunggu Verifikasi" dan muncul di Riwayat Konfirmasi Pembayaran Saya |
| US-05 | Sebagai Wali Murid yang belum bisa membayar sekarang, saya ingin memberi tahu Bendahara rencana tanggal pembayaran saya, supaya tagihan saya tidak dianggap diabaikan. | Must | Given saya menekan "Konfirmasi" pada satu tagihan dan mengisi rencana tanggal pembayaran, When saya menekan "Kirim ke Bendahara", Then rencana tersimpan berstatus "Terjadwal" dan muncul di Riwayat Konfirmasi Pembayaran Saya |
| US-06 | Sebagai Wali Murid dengan anak yang sudah pindah sekolah, saya ingin tagihan yang sudah dihapus buku ditampilkan jelas tanpa opsi bayar, supaya saya tidak bingung apakah masih harus membayar. | Should | Given tagihan anak berstatus `writeoff`, When ditampilkan di daftar tagihan, Then tidak ada tombol "Bayar"/"Konfirmasi", hanya catatan bahwa tagihan sudah dihapus buku otomatis |
| US-07 | Sebagai Wali Murid, saya ingin menyalin nomor Virtual Account atau rekening Bendahara dengan satu ketukan, supaya saya tidak perlu mengetik ulang nomor yang panjang. | Should | Given saya menekan tombol "📋 Salin Nomor VA"/"📋 Salin Nomor Rekening", When penyalinan berhasil, Then nomor tersalin ke clipboard dan toast konfirmasi muncul |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Ringkasan Total Tunggakan | Sistem harus menghitung & menampilkan Total Tunggakan (jumlah nominal tagihan belum lunas, tidak termasuk `writeoff`) untuk anak aktif, beserta catatan status (lunas/jumlah tertunggak/ada yang jatuh tempo terlewat) | US-01 | Must | Tagihan berstatus `paid` dan `draft` tidak dihitung/ditampilkan di daftar; `escalated`/`overdue` memicu catatan peringatan |
| FR-02 | Daftar Tagihan | Sistem harus menampilkan setiap tagihan relevan dengan jenis & periode, nama & kelas anak, nominal, tanggal jatuh tempo, dan badge status (Belum Dibayar/Dibayar Sebagian/Jatuh Tempo Terlewat/Dihapus Buku) | US-01, US-06 | Must | Tidak ada tagihan relevan menampilkan empty state "🎉 Tidak ada tagihan aktif" |
| FR-03 | Pembayaran QRIS | Sistem harus menampilkan kode QR (simulasi), total pembayaran, countdown kedaluwarsa, dan tombol "Saya Sudah Bayar" yang menandai tagihan lunas | US-02 | Must | Countdown dimulai dari 14:59; simulasi tidak memverifikasi pembayaran riil pada prototipe ini (lihat 11. Pertanyaan Terbuka No. 1) |
| FR-04 | Pembayaran Virtual Account | Sistem harus menghasilkan nomor VA sesuai bank yang dipilih (BCA/BSI/Mandiri/BNI/BRI), menampilkan total pembayaran, countdown kedaluwarsa, instruksi pembayaran sesuai metode (m-Banking/ATM/Internet Banking), dan tombol "Cek Status Pembayaran" yang menandai tagihan lunas | US-03 | Must | Countdown dimulai dari 23:59:00; nomor VA dibentuk dari kode bank + ID tagihan, bukan hasil integrasi H2H sungguhan pada prototipe ini |
| FR-05 | Transfer Manual & Konfirmasi | Sistem harus menampilkan rekening tujuan Bendahara dan form konfirmasi (tanggal transfer, nominal, bank pengirim, unggah bukti transfer wajib, catatan opsional) yang mengirim pengajuan berstatus "Menunggu Verifikasi" | US-04 | Must | Pengajuan tidak dapat dikirim tanpa tanggal, nominal, bank pengirim, dan bukti transfer terunggah |
| FR-06 | Konfirmasi Rencana Bayar | Sistem harus menyediakan sheet terpisah "Konfirmasi" per tagihan yang meminta rencana tanggal pembayaran (wajib) & catatan (opsional), menghasilkan pengajuan berstatus "Terjadwal" | US-05 | Must | Berbeda dari form Transfer Manual -- jalur ini dipakai saat Wali Murid belum melakukan transfer apa pun, hanya menjanjikan tanggal |
| FR-07 | Tagihan Dihapus Buku (Writeoff) | Tagihan berstatus `writeoff` harus ditampilkan dengan catatan informatif ("Dihapus buku otomatis -- siswa pindah sekolah") tanpa tombol aksi apa pun | US-06 | Must | Konsisten dengan alur Ajukan Pindah Sekolah di halaman Profil |
| FR-08 | Salin ke Clipboard | Sistem harus menyediakan tombol salin untuk nomor Virtual Account dan nomor rekening Bendahara | US-07 | Should | Fallback menampilkan nomor dalam toast bila Clipboard API tidak tersedia di perangkat |
| FR-09 | Reaktivitas terhadap Child-Switch | Daftar tagihan & ringkasan tunggakan harus otomatis dimuat ulang saat anak aktif berganti lewat header | -- | Must | Dipicu oleh `selectChild()` yang memanggil `renderBayarView()` |

### 6.1 Hak Akses per Peran

| Fitur | Wali Murid (akun aktif) | Wali Murid (menunggu approval / ditolak) |
| --- | --- | --- |
| Lihat daftar tagihan & total tunggakan | Ya | -- (tidak bisa masuk ke aplikasi) |
| Bayar via QRIS/Virtual Account | Ya | -- |
| Kirim konfirmasi transfer manual | Ya | -- |
| Kirim rencana pembayaran | Ya | -- |
| Verifikasi konfirmasi transfer manual | -- (kewenangan Bendahara di Portal Sekolah) | -- |

*Catatan: akses ke halaman ini ditentukan oleh `requireLogin()`, sama seperti seluruh halaman lain pada aplikasi ini. Verifikasi konfirmasi transfer manual tidak tersedia di aplikasi ini pada peran apa pun.*

### 6.2 Notifikasi

| Pemicu | Penerima | Kanal | Isi singkat |
| --- | --- | --- | --- |
| Pembayaran QRIS/VA berhasil disimulasikan | Wali Murid (pembayar) | In-app toast | "✓ Pembayaran [nama anak] berhasil dikonfirmasi" |
| Konfirmasi transfer manual terkirim | Wali Murid (pengirim) | In-app toast | "✓ Konfirmasi transfer terkirim, menunggu verifikasi Bendahara" |
| Rencana pembayaran terkirim | Wali Murid (pengirim) | In-app toast | "✓ Rencana pembayaran Anda dikirim ke Bendahara" |
| Konfirmasi transfer manual baru masuk | Bendahara (disarankan) | Dashboard Portal Sekolah (belum diimplementasi) | Pemberitahuan ada konfirmasi transfer manual yang perlu diverifikasi |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Validasi input | Konfirmasi transfer manual tidak dapat dikirim tanpa tanggal, nominal, bank pengirim, dan bukti transfer; rencana bayar tidak dapat dikirim tanpa tanggal rencana | 100% pengajuan tervalidasi sebelum tersimpan |
| NFR-02 | Konsistensi data | Status tagihan & riwayat pembayaran harus konsisten antara halaman Bayar dan halaman Riwayat untuk anak yang sama | 100% konsisten antar tampilan |
| NFR-03 | Keamanan sesi | Halaman Bayar hanya dapat diakses oleh Wali Murid dengan sesi login aktif | 100% enforced via `requireLogin()` |
| NFR-04 | Performa | Waktu render daftar tagihan & pembukaan sheet pembayaran | &lt; 1 detik untuk &le; 50 tagihan per anak |
| NFR-05 | Ukuran unggahan bukti transfer | Sistem harus membatasi format (JPG/PNG/PDF) dan ukuran file bukti transfer | Maks. 5MB per file, sesuai keterangan UI |

---

## 8. Alur Pengguna & Desain

- Alur pembayaran elektronik: Login &rarr; menu "Bayar" &rarr; tekan "Bayar" pada tagihan &rarr; pilih tab QRIS atau Virtual Account &rarr; selesaikan pembayaran di aplikasi bank &rarr; tekan "Saya Sudah Bayar"/"Cek Status Pembayaran" &rarr; tagihan berubah Lunas &rarr; toast konfirmasi.
- Alur transfer manual: menu "Bayar" &rarr; tekan "Bayar" pada tagihan &rarr; pilih tab Transfer &rarr; salin rekening Bendahara & lakukan transfer di luar aplikasi &rarr; isi form konfirmasi (tanggal, nominal, bank, bukti) &rarr; "Kirim Konfirmasi ke Bendahara" &rarr; status "Menunggu Verifikasi".
- Alur rencana bayar: menu "Bayar" &rarr; tekan "Konfirmasi" pada tagihan &rarr; isi rencana tanggal & catatan &rarr; "Kirim ke Bendahara" &rarr; status "Terjadwal".
- Wireframe: mengikuti struktur `bayar.html` -- kartu ringkasan tunggakan di atas, daftar kartu tagihan dengan tombol "Bayar"/"Konfirmasi", sheet Pembayaran dengan 3 tab (QRIS/VA/Transfer), dan sheet Konfirmasi Rencana Bayar terpisah.
- Edge case yang wajib ditangani: anak tanpa tagihan aktif (empty state 🎉), tagihan `writeoff` (tanpa tombol aksi), QRIS/VA yang kedaluwarsa sebelum dibayar (countdown mencapai 0, belum ada alur perpanjangan otomatis pada prototipe), konfirmasi transfer manual tanpa bukti terunggah (ditolak dengan toast peringatan), rencana bayar tanpa tanggal terisi (ditolak dengan toast peringatan).

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Provider H2H BSI (QRIS & Virtual Account) | Penyedia kanal pembayaran elektronik otomatis | Integrasi Host-to-Host (belum diimplementasi, saat ini simulasi) | [ ] | [ ] |
| Portal Sekolah (Bendahara -- verifikasi transfer manual) | Pihak yang memverifikasi konfirmasi transfer manual & memantau rencana bayar | Internal (shared data store) | [ ] | [ ] |
| Halaman Riwayat (aplikasi ini) | Konsumen hasil pembayaran (`paymentHistory`) & konfirmasi (`pengajuanData`) yang dibuat dari halaman ini | Internal (shared data store) | [ ] | [ ] |
| Laporan Pemasukan (Admin Pusat) | Konsumen agregat data pembayaran lintas sekolah untuk kebutuhan laporan pusat | Internal (shared data store) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: `Invoice` (id, childId, jenis, periode, nominal, jatuhTempo, status), `PaymentHistory` (id, childId, invoiceRef, tanggal, metode, provider, nominal, status, kuitansi), `PengajuanKonfirmasi` (id, childId, metode, invoiceRef, nominal, bank, fileName, catatan, status, tanggal), `SchoolBankAccount` (bank, nomor, atasNama).
- Tidak ada migrasi khusus -- struktur data mengikuti objek `invoices`, `paymentHistory`, `pengajuanData`, dan `schoolBankAccount` di `app.js` pada prototipe ini.
- Retensi data: riwayat pembayaran & konfirmasi disimpan selama histori keuangan siswa terkait masih relevan untuk audit (rekomendasi minimal 5 tahun, perlu konfirmasi kebijakan retensi klien).
- Data saat ini bersifat snapshot dalam memori JavaScript (bukan database/API/payment gateway produksi) -- hilang saat sesi browser berakhir.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Satu tagihan hanya bisa dilunasi dalam satu transaksi penuh (tidak ada pembayaran sebagian pada fase ini).
- Nomor Virtual Account yang dihasilkan bersifat unik per kombinasi bank & tagihan, cukup untuk kebutuhan simulasi.

**Batasan:**

- Pembayaran QRIS/VA pada prototipe ini disimulasikan lewat tombol "Saya Sudah Bayar"/"Cek Status Pembayaran" -- belum terhubung ke payment gateway/callback bank sungguhan.
- Data bersifat snapshot read-only dalam memori JavaScript, belum terhubung ke API/database produksi.
- Belum ada alur perpanjangan otomatis saat kode QRIS/VA kedaluwarsa sebelum dibayar.

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Provider H2H mana yang akan digunakan di produksi untuk QRIS & Virtual Account (saat ini disebut "BSI H2H" sebagai contoh), dan bagaimana mekanisme callback status pembayaran yang sesungguhnya? | PO klien / SA | [DD-MM-YYYY] | [ ] |
| 2 | Apakah diperlukan dukungan pembayaran sebagian (partial payment) untuk tagihan nominal besar? | PO klien | [DD-MM-YYYY] | [ ] |
| 3 | Berapa lama SLA riil verifikasi Bendahara atas konfirmasi transfer manual yang disepakati secara resmi? | PO klien | [DD-MM-YYYY] | [ ] |
| 4 | Apa yang terjadi bila kode QRIS/nomor VA kedaluwarsa sebelum Wali Murid membayar -- apakah perlu alur generate ulang otomatis? | PO klien / Tech Lead | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Pembayaran QRIS/VA hanya simulasi tombol tanpa verifikasi bank sungguhan -- berisiko disalahgunakan untuk menandai lunas tanpa membayar bila dibawa ke produksi tanpa integrasi nyata | H | H (pada prototipe) | Integrasikan dengan payment gateway/H2H sungguhan dengan callback status sebelum go-live produksi (lihat Pertanyaan Terbuka No. 1) | [ ] |
| Konfirmasi transfer manual palsu/bukti tidak valid tidak terdeteksi otomatis, sepenuhnya bergantung ketelitian Bendahara | M | M | Pertimbangkan validasi tambahan (misal pencocokan nominal otomatis dengan mutasi rekening) pada iterasi berikutnya | [ ] |
| Rencana pembayaran yang dijanjikan tidak ditagih ulang secara otomatis bila tanggal terlewat | M | M | Tambahkan mekanisme pengingat/eskalasi otomatis saat rencana bayar terlewat tanpa pelunasan | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Mockup & struktur data final | [ ] | Review SA & klien |
| Development | Ringkasan tunggakan, daftar tagihan, sheet QRIS/VA/Transfer, sheet Konfirmasi Rencana Bayar | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| QRIS | QR Code Indonesian Standard -- kode QR pembayaran yang didukung semua bank/e-wallet berlogo QRIS |
| Virtual Account (VA) | Nomor rekening sementara unik per transaksi yang dibuat bank untuk menerima pembayaran otomatis |
| H2H (Host-to-Host) | Integrasi sistem langsung antara platform dan sistem bank untuk pembayaran & callback status otomatis |
| Transfer Manual | Pembayaran lewat teller/rekening di luar QRIS/VA otomatis, diverifikasi manual oleh Bendahara |
| Konfirmasi Rencana Bayar | Pemberitahuan tanggal rencana pembayaran yang dijanjikan Wali Murid saat belum bisa membayar sekarang |
| Writeoff / Dihapus Buku | Status tagihan yang dihapuskan karena siswa pindah sekolah (lihat PRD Profil Wali Murid) |

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
