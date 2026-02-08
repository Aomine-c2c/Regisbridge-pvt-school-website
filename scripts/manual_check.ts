const login = async () => {
    try {
        console.log('1. Attempting login with admin@regisbridge.edu...');
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@regisbridge.edu',
                password: 'Admin123!'
            })
        });

        const data = await res.json();
        
        console.log('\n--- SERVER RESPONSE ---');
        console.log('Status:', res.status);
        if (data.user) {
            console.log('User Role (Raw from DB):', `"${data.user.role}"`);
            console.log('User ID:', data.user.id);
            
            // Simulate the client-side check manually
            const role = data.user.role;
            const normalized = role.toLowerCase().trim();
            const allowed = ['admin'];
            
            console.log('\n--- MANUAL LOGIC CHECK ---');
            console.log(`1. Server sent: "${role}"`);
            console.log(`2. Client normalizes to: "${normalized}"`);
            console.log(`3. Allowed list: ${JSON.stringify(allowed)}`);
            
            const match = allowed.some(a => a.toLowerCase() === normalized);
            console.log(`4. Match result: ${match ? 'ACCESS GRANTED' : 'ACCESS DENIED'}`);
        } else {
            console.log('No user returned:', data);
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

login();
