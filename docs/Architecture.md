# 🏗️ Architecture & App Flow

## 🔄 App Flow
1. **Retain Phase:** A developer leaves a comment on GitHub. A webhook triggers DevLore.
2. **Memory Storage:** DevLore saves the rule to the Hindsight Vector DB.
3. **Recall Phase:** A new PR is opened. DevLore fetches the code diff and asks Hindsight if any rules apply.
4. **Reflect Phase:** DevLore automatically posts a coaching comment on the PR.

## 🛠️ Technology Stack
* **Backend:** Node.js (v24), Express.js
* **Database:** Hindsight Vector DB (by Vectorize)
* **Frontend:** Vanilla HTML/CSS (Glassmorphism, CSS Grid)
* **Integrations:** GitHub Webhooks, native `fetch` API

## 📂 Folder Structure
```text
DevLore/
├── public/
│   └── index.html      # Glassmorphism Dashboard UI
├── docs/               # Project Documentation
├── server.js           # Core Express backend & Webhook logic
├── README.md           # Project Pitch
├── package.json        # Dependencies
└── .env                # Hindsight & GitHub API Keys
```

## 📊 System Architecture Diagram
```mermaid
graph TD
    classDef github fill:#f0fdf4,stroke:#22c55e,stroke-width:2px;
    classDef server fill:#eff6ff,stroke:#3b82f6,stroke-width:2px;
    classDef db fill:#fdf4ff,stroke:#d946ef,stroke-width:2px;

    A[🧑‍💻 Developer comments on PR] -->|Webhook| B(⚙️ Express Server)
    B -->|client.retain| C[(🧠 Hindsight Vector DB)]
    D[🆕 New PR Opened] -->|Webhook| B
    B -->|Fetch Code Diff| E[🐙 GitHub API]
    E --> B
    B -->|client.recall| C
    C -->|Returns Rule| B
    B -->|client.reflect| C
    C -->|Generates AI Response| B
    B -->|Posts Comment| F[💬 GitHub PR]

    class A,D,E,F github;
    class B server;
    class C db;
```
