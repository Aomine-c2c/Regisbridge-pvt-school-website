'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupWizardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolMotto: '', // Not in schema yet, but helpful for UI state
    schoolAddress: '',
    schoolPhone: '',
    schoolEmail: '',
    website: '',
    logoUrl: '',
    primaryColor: '#1e40af',
    secondaryColor: '#f59e0b',
    language: 'English (US)',
    academicYear: '2024-2025',
    currentTerm: 'Term 1',
    timezone: 'UTC',
    startStep: 1
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/admin/setup', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
           const d = json.data;
           setFormData(prev => ({
             ...prev,
             schoolName: d.schoolName || '',
             schoolAddress: d.schoolAddress || '',
             schoolPhone: d.schoolPhone || '',
             schoolEmail: d.schoolEmail || '',
             website: d.website || '',
             logoUrl: d.logoUrl || '',
             academicYear: d.academicYear || '2024-2025',
             currentTerm: d.currentTerm || 'Term 1',
             timezone: d.timezone || 'UTC',
           }));
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const json = await res.json();
      if (json.success) {
        alert('Settings saved successfully!');
        // Ideally navigate to next step or dashboard if complete
      } else {
        alert('Failed to save settings: ' + json.message);
      }
    } catch (err) {
      alert('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Setup...</div>;

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101522] text-slate-900 dark:text-white font-display min-h-screen flex flex-col overflow-hidden transition-colors duration-200">
      {/* Header */}
      <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#282c39] px-8 py-4 bg-white dark:bg-[#101522] z-20 transition-colors duration-200">
        <div className="flex items-center gap-4">
          <div className="size-8 rounded bg-[#1142d4]/20 flex items-center justify-center text-[#1142d4]">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <div>
            <h2 className="text-base font-bold leading-tight">System Initialization</h2>
            <p className="text-xs text-[#9da4b9]">{formData.schoolName || 'New School Setup'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-[#9da4b9] px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#1e222b] border border-slate-200 dark:border-[#282c39]">
            <span className="material-symbols-outlined text-sm">cloud_done</span>
            <span>Auto-saving enabled</span>
          </div>
          <button onClick={handleSave} disabled={saving} className="flex items-center justify-center rounded-lg h-9 px-4 bg-transparent border border-slate-200 dark:border-[#282c39] hover:bg-slate-100 dark:hover:bg-[#1e222b] text-slate-600 dark:text-white text-sm font-medium transition-colors">
            <span className="truncate">{saving ? 'Saving...' : 'Save Draft & Exit'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Stepper */}
        <aside className="hidden lg:flex w-80 flex-col border-r border-slate-200 dark:border-[#282c39] bg-white dark:bg-[#151923] overflow-y-auto transition-colors duration-200">
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-xl font-bold mb-1">Setup Wizard</h1>
              <p className="text-[#9da4b9] text-sm">Complete these 4 steps to launch your school portal.</p>
            </div>
            <nav className="flex flex-col gap-1 relative">
              {/* Step 1: Active */}
              <div className="group flex items-start gap-4 p-3 rounded-lg bg-[#1142d4]/10 border border-[#1142d4]/20 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1142d4] rounded-l-lg"></div>
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1142d4] text-white text-xs font-bold shadow-sm shadow-[#1142d4]/50">
                  1
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1142d4]">School Branding</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">Logo, Name, Typography</span>
                </div>
              </div>
              {/* Connector Line */}
              <div className="ml-[27px] w-px h-6 bg-slate-200 dark:bg-[#282c39]"></div>
              {/* Other Steps (Static for now) */}
              <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1e222b]/50 transition-colors cursor-pointer opacity-50">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500 text-xs font-medium bg-transparent">
                  2
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Campus Locations</span>
                </div>
              </div>
               <div className="ml-[27px] w-px h-6 bg-slate-200 dark:bg-[#282c39]"></div>
               <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1e222b]/50 transition-colors cursor-pointer opacity-50">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500 text-xs font-medium bg-transparent">
                  3
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Departments</span>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Form Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#101522] relative transition-colors duration-200">
          <div className="max-w-4xl mx-auto px-6 py-10 md:px-12 md:py-12 pb-32">
            {/* Page Title */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">School Branding</h2>
                  <p className="text-[#9da4b9] text-base">Configure the visual identity that will be displayed across the student and faculty portals.</p>
                </div>
                <div className="radial-progress text-[#1142d4] text-xs font-bold hidden md:flex items-center justify-center h-12 w-12 rounded-full border-4 border-slate-200 dark:border-[#1e222b] relative">
                  <span className="absolute inset-0 flex items-center justify-center">25%</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              {/* Section: School Name & Basic Info (NEW) */}
              <div className="bg-white dark:bg-[#1e222b] rounded-xl shadow-sm border border-slate-200 dark:border-[#282c39] overflow-hidden transition-colors duration-200">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-[#282c39] flex justify-between items-center bg-slate-50 dark:bg-[#1a1e26]">
                  <h3 className="text-base font-semibold">General Information</h3>
                </div>
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">School Name</label>
                    <input name="schoolName" value={formData.schoolName} onChange={handleChange} className="block w-full px-3 py-2.5 sm:text-sm rounded-lg border-slate-300 dark:border-[#282c39] bg-white dark:bg-[#101522] focus:ring-[#1142d4] focus:border-[#1142d4] text-slate-900 dark:text-white" placeholder="e.g. St. Mary's Academy" type="text" required />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">School Email</label>
                    <input name="schoolEmail" value={formData.schoolEmail} onChange={handleChange} className="block w-full px-3 py-2.5 sm:text-sm rounded-lg border-slate-300 dark:border-[#282c39] bg-white dark:bg-[#101522] focus:ring-[#1142d4] focus:border-[#1142d4] text-slate-900 dark:text-white" placeholder="admin@school.edu" type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">School Phone</label>
                    <input name="schoolPhone" value={formData.schoolPhone} onChange={handleChange} className="block w-full px-3 py-2.5 sm:text-sm rounded-lg border-slate-300 dark:border-[#282c39] bg-white dark:bg-[#101522] focus:ring-[#1142d4] focus:border-[#1142d4] text-slate-900 dark:text-white" placeholder="+1 (555) 000-0000" type="tel" />
                  </div>
                </div>
              </div>

              {/* Section: Logo Upload */}
              <div className="bg-white dark:bg-[#1e222b] rounded-xl shadow-sm border border-slate-200 dark:border-[#282c39] overflow-hidden transition-colors duration-200">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-[#282c39] flex justify-between items-center bg-slate-50 dark:bg-[#1a1e26]">
                  <h3 className="text-base font-semibold">Logos & Assets</h3>
                  <span className="material-symbols-outlined text-[#9da4b9] text-lg" title="Required for reports and header">info</span>
                </div>
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Primary Logo */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Primary Crest / Logo URL</label>
                    {/* Simplified for demo: Text Input for URL instead of Upload */}
                    <input name="logoUrl" value={formData.logoUrl} onChange={handleChange} className="block w-full px-3 py-2.5 sm:text-sm rounded-lg border-slate-300 dark:border-[#282c39] bg-white dark:bg-[#101522] focus:ring-[#1142d4] focus:border-[#1142d4] text-slate-900 dark:text-white" placeholder="https://example.com/logo.png" type="text" />
                    <p className="text-xs text-[#9da4b9] mt-1">Paste a public URL for the school logo.</p>
                  </div>
                  {/* Logo Preview */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Preview</label>
                    <div className="flex-1 rounded-lg bg-slate-100 dark:bg-[#101522] border border-slate-200 dark:border-[#282c39] p-4 flex items-center justify-center relative overflow-hidden h-32">
                      {formData.logoUrl ? (
                          <img src={formData.logoUrl} alt="Logo Preview" className="h-full object-contain" onError={(e: any) => (e.currentTarget.style.display = 'none')} />
                      ) : (
                          <span className="text-xs text-[#9da4b9] italic">No file selected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Color Palette */}
              <div className="bg-white dark:bg-[#1e222b] rounded-xl shadow-sm border border-slate-200 dark:border-[#282c39] overflow-hidden transition-colors duration-200">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-[#282c39] flex justify-between items-center bg-slate-50 dark:bg-[#1a1e26]">
                  <h3 className="text-base font-semibold">Theme Colors</h3>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Primary Color */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Primary Brand Color</label>
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-lg shadow-sm ring-1 ring-white/10" style={{ backgroundColor: formData.primaryColor }}></div>
                        <input name="primaryColor" value={formData.primaryColor} onChange={handleChange} className="block w-full px-3 py-2.5 sm:text-sm rounded-lg border-slate-300 dark:border-[#282c39] bg-white dark:bg-[#101522] font-mono uppercase" placeholder="#1E40AF" type="text" />
                      </div>
                    </div>
                    {/* Secondary Color */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Secondary Accent Color</label>
                       <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-lg shadow-sm ring-1 ring-white/10" style={{ backgroundColor: formData.secondaryColor }}></div>
                        <input name="secondaryColor" value={formData.secondaryColor} onChange={handleChange} className="block w-full px-3 py-2.5 sm:text-sm rounded-lg border-slate-300 dark:border-[#282c39] bg-white dark:bg-[#101522] font-mono uppercase" placeholder="#F59E0B" type="text" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Typography & Localization */}
               <div className="bg-white dark:bg-[#1e222b] rounded-xl shadow-sm border border-slate-200 dark:border-[#282c39] overflow-hidden transition-colors duration-200">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-[#282c39] flex justify-between items-center bg-slate-50 dark:bg-[#1a1e26]">
                  <h3 className="text-base font-semibold">Academic Settings</h3>
                </div>
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Academic Year</label>
                    <input name="academicYear" value={formData.academicYear} onChange={handleChange} className="block w-full px-3 py-2.5 sm:text-sm rounded-lg border-slate-300 dark:border-[#282c39] bg-white dark:bg-[#101522] focus:ring-[#1142d4] focus:border-[#1142d4] text-slate-900 dark:text-white" placeholder="2024-2025" type="text"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Term</label>
                    <select name="currentTerm" value={formData.currentTerm} onChange={handleChange} className="block w-full pl-3 pr-10 py-2.5 sm:text-sm rounded-lg border-slate-300 dark:border-[#282c39] bg-white dark:bg-[#101522] focus:ring-[#1142d4] focus:border-[#1142d4] text-slate-900 dark:text-white appearance-none">
                      <option>Term 1</option>
                      <option>Term 2</option>
                      <option>Term 3</option>
                      <option>Semester 1</option>
                      <option>Semester 2</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>

        {/* Footer Actions (Fixed at bottom) */}
        <footer className="flex-none bg-white dark:bg-[#1e222b] border-t border-slate-200 dark:border-[#282c39] px-8 py-4 z-20 transition-colors duration-200">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
            <button className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-[#282c39] text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              Back
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#9da4b9] hidden sm:inline-block">Unsaved changes</span>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-[#1142d4] hover:bg-[#0e34a5] text-white font-bold text-sm shadow-lg shadow-[#1142d4]/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                {saving ? 'Saving...' : 'Save & Continue'}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
