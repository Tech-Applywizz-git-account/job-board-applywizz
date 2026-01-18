import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAdminLogin } from '../lib/adminService';
import toast, { Toaster } from 'react-hot-toast';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading('Logging in...');

        try {
            const result = await verifyAdminLogin(formData.email, formData.password);

            if (result.success) {
                // Store admin session
                localStorage.setItem('admin_session', JSON.stringify({
                    email: result.admin.email,
                    id: result.admin.id,
                    loginTime: new Date().toISOString()
                }));

                toast.success('Login successful!', { id: loadingToast });

                // Redirect to admin dashboard
                setTimeout(() => {
                    navigate('/admin');
                }, 500);
            } else {
                toast.error(result.error || 'Invalid credentials', { id: loadingToast });
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please try again.', { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
            <Toaster position="top-center" />

            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Applywizz Login</h1>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@company.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                                }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : (
                                'Login'
                            )}
                        </button>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => toast('Please contact your administrator to reset your password')}
                                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </form>

                    {/* Login Instructions */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Login Instructions:</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>Use the email and password provided by your administrator</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>Contact your system admin if you need credentials</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>Never share your password with anyone</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        © 2026 ApplyWizz. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
