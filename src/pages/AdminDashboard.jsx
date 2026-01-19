import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
    getPaymentSettings,
    updatePaymentSettings,
    getTransactions,
    getTransactionStats,
    getPricingSettings,
    updatePricingSettings,
    getAdminUsers,
    createAdminUser,
    deleteAdminUser,
    updateAdminPassword,
    PAYMENT_COMBINATIONS
} from '../lib/adminService';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [adminSession, setAdminSession] = useState(null);
    const [activeGateway, setActiveGateway] = useState({ method: 'paypal', account: 'dubai' });
    const [pricing, setPricing] = useState({ monthly: '45', threeMonth: '119.99', sixMonth: '224' });
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState(null);
    const [filters, setFilters] = useState({
        status: 'all',
        method: 'all',
        account: 'all',
        search: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSwitching, setIsSwitching] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [adminUsers, setAdminUsers] = useState([]);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [showNewAdminPassword, setShowNewAdminPassword] = useState(false);
    const [updatePasswordModal, setUpdatePasswordModal] = useState(null); // { adminId, email }
    const [newPassword, setNewPassword] = useState('');
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(null); // { adminId, email }

    // Check authentication on mount
    useEffect(() => {
        const session = localStorage.getItem('admin_session');
        if (!session) {
            toast.error('Please login to access admin dashboard');
            navigate('/admin-login');
            return;
        }

        try {
            const adminData = JSON.parse(session);
            setAdminSession(adminData);
        } catch (error) {
            console.error('Invalid session:', error);
            localStorage.removeItem('admin_session');
            navigate('/admin-login');
        }
    }, [navigate]);

    useEffect(() => {
        if (adminSession) {
            loadDashboardData();
        }
    }, [adminSession]);

    useEffect(() => {
        loadTransactions();
    }, [filters]);

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            const [settings, statsData, pricingData] = await Promise.all([
                getPaymentSettings(),
                getTransactionStats(),
                getPricingSettings()
            ]);
            setActiveGateway(settings);
            setStats(statsData);
            setPricing(pricingData);
            await loadTransactions();
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadTransactions = async () => {
        try {
            const data = await getTransactions(filters);
            setTransactions(data);
        } catch (error) {
            console.error('Error loading transactions:', error);
        }
    };

    const handleGatewaySwitch = async (method, account) => {
        // Show confirmation dialog
        setConfirmDialog({
            method,
            account,
            message: `Are you sure you want to switch the payment gateway to ${method.toUpperCase()} ${account.toUpperCase()}?`
        });
    };

    const confirmGatewaySwitch = async () => {
        if (!confirmDialog) return;

        const { method, account } = confirmDialog;
        setConfirmDialog(null);
        setIsSwitching(true);

        const loadingToast = toast.loading('Switching payment gateway...');

        try {
            await updatePaymentSettings(method, account);
            setActiveGateway({ method, account });
            toast.success(`Payment gateway switched to ${method.toUpperCase()} ${account.toUpperCase()} successfully!`, {
                id: loadingToast,
                duration: 4000,
            });
        } catch (error) {
            console.error('Error switching gateway:', error);
            toast.error('Failed to switch payment gateway. Please try again.', {
                id: loadingToast,
                duration: 4000,
            });
        } finally {
            setIsSwitching(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const getStatusBadge = (status) => {
        const styles = {
            success: 'bg-green-100 text-green-700',
            failed: 'bg-red-100 text-red-700',
            pending: 'bg-yellow-100 text-yellow-700'
        };
        return styles[status] || 'bg-gray-100 text-gray-700';
    };

    const handlePricingUpdate = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading('Updating pricing...');
        try {
            await updatePricingSettings(pricing);
            toast.success('Pricing updated successfully!', { id: loadingToast });
        } catch (error) {
            console.error('Error updating pricing:', error);
            toast.error('Failed to update pricing', { id: loadingToast });
        }
    };

    const loadAdminUsers = async () => {
        try {
            const users = await getAdminUsers();
            setAdminUsers(users);
        } catch (error) {
            console.error('Error loading admin users:', error);
            toast.error('Failed to load admin users');
        }
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        if (!newAdminEmail || !newAdminPassword) {
            toast.error('Email and password are required');
            return;
        }

        const loadingToast = toast.loading('Creating admin user...');
        try {
            await createAdminUser(newAdminEmail, newAdminPassword);
            toast.success('Admin user created successfully!', { id: loadingToast });
            setNewAdminEmail('');
            setNewAdminPassword('');
            await loadAdminUsers();
        } catch (error) {
            console.error('Error creating admin:', error);
            toast.error(error.message || 'Failed to create admin user', { id: loadingToast });
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        const loadingToast = toast.loading('Deleting admin user...');
        try {
            await deleteAdminUser(adminId);
            toast.success('Admin user deleted successfully!', { id: loadingToast });
            setDeleteConfirmModal(null);
            await loadAdminUsers();
        } catch (error) {
            console.error('Error deleting admin:', error);
            toast.error('Failed to delete admin user', { id: loadingToast });
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!newPassword || newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        const loadingToast = toast.loading('Updating password...');
        try {
            await updateAdminPassword(updatePasswordModal.adminId, newPassword);
            toast.success('Password updated successfully!', { id: loadingToast });
            setUpdatePasswordModal(null);
            setNewPassword('');
            setShowUpdatePassword(false);
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error('Failed to update password', { id: loadingToast });
        }
    };

    useEffect(() => {
        if (activeTab === 'admins') {
            loadAdminUsers();
        }
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('admin_session');
        toast.success('Logged out successfully');
        navigate('/admin-login');
    };

    if (isLoading) {
        return (
            <div className="flex h-screen bg-gray-50">
                <div className="m-auto text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                    <p className="text-gray-600">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Toaster position="top-right" />
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-bold">ApplyWizz</h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-800'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-medium">Overview</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'transactions' ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-800'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="font-medium">Transactions</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-800'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">Settings</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('admins')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'admins' ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-800'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="font-medium">Admin Users</span>
                    </button>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                                {adminSession?.email?.charAt(0).toUpperCase() || 'A'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Admin</p>
                            <p className="text-xs text-gray-400 truncate">{adminSession?.email || 'Administrator'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 max-w-lg">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8">
                    {activeTab === 'overview' && (
                        <>
                            {/* Payment Gateway Tabs */}
                            <div className="flex space-x-4 mb-6">
                                <button className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    PayPal
                                </button>
                                <button className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Stripe
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-gray-600">Total Transactions</h3>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-gray-900">{stats?.total || 0}</p>
                                            <p className="text-sm text-green-600 mt-1">↑ 15.2%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-gray-600">Successful</h3>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-gray-900">{stats?.success || 0}</p>
                                            <p className="text-sm text-green-600 mt-1">↑ 7.2%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-gray-600">Failed</h3>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-gray-900">{stats?.failed || 0}</p>
                                            <p className="text-sm text-red-600 mt-1">↑ 8.2%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-gray-900">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
                                            <p className="text-sm text-green-600 mt-1">↑ 9.7%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Gateway Switcher */}
                            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Gateway Settings</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {PAYMENT_COMBINATIONS.map((combo) => {
                                        const isActive = activeGateway.method === combo.method && activeGateway.account === combo.account;
                                        return (
                                            <button
                                                key={`${combo.method}-${combo.account}`}
                                                onClick={() => handleGatewaySwitch(combo.method, combo.account)}
                                                disabled={isSwitching || isActive}
                                                className={`relative p-4 rounded-lg border-2 transition-all ${isActive
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 bg-white hover:border-gray-400'
                                                    } ${isSwitching ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                {isActive && (
                                                    <div className="absolute top-2 right-2">
                                                        <span className="flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="text-center">
                                                    <div className="text-2xl mb-2">{combo.method === 'paypal' ? '💳' : '💎'}</div>
                                                    <p className="font-semibold text-sm text-gray-900">{combo.label}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {isActive ? 'Active' : 'Inactive'}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'transactions' && (
                        <>
                            {/* Filters */}
                            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                        <select
                                            value={filters.status}
                                            onChange={(e) => handleFilterChange('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="success">Success</option>
                                            <option value="failed">Failed</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                        <select
                                            value={filters.method}
                                            onChange={(e) => handleFilterChange('method', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        >
                                            <option value="all">All Methods</option>
                                            <option value="paypal">PayPal</option>
                                            <option value="stripe">Stripe</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Account</label>
                                        <select
                                            value={filters.account}
                                            onChange={(e) => handleFilterChange('account', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        >
                                            <option value="all">All Accounts</option>
                                            <option value="dubai">Dubai</option>
                                            <option value="india">India</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                        <input
                                            type="text"
                                            value={filters.search}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                            placeholder="JB-ID, Email, Name..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Transactions Table */}
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JB-ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {transactions.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                                        No transactions found
                                                    </td>
                                                </tr>
                                            ) : (
                                                transactions.map((transaction) => (
                                                    <tr
                                                        key={transaction.id}
                                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                                        onClick={() => setSelectedTransaction(transaction)}
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="font-mono font-semibold text-gray-900">
                                                                {transaction.jb_id}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <p className="font-medium text-gray-900">{transaction.full_name}</p>
                                                                <p className="text-sm text-gray-500">{transaction.email}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap capitalize text-gray-900">
                                                            {transaction.plan_id.replace('-', ' ')}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                                                            ${transaction.amount}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <p className="font-medium capitalize text-gray-900">
                                                                    {transaction.payment_method || 'N/A'}
                                                                </p>
                                                                <p className="text-sm text-gray-500 capitalize">
                                                                    {transaction.payment_account || 'N/A'}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(transaction.payment_status)}`}>
                                                                {transaction.payment_status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(transaction.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedTransaction(transaction);
                                                                }}
                                                                className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                                                            >
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Pricing Settings</h2>
                                <form onSubmit={handlePricingUpdate}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Price ($)</label>
                                            <input
                                                type="text"
                                                value={pricing.monthly}
                                                onChange={(e) => setPricing({ ...pricing, monthly: e.target.value })}
                                                placeholder="e.g. 45"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">3 Months Price ($)</label>
                                            <input
                                                type="text"
                                                value={pricing.threeMonth}
                                                onChange={(e) => setPricing({ ...pricing, threeMonth: e.target.value })}
                                                placeholder="e.g. 119.99"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">6 Months Price ($)</label>
                                            <input
                                                type="text"
                                                value={pricing.sixMonth}
                                                onChange={(e) => setPricing({ ...pricing, sixMonth: e.target.value })}
                                                placeholder="e.g. 224"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Update Pricing
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'admins' && (
                        <div className="space-y-6">
                            {/* Create New Admin */}
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Create New Admin</h2>
                                <form onSubmit={handleCreateAdmin} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={newAdminEmail}
                                                onChange={(e) => setNewAdminEmail(e.target.value)}
                                                placeholder="admin@example.com"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showNewAdminPassword ? "text" : "password"}
                                                    value={newAdminPassword}
                                                    onChange={(e) => setNewAdminPassword(e.target.value)}
                                                    placeholder="Strong password"
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewAdminPassword(!showNewAdminPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showNewAdminPassword ? (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Create Admin
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Admin Users List */}
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">Admin Users</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {adminUsers.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                        No admin users found
                                                    </td>
                                                </tr>
                                            ) : (
                                                adminUsers.map((admin) => (
                                                    <tr key={admin.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="font-medium text-gray-900">{admin.email}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(admin.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {admin.last_login ? new Date(admin.last_login).toLocaleDateString() : 'Never'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${admin.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                {admin.is_active ? 'Active' : 'Inactive'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center space-x-3">
                                                                <button
                                                                    onClick={() => setUpdatePasswordModal({ adminId: admin.id, email: admin.email })}
                                                                    className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                                                                >
                                                                    Update Password
                                                                </button>
                                                                <button
                                                                    onClick={() => setDeleteConfirmModal({ adminId: admin.id, email: admin.email })}
                                                                    className="text-red-600 hover:text-red-900 font-medium text-sm"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Transaction Detail Modal */}
            {selectedTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl">
                        <button
                            onClick={() => setSelectedTransaction(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
                            <p className="text-gray-600 mt-1">
                                ID: <span className="text-gray-900 font-mono font-semibold">{selectedTransaction.jb_id}</span>
                            </p>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Customer Information</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="text-gray-900 font-medium">{selectedTransaction.full_name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="text-gray-900 font-medium">{selectedTransaction.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Phone:</span>
                                        <span className="text-gray-900 font-medium">
                                            {selectedTransaction.country_code} {selectedTransaction.mobile_number}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Payment Information</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Plan:</span>
                                        <span className="text-gray-900 font-medium capitalize">
                                            {selectedTransaction.plan_id.replace('-', ' ')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Amount:</span>
                                        <span className="text-gray-900 font-bold">${selectedTransaction.amount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`font-medium capitalize ${selectedTransaction.payment_status === 'success' ? 'text-green-600' :
                                            selectedTransaction.payment_status === 'failed' ? 'text-red-600' :
                                                'text-yellow-600'
                                            }`}>
                                            {selectedTransaction.payment_status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            {confirmDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-yellow-100 rounded-full mb-4">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Confirm Gateway Switch</h3>
                        <p className="text-gray-600 text-center mb-6">{confirmDialog.message}</p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setConfirmDialog(null)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmGatewaySwitch}
                                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Password Modal */}
            {updatePasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Update Password</h3>
                            <button
                                onClick={() => {
                                    setUpdatePasswordModal(null);
                                    setNewPassword('');
                                    setShowUpdatePassword(false);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Update password for: <span className="font-medium text-gray-900">{updatePasswordModal.email}</span>
                        </p>
                        <form onSubmit={handleUpdatePassword}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showUpdatePassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowUpdatePassword(!showUpdatePassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showUpdatePassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUpdatePasswordModal(null);
                                        setNewPassword('');
                                        setShowUpdatePassword(false);
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Admin User</h3>
                        <p className="text-gray-600 text-center mb-6">
                            Are you sure you want to delete <span className="font-medium text-gray-900">{deleteConfirmModal.email}</span>? This action cannot be undone.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setDeleteConfirmModal(null)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteAdmin(deleteConfirmModal.adminId)}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;


