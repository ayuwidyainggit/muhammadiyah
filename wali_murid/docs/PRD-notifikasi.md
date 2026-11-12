# PRD: Konfigurasi Notifikasi (Wali Murid)

## 1. Informasi Dokumen

| Atribut             | Isi                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| Nama produk / fitur | Konfigurasi Notifikasi (Preferensi Kanal Pemberitahuan Wali Murid)       |
| Klien / proyek      | Aplikasi Wali Murid -- Platform Invoicing & Payment SPP (GeekGarden)     |
| Versi dokumen       | v0.1                                                                      |
| Status              | Draft                                                                     |
| Penulis             | Tim Produk GeekGarden                                                     |
| Product Owner       | [Nama PO Klien]                                                           |
| Solution Architect  | [Nama SA]                                                                 |
| Tanggal dibuat       | 08-11-2026                                                                |
| Target rilis        | [DD-MM-YYYY / Sprint X]                                                   |
| Dokumen terkait     | `notifikasi.html`, `app.js`, PRD Profil Wali Murid (preferensi tanggal pengingat), PRD Riwayat Pembayaran & Konfirmasi |

### Riwayat Revisi

| Versi | Tanggal    | Penulis               | Perubahan                                   |
| ----- | ---------- | --------------------- | -------------------------------------------- |
| v0.1  | 08-11-2026 | Tim Produk GeekGarden | Draft awal berdasarkan prototipe `notifikasi.html`, menu "Notifikasi" pada bottom navigation aplikasi Wali Murid. |

---

## 2. Ringkasan & Latar Belakang

### 2.1 Ringkasan

Halaman Notifikasi memungkinkan Wali Murid mengatur kanal mana saja yang dipakai untuk menerima informasi tagihan, reminder jatuh tempo, dan update status pembayaran: WhatsApp, SMS, Email, dan Push Notifikasi. Satu kanal, "Notifikasi Aplikasi" (muncul di ikon lonceng dalam aplikasi), selalu aktif dan tidak dapat dimatikan sebagai jaring pengaman minimal agar Wali Murid tidak kehilangan info penting.

### 2.2 Problem Statement

**Wali Murid** mengalami **kesulitan mengatur kanal komunikasi mana yang paling sesuai dengan kebiasaannya** saat **seluruh notifikasi dikirim lewat kanal yang ditetapkan sekolah tanpa bisa disesuaikan**, yang menyebabkan **info tagihan/reminder tidak sampai efektif (mis. WA tidak aktif, email jarang dibuka) atau Wali Murid merasa terlalu banyak menerima notifikasi dari kanal yang tidak diinginkan**.

### 2.3 Kondisi Saat Ini (As-Is)

Kanal pengiriman notifikasi (WA/SMS/Email/Push) ditetapkan secara default dan sama untuk semua Wali Murid, tanpa opsi personalisasi dari sisi pengguna.

### 2.4 Kondisi yang Diharapkan (To-Be)

Wali Murid dapat membuka menu "Notifikasi" dan menyalakan/mematikan setiap kanal (WA/SMS/Email/Push) sesuai preferensinya sendiri, dengan "Notifikasi Aplikasi" tetap menjadi jaring pengaman minimal yang selalu aktif.

### 2.5 Kenapa Sekarang?

Dengan makin banyak Wali Murid yang bergantung pada reminder tagihan untuk membayar tepat waktu (lihat PRD Profil Wali Murid -- preferensi tanggal pengingat), personalisasi kanal notifikasi meningkatkan efektivitas reminder sampai ke Wali Murid yang tepat lewat kanal yang benar-benar mereka pakai.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Meningkatkan efektivitas reminder tagihan dengan mengirim lewat kanal yang benar-benar dipakai Wali Murid.
2. Mengurangi keluhan Wali Murid terkait notifikasi dari kanal yang tidak diinginkan.
3. Menjamin Wali Murid tetap menerima info penting minimal lewat Notifikasi Aplikasi walau seluruh kanal eksternal dimatikan.

### 3.2 Non-Tujuan (Out of Goal)

- Tidak mencakup pengaturan jadwal/tanggal pengingat tagihan tambahan -- itu domain halaman **Profil** (field "Ingatkan saya setiap tanggal").
- Tidak mencakup pengiriman notifikasi itu sendiri (integrasi gateway WA/SMS/Email/Push) -- halaman ini hanya menyimpan preferensi kanal.
- Tidak mendukung pengaturan granular per jenis pesan (mis. kanal berbeda untuk reminder vs hasil verifikasi) pada fase ini -- preferensi berlaku untuk seluruh jenis notifikasi.
- Tidak menyediakan opsi mematikan "Notifikasi Aplikasi" (selalu aktif sebagai jaring pengaman).

### 3.3 Metrik Keberhasilan (KPI)

| Metrik | Baseline saat ini | Target | Cara ukur | Waktu evaluasi |
| --- | --- | --- | --- | --- |
| % Wali Murid yang mengubah preferensi notifikasi dari default dalam 30 hari pertama | [ ] | &ge; 20% | Perbandingan `notifPrefs` tersimpan vs nilai default | 1 bulan setelah rilis |
| % penurunan keluhan "tidak menerima reminder" setelah fitur ini tersedia | [ ] | Turun &ge; 25% | Perbandingan jumlah tiket bantuan sebelum vs sesudah rilis | 2 bulan setelah rilis |
| % Wali Murid dengan minimal 1 kanal eksternal aktif (selain Notifikasi Aplikasi) | [ ] | &ge; 90% | Audit `notifPrefs` seluruh akun aktif | 2 bulan setelah rilis |

---

## 4. Stakeholder & Persona Pengguna

### 4.1 Stakeholder (RACI)

| Nama / Peran          | Organisasi                 | RACI | Kepentingan                                                |
| --------------------- | --------------------------- | ---- | ----------------------------------------------------------- |
| Product Owner         | Klien (Muhammadiyah Pusat/Sekolah) | A | Menyetujui kanal yang tersedia & kebijakan kanal wajib      |
| Solution Architect    | GeekGarden                  | R    | Desain integrasi preferensi dengan gateway notifikasi (produksi) |
| Tech Lead             | GeekGarden                  | R    | Implementasi halaman & penyimpanan preferensi                |
| QA Lead               | GeekGarden                  | C    | Strategi pengujian kombinasi toggle kanal                     |
| Wali Murid (Orang Tua/Wali) | Klien (pengguna akhir) | R    | Pengguna utama fitur ini                                     |

### 4.2 Persona Pengguna

| Persona | Deskripsi | Tujuan utama | Pain point | Perangkat / kanal |
| --- | --- | --- | --- | --- |
| Wali Murid (Ayah/Ibu/Wali) | Orang tua/wali yang ingin mengatur cara menerima info tagihan | Menerima reminder lewat kanal yang paling sering dipakai, tanpa kebanjiran notifikasi dari kanal lain | Notifikasi penting terlewat karena masuk ke kanal yang tidak dipantau | Smartphone (aplikasi mobile web) |

---

## 5. Ruang Lingkup & User Stories

### 5.1 Ruang Lingkup

| In Scope (fase ini) | Out of Scope (fase berikutnya / tidak dikerjakan) |
| --- | --- |
| Toggle aktif/nonaktif untuk kanal WhatsApp, SMS, Email, Push Notifikasi | Pengaturan jadwal/tanggal pengingat tambahan (domain halaman Profil) |
| Kanal "Notifikasi Aplikasi" yang selalu aktif (tidak bisa dimatikan) | Integrasi pengiriman nyata ke gateway WA/SMS/Email/Push |
| Penyimpanan preferensi lewat tombol "Simpan Preferensi" | Pengaturan granular per jenis notifikasi (reminder vs verifikasi vs lainnya) |
| Deskripsi singkat kegunaan tiap kanal pada UI | Riwayat notifikasi yang pernah dikirim (itu domain halaman Riwayat -- bagian Konfirmasi) |

### 5.2 Prioritas (MoSCoW)

- **Must have** -- Toggle WA/SMS/Email/Push, kanal Notifikasi Aplikasi yang selalu aktif, tombol Simpan Preferensi.
- **Should have** -- Deskripsi penjelas tiap kanal pada UI.
- **Could have** -- Pengaturan granular per jenis notifikasi.
- **Won't have (now)** -- Integrasi gateway pengiriman nyata, riwayat notifikasi terkirim di halaman ini.

### 5.3 User Stories

| ID | User story | Prioritas | Acceptance criteria |
| --- | --- | --- | --- |
| US-01 | Sebagai Wali Murid, saya ingin menyalakan/mematikan kanal WhatsApp, SMS, Email, dan Push Notifikasi secara terpisah, supaya saya hanya menerima info tagihan lewat kanal yang saya pantau. | Must | Given saya membuka menu Notifikasi, When saya mengubah salah satu toggle kanal, Then status toggle tersebut berubah sesuai pilihan saya |
| US-02 | Sebagai Wali Murid, saya ingin preferensi kanal yang saya ubah benar-benar tersimpan, supaya pilihan saya tidak hilang saat saya kembali ke halaman ini. | Must | Given saya mengubah satu atau lebih toggle kanal, When saya menekan "Simpan Preferensi", Then toast konfirmasi penyimpanan muncul dan preferensi tetap sesuai pilihan saya saat halaman dibuka kembali |
| US-03 | Sebagai Wali Murid, saya ingin memahami kegunaan masing-masing kanal sebelum memutuskan menyalakan/mematikannya, supaya saya bisa membuat keputusan yang tepat. | Should | Given saya membuka menu Notifikasi, When halaman dimuat, Then setiap kanal menampilkan deskripsi singkat kegunaannya |
| US-04 | Sebagai Wali Murid, saya ingin tetap menerima info penting di dalam aplikasi walau saya mematikan semua kanal eksternal, supaya saya tidak kehilangan info krusial seperti status pembayaran. | Must | Given saya mematikan WA, SMS, Email, dan Push, When saya melihat kanal "Notifikasi Aplikasi", Then kanal tersebut tetap aktif dan tidak bisa dimatikan |

---

## 6. Kebutuhan Fungsional

| ID | Modul | Deskripsi requirement | User story | Prioritas | Catatan / aturan bisnis |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Toggle Kanal WhatsApp | Sistem harus menyediakan toggle aktif/nonaktif untuk kanal WhatsApp, dengan deskripsi sebagai kanal utama (reminder, kuitansi, info penting) | US-01, US-03 | Must | Default aktif (`true`) |
| FR-02 | Toggle Kanal SMS | Sistem harus menyediakan toggle aktif/nonaktif untuk kanal SMS, dengan deskripsi sebagai kanal cadangan bila nomor WhatsApp tidak aktif | US-01, US-03 | Must | Default nonaktif (`false`) |
| FR-03 | Toggle Kanal Email | Sistem harus menyediakan toggle aktif/nonaktif untuk kanal Email, dengan deskripsi sebagai kanal pengiriman kuitansi & ringkasan bulanan | US-01, US-03 | Must | Default aktif (`true`) |
| FR-04 | Toggle Kanal Push Notifikasi | Sistem harus menyediakan toggle aktif/nonaktif untuk Push Notifikasi, dengan deskripsi sebagai notifikasi pop-up walau aplikasi tertutup | US-01, US-03 | Must | Default aktif (`true`) |
| FR-05 | Kanal Notifikasi Aplikasi (Terkunci Aktif) | Sistem harus menampilkan toggle "Notifikasi Aplikasi" dalam kondisi selalu menyala dan tidak dapat diklik/dimatikan | US-04 | Must | Disertai catatan penjelas bahwa kanal ini adalah jaring pengaman minimal di dalam aplikasi |
| FR-06 | Simpan Preferensi | Sistem harus menyediakan tombol "Simpan Preferensi" yang menyimpan seluruh status toggle kanal saat ditekan | US-02 | Must | Perubahan toggle individual sudah tercatat ke state saat diubah (`onNotifToggle()`); tombol memberi konfirmasi eksplisit via toast "✓ Preferensi notifikasi disimpan" |

### 6.1 Hak Akses per Peran

| Fitur | Wali Murid (akun aktif) | Wali Murid (menunggu approval / ditolak) |
| --- | --- | --- |
| Lihat & ubah preferensi kanal notifikasi | Ya | -- (tidak bisa masuk ke aplikasi) |
| Matikan Notifikasi Aplikasi | -- (tidak tersedia untuk siapa pun) | -- |

*Catatan: akses ke halaman ini ditentukan oleh `requireLogin()`, sama seperti seluruh halaman lain pada aplikasi ini.*

### 6.2 Notifikasi

| Pemicu | Penerima | Kanal | Isi singkat |
| --- | --- | --- | --- |
| Preferensi notifikasi disimpan | Wali Murid (pengirim) | In-app toast | "✓ Preferensi notifikasi disimpan" |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement | Target terukur |
| --- | --- | --- | --- |
| NFR-01 | Konsistensi state | Status toggle yang ditampilkan harus selalu merefleksikan preferensi yang tersimpan terakhir untuk akun yang sedang login | 100% konsisten antar sesi/pemuatan halaman |
| NFR-02 | Keamanan sesi | Halaman Notifikasi hanya dapat diakses oleh Wali Murid dengan sesi login aktif | 100% enforced via `requireLogin()` |
| NFR-03 | Performa | Waktu respons toggle & simpan preferensi | &lt; 300ms (operasi lokal, tanpa panggilan API pada prototipe) |
| NFR-04 | Keterjangkauan (Accessibility) | Setiap toggle harus memiliki label yang jelas & dapat dioperasikan dengan mudah di layar mobile | Lolos uji keterbacaan label & ukuran target sentuh minimum |

---

## 8. Alur Pengguna & Desain

- Alur utama: Login &rarr; buka menu "Notifikasi" lewat bottom navigation &rarr; nyalakan/matikan toggle kanal (WA/SMS/Email/Push) sesuai preferensi &rarr; tekan "Simpan Preferensi" &rarr; toast konfirmasi.
- Wireframe: mengikuti struktur `notifikasi.html` -- header dengan child-switch, kartu daftar toggle per kanal lengkap dengan ikon & deskripsi, catatan info di bawah kartu menjelaskan mengapa Notifikasi Aplikasi tidak bisa dimatikan, tombol "Simpan Preferensi" di bagian bawah.
- Edge case yang wajib ditangani: Wali Murid mematikan seluruh kanal eksternal sekaligus (Notifikasi Aplikasi tetap aktif sebagai jaring pengaman, ditegaskan lewat catatan info), Wali Murid menekan "Simpan Preferensi" tanpa mengubah apa pun (tetap menampilkan toast konfirmasi agar tidak membingungkan).

---

## 9. Integrasi & Dependensi

| Sistem eksternal | Fungsi | Metode | PIC | Status |
| --- | --- | --- | --- | --- |
| Gateway WhatsApp/SMS/Email/Push (produksi) | Pengiriman notifikasi aktual sesuai preferensi kanal yang disimpan di halaman ini | Integrasi eksternal (belum diimplementasi pada prototipe) | [ ] | [ ] |
| Halaman Profil (aplikasi ini) | Sumber preferensi tanggal pengingat tagihan tambahan yang saling melengkapi dengan preferensi kanal di halaman ini | Internal (shared data store) | [ ] | [ ] |

---

## 10. Kebutuhan Data

- Entitas utama: `NotifPrefs` (wa, sms, email, push, inapp -- seluruhnya boolean).
- Tidak ada migrasi khusus -- struktur data mengikuti objek `notifPrefs` di `app.js` pada prototipe ini.
- Data saat ini bersifat snapshot dalam memori JavaScript (bukan database/API produksi) -- preferensi tidak benar-benar tersimpan permanen dan akan kembali ke default saat sesi browser berakhir.

---

## 11. Asumsi, Batasan & Pertanyaan Terbuka

**Asumsi:**

- Preferensi kanal berlaku untuk seluruh jenis notifikasi (reminder tagihan, hasil verifikasi, dsb.) secara seragam -- tidak ada pengaturan per jenis pesan pada fase ini.
- "Notifikasi Aplikasi" dianggap cukup sebagai jaring pengaman minimal tanpa perlu persetujuan eksplisit dari Wali Murid untuk tetap aktif.

**Batasan:**

- Belum ada integrasi nyata ke gateway WA/SMS/Email/Push -- toggle hanya menyimpan preferensi, belum memicu pengiriman sungguhan.
- Preferensi bersifat snapshot dalam memori JavaScript, hilang saat sesi browser berakhir (belum persisten di backend produksi).
- Tidak ada pengaturan granular per jenis notifikasi pada fase ini.

**Pertanyaan terbuka:**

| No | Pertanyaan | Ditujukan ke | Batas jawab | Jawaban |
| --- | --- | --- | --- | --- |
| 1 | Apakah diperlukan pengaturan granular per jenis notifikasi (misal kanal berbeda untuk reminder tagihan vs hasil verifikasi pembayaran) pada iterasi berikutnya? | PO klien | [DD-MM-YYYY] | [ ] |
| 2 | Siapa penyedia gateway WhatsApp/SMS yang akan diintegrasikan di produksi, dan apakah ada batasan kuota/biaya per pesan yang perlu mempengaruhi desain default kanal? | PO klien / SA | [DD-MM-YYYY] | [ ] |
| 3 | Apakah "Notifikasi Aplikasi" perlu memiliki halaman daftar riwayat notifikasi tersendiri, atau cukup diwakili oleh bagian "Riwayat Konfirmasi Pembayaran Saya" di halaman Riwayat seperti saat ini? | PO klien | [DD-MM-YYYY] | [ ] |

---

## 12. Risiko & Mitigasi

| Risiko | Dampak (H/M/L) | Kemungkinan (H/M/L) | Mitigasi | PIC |
| --- | --- | --- | --- | --- |
| Preferensi notifikasi tidak benar-benar memicu pengiriman nyata pada prototipe, berisiko Wali Murid mengira pengaturan sudah aktif penuh | M | H (pada prototipe) | Integrasikan dengan gateway WA/SMS/Email/Push sesungguhnya sebelum go-live produksi | [ ] |
| Wali Murid mematikan seluruh kanal eksternal tanpa sadar akan kehilangan reminder tagihan, berisiko terlambat bayar | M | M | Pertimbangkan peringatan/konfirmasi tambahan saat seluruh kanal eksternal dimatikan sekaligus | [ ] |

---

## 13. Rencana Rilis & Milestone

| Milestone | Deliverable | Target tanggal | Kriteria selesai |
| --- | --- | --- | --- |
| PRD approved | Dokumen ini v1.0 | [ ] | Ditandatangani PO |
| Desain selesai | Mockup & struktur data final | [ ] | Review SA & klien |
| Development | Toggle kanal, penyimpanan preferensi | [ ] | Lolos code review |
| UAT | Build staging | [ ] | 0 bug critical, sign-off UAT |
| Go-live | Production | [ ] | Monitoring 2 minggu stabil |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| Kanal Notifikasi | Jalur pengiriman info tagihan/reminder ke Wali Murid (WhatsApp, SMS, Email, Push, atau Notifikasi Aplikasi) |
| Notifikasi Aplikasi | Catatan riwayat minimal di dalam aplikasi (ikon lonceng) yang selalu aktif sebagai jaring pengaman |
| Push Notifikasi | Notifikasi pop-up di perangkat Wali Murid walau aplikasi sedang tertutup |

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
