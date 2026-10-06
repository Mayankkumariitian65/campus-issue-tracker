import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Users,
  Flame,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Sparkles,
  Wifi,
  Droplet,
  Tv,
  Check,
  Clock,
  Layers,
  ThumbsUp,
  RotateCcw,
  Zap,
  Smile
} from 'lucide-react'
import { Button } from '../../components/common/Button'
import { PriorityBadge } from '../../components/common/Badge'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  // Interactive preview card state for landing page demo
  const [cards, setCards] = useState([
    {
      id: 'p1',
      title: 'Wi-Fi Not Working',
      location: 'Hostel Block A · 2nd Floor',
      category: 'Network / Wi-Fi',
      affectedCount: 27,
      priority: 'high' as const,
      confirmed: false,
      icon: Wifi,
    },
    {
      id: 'p2',
      title: 'Water Supply Issue',
      location: 'Hostel Block B',
      category: 'Plumbing',
      affectedCount: 14,
      priority: 'medium' as const,
      confirmed: false,
      icon: Droplet,
    },
    {
      id: 'p3',
      title: 'Classroom Projector Fault',
      location: 'Room 204 · Academic Block',
      category: 'Facility Maintenance',
      affectedCount: 6,
      priority: 'low' as const,
      confirmed: false,
      icon: Tv,
    },
  ])

  const toggleConfirm = (id: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newConfirmed = !c.confirmed
          return {
            ...c,
            confirmed: newConfirmed,
            affectedCount: newConfirmed ? c.affectedCount + 1 : c.affectedCount - 1,
          }
        }
        return c
      })
    )
  }

  return (
    <div className="space-y-16 pb-16 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#ecfdf5] via-white to-[#f8fafc] pt-12 sm:pt-16 pb-20 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Composition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Context Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-[#14532d] text-xs font-bold border border-emerald-300 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#16a34a]" />
                <span>A Smarter Campus, Happier Students</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-tight sm:leading-tight">
                Campus Problems? <br className="hidden sm:inline" />
                <span className="text-[#14532d]">
                  <span className="text-[#16a34a] border-b-4 border-[#16a34a]/30">Report Once.</span> Confirm Together.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#64748b] leading-relaxed max-w-xl mx-auto lg:mx-0">
                <strong className="text-[#0f172a] font-bold">One issue. Multiple students. One clear priority.</strong>
                <br />
                A simple platform to report, confirm and track campus and hostel issues without duplicate complaints.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => navigate('/signup')}
                >
                  Get Started →
                </Button>
                
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-[#14532d] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                >
                  <PlayCircle className="w-4 h-4 text-[#16a34a]" />
                  <span>How It Works</span>
                </a>
              </div>

              {/* Hero Stats Strip */}
              <div className="pt-8 border-t border-[#e2e8f0]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-white/80 rounded-xl border border-[#e2e8f0]">
                  <p className="text-xl sm:text-2xl font-black text-[#14532d]">One</p>
                  <p className="text-[11px] font-semibold text-[#64748b]">Shared issue report</p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-[#e2e8f0]">
                  <p className="text-xl sm:text-2xl font-black text-[#16a34a]">Together</p>
                  <p className="text-[11px] font-semibold text-[#64748b]">Community confirmation</p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-[#e2e8f0]">
                  <p className="text-xl sm:text-2xl font-black text-[#14532d]">Campus</p>
                  <p className="text-[11px] font-semibold text-[#64748b]">And hostel issues</p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-[#e2e8f0]">
                  <p className="text-xl sm:text-2xl font-black text-[#16a34a]">Verified</p>
                  <p className="text-[11px] font-semibold text-[#64748b]">Student resolution</p>
                </div>
              </div>
            </div>

            {/* Right Side Visual Treatment: Interactive Floating Preview Cards */}
            <div className="lg:col-span-5 relative space-y-4">
              <div className="flex items-center justify-between px-2 text-xs font-bold text-[#64748b]">
                <span className="flex items-center gap-1.5 text-[#14532d]">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" /> Interactive Preview
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Try "I'm facing this too"</span>
              </div>

              {cards.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.id}
                    className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#ecfdf5] text-[#14532d] rounded-lg">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-[#0f172a]">{card.title}</h4>
                          <p className="text-xs text-[#64748b]">{card.location}</p>
                        </div>
                      </div>
                      <PriorityBadge priority={card.priority} size="sm" />
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                      <span className="text-xs font-extrabold text-[#14532d] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {card.affectedCount} students affected
                      </span>

                      <button
                        onClick={() => toggleConfirm(card.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                          card.confirmed
                            ? 'bg-emerald-100 text-[#14532d] border border-emerald-300'
                            : 'bg-[#16a34a] hover:bg-[#15803d] text-white shadow-2xs'
                        }`}
                      >
                        {card.confirmed ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#16a34a]" />
                            <span>Confirmed</span>
                          </>
                        ) : (
                          <>
                            <Users className="w-3.5 h-3.5" />
                            <span>I'm facing this too</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      {/* HOW CAMPUSFIX WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">How CampusFix Works</h2>
          <p className="text-sm text-[#64748b] mt-2">
            A simple 5-step process to solve campus problems together.
          </p>
        </div>

        {/* 5 Steps Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Find an Issue',
              desc: 'Explore existing problems in your campus or hostel.',
              icon: Layers,
            },
            {
              step: '02',
              title: 'Confirm Together',
              desc: 'If you face the same issue, click "I\'m facing this too".',
              icon: ThumbsUp,
              highlight: true,
            },
            {
              step: '03',
              title: 'Real Priority',
              desc: 'More confirmations show actual impact and priority.',
              icon: Flame,
            },
            {
              step: '04',
              title: 'Management Resolves',
              desc: 'Admin assigns staff and updates the status.',
              icon: Clock,
            },
            {
              step: '05',
              title: 'Students Verify',
              desc: 'Confirm if the issue is fixed or reopen it if not.',
              icon: RotateCcw,
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className={`bg-white border rounded-xl p-5 text-center flex flex-col justify-between transition-all ${
                  item.highlight
                    ? 'border-[#16a34a] ring-2 ring-emerald-400 shadow-md bg-emerald-50/30'
                    : 'border-[#e2e8f0] hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="text-xs font-black text-[#16a34a] bg-emerald-100 px-2 py-0.5 rounded-md">
                    Step {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#14532d] text-white flex items-center justify-center mx-auto my-3 shadow-2xs">
                    <Icon className="w-5 h-5 text-emerald-300" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0f172a] mb-1.5">{item.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* BUILT FOR A BETTER CAMPUS */}
      <section id="features" className="bg-slate-50 py-12 border-y border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">Built for a Better Campus</h2>
            <p className="text-sm text-[#64748b] mt-2">
              Designed specifically for Wi-Fi outages, water leaks, electrical faults, cleanliness, and classroom facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#ecfdf5] text-[#14532d] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#0f172a] text-base mb-1">Community Driven</h4>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Empowers students to unite behind shared issues rather than filing 50 duplicate complaints.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#ecfdf5] text-[#14532d] flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="font-extrabold text-[#0f172a] text-base mb-1">Faster Resolution</h4>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Smart priority algorithm flags urgent, high-affected issues directly to maintenance heads.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#ecfdf5] text-[#14532d] flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-extrabold text-[#0f172a] text-base mb-1">Transparent Tracking</h4>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Real-time status updates from reported to assigned, in-progress, and verified fixed.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#e2e8f0] rounded-xl shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#ecfdf5] text-[#14532d] flex items-center justify-center mb-4">
                <Smile className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-extrabold text-[#0f172a] text-base mb-1">Happier Campus</h4>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Replaces student frustration with active resolution accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#14532d] to-[#166534] rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to make a difference?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
            Explore existing issues or report a new one and be a part of positive campus change.
          </p>
          <div className="pt-2">
            <Button
              variant="accent"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate('/signup')}
            >
              Get Started Now →
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
