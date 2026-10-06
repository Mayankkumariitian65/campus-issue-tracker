# CampusFix

CampusFix is a campus and hostel issue tracker built around one shared report per problem. Students can find or confirm an existing issue, follow its status, and verify a resolution. Admins can prioritize the queue, assign a team, and update the issue lifecycle.

## Run locally

```sh
npm install
npm run dev
```

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Student | `aarav@campus.edu` | `password123` |
| Admin | `admin@campus.edu` | `password123` |

Students can also create an account with a unique email and a password containing at least eight characters, a number, and a special character. Admin access is provisioned; it cannot be selected during signup.

## Main workflows

- Search and filter campus/hostel issues by category, priority, status, or impact.
- Report an issue with a location, description, optional photos, text-based category/severity suggestions, and a similar-issue review.
- Confirm an active issue once per student; affected-student counts and priority are derived from the confirmation ledger.
- Assign an issue and move it through Reported, Assigned, In Progress, and Resolved.
- Let a student who reported or confirmed the issue verify it as Closed or return it to the queue as Reopened.
- Review live issue totals and campus/hostel and category impact in admin analytics.

## Validation

```sh
npm run build
npm run lint
```

## Prototype boundaries

This repository is a frontend-only MVP. Accounts, issues, confirmations, and photos are stored in the current browser's local storage; they do not synchronize across users or devices. Browser-side role checks are for the demo and are not a security boundary. Production use requires a server-authenticated backend, database authorization, and server-side validation. Password reset and OAuth are not configured. Issue classification is transparent text-based suggestion logic, not an external AI model.