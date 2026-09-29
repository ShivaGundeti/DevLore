<div align="center">
  <h1>🧠 DevLore</h1>
  <p><strong>The Context-Aware AI Code Reviewer for High-Performing Teams.</strong></p>
  
  [![Hindsight](https://img.shields.io/badge/Powered_by-Hindsight-0074d9?style=for-the-badge)](https://vectorize.io)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
  [![GitHub Webhooks](https://img.shields.io/badge/GitHub-Webhooks-181717?style=for-the-badge&logo=github)](https://github.com)
</div>

---

## ⚠️ The Problem

Engineering teams possess massive amounts of **"tribal knowledge"**—unwritten rules, past architectural decisions, and specific coding styles (e.g., *"we don't use `moment.js` anymore"*). 

Senior developers waste countless hours repeating the exact same feedback to new hires on Pull Requests. Writing custom ESLint rules or updating Notion Wikis takes too much effort, so the knowledge is lost the moment the PR is merged.

## 💡 The Solution

**DevLore acts as the long-term memory of your engineering team.** 

It passively eavesdrops on human-to-human PR comments. It learns the team's preferences and uses that memory to automatically warn developers when they violate an unwritten rule *before* a human reviewer even looks at the code.

---

## ⚙️ How it Works (Powered by Hindsight)

DevLore is built on top of **Hindsight's** persistent memory architecture, transforming a simple chatbot into a stateful team member.

| Phase | Action | Description |
| :--- | :--- | :--- |
| 🧠 **RETAIN** | *Passive Learning* | When a senior developer leaves a comment correcting code on GitHub, the DevLore webhook receives the payload. It extracts the context and uses `client.retain()` to permanently store the "rule" in the team's Hindsight memory bank. |
| 🔍 **RECALL** | *Context Retrieval* | When a new Pull Request is opened, DevLore fetches the code diff and uses `client.recall()` to ask Hindsight if the team has any historical rules regarding the modified code. |
| 🤖 **REFLECT** | *Automated Coaching* | If a relevant memory is found, DevLore uses `client.reflect()` to intelligently formulate a polite, context-aware PR comment and posts it directly to GitHub using native APIs. |

---

## 🚀 The Hackathon MVP Architecture

For this 24-hour hackathon, we built the core reasoning engine:
- **Backend:** Node.js / Express
- **Integration:** GitHub Webhooks (tunneled via Ngrok) & Native Fetch APIs
- **Memory/AI Engine:** Hindsight SDK (`retain`, `recall`, `reflect`)

---

## 🛣️ Path to Production

While our MVP utilizes Personal Access Tokens (PATs) and local Ngrok tunnels to demonstrate the core Hindsight integration, the production roadmap is fully designed:

- 📦 **GitHub App Integration:** Packaged as a 1-click installable GitHub App.
- 🔐 **Dynamic Authentication:** Utilizing GitHub Apps Private Keys to generate short-lived JWTs (removing the need for `.env` tokens).
- 🏢 **Multi-Tenant Memory Banks:** Dynamically isolating Hindsight memory banks per repository (e.g., `owner/repo-rules`).
- ⚡ **Cloud Hosting:** Deploying the webhook receiver to AWS Lambda or Vercel Edge Functions for zero-latency responses.

---
<div align="center">
  <i>Built with ❤️ for the Hindsight Hackathon.</i>
</div>
