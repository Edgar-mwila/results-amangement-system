# Edu-Track System Architecture & Design Specification

## 1. System Overview

Edu-Track is a multi-tenant educational management system consisting of:
- **Backend**: Spring Boot REST API with multi-tenancy support
- **Frontend**: React-based SPA with TanStack Router
- **Database**: MySQL with tenant isolation
- **Architecture**: Microservices-ready with clear separation of concerns

## 2. High-Level System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Web[Web Browser]
        Mobile[Mobile App - Future]
    end
    
    subgraph "Frontend Layer"
        React[React SPA]
        Router[TanStack Router]
        UI[UI Components]
        State[State Management]
    end
    
    subgraph "API Gateway Layer"
        Gateway[API Gateway - Future]
        LoadBalancer[Load Balancer]
    end
    
    subgraph "Backend Services"
        Auth[Authentication Service]
        School[School Management]
        Student[Student Management]
        Class[Class Management]
        Assessment[Assessment Service]
        Report[Reporting Service]
    end
    
    subgraph "Data Layer"
        MySQL[(MySQL Database)]
        Cache[(Redis Cache - Future)]
        FileStorage[File Storage]
    end
    
    subgraph "Infrastructure"
        Docker[Docker Containers]
        Nginx[Nginx Reverse Proxy]
        SSL[SSL/TLS]
    end
    
    Web --> React
    Mobile --> React
    React --> Gateway
    Gateway --> Auth
    Gateway --> School
    Gateway --> Student
    Gateway --> Class
    Gateway --> Assessment
    Gateway --> Report
    
    Auth --> MySQL
    School --> MySQL
    Student --> MySQL
    Class --> MySQL
    Assessment --> MySQL
    Report --> MySQL
    
    School --> Cache
    Assessment --> Cache
```

## 3. Multi-Tenancy Architecture

```mermaid
graph TB
    subgraph "Tenant Isolation Layer"
        TenantResolver[Tenant Resolver]
        TenantContext[Tenant Context]
        TenantInterceptor[Tenant Interceptor]
    end
    
    subgraph "Request Flow"
        Request[HTTP Request]
        Subdomain[Subdomain Extraction]
        TenantValidation[Tenant Validation]
        ContextSet[Set Tenant Context]
        ServiceCall[Service Execution]
        ContextClear[Clear Context]
    end
    
    subgraph "Database Layer"
        SharedDB[(Shared Database)]
        TenantFilter[Tenant Filtering]
        SchoolTable[School Table]
        StudentTable[Student Table]
        ClassTable[Class Table]
    end
    
    Request --> Subdomain
    Subdomain --> TenantResolver
    TenantResolver --> TenantValidation
    TenantValidation --> TenantContext
    TenantContext --> ContextSet
    ContextSet --> ServiceCall
    ServiceCall --> TenantFilter
    TenantFilter --> SharedDB
    ServiceCall --> ContextClear
```

## 4. Database Schema Architecture

```mermaid
erDiagram
    School ||--o{ User : has
    School ||--o{ Student : enrolls
    School ||--o{ ClassModel : contains
    School ||--o{ Subject : offers
    School ||--o{ AcademicYear : manages
    School ||--o{ Term : schedules
    
    User ||--o{ ClassModel : teaches
    User ||--o{ ClassSubject : instructs
    User ||--o{ Role : has
    
    ClassModel ||--o{ ClassStudent : enrolls
    ClassModel ||--o{ ClassSubject : offers
    ClassModel ||--o{ StudentProgression : tracks
    
    Student ||--o{ ClassStudent : belongs_to
    Student ||--o{ StudentAssessment : takes
    Student ||--o{ GuardianStudent : has_guardian
    Student ||--o{ StudentProgression : progresses
    
    Subject ||--o{ ClassSubject : taught_in
    ClassSubject ||--o{ Assessment : has
    Assessment ||--o{ StudentAssessment : evaluated_in
    
    Guardian ||--o{ GuardianStudent : cares_for
    Guardian ||--o{ GuardianContact : has_contact
    
    Grade ||--o{ ClassModel : defines
    AcademicYear ||--o{ ClassModel : spans
    Term ||--o{ Assessment : scheduled_in
    
    School {
        UUID id PK
        string name
        string subdomain UK
        string registrationNumber UK
        string status
        string category
        string ownership
        string curriculum
        datetime subscriptionStartDate
        datetime subscriptionEndDate
        string subscriptionStatus
        datetime createdAt
        datetime updatedAt
        boolean isDeleted
    }
    
    User {
        UUID id PK
        string firstName
        string lastName
        string email UK
        string phone
        string password
        UUID schoolId FK
        UUID roleId FK
        string status
        datetime createdAt
        datetime updatedAt
    }
    
    Student {
        Long id PK
        string firstName
        string lastName
        string otherName
        char sex
        date dateOfBirth
        string gender
        string status
        string province
        string city
        string township
        string address
        UUID schoolId FK
        datetime createdAt
    }
    
    ClassModel {
        UUID id PK
        string name
        UUID gradeId FK
        UUID academicYearId FK
        UUID classTeacherId FK
        UUID schoolId FK
        datetime createdAt
    }
    
    Assessment {
        Long id PK
        Long classSubjectId FK
        Long termId FK
        string name
        decimal totalMarks
        date dateOfAssessment
        UUID schoolId FK
        datetime createdAt
    }
```

## 5. Frontend Architecture

```mermaid
graph TB
    subgraph "Frontend Architecture"
        subgraph "Routing Layer"
            TanStackRouter[TanStack Router]
            RouteTree[Route Tree]
            RouteParams[Route Parameters]
        end
        
        subgraph "Component Layer"
            Pages[Page Components]
            Features[Feature Components]
            UI[UI Components]
            Forms[Form Components]
        end
        
        subgraph "State Management"
            ReactQuery[TanStack Query]
            LocalStorage[Local Storage]
            Context[React Context]
        end
        
        subgraph "API Layer"
            ApiClient[API Client]
            Interceptors[Request Interceptors]
            ErrorHandling[Error Handling]
        end
        
        subgraph "Styling"
            TailwindCSS[Tailwind CSS]
            RadixUI[Radix UI]
            CustomThemes[Custom Themes]
        end
    end
    
    TanStackRouter --> Pages
    Pages --> Features
    Features --> UI
    Features --> Forms
    
    Pages --> ReactQuery
    Features --> ReactQuery
    ReactQuery --> ApiClient
    ApiClient --> Interceptors
    
    UI --> TailwindCSS
    UI --> RadixUI
    Forms --> TailwindCSS
```

## 6. API Design Architecture

```mermaid
graph TB
    subgraph "API Design Pattern"
        subgraph "Controller Layer"
            SchoolController[School Controller]
            StudentController[Student Controller]
            ClassController[Class Controller]
            AssessmentController[Assessment Controller]
            UserController[User Controller]
        end
        
        subgraph "Service Layer"
            SchoolService[School Service]
            StudentService[Student Service]
            ClassService[Class Service]
            AssessmentService[Assessment Service]
            UserService[User Service]
        end
        
        subgraph "Repository Layer"
            SchoolRepo[School Repository]
            StudentRepo[Student Repository]
            ClassRepo[Class Repository]
            AssessmentRepo[Assessment Repository]
            UserRepo[User Repository]
        end
        
        subgraph "Cross-Cutting Concerns"
            Validation[Validation]
            ExceptionHandler[Exception Handler]
            TenantInterceptor[Tenant Interceptor]
            Security[Security]
        end
    end
    
    SchoolController --> SchoolService
    StudentController --> StudentService
    ClassController --> ClassService
    AssessmentController --> AssessmentService
    UserController --> UserService
    
    SchoolService --> SchoolRepo
    StudentService --> StudentRepo
    ClassService --> ClassRepo
    AssessmentService --> AssessmentRepo
    UserService --> UserRepo
    
    SchoolController --> Validation
    StudentController --> Validation
    ClassController --> Validation
    AssessmentController --> Validation
    UserController --> Validation
    
    Validation --> ExceptionHandler
    ExceptionHandler --> TenantInterceptor
    TenantInterceptor --> Security
```

## 7. Security Architecture

```mermaid
graph TB
    subgraph "Security Layers"
        subgraph "Authentication"
            JWT[JWT Tokens]
            Session[Session Management]
            PasswordHash[Password Hashing]
        end
        
        subgraph "Authorization"
            RoleBased[Role-Based Access]
            TenantIsolation[Tenant Isolation]
            ResourceAccess[Resource Access Control]
        end
        
        subgraph "Data Protection"
            InputValidation[Input Validation]
            SQLInjection[SQL Injection Prevention]
            XSS[XSS Prevention]
            CSRF[CSRF Protection]
        end
        
        subgraph "Infrastructure Security"
            HTTPS[HTTPS/TLS]
            Firewall[Firewall]
            RateLimiting[Rate Limiting]
            AuditLogs[Audit Logs]
        end
    end
    
    JWT --> RoleBased
    Session --> RoleBased
    RoleBased --> TenantIsolation
    TenantIsolation --> ResourceAccess
    
    InputValidation --> SQLInjection
    SQLInjection --> XSS
    XSS --> CSRF
    
    HTTPS --> Firewall
    Firewall --> RateLimiting
    RateLimiting --> AuditLogs
```

## 8. Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        subgraph "Load Balancer"
            Nginx[Nginx Load Balancer]
            SSL[SSL Termination]
        end
        
        subgraph "Application Servers"
            App1[App Server 1]
            App2[App Server 2]
            App3[App Server 3]
        end
        
        subgraph "Database Cluster"
            MasterDB[(Master DB)]
            SlaveDB1[(Slave DB 1)]
            SlaveDB2[(Slave DB 2)]
        end
        
        subgraph "Caching Layer"
            Redis1[Redis Cache 1]
            Redis2[Redis Cache 2]
        end
        
        subgraph "File Storage"
            S3[S3 Compatible Storage]
            CDN[CDN]
        end
        
        subgraph "Monitoring"
            Prometheus[Prometheus]
            Grafana[Grafana]
            ELK[ELK Stack]
        end
    end
    
    Nginx --> App1
    Nginx --> App2
    Nginx --> App3
    
    App1 --> MasterDB
    App2 --> MasterDB
    App3 --> MasterDB
    
    MasterDB --> SlaveDB1
    MasterDB --> SlaveDB2
    
    App1 --> Redis1
    App2 --> Redis2
    App3 --> Redis1
    
    App1 --> S3
    App2 --> S3
    App3 --> S3
    
    S3 --> CDN
    
    App1 --> Prometheus
    App2 --> Prometheus
    App3 --> Prometheus
    
    Prometheus --> Grafana
    Prometheus --> ELK
```

## 9. Data Flow Architecture

```mermaid
sequenceDiagram
    participant Client as Web Client
    participant Router as TanStack Router
    participant API as Spring Boot API
    participant Tenant as Tenant Resolver
    participant Service as Business Service
    participant Repo as Repository
    participant DB as MySQL Database
    
    Client->>Router: Navigate to /school/dashboard
    Router->>API: GET /api/school/dashboard
    API->>Tenant: Extract tenant from subdomain
    Tenant->>API: Validate tenant
    API->>Service: Process request with tenant context
    Service->>Repo: Query with tenant filter
    Repo->>DB: SELECT with school_id filter
    DB->>Repo: Return tenant-specific data
    Repo->>Service: Return filtered results
    Service->>API: Return business data
    API->>Client: JSON response
    Client->>Router: Update UI with data
```

## 10. Technology Stack

### Backend Stack
- **Framework**: Spring Boot 3.4.5
- **Language**: Java 17
- **Database**: MySQL 8.0
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven
- **Security**: JWT Authentication
- **Validation**: Bean Validation
- **Documentation**: OpenAPI/Swagger (planned)

### Frontend Stack
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Router**: TanStack Router 1.58.15
- **State Management**: TanStack Query 5.56.2
- **UI Library**: Radix UI
- **Styling**: Tailwind CSS 3.4.13
- **Build Tool**: Vite 5.4.1
- **Package Manager**: Bun

### Infrastructure Stack
- **Containerization**: Docker (planned)
- **Reverse Proxy**: Nginx (planned)
- **Caching**: Redis (planned)
- **Monitoring**: Prometheus + Grafana (planned)
- **Logging**: ELK Stack (planned)

## 11. Key Design Patterns

1. **Multi-Tenancy Pattern**: Subdomain-based tenant isolation
2. **Repository Pattern**: Data access abstraction
3. **Service Layer Pattern**: Business logic separation
4. **Interceptor Pattern**: Cross-cutting concerns
5. **Factory Pattern**: Object creation
6. **Observer Pattern**: Event handling
7. **Strategy Pattern**: Algorithm selection
8. **Builder Pattern**: Complex object construction

## 12. Performance Considerations

1. **Database Optimization**: Indexed queries, connection pooling
2. **Caching Strategy**: Redis for frequently accessed data
3. **API Optimization**: Pagination, filtering, sorting
4. **Frontend Optimization**: Code splitting, lazy loading
5. **CDN Integration**: Static asset delivery
6. **Load Balancing**: Horizontal scaling capability

## 13. Scalability Strategy

1. **Horizontal Scaling**: Multiple application instances
2. **Database Scaling**: Read replicas, sharding
3. **Caching Layers**: Multi-level caching
4. **Microservices**: Service decomposition
5. **Event-Driven**: Asynchronous processing
6. **Container Orchestration**: Kubernetes deployment

## 14. Monitoring & Observability

1. **Application Metrics**: Response times, error rates
2. **Business Metrics**: User activity, feature usage
3. **Infrastructure Metrics**: CPU, memory, disk usage
4. **Logging**: Structured logging with correlation IDs
5. **Tracing**: Distributed tracing for request flows
6. **Alerting**: Proactive issue detection

This architecture provides a solid foundation for a scalable, maintainable, and secure educational management system with clear separation of concerns and modern development practices. 