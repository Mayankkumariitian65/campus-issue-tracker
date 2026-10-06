import { createClient } from '@supabase/supabase-js'

// Default fallback environment variables for local development/hackathon demo
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-campusfix-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Core Database Types matching CampusFix Supabase Blueprint
export type Role = 'student' | 'admin'
export type AreaType = 'campus' | 'hostel'
export type Severity = 'low' | 'medium' | 'high' | 'critical'
export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type IssueStatus = 'reported' | 'assigned' | 'in_progress' | 'resolved' | 'closed' | 'reopened'

export interface Profile {
  id: string
  name: string
  email: string
  role: Role
  campus: string
  hostel?: string
  block?: string
  created_at: string
}

export interface Issue {
  id: string
  title: string
  description: string
  area_type: AreaType
  category: string
  location: string
  severity: Severity
  priority: Priority
  status: IssueStatus
  affected_count: number
  created_by: string
  creator_name?: string
  assigned_to?: string
  assignee_name?: string
  image_url?: string
  image_urls?: string[]
  resolution_notes?: string
  verified_by_student?: boolean | null
  created_at: string
  updated_at: string
}

export interface IssueConfirmation {
  id: string
  issue_id: string
  user_id: string
  created_at: string
}

export interface IssueStatusHistory {
  id: string
  issue_id: string
  status: IssueStatus
  changed_by: string
  changer_name?: string
  notes?: string
  created_at: string
}

export interface IssueAssignment {
  id: string
  issue_id: string
  assigned_to: string
  assigned_by: string
  created_at: string
}
