# PRD: Pengguna

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | ------------------------------------------------------------------------- |
| Nama produk / fitur | Pengguna (Manajemen Akun Admin Platform)                                  |
| Klien / proyek      | Admin Pusat Muhammadiyah -- Platform Invoicing & Payment SPP (GeekGarden) |
| Versi dokumen       | v0.4                                                                      |
| Status              | Draft                                                                     |
| Penulis             | Tim Produk GeekGarden                                                     |
| Product Owner       | [Nama PO Klien]                                                           |
| Solution Architect  | [Nama SA]                                                                 |
| Tanggal dibuat      | 25-10-2026                                                                |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                   |
| Dokumen terkait     | `pengguna.html`, `app.js`, PRD Role & Hak Akses, PRD Manajemen Sekolah    |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                                                                          |
| ----- | ---------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| v0.1  | 25-10-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `pengguna.html` (dipisah dari halaman RBAC & Pengguna sebelumnya) |
| v0.2  | 08-11-2026 | Tim Produk GeekGarden | Sinkronisasi dengan prototipe terkini & riset struktur organisasi PWM/PDM/PCM: (1) model edit diperjelas sebagai **panel Tambah/Edit per pengguna** (bukan tabel inline-editable), fitur hapus baris dihapus dari lingkup -- siklus hidup akun cukup lewat status Aktif/Nonaktif; (2) status pengguna baru ditambah **"Menunggu Aktivasi"**, dengan simulasi kirim email aktivasi & simulasi klik link aktivasi; (3) field **Cakupan** diubah dari teks bebas menjadi **dropdown bertingkat** -- Level (Pusat/Wilayah (PWM)/Daerah (PDM)/Cabang (PCM)) yang menampilkan dropdown PWM/PDM/PCM secara kumulatif sesuai level; (4) role **"Admin Wilayah (PWM)"** diganti nama jadi **"Admin"**, **"Staff Keuangan Pusat"** jadi **"Staff Keuangan"**, role **"Viewer (Read-only)" dihapus**; (5) dropdown Role di panel ini **tidak menawarkan "Super Admin"** (kecuali pengguna yang diedit memang sudah Super Admin), untuk mencegah elevasi role secara sembarangan. |
| v0.3  | 08-11-2026 | Tim Produk GeekGarden | Menambahkan penegakan **Hierarchical Data Access** khusus untuk modul Pengguna ini (FR-09, FR-10): (1) jika suatu role selain Super Admin diberi akses ke modul Pengguna, Daftar Pengguna yang tampil **otomatis dibatasi sesuai Cakupan** akun yang login (Pusat melihat semua, Wilayah/PWM melihat seluruh Daerah & Cabang di bawahnya, Daerah/PDM melihat seluruh Cabang di bawahnya, Cabang/PCM hanya melihat cakupannya sendiri); (2) saat pengguna non-Super-Admin membuka panel "+ Tambah Pengguna", field Level Cakupan & dropdown PWM/PDM/PCM **otomatis terisi dan dinonaktifkan (disabled)** sesuai Cakupan akun yang login, supaya tidak bisa membuat pengguna baru di luar wilayahnya sendiri. |
| v0.4  | 08-11-2026 | Tim Produk GeekGarden | Menambahkan subbagian edukatif **2.6 Struktur Organisasi & Hierarki Cakupan (Pusat → PWM → PDM → PCM)** -- sebelumnya hierarki ini hanya tersirat lewat definisi individual tiap istilah di Glosarium (bagian 14), tanpa penjelasan eksplisit bagaimana keempat level saling mengandung satu sama lain. Bagian baru ini menjelaskan aturan containment berjenjang (Pusat ⊇ PWM ⊇ PDM ⊇ PCM) sebagai dasar pembaca memahami FR-09/FR-10 dan prinsip **Hierarchical Data Access** sebelum membaca detail requirement-nya. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Fitur Pengguna memungkinkan Super Admin mengelola akun-akun yang bisa login ke portal Admin Pusat Muhammadiyah: menambah pengguna baru (melalui alur aktivasi), mengubah data, mengganti role, mengatur cakupan wilayah (Pusat/PWM/PDM/PCM), dan mengubah status Aktif/Nonaktif. Fitur ini terpisah dari pengaturan Role & Hak Akses supaya pengelolaan "siapa" (Pengguna), "apa haknya" (Role), dan "untuk wilayah mana" (Cakupan) masing-masing jelas tanggung jawabnya.

### 2.2 Problem Statement

**Super Admin** mengalami **kesulitan mengelola siapa saja yang boleh login ke portal Admin Pusat dan peran apa yang mereka pegang** saat **penambahan/penghapusan akses staf dilakukan manual lewat permintaan ke tim teknis**, yang menyebabkan **keterlambatan onboarding staf baru dan risiko akun staf yang sudah tidak aktif tetap bisa login**.

### 2.3 Kondisi Saat Ini (As-Is)

Permintaan akun baru/non-aktif untuk staf Admin Pusat/Wilayah dikirim ke tim backend secara manual, tanpa riwayat terpusat tentang siapa punya akses apa dan sejak kapan.

### 2.4 Kondisi yang Diharapkan (To-Be)

Super Admin dapat membuka menu Pengguna, menekan "+ Tambah Pengguna" untuk membuka panel berisi Nama, Email, Role (tanpa opsi Super Admin), Status, dan Cakupan (Level + dropdown PWM/PDM/PCM sesuai level yang dipilih), lalu menyimpannya. Pengguna baru berstatus "Menunggu Aktivasi" sampai disimulasikan menerima & mengklik link aktivasi. Saat staf keluar, Super Admin cukup mengubah statusnya menjadi Nonaktif -- tanpa keterlibatan tim backend untuk operasi rutin ini.

### 2.5 Kenapa Sekarang?

Dengan role dan hak akses yang kini bisa dikustomisasi (lihat PRD Role & Hak Akses), pengelolaan akun pengguna harus sama fleksibelnya dan dipisahkan sebagai modul mandiri agar tanggung jawabnya jelas dan mudah diaudit.

### 2.6 Struktur Organisasi & Hierarki Cakupan (Pusat → PWM → PDM → PCM)

Sebelum membaca aturan Cakupan (FR-05, FR-09, FR-10), penting untuk memahami bahwa platform ini mengikuti struktur organisasi Muhammadiyah yang **berjenjang murni** dari tingkat nasional sampai kecamatan. Field **Cakupan** pada setiap pengguna selalu merujuk ke salah satu dari 4 level berikut, dan setiap level yang lebih rendah selalu berada tepat di bawah satu induk pada level di atasnya (tidak ada unit yang "melompat" level atau punya dua induk):

| Level Cakupan | Nama Lengkap | Setingkat dengan | Berada di bawah | Contoh |
| --- | --- | --- | --- | --- |
| Pusat | Pimpinan Pusat Muhammadiyah (tersirat, bukan dropdown) | Nasional | -- (level teratas) | Mencakup seluruh PWM/PDM/PCM di Indonesia |
| Wilayah | PWM -- Pimpinan Wilayah Muhammadiyah | Provinsi | Pusat | PWM Jawa Tengah, PWM Jawa Timur, PWM DKI Jakarta |
| Daerah | PDM -- Pimpinan Daerah Muhammadiyah | Kabupaten/Kota | Satu PWM (mis. PWM Jawa Tengah) | PDM Kabupaten Magelang, PDM Kota Magelang |
| Cabang | PCM -- Pimpinan Cabang Muhammadiyah | Kecamatan | Satu PDM (mis. PDM Kabupaten Magelang) | PCM Mungkid, PCM Borobudur (21 PCM di bawah PDM Kabupaten Magelang; 3 PCM di bawah PDM Kota Magelang) |

Diilustrasikan sebagai satu cabang pohon organisasi (contoh nyata dari master data riset, bukan data demo di prototipe):

- **Pusat** (nasional)
  - **PWM Jawa Tengah** (Wilayah)
    - **PDM Kabupaten Magelang** (Daerah) -- membawahi 21 PCM, salah satunya:
      - **PCM Mungkid** (Cabang)
    - **PDM Kota Magelang** (Daerah) -- membawahi 3 PCM
  - PWM lain... (satu PWM per provinsi, dan seterusnya)

Karena hierarkinya bersifat containment berjenjang (Pusat ⊇ PWM ⊇ PDM ⊇ PCM), Cakupan di level yang lebih tinggi secara definisi **sudah mencakup** seluruh unit di level yang lebih rendah di bawahnya. Inilah dasar prinsip **Hierarchical Data Access** (lihat Glosarium, bagian 14): pengguna dengan Cakupan **Wilayah (PWM)** semestinya bisa melihat seluruh **Daerah (PDM)** dan **Cabang (PCM)** di bawah PWM tersebut; pengguna Cakupan **Daerah (PDM)** bisa melihat seluruh **Cabang (PCM)** di bawahnya; dan pengguna Cakupan **Cabang (PCM)** hanya melihat cakupannya sendiri, karena PCM adalah level paling bawah (tidak ada unit lagi di bawahnya). Prinsip inilah yang menjadi dasar aturan FR-09 (pembatasan Daftar Pengguna) dan FR-10 (penguncian Cakupan saat tambah pengguna) pada modul ini -- dan yang perlu ditegakkan secara konsisten juga di modul lain seperti Dashboard/Laporan (lihat Pertanyaan Terbuka #5 & Risiko, bagian 12).

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Memungkinkan Super Admin mengelola akun pengguna platform secara self-service tanpa tiket ke tim teknis.
2. Memastikan setiap pengguna baru otomatis mendapat password default yang aman untuk mode demo, dengan jalur produksi berbasis undangan/reset.
3. Mencegah akun yang sudah tidak relevan (staf keluar/pindah) tetap aktif di platform lewat kontrol status Aktif/Nonaktif.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak menyediakan reset password mandiri oleh pengguna (self-service reset) pada fase ini -- password diatur manual oleh Super Admin (mode demo).
- Tidak mendukung Single Sign-On (SSO) / login via akun organisasi pada fase ini.
- Tidak menyediakan log aktivitas detail per pengguna (login history) dari halaman ini.

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran       | Organisasi                 | RACI | Kepentingan                                  |
| ------------------ | -------------------------- | ---- | -------------------------------------------- |
| Product Owner      | Klien (Muhammadiyah Pusat) | A    | Menyetujui kebijakan password & status akun  |
| Solution Architect | GeekGarden                 | R    | Desain keamanan akun & integrasi dengan RBAC |
| Tech Lead          | GeekGarden                 | R    | Implementasi CRUD pengguna                   |
| QA Lead            | GeekGarden                 | C    | Strategi pengujian validasi form & edge case |
| Super Admin        | Klien                      | R    | Pengguna utama fitur ini                     |

### 4.2 Persona Pengguna

| Persona                                   | Deskripsi                       | Tujuan utama                                  | Pain point                            | Perangkat / kanal   |
| ----------------------------------------- | ------------------------------- | --------------------------------------------- | ------------------------------------- | ------------------- |
| Super Admin                               | Mengelola seluruh akun platform | Menambah/menonaktifkan akun staf dengan cepat | Proses manual lewat tim teknis lambat | Laptop/web          |
| Staf baru (Admin/Staff Keuangan)          | Penerima akun baru              | Bisa login dan langsung bekerja sesuai role   | Menunggu lama untuk mendapat akses    | Email/WhatsApp, web |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini)                                                        | Out of Scope (fase berikutnya / tidak dikerjakan)  |
| ---------------------------------------------------------------------------- | -------------------------------------------------- |
| Daftar pengguna (Nama, Email, Role, Cakupan, Status, Aksi)                   | Reset password self-service oleh pengguna          |
| Tambah pengguna baru lewat panel (otomatis berstatus Menunggu Aktivasi)      | Single Sign-On (SSO)                               |
| Edit nama, email, role, status, dan cakupan pengguna existing lewat panel    | Log aktivitas/login history per pengguna           |
| Cakupan sebagai dropdown bertingkat: Level (Pusat/Wilayah/Daerah/Cabang) + PWM/PDM/PCM sesuai level | Approval berjenjang untuk penambahan pengguna baru |
| Simulasi kirim email aktivasi & simulasi pengguna mengklik link aktivasi     | Notifikasi otomatis email/WA sungguhan (real) saat akun baru dibuat |
| Dropdown Role tidak menawarkan "Super Admin" (kecuali pengguna yg sudah Super Admin) | Hapus pengguna (hard/soft delete) -- lihat FR-05 lama, dicabut dari lingkup |
| Ubah status pengguna: Menunggu Aktivasi / Aktif / Nonaktif                  | Penegakan pembatasan data otomatis berdasarkan Cakupan di modul **lain** seperti Dashboard/Laporan (lihat Asumsi & Risiko) |
| Daftar Pengguna dibatasi sesuai Cakupan akun yang login, untuk role selain Super Admin yang diberi akses modul ini (Hierarchical Data Access) | |
| Cakupan otomatis terisi & dinonaktifkan (disabled) saat non-Super-Admin membuka panel "+ Tambah Pengguna" | |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Daftar pengguna, tambah/edit pengguna lewat panel, pemilihan role (tanpa Super Admin) dari daftar role yang tersedia, cakupan bertingkat PWM/PDM/PCM, ubah status, pembatasan Daftar Pengguna & Cakupan default terkunci sesuai akun yang login.
- **Should have** -- Validasi format email & kelengkapan data sebelum simpan, simulasi email & link aktivasi.
- **Could have** -- Notifikasi aktivasi/nonaktivasi akun yang sungguhan (real, bukan simulasi).
- **Won't have (now)** -- Reset password self-service, SSO, log aktivitas, hapus pengguna, penegakan Cakupan sebagai pembatas data di modul lain (Dashboard/Laporan) & di backend/API.

### 5.3 User Stories

| ID    | User story                                                                                                                                                 | Prioritas | Acceptance criteria                                                                                                                                                                                         |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-01 | Sebagai Super Admin, saya ingin melihat daftar seluruh pengguna beserta role, cakupan, dan statusnya, supaya saya tahu siapa yang punya akses ke platform dan untuk wilayah mana. | Must      | Given saya membuka menu Pengguna, When halaman dimuat, Then tabel menampilkan Nama, Email, Role, Cakupan (unit paling spesifik + induknya), Status, dan tombol Edit untuk setiap pengguna                   |
| US-02 | Sebagai Super Admin, saya ingin menambahkan pengguna baru dengan role dan cakupan wilayah tertentu, supaya staf baru bisa login sesuai kewenangan dan wilayah kerjanya. | Must      | Given saya menekan "+ Tambah Pengguna", When saya mengisi nama & email, memilih role (Super Admin tidak ditawarkan), memilih Level Cakupan dan dropdown PWM/PDM/PCM yang relevan, lalu menekan "Simpan", Then pengguna baru tersimpan berstatus "Menunggu Aktivasi" dengan password default dan muncul di daftar |
| US-03 | Sebagai Super Admin, saya ingin menonaktifkan pengguna yang sudah tidak bertugas, supaya pengguna tersebut tidak bisa login lagi.                          | Must      | Given saya mengubah status pengguna dari Aktif menjadi Nonaktif lalu menekan "Simpan", Then pengguna tersebut tidak bisa login walau kredensialnya benar                                                    |
| US-04 | Sebagai Super Admin, saya ingin memilih Cakupan pengguna secara bertingkat (Wilayah → Daerah → Cabang), supaya data yang dipilih selalu valid dan konsisten dengan struktur organisasi PWM/PDM/PCM, bukan teks bebas yang bisa salah ketik. | Must      | Given saya memilih Level Cakupan "Daerah (PDM)", When form ditampilkan, Then muncul dropdown Wilayah (PWM) dan Daerah (PDM) -- dropdown PDM hanya berisi opsi yang berada di bawah PWM terpilih; Given saya memilih "Cabang (PCM)", Then dropdown PCM juga muncul dan hanya berisi opsi di bawah PDM terpilih |
| US-05 | Sebagai Super Admin, saya ingin menyimulasikan pengiriman email aktivasi dan pengguna mengklik link aktivasinya, supaya saya bisa menunjukkan alur onboarding akun baru tanpa server email sungguhan. | Should    | Given ada pengguna berstatus "Menunggu Aktivasi", When saya menekan ikon ✉️, Then tampil toast konfirmasi "email terkirim (simulasi)" tanpa mengubah status; When saya menekan ikon 🔑, Then status pengguna berubah menjadi "Aktif" |
| US-06 | Sebagai Admin PDM (atau role lain yang diberi akses modul Pengguna selain Super Admin), saya ingin hanya melihat pengguna yang berada di cakupan saya atau di bawahnya, supaya saya tidak melihat/mengelola akun di wilayah lain yang bukan tanggung jawab saya. | Must      | Given saya login sebagai pengguna non-Super-Admin dengan Cakupan "Daerah (PDM) -- PDM Kabupaten Magelang", When saya membuka menu Pengguna, Then tabel hanya menampilkan pengguna dengan Cakupan "PDM Kabupaten Magelang" atau "Cabang (PCM)" yang berada di bawah PDM tersebut, bukan pengguna dari PDM/PWM lain atau Cakupan "Pusat" |
| US-07 | Sebagai Admin PCM, saya ingin field Cakupan otomatis terisi dan terkunci sesuai cakupan saya sendiri saat menambah pengguna baru, supaya saya tidak bisa (sengaja atau tidak sengaja) membuat pengguna untuk cabang/daerah/wilayah lain. | Must      | Given saya login sebagai pengguna non-Super-Admin dengan Cakupan "Cabang (PCM) -- PCM Mungkid", When saya menekan "+ Tambah Pengguna", Then field Level Cakupan terisi "Cabang (PCM)" dan dropdown PWM/PDM/PCM terisi sesuai cakupan saya, semuanya dalam keadaan disabled (tidak bisa diubah) |

---

## 6. Kebutuhan Fungsional

| ID    | Modul             | Deskripsi requirement                                                                                                                                                           | User story          | Prioritas | Catatan / aturan bisnis                                                                                  |
| ----- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| FR-01 | Daftar Pengguna   | Sistem harus menampilkan tabel pengguna dengan kolom Nama, Email, Role, Cakupan (unit paling spesifik + induknya sebagai subteks), Status, dan tombol Edit (✎)                  | US-01               | Must      | Tidak ada tombol hapus -- siklus hidup akun diatur lewat Status, bukan penghapusan baris                 |
| FR-02 | Tambah/Edit Pengguna lewat Panel | Sistem harus menyediakan tombol "+ Tambah Pengguna" dan tombol Edit (✎) per baris yang membuka panel berisi Nama, Email, Role, Status, dan Cakupan                 | US-02, US-03        | Must      | Panel yang sama dipakai untuk tambah (kosong, default status "Menunggu Aktivasi") dan edit (terisi data existing) |
| FR-03 | Simpan Pengguna   | Sistem harus menyimpan satu pengguna (baru atau hasil edit) saat tombol "Simpan" pada panel ditekan, setelah validasi nama (≥3 karakter), format email, dan keunikan email lolos | US-02, US-03, US-04 | Must      | Pengguna baru mendapat password default `demo123` (khusus mode demo; produksi via email undangan/reset)  |
| FR-04 | Ubah Status       | Sistem harus mengizinkan Super Admin mengubah status pengguna menjadi Menunggu Aktivasi/Aktif/Nonaktif melalui dropdown Status pada panel                                        | US-03               | Must      | Pengguna berstatus Nonaktif atau Menunggu Aktivasi tidak dapat login meski kredensial benar               |
| FR-05 | Dropdown Cakupan Bertingkat | Sistem harus menyediakan dropdown Level Cakupan (Pusat/Wilayah (PWM)/Daerah (PDM)/Cabang (PCM)); memilih Wilayah menampilkan dropdown PWM, memilih Daerah menampilkan PWM+PDM, memilih Cabang menampilkan PWM+PDM+PCM -- opsi PDM/PCM tersaring (cascading) sesuai PWM/PDM yang dipilih | US-04               | Must      | Data cakupan disimpan sebagai objek `{ level, pwm?, pdm?, pcm? }`, bukan teks bebas; struktur PWM→PDM→PCM mengikuti master organisasi yang sama dengan Manajemen Sekolah |
| FR-06 | Sinkronisasi Sesi | Jika pengguna yang sedang login mengubah datanya sendiri (nama/role), sistem harus memperbarui sesi & tampilan UI (nama, avatar, role di header) tanpa perlu logout-login ulang | US-02               | Should    | Berlaku saat Super Admin mengedit baris miliknya sendiri                                                 |
| FR-07 | Role Tanpa Super Admin | Dropdown Role pada panel Tambah/Edit Pengguna tidak boleh menawarkan opsi "Super Admin", kecuali pengguna yang sedang diedit memang sudah berstatus Super Admin                 | US-02               | Must      | Mencegah elevasi ke Super Admin dilakukan sembarangan lewat panel pengguna biasa; default role untuk pengguna baru adalah role pertama yang bukan Super Admin |
| FR-08 | Simulasi Aktivasi Akun | Sistem harus menyediakan ikon ✉️ (simulasikan kirim email aktivasi) dan 🔑 (simulasikan pengguna klik link aktivasi) pada baris berstatus "Menunggu Aktivasi"                   | US-05               | Should    | ✉️ hanya menampilkan toast, tidak mengubah status; 🔑 mengubah status menjadi "Aktif"                     |
| FR-09 | Pembatasan Daftar Pengguna sesuai Cakupan | Jika pengguna yang login **bukan Super Admin** (berlaku untuk role apa pun yang suatu saat diberi akses modul ini lewat Role & Hak Akses), tabel Daftar Pengguna hanya menampilkan pengguna yang Cakupannya sama dengan atau berada **di bawah** Cakupan akun yang login | US-06               | Must      | Aturan: Cakupan "Pusat" melihat semua pengguna (level apa pun); "Wilayah (PWM)" melihat pengguna dengan PWM yang sama di level Wilayah/Daerah/Cabang; "Daerah (PDM)" melihat pengguna dengan PDM yang sama di level Daerah/Cabang; "Cabang (PCM)" hanya melihat pengguna dengan PCM yang sama. Super Admin selalu melihat semua pengguna tanpa batasan ini |
| FR-10 | Cakupan Terkunci saat Tambah Pengguna | Saat pengguna **non-Super-Admin** membuka panel "+ Tambah Pengguna", field Level Cakupan dan dropdown PWM/PDM/PCM harus otomatis terisi sesuai Cakupan akun yang login, dan seluruhnya dalam keadaan **disabled** (tidak bisa diubah) | US-07               | Must      | Mencegah admin non-Super-Admin membuat pengguna di luar cakupannya sendiri; aturan ini berlaku khusus untuk alur **create** -- perilaku Cakupan saat **edit** pengguna existing oleh non-Super-Admin belum ditentukan (lihat Pertanyaan Terbuka #6); Super Admin tidak terpengaruh aturan ini dan tetap bebas memilih Cakupan apa pun |

### 6.1 Hak Akses per Peran

| Fitur                          | Super Admin | Admin | Staff Keuangan |
| ------------------------------ | ----------- | ----- | -------------- |
| Lihat daftar pengguna          | Ya          | --    | --             |
| Tambah/edit pengguna           | Ya          | --    | --             |
| Ubah role/status/cakupan pengguna lain | Ya  | --    | --             |

_Catatan: pada konfigurasi default, hanya role dengan permission `pengguna` (saat ini: Super Admin) yang dapat mengakses menu ini; dapat diubah lewat menu Role & Hak Akses. Role "Admin" dan "Staff Keuangan" adalah penyederhanaan nama dari "Admin Wilayah (PWM)" dan "Staff Keuangan Pusat" di versi sebelumnya; role "Viewer (Read-only)" sudah dihapus dari platform. Jika kelak role "Admin"/"Staff Keuangan" (atau role baru lain) diberi akses ke modul ini, FR-09 dan FR-10 berlaku otomatis -- daftar pengguna & default Cakupan pada panel tambah akan dibatasi sesuai Cakupan akun yang login, bukan permission Create/Read/Update secara terpisah._

### 6.2 Notifikasi

| Pemicu                                  | Penerima                      | Kanal                                             | Isi singkat                   |
| --------------------------------------- | ----------------------------- | ------------------------------------------------- | ----------------------------- |
| Pengguna baru dibuat                    | Pengguna baru                 | Email/WhatsApp (saat ini: disimulasikan lewat ikon ✉️, belum ada pengiriman sungguhan) | Kredensial/link aktivasi akun |
| Status pengguna diubah menjadi Nonaktif | Pengguna terkait (disarankan) | Email (disarankan, belum diimplementasi)          | Pemberitahuan akses dicabut   |

---

## 7. Kebutuhan Non-Fungsional

| ID     | Kategori         | Requirement                                                                            | Target terukur                                                           |
| ------ | ---------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| NFR-01 | Keamanan         | Password tidak boleh disimpan/ditampilkan dalam bentuk plain text di produksi          | Hashing standar industri (bcrypt/argon2 setara) sebelum go-live produksi |
| NFR-02 | Validasi         | Email pengguna harus unik dan berformat valid                                          | 100% validasi sebelum simpan                                             |
| NFR-03 | Performa         | Waktu simpan satu pengguna lewat panel Tambah/Edit                                      | < 1 detik untuk ≤ 500 baris pengguna                                     |
| NFR-04 | Auditability     | Setiap penambahan/penghapusan/perubahan status pengguna tercatat pelaku & waktu        | 100% tercatat di audit log                                               |
| NFR-05 | Konsistensi sesi | Perubahan data pengguna yang sedang login langsung tercermin di UI tanpa reload manual | 100% konsisten dalam sesi yang sama                                      |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login → Menu "Pengguna" → lihat daftar → tekan "+ Tambah Pengguna" (atau ✎ pada baris existing) → isi Nama/Email/Role/Status/Cakupan di panel → "Simpan" → toast konfirmasi → (jika baru & Menunggu Aktivasi) klik ✉️ untuk simulasi email, lalu 🔑 untuk simulasi aktivasi oleh pengguna.
- Wireframe: mengikuti struktur `pengguna.html` -- tabel daftar pengguna di atas, panel Tambah/Edit terpisah (muncul di bawah tabel saat dibuka, bukan baris inline-editable), dengan grid 2 kolom per baris field (Nama/Email, Role/Status, Level Cakupan/PWM, PDM/PCM).
- Edge case yang wajib ditangani: menambah pengguna dengan email yang sudah dipakai (ditolak dengan toast), nama kurang dari 3 karakter (ditolak), memilih Level Cakupan "Cabang" tanpa PWM/PDM yang valid (dropdown PDM/PCM otomatis kosong jika induk belum dipilih), mengedit pengguna yang sedang login sendiri (sesi & header ikut diperbarui, lihat FR-06).

---

## 9. Integrasi & Dependensi

| Sistem eksternal           | Fungsi                                                      | Metode                                                              | PIC | Status |
| -------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- | --- | ------ |
| Modul Role & Hak Akses     | Sumber daftar role yang tersedia untuk dipilih per pengguna | Internal (shared data store)                                        | [ ] | [ ]    |
| Sistem Autentikasi/Session | Validasi login & sesi aktif pengguna                        | Internal (session storage, akan dimigrasi ke backend auth produksi) | [ ] | [ ]    |
| Email/WhatsApp Gateway     | Pengiriman kredensial/undangan akun baru (rencana produksi) | REST API                                                            | [ ] | [ ]    |

---

## 10. Kebutuhan Data

- Entitas utama: Pengguna (id, nama, email, password, roleId, status [Menunggu Aktivasi/Aktif/Nonaktif], cakupan).
- Struktur `cakupan`: objek `{ level: "Pusat" }` atau `{ level: "Wilayah", pwm }` atau `{ level: "Daerah", pwm, pdm }` atau `{ level: "Cabang", pwm, pdm, pcm }` -- nilai pwm/pdm/pcm bersumber dari master struktur organisasi yang sama dipakai di Manajemen Sekolah (lihat PRD Manajemen Sekolah), bukan tabel terpisah.
- Migrasi data: akun admin existing (jika ada di sistem lama) perlu diimpor dengan pemetaan role & cakupan yang sesuai.
- Retensi data: data pengguna disimpan selama akun ada di platform; tidak ada mekanisme hapus pengguna pada fase ini -- nonaktifkan status sebagai gantinya (lihat Pertanyaan Terbuka #1, sudah terjawab oleh keputusan desain ini).
- Laporan yang dibutuhkan: daftar pengguna per role, daftar pengguna nonaktif, daftar pengguna per cakupan wilayah (PWM/PDM/PCM).

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Cakupan kini dipilih lewat dropdown bertingkat (Pusat/Wilayah (PWM)/Daerah (PDM)/Cabang (PCM)) yang terikat ke master struktur organisasi, bukan teks bebas lagi -- sudah menjawab Pertanyaan Terbuka #3 di v0.1.
- Mulai v0.3, **Cakupan sudah menegakkan Hierarchical Data Access di modul Pengguna ini sendiri** (FR-09: daftar pengguna dibatasi; FR-10: default Cakupan terkunci saat tambah pengguna). Namun di **modul lain** (Dashboard, Laporan Pemasukan, Laporan Pindah Sekolah & Tunggakan, dll.), Cakupan masih bersifat deskriptif/atribut saja -- seorang Admin dengan Cakupan "PDM Kabupaten Magelang" saat ini masih bisa melihat data yang sama seperti Admin cakupan lain di modul-modul tersebut, selama role-nya punya izin Read (lihat Risiko & Pertanyaan Terbuka #5).
- Satu pengguna hanya memiliki satu role aktif dan satu Cakupan aktif pada satu waktu.
- Satu sekolah/unit organisasi idealnya punya satu PDM induk dan boleh punya satu PCM pembina utama (primary); kemungkinan sebuah sekolah berada di bawah PCM lain sebagai relasi sekunder belum diakomodasi di struktur Cakupan versi ini.

**Batasan:**

- Mode demo saat ini menyimpan password di sisi klien (sessionStorage); wajib diganti dengan autentikasi backend yang aman sebelum produksi.
- Tidak ada fitur hapus pengguna pada fase ini -- keputusan desain ini menggantikan rencana soft/hard-delete di v0.1 (lihat Pertanyaan Terbuka #1, sudah terjawab).
- Master data PWM/PDM/PCM pada prototipe masih berupa contoh (placeholder), belum memuat struktur organisasi riil seluruh wilayah (lihat Pertanyaan Terbuka #4).

**Pertanyaan terbuka:**

| No  | Pertanyaan                                                                    | Ditujukan ke | Batas jawab  | Jawaban |
| --- | ----------------------------------------------------------------------------- | ------------ | ------------ | ------- |
| 1   | ~~Apakah penghapusan pengguna harus soft-delete atau hard-delete?~~           | PO klien     | --           | **Terjawab (v0.2): tidak ada hapus pengguna, hanya status Aktif/Nonaktif/Menunggu Aktivasi** |
| 2   | Apakah dibutuhkan reset password self-service di rilis berikutnya?            | PO klien     | [DD-MM-YYYY] | [ ]     |
| 3   | ~~Apakah "Cakupan" perlu diikat ke master data PWM/PDM/PCM, bukan teks bebas?~~ | PO klien   | --           | **Terjawab (v0.2): ya, sudah berupa dropdown bertingkat PWM→PDM→PCM** |
| 4   | Apakah master data PWM/PDM/PCM akan diisi dari struktur organisasi riil (contoh: PWM Jawa Tengah → PDM Kabupaten Magelang dengan 21 PCM & PDM Kota Magelang dengan 3 PCM) dan siapa yang mengelola master data ini -- modul Pengguna, modul Manajemen Sekolah, atau modul tersendiri? | PO klien     | [DD-MM-YYYY] | [ ]     |
| 5   | Apakah Cakupan pengguna perlu benar-benar membatasi data yang terlihat di modul **lain** seperti Dashboard/Laporan (Hierarchical Data Access), konsisten dengan yang sudah ditegakkan di modul Pengguna (FR-09/FR-10), atau cukup jadi atribut informasi untuk modul-modul tersebut pada fase ini? | PO klien     | [DD-MM-YYYY] | [ ]     |
| 6   | Saat pengguna non-Super-Admin **mengedit** (bukan menambah) pengguna lain yang masih dalam cakupannya, apakah field Cakupan pengguna tersebut juga harus dikunci (tidak bisa dipindah ke cakupan lain), atau boleh diubah selama tujuannya masih dalam wilayah yang sama? | PO klien     | [DD-MM-YYYY] | [ ]     |

---

## 12. Risiko & Mitigasi

| Risiko                                                                                      | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi                                                                                                         | PIC |
| ------------------------------------------------------------------------------------------- | -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- | --- |
| Super Admin menonaktifkan akunnya sendiri yang sedang login, terkunci dari sistem            | H              | L                   | Tambahkan validasi: minimal 1 akun Super Admin aktif harus tetap ada; peringatan saat menonaktifkan akun sendiri | [ ] |
| Password default `demo123` terbawa ke produksi                                              | H              | M                   | Ganti mekanisme password sebelum go-live produksi (email undangan/reset wajib)                                   | [ ] |
| Cakupan sudah ditegakkan di modul Pengguna (FR-09/FR-10), tetapi modul **lain** (Dashboard, Laporan) belum menegakkan pembatasan data yang sama -- seorang Admin PDM/PCM masih bisa melihat data sekolah/laporan di luar wilayahnya lewat modul-modul tersebut | H | H | Terapkan **Hierarchical Data Access** yang konsisten di seluruh modul, di level backend/API (bukan hanya menyembunyikan menu di frontend): PWM melihat semua PDM & PCM di bawahnya, PDM melihat semua PCM di bawahnya, PCM hanya melihat cakupannya sendiri -- lihat Pertanyaan Terbuka #5 | [ ] |
| Logic FR-09 (pembatasan Daftar Pengguna) diimplementasikan hanya di frontend (menyaring hasil render tabel), sehingga pengguna yang cukup paham teknis bisa membaca data pengguna lain di luar cakupannya lewat response API/console browser | M | M | Pastikan penyaringan berdasarkan Cakupan diterapkan juga di endpoint backend produksi, bukan hanya di JS sisi klien (saat ini masih prototipe client-side dengan `usersData` di memori) | [ ] |
| Master data PWM/PDM/PCM pada prototipe (contoh: PWM Jawa Timur, DKI Jakarta) tidak mencerminkan struktur organisasi riil, sehingga Cakupan yang dipilih Admin tidak valid secara organisasi | M | M | Validasi & lengkapi master data PWM/PDM/PCM dari sumber resmi (contoh hasil riset: PWM Jawa Tengah membawahi PDM Kabupaten Magelang dengan 21 PCM dan PDM Kota Magelang dengan 3 PCM) sebelum go-live produksi -- lihat Pertanyaan Terbuka #4 | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone      | Deliverable                          | Target tanggal | Kriteria selesai             |
| -------------- | ------------------------------------ | -------------- | ---------------------------- |
| PRD approved   | Dokumen ini v1.0                     | [ ]            | Ditandatangani PO            |
| Desain selesai | Mockup & kebijakan password produksi | [ ]            | Review SA & klien            |
| Development    | CRUD pengguna                        | [ ]            | Lolos code review            |
| UAT            | Build staging                        | [ ]            | 0 bug critical, sign-off UAT |
| Go-live        | Production                           | [ ]            | Monitoring 2 minggu stabil   |

---

## 14. Glosarium

| Istilah | Arti                                                                                    |
| ------- | --------------------------------------------------------------------------------------- |
| Cakupan | Lingkup wilayah kewenangan seorang pengguna, dipilih bertingkat: Pusat (nasional, tanpa wilayah spesifik), Wilayah (PWM), Daerah (PDM), atau Cabang (PCM) |
| PWM     | Pimpinan Wilayah Muhammadiyah -- tingkat provinsi, contoh: PWM Jawa Tengah               |
| PDM     | Pimpinan Daerah Muhammadiyah -- tingkat kabupaten/kota di bawah satu PWM, contoh: PDM Kabupaten Magelang, PDM Kota Magelang |
| PCM     | Pimpinan Cabang Muhammadiyah -- tingkat kecamatan di bawah satu PDM, contoh: PCM Mungkid, PCM Borobudur (satu PDM bisa punya banyak PCM; PDM Kabupaten Magelang misalnya membawahi 21 PCM) |
| Role    | Peran yang menentukan hak akses pengguna ke modul platform (lihat PRD Role & Hak Akses) |
| Hierarchical Data Access | Prinsip pembatasan data berjenjang sesuai Cakupan: level yang lebih tinggi (PWM) otomatis bisa melihat seluruh data level di bawahnya (PDM, PCM); belum ditegakkan pada fase ini (lihat Asumsi & Risiko) |

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
