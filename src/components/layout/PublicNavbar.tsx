import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShieldCheck, LogIn, ArrowRight, Menu, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../common/Button'

export const PublicNavbar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Features', href: '/#features' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname + location.hash === path
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-[#14532d] flex items-center justify-center text-white font-bold shadow-2xs group-hover:bg-[#166534] transition-colors">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#0f172a]">
            Campus<span className="text-[#16a34a]">Fix</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#64748b]">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return link.href.startsWith('/#') ? (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors py-1 border-b-2 font-semibold ${
                  active
                    ? 'text-[#14532d] border-[#14532d]'
                    : 'text-[#64748b] border-transparent hover:text-[#0f172a]'
                }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`transition-colors py-1 border-b-2 font-semibold ${
                  active
                    ? 'text-[#14532d] border-[#14532d]'
                    : 'text-[#64748b] border-transparent hover:text-[#0f172a]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate(user.role === 'admin' ? '/admin' : '/student')}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0f172a] px-3.5 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <LogIn className="w-4 h-4 text-[#64748b]" />
                Login
              </Link>
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#64748b] hover:text-[#0f172a] rounded-lg hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e2e8f0] px-4 pt-2 pb-4 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-[#0f172a] hover:bg-slate-50 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#e2e8f0] flex flex-col gap-2">
            {user ? (
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false)
                  navigate(user.role === 'admin' ? '/admin' : '/student')
                }}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-bold text-[#0f172a] bg-slate-100 rounded-lg"
                >
                  Login
                </Link>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false)
                    navigate('/signup')
                  }}
                >
                  Get Started →
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
