# AGENTS.md

Welcome to **NexGear-SFE**. This document serves as the primary operational guide and baseline reference for AI Coding Agents working on this repository.

---

## 1. Project Overview & Current Baseline Status

NexGear-SFE is a Frontend-only e-commerce application for tech equipment, gaming PCs, components, and gear (inspired by models like GearVN).

> [!IMPORTANT]
> **Frontend-Only Reality:** Backend services are currently **NOT** implemented. Data access layers in `src/apis/` operate as asynchronous abstractions over structured domain mock data in `src/mocks/`. Real HTTP client calls (Axios/fetch), token refresh handlers, and backend endpoints are **DEFERRED** until real backend services exist.

### Core Tech Stack Baseline
- **UI Framework:** React (`^19.2.8`) with Functional Components & React Hooks
- **Language:** TypeScript (`~6.0.2`, strict mode enabled, no `any`)
- **Bundler & Build Tool:** Vite (`^8.2.2`)
- **Styling:** Tailwind CSS & Custom CSS Variables (`src/index.css`)
- **Routing:** React Router (`^7.2.0`) with centralized route constants (`src/constants/routes.ts`)
- **Global Toast System:** Unified `useToast()` hook (`src/hooks/useToast.ts`) backed by `ToastProvider` (`src/providers/ToastProvider.tsx`)
- **Cart State Management:** Custom Pub-Sub store (`src/stores/cartStore.ts`) using React's `useSyncExternalStore`
- **Domain Mock Data:** Categorized under `src/mocks/` (`customer/`, `storemanager/`, `techstaff/`, `auth/`)

---

## 2. AI Working Principles

AI Coding Agents MUST strictly adhere to the following operational rules:

1. **Source of Truth First:** Treat active source code as the absolute source of truth. Never assume patterns that do not exist in code.
2. **Inspect & Reuse Existing Patterns:** Thoroughly inspect existing code before creating new files or helper utilities. Always reuse existing hooks, components, and constants.
3. **Frontend-Only Scope:** Do NOT create Axios clients, fake HTTP servers, backend endpoints, or authentication refresh tokens.
4. **No Unrequested Redesign or Libraries:** Maintain current UI/UX designs, colors (`#E30019`), typography, and layout. Do NOT install new dependencies (Zustand, Redux, Axios) without explicit user authorization.
5. **Preserve Component Contracts:** Do not break existing component props, function signatures, or shared TypeScript interfaces.
6. **No Speculation:** Do not invent non-existent backend APIs or business rules. If details are missing, document them or ask for clarification.

---

## 3. Single Source of Truth & Documentation Navigation

Each documentation topic has ONE canonical owner. AI agents MUST reference the corresponding file:

| Topic / Domain | Canonical Documentation File |
|---|---|
| AI Behavior & Rules | [`AGENTS.md`](./AGENTS.md) |
| Developer & Git Workflow | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |
| Coding Standards & Conventions | [`agent-docs/code_conventions.md`](./agent-docs/code_conventions.md) |
| File Placement & Directory Structure | [`agent-docs/FOLDER_STRUCTURE.md`](./agent-docs/FOLDER_STRUCTURE.md) |
| System & State Architecture | [`agent-docs/ARCHITECTURE.md`](./agent-docs/ARCHITECTURE.md) |
| API & Data Access Abstraction | [`agent-docs/API_CONVENTIONS.md`](./agent-docs/API_CONVENTIONS.md) |
| UI/UX Guidelines & Design Tokens | [`agent-docs/UI_UX_GUIDELINES.md`](./agent-docs/UI_UX_GUIDELINES.md) |
| Testing & Validation Strategy | [`agent-docs/testing.md`](./agent-docs/testing.md) |
| Project Getting Started | [`README.md`](./README.md) |

---

## 4. Progressive Disclosure Rules

AI agents should read ONLY the documentation relevant to the current task:

### For UI / Component Tasks
1. [`AGENTS.md`](./AGENTS.md)
2. [`agent-docs/FOLDER_STRUCTURE.md`](./agent-docs/FOLDER_STRUCTURE.md)
3. [`agent-docs/code_conventions.md`](./agent-docs/code_conventions.md)
4. [`agent-docs/UI_UX_GUIDELINES.md`](./agent-docs/UI_UX_GUIDELINES.md)

### For API & Data Access Tasks
1. [`AGENTS.md`](./AGENTS.md)
2. [`agent-docs/ARCHITECTURE.md`](./agent-docs/ARCHITECTURE.md)
3. [`agent-docs/API_CONVENTIONS.md`](./agent-docs/API_CONVENTIONS.md)

### For State Management & Store Tasks
1. [`AGENTS.md`](./AGENTS.md)
2. [`agent-docs/ARCHITECTURE.md`](./agent-docs/ARCHITECTURE.md)
3. [`agent-docs/FOLDER_STRUCTURE.md`](./agent-docs/FOLDER_STRUCTURE.md)

### For Git / Workflow Tasks
1. [`AGENTS.md`](./AGENTS.md)
2. [`CONTRIBUTING.md`](./CONTRIBUTING.md)

---

## 5. Required Verification Workflow

After making any code modifications, AI agents MUST execute the exact baseline verification suite:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Ensure **zero** TypeScript compilation errors, **zero** ESLint errors/warnings, and a successful production build.

---

## 6. Git & Smart Commit Rules

When instructed to commit changes, follow Jira Smart Commit syntax:

- **Commit Message Format:** `NXG-[id] #[status] [description]`
  - Example: `NXG-1 #in-progress Phase 4: Final architecture cleanup and documentation alignment`
- **Status Keywords:** `#in-progress`, `#review`, `#done`
- **Explicit File Staging:** Stage ONLY modified task files. Never use indiscriminate `git add .` unless explicitly requested.
