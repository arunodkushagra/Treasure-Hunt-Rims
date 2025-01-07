// Define pathways and codes
const paths = {
    1: [1, 4, 6, 3, 7],
    2: [1, 5, 3, 6, 8],
    3: [1, 3, 7, 4, 5],
    4: [1, 6, 2, 8, 4],
    5: [1, 2, 5, 6, 7],
    6: [1, 3, 6, 7, 8],
    7: [1, 4, 3, 5, 6],
    8: [1, 7, 2, 4, 8],
    9: [1, 5, 6, 7, 3],
    10: [1, 6, 3, 2, 5],
    11: [1, 2, 4, 7, 6],
    12: [1, 3, 5, 8, 4],
    13: [1, 4, 7, 5, 6],
    14: [1, 5, 2, 6, 8],
    15: [1, 7, 6, 3, 5],
    16: [1, 6, 5, 4, 7]
  };
  
  let currentPath = [];
  let currentTeam = null;
  let uniqueCode = '';
  let isSequenceComplete = false;
  
  // Select Team
  function selectTeam(team) {
    currentTeam = team;
    currentPath = [];
    isSequenceComplete = false;
    document.querySelectorAll('.team-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`team-${team}`).classList.add('selected');
    document.getElementById('selected-team').innerText = `Selected Team: ${team}`;
    document.getElementById('next-location').innerText = '';
    document.getElementById('verification-section').style.display = 'none';
    document.getElementById('qr-section').style.display = 'none';
    document.getElementById('final-reveal').innerText = '';
  }
  
  // Location Validation
  function getNextLocation() {
    const loc = parseInt(document.getElementById('location-input').value);
    const path = paths[currentTeam];
    const index = currentPath.length;
  
    if (loc !== path[index]) {
      alert('Incorrect location!');
      return;
    }
  
    currentPath.push(loc);
  
    if (currentPath.length === path.length) {
      isSequenceComplete = true;
      document.getElementById('next-location').innerText = 'Enter 5-digit code to proceed.';
      document.getElementById('verification-section').style.display = 'block';
    } else {
      document.getElementById('next-location').innerText = `Next location: ${path[index + 1]}`;
    }
  }
  
  // Verify 5-digit Code
  function verifyCode() {
    const code = document.getElementById('verification-code').value;
    const correctCode = paths[currentTeam].join('');
  
    if (code === correctCode && isSequenceComplete) {
      document.getElementById('qr-section').style.display = 'block';
      generateQRCode();
    } else {
      alert('Incorrect code!');
    }
  }
  
  // Generate QR
  function generateQRCode() {
    uniqueCode = 'GH' + Math.floor(1000 + Math.random() * 9000) + '#';
    new QRCode(document.getElementById('qrcode'), uniqueCode);
  }
  
  // Final Verification
  function verifyQRCode() {
    const enteredCode = document.getElementById('unique-code').value;
    if (enteredCode === uniqueCode) {
      document.getElementById('final-reveal').innerText = 'Final Location: 9';
    } else {
      alert('Incorrect QR code!');
    }
  }
  