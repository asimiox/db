import React, { useState } from 'react';
import { Plus, Trash2, Check, Clock, AlertTriangle, Search } from 'lucide-react';
import Card from '../UI/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Assignment, AssignmentStatus } from '../../types';

const AssignmentsView: React.FC = () => {
  const [assignments, setAssignments] = useLocalStorage<Assignment[]>('assignments', [
    { id: '1', title: 'Calculus Problem Set 4', subject: 'Math', dueDate: '2023-11-15', status: AssignmentStatus.PENDING },
    { id: '2', title: 'Physics Lab Report', subject: 'Physics', dueDate: '2023-11-10', status: AssignmentStatus.OVERDUE },
    { id: '3', title: 'React Project', subject: 'CS', dueDate: '2023-11-20', status: AssignmentStatus.SUBMITTED },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: '',
    subject: '',
    dueDate: '',
    status: AssignmentStatus.PENDING
  });

  const addAssignment = () => {
    if (newAssignment.title && newAssignment.subject && newAssignment.dueDate) {
      setAssignments([
        ...assignments,
        { ...newAssignment, id: Date.now().toString() } as Assignment
      ]);
      setNewAssignment({ title: '', subject: '', dueDate: '', status: AssignmentStatus.PENDING });
      setIsAdding(false);
    }
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const updateStatus = (id: string, status: AssignmentStatus) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, status } : a));
  };

  const getStatusColor = (status: AssignmentStatus) => {
    switch (status) {
      case AssignmentStatus.SUBMITTED: return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case AssignmentStatus.OVERDUE: return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Assignments</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
        >
          <Plus size={18} />
          <span>New Assignment</span>
        </button>
      </div>

      {isAdding && (
        <Card className="animate-fade-in-down">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Add New Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Title (e.g., Essay on History)"
              className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              value={newAssignment.title}
              onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
            />
            <input
              type="text"
              placeholder="Subject"
              className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              value={newAssignment.subject}
              onChange={e => setNewAssignment({...newAssignment, subject: e.target.value})}
            />
            <input
              type="date"
              className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              value={newAssignment.dueDate}
              onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={addAssignment}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
            >
              Add Assignment
            </button>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {assignments.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No assignments found. Great job! 🎉
          </div>
        ) : (
          assignments.map((assignment) => (
            <Card key={assignment.id} className="group hover:border-primary-500/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {assignment.subject}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded flex items-center gap-1 ${getStatusColor(assignment.status)}`}>
                      {assignment.status === AssignmentStatus.SUBMITTED && <Check size={12} />}
                      {assignment.status === AssignmentStatus.PENDING && <Clock size={12} />}
                      {assignment.status === AssignmentStatus.OVERDUE && <AlertTriangle size={12} />}
                      {assignment.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{assignment.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  {assignment.status !== AssignmentStatus.SUBMITTED && (
                    <button
                      onClick={() => updateStatus(assignment.id, AssignmentStatus.SUBMITTED)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg tooltip"
                      title="Mark as Submitted"
                    >
                      <Check size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteAssignment(assignment.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentsView;