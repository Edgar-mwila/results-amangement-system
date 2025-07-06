# Detailed Component Diagrams for Edu-Track System

## 1. Backend Service Layer Architecture

```mermaid
graph TB
    subgraph "Controller Layer"
        SchoolController[School Controller]
        StudentController[Student Controller]
        ClassController[Class Controller]
        AssessmentController[Assessment Controller]
        UserController[User Controller]
        GuardianController[Guardian Controller]
        GradeController[Grade Controller]
        SubjectController[Subject Controller]
        TermController[Term Controller]
        AcademicYearController[Academic Year Controller]
    end
    
    subgraph "Service Layer"
        SchoolService[School Service]
        StudentService[Student Service]
        ClassService[Class Service]
        AssessmentService[Assessment Service]
        UserService[User Service]
        GuardianService[Guardian Service]
        GradeService[Grade Service]
        SubjectService[Subject Service]
        TermService[Term Service]
        AcademicYearService[Academic Year Service]
    end
    
    subgraph "Repository Layer"
        SchoolRepo[School Repository]
        StudentRepo[Student Repository]
        ClassRepo[Class Repository]
        AssessmentRepo[Assessment Repository]
        UserRepo[User Repository]
        GuardianRepo[Guardian Repository]
        GradeRepo[Grade Repository]
        SubjectRepo[Subject Repository]
        TermRepo[Term Repository]
        AcademicYearRepo[Academic Year Repository]
    end
    
    subgraph "Cross-Cutting Concerns"
        Validation[Bean Validation]
        ExceptionHandler[Global Exception Handler]
        TenantInterceptor[Tenant Interceptor]
        Security[JWT Security]
        Logging[Logging]
    end
    
    SchoolController --> SchoolService
    StudentController --> StudentService
    ClassController --> ClassService
    AssessmentController --> AssessmentService
    UserController --> UserService
    GuardianController --> GuardianService
    GradeController --> GradeService
    SubjectController --> SubjectService
    TermController --> TermService
    AcademicYearController --> AcademicYearService
    
    SchoolService --> SchoolRepo
    StudentService --> StudentRepo
    ClassService --> ClassRepo
    AssessmentService --> AssessmentRepo
    UserService --> UserRepo
    GuardianService --> GuardianRepo
    GradeService --> GradeRepo
    SubjectService --> SubjectRepo
    TermService --> TermRepo
    AcademicYearService --> AcademicYearRepo
    
    SchoolController --> Validation
    StudentController --> Validation
    ClassController --> Validation
    AssessmentController --> Validation
    UserController --> Validation
    GuardianController --> Validation
    GradeController --> Validation
    SubjectController --> Validation
    TermController --> Validation
    AcademicYearController --> Validation
    
    Validation --> ExceptionHandler
    ExceptionHandler --> TenantInterceptor
    TenantInterceptor --> Security
    Security --> Logging
```

## 2. Frontend Component Architecture

```mermaid
graph TB
    subgraph "Page Components"
        DashboardPage[Dashboard Page]
        SchoolProfilePage[School Profile Page]
        StudentManagementPage[Student Management Page]
        ClassManagementPage[Class Management Page]
        AssessmentPage[Assessment Page]
        ReportsPage[Reports Page]
        SettingsPage[Settings Page]
    end
    
    subgraph "Feature Components"
        StudentList[Student List Component]
        StudentDetails[Student Details Component]
        ClassList[Class List Component]
        ClassDetails[Class Details Component]
        AssessmentList[Assessment List Component]
        AssessmentForm[Assessment Form Component]
        GradeBook[Grade Book Component]
        PerformanceChart[Performance Chart Component]
    end
    
    subgraph "UI Components"
        Button[Button Component]
        Input[Input Component]
        Dialog[Dialog Component]
        Table[Table Component]
        Card[Card Component]
        Form[Form Component]
        Chart[Chart Component]
        Avatar[Avatar Component]
        Badge[Badge Component]
    end
    
    subgraph "Layout Components"
        Sidebar[Sidebar Component]
        Header[Header Component]
        Navigation[Navigation Component]
        Breadcrumb[Breadcrumb Component]
        Footer[Footer Component]
    end
    
    subgraph "State Management"
        ReactQuery[TanStack Query]
        LocalStorage[Local Storage]
        Context[React Context]
        Router[TanStack Router]
    end
    
    DashboardPage --> StudentList
    DashboardPage --> ClassList
    DashboardPage --> PerformanceChart
    
    StudentManagementPage --> StudentList
    StudentManagementPage --> StudentDetails
    
    ClassManagementPage --> ClassList
    ClassManagementPage --> ClassDetails
    
    AssessmentPage --> AssessmentList
    AssessmentPage --> AssessmentForm
    AssessmentPage --> GradeBook
    
    StudentList --> Table
    StudentDetails --> Card
    ClassList --> Table
    ClassDetails --> Card
    AssessmentList --> Table
    AssessmentForm --> Form
    GradeBook --> Table
    PerformanceChart --> Chart
    
    Table --> Button
    Table --> Input
    Card --> Avatar
    Card --> Badge
    Form --> Input
    Form --> Button
    Form --> Dialog
    
    DashboardPage --> Sidebar
    StudentManagementPage --> Sidebar
    ClassManagementPage --> Sidebar
    AssessmentPage --> Sidebar
    
    Sidebar --> Navigation
    Sidebar --> Header
    
    StudentList --> ReactQuery
    ClassList --> ReactQuery
    AssessmentList --> ReactQuery
    PerformanceChart --> ReactQuery
    
    ReactQuery --> LocalStorage
    ReactQuery --> Context
    Context --> Router
```

## 3. Data Flow for Student Management

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant R as Router
    participant API as Backend API
    participant S as Student Service
    participant Repo as Student Repository
    participant DB as Database
    participant T as Tenant Context
    
    U->>F: Navigate to Student Management
    F->>R: Route to /school/student-management
    R->>F: Load Student Management Page
    F->>API: GET /api/school/students
    API->>T: Extract tenant from subdomain
    T->>API: Set tenant context
    API->>S: Get students for tenant
    S->>Repo: Find by school ID
    Repo->>DB: SELECT * FROM student WHERE school_id = ?
    DB->>Repo: Return student data
    Repo->>S: Return student entities
    S->>API: Return student DTOs
    API->>F: JSON response with students
    F->>U: Display student list
    
    U->>F: Click "Add Student"
    F->>F: Open student creation dialog
    U->>F: Fill student form
    U->>F: Submit form
    F->>API: POST /api/school/students
    API->>T: Validate tenant
    API->>S: Create student
    S->>Repo: Save student
    Repo->>DB: INSERT INTO student
    DB->>Repo: Return saved student
    Repo->>S: Return student entity
    S->>API: Return created student
    API->>F: Success response
    F->>U: Show success message
    F->>F: Refresh student list
```

## 4. Authentication & Authorization Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as Backend API
    participant Auth as Auth Service
    participant JWT as JWT Service
    participant DB as Database
    participant T as Tenant Context
    
    U->>F: Enter credentials
    F->>API: POST /api/auth/login
    API->>Auth: Validate credentials
    Auth->>DB: SELECT user by email
    DB->>Auth: Return user data
    Auth->>JWT: Generate JWT token
    JWT->>Auth: Return token
    Auth->>API: Return auth response
    API->>F: JWT token + user data
    F->>F: Store token in localStorage
    F->>F: Store user data in state
    F->>U: Redirect to dashboard
    
    Note over F,API: Subsequent Requests
    F->>API: GET /api/school/students
    F->>F: Add Authorization header
    API->>JWT: Validate JWT token
    JWT->>API: Token valid
    API->>T: Extract tenant from subdomain
    T->>API: Set tenant context
    API->>API: Process request
    API->>F: Return data
    F->>U: Display data
```

## 5. Multi-Tenancy Implementation Details

```mermaid
graph TB
    subgraph "Request Processing"
        HTTPRequest[HTTP Request]
        SubdomainExtract[Extract Subdomain]
        TenantLookup[Tenant Lookup]
        ContextSet[Set Tenant Context]
        ServiceExecution[Service Execution]
        ContextClear[Clear Context]
    end
    
    subgraph "Tenant Resolution"
        TenantResolver[Tenant Resolver]
        TenantCache[Tenant Cache]
        SchoolRepo[School Repository]
        TenantValidation[Tenant Validation]
    end
    
    subgraph "Context Management"
        TenantContext[Tenant Context]
        ThreadLocal[Thread Local Storage]
        ContextFilter[Context Filter]
    end
    
    subgraph "Data Isolation"
        SharedDB[(Shared Database)]
        TenantFilter[Tenant Filter]
        SchoolIdFilter[School ID Filter]
        DataAccess[Data Access Layer]
    end
    
    HTTPRequest --> SubdomainExtract
    SubdomainExtract --> TenantLookup
    TenantLookup --> TenantResolver
    TenantResolver --> TenantCache
    TenantCache --> SchoolRepo
    SchoolRepo --> TenantValidation
    TenantValidation --> ContextSet
    ContextSet --> TenantContext
    TenantContext --> ThreadLocal
    ThreadLocal --> ContextFilter
    ContextFilter --> ServiceExecution
    ServiceExecution --> DataAccess
    DataAccess --> TenantFilter
    TenantFilter --> SchoolIdFilter
    SchoolIdFilter --> SharedDB
    ServiceExecution --> ContextClear
    ContextClear --> ThreadLocal
```

## 6. Assessment Management Flow

```mermaid
graph TB
    subgraph "Assessment Creation"
        Teacher[Teacher]
        ClassSelect[Select Class]
        SubjectSelect[Select Subject]
        AssessmentForm[Assessment Form]
        Validation[Form Validation]
        SaveAssessment[Save Assessment]
    end
    
    subgraph "Grade Entry"
        AssessmentList[Assessment List]
        StudentList[Student List]
        GradeEntry[Grade Entry Form]
        GradeValidation[Grade Validation]
        SaveGrades[Save Grades]
    end
    
    subgraph "Grade Processing"
        GradeCalculation[Grade Calculation]
        PerformanceAnalysis[Performance Analysis]
        ReportGeneration[Report Generation]
        Notification[Notification]
    end
    
    subgraph "Data Storage"
        AssessmentTable[Assessment Table]
        StudentAssessmentTable[Student Assessment Table]
        PerformanceTable[Performance Table]
        ReportTable[Report Table]
    end
    
    Teacher --> ClassSelect
    ClassSelect --> SubjectSelect
    SubjectSelect --> AssessmentForm
    AssessmentForm --> Validation
    Validation --> SaveAssessment
    SaveAssessment --> AssessmentTable
    
    AssessmentList --> StudentList
    StudentList --> GradeEntry
    GradeEntry --> GradeValidation
    GradeValidation --> SaveGrades
    SaveGrades --> StudentAssessmentTable
    
    StudentAssessmentTable --> GradeCalculation
    GradeCalculation --> PerformanceAnalysis
    PerformanceAnalysis --> ReportGeneration
    ReportGeneration --> Notification
    
    PerformanceAnalysis --> PerformanceTable
    ReportGeneration --> ReportTable
```

## 7. Error Handling Architecture

```mermaid
graph TB
    subgraph "Frontend Error Handling"
        UserAction[User Action]
        ComponentError[Component Error]
        ErrorBoundary[Error Boundary]
        ToastNotification[Toast Notification]
        ErrorPage[Error Page]
    end
    
    subgraph "API Error Handling"
        APIRequest[API Request]
        NetworkError[Network Error]
        HTTPError[HTTP Error]
        ValidationError[Validation Error]
        ServerError[Server Error]
    end
    
    subgraph "Backend Error Handling"
        ControllerError[Controller Error]
        ServiceError[Service Error]
        RepositoryError[Repository Error]
        DatabaseError[Database Error]
        GlobalExceptionHandler[Global Exception Handler]
    end
    
    subgraph "Error Response"
        ErrorDTO[Error DTO]
        ErrorCode[Error Code]
        ErrorMessage[Error Message]
        ErrorDetails[Error Details]
        ErrorTimestamp[Error Timestamp]
    end
    
    UserAction --> ComponentError
    ComponentError --> ErrorBoundary
    ErrorBoundary --> ToastNotification
    ErrorBoundary --> ErrorPage
    
    APIRequest --> NetworkError
    APIRequest --> HTTPError
    HTTPError --> ValidationError
    HTTPError --> ServerError
    
    ControllerError --> ServiceError
    ServiceError --> RepositoryError
    RepositoryError --> DatabaseError
    DatabaseError --> GlobalExceptionHandler
    
    GlobalExceptionHandler --> ErrorDTO
    ErrorDTO --> ErrorCode
    ErrorDTO --> ErrorMessage
    ErrorDTO --> ErrorDetails
    ErrorDTO --> ErrorTimestamp
```

## 8. Performance Optimization Strategy

```mermaid
graph TB
    subgraph "Frontend Optimization"
        CodeSplitting[Code Splitting]
        LazyLoading[Lazy Loading]
        Memoization[Memoization]
        VirtualScrolling[Virtual Scrolling]
        ImageOptimization[Image Optimization]
    end
    
    subgraph "API Optimization"
        Pagination[Pagination]
        Filtering[Filtering]
        Sorting[Sorting]
        Caching[API Caching]
        Compression[Response Compression]
    end
    
    subgraph "Database Optimization"
        Indexing[Database Indexing]
        QueryOptimization[Query Optimization]
        ConnectionPooling[Connection Pooling]
        ReadReplicas[Read Replicas]
        QueryCaching[Query Caching]
    end
    
    subgraph "Infrastructure Optimization"
        CDN[CDN for Static Assets]
        LoadBalancing[Load Balancing]
        AutoScaling[Auto Scaling]
        Monitoring[Performance Monitoring]
        Alerting[Performance Alerting]
    end
    
    CodeSplitting --> LazyLoading
    LazyLoading --> Memoization
    Memoization --> VirtualScrolling
    VirtualScrolling --> ImageOptimization
    
    Pagination --> Filtering
    Filtering --> Sorting
    Sorting --> Caching
    Caching --> Compression
    
    Indexing --> QueryOptimization
    QueryOptimization --> ConnectionPooling
    ConnectionPooling --> ReadReplicas
    ReadReplicas --> QueryCaching
    
    CDN --> LoadBalancing
    LoadBalancing --> AutoScaling
    AutoScaling --> Monitoring
    Monitoring --> Alerting
```

## 9. Security Implementation Details

```mermaid
graph TB
    subgraph "Authentication Security"
        PasswordHashing[Password Hashing]
        JWTToken[JWT Token Generation]
        TokenValidation[Token Validation]
        SessionManagement[Session Management]
        PasswordPolicy[Password Policy]
    end
    
    subgraph "Authorization Security"
        RoleBasedAccess[Role-Based Access Control]
        ResourceAccess[Resource Access Control]
        TenantIsolation[Tenant Isolation]
        PermissionMatrix[Permission Matrix]
        AccessAudit[Access Audit Log]
    end
    
    subgraph "Data Security"
        InputSanitization[Input Sanitization]
        SQLInjectionPrevention[SQL Injection Prevention]
        XSSPrevention[XSS Prevention]
        CSRFProtection[CSRF Protection]
        DataEncryption[Data Encryption]
    end
    
    subgraph "Infrastructure Security"
        HTTPSEnforcement[HTTPS Enforcement]
        SecurityHeaders[Security Headers]
        RateLimiting[Rate Limiting]
        FirewallRules[Firewall Rules]
        SecurityMonitoring[Security Monitoring]
    end
    
    PasswordHashing --> JWTToken
    JWTToken --> TokenValidation
    TokenValidation --> SessionManagement
    SessionManagement --> PasswordPolicy
    
    RoleBasedAccess --> ResourceAccess
    ResourceAccess --> TenantIsolation
    TenantIsolation --> PermissionMatrix
    PermissionMatrix --> AccessAudit
    
    InputSanitization --> SQLInjectionPrevention
    SQLInjectionPrevention --> XSSPrevention
    XSSPrevention --> CSRFProtection
    CSRFProtection --> DataEncryption
    
    HTTPSEnforcement --> SecurityHeaders
    SecurityHeaders --> RateLimiting
    RateLimiting --> FirewallRules
    FirewallRules --> SecurityMonitoring
```

## 10. Deployment Pipeline

```mermaid
graph TB
    subgraph "Development"
        CodeCommit[Code Commit]
        CodeReview[Code Review]
        UnitTests[Unit Tests]
        IntegrationTests[Integration Tests]
    end
    
    subgraph "Build Process"
        BuildFrontend[Build Frontend]
        BuildBackend[Build Backend]
        DockerBuild[Docker Build]
        ImageTagging[Image Tagging]
    end
    
    subgraph "Testing Environment"
        StagingDeploy[Staging Deployment]
        E2ETests[End-to-End Tests]
        PerformanceTests[Performance Tests]
        SecurityTests[Security Tests]
    end
    
    subgraph "Production Deployment"
        BlueGreenDeploy[Blue-Green Deployment]
        HealthChecks[Health Checks]
        Rollback[Rollback Strategy]
        Monitoring[Production Monitoring]
    end
    
    CodeCommit --> CodeReview
    CodeReview --> UnitTests
    UnitTests --> IntegrationTests
    IntegrationTests --> BuildFrontend
    IntegrationTests --> BuildBackend
    
    BuildFrontend --> DockerBuild
    BuildBackend --> DockerBuild
    DockerBuild --> ImageTagging
    ImageTagging --> StagingDeploy
    
    StagingDeploy --> E2ETests
    E2ETests --> PerformanceTests
    PerformanceTests --> SecurityTests
    SecurityTests --> BlueGreenDeploy
    
    BlueGreenDeploy --> HealthChecks
    HealthChecks --> Rollback
    Rollback --> Monitoring
```

These detailed component diagrams provide a comprehensive view of the system's internal architecture, data flows, and implementation strategies for the Edu-Track educational management system. 