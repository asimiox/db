import React from 'react';
import Card from '../UI/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SubjectSyllabus } from '../../types';

// Mock data initialization if local storage is empty for demo purposes
const MOCK_SYLLABUS: SubjectSyllabus[] = [
    {
      id: 'math',
      subject: 'Calculus II',
      topics: Array(10).fill({ completed: true }).map((_, i) => ({ id: `m${i}`, name: `Topic ${i}`, completed: i < 7 }))
    },
    {
      id: 'cs',
      subject: 'Data Structures',
      topics: Array(12).fill({ completed: true }).map((_, i) => ({ id: `c${i}`, name: `Topic ${i}`, completed: i < 10 }))
    },
    {
      id: 'phy',
      subject: 'Physics',
      topics: Array(8).fill({ completed: true }).map((_, i) => ({ id: `p${i}`, name: `Topic ${i}`, completed: i < 3 }))
    }
];

const ProgressView: React.FC = () => {
    // We try to reuse syllabus data for consistency, or fall back to mock
    const [syllabus] = useLocalStorage<SubjectSyllabus[]>('syllabus', MOCK_SYLLABUS);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Student Progress</h2>

            <div className="grid grid-cols-1 gap-6">
                {syllabus.map((sub, idx) => {
                    const completed = sub.topics.filter(t => t.completed).length;
                    const total = sub.topics.length;
                    const percent = Math.round((completed / total) * 100);
                    
                    let statusColor = 'bg-primary-500';
                    let statusLabel = 'In Progress';
                    if (percent === 100) { statusColor = 'bg-green-500'; statusLabel = 'Completed'; }
                    else if (percent < 30) { statusColor = 'bg-amber-500'; statusLabel = 'Just Started'; }

                    return (
                        <Card key={idx} className="relative overflow-hidden">
                             {/* Background decorative blob */}
                            <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 ${statusColor.replace('bg-', 'bg-')}`}></div>

                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 relative z-10">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{sub.subject}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{completed} / {total} Topics Completed</p>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider ${statusColor}`}>
                                        {statusLabel}
                                    </span>
                                </div>
                            </div>

                            <div className="relative pt-1 z-10">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200 dark:bg-primary-900 dark:text-primary-200">
                                            Progress
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
                                            {percent}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-primary-100 dark:bg-slate-700">
                                    <div style={{ width: `${percent}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${statusColor} transition-all duration-1000 ease-out`}></div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressView;