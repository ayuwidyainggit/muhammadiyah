# PRD: Profil Wali Murid

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| Nama produk / fitur | Profil Wali Murid (Manajemen Profil, Preferensi Pengingat & Pengajuan Pindah Sekolah) |
| Klien / proyek      | Aplikasi Wali Murid -- Platform Invoicing & Payment SPP (GeekGarden)     |
| Versi dokumen       | v0.1                                                                      |
| Status              | Draft                                                                     |
| Penulis             | Tim Produk GeekGarden                                                     |
| Product Owner       | [Nama PO Klien]                                                           |
| Solution Architect  | [Nama SA]                                                                 |
| Tanggal dibuat       | 08-11-2026                                                                |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                   |
| Dokumen terkait     | `profil.html`, `app.js`, `index.html` (SSO), `bayar.html`, `riwayat.html`, PRD Laporan Pindah Sekolah & Tunggakan (Admin Pusat), Portal Sekolah (Approval Write-off) |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                   |
| ----- | ---------- | --------------------- | -------------------------------------------- |
| v0.1  | 08-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `profil.html`, menu "Profil" pada bottom navigation aplikasi Wali Murid. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Halaman Profil adalah pusat pengelolaan data pribadi Wali Murid (orang tua/wali), preferensi pengingat tagihan tambahan, serta tempat melihat data akademik seluruh anak yang terdaftar pada akun tersebut. Dari halaman ini pula Wali Murid dapat mengajukan proses **Pindah Sekolah** untuk salah satu anaknya, yang memicu penghapusan buku (write-off) otomatis atas cicilan yang belum jatuh tempo, sementara tunggakan yang sudah jatuh tempo tetap wajib dilunasi sesuai rencana yang diisi.

### 2.2 Problem Statement

**Wali Murid** mengalami **kesulitan menjaga data kontak & preferensi reminder-nya tetap akurat serta mengurus proses pindah sekolah anak** saat **satu-satunya cara memperbarui data atau mengajukan pindah sekolah adalah datang langsung ke Tata Usaha**, yang menyebabkan **data kontak usang (reminder tagihan tidak sampai), proses pindah sekolah lambat, dan risiko tunggakan tidak diketahui sebelum anak benar-benar pindah**.

### 2.3 Kondisi Saat Ini (As-Is)

Perubahan data kontak, preferensi reminder, dan pengajuan pindah sekolah hanya bisa dilakukan dengan menghubungi/mendatangi Tata Usaha sekolah secara langsung. Wali Murid tidak punya visibilitas mandiri atas tunggakan yang masih harus dilunasi sebelum mengajukan pindah sekolah.

### 2.4 Kondisi yang Diharapkan (To-Be)

Wali Murid dapat login ke aplikasi, membuka menu "Profil", memperbarui data pribadi & preferensi pengingat sendiri, melihat data seluruh anaknya, dan mengajukan pindah sekolah langsung dari aplikasi -- lengkap dengan informasi tunggakan yang wajib dilunasi, tanpa perlu datang ke Tata Usaha hanya untuk keperluan administratif ini.

### 2.5 Kenapa Sekarang?

Dengan makin banyak Wali Murid yang mulai bertransaksi lewat aplikasi ini (lihat halaman Bayar & Riwayat), data kontak yang akurat menjadi prasyarat agar reminder tagihan efektif, dan alur self-service pindah sekolah mengurangi beban administratif Tata Usaha di setiap sekolah.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memastikan data kontak Wali Murid (WA, email) selalu akurat untuk kebutuhan komunikasi tagihan & reminder.
2. Mengurangi beban administratif Tata Usaha dengan memindahkan proses pengajuan pindah sekolah ke self-service aplikasi.
3. Mencegah tunggakan "hilang" tak tertagih akibat siswa pindah sekolah, dengan mewajibkan rencana pelunasan sebelum pengajuan diproses.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak mendukung pengeditan data akademik anak (NIS, kelas, nama, sekolah) dari halaman ini -- data tersebut hanya bisa diubah oleh sekolah/Tata Usaha.
- Tidak mencakup pengaturan preferensi notifikasi multi-kanal (WA/SMS/Email/Push) -- itu domain halaman **Notifikasi**.
- Tidak mencakup metode pembayaran tagihan atau riwayat transaksi -- itu domain halaman **Bayar** & **Riwayat**.
- Tidak menyediakan langkah persetujuan (approve/reject) atas pengajuan pindah sekolah dari halaman ini -- halaman ini hanya titik pengajuan oleh Wali Murid (lihat catatan di 11. Asumsi & Pertanyaan Terbuka terkait keterkaitan dengan proses Approval Write-off di Portal Sekolah).

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| % akun Wali Murid dengan data WA & email terisi valid | [ ] | 95% | Audit kelengkapan field `wa`/`email` per akun aktif | 1 bulan setelah rilis |
| Waktu rata-rata proses pengajuan pindah sekolah selesai diajukan (self-service) | [ ] (datang ke TU, tidak terukur) | < 5 menit | Timestamp buka sheet "Ajukan Pindah Sekolah" s.d. submit berhasil | 2 bulan setelah rilis |
| % pengajuan pindah sekolah dengan tunggakan yang menyertakan rencana pelunasan valid | [ ] | 100% | Validasi field `rencanaBayarTunggakan` tidak kosong saat ada tunggakan | 2 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran          | Organisasi                 | RACI | Kepentingan                                                |
| --------------------- | --------------------------- | ---- | ----------------------------------------------------------- |
| Product Owner         | Klien (Muhammadiyah Pusat/Sekolah) | A | Menyetujui kebijakan data profil & aturan pindah sekolah |
| Solution Architect    | GeekGarden                  | R    | Desain integrasi data dengan Portal Sekolah & Bendahara      |
| Tech Lead             | GeekGarden                  | R    | Implementasi halaman Profil & alur pindah sekolah            |
| QA Lead               | GeekGarden                  | C    | Strategi pengujian validasi & konsistensi status anak        |
| Wali Murid (Orang Tua/Wali) | Klien (pengguna akhir) | R    | Pengguna utama fitur ini                                     |
| Tata Usaha / Admin Sekolah | Klien                   | I    | Pemilik data akademik anak, menerima dampak pengajuan pindah sekolah |
| Bendahara             | Klien                        | I    | Memantau rencana pelunasan tunggakan yang tercatat dari pengajuan pindah sekolah |
| Kepala Sekolah        | Klien                        | I    | Pihak yang (pada proses produksi) menyetujui write-off di Portal Sekolah |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Wali Murid (Ayah/Ibu/Wali) | Orang tua/wali dari satu atau lebih siswa aktif | Menjaga data kontak akurat, mendapat reminder tagihan tepat waktu, mengurus pindah sekolah tanpa datang ke sekolah | Harus datang ke TU untuk ubah data atau ajukan pindah sekolah; tidak tahu persis tunggakan yang harus dilunasi sebelum pindah | Smartphone (aplikasi mobile web) |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Lihat & ubah data pribadi (nama, hubungan dengan siswa, pekerjaan, No. WhatsApp, No. HP alternatif, email) | Edit data akademik anak (NIS, kelas, nama, sekolah) |
| Preferensi tanggal pengingat tagihan tambahan (1--28 setiap bulan) | Preferensi notifikasi multi-kanal (WA/SMS/Email/Push) -- domain halaman Notifikasi |
| Lihat daftar seluruh anak pada akun (multi-anak) & status (Aktif/Pindah Sekolah) | Metode pembayaran & riwayat transaksi -- domain halaman Bayar & Riwayat |
| Beralih anak aktif lewat child-switch di header (berlaku ke seluruh aplikasi) | Approve/reject pengajuan pindah sekolah dari halaman ini |
| Ajukan Pindah Sekolah per anak: info tunggakan wajib dilunasi, rencana pelunasan (wajib jika ada tunggakan), tanggal efektif pindah, sekolah tujuan & catatan opsional | Pembatalan/penarikan kembali pengajuan pindah sekolah yang sudah terkirim |
| Write-off otomatis cicilan yang belum jatuh tempo saat pengajuan pindah sekolah diproses | Penghitungan ulang/pengubahan nominal tunggakan |
| Pencatatan rencana pelunasan tunggakan ke daftar Konfirmasi (dipantau Bendahara) | Notifikasi WA/email otomatis ke Tata Usaha saat ada pengajuan pindah sekolah baru |
| Logout (keluar dari akun) | Ubah email/password akun (ganti kredensial login) |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Data Pribadi (lihat & ubah), daftar Data Anak (read-only), child-switch, Ajukan Pindah Sekolah dengan validasi tunggakan & rencana pelunasan, write-off otomatis cicilan belum jatuh tempo, logout.
- **Should have** -- Preferensi tanggal pengingat tagihan, pencatatan rencana pelunasan ke daftar Konfirmasi untuk Bendahara.
- **Could have** -- Badge/indikator riwayat pengajuan pindah sekolah sebelumnya pada anak yang sama.
- **Won't have (now)** -- Edit data akademik anak, approve/reject pengajuan, pembatalan pengajuan, ubah kredensial akun.

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai Wali Murid, saya ingin melihat & mengubah data pribadi saya (nama, hubungan dengan siswa, pekerjaan, kontak), supaya sekolah bisa menghubungi saya dengan benar terkait tagihan anak. | Must | Given saya membuka menu Profil, When saya mengubah field data pribadi dan menekan "Simpan Perubahan", Then data tersimpan dan nama pada header aplikasi ikut ter-update, serta toast konfirmasi "✓ Profil berhasil disimpan" muncul |
| US-02 | Sebagai Wali Murid, saya ingin memilih tanggal favorit pengingat tagihan bulanan, supaya saya menerima reminder tambahan selain reminder otomatis sekolah. | Should | Given saya memilih salah satu tanggal (1--28) pada "Ingatkan saya setiap tanggal", When saya menekan "Simpan Perubahan", Then preferensi tanggal tersimpan pada akun saya |
| US-03 | Sebagai Wali Murid dengan lebih dari satu anak, saya ingin melihat daftar semua anak saya & bisa berpindah anak aktif dari header, supaya saya bisa mengelola tagihan tiap anak secara terpisah. | Must | Given akun saya memiliki &ge; 2 anak, When saya membuka chip nama anak di header, Then halaman (Profil, Bayar, Riwayat, badge notifikasi) memperbarui konteksnya mengikuti anak yang baru dipilih |
| US-04 | Sebagai Wali Murid, saya ingin mengajukan pindah sekolah untuk anak saya langsung dari halaman Profil, supaya saya tidak perlu datang ke Tata Usaha hanya untuk keperluan administratif ini. | Must | Given anak saya berstatus "Aktif", When saya menekan "Ajukan Pindah Sekolah" dan mengisi tanggal efektif pindah, Then pengajuan terkirim, status anak berubah menjadi "Pindah Sekolah", dan tombol "Ajukan Pindah Sekolah" untuk anak tersebut tidak lagi tersedia |
| US-05 | Sebagai Wali Murid yang mengajukan pindah sekolah, saya ingin diberi tahu dengan jelas tunggakan (tagihan jatuh tempo) anak saya yang masih harus dilunasi, supaya saya tidak terkejut saat anak sudah pindah namun tagihan tetap harus dibayar. | Must | Given anak saya memiliki tagihan berstatus jatuh tempo (escalated/overdue), When saya membuka sheet "Ajukan Pindah Sekolah", Then daftar tunggakan beserta totalnya ditampilkan dan field "Rencana Tanggal Pelunasan Tunggakan" wajib diisi sebelum saya bisa submit |
| US-06 | Sebagai Wali Murid yang anaknya tidak punya tunggakan, saya ingin proses pengajuan pindah sekolah tetap sederhana, supaya saya tidak diminta mengisi informasi yang tidak relevan. | Should | Given anak saya tidak memiliki tagihan jatuh tempo, When saya membuka sheet "Ajukan Pindah Sekolah", Then ditampilkan pesan "Tidak ada tunggakan yang harus dilunasi" dan field rencana pelunasan disembunyikan/tidak wajib diisi |
| US-07 | Sebagai Wali Murid, saya ingin keluar (logout) dari akun saya dengan mudah, supaya perangkat yang dipakai bersama tetap aman. | Must | Given saya menekan tombol "Keluar", When logout diproses, Then sesi saya dihapus dan saya diarahkan kembali ke halaman login |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Data Pribadi | Sistem harus menampilkan & mengizinkan Wali Murid mengubah field Nama Lengkap, Hubungan dengan Siswa (Ayah/Ibu/Wali), Pekerjaan (dropdown preset), No. WhatsApp, No. HP Alternatif (opsional), Email, lalu menyimpannya lewat tombol "Simpan Perubahan" | US-01 | Must | Field Pekerjaan membantu sekolah menilai kondisi ekonomi keluarga saat meninjau pengajuan keringanan (lihat PRD terkait keringanan bila ada); **catatan implementasi saat ini**: `saveProfile()` di `app.js` hanya menyimpan field Nama, Pekerjaan, No. WA, Email, dan Tanggal Pengingat -- field Hubungan dengan Siswa dan No. HP Alternatif **belum ikut tersimpan** (lihat 11. Pertanyaan Terbuka No. 2) |
| FR-02 | Preferensi Pengingat Tagihan | Sistem harus menyediakan dropdown tanggal 1--28 untuk reminder tambahan bulanan, terpisah dari reminder otomatis sekolah | US-02 | Should | Hanya 1 tanggal aktif per akun; tidak mendukung multi-tanggal pada fase ini |
| FR-03 | Header & Child-Switch | Sistem harus menampilkan nama & avatar inisial Wali Murid, badge jumlah notifikasi/konfirmasi tertunda, dan daftar chip anak yang bisa dipilih untuk mengganti anak aktif di seluruh halaman aplikasi | US-03 | Must | Badge notifikasi dihitung dari jumlah pengajuan konfirmasi pembayaran berstatus "Menunggu Verifikasi" milik anak yang sedang aktif |
| FR-04 | Data Anak (Read-only) | Sistem harus menampilkan daftar seluruh anak pada akun (nama, NIS, kelas) beserta status (badge "Aktif" atau "Pindah Sekolah") | US-03, US-04 | Must | Data akademik bersifat read-only; perubahan hanya bisa dilakukan oleh sekolah/Tata Usaha |
| FR-05 | Ajukan Pindah Sekolah -- Info Tunggakan | Sistem harus menghitung & menampilkan seluruh tagihan berstatus jatuh tempo (escalated/overdue) milik anak yang diajukan pindah, beserta totalnya, saat sheet "Ajukan Pindah Sekolah" dibuka | US-05, US-06 | Must | Jika tidak ada tunggakan, tampilkan pesan konfirmasi "Tidak ada tunggakan yang harus dilunasi" dan sembunyikan field rencana pelunasan |
| FR-06 | Ajukan Pindah Sekolah -- Validasi Wajib | Sistem harus mewajibkan Tanggal Efektif Pindah selalu terisi, dan mewajibkan Rencana Tanggal Pelunasan Tunggakan terisi apabila anak memiliki tunggakan, sebelum pengajuan bisa dikirim | US-04, US-05 | Must | Sekolah Tujuan & Catatan bersifat opsional |
| FR-07 | Write-off Otomatis Cicilan Belum Jatuh Tempo | Begitu pengajuan pindah sekolah dikirim, seluruh cicilan anak tersebut yang berstatus belum jatuh tempo (`sent`) otomatis diubah menjadi `writeoff` (dihapus buku) | US-04 | Must | Cicilan yang sudah berstatus jatuh tempo (tunggakan) **tidak** ikut dihapus buku -- tetap wajib dilunasi sesuai rencana yang diisi pada FR-06 |
| FR-08 | Pencatatan Rencana Pelunasan ke Konfirmasi | Setiap invoice tunggakan yang terkait pengajuan pindah sekolah otomatis membuat entri "Rencana Bayar" berstatus "Terjadwal" pada daftar Konfirmasi Pembayaran (tab Riwayat) | US-05 | Should | Memungkinkan Bendahara memantau rencana pelunasan tunggakan siswa yang sudah pindah sekolah |
| FR-09 | Status Anak Berubah Setelah Pengajuan | Setelah pengajuan pindah sekolah berhasil dikirim, status anak pada daftar Data Anak berubah dari "Aktif" menjadi "Pindah Sekolah" dan tombol "Ajukan Pindah Sekolah" untuk anak tersebut tidak lagi ditampilkan | US-04 | Must | Satu anak hanya bisa mengajukan pindah sekolah satu kali pada fase ini (tidak ada alur pembatalan) |
| FR-10 | Logout | Sistem harus menyediakan tombol "Keluar" yang menghapus sesi login dan mengarahkan Wali Murid kembali ke halaman login | US-07 | Must | Sesi disimpan di `sessionStorage` sisi klien pada prototipe ini |

### 6.1 Hak Akses per Peran

| Fitur | Wali Murid (akun aktif) | Wali Murid (menunggu approval / ditolak) |
| --- | --- | --- |
| Lihat & ubah Data Pribadi | Ya | -- (tidak bisa masuk ke aplikasi) |
| Lihat Data Anak | Ya | -- |
| Ajukan Pindah Sekolah | Ya | -- |
| Logout | Ya | -- |

*Catatan: akses ke seluruh halaman aplikasi (termasuk Profil) ditentukan oleh fungsi `requireLogin()` yang memeriksa sesi aktif; akun dengan status `menunggu_approval` atau `ditolak` diarahkan ke halaman `menunggu-approval.html`/`ditolak.html` saat login dan tidak pernah mencapai halaman Profil (lihat `routeWaliAccount()` di `app.js`).*

### 6.2 Notifikasi

| Pemicu | Penerima | Kanal | Isi singkat |
| --- | --- | --- | --- |
| Profil berhasil disimpan | Wali Murid (pengirim) | In-app toast | "✓ Profil berhasil disimpan" |
| Pengajuan pindah sekolah terkirim | Wali Murid (pengirim) | In-app toast | Konfirmasi pengajuan terkirim, jumlah cicilan yang dihapus buku, dan nominal tunggakan yang tetap harus dilunasi |
| Pengajuan pindah sekolah baru | Tata Usaha / Bendahara (disarankan) | Email/Dashboard Portal Sekolah (belum diimplementasi) | Pemberitahuan ada pengajuan pindah sekolah baru yang perlu ditindaklanjuti |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Validasi input | Pengajuan pindah sekolah tidak dapat dikirim tanpa Tanggal Efektif Pindah, dan tidak dapat dikirim tanpa Rencana Pelunasan Tunggakan apabila ada tunggakan | 100% pengajuan tervalidasi sebelum tersimpan |
| NFR-02 | Konsistensi status | Status anak ("Aktif"/"Pindah Sekolah") harus konsisten di seluruh halaman yang menampilkannya (Profil, sheet Ajukan Pindah Sekolah) | 100% konsisten antar tampilan |
| NFR-03 | Keamanan sesi | Halaman Profil hanya dapat diakses oleh Wali Murid dengan sesi login aktif | 100% enforced via `requireLogin()` di setiap pemuatan halaman |
| NFR-04 | Performa | Waktu render daftar anak & kalkulasi tunggakan saat sheet dibuka | < 1 detik untuk &le; 10 anak per akun |
| NFR-05 | Auditability | Setiap pengajuan pindah sekolah tercatat dengan id unik, childId, tanggal, dan nominal tunggakan terkait | 100% pengajuan tercatat lengkap di `pindahSekolahData` |

---

## 8. Alur Pengguna & Desain

- Alur utama (data pribadi): Login &rarr; (mendarat di halaman Bayar, lihat catatan) &rarr; buka menu "Profil" lewat bottom navigation &rarr; ubah field Data Pribadi dan/atau Preferensi Pengingat &rarr; "Simpan Perubahan" &rarr; toast konfirmasi.
- Alur pindah sekolah: menu Profil &rarr; bagian Data Anak &rarr; tekan "Ajukan Pindah Sekolah" pada anak berstatus Aktif &rarr; tinjau info tunggakan (jika ada) &rarr; isi Rencana Pelunasan Tunggakan (wajib jika ada tunggakan) &rarr; isi Tanggal Efektif Pindah (wajib) &rarr; isi Sekolah Tujuan/Catatan (opsional) &rarr; "Ajukan Pindah Sekolah" &rarr; toast konfirmasi berisi ringkasan cicilan yang dihapus buku & tunggakan yang tetap harus dilunasi &rarr; status anak berubah menjadi "Pindah Sekolah" di daftar Data Anak.
- Catatan alur: pada routing SSO saat ini (`routeWaliAccount()`), akun berstatus aktif diarahkan langsung ke halaman **Bayar** setelah login, bukan ke Profil -- Wali Murid harus membuka menu "Profil" secara manual lewat bottom navigation.
- Wireframe: mengikuti struktur `profil.html` -- header dengan child-switch, kartu ringkasan identitas Wali Murid, kartu Data Pribadi, kartu Preferensi Pengingat, kartu Data Anak, tombol Simpan & Keluar, serta bottom sheet "Ajukan Pindah Sekolah" yang muncul dari bawah.
- Edge case yang wajib ditangani: anak tanpa tunggakan (field rencana pelunasan disembunyikan), anak dengan beberapa invoice tunggakan sekaligus (daftar & total ditampilkan lengkap), anak yang sudah berstatus "Pindah Sekolah" (tombol pengajuan tidak tampil lagi), akun dengan No. HP Alternatif kosong (field opsional, tidak divalidasi wajib).

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Portal Sekolah (modul Approval Write-off) | Penerima data pengajuan pindah sekolah & (pada proses produksi) pihak yang memproses persetujuan write-off | Internal (shared data store) | [ ] | [ ] |
| Halaman Bayar & Riwayat (aplikasi ini) | Konsumen status anak (Aktif/Pindah Sekolah) & status invoice (`sent`/`writeoff`/`escalated`) yang diubah dari alur pindah sekolah | Internal (shared data store) | [ ] | [ ] |
| Daftar Konfirmasi Pembayaran (tab Riwayat) | Penerima entri "Rencana Bayar" otomatis dari pengajuan pindah sekolah, dipantau Bendahara | Internal (shared data store) | [ ] | [ ] |
| Laporan Pindah Sekolah & Tunggakan (Admin Pusat) | Konsumen agregat data pengajuan pindah sekolah lintas sekolah untuk kebutuhan laporan pusat | Internal (shared data store) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: `Guardian` (nama, inisial, relasi, wa, hpAlt, email, pekerjaan, tanggalPengingat, status, metode), `Child` (id, nama, nis, kelas, sekolah, status), `Invoice` (id, childId, jenis, periode, nominal, jatuhTempo, status), `PengajuanPindahSekolah` (id, childId, tanggal, sekolahTujuan, catatan, tunggakanNominal, rencanaBayarTunggakan, status).
- Tidak ada migrasi khusus -- struktur data mengikuti objek `guardian`, `children`, `invoices`, dan `pindahSekolahData` di `app.js` pada prototipe ini.
- Retensi data: data pengajuan pindah sekolah & tunggakan terkait disimpan selama histori keuangan sekolah masih relevan untuk audit (rekomendasi minimal 5 tahun, perlu konfirmasi kebijakan retensi klien).
- Data saat ini bersifat snapshot dalam memori JavaScript (bukan database/API produksi) -- hilang saat sesi browser berakhir.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Satu anak hanya memiliki maksimal satu pengajuan pindah sekolah aktif (tidak ada alur pembatalan/pengajuan ulang pada fase ini).
- Field Pekerjaan digunakan sebagai konteks tambahan bagi sekolah saat meninjau pengajuan keringanan biaya, bukan untuk kebutuhan lain.
- Status anak "Pindah Sekolah" bersifat final pada prototipe ini (tidak ada jalur untuk mengembalikan anak menjadi "Aktif" kembali).

**Batasan:**

- Data bersifat snapshot read-only dalam memori JavaScript, belum terhubung ke API/database produksi.
- Belum ada halaman riwayat/status pengajuan pindah sekolah bagi Wali Murid untuk memantau tindak lanjutnya di Portal Sekolah.
- Perubahan data pribadi tidak memiliki riwayat/log perubahan (tidak ada audit trail siapa mengubah apa & kapan).

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Pada prototipe ini, pengajuan pindah sekolah langsung memicu write-off otomatis tanpa approval terpisah. Apakah di produksi proses ini tetap perlu persetujuan Kepala Sekolah (sesuai status "Menunggu Persetujuan"/"Disetujui" di Portal Sekolah, lihat PRD Laporan Pindah Sekolah & Tunggakan)? Jika perlu, bagaimana status pengajuan ditampilkan ke Wali Murid selama menunggu? | PO klien | [DD-MM-YYYY] | [ ] |
| 2 | Field "Hubungan dengan Siswa" dan "No. HP Alternatif" saat ini tidak ikut tersimpan saat menekan "Simpan Perubahan" (lihat FR-01) -- apakah ini disengaja (field tersebut memang read-only) atau perlu diperbaiki agar tersimpan? | PO klien / Tech Lead | [DD-MM-YYYY] | [ ] |
| 3 | Apakah Wali Murid perlu mendapat notifikasi tertulis (WA/email) setelah pengajuan pindah sekolah terkirim, di luar toast dalam aplikasi? | PO klien | [DD-MM-YYYY] | [ ] |
| 4 | Apakah diperlukan alur pembatalan/penarikan kembali pengajuan pindah sekolah yang sudah terkirim, sebelum diproses sekolah? | PO klien | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Pengajuan pindah sekolah memicu write-off otomatis tanpa approval sekolah, berisiko disalahgunakan atau salah input oleh Wali Murid | H | M | Tambahkan langkah persetujuan Kepala Sekolah/Tata Usaha di Portal Sekolah sebelum write-off final diterapkan pada invoice produksi (lihat Pertanyaan Terbuka No. 1) | [ ] |
| Field Hubungan dengan Siswa & No. HP Alternatif tidak tersimpan membuat Wali Murid mengira data sudah diperbarui padahal belum | M | H | Perbaiki binding `saveProfile()` agar seluruh field pada form Data Pribadi ikut tersimpan, atau jadikan field tersebut read-only secara eksplisit di UI | [ ] |
| Tidak ada alur pembatalan pengajuan pindah sekolah -- kesalahan input tanggal/sekolah tujuan tidak bisa dikoreksi sendiri oleh Wali Murid | M | M | Sediakan kanal bantuan (hubungi Tata Usaha) yang jelas di halaman konfirmasi, atau tambahkan alur edit/batal pada iterasi berikutnya | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Mockup & struktur data final | [ ] | Review SA & klien |
| Development | Data Pribadi, Preferensi Pengingat, Data Anak, Ajukan Pindah Sekolah | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| Write-off / Hapus Buku | Penghapusan tagihan yang tidak bisa ditagih lagi, umumnya karena siswa pindah sekolah |
| Tunggakan | Tagihan yang sudah jatuh tempo (`escalated`/`overdue`) namun belum dibayar |
| Rencana Pelunasan Tunggakan | Tanggal yang dijanjikan Wali Murid untuk melunasi tunggakan meski anak sudah pindah sekolah |
| Child-switch | Komponen pada header aplikasi untuk berpindah konteks anak aktif pada akun dengan lebih dari satu anak |
| Status Pindah Sekolah | Status anak setelah pengajuan pindah sekolah berhasil dikirim; cicilan belum jatuh tempo otomatis dihapus buku, cicilan jatuh tempo tetap wajib dilunasi |

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
