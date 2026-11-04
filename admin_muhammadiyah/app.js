// ==================================================================
// SESSION (sessionStorage-backed login state -- demo auth, not production)
// ==================================================================
const SESSION_KEY = 'admin_mu_session';
function saveSession(user) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(user)); }
function getSession() { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; } }
function clearSession() { sessionStorage.removeItem(SESSION_KEY); }
let currentUser = null;

// ==================================================================
// RBAC -- modules (nav order also defines default-landing-page priority), roles & users
// ==================================================================
// `group: null` = tampil berdiri sendiri di sidebar (tidak di bawah nav-group-label manapun).
const rbacModules = [
  { key: 'dashboard-konsolidasi', label: 'Dashboard Konsolidasi', icon: '📊', page: 'dashboard-konsolidasi.html', group: null },
  { key: 'pendaftaran', label: 'Pendaftaran Sekolah', icon: '＋', page: 'pendaftaran.html', group: 'Onboarding' },
  { key: 'manajemen', label: 'Manajemen Sekolah', icon: '🏫', page: 'manajemen.html', group: 'Onboarding' },
  { key: 'konfigurasi', label: 'Konfigurasi Sistem', icon: '⚙', page: 'konfigurasi.html', group: 'Konfigurasi' },
  { key: 'pengguna', label: 'Pengguna', icon: '👤', page: 'pengguna.html', group: 'Konfigurasi' },
  { key: 'rbac', label: 'Role & Hak Akses', icon: '🔐', page: 'rbac.html', group: 'Konfigurasi' },
];

// Hak akses per modul bersifat granular per-aksi: Create, Read, Update, Delete.
// "Read" juga berfungsi sebagai gate akses menu/halaman (lihat enforcePageAccess/applyRbacToSidebar).
function cru(c, r, u, d) { return { c, r, u, d }; }
function cruFull(v) { return cru(v, v, v, v); }

let roleSeq = 1;
const rolesData = [
  { id: roleSeq++, nama: 'Super Admin', kode: 'SUPER_ADMIN', icon: '🛡️', deskripsi: 'Akses penuh (Create/Read/Update/Delete) ke seluruh modul platform.',
    perms: {
      'dashboard-konsolidasi': cruFull(true), pendaftaran: cruFull(true), manajemen: cruFull(true),
      konfigurasi: cruFull(true), pengguna: cruFull(true), rbac: cruFull(true),
    } },
  { id: roleSeq++, nama: 'Admin Wilayah (PWM)', kode: 'ADMIN_WILAYAH_PWM', icon: '🗺️', deskripsi: 'Kelola sekolah & onboarding di wilayahnya, tanpa akses konfigurasi platform.',
    perms: {
      'dashboard-konsolidasi': cru(false, true, false, false),
      pendaftaran: cru(true, true, true, false),
      manajemen: cru(false, true, true, false),
      konfigurasi: cru(false, false, false, false),
      pengguna: cru(false, false, false, false),
      rbac: cru(false, false, false, false),
    } },
  { id: roleSeq++, nama: 'Staff Keuangan Pusat', kode: 'STAFF_KEUANGAN_PUSAT', icon: '💰', deskripsi: 'Pantau performa pembayaran & data sekolah, tanpa ubah konfigurasi/onboarding.',
    perms: {
      'dashboard-konsolidasi': cru(false, true, false, false),
      pendaftaran: cru(false, false, false, false),
      manajemen: cru(false, true, false, false),
      konfigurasi: cru(false, false, false, false),
      pengguna: cru(false, false, false, false),
      rbac: cru(false, false, false, false),
    } },
  { id: roleSeq++, nama: 'Viewer (Read-only)', kode: 'VIEWER', icon: '👁️', deskripsi: 'Hanya lihat Dashboard Konsolidasi.',
    perms: {
      'dashboard-konsolidasi': cru(false, true, false, false),
      pendaftaran: cru(false, false, false, false),
      manajemen: cru(false, false, false, false),
      konfigurasi: cru(false, false, false, false),
      pengguna: cru(false, false, false, false),
      rbac: cru(false, false, false, false),
    } },
];

let userSeq = 1;
const usersData = [
  { id: userSeq++, nama: 'Siti Aminah', email: 'superadmin@geekgarden.id', password: 'admin123', roleId: 1, status: 'Aktif' },
  { id: userSeq++, nama: 'Budi Santoso', email: 'wilayah.jatim@muhammadiyah.id', password: 'wilayah123', roleId: 2, status: 'Aktif' },
  { id: userSeq++, nama: 'Rina Kartika', email: 'keuangan@muhammadiyah.id', password: 'keuangan123', roleId: 3, status: 'Aktif' },
  { id: userSeq++, nama: 'Ahmad Fauzi', email: 'viewer@muhammadiyah.id', password: 'viewer123', roleId: 4, status: 'Aktif' },
  { id: userSeq++, nama: 'Dedi Kurniawan', email: 'nonaktif@muhammadiyah.id', password: 'nonaktif123', roleId: 4, status: 'Nonaktif' },
];

function roleById(id) { return rolesData.find(r => r.id === Number(id)); }

function defaultPageFor(role) {
  const mod = rbacModules.find(m => role.perms[m.key] && role.perms[m.key].r);
  return mod ? mod.page : 'dashboard-konsolidasi.html';
}

// ---- per-page guards (call at top of every protected page's inline script) ----
function requireLogin() {
  const u = getSession();
  if (!u) { location.replace('index.html'); return null; }
  currentUser = u;
  return u;
}
function enforcePageAccess(pageKey) {
  const role = roleById(currentUser.roleId);
  const p = role.perms[pageKey];
  if (!p || !p.r) { location.replace(defaultPageFor(role)); return false; }
  return true;
}
// guard tambahan untuk aksi tertentu di dalam halaman (create/update/delete),
// dipakai terpisah dari enforcePageAccess yang hanya menjaga akses Read ke halaman
function hasPerm(pageKey, action) {
  const role = roleById(currentUser.roleId);
  const p = role.perms[pageKey];
  return !!(p && p[action]);
}
function logout() {
  clearSession();
  location.href = 'index.html';
}

function applyCurrentUserToUi() {
  if (!currentUser) return;
  const role = roleById(currentUser.roleId);
  const initials = currentUser.nama.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const av = document.getElementById('uc-avatar'); if (av) av.textContent = initials;
  const nm = document.getElementById('uc-name'); if (nm) nm.textContent = currentUser.nama;
  const rl = document.getElementById('uc-role'); if (rl) rl.textContent = role.nama;
  const cr = document.getElementById('crumb-role'); if (cr) cr.textContent = role.nama;
}

function applyRbacToSidebar() {
  if (!currentUser) return;
  const role = roleById(currentUser.roleId);
  document.querySelectorAll('.nav-item[data-rbac]').forEach(item => {
    const p = role.perms[item.dataset.rbac];
    item.style.display = (p && p.r) ? 'flex' : 'none';
  });
  document.querySelectorAll('.nav-group-label').forEach(label => {
    let sib = label.nextElementSibling, anyVisible = false;
    while (sib && !sib.classList.contains('nav-group-label')) {
      if (sib.classList.contains('nav-item') && sib.style.display !== 'none') anyVisible = true;
      sib = sib.nextElementSibling;
    }
    label.style.display = anyVisible ? 'block' : 'none';
  });
}

// ==================================================================
// LOGIN SCREEN (index.html)
// ==================================================================
function renderDemoRoleList() {
  const el = document.getElementById('demo-role-list');
  if (!el) return;
  el.innerHTML = usersData.filter(u => u.status === 'Aktif').map(u => {
    const role = roleById(u.roleId);
    return `<button type="button" class="demo-role-btn" onclick="demoLogin(${u.id})">
      <div><div class="rn">${role.icon} ${role.nama}</div><div class="rd">${u.email} / ${u.password}</div></div>
      <div class="go">Masuk →</div>
    </button>`;
  }).join('');
}

function findUserByCredentials(email, password) {
  return usersData.find(u => u.email.toLowerCase() === (email || '').trim().toLowerCase() && u.password === password);
}
function doLogin(email, password) {
  const errEl = document.getElementById('login-error');
  const user = findUserByCredentials(email, password);
  if (!user) {
    errEl.textContent = 'Email/password tidak dikenali (mode demo) -- coba salah satu peran di bawah.';
    errEl.style.display = 'block';
    return;
  }
  if (user.status !== 'Aktif') {
    errEl.textContent = `Akun ini berstatus Nonaktif -- hubungi Super Admin untuk mengaktifkan kembali.`;
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';
  loginAs(user);
}
function demoLogin(userId) {
  const user = usersData.find(u => u.id === userId);
  if (!user) return;
  document.getElementById('login-email').value = user.email;
  document.getElementById('login-password').value = user.password;
  document.getElementById('login-error').style.display = 'none';
  loginAs(user);
}
function loginAs(user) {
  currentUser = user;
  saveSession(user);
  location.href = defaultPageFor(roleById(user.roleId));
}

// ==================================================================
// SHARED UTILS (used across 2+ pages)
// ==================================================================
function togglePw(id, btn) {
  const el = document.getElementById(id);
  if (el.type === 'password') { el.type = 'text'; btn.textContent = 'Sembunyikan'; }
  else { el.type = 'password'; btn.textContent = 'Lihat'; }
}

function removeRow(btn) { btn.closest('tr').remove(); }

// template channel tabs (scoped by container id, so global default and per-school editors don't clash)
function switchChannel(ch, rootId) {
  const root = document.getElementById(rootId || 'tmpl-root-default');
  root.querySelectorAll('.channel-tab').forEach(t => t.classList.toggle('active', t.dataset.ch === ch));
  root.querySelectorAll('.channel-panel').forEach(p => {
    p.style.display = p.dataset.chPanel === ch ? 'block' : 'none';
  });
}

// dynamic reminder/escalation rule rows (used in Konfigurasi Sistem default platform)
function addRuleRow(tableId) {
  const tbody = document.querySelector('#' + (tableId || 'rules-table') + ' tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="number" value="0"></td>
    <td><input type="text" placeholder="Nama aturan baru"></td>
    <td><select><option selected>Level 1 -- Pengingat</option><option>Level 2 -- Peringatan</option><option>Level 3 -- Eskalasi</option></select></td>
    <td>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <label style="font-size:11.5px;"><input type="checkbox" checked> WA</label>
        <label style="font-size:11.5px;"><input type="checkbox"> Email</label>
        <label style="font-size:11.5px;"><input type="checkbox"> Push Notif</label>
        <label style="font-size:11.5px;"><input type="checkbox"> Notif Aplikasi</label>
      </div>
    </td>
    <td><label class="toggle"><input type="checkbox" checked><span class="slider"></span></label></td>
    <td><button class="btn-remove-row" onclick="removeRow(this)">✕</button></td>`;
  tbody.appendChild(tr);
}

// default message templates (WA/Email/Push Notif/Notif Aplikasi x level 1-3) persisted across reloads
const TMPL_DEFAULT_IDS = [
  'tmpl-default-wa-1', 'tmpl-default-wa-2', 'tmpl-default-wa-3',
  'tmpl-default-email-1', 'tmpl-default-email-2', 'tmpl-default-email-3',
  'tmpl-default-push-1', 'tmpl-default-push-2', 'tmpl-default-push-3',
  'tmpl-default-inapp-1', 'tmpl-default-inapp-2', 'tmpl-default-inapp-3',
];
const TMPL_DEFAULT_STORAGE_KEY = 'tmpl-default';

function saveDefaultTemplate() {
  const data = {};
  TMPL_DEFAULT_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  localStorage.setItem(TMPL_DEFAULT_STORAGE_KEY, JSON.stringify(data));
  showToast('✓ Template default platform berhasil disimpan');
}

function loadDefaultTemplate() {
  const raw = localStorage.getItem(TMPL_DEFAULT_STORAGE_KEY);
  if (!raw) return;
  let data;
  try { data = JSON.parse(raw); } catch (e) { return; }
  TMPL_DEFAULT_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el && typeof data[id] === 'string') el.value = data[id];
  });
}
document.addEventListener('DOMContentLoaded', loadDefaultTemplate);

// ---- toast ----
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg || '✓ Konfigurasi berhasil disimpan';
  t.style.display = 'flex';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.display = 'none'; }, 2600);
}

// ---- confirm modal (generic, dipakai sebelum Edit/Hapus/Nonaktifkan data yang sudah tersimpan) ----
function ensureConfirmModal() {
  if (document.getElementById('gconfirm-overlay')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-overlay" id="gconfirm-overlay" onclick="if(event.target===this) closeConfirmModal();">
      <div class="modal-box" style="max-width:420px;">
        <div class="modal-head">
          <h3 id="gconfirm-title">Konfirmasi</h3>
          <span class="modal-close" onclick="closeConfirmModal()">✕</span>
        </div>
        <div class="modal-body">
          <p id="gconfirm-message" style="margin:0;font-size:13px;color:var(--ink);line-height:1.6;"></p>
        </div>
        <div class="btn-row" style="justify-content:flex-end;">
          <button class="btn btn-ghost" onclick="closeConfirmModal()">Batal</button>
          <button class="btn" id="gconfirm-btn"></button>
        </div>
      </div>
    </div>`);
}
function closeConfirmModal() {
  const overlay = document.getElementById('gconfirm-overlay');
  if (overlay) overlay.classList.remove('active');
}
function confirmAction(opts, onConfirm) {
  ensureConfirmModal();
  const { title = 'Konfirmasi', message = '', confirmLabel = 'Ya, Lanjutkan', danger = false } = opts;
  document.getElementById('gconfirm-title').textContent = title;
  document.getElementById('gconfirm-message').textContent = message;
  const btn = document.getElementById('gconfirm-btn');
  btn.textContent = confirmLabel;
  btn.style.background = danger ? 'var(--red)' : 'var(--navy)';
  btn.style.color = '#fff';
  btn.onclick = () => { closeConfirmModal(); onConfirm(); };
  document.getElementById('gconfirm-overlay').classList.add('active');
}

// ---- floating PRD doc button (muncul di semua halaman app, bukan di login) ----
const PRD_BY_PAGE = {
  'dashboard-konsolidasi.html': 'docs/PRD-dashboard-konsolidasi.html',
  'pendaftaran.html': 'docs/PRD-pendaftaran-sekolah.html',
  'manajemen.html': 'docs/PRD-manajemen-sekolah.html',
  'konfigurasi.html': 'docs/PRD-konfigurasi-sistem.html',
  'pengguna.html': 'docs/PRD-pengguna.html',
  'rbac.html': 'docs/PRD-role-hak-akses.html',
};
function injectPrdFab() {
  if (!document.getElementById('app-shell')) return;
  if (document.getElementById('prd-fab')) return;
  const currentFile = location.pathname.split('/').pop();
  const a = document.createElement('a');
  a.id = 'prd-fab';
  a.href = PRD_BY_PAGE[currentFile] || 'docs/index.html';
  a.target = '_blank';
  a.rel = 'noopener';
  a.title = 'Baca PRD fitur ini';
  a.style.cssText = [
    'position:fixed', 'bottom:26px', 'right:26px', 'background:var(--navy)', 'color:#fff',
    'border:none', 'border-radius:999px', 'padding:13px 20px', 'font-size:13px', 'font-weight:700',
    'box-shadow:0 6px 18px rgba(20,36,63,0.35)', 'cursor:pointer', 'display:flex', 'align-items:center',
    'gap:8px', 'text-decoration:none', 'z-index:999', 'font-family:inherit',
  ].join(';');
  a.innerHTML = '📄 PRD';
  a.addEventListener('mouseenter', () => { a.style.background = 'var(--navy-soft)'; });
  a.addEventListener('mouseleave', () => { a.style.background = 'var(--navy)'; });
  document.body.appendChild(a);
}
injectPrdFab();
