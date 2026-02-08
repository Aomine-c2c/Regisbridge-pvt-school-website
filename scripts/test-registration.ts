import { generateRegistrationNumber } from '../src/lib/utils/registration.ts'

async function main() {
    console.log('Testing Registration Number Generation...')
    
    // Test for Teacher
    const teacherId = await generateRegistrationNumber('teacher')
    console.log(`Teacher ID (Expected RT${new Date().getFullYear().toString().slice(-2)}XXX):`, teacherId)

    // Test for Student
    const studentId = await generateRegistrationNumber('student')
    console.log(`Student ID (Expected RS${new Date().getFullYear().toString().slice(-2)}XXX):`, studentId)

     // Test for Parent
     const parentId = await generateRegistrationNumber('parent')
     console.log(`Parent ID (Expected RP${new Date().getFullYear().toString().slice(-2)}XXX):`, parentId)

     // Test for Admin
     const adminId = await generateRegistrationNumber('admin')
     console.log(`Admin ID (Expected RA${new Date().getFullYear().toString().slice(-2)}XXX):`, adminId)
}

main()
.catch(console.error)
// We don't disconnect prisma here because the utility creates its own instance. 
// In a real app we would share the instance. 
// For this script it might hang if not handled, but let's see.
