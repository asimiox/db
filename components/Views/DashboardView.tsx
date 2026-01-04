import React from 'react';
import { Book, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Card from '../UI/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Assignment, AssignmentStatus, View } from '../../types';

interface DashboardViewProps {
  onViewChange: (view: View) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onViewChange }) => {
  const [assignments] = useLocalStorage<Assignment[]>('assignments', []);
  
  const pendingAssignments = assignments.filter(a => a.status === AssignmentStatus.PENDING).length;
  const completedAssignments = assignments.filter(a => a.status === AssignmentStatus.SUBMITTED).length;
  
  const stats = [
    { label: 'Total Courses', value: '6', icon: Book, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Completed Lessons', value: '42', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Pending Assignments', value: pendingAssignments.toString(), icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { label: 'Attendance', value: '94%', icon: AlertCircle, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back, Alex! 👋</h2>
          <p className="text-gray-500 dark:text-gray-400">Here's what's happening with your studies today.</p>
        </div>
        <button 
          onClick={() => onViewChange(View.TASKS)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/20"
        >
          Add New Task
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</h4>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card title="Recent Activity">
            <div className="space-y-4">
              {[
                { title: 'Submitted Calculus Homework', time: '2 hours ago', type: 'submission' },
                { title: 'Completed Physics Chapter 4', time: '5 hours ago', type: 'study' },
                { title: 'New grade released: Chemistry', time: 'Yesterday', type: 'grade' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">{activity.title}</h5>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Progress Summary */}
        <div>
          <Card title="Course Progress">
            <div className="space-y-4">
              {[
                { subject: 'Advanced Mathematics', progress: 75, color: 'bg-blue-500' },
                { subject: 'Physics', progress: 45, color: 'bg-purple-500' },
                { subject: 'Computer Science', progress: 90, color: 'bg-green-500' },
              ].map((course, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{course.subject}</span>
                    <span className="text-gray-500">{course.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${course.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onViewChange(View.PROGRESS)}
              className="w-full mt-6 py-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              View Detailed Progress
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;