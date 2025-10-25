import React, { useState } from 'react';
import { CreditCard, Receipt, Calendar, Download, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';

export default function FinancialPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, this would authenticate with backend
    // Demo credentials: any email with password "password"
    if (loginData.email && loginData.password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use any email with password "password" for demo.');
    }
  };

  const feeStructure = {
    tuition: { amount: 8500, paid: 8500, due: '2025-01-31' },
    boarding: { amount: 4200, paid: 3500, due: '2025-01-31' },
    activities: { amount: 800, paid: 800, due: '2025-01-31' },
    transport: { amount: 600, paid: 400, due: '2025-01-31' },
  };

  const transactions = [
    { date: '2025-01-15', description: 'Tuition Fee - Term 2', amount: 4250, type: 'debit', status: 'completed' },
    { date: '2025-01-10', description: 'Boarding Fee - January', amount: 1750, type: 'debit', status: 'completed' },
    { date: '2025-01-05', description: 'Activities Fee', amount: 400, type: 'debit', status: 'completed' },
    { date: '2024-12-20', description: 'Transport Fee - December', amount: 300, type: 'debit', status: 'completed' },
    { date: '2024-12-15', description: 'Tuition Fee - Term 1', amount: 4250, type: 'debit', status: 'completed' },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', available: true },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', available: true },
    { id: 'mobile', name: 'Mobile Money', icon: '📱', available: true },
    { id: 'cash', name: 'Cash Payment', icon: '💵', available: false },
  ];

  const totalOwed = Object.values(feeStructure).reduce((sum, fee) => sum + (fee.amount - fee.paid), 0);
  const totalPaid = Object.values(feeStructure).reduce((sum, fee) => sum + fee.paid, 0);
  const totalAmount = Object.values(feeStructure).reduce((sum, fee) => sum + fee.amount, 0);

  if (!isLoggedIn) {
    return (
      <section id="financial" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#1C1A75] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#1C1A75]">Financial Portal</h2>
              <p className="text-gray-600 mt-2">Access your fee information and payments</p>
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Demo Credentials:</p>
                <p className="text-sm text-green-700">Email: any parent email address</p>
                <p className="text-sm text-green-700">Password: <strong>password</strong></p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Parent Email</label>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                  placeholder="parent@regisbridge.ac.zw"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1C1A75] text-white py-3 rounded-lg font-semibold hover:bg-[#D4AF37] transition-colors"
              >
                Access Portal
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Forgot password?
                <button className="text-[#1C1A75] hover:text-[#D4AF37] ml-1 font-semibold">
                  Reset here
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="financial" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#1C1A75]">Financial Portal</h2>
                <p className="text-gray-600">Student: John Doe • ID: STU2025001</p>
              </div>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <AlertCircle size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Paid</p>
                  <p className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</p>
                </div>
                <CheckCircle className="text-green-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Outstanding</p>
                  <p className="text-2xl font-bold text-red-600">${totalOwed.toLocaleString()}</p>
                </div>
                <AlertCircle className="text-red-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Next Due Date</p>
                  <p className="text-lg font-bold text-[#1C1A75]">Jan 31, 2025</p>
                </div>
                <Calendar className="text-[#1C1A75]" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Payment Status</p>
                  <p className="text-lg font-bold text-orange-600">Partial</p>
                </div>
                <CreditCard className="text-orange-600" size={32} />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="flex border-b">
              {[
                { id: 'overview', label: 'Fee Overview', icon: DollarSign },
                { id: 'payment', label: 'Make Payment', icon: CreditCard },
                { id: 'history', label: 'Transaction History', icon: Receipt },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#D4AF37] text-[#1C1A75]'
                      : 'border-transparent text-gray-600 hover:text-[#1C1A75]'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Fee Breakdown</h3>
                  <div className="space-y-4">
                    {Object.entries(feeStructure).map(([key, fee]) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-[#1C1A75] capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            fee.paid === fee.amount ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {fee.paid === fee.amount ? 'Paid' : 'Partial'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                          <span>Paid: ${fee.paid.toLocaleString()}</span>
                          <span>Total: ${fee.amount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#D4AF37] h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(fee.paid / fee.amount) * 100}%` }}
                          ></div>
                        </div>
                        {fee.amount - fee.paid > 0 && (
                          <p className="text-sm text-red-600 mt-2">
                            Outstanding: ${(fee.amount - fee.paid).toLocaleString()} • Due: {new Date(fee.due).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Make a Payment</h3>

                  {totalOwed > 0 ? (
                    <div className="space-y-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800 font-medium">Outstanding Balance: ${totalOwed.toLocaleString()}</p>
                        <p className="text-yellow-700 text-sm mt-1">Next payment due: January 31, 2025</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#1C1A75] mb-4">Payment Methods</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {paymentMethods.map((method) => (
                            <div
                              key={method.id}
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                method.available
                                  ? 'border-gray-200 hover:border-[#D4AF37] hover:shadow-md'
                                  : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{method.icon}</span>
                                <div>
                                  <h5 className="font-medium text-[#1C1A75]">{method.name}</h5>
                                  <p className="text-sm text-gray-600">
                                    {method.available ? 'Available' : 'Coming Soon'}
                                  </p>
                                </div>
                              </div>
                              {method.available && (
                                <button className="mt-3 w-full bg-[#1C1A75] text-white py-2 px-4 rounded-lg hover:bg-[#D4AF37] transition-colors text-sm">
                                  Pay Now
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="text-green-600 mx-auto mb-4" size={64} />
                      <h4 className="text-xl font-bold text-[#1C1A75] mb-2">All Fees Paid</h4>
                      <p className="text-gray-600">Your account is up to date. No outstanding payments required.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#1C1A75]">Transaction History</h3>
                    <button className="flex items-center space-x-2 bg-[#1C1A75] text-white px-4 py-2 rounded-lg hover:bg-[#D4AF37] transition-colors">
                      <Download size={16} />
                      <span>Download Statement</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {transactions.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'debit' ? 'bg-red-100' : 'bg-green-100'
                          }`}>
                            {transaction.type === 'debit' ? (
                              <Receipt className="text-red-600" size={20} />
                            ) : (
                              <CheckCircle className="text-green-600" size={20} />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-[#1C1A75]">{transaction.description}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(transaction.date).toLocaleDateString()} • {transaction.status}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'debit' ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {transaction.type === 'debit' ? '-' : '+'}${transaction.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}