export enum View {
  DASHBOARD = 'Dashboard',
  PROGRESS = 'Progress',
  ANALYTICS = 'Analytics',
  ASSIGNMENTS = 'Assignments',
  TASKS = 'Tasks',
  SYLLABUS = 'Syllabus',
  SETTINGS = 'Settings'
}

export enum AssignmentStatus {
  PENDING = 'Pending',
  SUBMITTED = 'Submitted',
  OVERDUE = 'Overdue'
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: AssignmentStatus;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface Topic {
  id: string;
  name: string;
  completed: boolean;
}

export interface SubjectSyllabus {
  id: string;
  subject: string;
  topics: Topic[];
}

export interface UserSettings {
  name: string;
  email: string;
  avatar: string;
}
