import React, { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, BarChart2, BookOpen, CheckSquare, List, Settings, Menu, X, Sun, Moon } from 'lucide-react';
import { View } from './types';
import DashboardView from './components/Views/DashboardView';
import ProgressView from './components/Views/ProgressView';
import AnalyticsView from './components/Views/AnalyticsView';
import AssignmentsView from './components/Views/AssignmentsView';
import HomeTasksView from './components/Views/HomeTasksView';
import SyllabusView from './components/Views/SyllabusView';
import SettingsView from './components/Views/SettingsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === view
          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-900">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-gray-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              S
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              StudentDash
            </h1>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
            <NavItem view={View.PROGRESS} icon={TrendingUp} label="My Progress" />
            <NavItem view={View.ANALYTICS} icon={BarChart2} label="Analytics" />
            <NavItem view={View.ASSIGNMENTS} icon={BookOpen} label="Assignments" />
            <NavItem view={View.TASKS} icon={CheckSquare} label="Tasks" />
            <NavItem view={View.SYLLABUS} icon={List} label="Syllabus" />
            <NavItem view={View.SETTINGS} icon={Settings} label="Settings" />
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3 px-2">
              <img 
                src="https://picsum.photos/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-primary-500"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Alex Morgan</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Student ID: 8842</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300"
          >
            <Menu size={20} />
          </button>
          
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ml-2 lg:ml-0">
            {currentView}
          </h2>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-yellow-400 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
             {currentView === View.DASHBOARD && <DashboardView onViewChange={setCurrentView} />}
             {currentView === View.PROGRESS && <ProgressView />}
             {currentView === View.ANALYTICS && <AnalyticsView />}
             {currentView === View.ASSIGNMENTS && <AssignmentsView />}
             {currentView === View.TASKS && <HomeTasksView />}
             {currentView === View.SYLLABUS && <SyllabusView />}
             {currentView === View.SETTINGS && <SettingsView />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;