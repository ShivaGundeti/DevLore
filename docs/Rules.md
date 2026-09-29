# 📋 Development Rules & Standards

## 🏛️ General Principles
* **Stateless over Stateful:** The Node.js server should remain stateless. All memory must be offloaded to Hindsight.
* **Fail Gracefully:** If Hindsight APIs time out, the server should not crash.
* **Webhook Speed:** Always respond to GitHub webhooks with `res.status(200).send()` *before* executing heavy AI tasks.

## 💻 Technology & Coding Standards
* **No `console.log` in Production:** Avoid committing debug logs (especially those mentioning "PR-Agent" or test strings).
* **Native Fetch:** Due to compatibility issues with Node v24, use native `fetch()` instead of `octokit` for GitHub API calls.
* **Async/Await:** All API calls must use modern `async/await` syntax wrapped in `try/catch` blocks.

## 🤖 AI Agent Rules
* **No Self-Looping:** The webhook must explicitly ignore comments authored by `type === 'Bot'` or containing the string `"DevLore (Team Memory)"` to prevent the AI from learning from its own coaching.
* **Polite Coaching:** The AI prompt must instruct the agent to be polite, concise, and helpful to junior developers.
