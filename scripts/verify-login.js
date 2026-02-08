// using native fetch

async function verifyLogin() {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@regisbridge.edu',
        password: 'Admin123!',
      }),
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ Login Verified Successfully!');
      console.log('User:', data.user.email);
      console.log('Role:', data.user.role);
    } else {
      console.error('❌ Login Failed');
      console.error('Status:', response.status);
      console.error('Response:', data);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Network Error:', error.message);
    process.exit(1);
  }
}

verifyLogin();
