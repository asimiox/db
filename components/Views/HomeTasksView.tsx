import React, { useState } from 'react';
import { Plus, Trash, Check, Square } from 'lucide-react';
import Card from '../UI/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Task } from '../../types';

const HomeTasksView: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [
    { id: '1', text: 'Read Chapter 5 of History book', completed: false },
    { id: '2', text: 'Email professor about project', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Daily Tasks</h2>
      
      <Card>
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!newTask.trim()}
            className="bg-primary-600 disabled:opacity-50 hover:bg-primary-700 text-white p-3 rounded-xl transition-colors"
          >
            <Plus size={24} />
          </button>
        </form>

        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
          )}
          {tasks.map(task => (
            <div
              key={task.id}
              className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                task.completed 
                  ? 'bg-gray-50 dark:bg-slate-800/50 border-transparent opacity-75' 
                  : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800'
              }`}
            >
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTask(task.id)}>
                <div className={`p-1 rounded-md transition-colors ${
                  task.completed ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-slate-700 text-transparent'
                }`}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className={`text-base ${task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeTasksView;