import React from 'react';
import { User, Bell, Shield, LogOut, RefreshCw } from 'lucide-react';
import Card from '../UI/Card';

const SettingsView: React.FC = () => {
    
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>

      {/* Profile Section */}
      <Card title="Profile Information">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img 
              src="https://picsum.photos/150/150" 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-700 shadow-lg"
            />
            <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700 transition-colors">
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">Full Name</label>
              <input 
                type="text" 
                value="Alex Morgan" 
                readOnly
                className="w-full bg-transparent border-b border-gray-200 dark:border-slate-700 py-1 text-gray-800 dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">Email</label>
              <input 
                type="email" 
                value="alex.morgan@university.edu" 
                readOnly
                className="w-full bg-transparent border-b border-gray-200 dark:border-slate-700 py-1 text-gray-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Notifications">
            <div className="space-y-4">
                {['Email Notifications', 'Push Notifications', 'Weekly Report', 'Assignment Reminders'].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={i < 3} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                ))}
            </div>
        </Card>

        <Card title="Data Management">
             <div className="space-y-4">
                 <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20">
                    <div className="flex items-center gap-3 text-amber-800 dark:text-amber-500 mb-2">
                        <Shield size={20} />
                        <h4 className="font-semibold">Privacy Mode</h4>
                    </div>
                    <p className="text-sm text-amber-700/80 dark:text-amber-400">Your data is stored locally in your browser.</p>
                 </div>
                 
                 <button 
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 p-3 text-red-600 border border-red-200 dark:border-red-900/30 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                 >
                     <Trash size={18} className="lucide lucide-trash" /> {/* using Trash icon but naming it simpler above in import if needed, assuming generic trash icon available */}
                     Reset All Data
                 </button>
             </div>
        </Card>
      </div>

        <div className="flex justify-center pt-6">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <LogOut size={18} />
                <span>Sign Out</span>
            </button>
        </div>
    </div>
  );
};

// Small helper for Trash icon since I didn't import it in Settings specifically
const Trash = ({ size, className }: {size: number, className?: string}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
);

export default SettingsView;