/* ==========================================================================
   SPYTELIGENT - APPLICATION LOGIC & INTERACTION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons on DOM Load
  initializeIcons();

  // 2. Setup User Dropdown Menu Listener
  setupUserDropdown();

  // 3. Start Simulated System Timers
  startUptimeCounter();
  startLocationTimer();
});

/**
 * Renders / refreshes all Lucide vector icons on the page
 */
function initializeIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Toggles visibility of the password input field in the login screen
 */
function togglePasswordVisibility() {
  const pwdInput = document.getElementById('password');
  const pwdIcon = document.getElementById('pwd-icon');

  if (!pwdInput || !pwdIcon) return;

  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    pwdIcon.setAttribute('data-lucide', 'eye-off');
  } else {
    pwdInput.type = 'password';
    pwdIcon.setAttribute('data-lucide', 'eye');
  }

  // Refresh icon DOM node
  initializeIcons();
}

/**
 * Handles the login process and switches view to the Dashboard
 */
function handleLogin() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginScreen = document.getElementById('login-screen');
  const dashboardScreen = document.getElementById('dashboard-screen');

  if (!usernameInput || !passwordInput) return;

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === '' || password === '') {
    alert('Please enter both your username and password.');
    return;
  }

  // Switch views: Hide Login, Show Profile Dashboard
  if (loginScreen && dashboardScreen) {
    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');

    // Update user display name in topbar and sidebar if email/user provided
    const userNames = document.querySelectorAll('.user-name, .profile-meta h4');
    userNames.forEach((el) => {
      el.textContent = username;
    });

    // Re-initialize icons for newly visible DOM elements
    initializeIcons();
  }
}

/**
 * Handles logging out and switching back to the Login Screen
 */
function handleLogout() {
  const loginScreen = document.getElementById('login-screen');
  const dashboardScreen = document.getElementById('dashboard-screen');

  if (loginScreen && dashboardScreen) {
    dashboardScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');

    // Close any open dropdown menus
    const userDropdown = document.getElementById('user-dropdown');
    if (userDropdown) {
      userDropdown.classList.add('hidden');
    }

    initializeIcons();
  }
}

/**
 * Configures the user avatar menu dropdown click listener
 */
function setupUserDropdown() {
  const menuTrigger = document.getElementById('user-menu-trigger');
  const dropdown = document.getElementById('user-dropdown');

  if (!menuTrigger || !dropdown) return;

  menuTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  // Close dropdown when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!menuTrigger.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
}

/**
 * Live Uptime Timer simulation (updates every second)
 */
function startUptimeCounter() {
  const uptimeEl = document.getElementById('uptime-display');
  if (!uptimeEl) return;

  let totalSeconds = (5 * 24 * 3600) + (12 * 3600); // 5 days, 12 hours starting base

  setInterval(() => {
    totalSeconds++;
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    uptimeEl.textContent = `${days} days, ${hours} hrs, ${minutes} mins`;
  }, 60000); // Update every minute
}

/**
 * Live Location timer simulation
 */
function startLocationTimer() {
  const locationTimeEl = document.getElementById('live-location-time');
  if (!locationTimeEl) return;

  let minutesAgo = 2;

  setInterval(() => {
    minutesAgo++;
    locationTimeEl.textContent = `${minutesAgo} minutes ago`;
  }, 60000);
}
