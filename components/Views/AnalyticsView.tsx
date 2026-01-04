import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../UI/Card';

const AnalyticsView: React.FC = () => {
  const studyData = [
    { name: 'Mon', hours: 4 },
    { name: 'Tue', hours: 3 },
    { name: 'Wed', hours: 6 },
    { name: 'Thu', hours: 4.5 },
    { name: 'Fri', hours: 5 },
    { name: 'Sat', hours: 7 },
    { name: 'Sun', hours: 2 },
  ];

  const subjectData = [
    { name: 'Math', value: 35 },
    { name: 'Physics', value: 25 },
    { name: 'CS', value: 25 },
    { name: 'English', value: 15 },
  ];

  const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Weekly Study Hours" className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studyData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="hours" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Study Distribution by Subject" className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  border: 'none'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-[-20px]">
            {subjectData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Performance Insights">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-1">Top Subject</h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">Mathematics</p>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-2">95% avg. score</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <h4 className="text-purple-700 dark:text-purple-300 font-semibold mb-1">Focus Needed</h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">Physics</p>
                <p className="text-sm text-purple-600/80 dark:text-purple-400/80 mt-2">Upcoming exam in 3 days</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/30">
                <h4 className="text-green-700 dark:text-green-300 font-semibold mb-1">Study Streak</h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">12 Days</p>
                <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-2">Keep it up! 🔥</p>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsView;