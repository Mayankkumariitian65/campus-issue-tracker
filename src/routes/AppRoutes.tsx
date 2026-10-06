import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { Role } from '../lib/supabase'

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout'
import { StudentLayout } from '../components/layout/StudentLayout'
import { AdminLayout } from '../components/layout/AdminLayout'

// Public Pages
import { LandingPage } from '../pages/public/LandingPage'
import { LoginPage } from '../pages/public/LoginPage'
import { SignupPage } from '../pages/public/SignupPage'

// Student Pages
import { StudentDashboardPage } from '../pages/student/StudentDashboardPage'
import { ExploreIssuesPage } from '../pages/student/ExploreIssuesPage'
import { IssueDetailsPage } from '../pages/student/IssueDetailsPage'
import { ReportIssuePage } from '../pages/student/ReportIssuePage'
import { MyActivityPage } from '../pages/student/MyActivityPage'
import { ProfilePage } from '../pages/student/ProfilePage'

// Admin Pages
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { AdminIssuesPage } from '../pages/admin/AdminIssuesPage'
import { AdminIssueDetailsPage } from '../pages/admin/AdminIssueDetailsPage'
import { AdminAnalyticsPage } from '../pages/admin/AdminAnalyticsPage'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Student Protected / Interactive Routes */}
      <Route element={<RequireRole role="student" />}>
        <Route element={<StudentLayout />}>
          <Route path="/student" element={<StudentDashboardPage />} />
          <Route path="/student/issues" element={<ExploreIssuesPage />} />
          <Route path="/student/issues/:id" element={<IssueDetailsPage />} />
          <Route path="/student/report" element={<ReportIssuePage />} />
          <Route path="/student/activity" element={<MyActivityPage />} />
          <Route path="/student/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Admin Operations Routes */}
      <Route element={<RequireRole role="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/issues" element={<AdminIssuesPage />} />
          <Route path="/admin/issues/:id" element={<AdminIssueDetailsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const RequireRole: React.FC<{ role: Role }> = ({ role }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return null
  if (user?.role === role) return <Outlet />
  if (!user) return <Navigate to="/login" replace />

  return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
}
