# 🌳 Git Branches: The Complete Guide

Branches allow you to work on different versions of your project simultaneously. This guide explains how to use them and lists the current branches in this project.

---

## 🛠️ Essential Branch Commands

### 1. View Branches
To see a list of all local branches (and see which one you're currently on):
```bash
git branch
```
To see all branches including remote branches on GitHub:
```bash
git branch -a
```

### 2. Create a New Branch
To create a new branch but stay on your current one:
```bash
git branch [branch-name]
```

### 3. Create and Switch to a New Branch
To create a new branch and immediately switch into it (most common):
```bash
git checkout -b [branch-name]
```

### 4. Switch Between Branches
To switch back to an existing branch:
```bash
git checkout [branch-name]
```

### 5. Rename a Branch
To rename the branch you're currently on:
```bash
git branch -m [new-name]
```

### 6. Delete a Branch
To delete a local branch (only if it has been merged):
```bash
git branch -d [branch-name]
```
To force-delete a branch even if it has unmerged changes:
```bash
git branch -D [branch-name]
```

---

## 🚀 Pushing Branches to GitHub

When you create a new branch locally, GitHub doesn't know about it yet. You need to "push" it:

```bash
# Push and set upstream (tells Git where to push in the future)
git push -u origin [branch-name]

# Standard push for subsequent updates
git push origin [branch-name]
```

---

## 🏗️ Project Branches

As of now, the following branches exist in this repository:

| Branch Name | Status | Purpose |
|---|---|---|
| `main` | Production | Contains the stable version of the landing page and basic UI. |
| `backend` | **ACTIVE** | Contains the full Node.js/Express backend, Supabase integration, and real-time feed updates. |

---

## 💡 Best Practices

1.  **Never work on `main` directly:** Always create a new branch for a feature (e.g., `git checkout -b feature-likes`).
2.  **Pull before you start:** Always run `git pull origin main` to make sure you have the latest code before starting a new branch.
3.  **Descriptive names:** Use names like `bugfix-login` or `feat-recommendations`.
