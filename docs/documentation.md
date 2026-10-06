CampusFix --- Documentation
1. Project Overview
CampusFix is a campus issue reporting and resolution platform
designed to make it easier for students to report real campus and hostel
problems, confirm issues already reported by others, track their
progress, and verify when problems are actually resolved.
Instead of multiple students reporting the same problem separately,
CampusFix creates one shared issue with visible student impact. This
helps campus management understand which problems are most urgent and
prioritize them more effectively.
Core idea
Report Once. Confirm Together. Resolve Faster.

CampusFix connects students and campus management through a transparent,
community-driven issue tracking workflow.
2. Problem Statement
Students regularly face problems such as:
- Wi-Fi and internet failures
- Water supply issues
- Electricity and street-light problems
- Classroom or laboratory equipment failures
- Cleanliness and maintenance issues
- Hostel facility problems
- Transport delays
- Other campus infrastructure concerns
Traditional complaint systems often create several problems:
1. The same issue may be reported multiple times.
2. Management may not know how many students are affected.
3. Students have limited visibility into complaint status.
4. Urgent issues can be difficult to prioritize.
5. Students may not know whether an existing complaint has already been
   raised.
6. There is often no clear confirmation that a resolved issue is
   actually fixed.
CampusFix addresses these problems through a single, transparent issue
lifecycle.
3. Proposed Solution
CampusFix provides two connected experiences.
Student side
Students can:
- Browse existing campus and hostel issues.
- Search and filter issues.
- Report a new issue.
- Upload photos as evidence.
- Confirm an existing issue using "I'm facing this too."
- See how many students are affected.
- Track reported and confirmed issues.
- Comment on issues.
- Receive status updates.
- Verify a resolution.
Administration side
Administrators can:
- View all reported issues.
- Monitor issue status and priority.
- See affected locations.
- Manage students and users.
- Analyze issue categories and trends.
- Update issue status.
- Manage announcements and reports.
- Monitor campus-wide issue activity.
4. Key Innovation
The main differentiator of CampusFix is community-based
confirmation.
A student does not need to create a duplicate complaint when another
student has already reported the same problem.
For example:
Student A reports: "Wi-Fi Not Working --- Hostel Block A."

Other students can select:
"I'm facing this too."

The number of confirmations becomes an indicator of real student impact.
This creates a simple priority signal:
More confirmations → Greater visible impact → Better prioritization
5. User Flow
Student Flow
Landing Page
      ↓
Login / Sign Up
      ↓
Browse Existing Issues
      ↓
 ┌───────────────┐
 │ Existing issue│
 └───────┬───────┘
         ↓
 “I'm facing this too”
         ↓
 Impact increases
         ↓
 Management sees priority
         ↓
 Issue status updated
         ↓
 Student verifies resolution
New Issue Flow
Login
  ↓
Report Issue
  ↓
Choose Campus / Hostel
  ↓
Enter Title & Description
  ↓
Select Category & Location
  ↓
Select Severity
  ↓
Upload Photos
  ↓
AI Suggestions
  ↓
Submit Issue
  ↓
Management Review
  ↓
In Progress
  ↓
Resolved
  ↓
Student Verification
6. Issue Lifecycle
CampusFix uses a transparent issue lifecycle:
Reported
   ↓
Under Review
   ↓
In Progress
   ↓
Resolved
   ↓
Verified
If the student finds that the problem has not actually been fixed, the
issue can be reopened or followed up instead of being treated as
successfully resolved.
7. AI-Assisted Reporting
CampusFix includes an AI-assisted suggestion layer during issue
reporting.
Based on the student's description and uploaded images, the system can
suggest:
- Issue category
- Severity
- Similar existing issues
Example:
Student description:
“Wi-Fi is not working on the second floor of Hostel Block A.”

AI suggestion:
Category → Wi-Fi & Internet
Severity → High
Similar issue → Wi-Fi Not Working
The suggestions remain editable by the student before submission.
The goal is to reduce incorrect categorization and help management
receive cleaner, more actionable reports.
8. Main Features
8.1 Landing Page
The landing page introduces CampusFix and communicates its core value
proposition:
- Report campus problems
- Confirm existing problems
- Track real impact
- Faster resolution
- Transparent tracking
8.2 Get Started
The Get Started experience explains why students should join CampusFix
and guides them toward account creation or login.
8.3 Login
Students and administrators can access the platform through role-based
login.
8.4 Sign Up
Students can create an account by providing:
- Full name
- Email address
- Password
- Campus
- Hostel / Block where applicable
8.5 Browse Issues
Students can explore reported issues using:
- Campus / Hostel tabs
- Search
- Category filters
- Priority filters
- Status filters
- Sorting
Each issue displays relevant information such as location, priority,
affected students and current status.
8.6 Report Issue
Students can submit a new issue with:
- Issue title
- Description
- Category
- Location
- Severity
- Photos
- Affected area
The interface also provides AI-assisted suggestions and reporting tips.
8.7 My Activity
Students can track:
- Issues reported by them
- Issues confirmed by them
- Comments
- Current status
- Resolved issues
- Verification activity
- Overall student impact
8.8 Student Profile
The student profile contains:
- Personal information
- Academic details
- Hostel and location
- Account preferences
- Security settings
- Personal issue impact
8.9 Admin Dashboard
The admin dashboard provides a campus-wide overview including:
- Total issues
- Issues in progress
- Resolved issues
- Registered students
- Issue status distribution
- Issues by category
- Location-wise issues
- Recent issues
- Search and filtering
- Export and management actions
8.10 Admin Profile
Administrators can manage:
- Personal information
- Professional information
- Account settings
- Notifications
- Security
- Preferences
- Administrative permissions
9. Design System
CampusFix follows a clean and modern campus-management visual language.
Primary visual direction
- Green: trust, growth and positive resolution
- White: clarity and simplicity
- Dark navy: readable headings and professional contrast
- Soft blue: information and navigation
- Orange / yellow: medium priority and warnings
- Red: high-priority or urgent issues
- Purple: secondary information and activity states
Design principles
- Clear visual hierarchy
- Minimal cognitive load
- Consistent cards and spacing
- Strong call-to-action buttons
- Responsive dashboard layouts
- Accessible status and priority indicators
- Real-world campus imagery
- Student-friendly language
10. Designed Screens
All finalized UI designs are stored inside the repository under:
docs/designed/
Current design files:
docs/
└── designed/
    ├── landing.png
    ├── getstarted.png
    ├── login.png
    ├── signup.png
    ├── browse-issues.png
    ├── report-issue.png
    ├── my-activity.png
    ├── profile.png
    ├── admin-dashboard.png
    └── admin-profile.png
These screens represent the primary CampusFix student and administrator
experience.
11. Information Architecture
Student Navigation
Dashboard
├── Browse Issues
├── Report Issue
├── My Activity
├── Profile
├── Settings
└── Logout
Admin Navigation
Dashboard
├── Issues Management
├── Students
├── Locations
├── Analytics
├── Reports
├── Announcements
├── User Management
├── Settings
├── My Profile
└── Logout
12. Issue Categories
CampusFix can organize issues into categories such as:
- Wi-Fi & Internet
- Water Supply
- Electricity
- Cleanliness
- Classroom & Labs
- Hostel Facilities
- Maintenance
- Transport
- Other
Categories make issue discovery, filtering and management easier.
13. Priority Model
CampusFix supports multiple severity levels:
Low
Minor issue with limited impact.
Medium
Moderate issue affecting normal campus activity.
High
Major issue requiring attention.
Critical
Urgent issue affecting many students or creating significant disruption.
Priority can be supported by the issue description, AI suggestions and
community confirmations.
14. Transparency and Trust
CampusFix is designed around visible progress.
Students should be able to understand:
- What was reported
- Where it was reported
- How many students are affected
- What priority it has
- Who is responsible for resolving it
- What its current status is
- Whether it has actually been verified
This reduces uncertainty and encourages students to participate
constructively.
15. Impact
CampusFix aims to create a better campus experience through:
Community Driven Reporting
Students collectively identify and confirm real problems.
Faster Resolution
Management receives clearer signals about important issues.
Transparent Tracking
Students can follow progress instead of repeatedly asking for updates.
Better Prioritization
Issue impact and severity help management focus on the problems that
matter most.
Happier Campus
A feedback loop between students and management creates a more
responsive campus environment.
16. Example Scenario
Problem
27 students in Hostel Block A are unable to access Wi-Fi.
Traditional approach
Several students submit separate complaints.
Result:
Duplicate complaints
        ↓
Unclear impact
        ↓
Difficult prioritization
CampusFix approach
One student reports the Wi-Fi issue.
Other affected students select:
"I'm facing this too."
The issue now shows:
Wi-Fi Not Working
Hostel Block A
High Priority
27 students affected
Management can identify the issue as a high-impact problem and update
its status.
After repair, students verify whether the Wi-Fi is actually working.
17. Expected Benefits
For Students
- Easier issue reporting
- Less duplicate reporting
- Real-time visibility
- Community confirmation
- Faster communication
- Resolution verification
For Management
- Centralized issue management
- Better prioritization
- Location-wise insights
- Category-level analytics
- Clear student impact
- Better accountability
For Institutions
- Improved campus operations
- Data-driven maintenance decisions
- Higher student satisfaction
- Better transparency
- Centralized feedback management
18. Future Scope
CampusFix can be extended with:
1. Mobile applications for Android and iOS.
2. Real-time push notifications.
3. Advanced AI image classification.
4. Automatic duplicate issue detection.
5. Predictive maintenance using historical issue data.
6. QR-based location reporting.
7. Integration with campus ERP systems.
8. Staff assignment and maintenance-team tracking.
9. SLA and response-time monitoring.
10. Institution-level analytics and reporting.
11. Multi-campus management.
12. Multilingual support.
13. Anonymous reporting for sensitive issues.
14. Emergency escalation workflows.
15. Technology Direction
The interface is designed to support a modern web application
architecture.
A possible implementation stack includes:
- Frontend: React / modern web technologies
- Backend: Node.js and Express
- Database: MongoDB or SQL-based database
- AI Layer: Machine-learning / AI service for classification and
  similarity suggestions
- Authentication: Secure role-based authentication
- Deployment: Cloud-based deployment
- Version Control: GitHub
The architecture can be adapted according to implementation
requirements.
20. Security and Privacy Considerations
CampusFix should protect user information through:
- Secure authentication
- Role-based authorization
- Password hashing
- Input validation
- Secure API endpoints
- Protected personal information
- Controlled administrator access
- Secure image/file handling
- Audit logs for important administrative actions
Only information required for issue reporting, communication and
management should be collected.
21. Success Metrics
The effectiveness of CampusFix can be measured using:
- Number of issues reported
- Percentage of duplicate reports reduced
- Average confirmation count per issue
- Average time to first response
- Average time to resolution
- Percentage of issues verified by students
- Number of active students
- Student satisfaction
- Recurring issue rate
These metrics can help institutions continuously improve campus
services.
22. Repository Structure
The project documentation is organized as:
campus-issue-tracker/
│
├── docs/
│   ├── documentation.md
│   ├── idea-origin.md
│   ├── solution.md
│   ├── user-flow.md
│   │
│   └── designed/
│       ├── landing.png
│       ├── getstarted.png
│       ├── login.png
│       ├── signup.png
│       ├── browse-issues.png
│       ├── report-issue.png
│       ├── my-activity.png
│       ├── profile.png
│       ├── admin-dashboard.png
│       └── admin-profile.png
│
└── README.md
23. Conclusion
CampusFix transforms campus complaints into a collaborative
issue-resolution system.
Instead of students repeatedly reporting the same problem, CampusFix
allows them to report once, confirm together, understand real impact,
track progress, and verify resolution.
For campus management, this creates a structured way to understand what
is happening across campus, identify high-impact issues and make better
operational decisions.
CampusFix --- Report Once. Confirm Together. Build a Better
Campus.
