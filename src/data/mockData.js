// ============================================================
// mockData.js — All dummy data for the Student Dashboard
// ============================================================

export const students = [
  {
    id: 'neelansh',
    profile: {
      name: 'Neelansh Sahu',
      rollNumber: 'CSE-2024-0847',
      course: 'B.Tech Computer Science Engineering',
      email: 'neelansh.sahu@university.edu',
      phone: '+91 98765 43210',
      batch: '2024 – 2028',
      semester: '6th Semester',
      section: 'Section A',
      cgpa: 3.78,
      attendance: 94,
      avatar: 'NS',
      college: 'National Institute of Technology',
      address: 'Raipur, Chhattisgarh, India',
    },
    subjects: [
      { id: 1, code: 'CS301', name: 'Data Structures & Algorithms', teacher: 'Dr. Rajesh Sharma', credits: 4, attendance: 92, grade: 'A', marks: 88 },
      { id: 2, code: 'CS302', name: 'Database Management Systems', teacher: 'Prof. Anita Gupta', credits: 3, attendance: 96, grade: 'A+', marks: 94 },
      { id: 3, code: 'CS303', name: 'Operating Systems', teacher: 'Dr. Vikram Verma', credits: 4, attendance: 85, grade: 'B+', marks: 82 },
      { id: 4, code: 'CS304', name: 'Computer Networks', teacher: 'Prof. Meera Patel', credits: 3, attendance: 98, grade: 'A', marks: 90 },
      { id: 5, code: 'CS305', name: 'Software Engineering', teacher: 'Dr. Amit Singh', credits: 3, attendance: 90, grade: 'A-', marks: 86 },
      { id: 6, code: 'CS306', name: 'Machine Learning', teacher: 'Prof. Priya Kumar', credits: 4, attendance: 88, grade: 'B+', marks: 84 },
      { id: 7, code: 'MA301', name: 'Discrete Mathematics', teacher: 'Dr. Suresh Rao', credits: 3, attendance: 95, grade: 'A', marks: 91 },
    ],
    assignments: [
      { id: 1, title: 'Binary Search Tree Implementation', subject: 'DS&A', dueDate: '2026-04-22', status: 'pending', priority: 'high' },
      { id: 2, title: 'ER Diagram for Library System', subject: 'DBMS', dueDate: '2026-04-20', status: 'submitted', priority: 'medium' },
      { id: 3, title: 'Process Scheduling Simulation', subject: 'OS', dueDate: '2026-04-18', status: 'submitted', priority: 'low' },
      { id: 4, title: 'Socket Programming Lab Report', subject: 'CN', dueDate: '2026-04-25', status: 'pending', priority: 'high' },
      { id: 5, title: 'SRS Document – Phase 2', subject: 'SE', dueDate: '2026-04-15', status: 'overdue', priority: 'high' },
    ],
    timetable: {
      Monday: [
        { time: '9:00 – 10:00', subject: 'Data Structures & Algorithms', room: 'Room 204', type: 'Lecture' },
        { time: '10:00 – 11:00', subject: 'Computer Networks', room: 'Room 108', type: 'Lecture' },
      ],
      Tuesday: [
        { time: '9:00 – 10:00', subject: 'Operating Systems', room: 'Room 312', type: 'Lecture' },
        { time: '10:00 – 12:00', subject: 'Database Management Lab', room: 'Lab 3', type: 'Lab' },
      ],
      Wednesday: [
        { time: '9:00 – 10:00', subject: 'Data Structures & Algorithms', room: 'Room 204', type: 'Lecture' },
        { time: '10:15 – 11:15', subject: 'Database Management Systems', room: 'Room 210', type: 'Lecture' },
      ],
      Thursday: [
        { time: '9:00 – 10:00', subject: 'Computer Networks', room: 'Room 108', type: 'Lecture' },
        { time: '10:00 – 11:00', subject: 'Software Engineering', room: 'Room 206', type: 'Lecture' },
      ],
      Friday: [
        { time: '9:00 – 10:00', subject: 'Machine Learning', room: 'Room 401', type: 'Lecture' },
        { time: '10:00 – 11:00', subject: 'Operating Systems', room: 'Room 312', type: 'Lecture' },
      ],
    },
    cgpaHistory: [
      { semester: 'Sem 1', cgpa: 3.4 },
      { semester: 'Sem 2', cgpa: 3.5 },
      { semester: 'Sem 3', cgpa: 3.6 },
      { semester: 'Sem 4', cgpa: 3.65 },
      { semester: 'Sem 5', cgpa: 3.72 },
      { semester: 'Sem 6', cgpa: 3.78 },
    ],
    notifications: [
      { id: 1, type: 'assignment', title: 'Assignment deadline tomorrow', message: 'BST Implementation due April 22', time: '5 min ago', read: false },
      { id: 2, type: 'grade',      title: 'New grade posted', message: 'You scored A+ in DBMS ER Diagram', time: '2 hrs ago', read: false },
      { id: 3, type: 'schedule',   title: 'Class rescheduled', message: 'OS class moved to 2 PM tomorrow', time: '4 hrs ago', read: true },
    ]
  },
  {
    id: 'aditi',
    profile: {
      name: 'Aditi Sharma',
      rollNumber: 'CSE-2024-0912',
      course: 'B.Tech Computer Science Engineering',
      email: 'aditi.sharma@university.edu',
      phone: '+91 99887 76655',
      batch: '2024 – 2028',
      semester: '6th Semester',
      section: 'Section B',
      cgpa: 3.85,
      attendance: 96,
      avatar: 'AS',
      college: 'National Institute of Technology',
      address: 'New Delhi, Delhi, India',
    },
    subjects: [
      { id: 1, code: 'CS301', name: 'Data Structures & Algorithms', teacher: 'Dr. Rajesh Sharma', credits: 4, attendance: 95, grade: 'A+', marks: 92 },
      { id: 2, code: 'CS302', name: 'Database Management Systems', teacher: 'Prof. Anita Gupta', credits: 3, attendance: 98, grade: 'A+', marks: 95 },
      { id: 3, code: 'CS303', name: 'Operating Systems', teacher: 'Dr. Vikram Verma', credits: 4, attendance: 92, grade: 'A', marks: 88 },
      { id: 4, code: 'CS304', name: 'Computer Networks', teacher: 'Prof. Meera Patel', credits: 3, attendance: 96, grade: 'A+', marks: 94 },
      { id: 5, code: 'CS305', name: 'Software Engineering', teacher: 'Dr. Amit Singh', credits: 3, attendance: 94, grade: 'A', marks: 90 },
    ],
    assignments: [
      { id: 1, title: 'Heap Sort Implementation', subject: 'DS&A', dueDate: '2026-04-23', status: 'pending', priority: 'medium' },
      { id: 2, title: 'SQL Queries Lab', subject: 'DBMS', dueDate: '2026-04-21', status: 'pending', priority: 'high' },
      { id: 3, title: 'Memory Management Report', subject: 'OS', dueDate: '2026-04-19', status: 'submitted', priority: 'low' },
    ],
    timetable: {
      Monday: [
        { time: '9:00 – 10:00', subject: 'Operating Systems', room: 'Room 312', type: 'Lecture' },
        { time: '10:00 – 11:00', subject: 'Database Management Systems', room: 'Room 210', type: 'Lecture' },
      ],
      Tuesday: [
        { time: '9:00 – 10:00', subject: 'Data Structures & Algorithms', room: 'Room 204', type: 'Lecture' },
        { time: '10:00 – 11:00', subject: 'Machine Learning', room: 'Room 401', type: 'Lecture' },
      ],
      Wednesday: [
        { time: '11:00 – 1:00', subject: 'Software Engineering Lab', room: 'Lab 5', type: 'Lab' },
      ],
      Thursday: [
        { time: '9:00 – 11:00', subject: 'Algorithms Lab', room: 'Lab 1', type: 'Lab' },
      ],
      Friday: [
        { time: '10:00 – 12:00', subject: 'Networks Lab', room: 'Lab 4', type: 'Lab' },
      ],
    },
    cgpaHistory: [
      { semester: 'Sem 1', cgpa: 3.6 },
      { semester: 'Sem 2', cgpa: 3.75 },
      { semester: 'Sem 3', cgpa: 3.8 },
      { semester: 'Sem 4', cgpa: 3.82 },
      { semester: 'Sem 5', cgpa: 3.84 },
      { semester: 'Sem 6', cgpa: 3.85 },
    ],
    notifications: [
      { id: 1, type: 'assignment', title: 'New assignment posted', message: 'SQL Queries - DBMS', time: '1 hr ago', read: false },
      { id: 2, type: 'event',      title: 'Workshop on Cloud', message: 'Join us on Saturday at 10 AM', time: '5 hrs ago', read: false },
    ]
  }
];

// Re-export constants for easy access if needed, but the Context will handle active data
export const studentProfile = students[0].profile;
export const subjects = students[0].subjects;
export const assignments = students[0].assignments;
export const timetable = students[0].timetable;
export const cgpaHistory = students[0].cgpaHistory;
export const notifications = students[0].notifications;

// Extra data used in charts
export const marksData = [
  { month: 'Aug', dsa: 72, dbms: 80, os: 68, cn: 75, se: 70 },
  { month: 'Sep', dsa: 76, dbms: 82, os: 70, cn: 78, se: 74 },
  { month: 'Oct', dsa: 80, dbms: 85, os: 74, cn: 80, se: 76 },
  { month: 'Nov', dsa: 82, dbms: 88, os: 76, cn: 82, se: 78 },
  { month: 'Dec', dsa: 85, dbms: 90, os: 78, cn: 85, se: 80 },
];

export const attendanceData = [
  { subject: 'DS&A', attended: 92, total: 100 },
  { subject: 'DBMS', attended: 96, total: 100 },
  { subject: 'OS', attended: 85, total: 100 },
  { subject: 'CN', attended: 98, total: 100 },
  { subject: 'SE', attended: 90, total: 100 },
];
