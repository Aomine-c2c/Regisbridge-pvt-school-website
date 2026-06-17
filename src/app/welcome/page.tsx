'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SetupWizardPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        schoolName: '',
        primaryColor: '#0f172a',
        secondaryColor: '#3b82f6',
        adminFirstName: '',
        adminLastName: '',
        adminEmail: '',
        adminPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const nextStep = () => {
        setError('');
        if (step === 1 && !formData.schoolName) {
            setError('School Name is required');
            return;
        }
        setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!formData.adminEmail || !formData.adminPassword || !formData.adminFirstName || !formData.adminLastName) {
            setError('All admin fields are required');
            return;
        }

        try {
            setLoading(true);
            const res = await fetch('/api/setup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to setup');
            }

            // Redirect to login page upon success
            router.push('/login?setup=success');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                        System Setup
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {step === 1 && "Let's start with your school's identity"}
                        {step === 2 && "Choose your primary brand colors"}
                        {step === 3 && "Create the master administrator account"}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
                                    School Name
                                </label>
                                <input
                                    id="schoolName"
                                    name="schoolName"
                                    type="text"
                                    required
                                    value={formData.schoolName}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                                    placeholder="Regisbridge Academy"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Branding */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                                    Primary Color
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        id="primaryColor"
                                        name="primaryColor"
                                        type="color"
                                        value={formData.primaryColor}
                                        onChange={handleChange}
                                        className="h-10 w-10 border-0 p-0 rounded cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-500 font-mono uppercase">{formData.primaryColor}</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                                    Secondary Color
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        id="secondaryColor"
                                        name="secondaryColor"
                                        type="color"
                                        value={formData.secondaryColor}
                                        onChange={handleChange}
                                        className="h-10 w-10 border-0 p-0 rounded cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-500 font-mono uppercase">{formData.secondaryColor}</span>
                                </div>
                            </div>
                            
                            {/* Preview box */}
                            <div className="mt-4 p-4 rounded-lg shadow-sm" style={{ backgroundColor: formData.primaryColor }}>
                                <div className="text-white font-semibold text-center mb-2">Color Preview</div>
                                <div className="w-full h-8 rounded" style={{ backgroundColor: formData.secondaryColor }}></div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Admin Account */}
                    {step === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="adminFirstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        id="adminFirstName"
                                        name="adminFirstName"
                                        type="text"
                                        required
                                        value={formData.adminFirstName}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="adminLastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        id="adminLastName"
                                        name="adminLastName"
                                        type="text"
                                        required
                                        value={formData.adminLastName}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">Email address</label>
                                <input
                                    id="adminEmail"
                                    name="adminEmail"
                                    type="email"
                                    required
                                    value={formData.adminEmail}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    id="adminPassword"
                                    name="adminPassword"
                                    type="password"
                                    required
                                    value={formData.adminPassword}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Back
                            </button>
                        ) : (
                            <div></div>
                        )}
                        
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Complete Setup'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
