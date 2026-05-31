# 📋 DevShare Logging Standards & Documentation Reference

This document serves as a guideline and catalog of the logging system used in the DevShare workspace. It outlines the purpose of each markdown file, what information must be logged within it, and how to update them so that any new developer or AI agent can seamlessly understand the history, architecture, and current state of the codebase.

---

## 🗂️ Log Files Directory

Here are the active logging and tracking files maintained in the root directory:

1. **[chat.md](file:///c:/Users/HP/OneDrive/Desktop/stitch/chat.md)** — *High-Level Dev Timeline & Summaries*
2. **[log.md](file:///c:/Users/HP/OneDrive/Desktop/stitch/log.md)** — *Step-by-Step Implementation Progress*
3. **[sql.md](file:///c:/Users/HP/OneDrive/Desktop/stitch/sql.md)** — *Permanent Database Schema & Query History*
4. **[CHECKLIST.md](file:///c:/Users/HP/OneDrive/Desktop/stitch/CHECKLIST.md)** — *Feature Status & Roadmap Checklist*
5. **[whattolog.md](file:///c:/Users/HP/OneDrive/Desktop/stitch/whattolog.md)** — *Logging Standards (This file)*

---

## 📖 File Specifications

### 1. `chat.md` (High-Level Dev Timeline & Summaries)
* **Purpose**: Tracks major structural changes, architectural pivots, Git branch operations, and overall development milestones.
* **When to Update**: At the completion of each major coding step, setup phase, or branch push.
* **What to Log**:
  - Summaries of major features (e.g., authentication, routing pivots).
  - Terminal/Git commands executed (e.g., branch creations, commits, pushes).
  - High-level descriptions of new page routes and state contexts.
  - Bullet-point logs of files created or modified for each step.

### 2. `log.md` (Step-by-Step Implementation Progress)
* **Purpose**: Chronicles every single implementation step taken by the developer or agent, serving as a detailed changelog.
* **When to Update**: At the completion of every single step (e.g., Step 1, Step 2, Step 3, etc.).
* **What to Log**:
  - **Step Title & Status** (e.g., `Step 4: Connect Projects Page to Real Database (Live Project Listing) - Status: ✅ Completed`).
  - **Goal**: A brief explanation of what the step aims to accomplish.
  - **Modifications**: A detailed list of files modified or created, including descriptions of the exact coding changes (e.g., hooks implemented, API routes connected, empty states designed).

### 3. `sql.md` (Permanent Database Schema & Query History)
* **Purpose**: Records all raw SQL queries run in the database to ensure the database schema can be fully reconstructed by anyone.
* **When to Update**: Whenever a new table, column, row-level security (RLS) policy, trigger, index, or RPC function is created/run in the database.
* **What to Log**:
  - A descriptive title for the query and the execution date (e.g., `Query 5: Projects Table & RLS Policies (Executed: May 31, 2026)`).
  - A brief summary of the query's purpose (e.g., why a table or column is added).
  - The exact, copy-pasteable SQL block wrapped in a standard markdown ` ```sql ` code fence.

### 4. `CHECKLIST.md` (Feature Status & Roadmap Checklist)
* **Purpose**: Tracks the progress of the entire roadmap across all phases.
* **When to Update**: Before starting a subphase task and immediately after completing it.
* **What to Log**:
  - The overall phase status (`[ ]` for not started, `[/]` for in-progress, `[x]` for completed).
  - Ownership division between `[AGENT]` (coding tasks) and `[USER]` (manual setup/execution tasks).

---

## ⚠️ Important Rules & Constraints

> [!IMPORTANT]
> **No Deletion Policy**: Never delete or overwrite existing log history in any of these files. Always append new progress logs, queries, and summaries to the bottom of the files (or insert them cleanly into the corresponding roadmap phase section for `CHECKLIST.md`) to maintain a complete history.

> [!TIP]
> **Detailed References**: When referencing modified files or scripts, always use markdown links pointing to the actual files in the workspace (e.g., `[ProjectList.tsx](file:///c:/Users/HP/OneDrive/Desktop/stitch/frontend/src/pages/ProjectsPage/components/ProjectList.tsx)`). This allows other developers to jump straight to the source code.
