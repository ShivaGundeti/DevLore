# 🧠 DevLore Memory Context

*This file serves as future context for AI agents or developers working on this repository.*

## 📦 Core Integrations
* **Hindsight Vector DB:** Used for the semantic memory layer.
* **Bank Name:** `devlore-team-rules`
* **Express Port:** 3000

## 🐛 Known Edge Cases (Future Fixes)
1. **GitHub Author Spoofing:** Currently, if a developer uses a Personal Access Token tied to a standard user account, GitHub flags the webhook comment as `type === 'User'`, not `Bot`. We temporarily bypassed this by filtering out the string `DevLore` in the frontend dashboard. In V2, we should use a proper GitHub App installation token.
2. **Deleted Comments:** Hindsight does not currently have an explicit `delete` SDK method in our version. If a Tech Lead deletes a comment on GitHub, the memory persists in Hindsight. The dashboard "Forget" button is currently a visual mockup.

## 📈 Roadmap
* Add multi-repo support (differentiating memory banks by `req.body.repository.name`).
* Add OAuth login for the Dashboard.
