// =========================================================================
// SESSION (new -- original SPA kept login state purely in JS memory;
// splitting into real pages requires persisting across page loads)
// =========================================================================
const SESSION_KEY = 'wali_murid_session';
function saveSession(account) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(account)); }
function getSession() { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; } }
function clearSession() { sessionStorage.removeItem(SESSION_KEY); }
function requireLogin() {
  if (!getSession()) { location.replace('index.html'); return false; }
  return true;
}

// =========================================================================
// DATA
// =========================================================================
// Akun SSO wali murid -- statusnya menentukan apakah bisa masuk ke aplikasi ini.
// Selaras dengan model akun di Portal Sekolah > Akun Wali Murid: didaftarkan langsung
// oleh Admin (status aktif) atau daftar sendiri lewat app (self_register, menunggu
// approval Kepala Sekolah dulu sebelum bisa SSO -- lihat data di bawah).
const guardian = {
  nama: 'Yusuf Bachtiar', inisial: 'YB', relasi: 'Ayah',
  wa: '0811-4433-2211', hpAlt: '', email: 'yusuf.b@yahoo.com', password: 'wali123',
  pekerjaan: 'Wiraswasta', tanggalPengingat: 5,
  status: 'aktif', metode: 'didaftarkan_admin',
};

// Akun demo lain untuk memperagakan alur SSO (bukan persona utama aplikasi ini) --
// akun baru dari "Daftar Akun Baru" saat demo juga ikut masuk ke array ini.
const otherWaliAccounts = [
  { nama: 'Ibu Siti Nurhaliza', email: 'siti.nurhaliza@gmail.com', password: 'wali123',
    status: 'menunggu_approval', metode: 'self_register', tanggalDaftar: '2026-08-19',
    siswaList: [{ nama: 'Ahmad Zaki', nis: '2201077', kelas: '3A' }] },
  { nama: 'Bapak Dedi Kurniawan', email: 'dedi.k@gmail.com', password: 'wali123',
    status: 'ditolak', metode: 'self_register', tanggalDaftar: '2026-08-10',
    siswaList: [{ nama: 'Nadia Kurniawan', nis: '2201150', kelas: '4A' }],
    alasanTolak: 'Data anak tidak ditemukan di sistem sekolah -- pastikan NISN yang dimasukkan benar.' },
];

const children = [
  { id: 1, nama: 'Fatimah Azzahra', nis: '2201004', kelas: '5B', sekolah: 'SD Muhammadiyah 4 Sidoarjo', status: 'aktif' },
  { id: 2, nama: 'Muhammad Fadli Bachtiar', nis: '2201099', kelas: '2A', sekolah: 'SD Muhammadiyah 4 Sidoarjo', status: 'aktif' },
];
let activeChildId = 1;

// pengajuan pindah sekolah yang dikirim wali murid -- memicu proses hapus buku (write-off)
// otomatis di sisi sekolah untuk cicilan yang belum jatuh tempo.
let pindahSeq = 0;
const pindahSekolahData = [];

const notifPrefs = { wa: true, sms: false, email: true, push: true, inapp: true };

let invoiceSeq = 100;
const invoices = [
  { id: 101, childId: 1, jenis: 'SPP', periode: '2026-07', nominal: 350000, jatuhTempo: '2026-07-10', status: 'escalated' },
  { id: 102, childId: 1, jenis: 'SPP', periode: '2026-08', nominal: 350000, jatuhTempo: '2026-08-15', status: 'sent' },
  { id: 201, childId: 2, jenis: 'SPP', periode: '2026-08', nominal: 300000, jatuhTempo: '2026-08-15', status: 'paid' },
];

let paymentSeq = 5;
const paymentHistory = [
  { id: 1, childId: 1, invoiceRef: 'SPP 2026-06', tanggal: '2026-06-08 10:15', metode: 'QRIS', provider: 'BSI H2H', nominal: 350000, status: 'success', kuitansi: 'RCPT-2026-000098' },
  { id: 2, childId: 1, invoiceRef: 'SPP 2026-05', tanggal: '2026-05-09 08:40', metode: 'VA BSI', provider: 'BSI H2H', nominal: 350000, status: 'success', kuitansi: 'RCPT-2026-000067' },
  { id: 3, childId: 1, invoiceRef: 'SPP 2026-07', tanggal: '2026-07-10 22:58', metode: 'QRIS', provider: 'BSI H2H', nominal: 350000, status: 'expired', kuitansi: '' },
  { id: 4, childId: 2, invoiceRef: 'SPP 2026-08', tanggal: '2026-08-03 07:20', metode: 'VA BSI', provider: 'BSI H2H', nominal: 300000, status: 'success', kuitansi: 'RCPT-2026-000205' },
];

// rekening tujuan transfer manual -- ditampilkan di tab "Transfer" pada sheet Bayar.
const schoolBankAccount = { bank: 'Bank Syariah Indonesia (BSI)', nomor: '7123456789', atasNama: 'SD Muhammadiyah 4 Sidoarjo' };

// konfirmasi pembayaran manual yang dikirim wali murid dari sheet Bayar > "Transfer" --
// mengisi tabel billing.manual_payment_confirmation, direview oleh Bendahara (lihat portal Bendahara).
let pengajuanSeq = 1;
const pengajuanData = [
  { id: 1, childId: 1, metode: 'transfer_manual', invoiceRef: 'SPP 2026-07', nominal: 350000, bank: 'BCA a.n. Yusuf Bachtiar', fileName: 'bukti-transfer-fatimah.jpg', status: 'menunggu_verifikasi', tanggal: '2026-08-11' },
];

const VA_INSTRUCTIONS = {
  mbanking: [
    'Buka aplikasi m-Banking bank Anda, lalu pilih menu Transfer.',
    'Pilih Virtual Account / BI-FAST, masukkan nomor VA di atas.',
    'Periksa nama sekolah &amp; nominal yang muncul, lalu konfirmasi dengan PIN/biometrik.',
  ],
  atm: [
    'Masukkan kartu ATM &amp; PIN, lalu pilih menu Transfer.',
    'Pilih Virtual Account, masukkan nomor VA di atas.',
    'Periksa nominal yang tertera di layar, lalu konfirmasi transaksi.',
  ],
  ibanking: [
    'Login ke Internet Banking bank Anda lewat browser.',
    'Pilih menu Pembayaran &gt; Virtual Account, masukkan nomor VA di atas.',
    'Periksa detail tagihan, lalu selesaikan dengan token/OTP.',
  ],
};

// =========================================================================
// UTIL
// =========================================================================
function fmtRp(n) { return 'Rp' + n.toLocaleString('id-ID'); }
function fmtTanggal(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'flex';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.display = 'none'; }, 2600);
}
function activeChild() { return children.find(c => c.id === activeChildId); }

// =========================================================================
// AUTH / SSO -- login, daftar akun baru, menunggu approval, ditolak
// (adapted for real multi-page navigation -- original toggled divs in place)
// =========================================================================
function findWaliAccount(email) {
  const needle = (email || '').trim().toLowerCase();
  if (guardian.email.toLowerCase() === needle) return guardian;
  return otherWaliAccounts.find(a => a.email.toLowerCase() === needle);
}

function doWaliLogin() {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  const errEl = document.getElementById('auth-error');
  const acc = findWaliAccount(email);
  const generic = 'Email/password tidak dikenali (mode demo) -- coba salah satu akun demo di bawah.';
  if (!acc || acc.password !== password) {
    errEl.textContent = generic;
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';
  routeWaliAccount(acc);
}

function demoWaliLogin(email) {
  const acc = findWaliAccount(email);
  if (!acc) return;
  document.getElementById('auth-email').value = acc.email;
  document.getElementById('auth-password').value = acc.password;
  document.getElementById('auth-error').style.display = 'none';
  routeWaliAccount(acc);
}

// Router status akun -- persis mengikuti status yang sama dipakai Portal Sekolah >
// Akun Wali Murid: aktif (bisa SSO), menunggu_approval (belum diputuskan Kepala
// Sekolah), ditolak (harus daftar ulang). Sekarang navigasi antar file HTML asli,
// bukan toggle div -- status pending/ditolak dibawa lewat sessionStorage sementara
// supaya halaman tujuan bisa menampilkan detailnya.
function routeWaliAccount(acc) {
  if (acc.status === 'menunggu_approval') {
    sessionStorage.setItem('wali_pending_info', JSON.stringify({ anakNama: acc.siswaList.map(s => s.nama).join(', ') }));
    location.href = 'menunggu-approval.html';
    return;
  }
  if (acc.status === 'ditolak') {
    sessionStorage.setItem('wali_rejected_info', JSON.stringify({ alasan: acc.alasanTolak || '(tidak ada alasan tercatat)' }));
    location.href = 'ditolak.html';
    return;
  }
  saveSession(acc);
  location.href = 'bayar.html';
}

function renderDemoWaliList() {
  const wrap = document.getElementById('demo-wali-list');
  if (!wrap) return;
  const icons = { aktif: '✅', menunggu_approval: '⏳', ditolak: '❌' };
  const labels = { aktif: 'Aktif -- bisa masuk', menunggu_approval: 'Menunggu Approval', ditolak: 'Ditolak' };
  const all = [guardian, ...otherWaliAccounts];
  wrap.innerHTML = all.map(a => `
    <button type="button" onclick="demoWaliLogin('${a.email}')" style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:11px;background:#fff;margin-bottom:8px;cursor:pointer;font-family:inherit;text-align:left;">
      <span>
        <span style="display:block;font-size:12.5px;font-weight:700;">${icons[a.status]} ${a.nama}</span>
        <span style="display:block;font-size:11px;color:var(--muted);">${labels[a.status]}</span>
      </span>
      <span style="font-size:11px;color:var(--navy);font-weight:700;">Coba →</span>
    </button>`).join('');
}

// ---- Daftar Akun Baru (self-register, multi-anak) ----
let regChildSeq = 0;
function addRegChildRow(nama, nis, kelas) {
  regChildSeq++;
  const wrap = document.getElementById('reg-children-rows');
  const row = document.createElement('div');
  row.className = 'reg-child-row';
  row.dataset.rowId = regChildSeq;
  row.style.cssText = 'border:1.5px solid var(--border);border-radius:12px;padding:12px;margin-bottom:10px;position:relative;';
  row.innerHTML = `
    <button type="button" onclick="removeRegChildRow(${regChildSeq})" style="position:absolute;top:8px;right:8px;background:none;border:none;color:var(--red);font-weight:700;font-size:13px;cursor:pointer;">✕</button>
    <div class="field" style="margin-bottom:8px;"><label>Nama Siswa (sesuai akta/rapor)</label><input type="text" value="${nama || ''}" placeholder="mis. Ahmad Zaki"></div>
    <div class="grid2" style="margin-bottom:0;">
      <div class="field" style="margin-bottom:0;"><label>NISN</label><input type="text" value="${nis || ''}" placeholder="10 digit"></div>
      <div class="field" style="margin-bottom:0;"><label>Kelas</label><input type="text" value="${kelas || ''}" placeholder="mis. 3A"></div>
    </div>`;
  wrap.appendChild(row);
}
function removeRegChildRow(id) {
  const wrap = document.getElementById('reg-children-rows');
  if (wrap.children.length <= 1) { showToast('Minimal 1 data anak diperlukan'); return; }
  const row = wrap.querySelector(`[data-row-id="${id}"]`);
  if (row) row.remove();
}
function submitWaliRegister() {
  const nama = document.getElementById('reg-nama').value.trim();
  const wa = document.getElementById('reg-wa').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  if (!nama || !wa || !email || !password) { showToast('Nama, No. WhatsApp, Email, dan Password wajib diisi'); return; }
  if (findWaliAccount(email)) { showToast('Email ini sudah terdaftar -- coba masuk lewat halaman login'); return; }
  const rows = [...document.querySelectorAll('#reg-children-rows .reg-child-row')];
  const siswaList = rows.map(r => {
    const inputs = r.querySelectorAll('input');
    return { nama: inputs[0].value.trim(), nis: inputs[1].value.trim(), kelas: inputs[2].value.trim() };
  }).filter(s => s.nama);
  if (!siswaList.length) { showToast('Minimal 1 data anak wajib diisi'); return; }
  const newAcc = {
    nama, wa, email, password, siswaList,
    status: 'menunggu_approval', metode: 'self_register', tanggalDaftar: '2026-08-20',
  };
  otherWaliAccounts.push(newAcc);
  sessionStorage.setItem('wali_pending_info', JSON.stringify({ anakNama: siswaList.map(s => s.nama).join(', ') }));
  location.href = 'menunggu-approval.html';
}

function waliLogout() {
  clearSession();
  location.href = 'index.html';
}

// =========================================================================
// HEADER (child switch + bell badge) -- shared across all main app pages
// =========================================================================
function renderChildSwitch() {
  const wrap = document.getElementById('child-switch');
  if (!wrap) return;
  wrap.innerHTML = children.map(c => `
    <div class="child-chip ${c.id === activeChildId ? 'active' : ''}" onclick="selectChild(${c.id})">${c.nama.split(' ')[0]} -- ${c.kelas}</div>
  `).join('');
}
function selectChild(id) {
  activeChildId = id;
  renderChildSwitch();
  if (document.getElementById('bayar-invoice-list')) renderBayarView();
  if (document.getElementById('riwayat-list')) { renderRiwayat(); renderPengajuanList(); }
  if (document.getElementById('pf-children-list')) renderChildrenList();
  updateBellBadge();
}

// =========================================================================
// PROFIL
// =========================================================================
function renderChildrenList() {
  const box = document.getElementById('pf-children-list');
  if (!box) return;
  box.innerHTML = children.map(c => `
    <div class="kv-row" style="align-items:center;flex-wrap:wrap;gap:8px;">
      <div>
        <div style="font-weight:700;font-size:13px;color:var(--ink);">${c.nama}</div>
        <div style="font-size:11px;color:var(--muted);margin-top:2px;">NIS ${c.nis} -- Kelas ${c.kelas}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        ${c.status === 'pindah'
          ? `<span class="badge badge-purple"><span class="dot"></span>Pindah Sekolah</span>`
          : `<span class="badge badge-blue"><span class="dot"></span>Aktif</span>
             <button class="btn btn-ghost btn-sm" onclick="openPindahSheet(${c.id})">Ajukan Pindah Sekolah</button>`}
      </div>
    </div>
  `).join('');
}
function saveProfile() {
  guardian.nama = document.getElementById('pf-nama').value.trim() || guardian.nama;
  guardian.pekerjaan = document.getElementById('pf-pekerjaan').value;
  guardian.wa = document.getElementById('pf-wa').value.trim();
  guardian.email = document.getElementById('pf-email').value.trim();
  guardian.tanggalPengingat = document.getElementById('pf-tanggal-pengingat').value;
  document.getElementById('header-name').textContent = 'Bapak ' + guardian.nama;
  showToast('✓ Profil berhasil disimpan');
}

// =========================================================================
// NOTIFIKASI
// =========================================================================
function onNotifToggle() {
  notifPrefs.wa = document.getElementById('ntf-wa').checked;
  notifPrefs.sms = document.getElementById('ntf-sms').checked;
  notifPrefs.email = document.getElementById('ntf-email').checked;
  notifPrefs.push = document.getElementById('ntf-push').checked;
}
function saveNotifPrefs() {
  showToast('✓ Preferensi notifikasi disimpan');
}

// =========================================================================
// BAYAR
// =========================================================================
function statusInfo(status) {
  const map = {
    draft: { label: 'Draft', cls: 'badge-muted' },
    published: { label: 'Belum Dikirim', cls: 'badge-muted' },
    sent: { label: 'Belum Dibayar', cls: 'badge-blue' },
    partially_paid: { label: 'Dibayar Sebagian', cls: 'badge-warn' },
    paid: { label: 'Lunas', cls: 'badge-success' },
    overdue: { label: 'Jatuh Tempo Terlewat', cls: 'badge-danger' },
    escalated: { label: 'Jatuh Tempo Terlewat', cls: 'badge-danger' },
    writeoff: { label: 'Dihapus Buku', cls: 'badge-purple' },
  };
  return map[status] || { label: status, cls: 'badge-muted' };
}

function renderBayarView() {
  const c = activeChild();
  document.getElementById('bayar-child-label').textContent = c.nama;
  const relevant = invoices.filter(i => i.childId === activeChildId && !['paid', 'draft'].includes(i.status));
  const owed = relevant.filter(i => i.status !== 'writeoff');
  const total = owed.reduce((s, i) => s + i.nominal, 0);
  document.getElementById('bayar-total').textContent = fmtRp(total);
  const note = document.getElementById('bayar-note');
  if (!relevant.length) {
    note.textContent = '✓ Semua tagihan lunas';
  } else if (!owed.length) {
    note.textContent = '✓ Tidak ada tagihan yang perlu dibayar';
  } else {
    const overdue = owed.filter(i => i.status === 'escalated' || i.status === 'overdue').length;
    note.textContent = overdue ? `⚠ ${overdue} tagihan sudah lewat jatuh tempo` : `${owed.length} tagihan menunggu pembayaran`;
  }

  const list = document.getElementById('bayar-invoice-list');
  if (!relevant.length) {
    list.innerHTML = `<div class="card"><div class="empty-state"><div class="ic">🎉</div><div class="t">Tidak ada tagihan aktif</div><div class="d">Semua tagihan ${c.nama.split(' ')[0]} sudah lunas bulan ini.</div></div></div>`;
    return;
  }
  list.innerHTML = relevant.map(inv => {
    const si = statusInfo(inv.status);
    const isWriteoff = inv.status === 'writeoff';
    return `
      <div class="card">
        <div class="invoice-card">
          <div class="inv-left">
            <div class="inv-jenis">${inv.jenis} -- ${inv.periode}</div>
            <div class="inv-meta">${c.nama} (${c.kelas})</div>
            <div class="inv-nominal">${fmtRp(inv.nominal)}</div>
            <div class="inv-due">Jatuh tempo ${fmtTanggal(inv.jatuhTempo)}</div>
          </div>
          <span class="badge ${si.cls}"><span class="dot"></span>${si.label}</span>
        </div>
        ${isWriteoff
          ? `<div style="margin-top:12px;font-size:11.5px;color:var(--muted);">✓ Dihapus buku otomatis -- siswa pindah sekolah, tidak perlu dibayar.</div>`
          : `<div style="display:flex;gap:8px;margin-top:12px;">
               <button class="btn btn-primary" onclick="openPaySheet(${inv.id})">Bayar</button>
               <button class="btn btn-ghost" onclick="openKonfirmasiSheet(${inv.id})">Konfirmasi</button>
             </div>`}
      </div>`;
  }).join('');
}

// ---------- Payment Sheet ----------
let currentPayInvoice = null;
let qrInterval = null, vaInterval = null;

function buildFakeQr() {
  const grid = document.getElementById('qr-grid');
  grid.innerHTML = '';
  const size = 21;
  const isFinder = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
  const finderOn = (r, c) => {
    const rr = r < 7 ? r : (c >= size - 7 ? r : r - (size - 7));
    const cc = c < 7 ? c : (c >= size - 7 ? c - (size - 7) : c);
    const onOuter = rr === 0 || rr === 6 || cc === 0 || cc === 6;
    const onInner = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
    return onOuter || onInner;
  };
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = document.createElement('div');
      let on;
      if (isFinder(r, c)) {
        on = finderOn(r, c);
      } else {
        on = ((r * 13 + c * 7 + (r * c) % 5) % 3) === 0;
      }
      cell.className = 'qr-cell' + (on ? ' on' : '');
      grid.appendChild(cell);
    }
  }
}

function openPaySheet(invoiceId) {
  currentPayInvoice = invoices.find(i => i.id === invoiceId);
  document.getElementById('pay-sheet-title').textContent = `Bayar ${currentPayInvoice.jenis} -- ${currentPayInvoice.periode}`;
  document.getElementById('qr-amount-value').textContent = fmtRp(currentPayInvoice.nominal);
  document.getElementById('va-amount-value').textContent = fmtRp(currentPayInvoice.nominal);
  document.getElementById('bendahara-rekening-number').textContent = schoolBankAccount.nomor.match(/.{1,4}/g).join(' ');
  document.getElementById('bendahara-rekening-detail').textContent = `${schoolBankAccount.bank} a.n. ${schoolBankAccount.atasNama}`;
  document.getElementById('kf-tanggal').value = '2026-08-13';
  document.getElementById('kf-nominal').value = currentPayInvoice.nominal;
  document.getElementById('kf-bank').value = '';
  document.getElementById('kf-catatan').value = '';
  clearFile('kf');
  setPayMethod('qris');
  buildFakeQr();
  startQrCountdown();
  generateVaNumber();
  startVaCountdown();
  setVaMethod(document.querySelector('#va-method-pills .pill.active'));
  document.getElementById('pay-backdrop').classList.add('show');
  document.getElementById('pay-sheet').classList.add('show');
}
function closePaySheet() {
  document.getElementById('pay-backdrop').classList.remove('show');
  document.getElementById('pay-sheet').classList.remove('show');
  clearInterval(qrInterval); clearInterval(vaInterval);
}
function setPayMethod(m) {
  document.querySelectorAll('#pay-method-segment button').forEach(b => b.classList.toggle('active', b.dataset.pm === m));
  document.getElementById('pay-panel-qris').style.display = m === 'qris' ? 'block' : 'none';
  document.getElementById('pay-panel-va').style.display = m === 'va' ? 'block' : 'none';
  document.getElementById('pay-panel-transfer').style.display = m === 'transfer' ? 'block' : 'none';
}
function copyBendaharaRekening() {
  const num = schoolBankAccount.nomor;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(num).then(() => showToast('✓ Nomor rekening disalin')).catch(() => showToast('Nomor rekening: ' + num));
  } else {
    showToast('Nomor rekening: ' + num);
  }
}
function startQrCountdown() {
  clearInterval(qrInterval);
  let secs = 14 * 60 + 59;
  const el = document.getElementById('qr-countdown');
  const tick = () => {
    const m = Math.floor(secs / 60), s = secs % 60;
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (secs <= 0) { clearInterval(qrInterval); return; }
    secs--;
  };
  tick();
  qrInterval = setInterval(tick, 1000);
}
function startVaCountdown() {
  clearInterval(vaInterval);
  let secs = 23 * 3600 + 59 * 60;
  const el = document.getElementById('va-countdown');
  const tick = () => {
    const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
    el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (secs <= 0) { clearInterval(vaInterval); return; }
    secs--;
  };
  tick();
  vaInterval = setInterval(tick, 1000);
}
function generateVaNumber() {
  const bankCodes = { BCA: '014', BSI: '451', Mandiri: '008', BNI: '009', BRI: '002' };
  const activeBank = document.querySelector('#va-bank-pills .pill.active').dataset.bank;
  const raw = bankCodes[activeBank] + '88070' + String(currentPayInvoice.id).padStart(6, '0');
  const grouped = raw.match(/.{1,4}/g).join(' ');
  document.getElementById('va-number').textContent = grouped;
  document.getElementById('va-bank-label').textContent = activeBank;
}
function selectVaBank(btn) {
  document.querySelectorAll('#va-bank-pills .pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  generateVaNumber();
}
function copyVaNumber() {
  const num = document.getElementById('va-number').textContent.replace(/\s/g, '');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(num).then(() => showToast('✓ Nomor VA disalin')).catch(() => showToast('Nomor VA: ' + num));
  } else {
    showToast('Nomor VA: ' + num);
  }
}
function setVaMethod(btn) {
  if (!btn) return;
  document.querySelectorAll('#va-method-pills .pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const method = btn.dataset.method;
  const list = document.getElementById('va-instructions');
  list.innerHTML = VA_INSTRUCTIONS[method].map(s => `<li>${s}</li>`).join('');
}
function simulatePaymentSuccess() {
  if (!currentPayInvoice) return;
  const inv = currentPayInvoice;
  inv.status = 'paid';
  const c = children.find(ch => ch.id === inv.childId);
  paymentSeq++;
  paymentHistory.unshift({
    id: paymentSeq, childId: inv.childId, invoiceRef: `${inv.jenis} ${inv.periode}`,
    tanggal: '2026-08-11 ' + new Date().toTimeString().slice(0, 5),
    metode: document.getElementById('pay-panel-qris').style.display !== 'none' ? 'QRIS' : `VA ${document.querySelector('#va-bank-pills .pill.active').dataset.bank}`,
    provider: 'BSI H2H', nominal: inv.nominal, status: 'success', kuitansi: 'RCPT-2026-' + String(100000 + paymentSeq),
  });
  closePaySheet();
  renderBayarView();
  if (document.getElementById('riwayat-list')) renderRiwayat();
  showToast(`✓ Pembayaran ${c.nama.split(' ')[0]} berhasil dikonfirmasi`);
}

// =========================================================================
// RIWAYAT
// =========================================================================
let riwayatFilter = 'all';
function setRiwayatFilter(f) {
  riwayatFilter = f;
  document.querySelectorAll('#view-riwayat .segment button').forEach(b => b.classList.toggle('active', b.dataset.f === f));
  renderRiwayat();
}
function renderRiwayat() {
  let rows = paymentHistory.filter(p => p.childId === activeChildId);
  if (riwayatFilter === 'success') rows = rows.filter(p => p.status === 'success');
  if (riwayatFilter === 'expired') rows = rows.filter(p => p.status !== 'success');
  const box = document.getElementById('riwayat-list');
  if (!box) return;
  if (!rows.length) {
    box.innerHTML = `<div class="empty-state"><div class="ic">🧾</div><div class="t">Belum ada riwayat</div><div class="d">Riwayat pembayaran akan muncul di sini.</div></div>`;
    return;
  }
  box.innerHTML = rows.map(p => {
    const ok = p.status === 'success';
    return `
    <div class="list-row" style="cursor:pointer;" onclick="openDetailSheet(${p.id})">
      <div class="list-icon" style="background:${ok ? 'var(--accent-light)' : 'var(--red-light)'};color:${ok ? 'var(--accent)' : 'var(--red)'};">${ok ? '✓' : '✕'}</div>
      <div style="flex:1;">
        <div class="lr-title">${p.invoiceRef}</div>
        <div class="lr-sub">${p.metode} -- ${p.tanggal}</div>
      </div>
      <div class="lr-right">
        <div class="lr-amount">${fmtRp(p.nominal)}</div>
        <span class="badge ${ok ? 'badge-success' : 'badge-danger'}" style="margin-top:4px;">${ok ? 'Berhasil' : (p.status === 'expired' ? 'Kedaluwarsa' : 'Gagal')}</span>
      </div>
    </div>`;
  }).join('');
}
function openDetailSheet(paymentId) {
  const p = paymentHistory.find(x => x.id === paymentId);
  const c = children.find(ch => ch.id === p.childId);
  const ok = p.status === 'success';
  document.getElementById('detail-body').innerHTML = `
    <div style="text-align:center;padding:8px 0 16px;">
      <div style="font-size:32px;">${ok ? '✅' : '⚠️'}</div>
      <div style="font-size:15px;font-weight:700;margin-top:6px;">${ok ? 'Pembayaran Berhasil' : (p.status === 'expired' ? 'Pembayaran Kedaluwarsa' : 'Pembayaran Gagal')}</div>
    </div>
    <div class="kv-row"><span class="k">Anak</span><span class="v">${c.nama}</span></div>
    <div class="kv-row"><span class="k">Tagihan</span><span class="v">${p.invoiceRef}</span></div>
    <div class="kv-row"><span class="k">Nominal</span><span class="v">${fmtRp(p.nominal)}</span></div>
    <div class="kv-row"><span class="k">Metode</span><span class="v">${p.metode}</span></div>
    <div class="kv-row"><span class="k">Provider</span><span class="v">${p.provider}</span></div>
    <div class="kv-row"><span class="k">Waktu</span><span class="v">${p.tanggal}</span></div>
    <div class="kv-row"><span class="k">No. Kuitansi</span><span class="v">${p.kuitansi || '--'}</span></div>
    ${ok ? '<button class="btn btn-ghost" style="margin-top:16px;" onclick="showToast(\'✓ Kuitansi diunduh\')">⬇ Unduh Kuitansi (PDF)</button>' : ''}
  `;
  document.getElementById('detail-backdrop').classList.add('show');
  document.getElementById('detail-sheet').classList.add('show');
}
function closeDetailSheet() {
  document.getElementById('detail-backdrop').classList.remove('show');
  document.getElementById('detail-sheet').classList.remove('show');
}

// =========================================================================
// KONFIRMASI PEMBAYARAN -- dipicu dari tombol "Konfirmasi" di kartu tagihan.
// 2 mode: (1) Mandiri -- janji tanggal akan bayar sendiri lewat QRIS/VA,
//         (2) Manual Lewat Bendahara -- sudah transfer manual, kirim bukti untuk diverifikasi.
// =========================================================================
const uploadedFiles = { kf: null };
let currentKonfirmasiInvoice = null;

function onFileSelected(prefix) {
  const input = document.getElementById(prefix + '-file');
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  uploadedFiles[prefix] = file.name;
  document.getElementById(prefix + '-file-name').textContent = file.name;
  document.getElementById(prefix + '-file-result').classList.add('show');
}
function clearFile(prefix) {
  uploadedFiles[prefix] = null;
  document.getElementById(prefix + '-file').value = '';
  document.getElementById(prefix + '-file-result').classList.remove('show');
}

function openKonfirmasiSheet(invoiceId) {
  currentKonfirmasiInvoice = invoices.find(i => i.id === invoiceId);
  const inv = currentKonfirmasiInvoice;
  document.getElementById('kf-invoice-label').textContent = `${inv.jenis} ${inv.periode}`;
  document.getElementById('kfm-tanggal').value = '2026-08-13';
  document.getElementById('kfm-catatan').value = '';
  document.getElementById('konfirmasi-backdrop').classList.add('show');
  document.getElementById('konfirmasi-sheet').classList.add('show');
}
function closeKonfirmasiSheet() {
  document.getElementById('konfirmasi-backdrop').classList.remove('show');
  document.getElementById('konfirmasi-sheet').classList.remove('show');
}

function submitRencanaBayar() {
  if (!currentKonfirmasiInvoice) { showToast('Tidak ada tagihan terpilih'); return; }
  const tanggal = document.getElementById('kfm-tanggal').value;
  if (!tanggal) { showToast('Pilih rencana tanggal pembayaran'); return; }
  const catatan = document.getElementById('kfm-catatan').value.trim();

  const inv = currentKonfirmasiInvoice;
  pengajuanSeq++;
  pengajuanData.unshift({
    id: pengajuanSeq, childId: activeChildId, metode: 'rencana_bayar',
    invoiceRef: `${inv.jenis} ${inv.periode}`, nominal: inv.nominal, bank: '',
    fileName: '', catatan, status: 'terjadwal', tanggal,
  });
  closeKonfirmasiSheet();
  if (document.getElementById('pengajuan-list')) renderPengajuanList();
  updateBellBadge();
  showToast('✓ Rencana pembayaran Anda dikirim ke Bendahara');
}

function submitKonfirmasi() {
  if (!currentPayInvoice) { showToast('Tidak ada tagihan terpilih'); return; }
  const tanggal = document.getElementById('kf-tanggal').value;
  const nominal = document.getElementById('kf-nominal').value;
  const bank = document.getElementById('kf-bank').value.trim();
  if (!tanggal || !nominal || !bank) { showToast('Lengkapi tanggal, nominal, dan bank pengirim'); return; }
  if (!uploadedFiles.kf) { showToast('Unggah bukti transfer terlebih dahulu'); return; }

  const inv = currentPayInvoice;
  pengajuanSeq++;
  pengajuanData.unshift({
    id: pengajuanSeq, childId: activeChildId, metode: 'transfer_manual',
    invoiceRef: `${inv.jenis} ${inv.periode}`, nominal: parseInt(nominal, 10), bank,
    fileName: uploadedFiles.kf, status: 'menunggu_verifikasi', tanggal,
  });
  clearFile('kf');
  closePaySheet();
  if (document.getElementById('pengajuan-list')) renderPengajuanList();
  updateBellBadge();
  showToast('✓ Konfirmasi transfer terkirim, menunggu verifikasi Bendahara');
}

function pengajuanStatusInfo(status) {
  const map = {
    terjadwal: { label: 'Rencana Bayar', cls: 'badge-blue' },
    menunggu_verifikasi: { label: 'Menunggu Verifikasi', cls: 'badge-warn' },
    terverifikasi: { label: 'Terverifikasi', cls: 'badge-success' },
    ditolak: { label: 'Ditolak', cls: 'badge-danger' },
  };
  return map[status] || { label: status, cls: 'badge-muted' };
}

function renderPengajuanList() {
  const rows = pengajuanData.filter(p => p.childId === activeChildId);
  const box = document.getElementById('pengajuan-list');
  if (!box) return;
  if (!rows.length) {
    box.innerHTML = `<div class="empty-state"><div class="ic">📝</div><div class="t">Belum ada konfirmasi</div><div class="d">Konfirmasi transfer (menu Bayar &gt; Transfer) dan rencana pembayaran (tombol Konfirmasi) akan muncul di sini.</div></div>`;
    return;
  }
  box.innerHTML = rows.map(p => {
    const si = pengajuanStatusInfo(p.status);
    const isRencana = p.metode === 'rencana_bayar';
    const sub = isRencana
      ? `Rencana membayar pada ${fmtTanggal(p.tanggal)}`
      : `Transfer ${fmtRp(p.nominal)} via ${p.bank}`;
    const extra = isRencana
      ? (p.catatan ? `<div class="lr-sub" style="margin-top:2px;">📝 ${p.catatan}</div>` : '')
      : `<div class="lr-sub" style="margin-top:2px;">📎 ${p.fileName} -- ${p.tanggal}</div>`;
    return `
    <div class="list-row">
      <div class="list-icon" style="background:var(--blue-light);color:var(--blue);">${isRencana ? '🗓️' : '💵'}</div>
      <div style="flex:1;">
        <div class="lr-title">Konfirmasi -- ${p.invoiceRef}</div>
        <div class="lr-sub">${sub}</div>
        ${extra}
      </div>
      <div class="lr-right"><span class="badge ${si.cls}"><span class="dot"></span>${si.label}</span></div>
    </div>`;
  }).join('');
}

function updateBellBadge() {
  const pending = pengajuanData.filter(p => p.childId === activeChildId && p.status === 'menunggu_verifikasi').length;
  const el = document.getElementById('bell-count');
  if (!el) return;
  if (pending > 0) { el.textContent = pending; el.style.display = 'flex'; }
  else { el.style.display = 'none'; }
}

// =========================================================================
// AJUKAN PINDAH SEKOLAH -- memicu hapus buku (write-off) otomatis untuk
// cicilan yang belum jatuh tempo; cicilan yang sudah jatuh tempo tetap harus dilunasi.
// =========================================================================
let currentPindahChild = null;

function getTunggakan(childId) {
  return invoices.filter(i => i.childId === childId && ['escalated', 'overdue'].includes(i.status));
}

function renderPindahTunggakan(childId) {
  const tunggakan = getTunggakan(childId);
  const box = document.getElementById('pindah-tunggakan-box');
  const rencanaField = document.getElementById('pindah-rencana-field');
  if (!tunggakan.length) {
    box.innerHTML = `<div class="note-box blue" style="margin-bottom:14px;">✓ Tidak ada tunggakan yang harus dilunasi.</div>`;
    rencanaField.style.display = 'none';
    return;
  }
  const total = tunggakan.reduce((s, i) => s + i.nominal, 0);
  box.innerHTML = `
    <div class="note-box" style="margin-bottom:14px;">
      ⚠ Ada ${tunggakan.length} tagihan tunggakan (sudah jatuh tempo) sebesar <b>${fmtRp(total)}</b> yang tetap harus dilunasi meski pindah sekolah:
      <div style="margin-top:8px;">
        ${tunggakan.map(i => `<div class="kv-row"><span class="k">${i.jenis} ${i.periode}</span><span class="v">${fmtRp(i.nominal)}</span></div>`).join('')}
      </div>
    </div>`;
  rencanaField.style.display = 'block';
}

function openPindahSheet(childId) {
  currentPindahChild = children.find(c => c.id === childId);
  document.getElementById('pindah-child-label').textContent = currentPindahChild.nama;
  document.getElementById('pd-tanggal').value = '2026-08-13';
  document.getElementById('pd-sekolah-tujuan').value = '';
  document.getElementById('pd-catatan').value = '';
  document.getElementById('pd-rencana-bayar').value = '';
  renderPindahTunggakan(childId);
  document.getElementById('pindah-backdrop').classList.add('show');
  document.getElementById('pindah-sheet').classList.add('show');
}
function closePindahSheet() {
  document.getElementById('pindah-backdrop').classList.remove('show');
  document.getElementById('pindah-sheet').classList.remove('show');
}

function submitPindahSekolah() {
  if (!currentPindahChild) return;
  const child = currentPindahChild;
  const tanggal = document.getElementById('pd-tanggal').value;
  if (!tanggal) { showToast('Pilih tanggal efektif pindah'); return; }

  const tunggakan = getTunggakan(child.id);
  const rencanaBayar = document.getElementById('pd-rencana-bayar').value;
  if (tunggakan.length && !rencanaBayar) {
    showToast('Isi rencana tanggal pelunasan tunggakan terlebih dahulu');
    return;
  }

  const sekolahTujuan = document.getElementById('pd-sekolah-tujuan').value.trim();
  const catatan = document.getElementById('pd-catatan').value.trim();
  const totalTunggakan = tunggakan.reduce((s, i) => s + i.nominal, 0);

  pindahSeq++;
  pindahSekolahData.unshift({
    id: pindahSeq, childId: child.id, tanggal, sekolahTujuan, catatan,
    tunggakanNominal: totalTunggakan, rencanaBayarTunggakan: rencanaBayar || null, status: 'diproses',
  });
  child.status = 'pindah';

  // rencana pelunasan tunggakan ikut tercatat di riwayat konfirmasi supaya Bendahara bisa memantau.
  tunggakan.forEach(inv => {
    pengajuanSeq++;
    pengajuanData.unshift({
      id: pengajuanSeq, childId: child.id, metode: 'rencana_bayar',
      invoiceRef: `${inv.jenis} ${inv.periode}`, nominal: inv.nominal, bank: '',
      fileName: '', catatan: 'Rencana pelunasan tunggakan sebelum pindah sekolah', status: 'terjadwal', tanggal: rencanaBayar,
    });
  });

  // simulasi proses hapus buku otomatis oleh sekolah -- hanya cicilan yang belum
  // jatuh tempo ('sent') yang dihapus buku; yang sudah jatuh tempo (tunggakan) tetap harus dilunasi.
  let jumlahDihapus = 0;
  invoices.filter(i => i.childId === child.id && i.status === 'sent').forEach(i => {
    i.status = 'writeoff';
    jumlahDihapus++;
  });

  closePindahSheet();
  renderChildrenList();
  if (child.id === activeChildId) {
    if (document.getElementById('bayar-invoice-list')) renderBayarView();
    if (document.getElementById('pengajuan-list')) renderPengajuanList();
    updateBellBadge();
  }
  const ket = jumlahDihapus > 0 ? ` -- ${jumlahDihapus} cicilan yang belum jatuh tempo otomatis dihapus buku` : '';
  const ketTunggakan = tunggakan.length ? ` Tunggakan ${fmtRp(totalTunggakan)} tetap harus dilunasi sesuai rencana.` : '';
  showToast(`✓ Pengajuan pindah sekolah ${child.nama.split(' ')[0]} terkirim${ket}.${ketTunggakan}`);
}

// Safety net: the phone shell should never scroll on its own (only #app-content
// does). Some browsers nudge an overflow:hidden ancestor's scroll position when
// a focused/clicked element inside it requests scrollIntoView -- reset it immediately
// so off-screen bottom sheets never creep into view.
document.addEventListener('DOMContentLoaded', () => {
  const phoneShell = document.querySelector('.phone');
  if (phoneShell) phoneShell.addEventListener('scroll', () => { phoneShell.scrollTop = 0; phoneShell.scrollLeft = 0; });
});
