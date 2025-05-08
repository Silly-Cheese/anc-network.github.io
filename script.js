// Access codes mapped to roles
const accessCodes = {
  'Guest': 'guest',
  'TRG1': 'alliance',
  'GreenT26':'alliance',
  'thedevisc00l': 'alliance',
  'Ivory': 'owner',
  'ExecutiveOrders568934': 'owner'
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

function showForgotForm() {
  document.getElementById("forgotBox").classList.remove("hidden");
}

function submitForgot() {
  const alliance = document.getElementById("allianceName").value.trim();
  if (!alliance) {
    alert("Please enter your alliance name.");
    return;
  }

  const tempCode = Math.random().toString(36).substring(2, 10).toUpperCase();

  // Show code to user
  document.getElementById("tempCodeMsg").innerText = `Your temporary access code: ${tempCode}`;

  // Send email via Formspree
  fetch("https://formspree.io/f/xldbnkby", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      _replyto: "temp@anc.network", // dummy sender
      message: `Temporary code request from: ${alliance}\nGenerated Code: ${tempCode}`
    })
  })
  .then(res => {
    if (res.ok) {
      console.log("Email sent to admin.");
    } else {
      console.error("Formspree error:", res.status);
    }
  });
}

