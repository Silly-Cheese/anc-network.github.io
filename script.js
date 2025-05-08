// Hardcoded permanent access codes
const accessCodes = {
  guest: ["Guest123"],
  alliance: ["GreenT26", "thedevisc00l", "TRG1"],
  owner: ["ExecutiveOrders568934", "Ivory"]
};

// LOGIN FUNCTION
function login() {
  const input = document.getElementById("accessCode").value.trim().toUpperCase();
  let tempCodes = JSON.parse(sessionStorage.getItem("tempCodes") || "[]");

  let accessLevel = null;

  // Check permanent codes (case-insensitive)
  if (accessCodes.owner.some(code => code.toUpperCase() === input)) {
    accessLevel = "owner";
  } else if (accessCodes.alliance.some(code => code.toUpperCase() === input)) {
    accessLevel = "alliance";
  } else if (accessCodes.guest.some(code => code.toUpperCase() === input)) {
    accessLevel = "guest";
  }

  // Check temp codes and remove if used
  if (!accessLevel && tempCodes.includes(input)) {
    accessLevel = "alliance"; // temp codes grant alliance access
    tempCodes = tempCodes.filter(code => code !== input); // remove used temp code
    sessionStorage.setItem("tempCodes", JSON.stringify(tempCodes));
  }

  if (accessLevel) {
    localStorage.setItem("accessLevel", accessLevel);
    window.location.href = "home.html";
  } else {
    document.getElementById("loginError").textContent = "Invalid access code.";
  }
}

// SHOW FORGOT PASSWORD FORM
function showForgotForm() {
  document.getElementById("forgotBox").classList.remove("hidden");
}

// SUBMIT FOR TEMP CODE
function submitForgot() {
  const alliance = document.getElementById("allianceName").value.trim();
  const username = document.getElementById("robloxUsername").value.trim();

  if (!alliance || !username) {
    alert("Please enter both your alliance name and Roblox username.");
    return;
  }

  const tempCode = "TEMP_" + Math.random().toString(36).substring(2, 8).toUpperCase();
  let tempCodes = JSON.parse(sessionStorage.getItem("tempCodes") || "[]");
  tempCodes.push(tempCode);
  sessionStorage.setItem("tempCodes", JSON.stringify(tempCodes));

  document.getElementById("tempCodeMsg").innerText =
    `Your temporary code: ${tempCode}\nYou can now log in with it.`;

  // Send email via Formspree (you can configure to your endpoint)
  fetch("https://formspree.io/f/xldbnkby", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      _replyto: "temp@anc.network",
      subject: "Temporary Code Used",
      message: `Alliance: ${alliance}\nRoblox Username: ${username}\nTemp Code: ${tempCode}`
    })
  }).catch(err => console.error("Formspree request failed:", err));
}

// LOGOUT
function logout() {
  localStorage.removeItem("accessLevel");
  sessionStorage.removeItem("tempCodes");
  window.location.href = "index.html";
}

// ACCESS LEVEL PROTECTION
function checkAccess(allowedLevels) {
  const level = localStorage.getItem("accessLevel");
  if (!allowedLevels.includes(level)) {
    window.location.href = "index.html";
  }
}
