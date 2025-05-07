// Access codes mapped to roles
const accessCodes = {
  'guestcode': 'guest',
  'allycode': 'alliance',
  'ownercode': 'owner'
};

// Login logic
function login() {
  const input = document.getElementById('accessCode');
  if (!input) return;

  const code = input.value.trim();
  const level = accessCodes[code];

  if (level) {
    localStorage.setItem('accessLevel', level);
    window.location.href = 'home.html';
  } else {
    alert('Invalid access code.');
  }
}

// Logout clears session
function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// Check if the current user has access to the page
function checkAccess(allowedLevels = []) {
  const level = localStorage.getItem('accessLevel');
  if (!level || (allowedLevels.length && !allowedLevels.includes(level))) {
    window.location.href = 'index.html';
  }
}

// Dynamic navbar injection
function injectNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const level = localStorage.getItem('accessLevel');

  const links = [
    { href: 'home.html', label: 'Home' },
    { href: 'alliances.html', label: 'Alliances' },
    { href: 'announcements.html', label: 'Announcements' },
    { href: 'tools.html', label: 'Tools' },
    { href: 'applications.html', label: 'Applications' },
  ];

  if (level === 'owner') {
    links.push({ href: 'admin.html', label: 'Admin' });
  }

  links.push({ href: '#', label: 'Logout', onclick: 'logout()' });

  nav.innerHTML = links.map(link =>
    `<a href="${link.href}" ${link.onclick ? `onclick="${link.onclick}"` : ''}>${link.label}</a>`
  ).join('');
}

// DOM ready handler
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', login);
  }
  injectNavbar();
});
