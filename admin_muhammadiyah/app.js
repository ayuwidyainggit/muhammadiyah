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
const rbacModules = [
  { key: 'dashboard-konsolidasi', label: 'Dashboard Konsolidasi', icon: '📊', page: 'dashboard-konsolidasi.html' },
  { key: 'pendaftaran', label: 'Pendaftaran Sekolah', icon: '＋', page: 'pendaftaran.html' },
  { key: 'manajemen', label: 'Manajemen Sekolah', icon: '🏫', page: 'manajemen.html' },
  { key: 'konfigurasi', label: 'Konfigurasi Sistem', icon: '⚙', page: 'konfigurasi.html' },
  { key: 'rbac', label: 'RBAC & Pengguna', icon: '🔐', page: 'rbac.html' },
];

let roleSeq = 1;
const rolesData = [
  { id: roleSeq++, nama: 'Super Admin', icon: '🛡️', deskripsi: 'Akses penuh ke seluruh modul platform.',
    perms: { 'dashboard-konsolidasi': true, pendaftaran: true, manajemen: true, konfigurasi: true, rbac: true } },
  { id: roleSeq++, nama: 'Admin Wilayah (PWM)', icon: '🗺️', deskripsi: 'Kelola sekolah & onboarding di wilayahnya, tanpa akses konfigurasi platform.',
    perms: { 'dashboard-konsolidasi': true, pendaftaran: true, manajemen: true, konfigurasi: false, rbac: false } },
  { id: roleSeq++, nama: 'Staff Keuangan Pusat', icon: '💰', deskripsi: 'Pantau performa pembayaran & data sekolah, tanpa ubah konfigurasi/onboarding.',
    perms: { 'dashboard-konsolidasi': true, pendaftaran: false, manajemen: true, konfigurasi: false, rbac: false } },
  { id: roleSeq++, nama: 'Viewer (Read-only)', icon: '👁️', deskripsi: 'Hanya lihat Dashboard Konsolidasi.',
    perms: { 'dashboard-konsolidasi': true, pendaftaran: false, manajemen: false, konfigurasi: false, rbac: false } },
];

let userSeq = 1;
const usersData = [
  { id: userSeq++, nama: 'Siti Aminah', email: 'superadmin@geekgarden.id', password: 'admin123', roleId: 1, cakupan: 'Nasional', status: 'Aktif' },
  { id: userSeq++, nama: 'Budi Santoso', email: 'wilayah.jatim@muhammadiyah.id', password: 'wilayah123', roleId: 2, cakupan: 'PWM Jawa Timur', status: 'Aktif' },
  { id: userSeq++, nama: 'Rina Kartika', email: 'keuangan@muhammadiyah.id', password: 'keuangan123', roleId: 3, cakupan: 'Nasional', status: 'Aktif' },
  { id: userSeq++, nama: 'Ahmad Fauzi', email: 'viewer@muhammadiyah.id', password: 'viewer123', roleId: 4, cakupan: 'Nasional', status: 'Aktif' },
  { id: userSeq++, nama: 'Dedi Kurniawan', email: 'nonaktif@muhammadiyah.id', password: 'nonaktif123', roleId: 4, cakupan: 'Nasional', status: 'Nonaktif' },
];

function roleById(id) { return rolesData.find(r => r.id === Number(id)); }

function defaultPageFor(role) {
  const mod = rbacModules.find(m => role.perms[m.key]);
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
  if (!role.perms[pageKey]) { location.replace(defaultPageFor(role)); return false; }
  return true;
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
  const rl = document.getElementById('uc-role'); if (rl) rl.textContent = `${role.nama} -- ${currentUser.cakupan}`;
  const cr = document.getElementById('crumb-role'); if (cr) cr.textContent = role.nama;
}

function applyRbacToSidebar() {
  if (!currentUser) return;
  const role = roleById(currentUser.roleId);
  document.querySelectorAll('.nav-item[data-rbac]').forEach(item => {
    item.style.display = role.perms[item.dataset.rbac] ? 'flex' : 'none';
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

// dynamic reminder/escalation rule rows (used in Konfigurasi Sistem default + Manajemen Sekolah override)
function addRuleRow(tableId) {
  const tbody = document.querySelector('#' + (tableId || 'rules-table') + ' tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="number" value="0"></td>
    <td><input type="text" placeholder="Nama aturan baru"></td>
    <td><select><option selected>Level 1 -- Pengingat</option><option>Level 2 -- Peringatan</option><option>Level 3 -- Eskalasi</option></select></td>
    <td>
      <label style="margin-right:8px;font-size:11.5px;"><input type="checkbox" checked> WA</label>
      <label style="margin-right:8px;font-size:11.5px;"><input type="checkbox"> SMS</label>
      <label style="font-size:11.5px;"><input type="checkbox"> Email</label>
    </td>
    <td><label class="toggle"><input type="checkbox" checked><span class="slider"></span></label></td>
    <td><button class="btn-remove-row" onclick="removeRow(this)">✕</button></td>`;
  tbody.appendChild(tr);
}

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
