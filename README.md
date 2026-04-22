# 🎓 Student Dashboard

## Description
A modern, responsive, and visually appealing Student Dashboard designed to help students manage academic information, track performance, and stay updated with assignments. This portal features a premium glassmorphic UI, real-time-like analytics using interactive charts, and full multi-user authentication where students can log in with their college email and view personalized data. Designed and structured as a comprehensive college project.

## Features
- **🔑 Authentication**: Fully functional Login and Signup pages using local storage to persist user sessions and identity.
- **📊 Dashboard Overview**: View total subjects, overall attendance percentage, upcoming/overdue assignments, and current CGPA.
- **📚 Subjects Section**: Detailed list of enrolled subjects including teacher details, credits, and individual attendance history.
- **📈 Performance Analytics**: Interactive bar and line charts visualizing marks trends and subject attendance.
- **📋 Assignments Tracker**: Categorized task list (Pending, Submitted, Overdue) with priority badges.
- **📅 Timetable**: A day-by-day weekly class schedule with time slots, subjects, and room locations.
- **👤 Profile Page**: View and edit personal student details (name, roll number, course, etc.) with avatar management.
- **🌓 Dark Mode**: Seamless toggle between a bright light theme and a deep navy dark theme.
- **🔍 Search & Notifications**: Global header search and a simulated notifications panel.

## Tech Stack
- **Frontend Framework**: React 18, React Router v6
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS (with custom keyframes, gradients, and glassmorphism utilities)
- **State Management**: React Context API (`AuthContext`, `StudentContext`, `ThemeContext`)
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage for persistent auth and profile edits
- **Runtime Environment**: Node.js v18+

## Folder Structure
```text
src/
├── assets/         # Static assets and images
├── components/     # Reusable UI components (Sidebar, Header, etc.)
├── context/        # Global state managers (Auth, Student Data, Theme)
├── data/           # Mock data and global constants
├── pages/          # Individual screen views (Dashboard, Login, Subjects, etc.)
├── App.jsx         # Main application routing and protected routes
├── main.jsx        # Entry point wrapping providers
└── index.css       # Custom design system and Tailwind layer directives
```

## Installation Steps
Follow these steps to set up the project on your local machine:

1. Clone or download the repository to your local machine.
2. Ensure you have **Node.js (v18+)** installed.
3. Navigate to the project directory in your terminal:
   ```bash
   cd student_dashboard
   ```
4. Install all required dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage Instructions
1. Opening the server will redirect you to the **Login Page**.
2. **To view existing dummy data**:
   - Log in using an existing mock email, for example: `neelansh.sahu@university.edu` or `aditi.sharma@university.edu`.
   - Set the password to any string with a minimum of 4 characters.
3. **To test as a new student**:
   - Go to the **Signup Page** and register a new account. You'll be provided a fresh dashboard.
4. Navigate through the sidebar to view subjects, assignments, charts, and edit your profile.
5. Use the top right menu to toggle Dark Mode or sign out.

## Screenshots
*(Insert actual screenshots of the project here)*
- Dashboard Overview: `![Dashboard Overview](placeholder_dashboard.png)`
- Analytics Page: `![Analytics Charts](placeholder_analytics.png)`
- Timetable view: `![Timetable](placeholder_timetable.png)`
- Dark Mode toggle: `![Dark Mode](placeholder_dark.png)`

## Future Improvements
- **Backend API Integration**: Replace the local mock data with a Node.js + Express backend and a MongoDB database.
- **Live Notifications**: Integrate WebSockets for real-time announcements from professors via Firebase.
- **Calendar Integration**: Export timetable and assignment due dates directly to Google Calendar.
- **File Uploads**: Allow students to submit homework files directly from the assignments page.

## Author
Built by Neelansh Sahu - *Computer Science Engineering*
