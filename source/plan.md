Analyze the entire project structure and identify all missing pages, components, layouts, hooks, contexts, services, styles, and reusable UI elements required for the application to function completely.

Requirements:

- Scan all existing files and folders.
- Detect broken imports, missing routes, missing components, missing assets, and unfinished features.
- Automatically create all missing pages and components following the current architecture and coding style of the project.
- Preserve consistency with existing:
  - folder structure
  - naming conventions
  - state management
  - styling system
  - design patterns
  - theme/colors

- If a component is partially implemented, complete it.
- If mock data exists, integrate it correctly into the missing pages/components.
- Create responsive layouts for desktop, tablet, and mobile.
- Add placeholder loading states, empty states, and error handling where necessary.
- Ensure all routes/pages render correctly without console errors.
- Refactor duplicated code into reusable components when appropriate.
- Add missing SCSS/CSS module files if needed.
- Ensure imports/exports are correct across the entire project.
- Fix any JSX, TypeScript, ESLint, or build errors found during implementation.
- Maintain clean, scalable, production-ready code.

Output requirements:

- Show every created file path.
- Show every modified file path.
- Explain briefly why each file was added or updated.
- Return complete code for all new or modified files.
