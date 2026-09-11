# AGENTS.md

This file defines the rules AI coding agents must follow when working in this repository.

The main principle is:

> **Understand the existing implementation first. Make the smallest correct change possible. Do not redesign working code unless the task explicitly requires it.**

---

# 1. General Rules

* Follow the existing project structure, naming conventions, architecture, and coding style.
* Read related code before making changes.
* Preserve existing business logic unless the task explicitly requires changing it.
* Do not introduce new dependencies unless they are clearly necessary.
* Do not perform unrelated refactoring.
* Only modify files relevant to the requested task.
* Prefer small, focused changes over large rewrites.
* Reuse existing utilities, services, components, DTOs, enums, and patterns before creating new ones.
* Do not duplicate logic that already exists elsewhere in the project.
* Do not rename files, classes, methods, APIs, database fields, or variables unless necessary.
* Do not change public API contracts without explicit requirements.
* Do not remove existing functionality just because it appears unused.
* Do not modify configuration, environment variables, Docker files, deployment files, or build configuration unless the task requires it.
* Avoid speculative improvements outside the requested scope.

Before implementing a task:

1. Inspect the relevant files.
2. Understand the current data flow.
3. Identify existing patterns used for similar features.
4. Implement the task using those patterns.
5. Check that the change does not break existing behavior.

---

# 2. Scope Discipline

The agent must stay within the requested task.

Do not:

* Refactor unrelated modules.
* Reformat the entire file unnecessarily.
* Rename unrelated variables.
* Move files without a clear reason.
* Rewrite working code simply to make it "cleaner".
* Add features that were not requested.
* Add abstractions for hypothetical future requirements.

If multiple solutions are possible, prefer the solution that:

1. Matches the current codebase.
2. Changes the fewest files.
3. Adds the least complexity.
4. Preserves backward compatibility.

---

# 3. Frontend Rules

Applies to:

```text
client/**
```

## Technology

The frontend uses:

* React
* React Router where applicable
* Tailwind CSS
* shadcn/ui
* lucide-react
* Existing project service/API utilities

Follow the versions and patterns already configured in the project.

---

## Components

* Use React functional components.
* Follow the existing component structure.
* Keep page components focused on page-level orchestration.
* Extract components when a file becomes difficult to read or contains clearly reusable UI sections.
* Do not over-split components into tiny files without meaningful responsibility.
* Prefer composition over complicated component logic.
* Reuse existing shadcn/ui components before creating custom equivalents.
* Reuse existing project components before adding new ones.

Good extraction candidates include:

* Tables
* Filters
* Toolbars
* Statistics cards
* Forms
* Dialogs / modals
* Reusable sections

Do not extract components only to reduce line count.

---

## Styling

* Use Tailwind CSS for styling.
* Use shadcn/ui components when appropriate.
* Use `lucide-react` for icons.
* Do not introduce another UI library unless explicitly required.
* Preserve the existing visual language of the application.
* Avoid unnecessary custom CSS when Tailwind utilities are sufficient.
* Keep responsive behavior consistent with surrounding pages.
* Do not redesign existing screens unless the task explicitly requests UI changes.

---

## API Calls

API communication must be placed inside the service layer.

Preferred flow:

```text
Component
   ↓
Service
   ↓
HTTP client
   ↓
Backend API
```

Do not call `axios` directly inside React components.

Example:

```javascript
// Good
const users = await getUsers(params);

// Avoid
const users = await axios.get('/users');
```

If an API service already exists for the domain, extend it instead of creating a duplicate service.

---

## State & Effects

* Avoid unnecessary state.
* Do not store derived values in state when they can be calculated from existing state or props.
* Avoid calling `setState` directly inside an effect unless synchronization is actually required.
* Keep effect dependencies correct.
* Avoid effects for logic that can happen directly in an event handler.
* Clean up subscriptions, timers, listeners, and WebSocket handlers where necessary.
* Avoid duplicate API requests caused by poorly designed effects.

---

## Forms

* Follow existing form patterns in the project.
* Validate user input before submitting when appropriate.
* Display backend validation/error messages consistently.
* Prevent duplicate submissions.
* Preserve loading and disabled states during asynchronous operations.

---

## Error Handling

* Handle API failures gracefully.
* Do not silently swallow errors unless intentionally handled.
* Use the project's existing notification/toast/error-display approach.
* Prefer backend error messages or mapped application messages when available.
* Do not expose technical stack traces to users.

---

## Formatting

Keep the existing Prettier configuration.

Current formatting preferences include:

```text
printWidth: 80
tabWidth: 2
semi: true
singleQuote: true
trailingComma: all
arrowParens: always
```

Do not manually reformat unrelated code.

---

# 4. Backend Rules

Applies to:

```text
server/**
```

## Technology

The backend uses:

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* MapStruct where appropriate
* Lombok where already used

Follow the versions configured by the project.

---

# 5. Backend Architecture

Follow the existing layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

DTOs should be used between the API boundary and domain logic where appropriate.

Typical structure:

```text
Controller
    ↓
Request DTO
    ↓
Service
    ↓
Entity / Repository
    ↓
Response DTO
```

Do not bypass layers without a clear reason.

---

# 6. Controller Rules

Controllers should only be responsible for:

* Receiving HTTP requests.
* Reading path variables and query parameters.
* Validating request DTOs.
* Calling services.
* Returning API responses.

Controllers must not contain complex business logic.

Avoid:

```java
@PostMapping
public ApiResponse<?> create(...) {
    // database queries
    // complicated validation
    // business calculations
    // entity manipulation
}
```

Prefer:

```java
@PostMapping
public ApiResponse<ResponseDto> create(@RequestBody RequestDto request) {
    return ApiResponse.<ResponseDto>builder()
            .result(service.create(request))
            .build();
}
```

---

# 7. Service Rules

Business logic belongs in the Service layer.

Services are responsible for:

* Business validation.
* Coordinating repositories.
* Entity lifecycle changes.
* Authorization-related domain checks.
* Mapping data when appropriate.
* Transaction boundaries.

Keep methods focused on one clear business operation.

Do not move business logic into repositories or controllers.

---

# 8. Repository Rules

Repositories should only handle persistence and database access.

They may contain:

* Spring Data derived queries.
* JPQL queries.
* Native queries when necessary.
* Specifications or database filtering logic.

Repositories should not contain business decisions.

Prefer existing repository methods before adding new ones.

Avoid loading unnecessary collections or entities if a specific query can solve the task efficiently.

---

# 9. DTO Rules

Do not return JPA entities directly from controllers.

Use:

* Request DTOs for incoming data.
* Response DTOs for outgoing data.

Example:

```text
UserCreateRequest
UserUpdateRequest
UserResponse
UserDetailResponse
```

DTOs should expose only fields needed by the API.

Do not expose:

* Password hashes.
* Internal tokens.
* Security-sensitive fields.
* Internal persistence details that clients do not need.

---

# 10. Mapping

Use MapStruct when mapping logic is straightforward and consistent with existing code.

Prefer MapStruct for:

```text
Entity → Response DTO
Request DTO → Entity
```

Manual mapping is acceptable when:

* Mapping requires business logic.
* Mapping depends on external data.
* MapStruct would make the implementation more complicated.

Do not introduce MapStruct usage into unrelated modules just for consistency.

---

# 11. Exception Handling

Use the project's existing:

```text
AppException
ErrorCode
```

for expected application errors.

Example:

```java
throw new AppException(ErrorCode.USER_NOT_FOUND);
```

Do not throw generic runtime exceptions for normal business errors.

Avoid:

```java
throw new RuntimeException("User not found");
```

Add a new `ErrorCode` only when an existing error code does not accurately represent the condition.

Do not expose internal exception details to API consumers.

---

# 12. Authorization & Security

Use `@PreAuthorize` for endpoints that require role-based authorization.

Example:

```java
@PreAuthorize("hasRole('ADMIN')")
```

or:

```java
@PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
```

Do not rely only on frontend restrictions.

Never:

* Hardcode credentials.
* Commit secrets.
* Log access tokens.
* Log passwords.
* Return sensitive authentication information unnecessarily.
* Disable security checks to make a feature work.

Follow the existing authentication and authorization flow.

---

# 13. Transactions

Use `@Transactional` when a business operation updates multiple related records or requires atomic consistency.

Example:

```java
@Transactional
public ResponseDto updateSomething(...) {
    ...
}
```

Do not add `@Transactional` everywhere by default.

Read-only operations do not need transactions unless required by the implementation.

Keep transaction boundaries primarily in the Service layer.

---

# 14. Database & Entity Rules

* Preserve existing entity relationships unless the task requires changes.
* Avoid unnecessary eager fetching.
* Be careful with bidirectional relationships.
* Do not change database column names casually.
* Do not change enum values already stored in the database without considering migration impact.
* Do not add schema changes unrelated to the feature.
* Preserve created/updated timestamp behavior already used by the project.

When adding fields, consider:

* Nullable behavior.
* Existing records.
* Validation.
* API compatibility.
* Database migration requirements.

---

# 15. Pagination, Filtering & Sorting

When a management endpoint already supports pagination, maintain the existing pattern.

Typical conventions:

```text
page
size
sortBy
sortDirection
keyword
status
```

Reuse existing `PageResponse` or pagination DTOs.

Do not introduce a second pagination format unless required.

Sorting fields should be controlled or validated when necessary to avoid invalid property access.

---

# 16. File Uploads

For uploaded files:

* Use the existing storage service and configured storage locations.
* Do not duplicate file-storage logic.
* Validate files where the project already has validation patterns.
* Generate safe stored filenames.
* Do not trust the original filename as a filesystem path.
* Preserve existing public URL conventions.

Do not change storage directories unless explicitly requested.

---

# 17. Realtime / WebSocket

When modifying realtime functionality:

* Follow the existing authentication flow.
* Reuse existing realtime event structures.
* Do not create unnecessary new connections.
* Handle closed or invalid sessions safely.
* Clean up disconnected sessions.
* Avoid broadcasting sensitive data unnecessarily.

When adding an event type, keep naming consistent with existing realtime event types.

---

# 18. AI / RAG Features

For AI-related functionality:

* Do not allow the model to invent institution-specific information.
* Prefer information retrieved from the project's approved knowledge sources.
* Preserve the project's existing fallback behavior when knowledge is insufficient.
* Do not silently introduce external web-search behavior unless explicitly required.
* Keep prompts focused and deterministic where appropriate.
* Avoid sending unnecessary sensitive user data to external AI providers.
* Reuse the existing AI service abstraction instead of calling providers directly from controllers.

---

# 19. Code Quality

Prefer readable code over clever code.

Good:

```java
User user = userRepository.findById(id)
        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
```

Avoid unnecessary abstractions like:

```text
AbstractBaseGenericUniversalServiceFactory
```

unless the project already requires such a pattern.

Use descriptive names.

Prefer:

```text
assignedStaff
sessionToken
guestQuestionCount
```

over:

```text
data
value
temp
obj
```

---

# 20. Comments

Do not add comments that simply restate the code.

Avoid:

```java
// Find user by id
User user = userRepository.findById(id);
```

Comments should explain:

* Why something unusual is necessary.
* Non-obvious business rules.
* Workarounds.
* Important implementation constraints.

---

# 21. Testing & Verification

After making changes, verify the relevant behavior where possible.

Check:

* Compilation.
* Imports.
* Type errors.
* Existing API contracts.
* Null handling.
* Authorization.
* Validation.
* Edge cases affected by the task.

For frontend changes, verify:

* No obvious runtime errors.
* Loading states still work.
* Empty states still work.
* Error states still work.
* Existing responsive layout is preserved.

For backend changes, verify:

* Controller → Service → Repository flow.
* DTO mapping.
* Expected exceptions.
* Transactions where necessary.
* Security annotations.

Do not fix unrelated test failures unless the task explicitly asks for it.

---

# 22. Build & Commands

Do not run destructive commands unless explicitly required.

Avoid commands such as:

```bash
git reset --hard
git clean -fd
git checkout .
rm -rf
```

Do not automatically:

* Commit changes.
* Push changes.
* Merge branches.
* Rebase branches.
* Force push.

unless explicitly requested.

---

# 23. Git Changes

Keep diffs focused.

Before finishing:

* Remove debug code.
* Remove temporary logs.
* Remove commented-out experiments.
* Remove unused imports.
* Ensure no secrets were added.
* Ensure unrelated files were not modified.

Do not modify generated files unless required.

---

# 24. When Requirements Are Ambiguous

First inspect the existing implementation and infer intent from:

1. Existing code.
2. Similar modules.
3. Existing API patterns.
4. Current naming conventions.
5. Database/domain structure.

Prefer consistency with the existing application over introducing a new pattern.

If a safe interpretation is possible, implement the smallest reasonable change.

Do not invent new business rules.

---

# 25. Definition of Done

A task is complete when:

* The requested behavior is implemented.
* Existing business logic outside the task remains unchanged.
* Architecture rules are respected.
* Frontend API calls remain in services.
* Backend business logic remains in services.
* DTOs are used instead of exposing entities.
* Security rules remain enforced.
* Error handling follows `AppException + ErrorCode`.
* No unnecessary dependency was added.
* No unrelated refactoring was performed.
* The resulting code matches the existing style.
* Debug or temporary code has been removed.

---

# Final Rule

When deciding between:

> "Improve the architecture"

and:

> "Solve the requested task while preserving the current architecture"

**Always prefer the second option unless the user explicitly asks for architectural changes.**
