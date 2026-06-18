# Sena Medical Hospital Website Architecture Roadmap

## Current Project Snapshot

Sena Medical Hospital is a Next.js App Router hospital management demo with a public marketing site, patient portal, doctor workspace, admin dashboard, Prisma data layer, and NextAuth credential login.

Current stack:

- Frontend: Next.js 16, React 19, Tailwind CSS 4, Lucide icons, Recharts.
- Backend: Next.js route handlers under `app/api`.
- Auth: NextAuth credentials provider with JWT sessions and middleware role checks.
- Data: Prisma models for users, departments, doctors, patients, appointments, medical notes, prescriptions, and health reports.
- Main surfaces: `/`, `/login`, `/register`, `/patient`, `/doctor`, `/admin`.

The project already has a strong UI direction and useful demo flows. The main work now is turning simulated or partial flows into reliable, secure, database-backed workflows.

## What Should Be Solved First

### 1. Environment And Dependency Consistency

Issues:

- `README.md` says Next.js 15, while `package.json` uses Next.js 16.
- Prisma datasource is PostgreSQL, but SQLite database files are committed as `dev.db` and `prisma/dev.db`.
- Prisma client output is committed under `prisma/client` and duplicated under `prisma/prisma/client`.
- `lib/prisma.ts` imports from `../prisma/client` instead of the normal `@prisma/client` package.
- Lint could not run in this workspace because dependencies are not installed.

Solve:

- Pick one database target for development and production. Recommended: PostgreSQL for both.
- Remove committed generated Prisma clients and local database files from the repository.
- Use `import { PrismaClient } from "@prisma/client"` in `lib/prisma.ts`.
- Update README setup instructions to match the actual Next.js and Prisma versions.
- Add `.env.example` values that are realistic but safe.
- Ensure `npm install`, `npx prisma generate`, `npx prisma db push`, `npm run lint`, and `npm run build` work from a clean clone.

### 2. Security And Role Authorization

Issues:

- `/api/register` accepts a client-provided `role`, allowing anyone to register as doctor or admin.
- `/api/health-reports` lets doctors see all reports, not only reports for their own patients.
- `/api/debug/patient` should not exist in production.
- Some clinical actions are client-only alerts with no server authorization.
- Medical data is sensitive, so access boundaries must be strict even for a demo.

Solve:

- Force public registration to create only `PATIENT` users.
- Move doctor/admin creation behind admin-only APIs.
- Add server-side authorization checks to every clinical API.
- Restrict doctor data access to assigned or appointment-linked patients.
- Remove or guard debug routes.
- Add consistent 401, 403, 404, and validation error responses.

### 3. Appointment Workflow Completion

Issues:

- Patients can create appointments, but booking time slot handling is incomplete.
- The booking page collects a time slot, but only sends the date.
- Doctor approve/cancel buttons update local state only and do not persist.
- There is no appointment status update route.
- There is no slot availability model, no double-booking prevention, and no cancellation rules.

Solve:

- Store full appointment datetime from date and time inputs.
- Add `PATCH /api/appointments/[id]` for status changes.
- Enforce allowed transitions: `PENDING -> APPROVED`, `PENDING -> CANCELLED`, `APPROVED -> COMPLETED`, `APPROVED -> CANCELLED`.
- Check doctor ownership before allowing status updates.
- Add doctor availability and appointment conflict validation.
- Show patient and doctor confirmation states from database, not local-only state.

### 4. Medical Records, Notes, And Prescriptions

Issues:

- Doctor patient record page states that real endpoints are missing.
- Clinical notes and prescriptions only show alerts.
- Prescription duration input updates `dosage` instead of `duration`.
- Patient records pages are partly mock-driven.

Solve:

- Add `/api/patients/[id]` for doctor-scoped patient details.
- Add `/api/medical-notes` and `/api/prescriptions` route handlers.
- Persist clinical notes and prescriptions with doctor and patient ownership.
- Expose patient-facing record history under `/patient/records`.
- Fix the prescription duration state bug.
- Add audit timestamps and clear read/write boundaries.

### 5. Data Modeling Improvements

Issues:

- Roles, appointment statuses, and gender are plain strings.
- Health report vitals are stored as a string instead of structured JSON.
- There is no availability, room, payment, notification, audit log, or file attachment model.
- Admin metrics are hardcoded.

Solve:

- Convert roles and statuses to Prisma enums.
- Store vitals as `Json`.
- Add models for doctor availability, notifications, payments, medical files, audit logs, and possibly departments/services.
- Add indexes for common queries: user email, doctor department, appointment patient/date, appointment doctor/date, report patient/date.
- Define cascade behavior intentionally for clinical data retention.

### 6. UI And Product Coherence

Issues:

- The UI is polished but demo-heavy, with hardcoded vitals, insurance, stats, notifications, activity logs, and analytics.
- Some dashboard numbers are not derived from real data.
- Patient, doctor, and admin pages repeat layout and card patterns.
- Alerts are used for important workflows instead of toast or inline states.

Solve:

- Replace hardcoded dashboard widgets with server-backed data.
- Add loading, empty, error, and success states consistently.
- Build shared dashboard layout components.
- Use toasts and inline validation instead of `alert`.
- Add role-aware navigation and breadcrumbs.
- Keep public marketing separate from authenticated portal navigation.

## Target Website Architecture

### Route Architecture

Public routes:

- `/`: landing page with hero, services, doctors, stats, FAQ, contact.
- `/login`: credential login and role-based redirect.
- `/register`: patient-only self-registration.

Patient portal:

- `/patient`: dashboard summary.
- `/patient/book`: appointment booking.
- `/patient/appointments`: appointment history and upcoming visits.
- `/patient/status`: health report submission.
- `/patient/reports`: submitted health reports.
- `/patient/records`: medical notes, prescriptions, files, and visit history.
- `/patient/payment`: payment status and invoice flow.

Doctor portal:

- `/doctor`: clinical dashboard and schedule.
- `/doctor/patient/[id]`: scoped patient EMR.
- `/doctor/appointments`: schedule management.
- `/doctor/reports`: patient submitted reports.
- `/doctor/notes`: recent notes or drafts.

Admin portal:

- `/admin`: operational dashboard.
- `/admin/users`: user and role management.
- `/admin/doctors`: doctor profiles and availability.
- `/admin/departments`: department/service management.
- `/admin/appointments`: global appointment operations.
- `/admin/audit`: access and activity logs.
- `/admin/settings`: hospital settings.

### API Architecture

Auth:

- `POST /api/register`: create patient account only.
- `GET /api/auth/session`: provided by NextAuth.
- Admin-only user management routes for doctor/admin creation.

Appointments:

- `GET /api/appointments`: role-aware list.
- `POST /api/appointments`: patient creates appointment.
- `PATCH /api/appointments/[id]`: doctor/admin updates status.
- `DELETE /api/appointments/[id]`: patient/admin cancellation with rules.

Doctors and departments:

- `GET /api/doctors`: public-safe doctor list.
- `GET /api/doctors/[id]/availability`: available slots.
- `POST /api/admin/doctors`: admin creates doctor.
- `PATCH /api/admin/doctors/[id]`: admin updates doctor.
- `GET/POST/PATCH /api/admin/departments`.

Patients and records:

- `GET /api/patients/[id]`: doctor/admin scoped EMR.
- `GET /api/patient/me`: current patient profile.
- `PATCH /api/patient/me`: patient profile update.
- `GET/POST /api/medical-notes`: doctor-scoped notes.
- `GET/POST /api/prescriptions`: doctor-scoped prescriptions.
- `GET/POST /api/health-reports`: patient submit, role-scoped read.

Operational systems:

- `GET/POST /api/notifications`.
- `GET/POST /api/payments`.
- `GET /api/admin/metrics`.
- `GET /api/admin/audit`.

### Data Architecture

Recommended core models:

- `User`: identity, email, password hash, role, image.
- `Patient`: patient profile and demographics.
- `Doctor`: provider profile, specialty, department.
- `Department`: hospital department/service.
- `DoctorAvailability`: recurring or dated availability slots.
- `Appointment`: patient, doctor, datetime, status, reason, cancellation metadata.
- `HealthReport`: patient-submitted status and structured vitals.
- `MedicalNote`: doctor-authored clinical note.
- `Prescription`: medication, dosage, frequency, duration, instructions.
- `MedicalFile`: lab reports, imaging, discharge summaries, attachments.
- `Payment`: invoice/payment simulation or real payment record.
- `Notification`: user notifications.
- `AuditLog`: sensitive access and write actions.

Recommended enums:

- `Role`: `ADMIN`, `DOCTOR`, `PATIENT`.
- `AppointmentStatus`: `PENDING`, `APPROVED`, `COMPLETED`, `CANCELLED`, `NO_SHOW`.
- `PaymentStatus`: `PENDING`, `PAID`, `FAILED`, `REFUNDED`.
- `NotificationType`: `APPOINTMENT`, `REPORT`, `PAYMENT`, `SYSTEM`.

### Component Architecture

Layout:

- `components/layout/PublicLayout`
- `components/layout/PortalLayout`
- `components/layout/DashboardShell`
- `components/layout/RoleNavigation`

Shared UI:

- `components/ui/Button`
- `components/ui/Input`
- `components/ui/Select`
- `components/ui/Textarea`
- `components/ui/Badge`
- `components/ui/Table`
- `components/ui/EmptyState`
- `components/ui/ErrorState`
- `components/ui/Stat`
- `components/ui/Modal`

Domain components:

- `components/appointments/AppointmentForm`
- `components/appointments/AppointmentTable`
- `components/appointments/StatusBadge`
- `components/patients/VitalsGrid`
- `components/patients/HealthReportForm`
- `components/patients/MedicalTimeline`
- `components/doctors/ClinicalNoteEditor`
- `components/doctors/PrescriptionForm`
- `components/admin/UserManagementTable`

Data access:

- Keep Prisma calls in server route handlers or server actions.
- Put reusable authorization helpers in `lib/authz.ts`.
- Put validation schemas in `lib/validators`.
- Put route-safe serializers in `lib/serializers`.

## Implementation Roadmap

### Phase 1: Stabilize The Foundation

Goal: make the project clean, installable, and buildable.

- Install dependencies and verify scripts.
- Fix Prisma import to use `@prisma/client`.
- Remove generated Prisma client and database files from git.
- Align README, package versions, and environment setup.
- Add `.env.example` for local PostgreSQL.
- Add a clean seed with admin, one doctor, one patient, department, appointment, and sample reports.
- Confirm `npm run lint` and `npm run build`.

Exit criteria:

- A fresh developer can clone, configure env, seed, lint, build, and run the app.

### Phase 2: Secure Auth And Access Control

Goal: protect role boundaries and sensitive data.

- Lock public registration to patient accounts.
- Add admin-only doctor/admin creation.
- Add `lib/authz.ts` helpers: `requireUser`, `requireRole`, `requirePatient`, `requireDoctor`.
- Apply authorization to all route handlers.
- Remove or protect debug routes.
- Add role-scoped data filtering for health reports and patient records.

Exit criteria:

- Patients cannot access other patients' data.
- Doctors can access only their appointment-linked patients.
- Admin-only actions are impossible from public registration.

### Phase 3: Complete Appointment System

Goal: make booking and clinical schedule workflows real.

- Combine booking date and time slot into one datetime.
- Add availability and conflict checks.
- Add appointment status update API.
- Persist doctor approve, cancel, and complete actions.
- Add patient cancellation with rules.
- Replace local-only status changes with API calls and toasts.

Exit criteria:

- Appointment lifecycle is fully database-backed for patient and doctor portals.

### Phase 4: Complete EMR Workflows

Goal: make records, notes, reports, and prescriptions real.

- Add patient detail API scoped to doctor/admin access.
- Persist clinical notes.
- Persist prescriptions.
- Store vitals as structured JSON.
- Build patient medical timeline.
- Show prescriptions and notes to patients where appropriate.
- Add audit logs for viewing and changing medical records.

Exit criteria:

- Doctor EMR page can create real notes and prescriptions.
- Patient records page reflects actual clinical data.

### Phase 5: Admin Operations

Goal: turn admin dashboard from mock analytics into operational controls.

- Build user management.
- Build doctor and department management.
- Build appointment oversight.
- Replace hardcoded stats with `/api/admin/metrics`.
- Add audit log viewer.
- Add admin settings for hospital profile and contact information.

Exit criteria:

- Admin can manage core hospital data without database/manual seed edits.

### Phase 6: Notifications, Payments, And Communication

Goal: add supporting hospital workflows.

- Add notification model and APIs.
- Notify patients when appointments change status.
- Notify doctors when health reports are submitted.
- Replace mock payment page with invoice/payment records.
- Keep payment clearly simulated unless a real provider is added.
- Add email or SMS integration later if needed.

Exit criteria:

- Important workflow events produce persistent notifications.
- Payment status is saved and visible in patient/admin surfaces.

### Phase 7: Quality, Testing, And Production Readiness

Goal: make the app reliable enough for deployment.

- Add route handler tests for authorization and workflows.
- Add component tests for forms and dashboard states.
- Add end-to-end tests for registration, login, booking, doctor approval, and record creation.
- Add input validation with schemas.
- Add error logging and safe error responses.
- Add rate limiting for auth and public forms.
- Add deployment checklist for Vercel and PostgreSQL.

Exit criteria:

- Critical workflows are covered by automated tests.
- Production deployment uses safe env vars, clean database migrations, and no debug data routes.

## Priority Backlog

High priority:

- Prevent role escalation in registration.
- Persist doctor appointment status updates.
- Fix booking time not being submitted.
- Replace doctor access to all health reports with scoped access.
- Remove generated Prisma clients and database files from source control.
- Fix Prisma client import.
- Add validation to appointment and health report APIs.
- Fix prescription duration state update.

Medium priority:

- Add patient detail, medical notes, and prescription APIs.
- Convert string fields to enums.
- Store vitals as JSON.
- Replace hardcoded dashboard metrics.
- Add loading, empty, and error states.
- Replace browser alerts with toasts.

Lower priority:

- Add notification center.
- Add payment/invoice records.
- Add admin analytics.
- Add file attachments for lab reports.
- Add audit log UI.
- Improve shared component system.

## Suggested Milestone Order

1. Clean install and build reliability.
2. Auth and authorization hardening.
3. Appointment booking and approval lifecycle.
4. Doctor EMR persistence.
5. Patient records and reports completion.
6. Admin management surfaces.
7. Notifications, payments, audit logs, and tests.

