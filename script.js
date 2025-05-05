const codes = {
  guest: ['guest123'],
  alliance: ['TRG1'],
  owner: ['OwnersOfANC']
};

function login() {
  const entered = document.getElementById('codeInput').value.trim();

  if (codes.owner.includes(entered)) {
    localStorage.setItem('accessLevel', 'owner');
    window.location.href = 'home.html';
  } else if (codes.alliance.includes(entered)) {
    localStorage.setItem('accessLevel', 'alliance');
    window.location.href = 'home.html';
  } else if (codes.guest.includes(entered)) {
    localStorage.setItem('accessLevel', 'guest');
    window.location.href = 'alliances.html';
  } else {
    alert('Invalid code.');
  }
}

function checkAccess(requiredLevel) {
  const access = localStorage.getItem('accessLevel');
  const allowed = {
    guest: ['guest', 'alliance', 'owner'],
    alliance: ['alliance', 'owner'],
    owner: ['owner']
  };

  if (!allowed[requiredLevel].includes(access)) {
    alert('Access denied. Please log in.');
    window.location.href = 'index.html';
  }
}

function signOut() {
  localStorage.removeItem('accessLevel');
  window.location.href = 'index.html';
}
