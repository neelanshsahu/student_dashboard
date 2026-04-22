import { createContext, useContext, useState, useEffect } from 'react';
import { students as mockDataStudents } from '../data/mockData';
import { useAuth } from './AuthContext';

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const { user } = useAuth();
  
  // Keep local state of students to allow edits, or default back to mockData
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('sd_students_data');
    if (saved) return JSON.parse(saved);
    return mockDataStudents;
  });

  // Keep saved students in sync
  useEffect(() => {
    localStorage.setItem('sd_students_data', JSON.stringify(students));
  }, [students]);

  // Determine active student from Auth user
  const activeStudent = user 
    ? students.find(s => s.profile.email.toLowerCase() === user.email.toLowerCase())
    : null;

  // We need a fallback if it's a new user
  const activeStudentData = activeStudent || {
    id: user?.email || 'new_user',
    profile: {
      name: user?.name || 'New Student',
      email: user?.email || '',
      rollNumber: user?.rollNumber || 'Not set',
      course: 'Not set',
      phone: 'Not set',
      batch: 'Not set',
      semester: 'Not set',
      section: 'Not set',
      cgpa: 0,
      attendance: 0,
      avatar: user?.name ? user.name.slice(0, 2).toUpperCase() : 'NS',
      college: 'Not set',
      address: 'Not set',
    },
    subjects: [],
    assignments: [],
    timetable: {},
    cgpaHistory: [],
    notifications: []
  };

  const updateProfile = (newProfile) => {
    setStudents(prev => {
      const idx = prev.findIndex(s => s.profile.email.toLowerCase() === user.email.toLowerCase());
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], profile: newProfile };
        return next;
      } else {
        // First time saving for a new user
        return [...prev, { ...activeStudentData, profile: newProfile }];
      }
    });
  };

  const value = {
    // If not logged in, just pass empty data to avoid crashing (though protected route prevents this)
    student: activeStudentData,
    students,
    activeStudentId: activeStudentData.id,
    
    // Switcher is removed for actual Auth flow, but keeping signature for safety
    switchStudent: () => {
      console.warn('Switch student disabled when Auth is active. Log out instead.');
    },
    
    updateProfile,

    // Derived shorthand
    profile: activeStudentData.profile,
    subjects: activeStudentData.subjects,
    assignments: activeStudentData.assignments,
    timetable: activeStudentData.timetable,
    cgpaHistory: activeStudentData.cgpaHistory,
    notifications: activeStudentData.notifications
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudent must be used within a StudentProvider');
  return context;
};
