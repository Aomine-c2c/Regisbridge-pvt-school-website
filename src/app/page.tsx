export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="max-w-5xl w-full">
                <div className="flex flex-col items-center gap-8">
                    <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                        Regisbridge School Management System
                    </h1>

                    <p className="text-xl text-center text-gray-600 dark:text-gray-400 max-w-2xl">
                        A comprehensive school management platform built with Next.js 15, TypeScript, and Prisma.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
                        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-2">🎓 Student Portal</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Track assignments, grades, and attendance
                            </p>
                        </div>

                        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-2">👨‍🏫 Teacher Portal</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Grade management and attendance tracking
                            </p>
                        </div>

                        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-2">👪 Parent Portal</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Monitor progress and pay fees
                            </p>
                        </div>

                        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-2">⚙️ Admin Dashboard</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Complete school management interface
                            </p>
                        </div>

                        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-2">📊 Analytics</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Real-time statistics and insights
                            </p>
                        </div>

                        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-2">🔐 Authentication</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                JWT-based secure authentication
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex gap-4">
                        <a
                            href="/login"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </a>
                        <a
                            href="/register"
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Register
                        </a>
                        <a
                            href="/admin"
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Admin Dashboard
                        </a>
                    </div>

                    <div className="mt-8 flex gap-4 text-sm text-gray-500">
                        <a href="https://github.com" className="hover:text-gray-700 dark:hover:text-gray-300">GitHub</a>
                        <span>•</span>
                        <a href="/docs" className="hover:text-gray-700 dark:hover:text-gray-300">Documentation</a>
                        <span>•</span>
                        <a href="/api" className="hover:text-gray-700 dark:hover:text-gray-300">API</a>
                    </div>

                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            ⚠️ <strong>Note:</strong> This project is at 62% completion. Database not yet provisioned.
                            See <a href="#" className="underline">POSTGRES_SETUP.md</a> to get started.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
