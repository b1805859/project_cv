You are a senior frontend engineer.

Continue implementing and refactoring the API integration layer of my project to ensure it is clean, scalable, maintainable, reusable, and optimized for production-level applications.

Requirements:

Architecture:

- Refactor API handling into a proper layered architecture:
  - api/
  - services/
  - hooks/
  - store/
  - utils/
  - constants/
  - schemas/
  - types/

- Separate:
  - HTTP client logic
  - API endpoint definitions
  - business logic
  - UI state logic
  - reusable hooks

HTTP Client:

- Create a centralized API client using Axios.
- Configure:
  - baseURL from environment variables
  - timeout
  - default headers
  - request interceptors
  - response interceptors

- Automatically:
  - attach access tokens
  - handle refresh token flow
  - retry failed requests when appropriate
  - normalize API errors
  - redirect on unauthorized responses

API Layer:

- Move all direct fetch/axios calls out of components.
- Create modular API files by feature/module.
- Ensure every endpoint has:
  - typed request params
  - typed responses
  - reusable request functions

Service Layer:

- Implement business logic in services instead of components.
- Handle:
  - response transformation
  - data normalization
  - combining multiple APIs
  - validation
  - caching strategy preparation

Hooks:

- Create reusable hooks for API state handling.
- Standardize:
  - loading state
  - error state
  - retry logic
  - pagination
  - optimistic updates
  - refetch behavior

State Management:

- Integrate clean async state management.
- Prevent duplicated requests and inconsistent state.
- Normalize shared data when necessary.

Performance:

- Optimize:
  - request deduplication
  - lazy loading
  - caching
  - memoization
  - pagination
  - infinite scroll preparation

- Avoid unnecessary re-renders.

Error Handling:

- Implement centralized error handling.
- Add:
  - toast notifications
  - fallback messages
  - graceful UI degradation
  - request cancellation
  - offline/network handling

Authentication:

- Implement secure auth flow:
  - access token
  - refresh token
  - auto refresh handling
  - protected routes
  - role/permission support

Code Quality:

- Remove duplicated logic.
- Improve maintainability and readability.
- Ensure consistent naming conventions.
- Ensure scalable folder structure.
- Fix existing:
  - API bugs
  - async issues
  - race conditions
  - memory leaks
  - invalid state updates
  - TypeScript issues
  - ESLint warnings

UI/UX:

- Add:
  - loading skeletons
  - empty states
  - retry states
  - error boundaries
  - smooth async UX handling

Implementation Rules:

- Follow senior-level clean architecture principles.
- Keep components focused on presentation only.
- Ensure the system is production-ready.
- Preserve compatibility with the existing project structure and design system.
- Reuse existing utilities/components whenever possible.

Output Requirements:

- List all created files.
- List all modified files.
- Explain why each file was added or updated.
- Return complete code for all changed files.
- Include required package installations.
- Include environment variable setup if needed.
