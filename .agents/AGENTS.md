AGENTS.md

This file contains repository-wide instructions for AI coding agents, including Codex, Antigravity, and similar tools.

Core principle: Understand the existing implementation first. Make the smallest correct change possible. Do not redesign working code unless the task explicitly requires it.

1. Agent Workflow

Before making any code changes:

Read this AGENTS.md file completely.

Inspect the files related to the requested task.

Understand the current data flow and existing implementation.

Find similar features or patterns already used in the project.

Plan the smallest change that satisfies the task.

Implement only the requested scope.

Review the final diff before finishing.

When finishing a task:

Check for compile/type/import errors where possible.

Remove temporary logs, debug code, commented experiments, and unused imports.

Make sure unrelated files were not changed.

Briefly summarize what was changed and mention any important limitation or assumption.

If the user's task conflicts with this file, follow the explicit task only when the user clearly requests that exception. Otherwise, preserve these rules.

2. General Rules

Follow the existing project structure, architecture, naming conventions, and coding style.

Preserve existing business logic unless the task explicitly requires changing it.

Only modify files relevant to the requested task.

Prefer small, focused changes over broad rewrites.

Do not perform unrelated refactoring or cleanup.

Do not rename files, classes, methods, APIs, database fields, or variables unless necessary.

Do not change public API contracts unless explicitly required.

Do not remove existing functionality just because it appears unused.

Do not introduce new dependencies unless clearly necessary.

Reuse existing components, services, utilities, DTOs, enums, helpers, and patterns before creating new ones.

Do not duplicate logic that already exists elsewhere in the project.

Do not add abstractions for hypothetical future requirements.

Do not modify configuration, environment variables, Docker, deployment, CI/CD, or build files unless the task requires it.

Do not make speculative improvements outside the requested scope.

When multiple solutions are valid, prefer the one that:

Matches the existing codebase.

Changes the fewest files.

Adds the least complexity.

Preserves backward compatibility.

3. Project Structure

Frontend rules apply to:

client/**

Backend rules apply to:

server/**

Frontend

4. Frontend Technology

Use the frontend stack already configured in the project:

React

React Router where applicable

Tailwind CSS

shadcn/ui

lucide-react

Existing project HTTP/API utilities

Do not introduce another UI library unless explicitly required.

5. React Components

Use React functional components.

Follow the existing component and folder structure.

Keep page components focused on page-level orchestration.

Extract components when a section has a clear responsibility or meaningful reuse.

Do not split components into tiny files only to reduce line count.

Reuse existing project components before creating new ones.

Reuse shadcn/ui components when appropriate.

Prefer simple composition over complicated abstractions.

Good extraction candidates include:

Tables

Filters

Toolbars

Statistics cards

Forms

Dialogs / modals

Reusable page sections

6. Frontend Styling

Use Tailwind CSS for styling.

Use lucide-react for icons.

Preserve the existing visual language of the application.

Avoid custom CSS when Tailwind utilities are sufficient.

Keep responsive behavior consistent with surrounding pages.

Do not redesign existing screens unless the task explicitly asks for a UI redesign.

7. Frontend API Calls

API communication belongs in the service layer.

Preferred flow:

Component
   ↓
Service
   ↓
HTTP client
   ↓
Backend API

Do not call axios directly inside React components.

Preferred:

const users = await getUsers(params);

Avoid:

const users = await axios.get('/users');

If a service already exists for a domain, extend it instead of creating a duplicate service.

8. Frontend State & Effects

Avoid unnecessary state.

Do not store derived values in state when they can be calculated from props or existing state.

Avoid setState inside an effect unless synchronization is actually required.

Keep effect dependencies correct.

Prefer event handlers over effects for event-driven logic.

Clean up subscriptions, timers, listeners, and WebSocket handlers when necessary.

Avoid duplicate API requests caused by poorly designed effects.

9. Frontend Forms & Errors

Follow existing form patterns.

Validate user input before submission when appropriate.

Prevent duplicate submissions.

Preserve loading and disabled states during async operations.

Handle API failures consistently with the existing project.

Use the existing toast/notification/error-display mechanism.

Prefer backend error messages or mapped application messages when available.

Do not expose technical stack traces to users.

10. Frontend Formatting

Keep the current Prettier style:

printWidth: 80
tabWidth: 2
semi: true
singleQuote: true
trailingComma: all
arrowParens: always

Do not reformat unrelated code.

Backend

11. Backend Technology

Use the backend stack already configured in the project:

Java 21

Spring Boot

Spring Security

Spring Data JPA

MapStruct where appropriate

Lombok where already used

Follow the versions already configured by the repository.

12. Backend Architecture

Follow the existing layered architecture:

Controller
    ↓
Service
    ↓
Repository
    ↓
Database

API data flow should generally follow:

Controller
    ↓
Request DTO
    ↓
Service
    ↓
Entity / Repository
    ↓
Response DTO

Do not bypass layers without a clear reason.

13. Controllers

Controllers should only handle:

HTTP request/response concerns.

Path variables and query parameters.

Request DTO validation.

Calling services.

Returning API responses.

Do not place complex business logic, database queries, or entity manipulation in controllers.

Preferred:

@PostMapping
public ApiResponse<ResponseDto> create(@RequestBody RequestDto request) {
    return ApiResponse.<ResponseDto>builder()
            .result(service.create(request))
            .build();
}

14. Services

Business logic belongs in the Service layer.

Services are responsible for:

Business validation.

Coordinating repositories.

Entity lifecycle changes.

Domain-level authorization checks.

Transaction boundaries.

Mapping when appropriate.

Keep service methods focused on one clear business operation.

15. Repositories

Repositories should only handle persistence and database access.

They may contain:

Spring Data derived queries.

JPQL queries.

Native queries when necessary.

Specifications or database filtering logic.

Do not put business decisions in repositories.

Prefer existing repository methods before adding new ones.

Avoid loading unnecessary data when a more focused query is available.

16. DTOs & Mapping

Do not return JPA entities directly from controllers.

Use:

Request DTOs for incoming data.

Response DTOs for outgoing data.

Do not expose:

Password hashes.

Internal tokens.

Security-sensitive fields.

Persistence details the client does not need.

Use MapStruct when mapping is straightforward and consistent with the existing codebase.

Manual mapping is acceptable when mapping requires business logic, external data, or MapStruct would make the code more complicated.

Do not introduce MapStruct into unrelated modules only for consistency.

17. Exceptions

Use the project's existing:

AppException
ErrorCode

for expected application/business errors.

Preferred:

throw new AppException(ErrorCode.USER_NOT_FOUND);

Avoid:

throw new RuntimeException("User not found");

Add a new ErrorCode only when no existing error code accurately represents the condition.

Do not expose internal exception details to API consumers.

18. Authorization & Security

Use @PreAuthorize for endpoints that require role-based authorization.

Examples:

@PreAuthorize("hasRole('ADMIN')")

@PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")

Do not rely only on frontend authorization.

Never:

Hardcode credentials.

Commit secrets.

Log passwords.

Log access tokens.

Return sensitive authentication data unnecessarily.

Disable security checks simply to make a feature work.

Follow the existing authentication and authorization flow.

19. Transactions

Use @Transactional when a business operation modifies multiple related records or requires atomic consistency.

Keep transaction boundaries primarily in the Service layer.

Do not add @Transactional everywhere by default.

Read-only operations do not need a transaction unless the implementation requires one.

20. Database & Entities

Preserve existing relationships unless the task requires changes.

Avoid unnecessary eager fetching.

Be careful with bidirectional relationships.

Do not casually rename database columns.

Do not change persisted enum values without considering migration impact.

Do not introduce unrelated schema changes.

Preserve existing created/updated timestamp behavior.

When adding fields, consider:

Nullability.

Existing records.

Validation.

API compatibility.

Migration requirements.

21. Pagination, Filtering & Sorting

When an endpoint already supports pagination/filtering, preserve the existing project conventions.

Typical parameters include:

page
size
sortBy
sortDirection
keyword
status

Reuse the existing PageResponse or pagination DTOs.

Do not introduce a second pagination format unless explicitly required.

Validate or control sorting fields when necessary.

22. File Uploads

Reuse the existing file storage service and configured storage locations.

Do not duplicate file-storage logic.

Validate files using existing project patterns.

Generate safe stored filenames.

Never trust the original filename as a filesystem path.

Preserve existing public URL conventions.

Do not change storage directories unless explicitly requested.

23. WebSocket / Realtime

When modifying realtime features:

Follow the existing authentication flow.

Reuse existing realtime event structures and naming conventions.

Do not create unnecessary connections.

Handle closed or invalid sessions safely.

Clean up disconnected sessions.

Avoid broadcasting sensitive data unnecessarily.

24. AI / RAG

For AI-related features:

Do not allow the model to invent institution-specific information.

Prefer approved project knowledge sources such as Documents and FAQ.

Preserve the existing fallback behavior when knowledge is insufficient.

Do not silently introduce external web search unless explicitly required.

Keep prompts focused and deterministic where appropriate.

Avoid sending unnecessary sensitive user data to external AI providers.

Reuse the existing AI service abstraction instead of calling providers directly from controllers.

Code Quality & Safety

25. Code Quality

Prefer readable, straightforward code over clever abstractions.

Use descriptive names.

Prefer:

assignedStaff
sessionToken
guestQuestionCount

Avoid vague names such as:

data
value
temp
obj

Do not create unnecessary abstractions unless the existing project already uses that pattern.

26. Comments

Do not add comments that simply repeat the code.

Comments should explain only things such as:

Non-obvious business rules.

Important implementation constraints.

Necessary workarounds.

Why unusual behavior exists.

27. Testing & Verification

After making changes, verify the relevant behavior where possible.

Check:

Compilation/build.

Imports.

Type errors.

Existing API contracts.

Null handling.

Validation.

Authorization.

Edge cases affected by the task.

Frontend checks should include relevant:

Loading states.

Empty states.

Error states.

Responsive behavior.

Backend checks should include relevant:

Controller → Service → Repository flow.

DTO mapping.

Expected exceptions.

Transaction boundaries.

Security annotations.

Do not fix unrelated test failures unless explicitly requested.

28. Git & Commands

Do not run destructive commands unless explicitly requested.

Avoid commands such as:

git reset --hard
git clean -fd
git checkout .
rm -rf

Do not automatically:

Commit.

Push.

Merge.

Rebase.

Force push.

unless the user explicitly asks for it.

Keep diffs focused.

Before finishing, ensure:

No debug code remains.

No temporary logs remain.

No unused imports remain.

No secrets were added.

No unrelated files were modified.

29. Ambiguous Requirements

When a task is ambiguous, first infer intent from:

Existing implementation.

Similar modules.

Existing API patterns.

Current naming conventions.

Existing database/domain structure.

Prefer consistency with the current application over introducing a new pattern.

If a safe interpretation is possible, implement the smallest reasonable change.

Do not invent new business rules.

30. Definition of Done

A task is complete when:

The requested behavior is implemented.

Existing business logic outside the task remains unchanged.

Existing architecture and style are preserved.

Frontend API calls remain in services.

Backend business logic remains in services.

DTOs are used instead of exposing entities.

Security rules remain enforced unless explicitly changed by the task.

Expected errors use AppException + ErrorCode.

No unnecessary dependency was added.

No unrelated refactoring was performed.

Temporary/debug code was removed.

The final diff contains only relevant changes.

Final Rule

When deciding between:

Improve or redesign the architecture

and:

Solve the requested task while preserving the current architecture

Always prefer the second option unless the user explicitly asks for architectural changes.