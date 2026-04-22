// ============================================================
// App.jsx — Layout with updated background
// ============================================================
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar    from './components/Sidebar';
import Header     from './components/Header';
import Dashboard  from './pages/Dashboard';
import Subjects   from './pages/Subjects';
import Assignments from './pages/Assignments';
import Analytics  from './pages/Analytics';
import Timetable  from './pages/Timetable';
import Profile    from './pages/Profile';
import Login      from './pages/Login';
import Signup     from './pages/Signup';
import ProtectedRoute from './context/ProtectedRoute';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen app-bg flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen((s) => !s)} />
        <main className="flex-1 p-5 lg:p-7 max-w-[1400px] w-full mx-auto">
          <Routes>
            <Route path="/"            element={<Dashboard />} />
            <Route path="/subjects"    element={<Subjects />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/analytics"   element={<Analytics />} />
            <Route path="/timetable"   element={<Timetable />} />
            <Route path="/profile"     element={<Profile />} />
            <Route path="*"            element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login"  element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
