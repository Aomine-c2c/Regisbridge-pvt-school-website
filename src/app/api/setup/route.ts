import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/password';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            schoolName,
            logoUrl,
            primaryColor,
            secondaryColor,
            faviconUrl,
            adminFirstName,
            adminLastName,
            adminEmail,
            adminPassword
        } = body;

        // Check if setup is already completed
        let settings = await prisma.systemSettings.findFirst();
        
        if (settings?.setupCompleted) {
            return NextResponse.json(
                { error: 'Setup has already been completed.' },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!schoolName || !adminEmail || !adminPassword || !adminFirstName || !adminLastName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Hash the admin password
        const hashedPassword = await hashPassword(adminPassword);

        // Run as a transaction: Create/Update SystemSettings and create SUPERUSER
        await prisma.$transaction(async (tx: any) => {
            if (settings) {
                await tx.systemSettings.update({
                    where: { id: settings.id },
                    data: {
                        schoolName,
                        logoUrl: logoUrl || undefined,
                        primaryColor: primaryColor || '#0f172a',
                        secondaryColor: secondaryColor || '#3b82f6',
                        faviconUrl: faviconUrl || undefined,
                        setupCompleted: true,
                    }
                });
            } else {
                await tx.systemSettings.create({
                    data: {
                        schoolName,
                        logoUrl: logoUrl || undefined,
                        primaryColor: primaryColor || '#0f172a',
                        secondaryColor: secondaryColor || '#3b82f6',
                        faviconUrl: faviconUrl || undefined,
                        setupCompleted: true,
                    }
                });
            }

            // Create SUPERUSER account
            await tx.user.create({
                data: {
                    firstName: adminFirstName,
                    lastName: adminLastName,
                    email: adminEmail,
                    password: hashedPassword,
                    role: 'SUPERUSER',
                    status: 'ACTIVE',
                    emailVerified: new Date(), // Pre-verify the superuser
                }
            });
        });

        return NextResponse.json(
            { message: 'Setup completed successfully.' },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Setup API Error:', error);
        return NextResponse.json(
            { error: 'An error occurred during setup.', details: error.message },
            { status: 500 }
        );
    }
}
