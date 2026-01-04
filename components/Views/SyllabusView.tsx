import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import Card from '../UI/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SubjectSyllabus } from '../../types';

const INITIAL_SYLLABUS: SubjectSyllabus[] = [
  {
    id: 'math',
    subject: 'Calculus II',
    topics: [
      { id: 'm1', name: 'Integration Techniques', completed: true },
      { id: 'm2', name: 'Infinite Series', completed: true },
      { id: 'm3', name: 'Parametric Equations', completed: false },
      { id: 'm4', name: 'Polar Coordinates', completed: false },
    ]
  },
  {
    id: 'cs',
    subject: 'Data Structures',
    topics: [
      { id: 'c1', name: 'Arrays & Linked Lists', completed: true },
      { id: 'c2', name: 'Stacks & Queues', completed: true },
      { id: 'c3', name: 'Trees & Graphs', completed: false },
      { id: 'c4', name: 'Hash Tables', completed: false },
    ]
  },
  {
    id: 'phy',
    subject: 'Physics: Mechanics',
    topics: [
      { id: 'p1', name: 'Newton\'s Laws', completed: true },
      { id: 'p2', name: 'Work and Energy', completed: false },
      { id: 'p3', name: 'Momentum', completed: false },
    ]
  }
];

const SyllabusView: React.FC = () => {
  const [syllabus, setSyllabus] = useLocalStorage<SubjectSyllabus[]>('syllabus', INITIAL_SYLLABUS);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['math']));

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpanded(newExpanded);
  };

  const toggleTopic = (subjectId: string, topicId: string) => {
    setSyllabus(syllabus.map(sub => {
      if (sub.id !== subjectId) return sub;
      return {
        ...sub,
        topics: sub.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t)
      };
    }));
  };

  const calculateProgress = (topics: any[]) => {
    const completed = topics.filter(t => t.completed).length;
    return Math.round((completed / topics.length) * 100);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Syllabus Tracker</h2>
      
      <div className="grid gap-6">
        {syllabus.map(subject => {
          const progress = calculateProgress(subject.topics);
          const isExpanded = expanded.has(subject.id);

          return (
            <Card key={subject.id} className="p-0 overflow-hidden">
              <div 
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => toggleExpand(subject.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${progress === 100 ? 'bg-green-100 text-green-600' : 'bg-primary-100 text-primary-600'}`}>
                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{subject.subject}</h3>
                    <p className="text-sm text-gray-500">{progress}% Completed</p>
                  </div>
                </div>
                <div className="w-24 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-green-500' : 'bg-primary-500'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {isExpanded && (
                <div className="bg-gray-50/50 dark:bg-slate-900/30 border-t border-gray-100 dark:border-slate-800">
                  {subject.topics.map(topic => (
                    <div 
                      key={topic.id}
                      className="flex items-center gap-3 p-4 pl-16 border-b border-gray-100 dark:border-slate-800 last:border-0 hover:bg-white dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                      onClick={() => toggleTopic(subject.id, topic.id)}
                    >
                      {topic.completed ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <Circle size={20} className="text-gray-300 dark:text-slate-600" />
                      )}
                      <span className={`${topic.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                        {topic.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SyllabusView;