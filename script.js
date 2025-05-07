const users = {
    'guestcode': 'guest',
    'allycode': 'alliance',
    'ownercode': 'owner'
};
function login() {
    const code = document.getElementById('accessCode').value.trim();
    const level = users[code];
    if (level) {
        localStorage.setItem('accessLevel', level);
        window.location.href = 'home.html';
    } else {
        alert('Invalid code.');
    }
}
function checkAccess(requiredLevel) {
    const level = localStorage.getItem('accessLevel');
    if (!level || (requiredLevel && level !== requiredLevel)) {
        window.location.href = 'index.html';
    }
}
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        nav.innerHTML = \`
            <a href="home.html">Home</a>
            <a href="alliances.html">Alliances</a>
            <a href="announcements.html">Announcements</a>
            <a href="tools.html">Tools</a>
            <a href="applications.html">Applications</a>
            <a href="admin.html">Admin</a>
            <a href="#" onclick="logout()">Logout</a>
        \`;
    }
});