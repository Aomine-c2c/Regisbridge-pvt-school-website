// Native fetch in Node 18+

async function verifyEnrollment() {
  try {
    // 1. Login to get token
    const loginRes = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@regisbridge.edu', password: 'Admin123!' }),
    });
    
    if (!loginRes.ok) throw new Error('Login failed');
    const loginData = await loginRes.json();
    const token = loginData.accessToken;
    console.log('✅ Login successful');

    // 2. Enroll Student
    const studentData = {
      firstName: 'Test',
      lastName: 'Student',
      email: 'test.student@school.edu',
      dateOfBirth: '2008-01-01',
      grade: '10',
      className: '10A',
      parentName: 'Parent One',
      parentEmail: 'parent@test.com',
      parentPhone: '1234567890',
      parentRelationship: 'Parent'
    };

    const enrollRes = await fetch('http://localhost:3000/api/admin/students', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(studentData),
    });

    const enrollData = await enrollRes.json();

    if (enrollRes.ok) {
      console.log('✅ Student Enrollment Verified!');
      console.log('Student ID:', enrollData.data.id);
      console.log('Roll Number:', enrollData.data.rollNumber);
    } else {
      console.error('❌ Enrollment Failed');
      console.error(enrollData);
      // If email exists, that's okay for repeated runs
      if (enrollRes.status === 409) console.log('⚠️ Student already exists (Expected on retry)');
    }

    // 3. List Students
    const listRes = await fetch('http://localhost:3000/api/admin/students', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const listData = await listRes.json();
    if (listRes.ok) {
      console.log(`✅ List Verified! Found ${listData.data.data.length} students.`);
    } else {
      console.error('❌ List Failed');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verifyEnrollment();
