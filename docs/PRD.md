# 🧠 Product Requirements Document (PRD)

## 🌟 Project Overview
**DevLore** is an AI-powered GitHub bot that "eavesdrops" on Pull Request comments to build a persistent memory of a team's tribal knowledge, unwritten rules, and coding standards using the Hindsight Vector Database.

## 🎯 Target Users
* **Tech Leads:** Tired of repeating the same code review feedback to new hires.
* **Junior Developers:** Need automated coaching to learn team standards before submitting code.
* **Engineering Managers:** Want to ensure coding standards are preserved when senior developers leave the company.

## 🚨 Problem Statement
Engineering teams lose massive amounts of "Tribal Knowledge." Senior engineers leave rules in PR comments (e.g., *"We don't use this library"*), but those rules are lost in GitHub's history. New developers make the same mistakes over and over, leading to redundant code reviews and wasted time.

## ✅ Goals
1. **Automate Memory:** Silently capture rules from code review comments.
2. **Proactive Coaching:** Automatically review new PRs against the learned memory.
3. **Tech Lead Control:** Provide a beautiful dashboard to manage and delete memories.
