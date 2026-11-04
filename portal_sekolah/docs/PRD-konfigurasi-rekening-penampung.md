# PRD: Konfigurasi Rekening Penampung (Portal Sekolah)

## 1. Informasi Dokumen

| Atribut             | Isi                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------- |
| Nama produk / fitur  | Konfigurasi Rekening Penampung -- tab "Rekening Penampung" pada menu Konfigurasi            |
| Aplikasi             | Portal Sekolah -- Platform Invoicing & Payment SPP (GeekGarden)                             |
| Lingkup pengguna     | Satu sekolah (SD Muhammadiyah 4 Sidoarjo), tidak memengaruhi sekolah lain                    |
| Versi dokumen        | v1.1                                                                                        |
| Status               | Draft                                                                                        |
| Penulis              | Tim Produk GeekGarden                                                                       |
| Tanggal dibuat        | 02-11-2026                                                                                  |
| Dokumen sumber kode   | `konfigurasi.html` (tab `rekening`), `app.js` (fungsi `renderRekeningTable`, `openRekeningPanel`, `saveRekening`, `toggleRekeningStatus`, `setRekeningUtama`, `removeRekening`, `handleRekBankChange`) |
| Dokumen terkait       | PRD Konfigurasi Sistem (Admin Pusat) -- rekening penampung pusat & VA, berbeda lingkup dengan dokumen ini |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                                                                                                                       |
| ----- | ---------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| v1.0  | 02-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan implementasi prototipe terkini: field Jadwal Disbursement dan Kanal VA dihapus dari tab ini; status rekening disederhanakan menjadi dua nilai (Aktif/Nonaktif) dengan dukungan lebih dari satu rekening aktif sekaligus; ditambahkan tombol toggle Aktifkan/Nonaktifkan per baris. |
| v1.1  | 02-11-2026 | Tim Produk GeekGarden | Menambahkan field teks "Nama Bank Lainnya" yang muncul saat dropdown Nama Bank diisi "Lainnya"; nilai teks ini yang disimpan sebagai Nama Bank rekening (lihat FR-03, FR-14, BR-01a). |

---

## 2. Pendahuluan

### 2.1 Tujuan Dokumen

Dokumen ini menetapkan kebutuhan fungsional dan non-fungsional untuk fitur **Konfigurasi Rekening Penampung** di level sekolah pada Portal Sekolah, sebagai acuan bagi tim Desain, Developer, dan QA pada tahap implementasi dan pengujian.

### 2.2 Lingkup Produk

Fitur ini memungkinkan pengguna sekolah (Bendahara/Admin Sekolah/Kepala Sekolah sesuai hak akses) mencatat satu atau lebih rekening bank milik sekolah sebagai **data referensi tujuan pencairan dana (disbursement)**. Data ini bersifat **informasi saja** -- proses pencairan dana yang sesungguhnya dilakukan **secara manual oleh admin Muhammadiyah Pusat**, di luar sistem ini. Fitur ini **tidak** mengatur kanal Virtual Account (VA) pembayaran yang dilihat wali murid saat membayar tagihan (itu adalah tanggung jawab modul Konfigurasi Sistem di Admin Pusat) dan **tidak** mengatur jadwal otomatis pencairan dana.

### 2.3 Definisi, Akronim, Singkatan

| Istilah              | Arti                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| Rekening Penampung     | Rekening bank milik sekolah yang dicatat sebagai tujuan pencairan dana SPP                           |
| Disbursement           | Proses pencairan dana dari penampungan pusat ke rekening sekolah -- dilakukan manual oleh admin Muhammadiyah |
| Rekening Utama         | Satu rekening yang ditandai sebagai tujuan pencairan aktif saat ini di antara seluruh rekening sekolah |
| Status Aktif/Nonaktif  | Status penggunaan rekening; tidak eksklusif -- boleh lebih dari satu rekening berstatus Aktif         |
| VA (Virtual Account)   | Kanal pembayaran yang dilihat wali murid saat membayar -- di luar lingkup fitur ini                    |

### 2.4 Referensi

- `konfigurasi.html` -- markup tab `data-ptabpanel="rekening"`.
- `app.js` -- bagian "KONFIGURASI SEKOLAH -- Rekening Penampung".
- PRD Konfigurasi Sistem (Admin Pusat), bagian Rekening Bank Penampung Pusat & VA -- sebagai pembanding lingkup yang **tidak** ditangani dokumen ini.

### 2.5 Ikhtisar Dokumen

Bagian 3 menjelaskan deskripsi umum, bagian 4 kebutuhan fungsional rinci per aksi, bagian 5 aturan bisnis & validasi, bagian 6 model data, bagian 7 kebutuhan antarmuka, bagian 8 kebutuhan non-fungsional, bagian 9 batasan & asumsi, dan bagian 10 pertanyaan terbuka.

---

## 3. Deskripsi Umum

### 3.1 Perspektif Produk

Tab ini adalah salah satu dari tiga tab pada menu "Konfigurasi" di Portal Sekolah (bersama "Aturan Reminder" dan "Template Pesan"), diakses lewat `konfigurasi.html?tab=rekening`. Data tersimpan di memori sisi klien (array `rekeningPenampungData` pada `app.js`) pada prototipe ini -- lihat Batasan (bagian 9).

### 3.2 Fungsi Produk (Ringkasan)

1. Menampilkan daftar rekening penampung milik sekolah dengan filter & pencarian.
2. Menambah rekening penampung baru.
3. Mengubah data rekening penampung yang sudah ada.
4. Mengaktifkan / menonaktifkan status rekening (boleh lebih dari satu rekening Aktif).
5. Menandai satu rekening sebagai "Utama" (tujuan pencairan aktif).
6. Menghapus rekening penampung.

### 3.3 Karakteristik Pengguna

| Peran (RBAC `data-rbac`) | Interaksi dengan fitur ini                                           |
| --------------------------- | --------------------------------------------------------------------- |
| Admin Sekolah / Bendahara   | Pengguna utama -- menambah, mengubah, mengaktifkan/menonaktifkan, menghapus, dan menetapkan rekening utama |
| Kepala Sekolah              | Dapat melihat daftar rekening sebagai referensi/pengawasan             |
| Admin Muhammadiyah (di luar Portal Sekolah) | Melakukan pencairan dana secara manual berdasarkan data rekening yang tercatat di sini -- tidak mengakses tab ini langsung |

### 3.4 Batasan Umum

- Data rekening di tab ini **tidak otomatis memicu transfer dana apa pun** -- murni pencatatan referensi.
- Minimal harus selalu ada 1 rekening penampung tercatat (tidak boleh dihapus sampai kosong).
- Tab ini tidak menampilkan atau mengatur Kanal VA pembayaran maupun Jadwal Disbursement -- kedua hal tersebut sudah dihilangkan dari lingkup tab ini.

### 3.5 Asumsi & Dependensi

- Diasumsikan admin Muhammadiyah memeriksa data rekening ini secara manual (di luar sistem) sebelum melakukan pencairan dana.
- Validasi bank tersedia dari daftar tetap: BCA, Mandiri, BNI, BRI, BSI -- Bank Syariah Indonesia, Lainnya.

---

## 4. Kebutuhan Fungsional

| ID     | Nama Fungsi                         | Deskripsi                                                                                                                   | Prioritas |
| ------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | --------- |
| FR-01  | Lihat Daftar Rekening Penampung      | Sistem menampilkan tabel berisi Bank, No. Rekening, Nama Pemilik, Status Verifikasi (Aktif/Nonaktif), dan Aksi, dengan penanda `UTAMA` pada bank rekening yang berstatus utama | Must      |
| FR-02  | Cari & Filter Rekening                | Sistem menyediakan input pencarian (nama pemilik / nomor rekening), filter Bank, dan filter Status (Semua/Aktif/Nonaktif), yang langsung memperbarui tabel saat diubah | Must      |
| FR-03  | Tambah Rekening Penampung            | Sistem menyediakan tombol "+ Tambah Rekening" yang membuka panel form berisi Nama Bank (dropdown), Nomor Rekening, Nama Pemilik Rekening, dan toggle "Jadikan rekening utama". Jika Nama Bank diisi "Lainnya", sistem menampilkan field teks tambahan "Nama Bank Lainnya" untuk menuliskan nama bank yang sebenarnya (lihat FR-14) | Must      |
| FR-04  | Simpan Rekening Baru                  | Saat tombol "Simpan" ditekan pada mode tambah, sistem memvalidasi input (lihat bagian 5), lalu menyimpan rekening baru dengan status awal **Aktif** | Must      |
| FR-05  | Ubah Rekening Penampung              | Tombol edit (✎) pada setiap baris membuka panel form yang sama dalam mode edit, terisi data rekening terkait (Bank, No. Rekening, Nama Pemilik, status Utama); status Aktif/Nonaktif tidak diubah lewat form ini | Must      |
| FR-06  | Aktifkan / Nonaktifkan Rekening       | Setiap baris memiliki tombol toggle: "Nonaktifkan" jika status saat ini Aktif, atau "Aktifkan" jika status saat ini Nonaktif. Menekan tombol membalik status rekening tersebut saja, tanpa memengaruhi status rekening lain | Must      |
| FR-07  | Lebih dari Satu Rekening Aktif        | Sistem **tidak membatasi** jumlah rekening berstatus Aktif -- beberapa rekening boleh Aktif secara bersamaan                 | Must      |
| FR-08  | Tandai Rekening Utama                 | Tombol "Jadikan Utama" pada baris yang belum utama akan menjadikan rekening tersebut sebagai satu-satunya rekening berstatus utama (rekening utama sebelumnya otomatis tidak lagi utama) | Must      |
| FR-09  | Cegah Nonaktifkan Rekening Utama      | Jika pengguna menekan "Nonaktifkan" pada rekening yang sedang berstatus Utama, sistem menolak aksi dan menampilkan pesan agar pengguna memindahkan status utama ke rekening lain terlebih dahulu | Must      |
| FR-10  | Hapus Rekening Penampung             | Tombol hapus (✕) menghapus rekening dari daftar; jika rekening yang dihapus adalah rekening utama, sistem otomatis menjadikan rekening pertama yang tersisa sebagai utama | Must      |
| FR-11  | Minimal Satu Rekening                 | Sistem menolak penghapusan rekening terakhir (jumlah rekening tersisa = 0) dan menampilkan pesan "Minimal harus ada 1 rekening penampung" | Must      |
| FR-12  | Cegah Duplikasi Rekening              | Sistem menolak penyimpanan jika kombinasi Bank + Nomor Rekening sudah terdaftar pada rekening lain, dan menampilkan pesan kesalahan | Must      |
| FR-13  | Konteks Informasi (Disclaimer)        | Sistem menampilkan teks penjelasan tetap pada bagian atas tab: data rekening hanya bersifat informasi, pencairan dana tetap dilakukan manual oleh admin Muhammadiyah | Must      |
| FR-14  | Nama Bank Lainnya                     | Saat opsi "Lainnya" dipilih pada dropdown Nama Bank, sistem menampilkan field teks "Nama Bank Lainnya" yang wajib diisi (minimal 3 karakter); nilai yang diketik pada field ini disimpan dan ditampilkan sebagai Nama Bank rekening tersebut (bukan literal "Lainnya"). Saat mode edit dibuka untuk rekening dengan nama bank kustom, dropdown otomatis terpilih "Lainnya" dan field ini terisi ulang dengan nama bank yang tersimpan | Must      |

### 4.1 Skenario Penggunaan Utama (Use Case)

**UC-01 -- Menambah rekening penampung baru**
1. Pengguna membuka tab "Rekening Penampung".
2. Pengguna menekan "+ Tambah Rekening".
3. Sistem menampilkan panel form kosong dengan judul "Tambah Rekening Penampung".
4. Pengguna mengisi Nama Bank (jika memilih "Lainnya", field teks "Nama Bank Lainnya" muncul dan wajib diisi), Nomor Rekening, Nama Pemilik Rekening, dan (opsional) mencentang "Jadikan rekening utama".
5. Pengguna menekan "Simpan".
6. Sistem memvalidasi input; jika valid, rekening baru ditambahkan dengan status Aktif, panel ditutup, tabel diperbarui, dan toast "✓ Rekening Penampung berhasil disimpan" ditampilkan.

**UC-02 -- Menonaktifkan rekening yang bukan utama**
1. Pengguna menekan tombol "Nonaktifkan" pada baris rekening yang bukan utama.
2. Sistem mengubah status rekening tersebut menjadi Nonaktif.
3. Tabel diperbarui; tombol pada baris tersebut berganti menjadi "Aktifkan"; toast konfirmasi ditampilkan.

**UC-03 -- Mencoba menonaktifkan rekening utama (ditolak)**
1. Pengguna menekan tombol "Nonaktifkan" pada baris rekening yang berstatus Utama.
2. Sistem menolak aksi dan menampilkan toast: "Rekening utama tidak bisa dinonaktifkan -- jadikan rekening lain sebagai utama terlebih dahulu".
3. Status rekening tidak berubah.

**UC-04 -- Memindahkan rekening utama**
1. Pengguna menekan "Jadikan Utama" pada rekening lain (bukan utama saat ini).
2. Sistem menjadikan rekening tersebut sebagai satu-satunya rekening utama; rekening utama sebelumnya kehilangan penanda `UTAMA` (status Aktif/Nonaktif-nya tidak berubah).
3. Toast "✓ [Bank] dijadikan rekening utama" ditampilkan.

**UC-05 -- Menghapus rekening**
1. Pengguna menekan tombol hapus (✕) pada sebuah baris.
2. Jika jumlah rekening saat ini lebih dari 1, sistem menghapus baris tersebut; jika baris yang dihapus adalah rekening utama, sistem otomatis menjadikan rekening pertama yang tersisa sebagai utama.
3. Jika jumlah rekening saat ini hanya 1, sistem menolak penghapusan dan menampilkan toast peringatan.

---

## 5. Aturan Bisnis & Validasi

| ID     | Aturan                                                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------------------- |
| BR-01  | Nama Bank wajib dipilih dari daftar tetap (BCA, Mandiri, BNI, BRI, BSI -- Bank Syariah Indonesia, Lainnya)             |
| BR-01a | Jika Nama Bank dipilih "Lainnya", field teks "Nama Bank Lainnya" wajib diisi minimal 3 karakter; nilai inilah yang disimpan sebagai Nama Bank rekening (lihat FR-14) |
| BR-02  | Nomor Rekening wajib berupa digit saja, panjang 6-20 karakter                                                        |
| BR-03  | Nama Pemilik Rekening wajib minimal 3 karakter                                                                       |
| BR-04  | Kombinasi Bank + Nomor Rekening harus unik di antara seluruh rekening sekolah ini                                    |
| BR-05  | Hanya satu rekening yang boleh berstatus "Utama" pada satu waktu; menandai rekening lain sebagai utama otomatis melepas status utama dari rekening sebelumnya |
| BR-06  | Status Aktif/Nonaktif **tidak eksklusif** -- boleh lebih dari satu rekening berstatus Aktif secara bersamaan         |
| BR-07  | Rekening yang berstatus Utama tidak dapat dinonaktifkan secara langsung; harus memindahkan status utama ke rekening lain dahulu |
| BR-08  | Jumlah rekening penampung tidak boleh menjadi 0 -- penghapusan rekening terakhir ditolak                              |
| BR-09  | Rekening baru yang ditambahkan selalu berawal dengan status Aktif                                                    |
| BR-10  | Jika tidak ada rekening yang ditandai utama setelah suatu operasi (mis. rekening utama dihapus), sistem otomatis menjadikan rekening pertama dalam daftar sebagai utama |

### 5.1 Rekomendasi Validasi per Field (Form Tambah/Edit Rekening)

Rincian aturan input untuk setiap field pada panel form `#rekening-panel`, sebagai acuan implementasi validasi front-end maupun back-end.

| Field                   | Elemen                 | Wajib?                                          | Tipe Karakter                                                              | Panjang Min | Panjang Maks            | Catatan Validasi                                                                                  |
| ------------------------ | ----------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- | ----------- | ------------------------- | ---------------------------------------------------------------------------------------------------- |
| Nama Bank                | `#rek-bank`             | Ya                                               | Enum (dropdown daftar tetap, bukan free text)                               | --          | --                        | Harus salah satu dari: BCA, Mandiri, BNI, BRI, BSI -- Bank Syariah Indonesia, Lainnya (lihat BR-01) |
| Nama Bank Lainnya        | `#rek-bank-lainnya`     | Ya, kondisional -- hanya saat Nama Bank = "Lainnya" | Alphanumerik (huruf, angka, spasi, dan tanda baca umum `. - &`)            | 3           | 50 (rekomendasi)          | Nilai inilah yang disimpan sebagai Nama Bank rekening (lihat BR-01a); tidak boleh hanya berisi spasi |
| Nomor Rekening           | `#rek-norek`            | Ya                                               | Numerik (digit 0-9 saja, tanpa spasi/simbol)                                 | 6           | 20                        | Regex `^\d{6,20}$`; kombinasi dengan Nama Bank harus unik (lihat BR-02, BR-04)                       |
| Nama Pemilik Rekening    | `#rek-nama`             | Ya                                               | Alphanumerik (huruf, angka, spasi, dan tanda baca umum `. - &` untuk nama badan/yayasan) | 3           | 100 (rekomendasi)         | Tidak boleh hanya berisi spasi atau karakter simbol saja (lihat BR-03)                               |
| Jadikan Rekening Utama   | `#rek-utama`            | Tidak (opsional)                                | Boolean (toggle aktif/nonaktif)                                             | --          | --                        | Default tidak tercentang; jika dicentang, melepas status utama dari rekening lain (lihat BR-05)      |

---

## 6. Kebutuhan Data (Model Entitas)

**Entitas: `RekeningPenampung`**

Tipe data, kewajiban pengisian, tipe karakter, serta panjang min/maks pada tabel di bawah ini disamakan dengan bagian 5.1 Rekomendasi Validasi per Field, supaya aturan input di form dan skema data entitas selalu konsisten.

| Field              | Tipe Data | Wajib Diisi Pengguna?                                              | Tipe Karakter                                                                          | Panjang Min        | Panjang Maks                  | Keterangan                                                                                       |
| ------------------- | --------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `id`                | integer   | Tidak (dibuat sistem)                                                 | Numerik (auto-increment)                                                                 | --                   | --                                | Pengenal unik, auto-increment per sekolah                                                             |
| `bank`              | string    | Ya                                                                     | Enum (dropdown daftar tetap), atau Alphanumerik saat diisi lewat field "Nama Bank Lainnya" | 3 (jika "Lainnya")  | 50 (jika "Lainnya", rekomendasi) | Salah satu dari daftar tetap bank, atau nama bank kustom hasil input "Nama Bank Lainnya" (lihat BR-01, BR-01a, 5.1) |
| `noRekening`        | string    | Ya                                                                     | Numerik (digit 0-9 saja, tanpa spasi/simbol)                                              | 6                    | 20                                | Regex `^\d{6,20}$`; unik per kombinasi dengan `bank` (lihat BR-02, BR-04, 5.1)                         |
| `namaPemilik`       | string    | Ya                                                                     | Alphanumerik (huruf, angka, spasi, dan tanda baca umum `. - &` untuk nama badan/yayasan)   | 3                    | 100 (rekomendasi)                | Tidak boleh hanya berisi spasi atau karakter simbol saja (lihat BR-03, 5.1)                            |
| `statusVerifikasi`  | enum      | Tidak (diatur sistem)                                                  | Enum                                                                                      | --                   | --                                | `aktif` \| `nonaktif` -- default `aktif` saat dibuat; tidak eksklusif                                 |
| `utama`             | boolean   | Tidak langsung -- hasil toggle opsional "Jadikan Rekening Utama" pada form | Boolean                                                                               | --                   | --                                | Hanya satu rekening per sekolah yang bernilai `true` (lihat BR-05, 5.1)                               |

Catatan: field `jadwalDisbursement` dan `vaAktif` yang pernah ada pada iterasi sebelumnya **sudah dihapus** dari entitas ini -- jadwal pencairan dan kanal VA tidak lagi menjadi tanggung jawab tab ini.

---

## 7. Kebutuhan Antarmuka

### 7.1 Antarmuka Pengguna

- Tabel `#rekening-table` menampilkan kolom: Bank (dengan badge `UTAMA` bila relevan), No. Rekening, Nama Pemilik, Status Verifikasi (badge hijau "Aktif" / abu-abu "Nonaktif"), dan Aksi.
- Kolom Aksi tiap baris berisi: ikon Edit (✎), ikon Hapus (✕), tombol toggle Aktifkan/Nonaktifkan, dan tombol "Jadikan Utama" (hanya tampil jika baris tersebut belum utama).
- Panel form (`#rekening-panel`) tampil/sembunyi secara inline di bawah tabel, dengan judul yang berubah sesuai mode ("Tambah Rekening Penampung" / "Edit Rekening Penampung").
- Field teks "Nama Bank Lainnya" (`#rek-bank-lainnya-wrap`) tersembunyi secara default, dan hanya tampil saat dropdown Nama Bank (`#rek-bank`) bernilai "Lainnya".
- Teks penjelasan (`card-desc`) selalu tampil di atas tabel, menegaskan sifat informasi-saja data ini.

### 7.2 Antarmuka Internal (Fungsi JavaScript)

| Fungsi                      | Tanggung jawab                                                     |
| ----------------------------- | ---------------------------------------------------------------------- |
| `renderRekeningTable()`       | Membangun ulang isi tabel berdasarkan data, filter, dan pencarian saat ini |
| `fillRekeningBankFilter()`    | Mengisi opsi dropdown filter Bank secara dinamis dari `BANK_OPTIONS`   |
| `handleRekBankChange()`       | Menampilkan/menyembunyikan field "Nama Bank Lainnya" berdasarkan nilai dropdown Nama Bank saat ini, dan mengosongkan isinya saat dropdown bukan "Lainnya" |
| `openRekeningPanel(idx?)`     | Membuka panel form dalam mode tambah (tanpa argumen) atau edit (dengan index). Pada mode edit, jika Nama Bank rekening tersimpan di luar daftar tetap (`BANK_OPTIONS`), dropdown otomatis diset ke "Lainnya" dan field "Nama Bank Lainnya" diisi ulang dengan nama bank tersimpan |
| `closeRekeningPanel()`        | Menyembunyikan panel form                                              |
| `saveRekening()`              | Memvalidasi dan menyimpan data dari form (tambah atau simpan perubahan edit) |
| `toggleRekeningStatus(idx)`   | Membalik status Aktif/Nonaktif rekening pada index tertentu, dengan guard untuk rekening utama |
| `setRekeningUtama(idx)`       | Menetapkan satu rekening sebagai utama, melepas status utama rekening lain |
| `removeRekening(idx)`         | Menghapus rekening pada index tertentu, dengan guard minimal 1 rekening |

---

## 8. Kebutuhan Non-Fungsional

| ID     | Kategori       | Requirement                                                                                       | Target terukur                          |
| ------ | --------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| NFR-01 | Validasi        | Seluruh input form divalidasi sebelum data tersimpan (lihat bagian 5)                                   | 100% percobaan simpan tidak valid ditolak |
| NFR-02 | Usability        | Perubahan status (toggle Aktif/Nonaktif, Jadikan Utama, Hapus) langsung tercermin di tabel tanpa reload halaman | Update tabel < 100ms setelah aksi         |
| NFR-03 | Feedback         | Setiap aksi simpan/ubah status/hapus menampilkan toast konfirmasi atau pesan kesalahan yang jelas        | 100% aksi memberi feedback visual         |
| NFR-04 | Konsistensi data | Status "Utama" harus selalu unik (maksimal satu `true`) dan selalu ada (minimal satu rekening) setelah setiap operasi | 100% invariant terjaga setelah setiap aksi |
| NFR-05 | Auditability     | Perubahan status Aktif/Nonaktif dan rekening utama idealnya tercatat pelaku & waktu (lihat Pertanyaan Terbuka No. 1) | -- (belum diimplementasikan di prototipe) |

---

## 9. Batasan & Asumsi

**Batasan:**

- Pada prototipe saat ini, data rekening penampung disimpan di memori sisi klien (`rekeningPenampungData` dalam `app.js`) dan akan hilang saat halaman dimuat ulang -- belum terhubung ke backend/database permanen.
- Tab ini tidak melakukan validasi atau pengecekan apa pun terhadap proses pencairan dana aktual; proses tersebut murni manual dan berada di luar sistem Portal Sekolah.
- Tidak ada riwayat perubahan (audit trail) yang ditampilkan di UI untuk perubahan rekening, status, atau kepemilikan utama.

**Asumsi:**

- Admin Muhammadiyah memverifikasi kebenaran data rekening secara manual (di luar sistem) sebelum melakukan pencairan dana ke rekening tersebut.
- Status "Aktif" pada rekening tidak berarti rekening tersebut sedang menerima pencairan -- hanya menandai rekening tersebut masih berlaku/dipakai sekolah; penentuan tujuan pencairan yang sesungguhnya mengacu pada rekening berstatus "Utama".

---

## 10. Pertanyaan Terbuka

| No  | Pertanyaan                                                                                               | Ditujukan ke        | Jawaban |
| --- | ------------------------------------------------------------------------------------------------------------ | --------------------- | ------- |
| 1   | Apakah perlu audit log (pelaku & waktu) untuk setiap perubahan status Aktif/Nonaktif dan penetapan rekening Utama? | Product Owner klien   | [ ]     |
| 2   | Apakah admin Muhammadiyah memerlukan tampilan tersendiri untuk melihat seluruh rekening penampung antar sekolah sebagai referensi pencairan dana, atau cukup lewat sistem di luar Portal Sekolah? | Solution Architect     | [ ]     |
| 3   | Apakah data rekening di tab ini perlu persetujuan (approval) dari admin Muhammadiyah sebelum berlaku, atau cukup tercatat langsung oleh sekolah? | Product Owner klien   | [ ]     |

---

## 11. Glosarium

| Istilah   | Arti                                                                               |
| ---------- | --------------------------------------------------------------------------------------- |
| Disbursement | Pencairan dana dari penampungan pusat ke rekening sekolah, dilakukan manual oleh admin Muhammadiyah |
| Utama      | Status pada satu rekening yang menandainya sebagai tujuan pencairan dana aktif saat ini |
| Aktif/Nonaktif | Status pemakaian rekening; tidak eksklusif, bisa lebih dari satu rekening Aktif    |
