import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Mail,
  Users,
  BarChart2,
  Bell,
  ArrowLeft,
  Eye,
  EyeOff,
  Wifi,
  Droplet,
  Tv,
  GraduationCap
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../components/common/Toast'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { PriorityBadge } from '../../components/common/Badge'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { showSuccess, showError } = useToast()

  // Form State
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin'>('student')
  const [email, setEmail] = useState('aarav@campus.edu')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address')
      return false
    }
    setEmailError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      const authenticated = await login(email, password, selectedRole)
      if (!authenticated) {
        showError('Login failed', 'Check your email, password, and selected role.')
        return
      }
      showSuccess('Welcome Back!', `Logged in successfully as ${selectedRole === 'admin' ? 'Campus Admin' : 'Student'}.`)
      navigate(selectedRole === 'admin' ? '/admin' : '/student')
    } catch {
      showError('Login unavailable', 'Please try again in this browser.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    showError(
      'Google Login Not Configured',
      'Google OAuth is not configured in this demo environment. Please use standard email login or preset buttons.'
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans">
      {/* Outer Centered Container */}
      <div className="w-full max-w-7xl bg-white border border-[#e2e8f0] rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 p-3 sm:p-5 gap-6">
        
        {/* ==================================================
            LEFT MARKETING & CAMPUS VISUAL PANEL (Desktop)
        ================================================== */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#ecfdf5] via-white to-slate-50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-emerald-100 hidden lg:flex">
          
          {/* Top Panel Navigation Bar */}
          <div className="flex items-center justify-between z-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#14532d] flex items-center justify-center text-white font-bold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[#0f172a]">
                Campus<span className="text-[#16a34a]">Fix</span>
              </span>
            </Link>

            <nav className="flex items-center gap-5 text-xs font-semibold text-[#64748b]">
              <Link to="/" className="hover:text-[#0f172a] transition-colors">Home</Link>
              <a href="/#how-it-works" className="hover:text-[#0f172a] transition-colors">How It Works</a>
              <a href="/#features" className="hover:text-[#0f172a] transition-colors">Features</a>
              <a href="/#about" className="hover:text-[#0f172a] transition-colors">About</a>
            </nav>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14532d] bg-white px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </div>

          {/* Main Headline & Supporting Text */}
          <div className="grid grid-cols-12 gap-6 my-6 z-10">
            {/* Left Copy & Benefits Column */}
            <div className="col-span-6 space-y-6">
              <div>
                <h1 className="text-3xl font-black text-[#0f172a] leading-tight">
                  Login to <br />
                  <span className="text-[#14532d]">Campus<span className="text-[#16a34a]">Fix</span></span>
                </h1>
                <p className="text-xs text-[#64748b] mt-2 leading-relaxed">
                  Continue to report, confirm and track campus and hostel issues.
                </p>
              </div>

              {/* 4 Benefit Points */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 text-[#14532d] rounded-lg shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a]">Join your campus community</h4>
                    <p className="text-[11px] text-[#64748b]">Report and confirm real problems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a]">Track real impact</h4>
                    <p className="text-[11px] text-[#64748b]">See how many students are affected.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 text-blue-800 rounded-lg shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a]">Faster resolutions</h4>
                    <p className="text-[11px] text-[#64748b]">Help management prioritize issues.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 text-purple-800 rounded-lg shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a]">Stay updated</h4>
                    <p className="text-[11px] text-[#64748b]">Get notifications on issue status.</p>
                  </div>
                </div>
              </div>

              {/* Student Testimonial Card */}
              <div className="p-3.5 bg-white/90 backdrop-blur-xs rounded-xl border border-[#e2e8f0] shadow-2xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#14532d] text-white font-extrabold flex items-center justify-center text-sm shrink-0 border-2 border-emerald-400">
                  MK
                </div>
                <div>
                  <p className="text-[11px] italic text-[#0f172a] leading-tight">
                    "CampusFix actually listens to students. Now we can see real action on our issues!"
                  </p>
                  <p className="text-[10px] font-bold text-[#14532d] mt-0.5">
                    — Mayank Kumar, CSE Student
                  </p>
                </div>
              </div>
            </div>

            {/* Right Campus Building Illustration & 3 Floating Demo Cards */}
            <div className="col-span-6 relative flex flex-col justify-center">
              {/* Handwritten Arrow Callout */}
              <div className="text-right mb-2 text-[11px] font-bold text-emerald-800 italic flex items-center justify-end gap-1">
                <span>Real problems, Real students, Real impact</span>
                <span className="text-lg">⤵</span>
              </div>

              {/* Floating Demo Issue Cards */}
              <div className="space-y-3 relative z-10">
                {/* Demo Card 1 */}
                <div className="bg-white/95 backdrop-blur-xs border border-[#e2e8f0] rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-red-100 text-red-600 rounded-md">
                        <Wifi className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-extrabold text-[#0f172a]">Wi-Fi Not Working</h5>
                        <p className="text-[10px] text-[#64748b]">Hostel Block A · 2nd Floor</p>
                      </div>
                    </div>
                    <PriorityBadge priority="high" size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#14532d] font-bold pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      27 students affected
                    </span>
                  </div>
                </div>

                {/* Demo Card 2 */}
                <div className="bg-white/95 backdrop-blur-xs border border-[#e2e8f0] rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                        <Droplet className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-extrabold text-[#0f172a]">Water Supply Issue</h5>
                        <p className="text-[10px] text-[#64748b]">Hostel Block B</p>
                      </div>
                    </div>
                    <PriorityBadge priority="medium" size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#14532d] font-bold pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      14 students affected
                    </span>
                  </div>
                </div>

                {/* Demo Card 3 */}
                <div className="bg-white/95 backdrop-blur-xs border border-[#e2e8f0] rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-emerald-100 text-[#14532d] rounded-md">
                        <Tv className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-extrabold text-[#0f172a]">Classroom Projector</h5>
                        <p className="text-[10px] text-[#64748b]">Room 204 · Academic Block</p>
                      </div>
                    </div>
                    <PriorityBadge priority="low" size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#14532d] font-bold pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      6 students affected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Marketing Stats Strip */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#e2e8f0] z-10 text-center">
            <div>
              <p className="text-lg font-black text-[#14532d]">One</p>
              <p className="text-[10px] font-semibold text-[#64748b]">Shared report</p>
            </div>
            <div>
              <p className="text-lg font-black text-[#16a34a]">Together</p>
              <p className="text-[10px] font-semibold text-[#64748b]">Confirm impact</p>
            </div>
            <div>
              <p className="text-lg font-black text-[#14532d]">Campus</p>
              <p className="text-[10px] font-semibold text-[#64748b]">And hostel</p>
            </div>
            <div>
              <p className="text-lg font-black text-[#16a34a]">Verified</p>
              <p className="text-[10px] font-semibold text-[#64748b]">Student closure</p>
            </div>
          </div>

        </div>

        {/* ==================================================
            RIGHT AUTHENTICATION FORM PANEL
        ================================================== */}
        <div className="lg:col-span-5 p-4 sm:p-8 flex flex-col justify-center bg-white rounded-2xl">
          
          {/* Header Branding & Welcome */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#14532d] flex items-center justify-center text-white font-bold shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#0f172a]">
                Campus<span className="text-[#16a34a]">Fix</span>
              </span>
            </Link>

            <h2 className="text-2xl font-black text-[#0f172a]">Welcome Back!</h2>
            <p className="text-xs text-[#64748b] mt-1">Login to continue to a better campus.</p>
          </div>

          {/* Student / Admin Segmented Role Selector */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl mb-6 border border-[#e2e8f0]">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('student')
                setEmail('aarav@campus.edu')
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-[#ecfdf5] text-[#14532d] border border-emerald-300 shadow-2xs'
                  : 'text-[#64748b] hover:text-[#0f172a] hover:bg-slate-200/50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#16a34a]" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin')
                setEmail('admin@campus.edu')
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-[#ecfdf5] text-[#14532d] border border-emerald-300 shadow-2xs'
                  : 'text-[#64748b] hover:text-[#0f172a] hover:bg-slate-200/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-[#14532d]" />
              <span>Admin</span>
            </button>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              error={emailError}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={<Lock className="w-4 h-4" />}
              endAction={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <div className="flex justify-end text-xs pt-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  showError('Password reset unavailable', 'Password recovery is not connected in this local demo.')
                }}
                className="font-bold text-[#16a34a] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="primary" fullWidth isLoading={isLoading} size="lg" className="font-extrabold mt-2">
              Login →
            </Button>
          </form>

          {/* OR Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2e8f0]" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
              OR
            </span>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#e2e8f0] hover:bg-slate-50 text-[#0f172a] rounded-lg text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Create Account Link */}
          <p className="text-center text-xs text-[#64748b] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-extrabold text-[#14532d] hover:underline">
              Create Account
            </Link>
          </p>

        </div>

      </div>
    </div>
  )
}
