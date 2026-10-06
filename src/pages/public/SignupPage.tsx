import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  Users,
  BarChart2,
  Bell,
  Eye,
  EyeOff,
  Wifi,
  Droplet,
  Tv,
  GraduationCap,
  Check,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../components/common/Toast'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { Select } from '../../components/common/Select'
import { PriorityBadge } from '../../components/common/Badge'

export const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const { showSuccess, showError } = useToast()

  // Form States
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [campus, setCampus] = useState('Main Tech Campus')
  const [hostel, setHostel] = useState('Hostel Block A')
  const [termsAgreed, setTermsAgreed] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState('')

  // Password Requirements Check
  const hasMinLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const validate = () => {
    let valid = true
    if (!name.trim()) {
      setNameError('Please enter your full name')
      valid = false
    } else {
      setNameError('')
    }

    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid campus email address')
      valid = false
    } else {
      setEmailError('')
    }

    if (!hasMinLength || !hasNumber || !hasSpecial) {
      showError('Password requirements', 'Use at least 8 characters, one number, and one special character.')
      valid = false
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match', 'Enter the same password in both fields.')
      valid = false
    }

    if (!termsAgreed) {
      showError('Terms Required', 'Please accept the Terms of Service to proceed.')
      valid = false
    }

    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      await signup({
        name,
        email,
        password,
        campus,
        hostel,
        role: 'student',
      })
      showSuccess(
        'Account Created!',
        'Welcome to CampusFix! Your student account is ready.'
      )
      navigate('/student')
    } catch (error) {
      showError('Account not created', error instanceof Error ? error.message : 'Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    showError(
      'Google OAuth Not Configured',
      'Google signup is not enabled in this demo environment. Please complete standard registration.'
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

            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold text-[#0f172a] px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-xs font-bold text-white bg-[#14532d] px-3 py-1.5 rounded-lg hover:bg-[#166534] transition-colors"
              >
                Get Started →
              </Link>
            </div>
          </div>

          {/* Main Headline & Supporting Text */}
          <div className="grid grid-cols-12 gap-6 my-6 z-10">
            {/* Left Copy & Benefits Column */}
            <div className="col-span-6 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#14532d] text-[11px] font-bold border border-emerald-300">
                <GraduationCap className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Join a Smarter, Happier Campus</span>
              </div>

              <div>
                <h1 className="text-3xl font-black text-[#0f172a] leading-tight">
                  Create Your <br />
                  <span className="text-[#14532d]">Campus<span className="text-[#16a34a]">Fix</span> Account</span>
                </h1>
                <p className="text-xs text-[#64748b] mt-2 leading-relaxed">
                  Be a part of a community that solves campus and hostel problems together.
                </p>
              </div>

              {/* 4 Benefit Items */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 text-[#14532d] rounded-lg shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a]">Report & Confirm</h4>
                    <p className="text-[11px] text-[#64748b]">Report issues or confirm existing ones.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a]">Real Impact</h4>
                    <p className="text-[11px] text-[#64748b]">Show how many students are affected.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 text-blue-800 rounded-lg shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a]">Faster Resolutions</h4>
                    <p className="text-[11px] text-[#64748b]">Help management prioritize issues.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 text-purple-800 rounded-lg shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a]">Stay Updated</h4>
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
                    "CampusFix makes it easy to raise real problems on campus. I feel our voice actually matters."
                  </p>
                  <p className="text-[10px] font-bold text-[#14532d] mt-0.5">
                    — Mayank Kumar, CSE Student
                  </p>
                </div>
              </div>
            </div>

            {/* Right Campus Illustration & 3 Floating Demo Cards */}
            <div className="col-span-6 relative flex flex-col justify-center">
              <div className="text-right mb-2 text-[11px] font-bold text-emerald-800 italic flex items-center justify-end gap-1">
                <span>Real problems, Real students, Real impact</span>
                <span className="text-lg">⤵</span>
              </div>

              {/* Floating Demo Issue Cards */}
              <div className="space-y-3 relative z-10">
                <div className="bg-white/95 backdrop-blur-xs border border-[#e2e8f0] rounded-xl p-3 shadow-md">
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
                    <span>27 students affected</span>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-xs border border-[#e2e8f0] rounded-xl p-3 shadow-md">
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
                    <span>14 students affected</span>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-xs border border-[#e2e8f0] rounded-xl p-3 shadow-md">
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
                    <span>6 students affected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Marketing Stats */}
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
            RIGHT SIGNUP FORM CARD
        ================================================== */}
        <div className="lg:col-span-5 p-4 sm:p-8 flex flex-col justify-center bg-white rounded-2xl">
          
          {/* Top Logo & Login Navigation Link */}
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#14532d] flex items-center justify-center text-white font-bold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[#0f172a]">
                Campus<span className="text-[#16a34a]">Fix</span>
              </span>
            </Link>

            <span className="text-xs text-[#64748b]">
              Already have an account?{' '}
              <Link to="/login" className="font-extrabold text-[#16a34a] hover:underline">
                Login
              </Link>
            </span>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-black text-[#0f172a]">Create Your Account</h2>
            <p className="text-xs text-[#64748b] mt-1">Join CampusFix and be part of a better campus.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <Input
              label="Full Name"
              type="text"
              icon={<User className="w-4 h-4" />}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (nameError) setNameError('')
              }}
              error={nameError}
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Email Address"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              error={emailError}
              placeholder="Enter your email address"
              required
            />

            <div className="space-y-1.5">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={<Lock className="w-4 h-4" />}
                endAction={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />

              {/* Password Requirements Indicator */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px]">
                <span className={`flex items-center gap-1 font-semibold ${hasMinLength ? 'text-emerald-700' : 'text-[#64748b]'}`}>
                  <Check className={`w-3 h-3 ${hasMinLength ? 'text-emerald-600 font-bold' : 'text-slate-300'}`} />
                  At least 8 characters
                </span>
                <span className={`flex items-center gap-1 font-semibold ${hasNumber ? 'text-emerald-700' : 'text-[#64748b]'}`}>
                  <Check className={`w-3 h-3 ${hasNumber ? 'text-emerald-600 font-bold' : 'text-slate-300'}`} />
                  One number
                </span>
                <span className={`flex items-center gap-1 font-semibold ${hasSpecial ? 'text-emerald-700' : 'text-[#64748b]'}`}>
                  <Check className={`w-3 h-3 ${hasSpecial ? 'text-emerald-600 font-bold' : 'text-slate-300'}`} />
                  One special character
                </span>
              </div>
            </div>

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              icon={<Lock className="w-4 h-4" />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
            />

            {/* Campus & Hostel Selection Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Campus"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                options={[
                  { value: 'Main Tech Campus', label: 'Main Tech Campus' },
                  { value: 'North Campus', label: 'North Campus' },
                  { value: 'South Medical Campus', label: 'South Medical Campus' },
                ]}
              />

              <Select
                label="Hostel / Block (Optional)"
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                options={[
                  { value: 'Hostel Block A', label: 'Hostel Block A' },
                  { value: 'Hostel Block B', label: 'Hostel Block B' },
                  { value: 'Girls Hostel 1', label: 'Girls Hostel 1' },
                  { value: 'Day Scholar / N/A', label: 'Day Scholar / N/A' },
                ]}
              />
            </div>

            {/* Role Notice */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#0f172a]">Role</label>
              <div className="p-2.5 bg-slate-100 border border-[#e2e8f0] rounded-lg text-xs font-bold text-[#0f172a] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#14532d]" />
                <span>Student</span>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 text-xs text-[#0f172a] cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="rounded text-[#14532d] focus:ring-[#14532d]"
                  required
                />
                <span className="font-semibold">
                  I agree to the{' '}
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#14532d] underline font-bold">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#14532d] underline font-bold">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              size="lg"
              className="font-extrabold mt-1"
            >
              Create Account →
            </Button>
          </form>

          {/* OR Divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2e8f0]" />
            </div>
            <span className="relative bg-white px-3 text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
              OR
            </span>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
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

        </div>

      </div>
    </div>
  )
}
