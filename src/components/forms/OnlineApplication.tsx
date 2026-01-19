import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, User } from 'lucide-react';

export default function OnlineApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    address: '',
    phone: '',
    email: '',

    // Parent/Guardian Information
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',

    // Academic Information
    currentSchool: '',
    gradeApplying: '',
    previousResults: '',

    // Documents
    birthCertificate: null,
    schoolReports: null,
    medicalReport: null,
    passportPhoto: null,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    birthCertificate: null,
    schoolReports: null,
    medicalReport: null,
    passportPhoto: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Parent Info', icon: User },
    { id: 3, title: 'Academic Info', icon: FileText },
    { id: 4, title: 'Documents', icon: Upload },
    { id: 5, title: 'Review', icon: CheckCircle },
  ];

  const handleFileUpload = (field: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSubmitSuccess(true);
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Gender *</label>
                <select
                  required
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nationality *</label>
                <input
                  type="text"
                  required
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Home Address *</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Parent/Guardian Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => handleInputChange('parentName', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  value={formData.parentOccupation}
                  onChange={(e) => handleInputChange('parentOccupation', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Academic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Current School *</label>
                <input
                  type="text"
                  required
                  value={formData.currentSchool}
                  onChange={(e) => handleInputChange('currentSchool', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Grade Applying For *</label>
                <select
                  required
                  value={formData.gradeApplying}
                  onChange={(e) => handleInputChange('gradeApplying', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                >
                  <option value="">Select Grade</option>
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                  <option value="3">Grade 3</option>
                  <option value="4">Grade 4</option>
                  <option value="5">Grade 5</option>
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="form1">Form 1</option>
                  <option value="form2">Form 2</option>
                  <option value="form3">Form 3</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Previous Academic Results</label>
                <textarea
                  value={formData.previousResults}
                  onChange={(e) => handleInputChange('previousResults', e.target.value)}
                  rows={4}
                  placeholder="Please provide details of your previous academic performance..."
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Required Documents</h3>
            <div className="space-y-4">
              {[
                { key: 'birthCertificate', label: 'Birth Certificate', required: true },
                { key: 'schoolReports', label: 'School Reports (Last 2 years)', required: true },
                { key: 'medicalReport', label: 'Medical Report', required: false },
                { key: 'passportPhoto', label: 'Passport Size Photo', required: true },
              ].map((doc) => (
                <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-[#1C1A75]">{doc.label}</h4>
                      <p className="text-sm text-gray-600">
                        {doc.required ? 'Required' : 'Optional'} • PDF, JPG, PNG (Max 5MB)
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {uploadedFiles[doc.key] ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle size={20} className="mr-2" />
                          <span className="text-sm">Uploaded</span>
                        </div>
                      ) : (
                        <label className="cursor-pointer bg-[#1C1A75] text-white px-4 py-2 rounded-lg hover:bg-[#D4AF37] transition-colors">
                          <Upload size={16} className="inline mr-2" />
                          Upload
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(doc.key, file);
                            }}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  {uploadedFiles[doc.key] && (
                    <p className="text-sm text-gray-600 mt-2">
                      File: {uploadedFiles[doc.key].name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Review Your Application</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h4 className="font-semibold text-[#1C1A75] mb-2">Personal Information</h4>
                <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
                <p className="text-sm text-gray-600">DOB: {formData.dateOfBirth}</p>
                <p className="text-sm text-gray-600">Email: {formData.email}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#1C1A75] mb-2">Academic Information</h4>
                <p className="text-sm text-gray-600">Applying for: Grade {formData.gradeApplying}</p>
                <p className="text-sm text-gray-600">Current School: {formData.currentSchool}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#1C1A75] mb-2">Documents Status</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(uploadedFiles).map(([key, file]) => (
                    <div key={key} className="flex items-center">
                      {file ? (
                        <CheckCircle size={16} className="text-green-600 mr-2" />
                      ) : (
                        <AlertCircle size={16} className="text-red-600 mr-2" />
                      )}
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                By submitting this application, you agree to our terms and conditions.
                Application processing may take 2-4 weeks.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <section id="application" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#1C1A75] mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in Regisbridge Private School.
              Your application has been successfully submitted and will be reviewed by our admissions team.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-[#1C1A75] mb-4">What happens next?</h3>
              <div className="text-left space-y-2 text-sm text-gray-600">
                <p>• Application review: 2-4 weeks</p>
                <p>• Assessment scheduling: Within 1 week of approval</p>
                <p>• Interview and testing: 1-2 weeks after assessment</p>
                <p>• Final decision: Within 1 week of interview</p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-[#1C1A75] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="application" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif font-bold text-[#1C1A75] mb-4">
              Online Application
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join the Regisbridge community. Complete your application online and take the first step towards an exceptional education.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.id <= currentStep ? 'bg-[#D4AF37] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <step.icon size={18} />
                  </div>
                  <span className={`ml-2 text-sm font-semibold ${
                    step.id <= currentStep ? 'text-[#1C1A75]' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      step.id < currentStep ? 'bg-[#D4AF37]' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#1C1A75] text-white rounded-lg font-semibold hover:bg-[#D4AF37] transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} className="mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}