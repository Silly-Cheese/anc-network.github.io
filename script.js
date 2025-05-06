<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A.N.C. Network - Login</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>

<body onload="checkAccess('guest')">
  <header>
    <h1>A.N.C. Network</h1>
    <p>Allied Nexus Collaborative Network</p>
  </header>
  <nav>
    <a href="home.html">Home</a>
    <a href="alliances.html">Alliances</a>
    <a href="announcements.html">Announcements</a>
    <a href="https://discord.gg/fRys9tqeKq" target="_blank">Discord</a>
    <a href="https://forms.gle/JVeTxAaamrpG6XUx7" target="_blank">Apply</a>
  </nav>
  <main>
    <h2>Login</h2>
    <input type="text" id="codeInput" placeholder="Enter your password code">
    <button onclick="login()">Login</button>
  </main>
</body>

</html>
