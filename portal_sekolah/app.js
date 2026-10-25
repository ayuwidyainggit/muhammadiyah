  // =========================================================================
  // DATA
  // =========================================================================
  // periode = periode tahun ajaran saat siswa duduk di kelas yang tercatat di baris ini --
  // dipakai untuk menandai kenaikan kelas tiap tahun ajaran (lihat periodeTahunAjaranData di bawah).
  const studentsData = [
    { nama: "Ahmad Fauzan", nis: "2201001", kelas: "5A", periode: "2026/2027", status: "aktif",
      guardians: [
        { nama: "Bapak Fauzan Hidayat", wa: "0812-3456-7890", hp: "", email: "fauzan.h@gmail.com", relasi: "ayah", primary: true }
      ] },
    { nama: "Khadijah Putri", nis: "2201002", kelas: "5A", periode: "2026/2027", status: "aktif",
      guardians: [
        { nama: "Ibu Ratna Sari", wa: "0813-2211-4455", hp: "0821-9988-1122", email: "ratna.sari@gmail.com", relasi: "ibu", primary: true }
      ] },
    { nama: "Muhammad Rizky", nis: "2201003", kelas: "5B", periode: "2026/2027", status: "aktif",
      guardians: [
        { nama: "Bapak Slamet Widodo", wa: "0857-6677-8899", hp: "", email: "", relasi: "ayah", primary: true },
        { nama: "Ibu Sri Wahyuni", wa: "0858-1122-3344", hp: "", email: "sri.wahyuni@gmail.com", relasi: "ibu", primary: false }
      ] },
    { nama: "Zidan Widodo", nis: "2201013", kelas: "3A", periode: "2026/2027", status: "aktif",
      guardians: [
        { nama: "Bapak Slamet Widodo", wa: "0857-6677-8899", hp: "", email: "", relasi: "ayah", primary: true },
        { nama: "Ibu Sri Wahyuni", wa: "0858-1122-3344", hp: "", email: "sri.wahyuni@gmail.com", relasi: "ibu", primary: false }
      ] },
    { nama: "Fatimah Azzahra", nis: "2201004", kelas: "5B", periode: "2026/2027", status: "aktif",
      guardians: [
        { nama: "Bapak Yusuf Bachtiar", wa: "0811-4433-2211", hp: "", email: "yusuf.b@yahoo.com", relasi: "ayah", primary: true }
      ] },
    { nama: "Umar Abdullah", nis: "2201005", kelas: "6A", periode: "2026/2027", status: "aktif",
      guardians: [
        { nama: "Ibu Aisyah Nurhaliza", wa: "0815-7766-5544", hp: "0817-1122-9900", email: "", relasi: "ibu", primary: true }
      ] },
    { nama: "Siti Maryam", nis: "2201006", kelas: "6A", periode: "2026/2027", status: "aktif",
      guardians: [
        { nama: "Bapak Hasan Basri", wa: "0819-2233-4400", hp: "", email: "hasan.basri@gmail.com", relasi: "ayah", primary: true }
      ] },
    { nama: "Yusuf Ibrahim", nis: "2200987", kelas: "6A", periode: "2025/2026", status: "lulus", guardians: [
        { nama: "Ibu Dewi Kartika", wa: "0812-9900-1122", hp: "", email: "", relasi: "ibu", primary: true }
      ] },
    { nama: "Naufal Hidayat", nis: "2200876", kelas: "6A", periode: "2025/2026", status: "pindah", guardians: [
        { nama: "Bapak Teguh Prasetyo", wa: "0821-5566-7788", hp: "", email: "teguh.p@gmail.com", relasi: "ayah", primary: true }
      ] },
  ];

  // Data profil sekolah yang bisa diubah sendiri oleh Admin (field lain -- nama, NPSN, jenjang,
  // struktur organisasi -- dikunci & hanya diubah oleh Super Admin GeekGarden/Pusat).
  const sekolahProfilData = {
    alamat: "Jl. Ahmad Dahlan No. 12, Sidoarjo, Jawa Timur",
  };

  const staffData = [
    { nama: "Drs. Slamet Riyadi", peran: "Kepala Sekolah", wa: "0812-1111-2222", email: "kepsek@sdmuh4sda.sch.id", password: "kepsek123", status: "aktif" },
    { nama: "Siti Aminah, S.Pd", peran: "Bendahara", wa: "0813-2222-3333", email: "bendahara@sdmuh4sda.sch.id", password: "bendahara123", status: "aktif" },
    { nama: "Ahmad Yusuf", peran: "Admin", wa: "0857-3333-4444", email: "admin@sdmuh4sda.sch.id", password: "admin123", status: "aktif" },
  ];

  // Akun mobile Wali Murid -- didaftarkan sendiri lewat app (self_register, perlu approval
  // Kepala Sekolah dulu sebelum bisa SSO) atau didaftarkan langsung oleh Admin saat wali datang
  // ke sekolah (didaftarkan_admin, langsung aktif karena identitas sudah diverifikasi tatap muka).
  // Satu akun wali murid bisa terhubung ke lebih dari satu siswa (siswaList).
  let waliSeq = 6;
  // null = panel sedang dipakai untuk daftar akun baru; selain itu = index waliAccounts yang diedit.
  let waliEditIdx = null;
  const waliAccounts = [
    { id: 1, nama: "Bapak Fauzan Hidayat", wa: "0812-3456-7890", email: "fauzan.h@gmail.com",
      siswaList: [{ nama: "Ahmad Fauzan", kelas: "5A" }], metode: "self_register", status: "menunggu_approval", tanggalDaftar: "2026-08-17" },
    { id: 2, nama: "Ibu Ratna Sari", wa: "0813-2211-4455", email: "ratna.sari@gmail.com",
      siswaList: [{ nama: "Khadijah Putri", kelas: "5A" }], metode: "self_register", status: "aktif", tanggalDaftar: "2026-07-02" },
    { id: 3, nama: "Bapak Slamet Widodo", wa: "0857-6677-8899", email: "",
      siswaList: [{ nama: "Muhammad Rizky", kelas: "5B" }, { nama: "Zidan Widodo", kelas: "3A" }], metode: "didaftarkan_admin", status: "aktif", tanggalDaftar: "2026-06-20" },
    { id: 4, nama: "Ibu Sri Wahyuni", wa: "0858-1122-3344", email: "sri.wahyuni@gmail.com",
      siswaList: [{ nama: "Muhammad Rizky", kelas: "5B" }, { nama: "Zidan Widodo", kelas: "3A" }], metode: "self_register", status: "menunggu_approval", tanggalDaftar: "2026-08-19" },
    { id: 5, nama: "Bapak Yusuf Bachtiar", wa: "0811-4433-2211", email: "yusuf.b@yahoo.com",
      siswaList: [{ nama: "Fatimah Azzahra", kelas: "5B" }], metode: "self_register", status: "ditolak", tanggalDaftar: "2026-08-10",
      alasanTolak: "No. WhatsApp tidak cocok dengan data wali murid di sistem -- diminta daftar ulang dengan nomor yang benar." },
  ];

  // Hak akses per peran di portal terpadu ini. Kepala Sekolah melihat Dashboard, Approval
  // Write-off, dan Akun Wali Murid (khusus untuk menyetujui/menolak akun yang self-register --
  // segregation of duties: yang mendaftarkan bukan yang menyetujui). Admin (akun awal onboarding
  // dari Pusat) pegang RBAC & provisioning akun sekolah -- termasuk mengundang Kepala Sekolah &
  // Bendahara -- serta mendaftarkan akun mobile Wali Murid, tapi TIDAK menyetujuinya sendiri.
  // Bendahara sengaja tidak pegang RBAC akun supaya yang mengendalikan uang tidak sekaligus
  // mengendalikan siapa yang punya akses (segregation of duties).
  const rbacPerms = {
    "Kepala Sekolah": { dashboard: true, approval: true, konfigurasi: false, sekolah: false, wali: true, murid: false, transaksi: false, blast: false },
    "Bendahara": { dashboard: true, approval: false, konfigurasi: true, sekolah: false, wali: false, murid: true, transaksi: true, blast: true },
    "Admin": { dashboard: true, approval: false, konfigurasi: true, sekolah: true, wali: true, murid: true, transaksi: true, blast: true },
  };

  // Master Periode Tahun Ajaran -- hanya 1 yang boleh aktif di satu waktu.
  // Periode aktif jadi default pilihan saat Bendahara membuat tagihan baru.
  let periodeSeq = 1;
  const periodeTahunAjaranData = [
    { id: periodeSeq++, nama: "2025/2026", mulai: "2025-07-01", selesai: "2026-06-30", aktif: false },
    { id: periodeSeq++, nama: "2026/2027", mulai: "2026-07-01", selesai: "2027-06-30", aktif: true },
  ];

  // Master Kategori Kelas -- dinamis, sekolah bisa punya lebih dari 2 kategori (mis. Reguler, Umum,
  // atau kategori lain sesuai kebutuhan). Dipakai untuk membedakan nominal SPP/tagihan lain per kategori.
  let kategoriKelasSeq = 1;
  const kategoriKelasData = [
    { id: kategoriKelasSeq++, nama: "Reguler" },
    { id: kategoriKelasSeq++, nama: "Umum" },
  ];

  // Master Kelas -- daftar kelas sekolah ini, tiap kelas di-assign ke satu Kategori Kelas di atas.
  // Sumber tunggal daftar kelas: dropdown/checkbox kelas di seluruh portal (Manajemen Murid, Buat
  // Tagihan, Blast Notifikasi) dibangun dari data ini supaya konsisten.
  const masterKelasData = [
    { kelas: "1A", kategoriId: 1 },
    { kelas: "1B", kategoriId: 1 },
    { kelas: "2A", kategoriId: 1 },
    { kelas: "2B", kategoriId: 2 },
    { kelas: "3A", kategoriId: 1 },
    { kelas: "4A", kategoriId: 2 },
    { kelas: "5A", kategoriId: 1 },
    { kelas: "5B", kategoriId: 2 },
    { kelas: "6A", kategoriId: 1 },
  ];

  function getKategoriNama(id) {
    const k = kategoriKelasData.find(k => String(k.id) === String(id));
    return k ? k.nama : '(tanpa kategori)';
  }
  function getKategoriIdForKelas(kelasCode) {
    const m = masterKelasData.find(m => m.kelas === kelasCode);
    return m ? m.kategoriId : null;
  }
  // Nominal tagihan bisa berbeda tiap Periode Tahun Ajaran (mis. SPP naik tiap tahun) -- karena itu
  // setiap entri Master Data Tagihan terikat ke satu periodeTahunAjaran. kelasCode/periodeNama yang
  // tidak diisi otomatis memakai periode tahun ajaran yang sedang aktif.
  function getNominalTagihan(jenisNama, kelasCode, periodeNama) {
    const periode = periodeNama || getActivePeriodeNama();
    const m = masterTagihanData.find(m => m.nama === jenisNama && m.periodeTahunAjaran === periode);
    if (!m) return 0;
    const katId = getKategoriIdForKelas(kelasCode);
    if (katId != null && m.nominalByKategori[katId] != null) return m.nominalByKategori[katId];
    const vals = Object.values(m.nominalByKategori);
    return vals.length ? vals[0] : 0;
  }

  const PERIODE_LABEL = { sekali: 'Sekali Bayar', bulanan: 'Bulanan', per3bulan: 'Per 3 Bulan', per6bulan: 'Per 6 Bulan', tahunan: 'Tahunan' };
  const masterTagihanData = [
    { nama: "SPP", periode: "bulanan", periodeTahunAjaran: "2026/2027", nominalByKategori: { 1: 350000, 2: 375000 }, aktif: true },
    { nama: "Uang Gedung", periode: "sekali", periodeTahunAjaran: "2026/2027", nominalByKategori: { 1: 2500000, 2: 2500000 }, aktif: true },
    { nama: "Uang Pangkal", periode: "sekali", periodeTahunAjaran: "2026/2027", nominalByKategori: { 1: 1500000, 2: 1500000 }, aktif: true },
    { nama: "Uang Pendaftaran", periode: "sekali", periodeTahunAjaran: "2026/2027", nominalByKategori: { 1: 500000, 2: 500000 }, aktif: true },
    { nama: "Kegiatan Semester", periode: "per6bulan", periodeTahunAjaran: "2026/2027", nominalByKategori: { 1: 300000, 2: 300000 }, aktif: true },
    { nama: "SPP", periode: "bulanan", periodeTahunAjaran: "2025/2026", nominalByKategori: { 1: 320000, 2: 340000 }, aktif: true },
    { nama: "Uang Gedung", periode: "sekali", periodeTahunAjaran: "2025/2026", nominalByKategori: { 1: 2300000, 2: 2300000 }, aktif: true },
    { nama: "Uang Pangkal", periode: "sekali", periodeTahunAjaran: "2025/2026", nominalByKategori: { 1: 1400000, 2: 1400000 }, aktif: true },
    { nama: "Uang Pendaftaran", periode: "sekali", periodeTahunAjaran: "2025/2026", nominalByKategori: { 1: 450000, 2: 450000 }, aktif: true },
    { nama: "Kegiatan Semester", periode: "per6bulan", periodeTahunAjaran: "2025/2026", nominalByKategori: { 1: 275000, 2: 275000 }, aktif: true },
  ];

  let invoiceSeq = 1;
  const invoiceData = [
    { id: invoiceSeq++, siswa: "Ahmad Fauzan", kelas: "5A", jenis: "SPP", periode: "2026-07", nominal: 350000, jatuhTempo: "2026-07-10", status: "paid" },
    { id: invoiceSeq++, siswa: "Khadijah Putri", kelas: "5A", jenis: "SPP", periode: "2026-07", nominal: 350000, jatuhTempo: "2026-07-10", status: "paid" },
    { id: invoiceSeq++, siswa: "Muhammad Rizky", kelas: "5B", jenis: "SPP", periode: "2026-07", nominal: 350000, jatuhTempo: "2026-07-10", status: "overdue" },
    { id: invoiceSeq++, siswa: "Fatimah Azzahra", kelas: "5B", jenis: "SPP", periode: "2026-07", nominal: 350000, jatuhTempo: "2026-07-10", status: "escalated" },
    { id: invoiceSeq++, siswa: "Umar Abdullah", kelas: "6A", jenis: "SPP", periode: "2026-08", nominal: 375000, jatuhTempo: "2026-08-10", status: "sent" },
    { id: invoiceSeq++, siswa: "Siti Maryam", kelas: "6A", jenis: "SPP", periode: "2026-08", nominal: 375000, jatuhTempo: "2026-08-10", status: "partially_paid" },
    { id: invoiceSeq++, siswa: "Ahmad Fauzan", kelas: "5A", jenis: "SPP", periode: "2026-08", nominal: 350000, jatuhTempo: "2026-08-10", status: "draft" },
    { id: invoiceSeq++, siswa: "Naufal Hidayat", kelas: "6A", jenis: "SPP", periode: "2026-06", nominal: 375000, jatuhTempo: "2026-06-10", status: "overdue" },
  ];

  let paymentSeq = 5;
  const paymentData = [
    { siswa: "Ahmad Fauzan", invoiceRef: "SPP 2026-07", metode: "QRIS", provider: "BSI H2H", nominal: 350000, status: "success", waktu: "2026-07-08 09:12", kuitansi: "RCPT-2026-000112" },
    { siswa: "Khadijah Putri", invoiceRef: "SPP 2026-07", metode: "VA BSI", provider: "BSI H2H", nominal: 350000, status: "success", waktu: "2026-07-09 14:40", kuitansi: "RCPT-2026-000118" },
    { siswa: "Siti Maryam", invoiceRef: "SPP 2026-08", metode: "VA BSI", provider: "BSI H2H", nominal: 200000, status: "success", waktu: "2026-08-02 08:05", kuitansi: "RCPT-2026-000201" },
    { siswa: "Umar Abdullah", invoiceRef: "SPP 2026-08", metode: "QRIS", provider: "BSI H2H", nominal: 375000, status: "pending", waktu: "--", kuitansi: "" },
    { siswa: "Muhammad Rizky", invoiceRef: "SPP 2026-07", metode: "VA BSI", provider: "BSI H2H", nominal: 350000, status: "expired", waktu: "--", kuitansi: "" },
  ];

  // konfirmasi transfer manual yang diunggah wali murid lewat aplikasi -- billing.manual_payment_confirmation
  let manualConfSeq = 1;
  const manualConfirmationData = [
    { id: manualConfSeq++, invoiceId: 4, siswa: "Fatimah Azzahra", invoiceRef: "SPP 2026-07", tanggalTransfer: "2026-08-11", nominal: 350000, bankPengirim: "BCA a.n. Yusuf Bachtiar", buktiFile: "bukti-transfer-fatimah.jpg", catatan: "Transfer lewat rekening suami, mohon dicek", status: "menunggu_verifikasi", diajukan: "2026-08-11 20:14" },
    { id: manualConfSeq++, invoiceId: 3, siswa: "Muhammad Rizky", invoiceRef: "SPP 2026-07", tanggalTransfer: "2026-08-09", nominal: 350000, bankPengirim: "Mandiri a.n. Slamet Widodo", buktiFile: "bukti-mr-juli.pdf", catatan: "", status: "menunggu_verifikasi", diajukan: "2026-08-09 07:02" },
    { id: manualConfSeq++, invoiceId: null, siswa: "Umar Abdullah", invoiceRef: "SPP 2026-08", tanggalTransfer: "2026-08-01", nominal: 375000, bankPengirim: "BRI a.n. Aisyah Nurhaliza", buktiFile: "bukti-umar-agustus.jpg", catatan: "", status: "terverifikasi", diajukan: "2026-08-01 09:20" },
    { id: manualConfSeq++, invoiceId: null, siswa: "Siti Maryam", invoiceRef: "SPP 2026-08", tanggalTransfer: "2026-08-04", nominal: 150000, bankPengirim: "BNI a.n. Hasan Basri", buktiFile: "bukti-sm-agustus.jpg", catatan: "Nominal tidak sesuai tagihan", status: "ditolak", diajukan: "2026-08-04 11:45" },
  ];

  // Satu sumber data write-off dipakai bersama: Bendahara mengajukan (Transaksi & Invoice ->
  // tab Write-off), Kepala Sekolah menyetujui/menolak (Approval Write-off) -- segregation of duties.
  let writeoffSeq = 6;
  const writeoffData = [
    { id: 1, siswa: "Naufal Hidayat", kelas: "6A", invoiceRef: "SPP 2026-06", tipe: "Hapus Buku",
      alasan: "Siswa pindah sekolah ke luar kota per Juli 2026, tagihan SPP tertunggak diajukan hapus buku.",
      diajukanOleh: "Siti Aminah, S.Pd (Bendahara)", tanggalDiajukan: "2026-08-05",
      status: "pending_approval", tanggalKeputusan: "", catatan: "",
      tglEfektifPindah: null, sekolahTujuan: null, rencanaBayarTunggakan: null, tunggakanList: [] },
    { id: 2, siswa: "Muhammad Rizky", kelas: "5B", invoiceRef: "SPP 2026-06", tipe: "Hapus Buku",
      alasan: "Siswa pindah sekolah per Juni 2026, tunggakan tidak bisa ditagih lagi.",
      diajukanOleh: "Siti Aminah, S.Pd (Bendahara)", tanggalDiajukan: "2026-07-20",
      status: "approved", tanggalKeputusan: "2026-07-22", catatan: "Disetujui, mohon segera diproses Admin untuk penutupan tagihan.",
      tglEfektifPindah: "2026-06-30", sekolahTujuan: "SD Negeri 3 Sidoarjo", rencanaBayarTunggakan: "2026-07-15",
      tunggakanList: [
        { invoiceRef: "SPP 2026-05", keterangan: "SPP Mei 2026", nominal: 350000, jatuhTempo: "2026-05-10", telatHari: 71 },
      ] },
    { id: 4, siswa: "Siti Maryam", kelas: "6A", invoiceRef: "SPP 2026-08", tipe: "Hapus Buku",
      alasan: "Yatim piatu, saat ini diasuh oleh panti asuhan mitra sekolah.",
      diajukanOleh: "Siti Aminah, S.Pd (Bendahara)", tanggalDiajukan: "2026-08-09",
      status: "pending_approval", tanggalKeputusan: "", catatan: "",
      tglEfektifPindah: null, sekolahTujuan: null, rencanaBayarTunggakan: null, tunggakanList: [] },
    { id: 5, siswa: "Fatimah Azzahra", kelas: "5B", invoiceRef: "SPP 2026-08", tipe: "Hapus Buku",
      alasan: "Siswa pindah sekolah, orang tua sudah mengajukan lewat aplikasi Wali Murid.",
      diajukanOleh: "Siti Aminah, S.Pd (Bendahara)", tanggalDiajukan: "2026-08-13",
      status: "pending_approval", tanggalKeputusan: "", catatan: "",
      tglEfektifPindah: "2026-08-13", sekolahTujuan: "", rencanaBayarTunggakan: "2026-08-25",
      tunggakanList: [
        { invoiceRef: "SPP 2026-06", keterangan: "SPP Juni 2026", nominal: 350000, jatuhTempo: "2026-06-10", telatHari: 64 },
        { invoiceRef: "SPP 2026-07", keterangan: "SPP Juli 2026", nominal: 350000, jatuhTempo: "2026-07-10", telatHari: 34 },
        { invoiceRef: "DPP 2026-002", keterangan: "Dana Pengembangan Pendidikan (cicilan ke-2)", nominal: 500000, jatuhTempo: "2026-07-05", telatHari: 39 },
      ] },
  ];

  const blastHistoryData = [
    { waktu: "2026-08-01 07:30", target: "Semua Wali Murid Aktif", kanal: "WA", jumlah: 142, status: "Terkirim" },
    { waktu: "2026-07-25 10:15", target: "Berdasarkan Kelas: 5B", kanal: "WA, SMS", jumlah: 24, status: "Terkirim" },
  ];


  // =========================================================================
  // DASHBOARD & APPROVAL WRITE-OFF (KEPALA SEKOLAH)
  // =========================================================================
  const classStats = [
    { kelas: "1A", totalSiswa: 28, lunasPct: 92 },
    { kelas: "1B", totalSiswa: 27, lunasPct: 88 },
    { kelas: "2A", totalSiswa: 30, lunasPct: 95 },
    { kelas: "2B", totalSiswa: 29, lunasPct: 83 },
    { kelas: "3A", totalSiswa: 31, lunasPct: 90 },
    { kelas: "4A", totalSiswa: 28, lunasPct: 76 },
    { kelas: "5A", totalSiswa: 26, lunasPct: 81 },
    { kelas: "5B", totalSiswa: 25, lunasPct: 68 },
    { kelas: "6A", totalSiswa: 27, lunasPct: 72 },
  ];
  const dashboardKpiKepsek = {
    collectionRate: 87, collectionRateDeltaText: '+4 poin vs bulan lalu (83%)',
    outstandingRp: 125000000, siswaMenunggak: 87, invoiceOverdue: 102,
  };
  const collectionTrend = [
    { bulan: 'Mar', rate: 71 }, { bulan: 'Apr', rate: 79 }, { bulan: 'Mei', rate: 84 },
    { bulan: 'Jun', rate: 90 }, { bulan: 'Jul', rate: 82 }, { bulan: 'Agu', rate: 87 },
  ];

  // Tren siswa yang tunggakannya diduga karena kesulitan ekonomi wali murid (bukan menghindar
  // bayar) -- dipakai Kepala Sekolah & Muhammadiyah Pusat mendeteksi pola musiman, mis. musim
  // paceklik petani sebelum panen, supaya keputusan bisa berupa bantuan/beasiswa, bukan penagihan.
  const ekonomiTrend = [
    { bulan: 'Sep', jumlah: 9,  paceklik: false }, { bulan: 'Okt', jumlah: 11, paceklik: false },
    { bulan: 'Nov', jumlah: 19, paceklik: true  }, { bulan: 'Des', jumlah: 26, paceklik: true  },
    { bulan: 'Jan', jumlah: 24, paceklik: true  }, { bulan: 'Feb', jumlah: 15, paceklik: false },
    { bulan: 'Mar', jumlah: 10, paceklik: false }, { bulan: 'Apr', jumlah: 8,  paceklik: false },
    { bulan: 'Mei', jumlah: 7,  paceklik: false }, { bulan: 'Jun', jumlah: 9,  paceklik: false },
    { bulan: 'Jul', jumlah: 12, paceklik: false }, { bulan: 'Agu', jumlah: 14, paceklik: false },
  ];

  const kategoriEkonomiBulanIni = [
    { kategori: 'Petani', jumlah: 6 },
    { kategori: 'Buruh Tani Harian', jumlah: 4 },
    { kategori: 'Pedagang Kecil', jumlah: 2 },
    { kategori: 'Wiraswasta', jumlah: 1 },
    { kategori: 'Lainnya', jumlah: 1 },
  ];

  const kandidatBeasiswaData = [
    { id: 1, nama: 'Ahmad Fauzan', kelas: '5A', pekerjaanWali: 'Petani (padi)', bulanBerturut: 3, totalTunggakan: 1050000,
      catatan: 'Menunggak sejak musim paceklik (panen mundur ke Maret); riwayat pembayaran lancar di luar musim ini.', status: 'baru' },
    { id: 2, nama: 'Umar Abdullah', kelas: '6A', pekerjaanWali: 'Buruh Tani Harian', bulanBerturut: 4, totalTunggakan: 1400000,
      catatan: 'Pendapatan harian terhenti saat musim tanam, belum ada penghasilan pengganti.', status: 'baru' },
    { id: 3, nama: 'Siti Maryam', kelas: '6A', pekerjaanWali: 'Petani (tembakau)', bulanBerturut: 2, totalTunggakan: 700000,
      catatan: 'Gagal panen tembakau musim lalu akibat cuaca, sudah dikonfirmasi wali kelas.', status: 'diajukan_pusat' },
    { id: 4, nama: 'Khadijah Putri', kelas: '5A', pekerjaanWali: 'Pedagang Kecil (warung)', bulanBerturut: 3, totalTunggakan: 1050000,
      catatan: 'Omzet warung turun drastis, sudah 2x dihubungi Bendahara.', status: 'disetujui_beasiswa' },
  ];

  function barClass(pct) { return pct >= 85 ? 'good' : (pct >= 70 ? 'warn' : 'bad'); }

  function renderDashboardKepsek() {
    if (!document.getElementById('dash-total-siswa')) return;
    const totalSiswa = classStats.reduce((s, c) => s + c.totalSiswa, 0);
    const avgLunas = Math.round(classStats.reduce((s, c) => s + c.lunasPct, 0) / classStats.length);
    const estTagihan = totalSiswa * 350000;
    const pendingWo = writeoffData.filter(w => w.status === 'pending_approval').length;

    document.getElementById('dash-total-siswa').textContent = totalSiswa;
    document.getElementById('dash-total-tagihan').textContent = fmtRp(estTagihan);
    document.getElementById('dash-avg-lunas').textContent = avgLunas + '%';
    document.getElementById('dash-pending-writeoff').textContent = pendingWo;
    document.getElementById('nav-pending-count').textContent = pendingWo;
    document.getElementById('nav-pending-count').style.display = pendingWo ? 'inline-block' : 'none';

    document.getElementById('dash-bar-list').innerHTML = classStats.map(c => `
      <div class="bar-row">
        <div class="bar-label">${c.kelas}</div>
        <div class="bar-track"><div class="bar-fill ${barClass(c.lunasPct)}" style="width:${c.lunasPct}%;"></div></div>
        <div class="bar-pct">${c.lunasPct}%</div>
        <div class="bar-sub">${c.totalSiswa} siswa</div>
      </div>`).join('');

    const attn = [];
    if (pendingWo > 0) {
      attn.push({ type: 'warn', ic: '⏳', title: `${pendingWo} pengajuan write-off menunggu persetujuan Anda`,
        text: writeoffData.filter(w => w.status === 'pending_approval').map(w => w.siswa).join(', '),
        action: true });
    }
    const worstClass = [...classStats].sort((a, b) => a.lunasPct - b.lunasPct)[0];
    if (worstClass && worstClass.lunasPct < 75) {
      attn.push({ type: 'danger', ic: '📉', title: `Kelas ${worstClass.kelas} tingkat pelunasan terendah (${worstClass.lunasPct}%)`,
        text: `Sekitar ${Math.round(worstClass.totalSiswa * (100 - worstClass.lunasPct) / 100)} siswa di kelas ini masih menunggak SPP bulan berjalan.`, action: false });
    }
    attn.push({ type: 'info', ic: 'ℹ', title: 'Rekening penampung terverifikasi',
      text: 'Rekening BSI sekolah aktif dan terverifikasi, tidak ada tindakan yang diperlukan.', action: false });

    document.getElementById('dash-attention-list').innerHTML = attn.map(a => `
      <div class="attn-item">
        <div class="attn-ic ${a.type}">${a.ic}</div>
        <div class="attn-txt"><b>${a.title}</b>${a.text}</div>
        ${a.action ? `<div class="attn-actions"><button class="btn btn-primary btn-sm" onclick="location.href='approval.html'">Tinjau Sekarang</button></div>` : ''}
      </div>`).join('');

    renderDashboardKpiKepsek();
    renderCollectionTrendChart();
    renderEkonomiTrendChart();
    renderKategoriEkonomiBreakdown();
    renderKandidatBeasiswaTable();
    renderAttentionClassTable();
  }

  function renderDashboardKpiKepsek() {
    if (!document.getElementById('kpi-collection-rate')) return;
    document.getElementById('kpi-collection-rate').textContent = dashboardKpiKepsek.collectionRate + '%';
    document.getElementById('kpi-collection-rate-sub').textContent = dashboardKpiKepsek.collectionRateDeltaText;
    document.getElementById('kpi-outstanding').textContent = fmtRpSingkat(dashboardKpiKepsek.outstandingRp);
    document.getElementById('kpi-siswa-menunggak').textContent = dashboardKpiKepsek.siswaMenunggak + ' siswa';
    document.getElementById('kpi-invoice-overdue').textContent = dashboardKpiKepsek.invoiceOverdue + ' invoice';
  }

  function renderCollectionTrendChart() {
    if (!document.getElementById('collection-trend-chart')) return;
    const w = 640, h = 170, padL = 36, padR = 12, padT = 14, padB = 26;
    const plotW = w - padL - padR, plotH = h - padT - padB;
    const minV = 60, maxV = 100;
    const n = collectionTrend.length;
    const xPos = i => padL + (plotW * i / (n - 1));
    const yPos = v => padT + plotH * (1 - (v - minV) / (maxV - minV));

    const points = collectionTrend.map((d, i) => `${xPos(i)},${yPos(d.rate)}`).join(' ');
    const areaPoints = `${xPos(0)},${yPos(minV)} ${points} ${xPos(n - 1)},${yPos(minV)}`;

    const gridLines = [100, 90, 80, 70].map(v => `
      <line x1="${padL}" y1="${yPos(v)}" x2="${w - padR}" y2="${yPos(v)}" stroke="#eef1f6" stroke-width="1"/>
      <text x="${padL - 8}" y="${yPos(v) + 4}" font-size="10.5" fill="#5b6674" text-anchor="end">${v}%</text>
    `).join('');

    const dots = collectionTrend.map((d, i) => `
      <circle cx="${xPos(i)}" cy="${yPos(d.rate)}" r="4" fill="#1f3864" stroke="#fff" stroke-width="1.5" />
      <text x="${xPos(i)}" y="${yPos(d.rate) - 11}" font-size="11" fill="#1f3864" text-anchor="middle" font-weight="700">${d.rate}%</text>
      <text x="${xPos(i)}" y="${h - 6}" font-size="11" fill="#5b6674" text-anchor="middle">${d.bulan}</text>
    `).join('');

    document.getElementById('collection-trend-chart').innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto;display:block;">
        ${gridLines}
        <polygon points="${areaPoints}" fill="rgba(46,125,50,0.12)" />
        <polyline points="${points}" fill="none" stroke="#2e7d32" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
        ${dots}
      </svg>`;
  }

  function renderEkonomiTrendChart() {
    if (!document.getElementById('ekonomi-trend-chart')) return;
    const w = 640, h = 190, padL = 26, padR = 12, padT = 18, padB = 26;
    const plotW = w - padL - padR, plotH = h - padT - padB;
    const n = ekonomiTrend.length;
    const maxV = Math.max(...ekonomiTrend.map(d => d.jumlah)) + 6;
    const barW = (plotW / n) * 0.55;
    const xPos = i => padL + (plotW * (i + 0.5) / n);
    const yPos = v => padT + plotH * (1 - v / maxV);
    const baseY = padT + plotH;

    const bars = ekonomiTrend.map((d, i) => {
      const x = xPos(i), y = yPos(d.jumlah), barH = baseY - y;
      const color = d.paceklik ? '#c0392b' : '#1f3864';
      return `
        <rect x="${x - barW / 2}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="${color}" />
        <text x="${x}" y="${y - 6}" font-size="11" fill="${color}" text-anchor="middle" font-weight="700">${d.jumlah}</text>
        <text x="${x}" y="${h - 6}" font-size="11" fill="#5b6674" text-anchor="middle">${d.bulan}</text>`;
    }).join('');

    document.getElementById('ekonomi-trend-chart').innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto;display:block;">
        <line x1="${padL}" y1="${baseY}" x2="${w - padR}" y2="${baseY}" stroke="#eef1f6" stroke-width="1"/>
        ${bars}
      </svg>`;

    const peakMonths = ekonomiTrend.filter(d => d.paceklik).map(d => d.bulan).join('-');
    document.getElementById('ekonomi-trend-insight').innerHTML =
      `📈 <b>Pola musiman terdeteksi:</b> lonjakan siswa kesulitan ekonomi terjadi pada <b>${peakMonths}</b> -- bertepatan dengan musim paceklik sebelum panen. Mayoritas berasal dari keluarga <b>petani &amp; buruh tani harian</b>. Pertimbangkan follow-up atau bantuan/beasiswa Muhammadiyah Pusat untuk kelompok ini pada periode tersebut, bukan penagihan atau write-off.`;
  }

  function renderKategoriEkonomiBreakdown() {
    if (!document.getElementById('kategori-ekonomi-bar-list')) return;
    const maxJumlah = Math.max(...kategoriEkonomiBulanIni.map(k => k.jumlah));
    document.getElementById('kategori-ekonomi-bar-list').innerHTML = kategoriEkonomiBulanIni.map(k => `
      <div class="bar-row">
        <div class="bar-label">${k.kategori}</div>
        <div class="bar-track"><div class="bar-fill ${/^Petani|^Buruh/.test(k.kategori) ? 'bad' : 'warn'}" style="width:${(k.jumlah / maxJumlah * 100)}%;"></div></div>
        <div class="bar-pct">${k.jumlah} siswa</div>
      </div>`).join('');
  }

  function kandidatBeasiswaStatusBadge(status) {
    if (status === 'diajukan_pusat') return '<span class="badge-status blue"><span class="dot"></span> Diajukan ke Pusat</span>';
    if (status === 'disetujui_beasiswa') return '<span class="badge-status on"><span class="dot"></span> Disetujui Beasiswa</span>';
    return '<span class="badge-status warn"><span class="dot"></span> Baru</span>';
  }

  function renderKandidatBeasiswaTable() {
    if (!document.getElementById('kandidat-beasiswa-table-body')) return;
    document.getElementById('kandidat-beasiswa-table-body').innerHTML = kandidatBeasiswaData.map(k => `
      <tr>
        <td><b>${k.nama}</b><div style="color:var(--muted);font-size:11.5px;">${k.kelas}</div></td>
        <td>${k.pekerjaanWali}</td>
        <td>${k.bulanBerturut} bulan</td>
        <td>${fmtRp(k.totalTunggakan)}</td>
        <td style="color:var(--muted);font-size:12.5px;">${k.catatan}</td>
        <td>${kandidatBeasiswaStatusBadge(k.status)}</td>
        <td>${k.status === 'baru'
          ? `<button class="btn btn-primary btn-sm" onclick="ajukanKandidatBeasiswa(${k.id})">Ajukan ke Pusat</button>`
          : '--'}</td>
      </tr>`).join('');
  }

  function ajukanKandidatBeasiswa(id) {
    const k = kandidatBeasiswaData.find(k => k.id === id);
    if (!k) return;
    k.status = 'diajukan_pusat';
    renderKandidatBeasiswaTable();
    showToast(`✓ ${k.nama} diajukan ke Muhammadiyah Pusat sebagai kandidat bantuan/beasiswa`);
  }

  const RATA_TUNGGAKAN_PER_SISWA = 875000;
  function computeClassAttention(c) {
    const siswaMenunggak = Math.max(0, c.totalSiswa - Math.round(c.totalSiswa * c.lunasPct / 100));
    const tunggakanRp = siswaMenunggak * RATA_TUNGGAKAN_PER_SISWA;
    return { ...c, siswaMenunggak, tunggakanRp };
  }
  function renderAttentionClassTable() {
    if (!document.getElementById('attention-class-table-body')) return;
    const worst = classStats.map(computeClassAttention).sort((a, b) => a.lunasPct - b.lunasPct).slice(0, 3);
    document.getElementById('attention-class-table-body').innerHTML = worst.map(c => `
      <tr>
        <td><b>${c.kelas}</b></td>
        <td>${c.lunasPct}%</td>
        <td>${fmtRpSingkat(c.tunggakanRp)}</td>
        <td>${c.siswaMenunggak} siswa ${c.lunasPct < 70 ? '🔴' : ''}</td>
      </tr>`).join('');
  }

  function writeoffTunggakanTotal(w) {
    return (w.tunggakanList || []).reduce((s, t) => s + t.nominal, 0);
  }

  function openTunggakanModal(id) {
    const w = writeoffData.find(w => w.id === id);
    if (!w) return;
    const list = w.tunggakanList || [];
    const total = writeoffTunggakanTotal(w);

    document.getElementById('tgk-modal-title').textContent = `Detail Tunggakan -- ${w.siswa}`;
    document.getElementById('tgk-modal-sub').textContent = `${w.kelas} -- ${list.length} invoice tunggakan`;

    const rencanaBox = document.getElementById('tgk-modal-rencana');
    if (w.rencanaBayarTunggakan) {
      rencanaBox.style.display = 'block';
      rencanaBox.innerHTML = `📅 <b>Rencana Bayar Tunggakan:</b> ${w.rencanaBayarTunggakan} <span style="color:var(--muted);">(berlaku untuk seluruh tunggakan di bawah ini, bukan per-invoice)</span>`;
    } else {
      rencanaBox.style.display = 'none';
    }

    document.getElementById('tgk-modal-body').innerHTML = list.length ? list.map((t, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><b>${t.invoiceRef}</b></td>
        <td>${t.keterangan || '--'}</td>
        <td>${t.jatuhTempo || '--'}</td>
        <td>${t.telatHari ? `<span class="telat-pill">${t.telatHari} hari</span>` : '--'}</td>
        <td style="text-align:right;">${fmtRp(t.nominal)}</td>
      </tr>`).join('') : `<tr><td colspan="6" class="empty-hint">Tidak ada tunggakan tercatat.</td></tr>`;
    document.getElementById('tgk-modal-total').textContent = fmtRp(total);

    document.getElementById('tunggakan-modal-overlay').classList.add('active');
  }
  function closeTunggakanModal() {
    document.getElementById('tunggakan-modal-overlay').classList.remove('active');
  }

  function renderWriteoffTable() {
    if (!document.getElementById('wo-filter-status')) return;
    const statusF = document.getElementById('wo-filter-status').value;
    const tbody = document.getElementById('writeoff-approval-table-body');
    const rows = writeoffData.filter(w => !statusF || w.status === statusF);
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="6" class="empty-hint">Tidak ada pengajuan yang cocok dengan filter.</td></tr>`; return; }
    tbody.innerHTML = rows.map(w => {
      const isPindah = !!w.tglEfektifPindah;
      const tunggakanTotal = writeoffTunggakanTotal(w);
      const hasTunggakan = (w.tunggakanList || []).length > 0;
      const pindahInfo = isPindah ? `
        <div style="margin-top:8px;padding-top:8px;border-top:1px dashed var(--border);font-size:11px;color:var(--muted);line-height:1.6;">
          📅 Efektif pindah: <b>${w.tglEfektifPindah}</b><br>
          🏫 Sekolah tujuan: <b>${w.sekolahTujuan || 'belum diisi wali murid'}</b><br>
          💰 Tunggakan siswa: <b>${tunggakanTotal ? fmtRp(tunggakanTotal) : 'tidak ada tunggakan'}</b>${w.rencanaBayarTunggakan ? ` (rencana lunas ${w.rencanaBayarTunggakan})` : ''}
          ${hasTunggakan ? ` <button class="btn btn-ghost btn-sm" style="padding:2px 9px;font-size:10px;" onclick="openTunggakanModal(${w.id})">Lihat Detail</button>` : ''}
        </div>` : '';
      return `
      <tr>
        <td><b>${w.siswa}</b><br><span style="color:var(--muted);font-size:11px;">${w.kelas} -- ${w.invoiceRef}</span></td>
        <td>${w.alasan}${pindahInfo}</td>
        <td>${w.diajukanOleh}</td>
        <td>${w.tanggalDiajukan}</td>
        <td>${statusBadge(w.status)}${w.tanggalKeputusan ? `<br><span style="color:var(--muted);font-size:10.5px;">${w.tanggalKeputusan}</span>` : ''}</td>
        <td>${w.status === 'pending_approval'
            ? `<button class="btn btn-success btn-sm" style="margin-bottom:6px;width:100%;" onclick="openDecisionPanel(${w.id},'approve')">Setujui</button>
               <button class="btn btn-outline-danger btn-sm" style="width:100%;" onclick="openDecisionPanel(${w.id},'reject')">Tolak</button>`
            : (w.catatan ? `<span style="font-size:11px;color:var(--muted);">${w.catatan}</span>` : '--')}
        </td>
      </tr>`;
    }).join('');
  }

  function updateWriteoffStats() {
    if (!document.getElementById('wo-stat-total')) return;
    document.getElementById('wo-stat-total').textContent = writeoffData.length;
    document.getElementById('wo-stat-pending').textContent = writeoffData.filter(w => w.status === 'pending_approval').length;
    document.getElementById('wo-stat-approved').textContent = writeoffData.filter(w => w.status === 'approved' || w.status === 'applied').length;
    document.getElementById('wo-stat-rejected').textContent = writeoffData.filter(w => w.status === 'rejected').length;
  }

  let decisionTarget = null;
  function openDecisionPanel(id, action) {
    if (!document.getElementById('decision-title')) return;
    const w = writeoffData.find(w => w.id === id);
    if (!w) return;
    decisionTarget = { id, action };
    document.getElementById('decision-title').textContent = action === 'approve' ? 'Setujui Pengajuan Write-off' : 'Tolak Pengajuan Write-off';
    document.getElementById('decision-summary').textContent = `${w.siswa} (${w.kelas}) -- ${w.invoiceRef} -- ${w.tipe}, diajukan oleh ${w.diajukanOleh} pada ${w.tanggalDiajukan}.`;

    const detailBox = document.getElementById('decision-detail-box');
    if (w.tipe === 'Hapus Buku') {
      const tunggakanTotal = writeoffTunggakanTotal(w);
      const hasTunggakan = !!(w.tunggakanList && w.tunggakanList.length);
      detailBox.innerHTML = `
        <div class="note-box info" style="margin-bottom:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;">
            <div><b>Tanggal Efektif Pindah</b><br>${w.tglEfektifPindah || '-- belum diisi --'}</div>
            <div><b>Sekolah Tujuan</b><br>${w.sekolahTujuan || '-- belum diisi wali murid --'}</div>
            <div><b>Kapan Mau Bayar Tunggakan</b><br>${w.rencanaBayarTunggakan || '-- tidak ada tunggakan --'}</div>
            <div>
              <b>Total Tunggakan Siswa</b><br>
              ${tunggakanTotal ? fmtRp(tunggakanTotal) : 'Rp0'}
              ${hasTunggakan ? ` <button class="btn btn-ghost btn-sm" style="padding:2px 9px;font-size:10px;" onclick="openTunggakanModal(${w.id})">Lihat Detail (${w.tunggakanList.length} invoice)</button>` : ''}
            </div>
          </div>
        </div>`;
    } else {
      detailBox.innerHTML = '';
    }

    document.getElementById('decision-catatan').value = '';
    document.getElementById('decision-catatan-req').style.display = action === 'reject' ? 'inline' : 'none';
    const btn = document.getElementById('decision-confirm-btn');
    btn.className = action === 'approve' ? 'btn btn-success' : 'btn btn-danger';
    btn.textContent = action === 'approve' ? 'Konfirmasi Setujui' : 'Konfirmasi Tolak';
    document.getElementById('decision-panel').style.display = 'block';
    document.getElementById('decision-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function closeDecisionPanel() {
    if (!document.getElementById('decision-panel')) return;
    document.getElementById('decision-panel').style.display = 'none';
    decisionTarget = null;
  }
  function confirmDecision() {
    if (!document.getElementById('decision-catatan')) return;
    if (!decisionTarget) return;
    const catatan = document.getElementById('decision-catatan').value.trim();
    if (decisionTarget.action === 'reject' && !catatan) { showToast('Alasan penolakan wajib diisi'); return; }
    const w = writeoffData.find(w => w.id === decisionTarget.id);
    w.status = decisionTarget.action === 'approve' ? 'approved' : 'rejected';
    w.tanggalKeputusan = '2026-08-20';
    w.catatan = catatan || 'Disetujui oleh Kepala Sekolah.';
    const wasApprove = decisionTarget.action === 'approve';
    closeDecisionPanel();
    refreshWriteoffDependents();
    showToast(wasApprove ? '✓ Pengajuan write-off disetujui' : '✓ Pengajuan write-off ditolak');
  }

  // Semua tampilan yang bergantung pada writeoffData -- dipanggil setiap ada perubahan
  // (submit baru dari Bendahara, atau keputusan dari Kepala Sekolah) supaya kedua sisi
  // selalu konsisten walau yang sedang login cuma salah satu peran.
  function refreshWriteoffDependents() {
    if (document.getElementById('writeoff-table-body')) renderWriteoffList();
    if (document.getElementById('writeoff-approval-table-body')) renderWriteoffTable();
    if (document.getElementById('wo-stat-total')) updateWriteoffStats();
    if (document.getElementById('stat-total-invoice')) updateStats();
    if (document.getElementById('dash-view-kepsek')) renderDashboardKepsek();
    if (document.getElementById('dash-kpi-total-invoice')) renderDashboardKpi();
  }

  // =========================================================================
  // NAV
  // =========================================================================
  const navItems = document.querySelectorAll('.nav-item[data-rbac]');

  // ==================================================================
  // ---- LOGIN & RBAC (portal terpadu: Kepala Sekolah, Bendahara, Admin) ----
  // ==================================================================
  let currentUser = null;

  // ---- session persistence (sessionStorage; survives page nav, not tab close) ----
  const SESSION_KEY = 'portal_sekolah_session';
  function saveSession(user) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(user)); }
  function getSession() { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; } }
  function clearSession() { sessionStorage.removeItem(SESSION_KEY); }

  const NAV_ORDER = ['dashboard', 'approval', 'konfigurasi', 'sekolah', 'wali', 'murid', 'transaksi', 'blast'];
  const PAGE_FOR_KEY = { dashboard: 'dashboard.html', approval: 'approval.html', konfigurasi: 'konfigurasi.html', sekolah: 'sekolah.html', wali: 'wali.html', murid: 'murid.html', transaksi: 'transaksi.html', blast: 'blast.html' };
  function defaultPageFor(peran) {
    const perms = rbacPerms[peran] || {};
    const key = NAV_ORDER.find(k => perms[k]);
    return PAGE_FOR_KEY[key] || 'dashboard.html';
  }
  // called at the top of every protected page: redirects to index.html if not logged in,
  // otherwise restores currentUser + applies RBAC to the sidebar for this page.
  function restoreSession() {
    const u = getSession();
    if (!u) { location.replace('index.html'); return null; }
    currentUser = u;
    applyCurrentUserToUi();
    applyRbacToSidebar();
    updateNavBadges();
    return u;
  }
  // sidebar notification pills -- shared markup on every page, so this runs on every page
  // (not just approval.html / wali.html) to keep the counts accurate regardless of which
  // page the user is currently on.
  function updateNavBadges() {
    const pendingWo = writeoffData.filter(w => w.status === 'pending_approval').length;
    const woPill = document.getElementById('nav-pending-count');
    if (woPill) { woPill.textContent = pendingWo; woPill.style.display = pendingWo ? 'inline-block' : 'none'; }
    const pendingWali = waliAccounts.filter(w => w.status === 'menunggu_approval').length;
    const waliPill = document.getElementById('nav-wali-pending-count');
    if (waliPill) { waliPill.textContent = pendingWali; waliPill.style.display = pendingWali ? 'inline-block' : 'none'; }
  }



  function logout() {
    clearSession();
    location.href = 'index.html';
  }
  function applyCurrentUserToUi() {
    document.getElementById('uc-avatar').textContent = initials(currentUser.nama);
    document.getElementById('uc-name').textContent = currentUser.nama;
    document.getElementById('uc-role').textContent = currentUser.peran;
  }
  // Dashboard beda tampilan per peran -- Kepala Sekolah lihat ringkasan sekolah +
  // write-off menunggu approval, Bendahara/Admin lihat status tagihan & rekonsiliasi.
  function showRoleDashboard() {
    if (!document.getElementById('dash-view-kepsek')) return;
    const isKepsek = currentUser.peran === 'Kepala Sekolah';
    document.getElementById('dash-view-kepsek').style.display = isKepsek ? 'block' : 'none';
    document.getElementById('dash-view-bendahara').style.display = isKepsek ? 'none' : 'block';
    if (isKepsek) { renderDashboardKepsek(); } else { renderDashboardKpi(); renderReconciliation(); }
  }
  function applyRbacToSidebar() {
    const perms = rbacPerms[currentUser.peran] || {};
    navItems.forEach(item => {
      const key = item.dataset.rbac;
      if (!key) return;
      item.style.display = perms[key] ? 'flex' : 'none';
    });
    document.querySelectorAll('.nav-group-label').forEach(label => {
      let sib = label.nextElementSibling, anyVisible = false;
      while (sib && !sib.classList.contains('nav-group-label')) {
        if (sib.classList.contains('nav-item') && sib.style.display !== 'none') anyVisible = true;
        sib = sib.nextElementSibling;
      }
      label.style.display = anyVisible ? 'block' : 'none';
    });
    initNavGroups();
    const selfItem = document.getElementById('nav-self');
    const selfAllowed = selfItem && selfItem.style.display !== 'none';
    if (!selfAllowed) {
      location.replace(defaultPageFor(currentUser.peran));
    }
  }

  // Sidebar parent/child nav (Konfigurasi, Manajemen Sekolah) -- karena ini app multi-halaman statis
  // (bukan SPA), expand/collapse-nya dihitung ulang tiap load dari file halaman saat ini + query
  // ?tab=, bukan disimpan di state. Grup yang sedang dibuka otomatis expand & anak aktif ditandai.
  function initNavGroups() {
    document.querySelectorAll('.nav-parent[data-nav-group]').forEach(parent => {
      const key = parent.dataset.navGroup;
      const children = document.querySelector(`.nav-children[data-nav-children="${key}"]`);
      if (!children) return;
      if (parent.style.display === 'none') { children.style.display = 'none'; return; }
      children.style.display = '';
      const isCurrentGroup = parent.id === 'nav-self';
      children.classList.toggle('open', isCurrentGroup);
      parent.classList.toggle('expanded', isCurrentGroup);
      const childEls = [...children.querySelectorAll('.nav-child')];
      if (isCurrentGroup) {
        const currentTab = new URLSearchParams(location.search).get('tab');
        childEls.forEach(child => {
          child.classList.toggle('active', currentTab ? child.dataset.navTab === currentTab : child === childEls[0]);
        });
      } else {
        childEls.forEach(child => child.classList.remove('active'));
      }
    });
  }
  function toggleNavGroup(e, key) {
    e.preventDefault();
    e.stopPropagation();
    const children = document.querySelector(`.nav-children[data-nav-children="${key}"]`);
    const parent = document.querySelector(`.nav-parent[data-nav-group="${key}"]`);
    if (!children || !parent) return;
    const open = children.classList.toggle('open');
    parent.classList.toggle('expanded', open);
  }

  // jump from a Dashboard KPI/CTA straight into a specific tab under Transaksi & Invoice
  function goToInvoiceTab(tab) {
    location.href = 'transaksi.html?tab=' + encodeURIComponent(tab);
  }

  // =========================================================================
  // SHARED HELPERS
  // =========================================================================
  function togglePw(id, btn) {
    const el = document.getElementById(id);
    if (el.type === 'password') { el.type = 'text'; btn.textContent = 'Sembunyikan'; }
    else { el.type = 'password'; btn.textContent = 'Lihat'; }
  }
  function removeRow(btn) {
    const tr = btn.closest('tr');
    const tbody = tr.closest('tbody');
    tr.remove();
    if (tbody && tbody.id === 'inv-individual-body') {
      const hint = document.getElementById('inv-individual-hint');
      if (hint) hint.style.display = tbody.children.length ? 'none' : 'block';
    }
  }
  function switchChannel(ch, rootId) {
    const root = document.getElementById(rootId || 'tmpl-root-konfig');
    root.querySelectorAll('.channel-tab').forEach(t => t.classList.toggle('active', t.dataset.ch === ch));
    root.querySelectorAll('.channel-panel').forEach(p => { p.style.display = p.dataset.chPanel === ch ? 'block' : 'none'; });
  }
  // =========================================================================
  // KONFIGURASI SEKOLAH -- Rekening Penampung, Notifikasi (CC), Aturan Reminder, Template Pesan
  // =========================================================================
  const REMINDER_LEVEL_LABEL = { "1": "Level 1 -- Pengingat", "2": "Level 2 -- Peringatan", "3": "Level 3 -- Eskalasi" };

  // ---- Rekening Penampung ----
  // Bisa lebih dari satu rekening (mis. riwayat ganti bank) -- hanya SATU yang boleh ditandai
  // "utama" sebagai tujuan pencairan dana aktif, terpisah dari kanal VA yang dilihat wali murid.
  const BANK_OPTIONS = ["BCA", "Mandiri", "BNI", "BRI", "BSI -- Bank Syariah Indonesia", "Lainnya"];
  const JADWAL_DISBURSEMENT_LABEL = { harian: "Harian (T+1)", mingguan: "Mingguan", manual: "Sesuai permintaan (manual)" };
  let rekeningSeq = 1;
  let rekeningEditIdx = null;
  const rekeningPenampungData = [
    { id: rekeningSeq++, bank: "BSI -- Bank Syariah Indonesia", noRekening: "7123456789", namaPemilik: "SD Muhammadiyah 4 Sidoarjo", jadwalDisbursement: "harian", statusVerifikasi: "terverifikasi", vaAktif: true, utama: true },
  ];
  function fillRekeningBankFilter() {
    const sel = document.getElementById('rekening-filter-bank');
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = '<option value="">Semua Bank</option>' + BANK_OPTIONS.map(b => `<option value="${b}" ${b === cur ? 'selected' : ''}>${b}</option>`).join('');
  }
  function renderRekeningTable() {
    if (!document.getElementById('rekening-table')) return;
    fillRekeningBankFilter();
    const searchQ = (document.getElementById('rekening-search').value || '').trim().toLowerCase();
    const bankQ = document.getElementById('rekening-filter-bank').value;
    const statusQ = document.getElementById('rekening-filter-status').value;
    const tbody = document.querySelector('#rekening-table tbody');
    const rows = rekeningPenampungData
      .map((r, i) => ({ r, i }))
      .filter(({ r }) => !bankQ || r.bank === bankQ)
      .filter(({ r }) => !statusQ || r.statusVerifikasi === statusQ)
      .filter(({ r }) => !searchQ || r.namaPemilik.toLowerCase().includes(searchQ) || r.noRekening.includes(searchQ));
    tbody.innerHTML = rows.length ? rows.map(({ r, i }) => `
      <tr>
        <td>${r.bank}${r.utama ? ' <span class="tag-pill ok">UTAMA</span>' : ''}</td>
        <td>${r.noRekening}</td>
        <td>${r.namaPemilik}</td>
        <td>${JADWAL_DISBURSEMENT_LABEL[r.jadwalDisbursement]}</td>
        <td>${statusBadge(r.statusVerifikasi)}</td>
        <td>${r.vaAktif ? '<span class="tag-pill ok">VA Aktif</span>' : '<span style="color:var(--muted);font-size:11px;">--</span>'}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" onclick="openRekeningPanel(${i})" title="Edit">✎</button>
            <button class="icon-btn icon-btn-red" onclick="removeRekening(${i})" title="Hapus">✕</button>
          </div>
          ${!r.utama ? `<button class="btn btn-outline btn-sm" style="width:100%;" onclick="setRekeningUtama(${i})">Jadikan Utama</button>` : ''}
        </td>
      </tr>`).join('') : `<tr><td colspan="7" class="empty-hint">Tidak ada rekening yang cocok dengan filter.</td></tr>`;
  }
  function openRekeningPanel(idx) {
    const sel = document.getElementById('rek-bank');
    sel.innerHTML = BANK_OPTIONS.map(b => `<option value="${b}">${b}</option>`).join('');
    rekeningEditIdx = (idx === undefined) ? null : idx;
    const panel = document.getElementById('rekening-panel');
    if (rekeningEditIdx !== null) {
      const r = rekeningPenampungData[rekeningEditIdx];
      document.getElementById('rekening-panel-title').textContent = 'Edit Rekening Penampung';
      document.getElementById('rek-bank').value = r.bank;
      document.getElementById('rek-norek').value = r.noRekening;
      document.getElementById('rek-nama').value = r.namaPemilik;
      document.getElementById('rek-jadwal').value = r.jadwalDisbursement;
      document.getElementById('rek-status').value = r.statusVerifikasi;
      document.getElementById('rek-va-aktif').checked = r.vaAktif;
      document.getElementById('rek-utama').checked = r.utama;
    } else {
      document.getElementById('rekening-panel-title').textContent = 'Tambah Rekening Penampung';
      document.getElementById('rek-norek').value = '';
      document.getElementById('rek-nama').value = '';
      document.getElementById('rek-jadwal').value = 'harian';
      document.getElementById('rek-status').value = 'menunggu_verifikasi';
      document.getElementById('rek-va-aktif').checked = false;
      document.getElementById('rek-utama').checked = false;
    }
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function closeRekeningPanel() {
    document.getElementById('rekening-panel').style.display = 'none';
    rekeningEditIdx = null;
  }
  function saveRekening() {
    const bank = document.getElementById('rek-bank').value;
    const noRekening = document.getElementById('rek-norek').value.trim();
    const namaPemilik = document.getElementById('rek-nama').value.trim();
    const jadwalDisbursement = document.getElementById('rek-jadwal').value;
    const statusVerifikasi = document.getElementById('rek-status').value;
    const vaAktif = document.getElementById('rek-va-aktif').checked;
    const utama = document.getElementById('rek-utama').checked;

    if (!bank) { showToast('Nama Bank wajib dipilih'); return; }
    if (!/^\d{6,20}$/.test(noRekening)) { showToast('Nomor Rekening wajib angka, 6-20 digit'); return; }
    if (namaPemilik.length < 3) { showToast('Nama Pemilik Rekening minimal 3 karakter'); return; }
    const dup = rekeningPenampungData.some((r, i) => i !== rekeningEditIdx && r.bank === bank && r.noRekening === noRekening);
    if (dup) { showToast('Rekening dengan bank & nomor yang sama sudah terdaftar'); return; }

    if (utama) rekeningPenampungData.forEach(r => r.utama = false);
    const payload = { bank, noRekening, namaPemilik, jadwalDisbursement, statusVerifikasi, vaAktif, utama };
    if (rekeningEditIdx !== null) {
      const id = rekeningPenampungData[rekeningEditIdx].id;
      rekeningPenampungData[rekeningEditIdx] = { id, ...payload };
    } else {
      if (!rekeningPenampungData.length) payload.utama = true;
      rekeningPenampungData.push({ id: rekeningSeq++, ...payload });
    }
    if (!rekeningPenampungData.some(r => r.utama) && rekeningPenampungData.length) rekeningPenampungData[0].utama = true;
    closeRekeningPanel();
    renderRekeningTable();
    showToast('✓ Rekening Penampung berhasil disimpan');
  }
  function setRekeningUtama(idx) {
    rekeningPenampungData.forEach((r, i) => r.utama = (i === idx));
    renderRekeningTable();
    showToast(`✓ ${rekeningPenampungData[idx].bank} dijadikan rekening utama`);
  }
  function removeRekening(idx) {
    if (rekeningPenampungData.length <= 1) { showToast('Minimal harus ada 1 rekening penampung'); return; }
    const wasUtama = rekeningPenampungData[idx].utama;
    rekeningPenampungData.splice(idx, 1);
    if (wasUtama && rekeningPenampungData.length) rekeningPenampungData[0].utama = true;
    renderRekeningTable();
    showToast('Rekening dihapus');
  }

  // ---- Notifikasi: Penerima Tembusan (CC) ----
  let notifCcSeq = 1;
  let notifCcEditIdx = null;
  const notifikasiCcData = [
    { id: notifCcSeq++, nama: "Siti Aminah, S.Pd", peran: "Bendahara", wa: "0813-2222-3333", aktif: true },
  ];
  function renderNotifCcTable() {
    if (!document.getElementById('notif-cc-table')) return;
    const q = (document.getElementById('cc-search').value || '').trim().toLowerCase();
    const statusQ = document.getElementById('cc-filter-aktif').value;
    const tbody = document.querySelector('#notif-cc-table tbody');
    const rows = notifikasiCcData
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => !q || c.nama.toLowerCase().includes(q) || c.peran.toLowerCase().includes(q))
      .filter(({ c }) => !statusQ || (statusQ === 'aktif' ? c.aktif : !c.aktif));
    tbody.innerHTML = rows.length ? rows.map(({ c, i }) => `
      <tr>
        <td>${c.nama}</td>
        <td>${c.peran}</td>
        <td>${c.wa}</td>
        <td>${c.aktif ? '<span class="badge-status on"><span class="dot"></span> Aktif</span>' : '<span class="badge-status off"><span class="dot"></span> Nonaktif</span>'}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" onclick="openNotifCcPanel(${i})" title="Edit">✎</button>
            <button class="icon-btn icon-btn-red" onclick="removeNotifCc(${i})" title="Hapus">✕</button>
          </div>
        </td>
      </tr>`).join('') : `<tr><td colspan="5" class="empty-hint">Tidak ada penerima tembusan yang cocok dengan filter.</td></tr>`;
  }
  function openNotifCcPanel(idx) {
    notifCcEditIdx = (idx === undefined) ? null : idx;
    const panel = document.getElementById('notif-cc-panel');
    if (notifCcEditIdx !== null) {
      const c = notifikasiCcData[notifCcEditIdx];
      document.getElementById('notif-cc-panel-title').textContent = 'Edit Penerima Tembusan';
      document.getElementById('cc-nama').value = c.nama;
      document.getElementById('cc-peran').value = c.peran;
      document.getElementById('cc-wa').value = c.wa;
      document.getElementById('cc-aktif').checked = c.aktif;
    } else {
      document.getElementById('notif-cc-panel-title').textContent = 'Tambah Penerima Tembusan';
      document.getElementById('cc-nama').value = '';
      document.getElementById('cc-peran').value = '';
      document.getElementById('cc-wa').value = '';
      document.getElementById('cc-aktif').checked = true;
    }
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function closeNotifCcPanel() {
    document.getElementById('notif-cc-panel').style.display = 'none';
    notifCcEditIdx = null;
  }
  function saveNotifCc() {
    const nama = document.getElementById('cc-nama').value.trim();
    const peran = document.getElementById('cc-peran').value.trim();
    const wa = document.getElementById('cc-wa').value.trim();
    const aktif = document.getElementById('cc-aktif').checked;
    if (nama.length < 3) { showToast('Nama minimal 3 karakter'); return; }
    if (!peran) { showToast('Peran/Jabatan wajib diisi'); return; }
    if (!/^0\d{8,13}$/.test(wa.replace(/[\s-]/g, ''))) { showToast('No. WhatsApp tidak valid -- gunakan format 08xx...'); return; }
    const waNorm = wa.replace(/[\s-]/g, '');
    const dup = notifikasiCcData.some((c, i) => i !== notifCcEditIdx && c.wa.replace(/[\s-]/g, '') === waNorm);
    if (dup) { showToast('Nomor WhatsApp ini sudah terdaftar sebagai penerima tembusan'); return; }
    if (notifCcEditIdx !== null) {
      const id = notifikasiCcData[notifCcEditIdx].id;
      notifikasiCcData[notifCcEditIdx] = { id, nama, peran, wa, aktif };
    } else {
      notifikasiCcData.push({ id: notifCcSeq++, nama, peran, wa, aktif });
    }
    closeNotifCcPanel();
    renderNotifCcTable();
    showToast('✓ Penerima tembusan berhasil disimpan');
  }
  function removeNotifCc(idx) {
    notifikasiCcData.splice(idx, 1);
    renderNotifCcTable();
    showToast('Penerima tembusan dihapus');
  }

  // ---- Aturan Reminder & Eskalasi ----
  let aturanReminderSeq = 1;
  const aturanReminderData = [
    { id: aturanReminderSeq++, offsetHari: -7, nama: "Pengingat Awal", level: "1", channels: { wa: true, sms: false, email: false }, aktif: true },
    { id: aturanReminderSeq++, offsetHari: -1, nama: "Pengingat Terakhir", level: "1", channels: { wa: true, sms: true, email: false }, aktif: true },
    { id: aturanReminderSeq++, offsetHari: 5, nama: "Lewat Jatuh Tempo (disesuaikan sekolah ini)", level: "2", channels: { wa: true, sms: true, email: false }, aktif: true },
  ];
  // CRUD dipisah seperti fitur lain: Read = tabel ringkas (bukan input langsung), Create/Update
  // lewat panel dengan validasi sendiri-sendiri, Delete langsung per baris via ikon.
  let aturanReminderEditIdx = null;
  const CHANNEL_LABEL_SHORT = { wa: 'WA', sms: 'SMS', email: 'Email' };
  function renderAturanReminderTable() {
    if (!document.getElementById('rules-body')) return;
    const q = (document.getElementById('aturan-search').value || '').trim().toLowerCase();
    const levelQ = document.getElementById('aturan-filter-level').value;
    const chQ = document.getElementById('aturan-filter-channel').value;
    const aktifQ = document.getElementById('aturan-filter-aktif').value;
    const tbody = document.getElementById('rules-body');
    const rows = aturanReminderData
      .map((a, i) => ({ a, i }))
      .filter(({ a }) => !q || a.nama.toLowerCase().includes(q))
      .filter(({ a }) => !levelQ || a.level === levelQ)
      .filter(({ a }) => !chQ || a.channels[chQ])
      .filter(({ a }) => !aktifQ || (aktifQ === 'aktif' ? a.aktif : !a.aktif));
    tbody.innerHTML = rows.length ? rows.map(({ a, i }) => `
      <tr>
        <td>${a.offsetHari > 0 ? `H+${a.offsetHari}` : (a.offsetHari < 0 ? `H${a.offsetHari}` : 'H')}</td>
        <td>${a.nama}</td>
        <td>${REMINDER_LEVEL_LABEL[a.level]}</td>
        <td>${['wa', 'sms', 'email'].filter(c => a.channels[c]).map(c => CHANNEL_LABEL_SHORT[c]).join(', ') || '--'}</td>
        <td>${a.aktif ? '<span class="badge-status on"><span class="dot"></span> Aktif</span>' : '<span class="badge-status off"><span class="dot"></span> Nonaktif</span>'}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" onclick="openAturanReminderPanel(${i})" title="Edit">✎</button>
            <button class="icon-btn icon-btn-red" onclick="removeAturanReminderRow(${i})" title="Hapus">✕</button>
          </div>
        </td>
      </tr>`).join('') : `<tr><td colspan="6" class="empty-hint">Tidak ada aturan reminder yang cocok dengan filter.</td></tr>`;
  }
  function openAturanReminderPanel(idx) {
    aturanReminderEditIdx = (idx === undefined) ? null : idx;
    const panel = document.getElementById('aturan-panel');
    if (aturanReminderEditIdx !== null) {
      const a = aturanReminderData[aturanReminderEditIdx];
      document.getElementById('aturan-panel-title').textContent = 'Edit Aturan Reminder';
      document.getElementById('ar-offset').value = a.offsetHari;
      document.getElementById('ar-nama').value = a.nama;
      document.getElementById('ar-level').value = a.level;
      document.getElementById('ar-ch-wa').checked = a.channels.wa;
      document.getElementById('ar-ch-sms').checked = a.channels.sms;
      document.getElementById('ar-ch-email').checked = a.channels.email;
      document.getElementById('ar-aktif').checked = a.aktif;
    } else {
      document.getElementById('aturan-panel-title').textContent = 'Tambah Aturan Reminder';
      document.getElementById('ar-offset').value = 0;
      document.getElementById('ar-nama').value = '';
      document.getElementById('ar-level').value = '1';
      document.getElementById('ar-ch-wa').checked = true;
      document.getElementById('ar-ch-sms').checked = false;
      document.getElementById('ar-ch-email').checked = false;
      document.getElementById('ar-aktif').checked = true;
    }
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function closeAturanReminderPanel() {
    document.getElementById('aturan-panel').style.display = 'none';
    aturanReminderEditIdx = null;
  }
  function saveAturanReminder() {
    const offsetHari = parseInt(document.getElementById('ar-offset').value, 10);
    const nama = document.getElementById('ar-nama').value.trim();
    const level = document.getElementById('ar-level').value;
    const channels = {
      wa: document.getElementById('ar-ch-wa').checked,
      sms: document.getElementById('ar-ch-sms').checked,
      email: document.getElementById('ar-ch-email').checked,
    };
    const aktif = document.getElementById('ar-aktif').checked;

    if (!nama) { showToast('Nama Aturan wajib diisi'); return; }
    if (isNaN(offsetHari)) { showToast('Offset Hari harus berupa angka'); return; }
    if (!channels.wa && !channels.sms && !channels.email) { showToast('Aturan wajib punya minimal 1 channel aktif'); return; }
    const dup = aturanReminderData.some((a, i) => i !== aturanReminderEditIdx && a.offsetHari === offsetHari);
    if (dup) { showToast(`Offset Hari ${offsetHari} sudah dipakai aturan lain -- harus unik`); return; }

    if (aturanReminderEditIdx !== null) {
      const id = aturanReminderData[aturanReminderEditIdx].id;
      aturanReminderData[aturanReminderEditIdx] = { id, offsetHari, nama, level, channels, aktif };
    } else {
      aturanReminderData.push({ id: aturanReminderSeq++, offsetHari, nama, level, channels, aktif });
    }
    closeAturanReminderPanel();
    renderAturanReminderTable();
    showToast('✓ Aturan Reminder berhasil disimpan');
  }
  function removeAturanReminderRow(idx) {
    const removed = aturanReminderData[idx];
    aturanReminderData.splice(idx, 1);
    renderAturanReminderTable();
    showToast(`Aturan "${removed.nama}" dihapus`);
  }

  // ---- Template Pesan ----
  const templatePesanData = {
    wa: {
      "1": "Assalamu'alaikum, Bpk/Ibu wali {nama_siswa} (SD Muhammadiyah 4 Sidoarjo). Tagihan SPP Rp{nominal} jatuh tempo {tanggal_jatuh_tempo}. Bayar: {link_bayar}",
      "2": "Bpk/Ibu wali {nama_siswa}, tagihan SPP sudah lewat jatuh tempo {hari_terlambat} hari. Ditunggu konfirmasinya ya -- {link_bayar}",
      "3": "Pemberitahuan penting: tagihan SPP {nama_siswa} menunggak {hari_terlambat} hari. Kami akan menghubungi untuk pembahasan lebih lanjut. {link_bayar}",
    },
    sms: {
      "1": "SDM4 Sidoarjo: SPP {nama_siswa} Rp{nominal} jatuh tempo {tanggal_jatuh_tempo}. {link_bayar}",
      "2": "SDM4 Sidoarjo: SPP {nama_siswa} telat {hari_terlambat} hari. {link_bayar}",
      "3": "SDM4 Sidoarjo: Tunggakan SPP {nama_siswa} {hari_terlambat} hari. Sekolah akan menghubungi Anda.",
    },
    email: {
      "1": "Yth. Bpk/Ibu Wali {nama_siswa}, tagihan SPP SD Muhammadiyah 4 Sidoarjo Rp{nominal} jatuh tempo {tanggal_jatuh_tempo}. {link_bayar}",
      "2": "Yth. Bpk/Ibu Wali {nama_siswa}, tagihan SPP telah lewat jatuh tempo {hari_terlambat} hari. {link_bayar}",
      "3": "Yth. Bpk/Ibu Wali {nama_siswa}, tunggakan SPP sudah {hari_terlambat} hari. Sekolah akan menghubungi Bapak/Ibu.",
    },
  };
  const TMPL_CHANNEL_LABEL = { wa: 'WhatsApp', sms: 'SMS', email: 'Email' };
  function renderTemplatePesan() {
    if (!document.getElementById('tmpl-panel-wa')) return;
    const levelQ = document.getElementById('tmpl-filter-level').value;
    const levels = ['1', '2', '3'].filter(lvl => !levelQ || lvl === levelQ);
    ['wa', 'sms', 'email'].forEach(ch => {
      const panel = document.getElementById(`tmpl-panel-${ch}`);
      panel.innerHTML = levels.length ? levels.map(lvl => `
        <div class="tmpl-card">
          <div class="tmpl-head">${REMINDER_LEVEL_LABEL[lvl]}</div>
          <textarea class="tmpl-text" data-ch="${ch}" data-level="${lvl}" oninput="updateTmplCounter(this)">${templatePesanData[ch][lvl]}</textarea>
          <div class="hint tmpl-counter" style="margin-top:4px;"></div>
        </div>`).join('') : `<div class="empty-hint">Tidak ada level yang cocok dengan filter.</div>`;
      panel.querySelectorAll('.tmpl-text').forEach(updateTmplCounter);
    });
  }
  function updateTmplCounter(ta) {
    const hint = ta.nextElementSibling;
    if (!hint) return;
    const len = ta.value.length;
    if (ta.dataset.ch === 'sms') {
      const segs = Math.ceil(len / 160) || 1;
      hint.textContent = `${len} karakter -- kira-kira ${segs} segmen SMS`;
      hint.style.color = len > 320 ? 'var(--red)' : 'var(--muted)';
    } else {
      hint.textContent = `${len} karakter`;
      hint.style.color = 'var(--muted)';
    }
  }
  function saveTemplatePesan() {
    const textareas = document.querySelectorAll('#tmpl-root-konfig .tmpl-text');
    const draft = {};
    for (const ta of textareas) {
      const ch = ta.dataset.ch, lvl = ta.dataset.level;
      const val = ta.value.trim();
      const chLabel = TMPL_CHANNEL_LABEL[ch];
      if (!val) { showToast(`Template ${chLabel} ${REMINDER_LEVEL_LABEL[lvl]} tidak boleh kosong`); return; }
      if (!val.includes('{nama_siswa}')) { showToast(`Template ${chLabel} ${REMINDER_LEVEL_LABEL[lvl]} wajib mencantumkan {nama_siswa}`); return; }
      if ((lvl === '1' || lvl === '2') && !val.includes('{link_bayar}')) { showToast(`Template ${chLabel} ${REMINDER_LEVEL_LABEL[lvl]} wajib mencantumkan {link_bayar} supaya wali murid bisa langsung bayar`); return; }
      draft[ch] = draft[ch] || {};
      draft[ch][lvl] = val;
    }
    Object.keys(draft).forEach(ch => Object.assign(templatePesanData[ch], draft[ch]));
    showToast('✓ Template pesan sekolah ini berhasil disimpan');
  }
  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg || '✓ Berhasil disimpan';
    t.style.display = 'flex';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.style.display = 'none'; }, 2800);
  }
  function fmtRp(n) { return 'Rp' + n.toLocaleString('id-ID'); }

  // =========================================================================
  // MANAJEMEN SEKOLAH -- profil sekolah
  // =========================================================================
  function initSekolahProfil() {
    if (!document.getElementById('sk-alamat')) return;
    document.getElementById('sk-alamat').value = sekolahProfilData.alamat;
  }
  function saveAlamatSekolah() {
    if (!document.getElementById('sk-alamat')) return;
    const alamat = document.getElementById('sk-alamat').value.trim();
    if (!alamat) { showToast('Alamat tidak boleh kosong'); return; }
    sekolahProfilData.alamat = alamat;
    document.getElementById('sk-alamat').value = alamat;
    showToast('✓ Alamat sekolah berhasil disimpan');
  }

  // =========================================================================
  // MANAJEMEN SEKOLAH -- staff table
  // =========================================================================
  function statusAkunBadge(s) {
    if (s.status === 'undangan_terkirim') return '<span class="badge-status warn"><span class="dot"></span> Undangan Terkirim</span>';
    if (s.status === 'nonaktif') return '<span class="badge-status off"><span class="dot"></span> Nonaktif</span>';
    return '<span class="badge-status on"><span class="dot"></span> Aktif</span>';
  }
  function staffAksiHtml(s, idx) {
    const isSelf = currentUser && currentUser.email === s.email;
    const editBtn = `<div class="row-actions"><button class="icon-btn" onclick="openEditStaffPanel(${idx})" title="Edit">✎</button></div>`;
    if (s.status === 'undangan_terkirim') {
      return `${editBtn}
        <button class="btn btn-ghost btn-sm" style="width:100%;margin-bottom:4px;" onclick="resendInvite(${idx})">Kirim Ulang</button>
        <button class="btn btn-outline btn-sm" style="width:100%;" onclick="simulateActivation(${idx})" title="Khusus prototipe -- di produksi, ini terjadi otomatis saat penerima klik link undangan">Simulasikan Aktivasi</button>`;
    }
    if (s.status === 'nonaktif') {
      return editBtn + `<button class="btn btn-success btn-sm" style="width:100%;" onclick="toggleStaffStatus(${idx})">Aktifkan Kembali</button>`;
    }
    if (isSelf) return editBtn + '<span style="color:var(--muted);font-size:11px;">Akun Anda</span>';
    return editBtn + `<button class="btn btn-outline-red btn-sm" style="width:100%;" onclick="toggleStaffStatus(${idx})">Nonaktifkan</button>`;
  }
  function renderStaffTable() {
    if (!document.getElementById('sk-jumlah-siswa')) return;
    const searchEl = document.getElementById('sk-staff-search');
    const peranEl = document.getElementById('sk-staff-filter-peran');
    const statusEl = document.getElementById('sk-staff-filter-status');
    const search = searchEl ? searchEl.value.toLowerCase() : '';
    const peran = peranEl ? peranEl.value : '';
    const status = statusEl ? statusEl.value : '';
    const rows = staffData
      .map((s, idx) => ({ s, idx }))
      .filter(({s}) => !peran || s.peran === peran)
      .filter(({s}) => !status || s.status === status)
      .filter(({s}) => !search || s.nama.toLowerCase().includes(search) || s.email.toLowerCase().includes(search));
    const tbody = document.querySelector('#staff-table tbody');
    tbody.innerHTML = rows.length ? rows.map(({s, idx}) => `
      <tr>
        <td><div class="name-cell"><div class="avatar-sm">${initials(s.nama)}</div><div class="lines"><b>${s.nama}</b></div></div></td>
        <td>${s.peran}</td>
        <td>${s.wa}</td>
        <td>${s.email}</td>
        <td>${statusAkunBadge(s)}</td>
        <td>${staffAksiHtml(s, idx)}</td>
      </tr>`).join('') : `<tr><td colspan="6" class="empty-hint">Tidak ada pengguna yang cocok dengan filter.</td></tr>`;
    document.getElementById('sk-jumlah-siswa').value = studentsData.filter(s => s.status === 'aktif').length + ' siswa';
  }
  function initials(name) { return name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase(); }

  // ---- Undang / Edit Pengguna (delegated provisioning, invite-link -- bukan password langsung) ----
  let inviteSeq = 1;
  // null = panel sedang dipakai untuk undang pengguna baru; selain itu = index staffData yang diedit.
  let staffEditIdx = null;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function openInvitePanel() {
    if (!document.getElementById('invite-panel')) return;
    staffEditIdx = null;
    document.getElementById('invite-panel-title').textContent = 'Undang Pengguna Baru';
    document.getElementById('invite-panel-desc').textContent = 'Sebagai Admin sekolah ini, Anda bisa mengundang akun Kepala Sekolah, Bendahara, atau Admin cadangan -- tidak perlu menunggu Muhammadiyah Pusat.';
    document.getElementById('invite-panel-note').style.display = 'block';
    document.getElementById('invite-submit-btn').textContent = 'Kirim Undangan';
    document.getElementById('inv-nama').value = '';
    document.getElementById('inv-wa').value = '';
    document.getElementById('inv-email').value = '';
    document.getElementById('inv-peran').value = 'Kepala Sekolah';
    document.getElementById('invite-panel').style.display = 'block';
    document.getElementById('invite-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function openEditStaffPanel(idx) {
    if (!document.getElementById('invite-panel')) return;
    const s = staffData[idx];
    if (!s) return;
    staffEditIdx = idx;
    document.getElementById('invite-panel-title').textContent = `Edit Pengguna -- ${s.nama}`;
    document.getElementById('invite-panel-desc').textContent = 'Ubah nama, peran, No. WhatsApp, atau email pengguna ini.';
    document.getElementById('invite-panel-note').style.display = 'none';
    document.getElementById('invite-submit-btn').textContent = 'Simpan Perubahan';
    document.getElementById('inv-nama').value = s.nama;
    document.getElementById('inv-wa').value = s.wa;
    document.getElementById('inv-email').value = s.email;
    document.getElementById('inv-peran').value = s.peran;
    document.getElementById('invite-panel').style.display = 'block';
    document.getElementById('invite-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function closeInvitePanel() {
    if (!document.getElementById('invite-panel')) return;
    document.getElementById('invite-panel').style.display = 'none';
    staffEditIdx = null;
    document.getElementById('inv-nama').value = '';
    document.getElementById('inv-wa').value = '';
    document.getElementById('inv-email').value = '';
    document.getElementById('inv-peran').value = 'Kepala Sekolah';
  }
  function sendInvite() {
    if (!document.getElementById('inv-nama')) return;
    const nama = document.getElementById('inv-nama').value.trim();
    const peran = document.getElementById('inv-peran').value;
    const wa = document.getElementById('inv-wa').value.trim();
    const email = document.getElementById('inv-email').value.trim();
    if (!nama || !wa || !email) { showToast('Nama, No. WhatsApp, dan Email wajib diisi'); return; }
    if (!EMAIL_RE.test(email)) { showToast('Format email tidak valid'); return; }
    const dup = staffData.some((s, i) => s.email.toLowerCase() === email.toLowerCase() && i !== staffEditIdx);
    if (dup) { showToast('Email ini sudah terdaftar di sekolah ini'); return; }

    if (staffEditIdx !== null) {
      const s = staffData[staffEditIdx];
      if (currentUser && currentUser.email === s.email && peran !== 'Admin') {
        showToast('Tidak bisa mengubah peran akun Anda sendiri menjadi bukan Admin'); return;
      }
      s.nama = nama; s.peran = peran; s.wa = wa; s.email = email;
      closeInvitePanel();
      renderStaffTable();
      showToast(`✓ Data pengguna ${nama} berhasil diperbarui`);
      return;
    }

    staffData.push({
      nama, peran, wa, email, password: null,
      status: 'undangan_terkirim',
      inviteToken: 'INV-' + inviteSeq.toString(36).toUpperCase().padStart(4, '0') + '-' + Math.abs(nama.length * 7 + wa.length),
    });
    inviteSeq++;
    closeInvitePanel();
    renderStaffTable();
    showToast(`✓ Undangan aktivasi dikirim ke ${wa} & ${email}`);
  }
  function resendInvite(idx) {
    const s = staffData[idx];
    showToast(`✓ Undangan dikirim ulang ke ${s.wa} & ${s.email}`);
  }
  function simulateActivation(idx) {
    const s = staffData[idx];
    const pwPrefix = { 'Kepala Sekolah': 'kepsek2', 'Bendahara': 'bendahara2', 'Admin': 'admin2' };
    s.status = 'aktif';
    s.password = (pwPrefix[s.peran] || 'user') + '123';
    renderStaffTable();
    showToast(`✓ (Demo) ${s.nama} baru saja menyelesaikan aktivasi & mengatur password sendiri`);
  }
  function toggleStaffStatus(idx) {
    const s = staffData[idx];
    if (currentUser && currentUser.email === s.email) { showToast('Tidak bisa menonaktifkan akun Anda sendiri'); return; }
    s.status = s.status === 'nonaktif' ? 'aktif' : 'nonaktif';
    renderStaffTable();
    showToast(s.status === 'nonaktif' ? `Akun ${s.nama} dinonaktifkan` : `Akun ${s.nama} diaktifkan kembali`);
  }

  // =========================================================================
  // AKUN WALI MURID (MOBILE) -- pendaftaran & approval untuk kebutuhan SSO
  // =========================================================================
  function statusWaliBadge(w) {
    if (w.status === 'menunggu_approval') return '<span class="badge-status warn"><span class="dot"></span> Menunggu Approval</span>';
    if (w.status === 'ditolak') return '<span class="badge-status off"><span class="dot"></span> Ditolak</span>';
    if (w.status === 'nonaktif') return '<span class="badge-status off"><span class="dot"></span> Nonaktif</span>';
    return '<span class="badge-status on"><span class="dot"></span> Aktif</span>';
  }
  function metodeWaliLabel(w) {
    return w.metode === 'self_register'
      ? '<span title="Daftar sendiri lewat app">📲 Self-register</span>'
      : '<span title="Didaftarkan Admin di sekolah">🏫 Oleh Admin</span>';
  }
  function siswaTerkaitHtml(w) {
    return w.siswaList.map(s => `${s.nama} -- ${s.kelas}`).join('<br>');
  }
  // Registrasi (Admin) dan approval (Kepala Sekolah) sengaja dipisah -- segregation of duties,
  // yang mendaftarkan akun bukan yang memutuskan disetujui atau tidak.
  function waliAksiHtml(w, idx) {
    const isKepsek = currentUser && currentUser.peran === 'Kepala Sekolah';
    const isAdmin = currentUser && currentUser.peran === 'Admin';
    if (w.status === 'menunggu_approval') {
      if (isKepsek) {
        return `<button class="btn btn-success btn-sm" style="width:100%;margin-bottom:4px;" onclick="approveWali(${idx})">Setujui</button>
          <button class="btn btn-outline-red btn-sm" style="width:100%;" onclick="rejectWali(${idx})">Tolak</button>`;
      }
      return '<span style="color:var(--muted);font-size:11px;">Menunggu approval Kepala Sekolah</span>';
    }
    if (w.status === 'ditolak') return `<span style="color:var(--muted);font-size:11px;" title="${w.alasanTolak || ''}">Ditolak -- lihat alasan</span>`;
    if (!isAdmin) return '<span style="color:var(--muted);font-size:11px;">Dikelola Admin</span>';
    const editBtn = `<div class="row-actions"><button class="icon-btn" onclick="openEditWaliPanel(${idx})" title="Edit Siswa Terkait">✎</button></div>`;
    if (w.status === 'nonaktif') return editBtn + `<button class="btn btn-success btn-sm" style="width:100%;" onclick="toggleWaliStatus(${idx})">Aktifkan Kembali</button>`;
    return editBtn + `<button class="btn btn-outline-red btn-sm" style="width:100%;" onclick="toggleWaliStatus(${idx})">Nonaktifkan</button>`;
  }
  function renderWaliTable() {
    if (!document.getElementById('wali-table')) return;
    const tbody = document.querySelector('#wali-table tbody');
    if (tbody) {
      const namaQ = (document.getElementById('wali-filter-nama')?.value || '').trim().toLowerCase();
      const anakQ = (document.getElementById('wali-filter-anak')?.value || '').trim().toLowerCase();
      const rows = waliAccounts
        .map((w, idx) => ({ w, idx }))
        .filter(({ w }) => !namaQ || w.nama.toLowerCase().includes(namaQ))
        .filter(({ w }) => !anakQ || w.siswaList.some(s => s.nama.toLowerCase().includes(anakQ)));

      tbody.innerHTML = rows.length ? rows.map(({ w, idx }) => `
        <tr>
          <td><div class="name-cell"><div class="avatar-sm">${initials(w.nama)}</div><div class="lines"><b>${w.nama}</b></div></div></td>
          <td>${w.wa}${w.email ? '<br><span style="color:var(--muted);font-size:11px;">' + w.email + '</span>' : ''}</td>
          <td>${siswaTerkaitHtml(w)}</td>
          <td>${metodeWaliLabel(w)}</td>
          <td>${statusWaliBadge(w)}</td>
          <td>${waliAksiHtml(w, idx)}</td>
        </tr>`).join('') : `<tr><td colspan="6" class="empty-hint">Tidak ada akun wali murid yang cocok dengan filter.</td></tr>`;
    }
    const pending = waliAccounts.filter(w => w.status === 'menunggu_approval').length;
    const pill = document.getElementById('nav-wali-pending-count');
    if (pill) { pill.textContent = pending; pill.style.display = pending ? 'inline-block' : 'none'; }
  }
  // Hanya Admin yang mendaftarkan akun wali murid -- tombol & panel disembunyikan untuk peran lain.
  function applyWaliUiForRole() {
    if (!document.getElementById('btn-daftar-wali')) return;
    const btn = document.getElementById('btn-daftar-wali');
    if (btn) btn.style.display = (currentUser && currentUser.peran === 'Admin') ? 'inline-flex' : 'none';
    if (!(currentUser && currentUser.peran === 'Admin')) closeDaftarWaliPanel();
  }
  // Siswa yang dipilih di panel daftar/edit wali -- mendukung lebih dari 1 siswa per akun
  // (kakak-adik). Dicari lewat Kategori Kelas -> Kelas -> Nama Siswa, semua bisa diketik/dicari,
  // lalu ditambahkan satu per satu ke daftar di bawah tombol "+ Tambah ke Daftar".
  let waliSiswaSelected = [];
  // Daftar siswa yang cocok dengan filter Kategori Kelas + Kelas saat ini -- dropdown nama siswa
  // lalu memfilter lagi secara lokal dari daftar ini sambil diketik (dropdown search).
  let waliSiswaSearchMatches = [];
  function fillWaliKategoriSelect() {
    const sel = document.getElementById('wali-siswa-kategori');
    if (!sel) return;
    sel.innerHTML = '<option value="">Semua Kategori</option>' +
      kategoriKelasData.map(k => `<option value="${k.id}">${k.nama}</option>`).join('');
  }
  function onWaliKategoriChange() {
    document.getElementById('wali-siswa-kelas-search').value = '';
    refreshWaliKelasDatalist();
    refreshWaliSiswaMatches();
  }
  function refreshWaliKelasDatalist() {
    const dl = document.getElementById('wali-kelas-datalist');
    if (!dl) return;
    const katId = document.getElementById('wali-siswa-kategori').value;
    const list = masterKelasData.filter(m => !katId || String(m.kategoriId) === katId);
    dl.innerHTML = list.map(m => `<option value="${m.kelas}">${m.kelas} (${getKategoriNama(m.kategoriId)})</option>`).join('');
  }
  function onWaliKelasInputChange() {
    refreshWaliSiswaMatches();
  }
  function refreshWaliSiswaMatches() {
    const katId = document.getElementById('wali-siswa-kategori').value;
    const kelasQuery = (document.getElementById('wali-siswa-kelas-search').value || '').trim().toLowerCase();
    waliSiswaSearchMatches = studentsData.filter(s => {
      if (s.status !== 'aktif') return false;
      if (katId && String(getKategoriIdForKelas(s.kelas)) !== katId) return false;
      if (kelasQuery && !s.kelas.toLowerCase().includes(kelasQuery)) return false;
      return true;
    });
    document.getElementById('wali-siswa-nama-search').value = '';
    document.getElementById('wali-siswa-nama-value').value = '';
    hideWaliSiswaSearchList();
  }
  function renderWaliSiswaSearchList() {
    const list = document.getElementById('wali-siswa-search-list');
    if (!list) return;
    const q = document.getElementById('wali-siswa-nama-search').value.trim().toLowerCase();
    const filtered = waliSiswaSearchMatches.filter(s => !q || s.nama.toLowerCase().includes(q));
    list.innerHTML = filtered.length
      ? filtered.map(s => `<div class="search-select-item" onmousedown="selectWaliSiswaFromSearch('${s.nama.replace(/'/g, "\\'")}|${s.kelas}')">${s.nama} -- ${s.kelas}</div>`).join('')
      : '<div class="search-select-empty">Tidak ada siswa yang cocok</div>';
    list.style.display = 'block';
  }
  function hideWaliSiswaSearchList() {
    const list = document.getElementById('wali-siswa-search-list');
    if (list) list.style.display = 'none';
  }
  function selectWaliSiswaFromSearch(key) {
    const [snama, skelas] = key.split('|');
    document.getElementById('wali-siswa-nama-search').value = `${snama} -- ${skelas}`;
    document.getElementById('wali-siswa-nama-value').value = key;
    hideWaliSiswaSearchList();
  }
  function addWaliSiswaFromSearch() {
    const val = document.getElementById('wali-siswa-nama-value').value;
    if (!val) { showToast('Cari dan pilih nama siswa dari dropdown dulu'); return; }
    const [snama, skelas] = val.split('|');
    const s = studentsData.find(s => s.status === 'aktif' && s.nama === snama && s.kelas === skelas);
    if (!s) { showToast('Siswa tidak ditemukan -- pilih dari dropdown'); return; }
    if (waliSiswaSelected.some(w => w.nama === s.nama && w.kelas === s.kelas)) { showToast(`${s.nama} sudah ada di daftar`); return; }
    waliSiswaSelected.push({ nama: s.nama, kelas: s.kelas });
    document.getElementById('wali-siswa-nama-search').value = '';
    document.getElementById('wali-siswa-nama-value').value = '';
    renderWaliSiswaChips();
  }
  function removeWaliSiswa(idx) {
    waliSiswaSelected.splice(idx, 1);
    renderWaliSiswaChips();
  }
  function renderWaliSiswaChips() {
    const el = document.getElementById('wali-siswa-chips');
    if (!el) return;
    if (!waliSiswaSelected.length) {
      el.innerHTML = '<span style="color:var(--muted);font-size:12px;">Belum ada siswa dipilih.</span>';
      return;
    }
    el.innerHTML = waliSiswaSelected.map((s, i) => `
      <span class="tag-pill info" style="display:inline-flex;align-items:center;gap:6px;margin:3px 6px 3px 0;">
        ${s.nama} -- ${s.kelas}
        <span style="cursor:pointer;font-weight:800;" onclick="removeWaliSiswa(${i})" title="Hapus">&times;</span>
      </span>`).join('');
  }
  function resetWaliSiswaPicker(initialSiswaList) {
    waliSiswaSelected = initialSiswaList ? [...initialSiswaList] : [];
    fillWaliKategoriSelect();
    document.getElementById('wali-siswa-kategori').value = '';
    document.getElementById('wali-siswa-kelas-search').value = '';
    refreshWaliKelasDatalist();
    refreshWaliSiswaMatches();
    renderWaliSiswaChips();
  }
  function openDaftarWaliPanel() {
    if (!document.getElementById('daftar-wali-panel')) return;
    waliEditIdx = null;
    document.getElementById('daftar-wali-title').textContent = 'Daftarkan Akun Wali Murid';
    document.getElementById('daftar-wali-desc').textContent = 'Untuk wali murid yang datang langsung ke sekolah dan sudah diverifikasi identitasnya -- akun langsung Aktif, tidak melalui antrean approval.';
    document.getElementById('daftar-wali-submit-btn').textContent = 'Daftarkan & Aktifkan';
    document.getElementById('wali-nama').value = '';
    document.getElementById('wali-wa').value = '';
    document.getElementById('wali-email').value = '';
    resetWaliSiswaPicker();
    document.getElementById('daftar-wali-panel').style.display = 'block';
    document.getElementById('daftar-wali-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  // Admin bisa revisi siswa yang terhubung ke satu akun wali yang sudah ada -- misalnya ada
  // adik yang baru masuk sekolah dan harus ditambahkan ke akun kakaknya, atau siswa yang sudah
  // lulus/pindah dilepas dari akun tanpa perlu menonaktifkan seluruh akun wali.
  function openEditWaliPanel(idx) {
    if (!document.getElementById('daftar-wali-panel')) return;
    const w = waliAccounts[idx];
    if (!w) return;
    waliEditIdx = idx;
    document.getElementById('daftar-wali-title').textContent = `Edit Siswa Terkait -- ${w.nama}`;
    document.getElementById('daftar-wali-desc').textContent = 'Ubah data atau daftar siswa yang terhubung ke akun wali murid ini -- cocok untuk kakak-adik yang baru masuk atau sudah lulus/pindah sekolah.';
    document.getElementById('daftar-wali-submit-btn').textContent = 'Simpan Perubahan';
    document.getElementById('wali-nama').value = w.nama;
    document.getElementById('wali-wa').value = w.wa;
    document.getElementById('wali-email').value = w.email || '';
    resetWaliSiswaPicker(w.siswaList);
    document.getElementById('daftar-wali-panel').style.display = 'block';
    document.getElementById('daftar-wali-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function closeDaftarWaliPanel() {
    if (!document.getElementById('daftar-wali-panel')) return;
    const panel = document.getElementById('daftar-wali-panel');
    if (panel) panel.style.display = 'none';
    waliEditIdx = null;
    document.getElementById('wali-nama').value = '';
    document.getElementById('wali-wa').value = '';
    document.getElementById('wali-email').value = '';
    waliSiswaSelected = [];
  }
  function daftarkanWali() {
    if (!document.getElementById('wali-nama')) return;
    const nama = document.getElementById('wali-nama').value.trim();
    const wa = document.getElementById('wali-wa').value.trim();
    const email = document.getElementById('wali-email').value.trim();
    if (!nama || !wa || !waliSiswaSelected.length) { showToast('Nama, No. WhatsApp, dan minimal 1 Siswa Terkait wajib diisi'); return; }
    const siswaList = waliSiswaSelected.map(s => ({ nama: s.nama, kelas: s.kelas }));
    if (waliEditIdx !== null) {
      const w = waliAccounts[waliEditIdx];
      w.nama = nama; w.wa = wa; w.email = email; w.siswaList = siswaList;
      closeDaftarWaliPanel();
      renderWaliTable();
      showToast(`✓ Siswa terkait akun ${nama} berhasil diperbarui`);
      return;
    }
    waliAccounts.unshift({
      id: waliSeq++, nama, wa, email, siswaList,
      metode: 'didaftarkan_admin', status: 'aktif', tanggalDaftar: '2026-08-20',
    });
    closeDaftarWaliPanel();
    renderWaliTable();
    showToast(`✓ Akun ${nama} didaftarkan & langsung Aktif -- bisa SSO ke aplikasi mobile`);
  }
  function approveWali(idx) {
    const w = waliAccounts[idx];
    w.status = 'aktif';
    renderWaliTable();
    showToast(`✓ Akun ${w.nama} disetujui -- sekarang bisa SSO ke aplikasi mobile`);
  }
  function rejectWali(idx) {
    const w = waliAccounts[idx];
    const alasan = prompt(`Alasan penolakan akun ${w.nama}:`, 'Data tidak cocok dengan siswa terkait');
    if (alasan === null) return;
    w.status = 'ditolak';
    w.alasanTolak = alasan || '(tanpa alasan tertulis)';
    renderWaliTable();
    showToast(`Akun ${w.nama} ditolak -- tidak bisa SSO sampai didaftarkan ulang`);
  }
  function toggleWaliStatus(idx) {
    const w = waliAccounts[idx];
    w.status = w.status === 'nonaktif' ? 'aktif' : 'nonaktif';
    renderWaliTable();
    showToast(w.status === 'nonaktif' ? `Akun ${w.nama} dinonaktifkan` : `Akun ${w.nama} diaktifkan kembali`);
  }

  // =========================================================================
  // MANAJEMEN MURID -- list/detail
  // =========================================================================
  let currentStudentIdx = null;

  function renderStudentList() {
    if (!document.getElementById('murid-search')) return;
    const search = document.getElementById('murid-search').value.toLowerCase();
    const kelas = document.getElementById('murid-filter-kelas').value;
    const periode = document.getElementById('murid-filter-periode').value;
    const status = document.getElementById('murid-filter-status').value;
    const tbody = document.getElementById('murid-table-body');
    const rows = studentsData
      .map((s, i) => ({ s, i }))
      .filter(({s}) => !kelas || s.kelas === kelas)
      .filter(({s}) => !periode || s.periode === periode)
      .filter(({s}) => !status || s.status === status)
      .filter(({s}) => !search || s.nama.toLowerCase().includes(search) || s.nis.includes(search));

    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-hint">Tidak ada siswa yang cocok dengan filter.</td></tr>`;
      return;
    }
    tbody.innerHTML = rows.map(({s, i}) => `
      <tr>
        <td><div class="name-cell"><div class="avatar-sm">${initials(s.nama)}</div><div class="lines"><b>${s.nama}</b></div></div></td>
        <td>${s.nis}</td>
        <td>${s.kelas} <span style="color:var(--muted);font-size:10.5px;">(${getKategoriNama(getKategoriIdForKelas(s.kelas))})</span></td>
        <td>${s.periode || '-'}</td>
        <td><span class="badge-status ${s.status === 'aktif' ? 'on' : (s.status === 'lulus' ? 'blue' : (s.status === 'pindah' ? 'warn' : 'off'))}"><span class="dot"></span> ${s.status}</span></td>
        <td>${s.guardians.map(g => g.nama.split(' ')[0]).join(', ')} (${s.guardians.length})</td>
        <td><button class="btn btn-ghost btn-sm" onclick="openStudentDetail(${i})">Detail</button></td>
      </tr>`).join('');
  }

  function openTambahMuridPanel() {
    if (!document.getElementById('tm-kelas')) return;
    document.getElementById('tm-kelas').innerHTML = masterKelasData.map(m =>
      `<option value="${m.kelas}">${m.kelas} (${getKategoriNama(m.kategoriId)})</option>`).join('');
    document.getElementById('tm-periode').innerHTML = periodeOptions();
    document.getElementById('tambah-murid-panel').style.display = 'block';
    document.getElementById('tambah-murid-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function closeTambahMuridPanel() {
    if (!document.getElementById('tambah-murid-panel')) return;
    document.getElementById('tambah-murid-panel').style.display = 'none';
    document.getElementById('tm-nama').value = '';
    document.getElementById('tm-nis').value = '';
    document.getElementById('tm-status').value = 'aktif';
  }
  function simpanMuridBaru() {
    if (!document.getElementById('tm-nama')) return;
    const nama = document.getElementById('tm-nama').value.trim();
    const nis = document.getElementById('tm-nis').value.trim();
    const kelas = document.getElementById('tm-kelas').value;
    const periode = document.getElementById('tm-periode').value;
    const status = document.getElementById('tm-status').value;
    if (!nama || !nis) { showToast('Nama Siswa dan NIS wajib diisi'); return; }
    if (studentsData.some(s => s.nis === nis)) { showToast(`NIS ${nis} sudah dipakai siswa lain`); return; }
    studentsData.unshift({ nama, nis, kelas, periode, status, guardians: [] });
    closeTambahMuridPanel();
    renderStudentList();
    showToast(`✓ Siswa ${nama} berhasil ditambahkan -- klik Detail untuk melengkapi wali murid`);
  }

  function openStudentDetail(i) {
    if (!document.getElementById('md-title')) return;
    currentStudentIdx = i;
    const s = studentsData[i];
    document.getElementById('md-title').textContent = s.nama;
    document.getElementById('md-sub').textContent = `NIS ${s.nis || '-'} -- Kelas ${s.kelas} -- Periode ${s.periode || '-'}`;
    document.getElementById('md-nama').value = s.nama;
    document.getElementById('md-nis').value = s.nis;
    document.getElementById('md-kelas').innerHTML = masterKelasData.map(m =>
      `<option value="${m.kelas}">${m.kelas} (${getKategoriNama(m.kategoriId)})</option>`).join('');
    document.getElementById('md-kelas').value = s.kelas;
    document.getElementById('md-periode').innerHTML = periodeOptions(s.periode);
    document.getElementById('md-status').value = s.status;
    renderGuardianTable();
    document.getElementById('murid-list-panel').style.display = 'none';
    document.getElementById('murid-detail-panel').style.display = 'block';
  }
  function closeStudentDetail() {
    if (!document.getElementById('murid-detail-panel')) return;
    document.getElementById('murid-detail-panel').style.display = 'none';
    document.getElementById('murid-list-panel').style.display = 'block';
    renderStudentList();
  }
  function saveStudentInfo() {
    if (!document.getElementById('md-nama')) return;
    const s = studentsData[currentStudentIdx];
    s.nama = document.getElementById('md-nama').value;
    s.nis = document.getElementById('md-nis').value;
    s.kelas = document.getElementById('md-kelas').value;
    s.periode = document.getElementById('md-periode').value;
    s.status = document.getElementById('md-status').value;
    document.getElementById('md-title').textContent = s.nama;
    document.getElementById('md-sub').textContent = `NIS ${s.nis || '-'} -- Kelas ${s.kelas} -- Periode ${s.periode || '-'}`;
    fillWriteoffInvoiceSelect();
    showToast('✓ Info siswa berhasil disimpan');
  }
  function renderGuardianTable() {
    if (!document.getElementById('md-guardian-table')) return;
    const s = studentsData[currentStudentIdx];
    const tbody = document.querySelector('#md-guardian-table tbody');
    if (!s.guardians.length) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-hint">Belum ada wali murid terdaftar.</td></tr>`;
      return;
    }
    tbody.innerHTML = s.guardians.map((g, gi) => `
      <tr>
        <td><input type="text" value="${g.nama}"></td>
        <td><input type="tel" value="${g.wa}"></td>
        <td><input type="tel" value="${g.hp}"></td>
        <td><input type="email" value="${g.email}"></td>
        <td><select>
          <option value="ayah" ${g.relasi==='ayah'?'selected':''}>ayah</option>
          <option value="ibu" ${g.relasi==='ibu'?'selected':''}>ibu</option>
          <option value="wali" ${g.relasi==='wali'?'selected':''}>wali</option>
        </select></td>
        <td style="text-align:center;"><label class="toggle"><input type="checkbox" ${g.primary?'checked':''}><span class="slider"></span></label></td>
        <td><button class="btn-remove-row" onclick="removeGuardianRow(this, ${gi})">✕</button></td>
      </tr>`).join('');
  }
  function addGuardianRow() {
    const s = studentsData[currentStudentIdx];
    s.guardians.push({ nama: "", wa: "", hp: "", email: "", relasi: "wali", primary: s.guardians.length === 0 });
    renderGuardianTable();
  }
  function removeGuardianRow(btn, gi) {
    studentsData[currentStudentIdx].guardians.splice(gi, 1);
    renderGuardianTable();
  }

  // =========================================================================
  // TRANSAKSI & INVOICE
  // =========================================================================
  function switchPageTab(tab) {
    document.querySelectorAll('.page-tab').forEach(t => t.classList.toggle('active', t.dataset.ptab === tab));
    document.querySelectorAll('.page-tab-panel').forEach(p => p.classList.toggle('active', p.dataset.ptabpanel === tab));
    if (tab === 'writeoff') fillWriteoffInvoiceSelect();
    if (tab === 'manual') fillManualPaymentInvoiceSelect();
    if (tab === 'kategori') renderKategoriKelasTable();
    if (tab === 'kelas') renderMasterKelasTable();
    if (tab === 'pengguna') renderStaffTable();
  }

  const STATUS_BADGE = {
    draft: 'off', published: 'blue', sent: 'blue', partially_paid: 'warn', paid: 'on',
    overdue: 'danger', escalated: 'danger', restructured: 'purple', written_off: 'off', closed: 'off',
    success: 'on', pending: 'warn', failed: 'danger', expired: 'off', refunded: 'blue',
    requested: 'off', pending_approval: 'warn', approved: 'on', rejected: 'danger', applied: 'blue',
    menunggu_verifikasi: 'warn', terverifikasi: 'on', ditolak: 'danger',
  };
  const STATUS_LABEL_OVERRIDE = {
    menunggu_verifikasi: 'Menunggu Verifikasi', terverifikasi: 'Terverifikasi', ditolak: 'Ditolak',
    pending_approval: 'Menunggu Approval', approved: 'Disetujui', rejected: 'Ditolak', applied: 'Diterapkan', requested: 'Diajukan',
  };
  function statusBadge(status) {
    const cls = STATUS_BADGE[status] || 'off';
    const label = STATUS_LABEL_OVERRIDE[status] || status;
    return `<span class="badge-status ${cls}"><span class="dot"></span> ${label}</span>`;
  }

  // ---- Master Periode Tahun Ajaran ----
  function renderPeriodeTahunAjaran() {
    if (!document.getElementById('master-periode-body')) return;
    const tbody = document.getElementById('master-periode-body');
    tbody.innerHTML = periodeTahunAjaranData.map((p, i) => `
      <tr>
        <td><input type="text" value="${p.nama}" placeholder="mis. 2026/2027"></td>
        <td><input type="date" value="${p.mulai}"></td>
        <td><input type="date" value="${p.selesai}"></td>
        <td style="text-align:center;"><input type="radio" name="periode-aktif-radio" ${p.aktif ? 'checked' : ''}></td>
        <td><button class="btn-remove-row" onclick="removePeriodeRow(${i})">✕</button></td>
      </tr>`).join('');
  }
  function addPeriodeRow() {
    periodeTahunAjaranData.push({ id: periodeSeq++, nama: "", mulai: "", selesai: "", aktif: periodeTahunAjaranData.length === 0 });
    renderPeriodeTahunAjaran();
  }
  function removePeriodeRow(idx) {
    const wasActive = periodeTahunAjaranData[idx] && periodeTahunAjaranData[idx].aktif;
    periodeTahunAjaranData.splice(idx, 1);
    if (wasActive && periodeTahunAjaranData.length) periodeTahunAjaranData[0].aktif = true;
    renderPeriodeTahunAjaran();
    refreshPeriodeDropdowns();
  }
  function savePeriodeTahunAjaran() {
    if (!document.getElementById('master-periode-body')) return;
    const rows = document.querySelectorAll('#master-periode-body tr');
    rows.forEach((tr, i) => {
      const inputs = tr.querySelectorAll('input');
      periodeTahunAjaranData[i] = {
        id: (periodeTahunAjaranData[i] && periodeTahunAjaranData[i].id) || periodeSeq++,
        nama: inputs[0].value || 'Tanpa Nama',
        mulai: inputs[1].value,
        selesai: inputs[2].value,
        aktif: inputs[3].checked,
      };
    });
    if (!periodeTahunAjaranData.some(p => p.aktif) && periodeTahunAjaranData.length) periodeTahunAjaranData[0].aktif = true;
    renderPeriodeTahunAjaran();
    refreshPeriodeDropdowns();
    showToast('✓ Master periode tahun ajaran berhasil disimpan');
  }
  function getActivePeriodeNama() {
    const active = periodeTahunAjaranData.find(p => p.aktif);
    return active ? active.nama : (periodeTahunAjaranData[0] ? periodeTahunAjaranData[0].nama : '');
  }
  function periodeOptions(selectedNama) {
    if (!periodeTahunAjaranData.length) return `<option value="">-- belum ada periode tahun ajaran --</option>`;
    const sel = selectedNama || getActivePeriodeNama();
    return periodeTahunAjaranData.map(p =>
      `<option value="${p.nama}" ${p.nama === sel ? 'selected' : ''}>${p.nama}${p.aktif ? ' (Aktif)' : ''}</option>`
    ).join('');
  }
  function refreshPeriodeDropdowns() {
    if (!document.getElementById('inv-periode')) return;
    // dropdown periode di mode Massal
    const massalSel = document.getElementById('inv-periode');
    if (massalSel) massalSel.innerHTML = periodeOptions();
    // baris-baris periode di mode Individual yang sudah ada -- pertahankan pilihan jika masih valid
    document.querySelectorAll('.inv-ind-periode').forEach(sel => {
      const cur = sel.value;
      const stillValid = periodeTahunAjaranData.some(p => p.nama === cur);
      sel.innerHTML = periodeOptions(stillValid ? cur : undefined);
    });
    // daftar periode tahun ajaran berubah -- ikut refresh filter & isi Master Data Tagihan
    renderMasterTagihan();
  }

  // ---- Master Kategori Kelas & Master Kelas ----
  // CRUD dipisah: Read = tabel ringkas (termasuk jumlah kelas terkait), Create/Update lewat panel
  // dengan validasi sendiri-sendiri, Delete langsung per baris (dengan guard minimal 1 kategori).
  let kategoriEditIdx = null;
  function renderKategoriKelasTable() {
    if (!document.getElementById('master-kategori-kelas-body')) return;
    const q = (document.getElementById('kat-search')?.value || '').trim().toLowerCase();
    const tbody = document.getElementById('master-kategori-kelas-body');
    const rows = kategoriKelasData
      .map((k, i) => ({ k, i }))
      .filter(({ k }) => !q || k.nama.toLowerCase().includes(q));
    tbody.innerHTML = rows.length ? rows.map(({ k, i }) => `
      <tr>
        <td>${k.nama}</td>
        <td>${masterKelasData.filter(m => m.kategoriId === k.id).length} kelas</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" onclick="openKategoriPanel(${i})" title="Edit">✎</button>
            <button class="icon-btn icon-btn-red" onclick="removeKategoriKelasRow(${i})" title="Hapus">✕</button>
          </div>
        </td>
      </tr>`).join('') : `<tr><td colspan="3" class="empty-hint">Tidak ada kategori yang cocok dengan pencarian.</td></tr>`;
  }
  function openKategoriPanel(idx) {
    kategoriEditIdx = (idx === undefined) ? null : idx;
    const panel = document.getElementById('kategori-panel');
    if (kategoriEditIdx !== null) {
      document.getElementById('kategori-panel-title').textContent = 'Edit Kategori Sekolah';
      document.getElementById('kat-nama').value = kategoriKelasData[kategoriEditIdx].nama;
    } else {
      document.getElementById('kategori-panel-title').textContent = 'Tambah Kategori Sekolah';
      document.getElementById('kat-nama').value = '';
    }
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function closeKategoriPanel() {
    document.getElementById('kategori-panel').style.display = 'none';
    kategoriEditIdx = null;
  }
  function saveKategoriKelas() {
    const nama = document.getElementById('kat-nama').value.trim();
    if (!nama) { showToast('Nama Kategori wajib diisi'); return; }
    const dup = kategoriKelasData.some((k, i) => i !== kategoriEditIdx && k.nama.toLowerCase() === nama.toLowerCase());
    if (dup) { showToast(`Nama kategori "${nama}" sudah dipakai kategori lain`); return; }
    if (kategoriEditIdx !== null) {
      kategoriKelasData[kategoriEditIdx].nama = nama;
    } else {
      kategoriKelasData.push({ id: kategoriKelasSeq++, nama });
    }
    closeKategoriPanel();
    renderKategoriKelasTable();
    renderMasterKelasTable();
    renderMasterTagihan();
    showToast('✓ Kategori Sekolah berhasil disimpan');
  }
  function removeKategoriKelasRow(idx) {
    if (kategoriKelasData.length <= 1) { showToast('Minimal harus ada 1 kategori kelas'); return; }
    const removed = kategoriKelasData[idx];
    const terpakai = masterKelasData.filter(m => m.kategoriId === removed.id).length;
    kategoriKelasData.splice(idx, 1);
    const fallbackId = kategoriKelasData[0].id;
    masterKelasData.forEach(m => { if (m.kategoriId === removed.id) m.kategoriId = fallbackId; });
    masterTagihanData.forEach(m => { delete m.nominalByKategori[removed.id]; });
    renderKategoriKelasTable();
    renderMasterKelasTable();
    renderMasterTagihan();
    showToast(`Kategori "${removed.nama}" dihapus${terpakai ? ` -- ${terpakai} kelas dipindah ke kategori "${kategoriKelasData[0].nama}"` : ''}`);
  }

  function renderMasterKelasTable() {
    if (!document.getElementById('master-kelas-body')) return;
    const filterEl = document.getElementById('mk-filter-kategori');
    if (filterEl) {
      const curFilter = filterEl.value;
      filterEl.innerHTML = '<option value="">Semua Kategori</option>' +
        kategoriKelasData.map(k => `<option value="${k.id}" ${String(k.id) === curFilter ? 'selected' : ''}>${k.nama}</option>`).join('');
    }
    const katFilter = filterEl ? filterEl.value : '';
    const tbody = document.getElementById('master-kelas-body');
    const rows = masterKelasData
      .map((m, i) => ({ m, i }))
      .filter(({m}) => !katFilter || String(m.kategoriId) === katFilter);
    tbody.innerHTML = rows.length ? rows.map(({m, i}) => `
      <tr data-idx="${i}">
        <td><input type="text" value="${m.kelas}"></td>
        <td><select>${kategoriKelasData.map(k => `<option value="${k.id}" ${k.id === m.kategoriId ? 'selected' : ''}>${k.nama}</option>`).join('')}</select></td>
        <td><button class="btn-remove-row" onclick="removeMasterKelasRow(${i})">✕</button></td>
      </tr>`).join('') : `<tr><td colspan="3" class="empty-hint">Tidak ada kelas untuk kategori ini.</td></tr>`;
  }
  function addMasterKelasRow() {
    masterKelasData.push({ kelas: "", kategoriId: kategoriKelasData[0].id });
    const filterEl = document.getElementById('mk-filter-kategori');
    if (filterEl) filterEl.value = '';
    renderMasterKelasTable();
  }
  // Kelas yang masih dipakai siswa (lewat studentsData.kelas, string code) tidak boleh dihapus --
  // kalau diizinkan, data siswa jadi "yatim": kategori & nominal SPP-nya akan salah/null karena
  // getKategoriIdForKelas/getNominalTagihan tidak akan menemukan kelasnya lagi.
  function removeMasterKelasRow(idx) {
    const target = masterKelasData[idx];
    if (!target) return;
    const usedBy = target.kelas ? studentsData.filter(s => s.kelas === target.kelas) : [];
    if (usedBy.length) {
      showToast(`Kelas ${target.kelas} masih dipakai ${usedBy.length} siswa -- pindahkan siswanya dulu lewat Manajemen Murid`);
      return;
    }
    masterKelasData.splice(idx, 1);
    renderMasterKelasTable();
  }
  function saveMasterKelasOnly() {
    if (!document.getElementById('master-kelas-body')) return;
    const edited = [...document.querySelectorAll('#master-kelas-body tr[data-idx]')].map(tr => ({
      idx: parseInt(tr.dataset.idx, 10),
      kelas: tr.querySelector('input').value.trim(),
      kategoriId: parseInt(tr.querySelector('select').value, 10),
    }));
    if (edited.some(e => !e.kelas)) { showToast('Kode kelas tidak boleh kosong'); return; }

    // Cek duplikat lintas seluruh daftar kelas (termasuk yang sedang tersembunyi karena filter).
    const preview = masterKelasData.map((m, i) => {
      const e = edited.find(e => e.idx === i);
      return e ? e.kelas : m.kelas;
    });
    const seen = new Set();
    for (const k of preview) {
      const key = k.toLowerCase();
      if (seen.has(key)) { showToast(`Kode kelas "${k}" dipakai lebih dari satu kali`); return; }
      seen.add(key);
    }

    // Ganti nama kode kelas yang masih dipakai siswa diblok -- studentsData menyimpan kelas
    // sebagai string code, jadi rename di sini akan memutus referensinya kalau diizinkan.
    for (const e of edited) {
      const original = masterKelasData[e.idx];
      if (original.kelas !== e.kelas) {
        const usedBy = studentsData.filter(s => s.kelas === original.kelas);
        if (usedBy.length) {
          showToast(`Kelas ${original.kelas} masih dipakai ${usedBy.length} siswa -- tidak bisa ganti nama kelas ini`);
          return;
        }
      }
    }

    edited.forEach(e => {
      masterKelasData[e.idx].kelas = e.kelas;
      masterKelasData[e.idx].kategoriId = e.kategoriId;
    });
    renderMasterKelasTable();
    renderMasterTagihan();
    refreshKelasDropdowns();
    showToast('✓ Kelas berhasil disimpan');
  }
  function refreshKelasDropdowns() {
    const muridSel = document.getElementById('murid-filter-kelas');
    if (muridSel) {
      const curMurid = muridSel.value;
      muridSel.innerHTML = `<option value="">Semua Kelas</option>` +
        masterKelasData.map(m => `<option ${m.kelas === curMurid ? 'selected' : ''}>${m.kelas}</option>`).join('');
    }

    const muridPeriodeSel = document.getElementById('murid-filter-periode');
    if (muridPeriodeSel) {
      const curMuridPeriode = muridPeriodeSel.value;
      muridPeriodeSel.innerHTML = `<option value="">Semua Periode</option>` +
        periodeTahunAjaranData.map(p => `<option ${p.nama === curMuridPeriode ? 'selected' : ''}>${p.nama}</option>`).join('');
    }

    const massalKategoriSel = document.getElementById('inv-massal-kategori');
    if (massalKategoriSel) {
      const curMassalKat = massalKategoriSel.value;
      massalKategoriSel.innerHTML = '<option value="">Semua Kategori</option>' +
        kategoriKelasData.map(k => `<option value="${k.id}" ${String(k.id) === curMassalKat ? 'selected' : ''}>${k.nama}</option>`).join('');
      renderMassalKelasChips();
    }

    const blastSubKelas = document.getElementById('blast-sub-kelas');
    if (blastSubKelas) {
      blastSubKelas.innerHTML = masterKelasData.map(m =>
        `<label class="chip-check"><input type="checkbox" class="blast-kelas-chk" value="${m.kelas}" onchange="updateBlastEstimate()"> ${m.kelas}</label>`).join('');
    }

    const invFilterSel = document.getElementById('inv-filter-kelas');
    if (invFilterSel) {
      const curInvFilter = invFilterSel.value;
      invFilterSel.innerHTML = `<option value="">Semua Kelas</option>` +
        masterKelasData.map(m => `<option ${m.kelas === curInvFilter ? 'selected' : ''}>${m.kelas}</option>`).join('');
    }

    if (muridSel) renderStudentList();
  }

  // ---- Master Data Tagihan ----
  function jenisTagihanOptions(selectedNama, kelasCode, periodeNama) {
    const periode = periodeNama || getActivePeriodeNama();
    return masterTagihanData.filter(m => m.aktif && m.periodeTahunAjaran === periode).map(m => {
      const nominal = getNominalTagihan(m.nama, kelasCode, periode);
      return `<option value="${m.nama}" data-nominal="${nominal}" ${m.nama === selectedNama ? 'selected' : ''}>${m.nama} (${PERIODE_LABEL[m.periode]})</option>`;
    }).join('');
  }
  // Master Data Tagihan difilter per Periode Tahun Ajaran karena nominalnya bisa berbeda tiap
  // tahun (mis. SPP naik). Default filter = periode yang sedang aktif. data-idx di tiap baris
  // menyimpan index ASLI di masterTagihanData supaya simpan/hapus tetap benar walau sedang difilter.
  function fillMasterTagihanFilter() {
    const sel = document.getElementById('mt-filter-periode');
    if (!sel) return;
    // defaultnya periode tahun ajaran aktif saat pertama kali render; setelah itu pilihan user
    // (termasuk "Semua Periode") dipertahankan lewat render ulang berikutnya.
    const cur = sel.options.length ? sel.value : getActivePeriodeNama();
    sel.innerHTML = '<option value="">Semua Periode</option>' + periodeOptions();
    sel.value = cur;
  }
  function renderMasterTagihan() {
    if (!document.getElementById('master-tagihan-body')) return;
    fillMasterTagihanFilter();
    const filterPeriode = document.getElementById('mt-filter-periode').value;
    const tbody = document.getElementById('master-tagihan-body');
    const rows = masterTagihanData
      .map((m, i) => ({ m, i }))
      .filter(({ m }) => !filterPeriode || m.periodeTahunAjaran === filterPeriode);
    tbody.innerHTML = rows.length ? rows.map(({ m, i }) => `
      <tr data-idx="${i}">
        <td><input type="text" value="${m.nama}"></td>
        <td><select class="mt-periode-tahun">${periodeOptions(m.periodeTahunAjaran)}</select></td>
        <td><select>
          <option value="sekali" ${m.periode==='sekali'?'selected':''}>Sekali Bayar</option>
          <option value="bulanan" ${m.periode==='bulanan'?'selected':''}>Bulanan</option>
          <option value="per3bulan" ${m.periode==='per3bulan'?'selected':''}>Per 3 Bulan</option>
          <option value="per6bulan" ${m.periode==='per6bulan'?'selected':''}>Per 6 Bulan</option>
          <option value="tahunan" ${m.periode==='tahunan'?'selected':''}>Tahunan</option>
        </select></td>
        <td>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${kategoriKelasData.map(k => `
              <div style="display:flex;align-items:center;gap:6px;">
                <span style="width:66px;flex-shrink:0;font-size:11px;color:var(--muted);">${k.nama}</span>
                <input type="number" class="mt-nominal-kat" data-kat-id="${k.id}" value="${m.nominalByKategori[k.id] ?? 0}">
              </div>`).join('')}
          </div>
        </td>
        <td><label class="toggle"><input type="checkbox" ${m.aktif?'checked':''}><span class="slider"></span></label></td>
        <td><button class="btn-remove-row" onclick="removeMasterTagihanRow(${i})">✕</button></td>
      </tr>`).join('') : `<tr><td colspan="6" class="empty-hint">Belum ada kategori tagihan untuk periode ini.</td></tr>`;
  }
  function addMasterTagihanRow() {
    const nominalByKategori = {};
    kategoriKelasData.forEach(k => nominalByKategori[k.id] = 0);
    const filterPeriode = document.getElementById('mt-filter-periode')?.value;
    masterTagihanData.push({ nama: "Kategori Baru", periode: "sekali", periodeTahunAjaran: filterPeriode || getActivePeriodeNama(), nominalByKategori, aktif: true });
    renderMasterTagihan();
  }
  function removeMasterTagihanRow(idx) {
    masterTagihanData.splice(idx, 1);
    renderMasterTagihan();
  }
  function saveMasterTagihan() {
    if (!document.getElementById('master-tagihan-body')) return;
    const rows = document.querySelectorAll('#master-tagihan-body tr[data-idx]');
    rows.forEach(tr => {
      const idx = parseInt(tr.dataset.idx, 10);
      const nama = tr.querySelector('td:nth-child(1) input').value || 'Tanpa Nama';
      const periodeTahunAjaran = tr.querySelector('.mt-periode-tahun').value;
      const periode = tr.querySelector('td:nth-child(3) select').value;
      const nominalByKategori = {};
      tr.querySelectorAll('.mt-nominal-kat').forEach(inp => {
        nominalByKategori[inp.dataset.katId] = parseInt(inp.value, 10) || 0;
      });
      const aktif = tr.querySelector('td:nth-child(5) input[type=checkbox]').checked;
      masterTagihanData[idx] = { nama, periode, periodeTahunAjaran, nominalByKategori, aktif };
    });
    renderMasterTagihan();
    refreshJenisTagihanDropdowns();
    showToast('✓ Master data tagihan berhasil disimpan');
  }
  function refreshJenisTagihanDropdowns() {
    if (!document.getElementById('inv-massal-jenis')) return;
    // refresh massal dropdown -- ikut Periode (tahun ajaran) yang dipilih di mode Massal
    const massalSel = document.getElementById('inv-massal-jenis');
    const prevVal = massalSel.value;
    const massalPeriode = document.getElementById('inv-periode')?.value;
    massalSel.innerHTML = jenisTagihanOptions(undefined, undefined, massalPeriode);
    if ([...massalSel.options].some(o => o.value === prevVal)) massalSel.value = prevVal;
    onMassalJenisChange();
    // refresh existing individual rows' jenis select (keep current selection where still valid),
    // masing-masing baris pakai kelas & periode sendiri karena tiap baris bisa beda-beda.
    document.querySelectorAll('#inv-individual-body tr').forEach(tr => {
      const sel = tr.querySelector('.inv-ind-jenis');
      if (!sel) return;
      const rowKelas = tr.querySelector('.inv-ind-kelas-row')?.value || '';
      const rowPeriode = tr.querySelector('.inv-ind-periode')?.value || '';
      const cur = sel.value;
      sel.innerHTML = jenisTagihanOptions(cur, rowKelas, rowPeriode);
      syncIndividualNominal(sel);
    });
  }

  // ---- Buat Tagihan Baru ----
  function setInvoiceMode(mode) {
    if (!document.getElementById('inv-mode-individual')) return;
    document.getElementById('inv-mode-individual').checked = mode === 'individual';
    document.getElementById('inv-mode-massal').checked = mode === 'massal';
    document.getElementById('inv-mode-import').checked = mode === 'import';
    document.getElementById('inv-sub-individual').classList.toggle('open', mode === 'individual');
    document.getElementById('inv-sub-massal').classList.toggle('open', mode === 'massal');
    document.getElementById('inv-sub-import').classList.toggle('open', mode === 'import');
    document.getElementById('inv-create-btn-row').style.display = mode === 'import' ? 'none' : 'flex';
  }

  // Tiap baris di tabel Individual punya filter sendiri-sendiri: Jenis Kelas (kategori) -> Kelas ->
  // Nama, bertingkat seperti di Akun Wali Murid. Tidak ada dropdown default lagi di atas tabel --
  // semua dipilih langsung per baris supaya tiap baris bebas beda kategori/kelas/siswa.
  function kategoriRowOptions(selectedKatId) {
    return '<option value="">-- pilih jenis kelas --</option>' +
      kategoriKelasData.map(k => `<option value="${k.id}" ${String(k.id) === String(selectedKatId) ? 'selected' : ''}>${k.nama}</option>`).join('');
  }
  function kelasRowOptions(selectedKelas, katId) {
    const list = masterKelasData.filter(m => !katId || String(m.kategoriId) === String(katId));
    return '<option value="">-- pilih kelas --</option>' +
      list.map(m => `<option value="${m.kelas}" ${m.kelas === selectedKelas ? 'selected' : ''}>${m.kelas}</option>`).join('');
  }
  function siswaOptionsForKelas(kelas) {
    if (!kelas) return '<option value="">-- pilih kelas dulu --</option>';
    const opts = studentsData.filter(s => s.status === 'aktif' && s.kelas === kelas)
      .map(s => `<option value="${s.nama}">${s.nama}</option>`).join('');
    return opts || '<option value="">(tidak ada siswa aktif)</option>';
  }
  function addIndividualInvoiceRow() {
    if (!document.getElementById('inv-individual-body')) return;
    const tbody = document.getElementById('inv-individual-body');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><select class="inv-ind-kategori-row" onchange="onIndRowKategoriChange(this)">${kategoriRowOptions('')}</select></td>
      <td><select class="inv-ind-kelas-row" onchange="onIndRowKelasChange(this)">${kelasRowOptions('', '')}</select></td>
      <td><select class="inv-ind-siswa">${siswaOptionsForKelas('')}</select></td>
      <td><select class="inv-ind-periode" onchange="onIndRowPeriodeChange(this)">${periodeOptions()}</select></td>
      <td><select class="inv-ind-jenis" onchange="syncIndividualNominal(this)">${jenisTagihanOptions(undefined, '')}</select></td>
      <td><input type="number" class="inv-ind-nominal" value="0"></td>
      <td><input type="date" class="inv-ind-jatuhtempo" value="2026-08-10"></td>
      <td><button class="btn-remove-row" onclick="removeRow(this)">✕</button></td>`;
    tbody.appendChild(tr);
    syncIndividualNominal(tr.querySelector('.inv-ind-jenis'));
    document.getElementById('inv-individual-hint').style.display = 'none';
  }
  function onIndRowKategoriChange(selectEl) {
    const tr = selectEl.closest('tr');
    const katId = selectEl.value;
    const periode = tr.querySelector('.inv-ind-periode').value;
    tr.querySelector('.inv-ind-kelas-row').innerHTML = kelasRowOptions('', katId);
    tr.querySelector('.inv-ind-siswa').innerHTML = siswaOptionsForKelas('');
    const jenisSel = tr.querySelector('.inv-ind-jenis');
    jenisSel.innerHTML = jenisTagihanOptions(jenisSel.value, '', periode);
    syncIndividualNominal(jenisSel);
  }
  function onIndRowKelasChange(selectEl) {
    const tr = selectEl.closest('tr');
    const kelas = selectEl.value;
    const periode = tr.querySelector('.inv-ind-periode').value;
    tr.querySelector('.inv-ind-siswa').innerHTML = siswaOptionsForKelas(kelas);
    const jenisSel = tr.querySelector('.inv-ind-jenis');
    jenisSel.innerHTML = jenisTagihanOptions(jenisSel.value, kelas, periode);
    syncIndividualNominal(jenisSel);
  }
  function onIndRowPeriodeChange(selectEl) {
    const tr = selectEl.closest('tr');
    const periode = selectEl.value;
    const kelas = tr.querySelector('.inv-ind-kelas-row').value;
    const jenisSel = tr.querySelector('.inv-ind-jenis');
    jenisSel.innerHTML = jenisTagihanOptions(jenisSel.value, kelas, periode);
    syncIndividualNominal(jenisSel);
  }
  function syncIndividualNominal(selectEl) {
    const opt = selectEl.selectedOptions[0];
    const nominal = opt ? parseInt(opt.dataset.nominal, 10) || 0 : 0;
    selectEl.closest('tr').querySelector('.inv-ind-nominal').value = nominal;
  }

  // Kategori Kelas dipilih dulu untuk mempersempit daftar chip Target Kelas di bawahnya --
  // "Semua Kategori" menampilkan semua kelas seperti sebelumnya (kelas lintas kategori masih
  // bisa dicentang bersamaan, nominal per kategori tetap ditangani di renderMassalNominalFields).
  function renderMassalKelasChips() {
    const massalChips = document.getElementById('inv-massal-kelas-chips');
    if (!massalChips) return;
    const katId = document.getElementById('inv-massal-kategori').value;
    const checkedBefore = [...document.querySelectorAll('.inv-massal-kelas-chk:checked')].map(c => c.value);
    const list = masterKelasData.filter(m => !katId || String(m.kategoriId) === katId);
    massalChips.innerHTML = list.map(m =>
      `<label class="chip-check"><input type="checkbox" class="inv-massal-kelas-chk" value="${m.kelas}" ${checkedBefore.includes(m.kelas) ? 'checked' : ''} onchange="renderMassalNominalFields()"> ${m.kelas}</label>`).join('');
    renderMassalNominalFields();
  }
  function onMassalKategoriChange() {
    renderMassalKelasChips();
  }

  // Nominal massal mengikuti Kategori Kelas dari kelas-kelas yang dicentang -- satu field nominal
  // per kategori yang muncul di antara kelas terpilih, supaya kelas dengan kategori berbeda bisa
  // ditagih dengan nominal berbeda dalam satu kali proses.
  function renderMassalNominalFields() {
    if (!document.getElementById('inv-massal-nominal-wrap')) return;
    const wrap = document.getElementById('inv-massal-nominal-wrap');
    if (!wrap) return;
    const jenis = document.getElementById('inv-massal-jenis').value;
    const periode = document.getElementById('inv-periode')?.value;
    const kelasChecked = [...document.querySelectorAll('.inv-massal-kelas-chk:checked')].map(c => c.value);
    const katIds = [...new Set(kelasChecked.map(getKategoriIdForKelas).filter(id => id != null))];
    if (!katIds.length) {
      wrap.innerHTML = `<input type="number" class="inv-massal-nominal-kat" data-kat-id="" value="${getNominalTagihan(jenis, undefined, periode)}">`;
      return;
    }
    wrap.innerHTML = katIds.map(katId => `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
        <span style="width:76px;flex-shrink:0;font-size:11.5px;color:var(--muted);">${getKategoriNama(katId)}</span>
        <input type="number" class="inv-massal-nominal-kat" data-kat-id="${katId}" value="${getNominalTagihan(jenis, kelasChecked.find(k => getKategoriIdForKelas(k) === katId), periode)}">
      </div>`).join('');
  }
  function onMassalJenisChange() {
    renderMassalNominalFields();
  }
  function onMassalPeriodeChange() {
    const periode = document.getElementById('inv-periode').value;
    const sel = document.getElementById('inv-massal-jenis');
    const cur = sel.value;
    sel.innerHTML = jenisTagihanOptions(cur, undefined, periode);
    renderMassalNominalFields();
  }

  function createInvoice() {
    if (!document.getElementById('inv-mode-individual')) return;
    const mode = document.getElementById('inv-mode-individual').checked ? 'individual' : 'massal';
    let count = 0;

    if (mode === 'individual') {
      const rows = document.querySelectorAll('#inv-individual-body tr');
      rows.forEach(tr => {
        const rowKelas = tr.querySelector('.inv-ind-kelas-row').value;
        const siswaNama = tr.querySelector('.inv-ind-siswa').value;
        const jenis = tr.querySelector('.inv-ind-jenis').value;
        const nominal = parseInt(tr.querySelector('.inv-ind-nominal').value, 10) || 0;
        const periode = tr.querySelector('.inv-ind-periode').value;
        const jatuhTempo = tr.querySelector('.inv-ind-jatuhtempo').value;
        if (!rowKelas || !siswaNama) return;
        const s = studentsData.find(s => s.nama === siswaNama && s.kelas === rowKelas);
        if (!s) return;
        invoiceData.unshift({ id: invoiceSeq++, siswa: s.nama, kelas: s.kelas, jenis, periode, nominal, jatuhTempo, status: 'draft' });
        count++;
      });
      if (!count) { showToast('Belum ada baris siswa yang lengkap (kelas & nama) untuk ditagihkan'); return; }
    } else {
      const kelasList = [...document.querySelectorAll('.inv-massal-kelas-chk:checked')].map(c => c.value);
      if (!kelasList.length) { showToast('Pilih minimal satu kelas untuk tagihan massal'); return; }
      const jenis = document.getElementById('inv-massal-jenis').value;
      const periode = document.getElementById('inv-periode').value;
      const jatuhTempo = document.getElementById('inv-jatuh-tempo').value;
      const targets = studentsData.filter(s => s.status === 'aktif' && kelasList.includes(s.kelas));
      targets.forEach(s => {
        const katId = getKategoriIdForKelas(s.kelas);
        const inp = document.querySelector(`.inv-massal-nominal-kat[data-kat-id="${katId}"]`) || document.querySelector('.inv-massal-nominal-kat');
        const nominal = inp ? (parseInt(inp.value, 10) || 0) : 0;
        invoiceData.unshift({ id: invoiceSeq++, siswa: s.nama, kelas: s.kelas, jenis, periode, nominal, jatuhTempo, status: 'draft' });
        count++;
      });
      if (!count) { showToast('Tidak ada siswa aktif di kelas yang dipilih'); return; }
    }

    renderInvoiceList();
    updateStats();
    showToast(`✓ ${count} draft tagihan berhasil dibuat`);

    // reset form
    document.getElementById('inv-individual-body').innerHTML = '';
    document.getElementById('inv-individual-hint').style.display = 'block';
    document.querySelectorAll('.inv-massal-kelas-chk').forEach(c => c.checked = false);
    renderMassalNominalFields();
  }
  function publishInvoice(id) {
    const inv = invoiceData.find(i => i.id === id);
    if (inv) inv.status = 'sent';
    renderInvoiceList();
    updateStats();
    showToast('✓ Tagihan diterbitkan & dikirim ke wali murid');
  }

  // ---- Import Tagihan dari File (CSV/Excel) ----
  let importRows = [];

  function downloadImportTemplate() {
    const rows = [
      ['NIS', 'Jenis Tagihan', 'Nominal', 'Periode', 'Jatuh Tempo'],
      ['2201001', 'SPP', '350000', '2026-09', '2026-09-10'],
      ['2201002', 'SPP', '350000', '2026-09', '2026-09-10'],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'template_import_tagihan.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✓ Template CSV diunduh');
  }

  function onImportFileSelected(event) {
    if (!document.getElementById('inv-import-filename')) return;
    const file = event.target.files[0];
    if (!file) return;
    document.getElementById('inv-import-filename').textContent = file.name;
    const isCsv = /\.csv$/i.test(file.name);
    if (isCsv) {
      const reader = new FileReader();
      reader.onload = (e) => processImportRows(parseImportCsv(e.target.result));
      reader.onerror = () => showToast('Gagal membaca file -- coba lagi');
      reader.readAsText(file);
    } else {
      // Demo ini memparsing CSV secara native di browser tanpa dependency tambahan.
      // Untuk .xlsx, pratinjau berikut disimulasikan dari isi file contoh -- parser Excel penuh
      // akan berjalan di backend saat integrasi (mis. via layanan import terpisah).
      showToast('File Excel terdeteksi -- menampilkan pratinjau simulasi (parsing .xlsx penuh dilakukan di backend saat integrasi)');
      processImportRows([
        { nis: '2201003', jenis: 'SPP', nominal: '350000', periode: '2026-09', jatuhTempo: '2026-09-10' },
        { nis: '2201004', jenis: 'SPP', nominal: '350000', periode: '2026-09', jatuhTempo: '2026-09-10' },
        { nis: '2201999', jenis: 'SPP', nominal: '350000', periode: '2026-09', jatuhTempo: '2026-09-10' },
        { nis: '2201005', jenis: 'Uang Kegiatan Semester', nominal: '300000', periode: '2026-09', jatuhTempo: '2026-09-10' },
      ]);
    }
  }

  function parseImportCsv(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length);
    if (!lines.length) return [];
    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    const idx = {
      nis: header.findIndex(h => h.includes('nis')),
      jenis: header.findIndex(h => h.includes('jenis')),
      nominal: header.findIndex(h => h.includes('nominal')),
      periode: header.findIndex(h => h.includes('periode')),
      jatuhTempo: header.findIndex(h => h.includes('jatuh')),
    };
    return lines.slice(1).map(line => {
      const cols = line.split(',').map(c => c.trim());
      return {
        nis: idx.nis > -1 ? (cols[idx.nis] || '') : '',
        jenis: idx.jenis > -1 ? (cols[idx.jenis] || '') : '',
        nominal: idx.nominal > -1 ? (cols[idx.nominal] || '') : '',
        periode: idx.periode > -1 ? (cols[idx.periode] || '') : '',
        jatuhTempo: idx.jatuhTempo > -1 ? (cols[idx.jatuhTempo] || '') : '',
      };
    });
  }

  function validateImportRow(row) {
    const student = studentsData.find(s => s.nis === row.nis);
    const issues = [];
    let level = 'valid';
    if (!student) { issues.push('NIS tidak ditemukan di Manajemen Murid'); level = 'error'; }
    else if (student.status !== 'aktif') { issues.push(`siswa berstatus "${student.status}", bukan aktif`); level = 'error'; }
    const nominal = parseInt(row.nominal, 10);
    if (!row.nominal || isNaN(nominal) || nominal <= 0) { issues.push('nominal tidak valid'); level = 'error'; }
    if (!/^\d{4}-\d{2}$/.test(row.periode || '')) { issues.push('format periode harus YYYY-MM'); level = 'error'; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.jatuhTempo || '')) { issues.push('format jatuh tempo harus YYYY-MM-DD'); level = 'error'; }
    const knownJenis = masterTagihanData.some(m => m.nama.toLowerCase() === (row.jenis || '').toLowerCase());
    if (!knownJenis) { issues.push('jenis tagihan tidak ada di Master Data Tagihan'); if (level !== 'error') level = 'warning'; }
    return { student, level, issues, nominal };
  }

  function processImportRows(rawRows) {
    if (!document.getElementById('inv-import-preview-wrap')) return;
    importRows = rawRows.map(row => ({ ...row, ...validateImportRow(row) }));
    renderImportPreview();
    document.getElementById('inv-import-preview-wrap').style.display = 'block';
  }

  const IMPORT_LEVEL_BADGE = { valid: 'on', warning: 'warn', error: 'danger' };
  const IMPORT_LEVEL_LABEL = { valid: 'Valid', warning: 'Perlu Dicek', error: 'Error' };

  function renderImportPreview() {
    if (!document.getElementById('inv-import-preview-body')) return;
    const tbody = document.getElementById('inv-import-preview-body');
    tbody.innerHTML = importRows.map(r => `
      <tr>
        <td>${r.nis || '-'}</td>
        <td>${r.student ? r.student.nama : '<span style="color:var(--red);">tidak ditemukan</span>'}</td>
        <td>${r.jenis || '-'}</td>
        <td>${r.nominal ? fmtRp(parseInt(r.nominal, 10) || 0) : '-'}</td>
        <td>${r.periode || '-'}</td>
        <td>${r.jatuhTempo || '-'}</td>
        <td>
          <span class="badge-status ${IMPORT_LEVEL_BADGE[r.level]}"><span class="dot"></span> ${IMPORT_LEVEL_LABEL[r.level]}</span>
          ${r.issues.length ? `<div class="import-issue">${r.issues.join('; ')}</div>` : ''}
        </td>
      </tr>`).join('');
    const valid = importRows.filter(r => r.level === 'valid').length;
    const warn = importRows.filter(r => r.level === 'warning').length;
    const err = importRows.filter(r => r.level === 'error').length;
    const badge = document.getElementById('inv-import-summary-badge');
    badge.className = 'badge-status ' + (err ? 'warn' : 'on');
    badge.innerHTML = `<span class="dot"></span> ${valid + warn} baris siap diimpor, ${err} error dari ${importRows.length} baris`;
    document.getElementById('btn-confirm-import').disabled = (valid + warn) === 0;
  }

  function cancelImport() {
    if (!document.getElementById('inv-import-file')) return;
    importRows = [];
    document.getElementById('inv-import-file').value = '';
    document.getElementById('inv-import-preview-wrap').style.display = 'none';
  }

  function confirmImportTagihan() {
    const importable = importRows.filter(r => r.level !== 'error');
    let count = 0;
    importable.forEach(r => {
      invoiceData.unshift({
        id: invoiceSeq++, siswa: r.student.nama, kelas: r.student.kelas,
        jenis: r.jenis, periode: r.periode, nominal: parseInt(r.nominal, 10) || 0,
        jatuhTempo: r.jatuhTempo, status: 'draft',
      });
      count++;
    });
    const skipped = importRows.length - count;
    renderInvoiceList();
    updateStats();
    showToast(`✓ ${count} tagihan berhasil diimpor sebagai draft${skipped ? ` (${skipped} baris dilewati karena error)` : ''}`);
    cancelImport();
    setInvoiceMode('individual');
  }
  function renderInvoiceList() {
    if (!document.getElementById('inv-filter-status')) return;
    const statusF = document.getElementById('inv-filter-status').value;
    const kelasF = document.getElementById('inv-filter-kelas').value;
    const tbody = document.getElementById('invoice-table-body');
    const rows = invoiceData.filter(i => (!statusF || i.status === statusF) && (!kelasF || i.kelas === kelasF));
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="8" class="empty-hint">Tidak ada tagihan yang cocok dengan filter.</td></tr>`; return; }
    tbody.innerHTML = rows.map(i => `
      <tr>
        <td>${i.siswa}</td>
        <td>${i.kelas}</td>
        <td>${i.jenis}</td>
        <td>${i.periode}</td>
        <td>${fmtRp(i.nominal)}</td>
        <td>${i.jatuhTempo}</td>
        <td>${statusBadge(i.status)}</td>
        <td>${i.status === 'draft' ? `<button class="btn btn-outline btn-sm" onclick="publishInvoice(${i.id})">Publish</button>` : '--'}</td>
      </tr>`).join('');
  }

  function fillWriteoffInvoiceSelect() {
    if (!document.getElementById('wo-invoice')) return;
    const sel = document.getElementById('wo-invoice');
    const pindahNames = new Set(studentsData.filter(s => s.status === 'pindah').map(s => s.nama));
    const eligible = invoiceData.filter(i => pindahNames.has(i.siswa) && !['paid','written_off','closed'].includes(i.status));
    sel.innerHTML = eligible.length
      ? eligible.map(i => `<option value="${i.id}">${i.siswa} -- ${i.jenis} ${i.periode} (${i.status})</option>`).join('')
      : `<option value="">Tidak ada tagihan siswa pindah yang perlu dihapus buku</option>`;
  }
  function submitWriteoff() {
    if (!document.getElementById('wo-invoice')) return;
    const sel = document.getElementById('wo-invoice');
    const inv = invoiceData.find(i => i.id == sel.value);
    if (!inv) { showToast('Tidak ada tagihan siswa pindah yang bisa diajukan hapus buku'); return; }
    const alasan = document.getElementById('wo-alasan').value || '(tanpa alasan tertulis)';
    writeoffData.unshift({
      id: writeoffSeq++,
      siswa: inv.siswa, kelas: inv.kelas,
      invoiceRef: `${inv.jenis} ${inv.periode}`,
      tipe: 'Hapus Buku', alasan,
      diajukanOleh: currentUser ? `${currentUser.nama} (${currentUser.peran})` : 'Bendahara',
      tanggalDiajukan: '2026-08-20',
      status: 'pending_approval', tanggalKeputusan: '', catatan: '',
      tglEfektifPindah: null, sekolahTujuan: null, rencanaBayarTunggakan: null, tunggakanList: [],
    });
    document.getElementById('wo-alasan').value = '';
    fillWriteoffInvoiceSelect();
    refreshWriteoffDependents();
    showToast('✓ Pengajuan hapus buku terkirim, menunggu approval Kepala Sekolah');
  }
  function renderWriteoffList() {
    if (!document.getElementById('writeoff-table-body')) return;
    const tbody = document.getElementById('writeoff-table-body');
    if (!writeoffData.length) { tbody.innerHTML = `<tr><td colspan="5" class="empty-hint">Belum ada pengajuan write-off.</td></tr>`; return; }
    tbody.innerHTML = writeoffData.map(w => `
      <tr>
        <td>${w.siswa} -- ${w.invoiceRef}</td>
        <td>${w.tipe}</td>
        <td>${w.alasan}</td>
        <td>${statusBadge(w.status)}</td>
        <td>${w.tanggalDiajukan}</td>
      </tr>`).join('');
  }

  function renderPaymentList() {
    if (!document.getElementById('pay-filter-status')) return;
    const statusF = document.getElementById('pay-filter-status').value;
    const tbody = document.getElementById('payment-table-body');
    const rows = paymentData.filter(p => !statusF || p.status === statusF);
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="8" class="empty-hint">Tidak ada transaksi yang cocok dengan filter.</td></tr>`; return; }
    tbody.innerHTML = rows.map(p => `
      <tr>
        <td>${p.siswa}</td>
        <td>${p.invoiceRef}</td>
        <td>${p.metode}</td>
        <td>${p.provider}</td>
        <td>${fmtRp(p.nominal)}</td>
        <td>${statusBadge(p.status)}</td>
        <td>${p.waktu}</td>
        <td>${p.kuitansi ? `<button class="btn btn-ghost btn-sm" onclick="showToast('Membuka kuitansi ${p.kuitansi}')">Lihat</button>` : '--'}</td>
      </tr>`).join('');
  }

  // =========================================================================
  // PEMBAYARAN MANUAL (via Bendahara)
  // =========================================================================
  function findInvoiceForManualConf(m) {
    if (m.invoiceId) return invoiceData.find(i => i.id === m.invoiceId);
    return invoiceData.find(i => i.siswa === m.siswa && `${i.jenis} ${i.periode}` === m.invoiceRef);
  }

  function renderManualConfirmationList() {
    if (!document.getElementById('manualconf-table-body')) return;
    const tbody = document.getElementById('manualconf-table-body');
    if (!manualConfirmationData.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="empty-hint">Belum ada konfirmasi transfer manual dari wali murid.</td></tr>`;
      return;
    }
    tbody.innerHTML = manualConfirmationData.map(m => `
      <tr>
        <td>${m.siswa}</td>
        <td>${m.invoiceRef}</td>
        <td>${m.tanggalTransfer}</td>
        <td>${fmtRp(m.nominal)}</td>
        <td>${m.bankPengirim}${m.catatan ? `<div class="hint" style="margin-top:2px;">${m.catatan}</div>` : ''}</td>
        <td><button class="btn btn-ghost btn-sm" onclick="showToast('Membuka bukti transfer: ${m.buktiFile}')">📎 Lihat</button></td>
        <td>${statusBadge(m.status)}</td>
        <td>${m.status === 'menunggu_verifikasi'
          ? `<div style="display:flex;gap:6px;"><button class="btn btn-success btn-sm" onclick="verifyManualConfirmation(${m.id})">Verifikasi</button><button class="btn btn-outline-red btn-sm" onclick="rejectManualConfirmation(${m.id})">Tolak</button></div>`
          : '--'}</td>
      </tr>`).join('');
  }

  function verifyManualConfirmation(id) {
    const m = manualConfirmationData.find(x => x.id === id);
    if (!m) return;
    m.status = 'terverifikasi';
    const inv = findInvoiceForManualConf(m);
    if (inv) {
      inv.status = 'paid';
      paymentSeq++;
      paymentData.unshift({
        siswa: m.siswa, invoiceRef: `${inv.jenis} ${inv.periode}`, metode: 'Transfer Manual',
        provider: 'Bendahara (Manual)', nominal: m.nominal, status: 'success',
        waktu: `${m.tanggalTransfer} (manual)`, kuitansi: `RCPT-MANUAL-${String(paymentSeq).padStart(6, '0')}`,
      });
    }
    renderManualConfirmationList();
    renderManualPaymentHistory();
    renderPaymentList();
    renderInvoiceList();
    fillManualPaymentInvoiceSelect();
    updateStats();
    showToast(`✓ Pembayaran ${m.siswa} terverifikasi${inv ? ' -- tagihan ditandai Lunas' : ' (invoice terkait tidak ditemukan, cek manual)'}`);
  }

  function rejectManualConfirmation(id) {
    const m = manualConfirmationData.find(x => x.id === id);
    if (!m) return;
    m.status = 'ditolak';
    renderManualConfirmationList();
    showToast(`Konfirmasi ${m.siswa} ditolak -- wali murid akan diminta mengunggah ulang bukti`);
  }

  function fillManualPaymentInvoiceSelect() {
    if (!document.getElementById('mp-invoice')) return;
    const sel = document.getElementById('mp-invoice');
    const eligible = invoiceData.filter(i => !['paid', 'written_off', 'closed', 'draft'].includes(i.status));
    sel.innerHTML = eligible.length
      ? eligible.map(i => `<option value="${i.id}" data-nominal="${i.nominal}">${i.siswa} -- ${i.jenis} ${i.periode} (${i.status}) -- ${fmtRp(i.nominal)}</option>`).join('')
      : `<option value="">Tidak ada tagihan yang belum lunas</option>`;
    syncManualPaymentNominal();
  }

  function syncManualPaymentNominal() {
    if (!document.getElementById('mp-invoice')) return;
    const sel = document.getElementById('mp-invoice');
    const opt = sel.selectedOptions[0];
    document.getElementById('mp-nominal').value = (opt && opt.dataset.nominal) ? opt.dataset.nominal : '';
  }

  function recordManualPayment() {
    if (!document.getElementById('mp-invoice')) return;
    const sel = document.getElementById('mp-invoice');
    const inv = invoiceData.find(i => i.id == sel.value);
    if (!inv) { showToast('Pilih tagihan terlebih dahulu'); return; }
    const nominal = parseInt(document.getElementById('mp-nominal').value, 10) || 0;
    if (nominal <= 0) { showToast('Nominal tidak valid'); return; }
    const tanggal = document.getElementById('mp-tanggal').value || '2026-08-13';
    const metode = document.getElementById('mp-metode').value;
    inv.status = 'paid';
    paymentSeq++;
    paymentData.unshift({
      siswa: inv.siswa, invoiceRef: `${inv.jenis} ${inv.periode}`, metode, provider: 'Bendahara (Manual)',
      nominal, status: 'success', waktu: `${tanggal} (manual)`, kuitansi: `RCPT-MANUAL-${String(paymentSeq).padStart(6, '0')}`,
    });
    renderInvoiceList();
    renderPaymentList();
    renderManualPaymentHistory();
    fillManualPaymentInvoiceSelect();
    updateStats();
    document.getElementById('mp-catatan').value = '';
    showToast(`✓ Pembayaran manual ${fmtRp(nominal)} untuk ${inv.siswa} dicatat -- tagihan ditandai Lunas`);
  }

  function renderManualPaymentHistory() {
    if (!document.getElementById('manualpayhist-table-body')) return;
    const tbody = document.getElementById('manualpayhist-table-body');
    const rows = paymentData.filter(p => p.provider === 'Bendahara (Manual)');
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="6" class="empty-hint">Belum ada pembayaran manual yang tercatat.</td></tr>`; return; }
    tbody.innerHTML = rows.map(p => `
      <tr>
        <td>${p.siswa}</td>
        <td>${p.invoiceRef}</td>
        <td>${p.metode}</td>
        <td>${fmtRp(p.nominal)}</td>
        <td>${p.waktu}</td>
        <td>${p.kuitansi}</td>
      </tr>`).join('');
  }

  function updateManualConfBadge() {
    if (!document.getElementById('ptab-manual-badge')) return;
    const n = manualConfirmationData.filter(m => m.status === 'menunggu_verifikasi').length;
    const el = document.getElementById('ptab-manual-badge');
    el.textContent = n ? `(${n})` : '';
  }

  function updateStats() {
    if (!document.getElementById('stat-total-invoice')) return;
    document.getElementById('stat-total-invoice').textContent = invoiceData.length;
    document.getElementById('stat-paid').textContent = invoiceData.filter(i => i.status === 'paid').length;
    document.getElementById('stat-overdue').textContent = invoiceData.filter(i => ['overdue','escalated'].includes(i.status)).length;
    document.getElementById('stat-writeoff').textContent = writeoffData.filter(w => w.status === 'pending_approval').length;
    updateManualConfBadge();
  }

  // =========================================================================
  // BLAST NOTIFIKASI
  // =========================================================================
  function setBlastTarget(mode) {
    if (!document.getElementById('blast-sub-kelas')) return;
    ['semua','kelas','tunggakan','manual'].forEach(m => {
      document.getElementById('blast-target-' + m).checked = (m === mode);
    });
    document.getElementById('blast-sub-kelas').classList.toggle('open', mode === 'kelas');
    document.getElementById('blast-sub-tunggakan').classList.toggle('open', mode === 'tunggakan');
    document.getElementById('blast-sub-manual').classList.toggle('open', mode === 'manual');
    if (mode === 'manual') renderBlastManualList();
    updateBlastEstimate();
  }
  function renderBlastManualList() {
    if (!document.getElementById('blast-manual-list')) return;
    const box = document.getElementById('blast-manual-list');
    box.innerHTML = studentsData.filter(s => s.status === 'aktif').map((s, i) => `
      <label class="chip-check"><input type="checkbox" class="blast-manual-chk" value="${i}" onchange="updateBlastEstimate()"> ${s.nama}</label>
    `).join('');
  }
  function setBlastMsgMode(mode) {
    if (!document.getElementById('blast-msg-template')) return;
    document.getElementById('blast-msg-template').checked = mode === 'template';
    document.getElementById('blast-msg-manual').checked = mode === 'manual';
    document.getElementById('blast-sub-template').classList.toggle('open', mode === 'template');
    document.getElementById('blast-sub-manualmsg').classList.toggle('open', mode === 'manual');
  }
  function currentBlastAudienceLabel() {
    if (!document.getElementById('blast-target-semua')) return;
    if (document.getElementById('blast-target-semua').checked) return 'Semua Wali Murid Aktif';
    if (document.getElementById('blast-target-kelas').checked) {
      const kelas = [...document.querySelectorAll('.blast-kelas-chk:checked')].map(c => c.value);
      return kelas.length ? `Berdasarkan Kelas: ${kelas.join(', ')}` : 'Berdasarkan Kelas (belum dipilih)';
    }
    if (document.getElementById('blast-target-tunggakan').checked) {
      return `Status Tunggakan: ${document.getElementById('blast-tunggakan-level').value}`;
    }
    const n = document.querySelectorAll('.blast-manual-chk:checked').length;
    return `Pilih Manual (${n} siswa)`;
  }
  function currentBlastRecipientCount() {
    if (!document.getElementById('blast-target-semua')) return;
    if (document.getElementById('blast-target-semua').checked) {
      return studentsData.filter(s => s.status === 'aktif').reduce((sum, s) => sum + s.guardians.length, 0);
    }
    if (document.getElementById('blast-target-kelas').checked) {
      const kelas = [...document.querySelectorAll('.blast-kelas-chk:checked')].map(c => c.value);
      return studentsData.filter(s => s.status === 'aktif' && kelas.includes(s.kelas)).reduce((sum, s) => sum + s.guardians.length, 0);
    }
    if (document.getElementById('blast-target-tunggakan').checked) {
      const level = document.getElementById('blast-tunggakan-level').value;
      const wanted = level === 'semua' ? ['overdue','escalated'] : [level];
      const names = new Set(invoiceData.filter(i => wanted.includes(i.status)).map(i => i.siswa));
      return studentsData.filter(s => names.has(s.nama)).reduce((sum, s) => sum + s.guardians.length, 0);
    }
    const idxs = [...document.querySelectorAll('.blast-manual-chk:checked')].map(c => parseInt(c.value, 10));
    return idxs.reduce((sum, i) => sum + (studentsData[i] ? studentsData[i].guardians.length : 0), 0);
  }
  function updateBlastEstimate() {
    if (!document.getElementById('blast-estimate')) return;
    const n = currentBlastRecipientCount();
    document.getElementById('blast-estimate').textContent = `≈ ${n} wali murid akan menerima pesan ini -- ${currentBlastAudienceLabel()}`;
  }
  function blastChannelLabel() {
    if (!document.getElementById('blast-ch-wa')) return;
    const chs = [];
    if (document.getElementById('blast-ch-wa').checked) chs.push('WA');
    if (document.getElementById('blast-ch-sms').checked) chs.push('SMS');
    if (document.getElementById('blast-ch-email').checked) chs.push('Email');
    return chs.join(', ') || '(belum pilih kanal)';
  }
  function sendBlastNow() {
    const n = currentBlastRecipientCount();
    if (!n) { showToast('Tidak ada penerima untuk target ini'); return; }
    blastHistoryData.unshift({ waktu: '2026-08-11 (baru saja)', target: currentBlastAudienceLabel(), kanal: blastChannelLabel(), jumlah: n, status: 'Terkirim' });
    renderBlastHistory();
    showToast(`✓ Notifikasi terkirim ke ${n} wali murid`);
  }
  function scheduleBlast() {
    if (!document.getElementById('blast-schedule-time')) return;
    const t = document.getElementById('blast-schedule-time').value;
    if (!t) { showToast('Pilih tanggal & waktu jadwal terlebih dahulu'); return; }
    const n = currentBlastRecipientCount();
    blastHistoryData.unshift({ waktu: t.replace('T', ' '), target: currentBlastAudienceLabel(), kanal: blastChannelLabel(), jumlah: n, status: 'Terjadwal' });
    renderBlastHistory();
    showToast(`✓ Notifikasi dijadwalkan untuk ${n} wali murid`);
  }
  function renderBlastHistory() {
    if (!document.getElementById('blast-history-body')) return;
    const tbody = document.getElementById('blast-history-body');
    tbody.innerHTML = blastHistoryData.map(b => `
      <tr>
        <td>${b.waktu}</td>
        <td>${b.target}</td>
        <td>${b.kanal}</td>
        <td>${b.jumlah}</td>
        <td><span class="badge-status ${b.status === 'Terkirim' ? 'on' : 'warn'}"><span class="dot"></span> ${b.status}</span></td>
      </tr>`).join('');
  }

  // =========================================================================
  // DASHBOARD -- "hari ini uangnya bagaimana?" -- fokus actionable, bukan
  // agregasi strategis. KPI status tagihan + rekonsiliasi pembayaran masuk kas.
  // =========================================================================
  const dashboardKpi = {
    totalInvoice: 1200, lunas: 980, belumBayar: 150, overdue: 70,
    outstandingRp: 125000000, manualVerification: 12, writeoffPending: 5,
  };
  // Payment Reconciliation -- uang yang sudah masuk lewat kanal pembayaran
  // (termasuk provider "Bendahara (Manual)"), dicocokkan ke invoice.
  const paymentReconciliation = {
    totalRp: 350000000,
    autoPct: 92, manualPct: 6, exceptionPct: 2,
  };

  function fmtRpSingkat(n) {
    if (n >= 1000000000) return 'Rp' + (n / 1000000000).toFixed(1).replace(/\.0$/, '') + ' M';
    if (n >= 1000000) return 'Rp' + Math.round(n / 1000000) + ' jt';
    if (n >= 1000) return 'Rp' + Math.round(n / 1000) + ' rb';
    return fmtRp(n);
  }

  function renderDashboardKpi() {
    if (!document.getElementById('dash-kpi-total-invoice')) return;
    const k = dashboardKpi;
    document.getElementById('dash-kpi-total-invoice').textContent = k.totalInvoice.toLocaleString('id-ID');
    document.getElementById('dash-kpi-lunas').textContent = k.lunas.toLocaleString('id-ID');
    document.getElementById('dash-kpi-belum-bayar').textContent = k.belumBayar.toLocaleString('id-ID');
    document.getElementById('dash-kpi-overdue').textContent = k.overdue.toLocaleString('id-ID');
    document.getElementById('dash-kpi-outstanding').textContent = fmtRpSingkat(k.outstandingRp);
    document.getElementById('dash-kpi-manual-verif').textContent = k.manualVerification.toLocaleString('id-ID');
    document.getElementById('dash-kpi-writeoff-pending').textContent = k.writeoffPending.toLocaleString('id-ID');
  }

  function renderReconciliation() {
    if (!document.getElementById('recon-total')) return;
    const r = paymentReconciliation;
    const autoRp = Math.round(r.totalRp * r.autoPct / 100);
    const manualRp = Math.round(r.totalRp * r.manualPct / 100);
    const exceptionRp = r.totalRp - autoRp - manualRp;

    document.getElementById('recon-total').textContent = fmtRpSingkat(r.totalRp);

    document.getElementById('recon-bar-track').innerHTML = `
      <div class="recon-seg good" style="width:${r.autoPct}%;" title="Auto Reconciled ${r.autoPct}%"></div>
      <div class="recon-seg warn" style="width:${r.manualPct}%;" title="Manual ${r.manualPct}%"></div>
      <div class="recon-seg critical" style="width:${r.exceptionPct}%;" title="Exception ${r.exceptionPct}%"></div>
    `;

    document.getElementById('recon-legend').innerHTML = `
      <div class="recon-legend-item">
        <span class="recon-dot good"></span>
        <div class="rl-txt"><b>Auto Reconciled -- ${r.autoPct}%</b><span>${fmtRpSingkat(autoRp)} -- otomatis cocok ke invoice via payment gateway</span></div>
      </div>
      <div class="recon-legend-item">
        <span class="recon-dot warn"></span>
        <div class="rl-txt"><b>Manual -- ${r.manualPct}%</b><span>${fmtRpSingkat(manualRp)} -- konfirmasi transfer wali murid, perlu verifikasi Anda</span></div>
      </div>
      <div class="recon-legend-item">
        <span class="recon-dot critical"></span>
        <div class="rl-txt"><b>Exception -- ${r.exceptionPct}%</b><span>${fmtRpSingkat(exceptionRp)} -- gagal dicocokkan otomatis, perlu ditelusuri manual</span></div>
      </div>
    `;

    const perluTindakRp = manualRp + exceptionRp;
    const perluTindakPct = r.manualPct + r.exceptionPct;
    document.getElementById('recon-action-txt').innerHTML =
      `⚠ <b>${fmtRpSingkat(perluTindakRp)} (${perluTindakPct}%)</b> uang sudah masuk kas tapi invoice-nya belum ter-reconcile otomatis -- gabungan Manual + Exception, butuh tindakan Anda.`;
  }
