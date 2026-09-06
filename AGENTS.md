# AGENTS.md

Welcome to **NexGear-SFE**. This file is the primary entry point and operational guide for AI Coding Agents working on this codebase.

---

## 1. Project Overview & Context

NexGear-SFE is an e-commerce for tech equipment, gaming PCs, components, and gear (inspired by models like GearVN). The project prioritizes high-performance category browsing, precise technical specification filtering, smooth cart management, and a seamless checkout experience.

### Core Stack Reality
- **Core UI:** React (`^19.2.8`) with Functional Components & React Hooks
- **Language:** TypeScript (`~6.0.2`, strict mode enabled, no `any`)
- **Bundler & Build Tool:** Vite (`^8.2.2`)
- **Styling:** Tailwind CSS
- **Data & State Management Architecture:** Modular domain APIs (`src/apis/`), client stores (`src/stores/`), utility helpers (`src/utils/`)

---

## 2. AI Working Principles

When contributing to NexGear-SFE, AI agents MUST strictly adhere to the following principles:

1. **Inspect Existing Implementations First:** Before creating new files, functions, or abstractions, thoroughly inspect the workspace for existing utility functions, hooks, or components.
2. **Reuse Existing Patterns & Abstractions:** Always reuse existing code patterns established in the repository. Do not invent duplicate abstractions or competing state/API patterns.
3. **No Unnecessary Changes:** Keep edits strictly focused on the requested task. Do not refactor unrelated code, modify formatting of untouched lines, or introduce unrequested libraries.
4. **No Speculation or Fabricated Rules:** Do not invent backend business rules, missing API endpoints, or unverified data structures. If information is missing, document it explicitly or state assumptions clearly.
5. **Prefer Minimal & Targeted Changes:** Satisfy requirements with the smallest, most maintainable diff possible.
6. **Preserve Established Contracts:** Do not break existing function signatures, component props, or shared data types.

---

## 3. Single Source of Truth & Documentation Navigation

Each documentation topic has ONE canonical owner. AI agents MUST reference the canonical document rather than creating or duplicating rules:

| Topic / Domain | Canonical Documentation File |
|---|---|
| AI Behavior & Guidance | [`AGENTS.md`](./AGENTS.md) |
| Developer & Git Workflow | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |
| Coding Standards & Conventions | [`agent-docs/CODE_CONVENTIONS.md`](./agent-docs/CODE_CONVENTIONS.md) |
| File Placement & Directory Responsibilities | [`agent-docs/FOLDER_STRUCTURE.md`](./agent-docs/FOLDER_STRUCTURE.md) |
| System & State Architecture | [`agent-docs/ARCHITECTURE.md`](./agent-docs/ARCHITECTURE.md) |
| API & HTTP Data Fetching | [`agent-docs/API_CONVENTIONS.md`](./agent-docs/API_CONVENTIONS.md) |
| UI/UX Guidelines & Design System | [`agent-docs/UI_UX_GUIDELINES.md`](./agent-docs/UI_UX_GUIDELINES.md) |
| Testing Strategy & Guide | [`agent-docs/testing.md`](./agent-docs/testing.md) |

---

## 4. Progressive Disclosure Rules

To maintain high performance and efficiency, AI agents should read ONLY the documentation relevant to the current task:

### For UI / Frontend Component Tasks
1. [`AGENTS.md`](./AGENTS.md)
2. [`agent-docs/FOLDER_STRUCTURE.md`](./agent-docs/FOLDER_STRUCTURE.md)
3. [`agent-docs/CODE_CONVENTIONS.md`](./agent-docs/CODE_CONVENTIONS.md)
4. [`agent-docs/UI_UX_GUIDELINES.md`](./agent-docs/UI_UX_GUIDELINES.md)

### For API & Data Fetching Tasks
1. [`AGENTS.md`](./AGENTS.md)
2. [`agent-docs/ARCHITECTURE.md`](./agent-docs/ARCHITECTURE.md)
3. [`agent-docs/API_CONVENTIONS.md`](./agent-docs/API_CONVENTIONS.md)
4. [`agent-docs/CODE_CONVENTIONS.md`](./agent-docs/CODE_CONVENTIONS.md)

### For State Management & Store Tasks
1. [`AGENTS.md`](./AGENTS.md)
2. [`agent-docs/ARCHITECTURE.md`](./agent-docs/ARCHITECTURE.md)
3. [`agent-docs/FOLDER_STRUCTURE.md`](./agent-docs/FOLDER_STRUCTURE.md)
4. [`agent-docs/CODE_CONVENTIONS.md`](./agent-docs/CODE_CONVENTIONS.md)

### For Testing Tasks
1. [`AGENTS.md`](./AGENTS.md)
2. [`agent-docs/testing.md`](./agent-docs/testing.md)
3. [`agent-docs/CODE_CONVENTIONS.md`](./agent-docs/CODE_CONVENTIONS.md)

---

## 5. Execution & Verification Checklist

After writing code or implementing changes, AI agents MUST execute the following verification steps before marking a task complete:
```bash
npm run lint
npm run build
```
Ensure zero TypeScript compilation errors and zero ESLint warnings exist.
