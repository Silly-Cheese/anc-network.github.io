// Hardcoded permanent access codes
const accessCodes = {
  guest: ["Guest123"],
  alliance: ["GreenT26", "TRG1", "thedevisc00l"],
  owner: ["ExecutiveOrders568934", "Ivory"]
};

// LOGIN FUNCTION
function login() {
  const input = document.getElementById("accessCode").value.trim().toUpperCase();
  const tempCodes = JSON.parse(sessionStorage.getItem("tempCodes") || "[]");

  let accessLevel = null;

  if (accessCodes.owner.includes(input)) {
    accessLevel = "owner";
  } else if (accessCodes.alliance.includes(input)) {
    accessLevel = "alliance";
  } else if (accessCodes.guest.includes(input) || tempCodes.includes(input)) {
    accessLevel = "guest";
  }

  if (accessLevel) {
    localStorage.setItem("accessLevel", accessLevel);
    sessionStorage.removeItem("tempCodes");
    window.location.href = "home.html";
  } else {
    document.getElementById("loginError").textContent = "Invalid access code.";
  }
}

// FORGOT PASSWORD WORKFLOW
function showForgotForm() {
  document.getElementById("forgotBox").classList.remove("hidden");
}

function submitForgot() {
  const alliance = document.getElementById("allianceName").value.trim();
  const username = document.getElementById("robloxUsername").value.trim();

  if (!alliance || !username) {
    alert("Please enter both your alliance name and Roblox username.");
    return;
  }

  const tempCode = "TEMP_" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const tempCodes = JSON.parse(sessionStorage.getItem("tempCodes") || "[]");
  tempCodes.push(tempCode);
  sessionStorage.setItem("tempCodes", JSON.stringify(tempCodes));

  document.getElementById("tempCodeMsg").innerText =
    `Your temporary code: ${tempCode}\nYou can now log in with it.`;

  // Send email via Formspree (replace with your Formspree endpoint)
  fetch("https://formspree.io/f/xldbnkby", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      _replyto: "temp@anc.network",
      subject: "Temporary Code Requested",
      message: `Alliance: ${alliance}\nRoblox Username: ${username}\nTemp Code: ${tempCode}`
    })
  }).catch(err => console.error("Formspree request failed:", err));
}

// PROTECTED PAGE ACCESS CHECK
function checkAccess(allowedLevels) {
  const level = localStorage.getItem("accessLevel");
  if (!allowedLevels.includes(level)) {
    window.location.href = "index.html";
  }
}

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("accessLevel");
  sessionStorage.removeItem("tempCodes");
  window.location.href = "index.html";
}
