/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as HelpDeskImport } from './routes/help-desk'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as TeacherIndexImport } from './routes/teacher/index'
import { Route as ParentIndexImport } from './routes/parent/index'
import { Route as AuthIndexImport } from './routes/auth/index'
import { Route as AdminIndexImport } from './routes/admin/index'
import { Route as TeacherDashboardImport } from './routes/teacher/dashboard'
import { Route as ParentDashboardImport } from './routes/parent/dashboard'
import { Route as ParentCommunicationsImport } from './routes/parent/communications'
import { Route as AuthRegisterSchoolImport } from './routes/auth/register-school'
import { Route as AuthRegisterImport } from './routes/auth/register'
import { Route as AuthLoginImport } from './routes/auth/login'
import { Route as AdminDashboardImport } from './routes/admin/dashboard'
import { Route as TeacherCommunicationIndexImport } from './routes/teacher/communication/index'
import { Route as TeacherClassesIndexImport } from './routes/teacher/classes/index'
import { Route as AdminStudentManagementIndexImport } from './routes/admin/student-management/index'
import { Route as AdminStaffManagementIndexImport } from './routes/admin/staff-management/index'
import { Route as AdminSettingsIndexImport } from './routes/admin/settings/index'
import { Route as AdminSchoolIndexImport } from './routes/admin/school/index'
import { Route as AdminReportsIndexImport } from './routes/admin/reports/index'
import { Route as AdminClassManagementIndexImport } from './routes/admin/class-management/index'
import { Route as TeacherAuthResetPasswordImport } from './routes/teacher/auth/reset-password'
import { Route as ParentStudentIdImport } from './routes/parent/student.$id'
import { Route as ParentAuthResetPasswordImport } from './routes/parent/auth/reset-password'
import { Route as AdminAuthResetPasswordImport } from './routes/admin/auth/reset-password'
import { Route as TeacherClassesIdIndexImport } from './routes/teacher/classes/id/index'
import { Route as AdminClassManagementIdIndexImport } from './routes/admin/class-management/$id/index'
import { Route as TeacherClassesIdAssesmentsImport } from './routes/teacher/classes/id/assesments'
import { Route as AdminStudentManagementStudentIdImport } from './routes/admin/student-management/student.$id'
import { Route as AdminStaffManagementStafferIdImport } from './routes/admin/staff-management/staffer.$id'
import { Route as TeacherClassesIdStudentIdImport } from './routes/teacher/classes/id/student.$id'
import { Route as AdminClassManagementIdSubjectIdImport } from './routes/admin/class-management/$id/subject.$id'
import { Route as AdminClassManagementIdStudentIdImport } from './routes/admin/class-management/$id/student.$id'

// Create/Update Routes

const HelpDeskRoute = HelpDeskImport.update({
  path: '/help-desk',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TeacherIndexRoute = TeacherIndexImport.update({
  path: '/teacher/',
  getParentRoute: () => rootRoute,
} as any)

const ParentIndexRoute = ParentIndexImport.update({
  path: '/parent/',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/auth/',
  getParentRoute: () => rootRoute,
} as any)

const AdminIndexRoute = AdminIndexImport.update({
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any)

const TeacherDashboardRoute = TeacherDashboardImport.update({
  path: '/teacher/dashboard',
  getParentRoute: () => TeacherIndexRoute,
} as any)

const ParentDashboardRoute = ParentDashboardImport.update({
  path: '/parent/dashboard',
  getParentRoute: () => ParentIndexRoute,
} as any)

const ParentCommunicationsRoute = ParentCommunicationsImport.update({
  path: '/parent/communications',
  getParentRoute: () => ParentIndexRoute,
} as any)

const AuthRegisterSchoolRoute = AuthRegisterSchoolImport.update({
  path: '/auth/register-school',
  getParentRoute: () => AuthIndexRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  path: '/auth/register',
  getParentRoute: () => AuthIndexRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/auth/login',
  getParentRoute: () => AuthIndexRoute,
} as any)

const AdminDashboardRoute = AdminDashboardImport.update({
  path: '/admin/dashboard',
  getParentRoute: () => AdminIndexRoute,
} as any)

const TeacherCommunicationIndexRoute = TeacherCommunicationIndexImport.update({
  path: '/teacher/communication/',
  getParentRoute: () => TeacherIndexRoute,
} as any)

const TeacherClassesIndexRoute = TeacherClassesIndexImport.update({
  path: '/teacher/classes/',
  getParentRoute: () => TeacherIndexRoute,
} as any)

const AdminStudentManagementIndexRoute =
  AdminStudentManagementIndexImport.update({
    path: '/admin/student-management/',
    getParentRoute: () => AdminIndexRoute,
  } as any)

const AdminStaffManagementIndexRoute = AdminStaffManagementIndexImport.update({
  path: '/admin/staff-management/',
  getParentRoute: () => AdminIndexRoute,
} as any)

const AdminSettingsIndexRoute = AdminSettingsIndexImport.update({
  path: '/admin/settings/',
  getParentRoute: () => AdminIndexRoute,
} as any)

const AdminSchoolIndexRoute = AdminSchoolIndexImport.update({
  path: '/admin/school/',
  getParentRoute: () => AdminIndexRoute,
} as any)

const AdminReportsIndexRoute = AdminReportsIndexImport.update({
  path: '/admin/reports/',
  getParentRoute: () => AdminIndexRoute,
} as any)

const AdminClassManagementIndexRoute = AdminClassManagementIndexImport.update({
  path: '/admin/class-management/',
  getParentRoute: () => AdminIndexRoute,
} as any)

const TeacherAuthResetPasswordRoute = TeacherAuthResetPasswordImport.update({
  path: '/teacher/auth/reset-password',
  getParentRoute: () => TeacherIndexRoute,
} as any)

const ParentStudentIdRoute = ParentStudentIdImport.update({
  path: '/parent/student/$id',
  getParentRoute: () => ParentIndexRoute,
} as any)

const ParentAuthResetPasswordRoute = ParentAuthResetPasswordImport.update({
  path: '/parent/auth/reset-password',
  getParentRoute: () => ParentIndexRoute,
} as any)

const AdminAuthResetPasswordRoute = AdminAuthResetPasswordImport.update({
  path: '/admin/auth/reset-password',
  getParentRoute: () => AdminIndexRoute,
} as any)

const TeacherClassesIdIndexRoute = TeacherClassesIdIndexImport.update({
  path: '/teacher/classes/id/',
  getParentRoute: () => TeacherClassesIndexRoute,
} as any)

const AdminClassManagementIdIndexRoute =
  AdminClassManagementIdIndexImport.update({
    path: '/admin/class-management/$id/',
    getParentRoute: () => AdminClassManagementIndexRoute,
  } as any)

const TeacherClassesIdAssesmentsRoute = TeacherClassesIdAssesmentsImport.update(
  {
    path: '/teacher/classes/id/assesments',
    getParentRoute: () => TeacherClassesIdIndexRoute,
  } as any,
)

const AdminStudentManagementStudentIdRoute =
  AdminStudentManagementStudentIdImport.update({
    path: '/admin/student-management/student/$id',
    getParentRoute: () => AdminStudentManagementIndexRoute,
  } as any)

const AdminStaffManagementStafferIdRoute =
  AdminStaffManagementStafferIdImport.update({
    path: '/admin/staff-management/staffer/$id',
    getParentRoute: () => AdminStaffManagementIndexRoute,
  } as any)

const TeacherClassesIdStudentIdRoute = TeacherClassesIdStudentIdImport.update({
  path: '/teacher/classes/id/student/$id',
  getParentRoute: () => TeacherClassesIdIndexRoute,
} as any)

const AdminClassManagementIdSubjectIdRoute =
  AdminClassManagementIdSubjectIdImport.update({
    path: '/admin/class-management/$id/subject/$id',
    getParentRoute: () => AdminClassManagementIdIndexRoute,
  } as any)

const AdminClassManagementIdStudentIdRoute =
  AdminClassManagementIdStudentIdImport.update({
    path: '/admin/class-management/$id/student/$id',
    getParentRoute: () => AdminClassManagementIdIndexRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/help-desk': {
      id: '/help-desk'
      path: '/help-desk'
      fullPath: '/help-desk'
      preLoaderRoute: typeof HelpDeskImport
      parentRoute: typeof rootRoute
    }
    '/admin/dashboard': {
      id: '/admin/dashboard'
      path: '/admin/dashboard'
      fullPath: '/admin/dashboard'
      preLoaderRoute: typeof AdminDashboardImport
      parentRoute: typeof AdminIndexRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthIndexRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthIndexRoute
    }
    '/auth/register-school': {
      id: '/auth/register-school'
      path: '/auth/register-school'
      fullPath: '/auth/register-school'
      preLoaderRoute: typeof AuthRegisterSchoolImport
      parentRoute: typeof AuthIndexRoute
    }
    '/parent/communications': {
      id: '/parent/communications'
      path: '/parent/communications'
      fullPath: '/parent/communications'
      preLoaderRoute: typeof ParentCommunicationsImport
      parentRoute: typeof ParentIndexRoute
    }
    '/parent/dashboard': {
      id: '/parent/dashboard'
      path: '/parent/dashboard'
      fullPath: '/parent/dashboard'
      preLoaderRoute: typeof ParentDashboardImport
      parentRoute: typeof ParentIndexRoute
    }
    '/teacher/dashboard': {
      id: '/teacher/dashboard'
      path: '/teacher/dashboard'
      fullPath: '/teacher/dashboard'
      preLoaderRoute: typeof TeacherDashboardImport
      parentRoute: typeof TeacherIndexRoute
    }
    '/admin/': {
      id: '/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/': {
      id: '/auth/'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof rootRoute
    }
    '/parent/': {
      id: '/parent/'
      path: '/parent'
      fullPath: '/parent'
      preLoaderRoute: typeof ParentIndexImport
      parentRoute: typeof rootRoute
    }
    '/teacher/': {
      id: '/teacher/'
      path: '/teacher'
      fullPath: '/teacher'
      preLoaderRoute: typeof TeacherIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/auth/reset-password': {
      id: '/admin/auth/reset-password'
      path: '/admin/auth/reset-password'
      fullPath: '/admin/auth/reset-password'
      preLoaderRoute: typeof AdminAuthResetPasswordImport
      parentRoute: typeof AdminIndexRoute
    }
    '/parent/auth/reset-password': {
      id: '/parent/auth/reset-password'
      path: '/parent/auth/reset-password'
      fullPath: '/parent/auth/reset-password'
      preLoaderRoute: typeof ParentAuthResetPasswordImport
      parentRoute: typeof ParentIndexRoute
    }
    '/parent/student/$id': {
      id: '/parent/student/$id'
      path: '/parent/student/$id'
      fullPath: '/parent/student/$id'
      preLoaderRoute: typeof ParentStudentIdImport
      parentRoute: typeof ParentIndexRoute
    }
    '/teacher/auth/reset-password': {
      id: '/teacher/auth/reset-password'
      path: '/teacher/auth/reset-password'
      fullPath: '/teacher/auth/reset-password'
      preLoaderRoute: typeof TeacherAuthResetPasswordImport
      parentRoute: typeof TeacherIndexRoute
    }
    '/admin/class-management/': {
      id: '/admin/class-management/'
      path: '/admin/class-management'
      fullPath: '/admin/class-management'
      preLoaderRoute: typeof AdminClassManagementIndexImport
      parentRoute: typeof AdminIndexRoute
    }
    '/admin/reports/': {
      id: '/admin/reports/'
      path: '/admin/reports'
      fullPath: '/admin/reports'
      preLoaderRoute: typeof AdminReportsIndexImport
      parentRoute: typeof AdminIndexRoute
    }
    '/admin/school/': {
      id: '/admin/school/'
      path: '/admin/school'
      fullPath: '/admin/school'
      preLoaderRoute: typeof AdminSchoolIndexImport
      parentRoute: typeof AdminIndexRoute
    }
    '/admin/settings/': {
      id: '/admin/settings/'
      path: '/admin/settings'
      fullPath: '/admin/settings'
      preLoaderRoute: typeof AdminSettingsIndexImport
      parentRoute: typeof AdminIndexRoute
    }
    '/admin/staff-management/': {
      id: '/admin/staff-management/'
      path: '/admin/staff-management'
      fullPath: '/admin/staff-management'
      preLoaderRoute: typeof AdminStaffManagementIndexImport
      parentRoute: typeof AdminIndexRoute
    }
    '/admin/student-management/': {
      id: '/admin/student-management/'
      path: '/admin/student-management'
      fullPath: '/admin/student-management'
      preLoaderRoute: typeof AdminStudentManagementIndexImport
      parentRoute: typeof AdminIndexRoute
    }
    '/teacher/classes/': {
      id: '/teacher/classes/'
      path: '/teacher/classes'
      fullPath: '/teacher/classes'
      preLoaderRoute: typeof TeacherClassesIndexImport
      parentRoute: typeof TeacherIndexRoute
    }
    '/teacher/communication/': {
      id: '/teacher/communication/'
      path: '/teacher/communication'
      fullPath: '/teacher/communication'
      preLoaderRoute: typeof TeacherCommunicationIndexImport
      parentRoute: typeof TeacherIndexRoute
    }
    '/admin/staff-management/staffer/$id': {
      id: '/admin/staff-management/staffer/$id'
      path: '/admin/staff-management/staffer/$id'
      fullPath: '/admin/staff-management/staffer/$id'
      preLoaderRoute: typeof AdminStaffManagementStafferIdImport
      parentRoute: typeof AdminStaffManagementIndexRoute
    }
    '/admin/student-management/student/$id': {
      id: '/admin/student-management/student/$id'
      path: '/admin/student-management/student/$id'
      fullPath: '/admin/student-management/student/$id'
      preLoaderRoute: typeof AdminStudentManagementStudentIdImport
      parentRoute: typeof AdminStudentManagementIndexRoute
    }
    '/teacher/classes/id/assesments': {
      id: '/teacher/classes/id/assesments'
      path: '/teacher/classes/id/assesments'
      fullPath: '/teacher/classes/id/assesments'
      preLoaderRoute: typeof TeacherClassesIdAssesmentsImport
      parentRoute: typeof TeacherClassesIdIndexRoute
    }
    '/admin/class-management/$id/': {
      id: '/admin/class-management/$id/'
      path: '/admin/class-management/$id'
      fullPath: '/admin/class-management/$id'
      preLoaderRoute: typeof AdminClassManagementIdIndexImport
      parentRoute: typeof AdminClassManagementIndexRoute
    }
    '/teacher/classes/id/': {
      id: '/teacher/classes/id/'
      path: '/teacher/classes/id'
      fullPath: '/teacher/classes/id'
      preLoaderRoute: typeof TeacherClassesIdIndexImport
      parentRoute: typeof TeacherClassesIndexRoute
    }
    '/admin/class-management/$id/student/$id': {
      id: '/admin/class-management/$id/student/$id'
      path: '/admin/class-management/$id/student/$id'
      fullPath: '/admin/class-management/$id/student/$id'
      preLoaderRoute: typeof AdminClassManagementIdStudentIdImport
      parentRoute: typeof AdminClassManagementIdIndexRoute
    }
    '/admin/class-management/$id/subject/$id': {
      id: '/admin/class-management/$id/subject/$id'
      path: '/admin/class-management/$id/subject/$id'
      fullPath: '/admin/class-management/$id/subject/$id'
      preLoaderRoute: typeof AdminClassManagementIdSubjectIdImport
      parentRoute: typeof AdminClassManagementIdIndexRoute
    }
    '/teacher/classes/id/student/$id': {
      id: '/teacher/classes/id/student/$id'
      path: '/teacher/classes/id/student/$id'
      fullPath: '/teacher/classes/id/student/$id'
      preLoaderRoute: typeof TeacherClassesIdStudentIdImport
      parentRoute: typeof TeacherClassesIdIndexRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/help-desk': typeof HelpDeskRoute
  '/admin/dashboard': typeof AdminDashboardRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/auth/register-school': typeof AuthRegisterSchoolRoute
  '/parent/communications': typeof ParentCommunicationsRoute
  '/parent/dashboard': typeof ParentDashboardRoute
  '/teacher/dashboard': typeof TeacherDashboardRoute
  '/admin': typeof AdminIndexRoute
  '/auth': typeof AuthIndexRoute
  '/parent': typeof ParentIndexRoute
  '/teacher': typeof TeacherIndexRoute
  '/admin/auth/reset-password': typeof AdminAuthResetPasswordRoute
  '/parent/auth/reset-password': typeof ParentAuthResetPasswordRoute
  '/parent/student/$id': typeof ParentStudentIdRoute
  '/teacher/auth/reset-password': typeof TeacherAuthResetPasswordRoute
  '/admin/class-management': typeof AdminClassManagementIndexRoute
  '/admin/reports': typeof AdminReportsIndexRoute
  '/admin/school': typeof AdminSchoolIndexRoute
  '/admin/settings': typeof AdminSettingsIndexRoute
  '/admin/staff-management': typeof AdminStaffManagementIndexRoute
  '/admin/student-management': typeof AdminStudentManagementIndexRoute
  '/teacher/classes': typeof TeacherClassesIndexRoute
  '/teacher/communication': typeof TeacherCommunicationIndexRoute
  '/admin/staff-management/staffer/$id': typeof AdminStaffManagementStafferIdRoute
  '/admin/student-management/student/$id': typeof AdminStudentManagementStudentIdRoute
  '/teacher/classes/id/assesments': typeof TeacherClassesIdAssesmentsRoute
  '/admin/class-management/$id': typeof AdminClassManagementIdIndexRoute
  '/teacher/classes/id': typeof TeacherClassesIdIndexRoute
  '/admin/class-management/$id/student/$id': typeof AdminClassManagementIdStudentIdRoute
  '/admin/class-management/$id/subject/$id': typeof AdminClassManagementIdSubjectIdRoute
  '/teacher/classes/id/student/$id': typeof TeacherClassesIdStudentIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/help-desk': typeof HelpDeskRoute
  '/admin/dashboard': typeof AdminDashboardRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/auth/register-school': typeof AuthRegisterSchoolRoute
  '/parent/communications': typeof ParentCommunicationsRoute
  '/parent/dashboard': typeof ParentDashboardRoute
  '/teacher/dashboard': typeof TeacherDashboardRoute
  '/admin': typeof AdminIndexRoute
  '/auth': typeof AuthIndexRoute
  '/parent': typeof ParentIndexRoute
  '/teacher': typeof TeacherIndexRoute
  '/admin/auth/reset-password': typeof AdminAuthResetPasswordRoute
  '/parent/auth/reset-password': typeof ParentAuthResetPasswordRoute
  '/parent/student/$id': typeof ParentStudentIdRoute
  '/teacher/auth/reset-password': typeof TeacherAuthResetPasswordRoute
  '/admin/class-management': typeof AdminClassManagementIndexRoute
  '/admin/reports': typeof AdminReportsIndexRoute
  '/admin/school': typeof AdminSchoolIndexRoute
  '/admin/settings': typeof AdminSettingsIndexRoute
  '/admin/staff-management': typeof AdminStaffManagementIndexRoute
  '/admin/student-management': typeof AdminStudentManagementIndexRoute
  '/teacher/classes': typeof TeacherClassesIndexRoute
  '/teacher/communication': typeof TeacherCommunicationIndexRoute
  '/admin/staff-management/staffer/$id': typeof AdminStaffManagementStafferIdRoute
  '/admin/student-management/student/$id': typeof AdminStudentManagementStudentIdRoute
  '/teacher/classes/id/assesments': typeof TeacherClassesIdAssesmentsRoute
  '/admin/class-management/$id': typeof AdminClassManagementIdIndexRoute
  '/teacher/classes/id': typeof TeacherClassesIdIndexRoute
  '/admin/class-management/$id/student/$id': typeof AdminClassManagementIdStudentIdRoute
  '/admin/class-management/$id/subject/$id': typeof AdminClassManagementIdSubjectIdRoute
  '/teacher/classes/id/student/$id': typeof TeacherClassesIdStudentIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/help-desk': typeof HelpDeskRoute
  '/admin/dashboard': typeof AdminDashboardRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/auth/register-school': typeof AuthRegisterSchoolRoute
  '/parent/communications': typeof ParentCommunicationsRoute
  '/parent/dashboard': typeof ParentDashboardRoute
  '/teacher/dashboard': typeof TeacherDashboardRoute
  '/admin/': typeof AdminIndexRoute
  '/auth/': typeof AuthIndexRoute
  '/parent/': typeof ParentIndexRoute
  '/teacher/': typeof TeacherIndexRoute
  '/admin/auth/reset-password': typeof AdminAuthResetPasswordRoute
  '/parent/auth/reset-password': typeof ParentAuthResetPasswordRoute
  '/parent/student/$id': typeof ParentStudentIdRoute
  '/teacher/auth/reset-password': typeof TeacherAuthResetPasswordRoute
  '/admin/class-management/': typeof AdminClassManagementIndexRoute
  '/admin/reports/': typeof AdminReportsIndexRoute
  '/admin/school/': typeof AdminSchoolIndexRoute
  '/admin/settings/': typeof AdminSettingsIndexRoute
  '/admin/staff-management/': typeof AdminStaffManagementIndexRoute
  '/admin/student-management/': typeof AdminStudentManagementIndexRoute
  '/teacher/classes/': typeof TeacherClassesIndexRoute
  '/teacher/communication/': typeof TeacherCommunicationIndexRoute
  '/admin/staff-management/staffer/$id': typeof AdminStaffManagementStafferIdRoute
  '/admin/student-management/student/$id': typeof AdminStudentManagementStudentIdRoute
  '/teacher/classes/id/assesments': typeof TeacherClassesIdAssesmentsRoute
  '/admin/class-management/$id/': typeof AdminClassManagementIdIndexRoute
  '/teacher/classes/id/': typeof TeacherClassesIdIndexRoute
  '/admin/class-management/$id/student/$id': typeof AdminClassManagementIdStudentIdRoute
  '/admin/class-management/$id/subject/$id': typeof AdminClassManagementIdSubjectIdRoute
  '/teacher/classes/id/student/$id': typeof TeacherClassesIdStudentIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/help-desk'
    | '/admin/dashboard'
    | '/auth/login'
    | '/auth/register'
    | '/auth/register-school'
    | '/parent/communications'
    | '/parent/dashboard'
    | '/teacher/dashboard'
    | '/admin'
    | '/auth'
    | '/parent'
    | '/teacher'
    | '/admin/auth/reset-password'
    | '/parent/auth/reset-password'
    | '/parent/student/$id'
    | '/teacher/auth/reset-password'
    | '/admin/class-management'
    | '/admin/reports'
    | '/admin/school'
    | '/admin/settings'
    | '/admin/staff-management'
    | '/admin/student-management'
    | '/teacher/classes'
    | '/teacher/communication'
    | '/admin/staff-management/staffer/$id'
    | '/admin/student-management/student/$id'
    | '/teacher/classes/id/assesments'
    | '/admin/class-management/$id'
    | '/teacher/classes/id'
    | '/admin/class-management/$id/student/$id'
    | '/admin/class-management/$id/subject/$id'
    | '/teacher/classes/id/student/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/help-desk'
    | '/admin/dashboard'
    | '/auth/login'
    | '/auth/register'
    | '/auth/register-school'
    | '/parent/communications'
    | '/parent/dashboard'
    | '/teacher/dashboard'
    | '/admin'
    | '/auth'
    | '/parent'
    | '/teacher'
    | '/admin/auth/reset-password'
    | '/parent/auth/reset-password'
    | '/parent/student/$id'
    | '/teacher/auth/reset-password'
    | '/admin/class-management'
    | '/admin/reports'
    | '/admin/school'
    | '/admin/settings'
    | '/admin/staff-management'
    | '/admin/student-management'
    | '/teacher/classes'
    | '/teacher/communication'
    | '/admin/staff-management/staffer/$id'
    | '/admin/student-management/student/$id'
    | '/teacher/classes/id/assesments'
    | '/admin/class-management/$id'
    | '/teacher/classes/id'
    | '/admin/class-management/$id/student/$id'
    | '/admin/class-management/$id/subject/$id'
    | '/teacher/classes/id/student/$id'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/help-desk'
    | '/admin/dashboard'
    | '/auth/login'
    | '/auth/register'
    | '/auth/register-school'
    | '/parent/communications'
    | '/parent/dashboard'
    | '/teacher/dashboard'
    | '/admin/'
    | '/auth/'
    | '/parent/'
    | '/teacher/'
    | '/admin/auth/reset-password'
    | '/parent/auth/reset-password'
    | '/parent/student/$id'
    | '/teacher/auth/reset-password'
    | '/admin/class-management/'
    | '/admin/reports/'
    | '/admin/school/'
    | '/admin/settings/'
    | '/admin/staff-management/'
    | '/admin/student-management/'
    | '/teacher/classes/'
    | '/teacher/communication/'
    | '/admin/staff-management/staffer/$id'
    | '/admin/student-management/student/$id'
    | '/teacher/classes/id/assesments'
    | '/admin/class-management/$id/'
    | '/teacher/classes/id/'
    | '/admin/class-management/$id/student/$id'
    | '/admin/class-management/$id/subject/$id'
    | '/teacher/classes/id/student/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  HelpDeskRoute: typeof HelpDeskRoute
  AdminDashboardRoute: typeof AdminDashboardRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
  AuthRegisterSchoolRoute: typeof AuthRegisterSchoolRoute
  ParentCommunicationsRoute: typeof ParentCommunicationsRoute
  ParentDashboardRoute: typeof ParentDashboardRoute
  TeacherDashboardRoute: typeof TeacherDashboardRoute
  AdminIndexRoute: typeof AdminIndexRoute
  AuthIndexRoute: typeof AuthIndexRoute
  ParentIndexRoute: typeof ParentIndexRoute
  TeacherIndexRoute: typeof TeacherIndexRoute
  AdminAuthResetPasswordRoute: typeof AdminAuthResetPasswordRoute
  ParentAuthResetPasswordRoute: typeof ParentAuthResetPasswordRoute
  ParentStudentIdRoute: typeof ParentStudentIdRoute
  TeacherAuthResetPasswordRoute: typeof TeacherAuthResetPasswordRoute
  AdminClassManagementIndexRoute: typeof AdminClassManagementIndexRoute
  AdminReportsIndexRoute: typeof AdminReportsIndexRoute
  AdminSchoolIndexRoute: typeof AdminSchoolIndexRoute
  AdminSettingsIndexRoute: typeof AdminSettingsIndexRoute
  AdminStaffManagementIndexRoute: typeof AdminStaffManagementIndexRoute
  AdminStudentManagementIndexRoute: typeof AdminStudentManagementIndexRoute
  TeacherClassesIndexRoute: typeof TeacherClassesIndexRoute
  TeacherCommunicationIndexRoute: typeof TeacherCommunicationIndexRoute
  AdminStaffManagementStafferIdRoute: typeof AdminStaffManagementStafferIdRoute
  AdminStudentManagementStudentIdRoute: typeof AdminStudentManagementStudentIdRoute
  TeacherClassesIdAssesmentsRoute: typeof TeacherClassesIdAssesmentsRoute
  AdminClassManagementIdIndexRoute: typeof AdminClassManagementIdIndexRoute
  TeacherClassesIdIndexRoute: typeof TeacherClassesIdIndexRoute
  AdminClassManagementIdStudentIdRoute: typeof AdminClassManagementIdStudentIdRoute
  AdminClassManagementIdSubjectIdRoute: typeof AdminClassManagementIdSubjectIdRoute
  TeacherClassesIdStudentIdRoute: typeof TeacherClassesIdStudentIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  HelpDeskRoute: HelpDeskRoute,
  AdminDashboardRoute: AdminDashboardRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
  AuthRegisterSchoolRoute: AuthRegisterSchoolRoute,
  ParentCommunicationsRoute: ParentCommunicationsRoute,
  ParentDashboardRoute: ParentDashboardRoute,
  TeacherDashboardRoute: TeacherDashboardRoute,
  AdminIndexRoute: AdminIndexRoute,
  AuthIndexRoute: AuthIndexRoute,
  ParentIndexRoute: ParentIndexRoute,
  TeacherIndexRoute: TeacherIndexRoute,
  AdminAuthResetPasswordRoute: AdminAuthResetPasswordRoute,
  ParentAuthResetPasswordRoute: ParentAuthResetPasswordRoute,
  ParentStudentIdRoute: ParentStudentIdRoute,
  TeacherAuthResetPasswordRoute: TeacherAuthResetPasswordRoute,
  AdminClassManagementIndexRoute: AdminClassManagementIndexRoute,
  AdminReportsIndexRoute: AdminReportsIndexRoute,
  AdminSchoolIndexRoute: AdminSchoolIndexRoute,
  AdminSettingsIndexRoute: AdminSettingsIndexRoute,
  AdminStaffManagementIndexRoute: AdminStaffManagementIndexRoute,
  AdminStudentManagementIndexRoute: AdminStudentManagementIndexRoute,
  TeacherClassesIndexRoute: TeacherClassesIndexRoute,
  TeacherCommunicationIndexRoute: TeacherCommunicationIndexRoute,
  AdminStaffManagementStafferIdRoute: AdminStaffManagementStafferIdRoute,
  AdminStudentManagementStudentIdRoute: AdminStudentManagementStudentIdRoute,
  TeacherClassesIdAssesmentsRoute: TeacherClassesIdAssesmentsRoute,
  AdminClassManagementIdIndexRoute: AdminClassManagementIdIndexRoute,
  TeacherClassesIdIndexRoute: TeacherClassesIdIndexRoute,
  AdminClassManagementIdStudentIdRoute: AdminClassManagementIdStudentIdRoute,
  AdminClassManagementIdSubjectIdRoute: AdminClassManagementIdSubjectIdRoute,
  TeacherClassesIdStudentIdRoute: TeacherClassesIdStudentIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/help-desk",
        "/admin/",
        "/auth/",
        "/parent  [
        "/",
        "/about",
        "/help-desk",
        "/admin/",
        "/auth/",
        "/parent/",
        "/teacher/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/help-desk": {
      "filePath": "help-desk.tsx"
    },
    "/admin/": {
      "filePath": "admin/index.tsx",
      "children": [
        "/admin/dashboard",
        "/admin/auth/reset-password",
        "/admin/class-management/",
        "/admin/reports/",
        "/admin/school/",
        "/admin/settings/",
        "/admin/staff-management/",
        "/admin/student-management/"
      ]
    },
    "/auth/": {
      "filePath": "auth/index.tsx",
      "children": [
        "/auth/login",
        "/auth/register",
        "/auth/register-school"
      ]
    },
    "/parent/": {
      "filePath": "parent/index.tsx",
      "children": [
        "/parent/communications",
        "/parent/dashboard",
        "/parent/auth/reset-password",
        "/parent/student/$id"
      ]
    },
    "/teacher/": {
      "filePath": "teacher/index.tsx",
      "children": [
        "/teacher/dashboard",
        "/teacher/auth/reset-password",
        "/teacher/classes/",
        "/teacher/communication/"
      ]
    },
    "/admin/dashboard": {
      "filePath": "admin/dashboard.tsx"
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/auth/register": {
      "filePath": "auth/register.tsx"
    },
    "/auth/register-school": {
      "filePath": "auth/register-school.tsx"
    },
    "/parent/communications": {
      "filePath": "parent/communications.tsx"
    },
    "/parent/dashboard": {
      "filePath": "parent/dashboard.tsx"
    },
    "/teacher/dashboard": {
      "filePath": "teacher/dashboard.tsx"
    },
    "/admin/auth/reset-password": {
      "filePath": "admin/auth/reset-password.tsx"
    },
    "/parent/auth/reset-password": {
      "filePath": "parent/auth/reset-password.tsx"
    },
    "/parent/student/$id": {
      "filePath": "parent/student.$id.tsx"
    },
    "/teacher/auth/reset-password": {
      "filePath": "teacher/auth/reset-password.tsx"
    },
    "/admin/class-management/": {
      "filePath": "admin/class-management/index.tsx",
      "children": [
        "/admin/class-management/$id/"
      ]
    },
    "/admin/reports/": {
      "filePath": "admin/reports/index.tsx"
    },
    "/admin/school/": {
      "filePath": "admin/school/index.tsx"
    },
    "/admin/settings/": {
      "filePath": "admin/settings/index.tsx"
    },
    "/admin/staff-management/": {
      "filePath": "admin/staff-management/index.tsx",
      "children": [
        "/admin/staff-management/staffer/$id"
      ]
    },
    "/admin/student-management/": {
      "filePath": "admin/student-management/index.tsx",
      "children": [
        "/admin/student-management/student/$id"
      ]
    },
    "/teacher/classes/": {
      "filePath": "teacher/classes/index.tsx",
      "children": [
        "/teacher/classes/id/"
      ]
    },
    "/teacher/communication/": {
      "filePath": "teacher/communication/index.tsx"
    },
    "/admin/staff-management/staffer/$id": {
      "filePath": "admin/staff-management/staffer.$id.tsx"
    },
    "/admin/student-management/student/$id": {
      "filePath": "admin/student-management/student.$id.tsx"
    },
    "/admin/class-management/$id/": {
      "filePath": "admin/class-management/$id/index.tsx",
      "children": [
        "/admin/class-management/$id/student/$id",
        "/admin/class-management/$id/subject/$id"
      ]
    },
    "/teacher/classes/id/": {
      "filePath": "teacher/classes/id/index.tsx",
      "children": [
        "/teacher/classes/id/assesments",
        "/teacher/classes/id/student/$id"
      ]
    },
    "/teacher/classes/id/assesments": {
      "filePath": "teacher/classes/id/assesments.tsx"
    },
    "/admin/class-management/$id/student/$id": {
      "filePath": "admin/class-management/$id/student.$id.tsx"
    },
    "/admin/class-management/$id/subject/$id": {
      "filePath": "admin/class-management/$id/subject.$id.tsx"
    },
    "/teacher/classes/id/student/$id": {
      "filePath": "teacher/classes/id/student.$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */