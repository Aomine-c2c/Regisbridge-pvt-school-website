'use client';

export default function FinancialHistory() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111318] dark:text-white h-screen flex overflow-hidden font-display">
      <aside className="w-72 bg-[#800000] text-white hidden md:flex flex-col shadow-2xl">
        <div className="h-20 flex items-center px-6 gap-3 border-b border-white/10">
          <div className="size-10 bg-white rounded-lg flex items-center justify-center text-[#800000]">
            <span className="material-symbols-outlined text-[28px]">account_balance_wallet</span>
          </div>
          <div>
            <h2 className="text-lg font-bold">Financial History</h2>
            <span className="text-xs opacity-70">Payment Records</span>
          </div>
        </div>
        <nav className="flex-1 py-6 px-4">
          <a href="/parent" className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 rounded-lg">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm">Back to Dashboard</span>
          </a>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-8">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Financial & Fee History</h1>
          <button className="px-4 py-2 bg-[#800000] text-white rounded-lg text-sm font-bold hover:bg-[#600000]">
            Download Statement
          </button>
        </header>

        <main className="flex-1 overflow-auto p-8 bg-[#f8f9fa] dark:bg-[#0b1120]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 mb-2">Total Fees (This Year)</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">$15,000</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 mb-2">Amount Paid</p>
                <p className="text-3xl font-black text-green-600">$15,000</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 mb-2">Outstanding Balance</p>
                <p className="text-3xl font-black text-gray-400">$0</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment History</h2>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="text-left p-4 font-bold text-gray-700 dark:text-gray-300">Date</th>
                    <th className="text-left p-4 font-bold text-gray-700 dark:text-gray-300">Description</th>
                    <th className="text-right p-4 font-bold text-gray-700 dark:text-gray-300">Amount</th>
                    <th className="text-center p-4 font-bold text-gray-700 dark:text-gray-300">Method</th>
                    <th className="text-center p-4 font-bold text-gray-700 dark:text-gray-300">Status</th>
                    <th className="text-center p-4 font-bold text-gray-700 dark:text-gray-300">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { date: 'Jan 15, 2026', desc: 'Term 2 Tuition', amount: 5000, method: 'Bank Transfer', status: 'Paid' },
                    { date: 'Sep 10, 2025', desc: 'Term 1 Tuition', amount: 5000, method: 'Credit Card', status: 'Paid' },
                    { date: 'Sep 10, 2025', desc: 'Boarding Fees (Annual)', amount: 3000, method: 'Credit Card', status: 'Paid' },
                    { date: 'Aug 20, 2025', desc: 'Registration Fee', amount: 500, method: 'Bank Transfer', status: 'Paid' },
                    { date: 'Aug 20, 2025', desc: 'Uniform & Books', amount: 1500, method: 'Credit Card', status: 'Paid' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{row.date}</td>
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">{row.desc}</td>
                      <td className="p-4 text-right font-bold text-gray-900 dark:text-white">
                        ${row.amount.toLocaleString()}
                      </td>
                      <td className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">{row.method}</td>
                      <td className="p-4 text-center">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 rounded-full text-xs font-bold">
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-[#800000] hover:underline text-sm font-bold">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-[#800000]/5 border border-[#800000]/10 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Account in Good Standing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All fees have been paid on time. Thank you for your continued support of Regisbridge Academy.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
