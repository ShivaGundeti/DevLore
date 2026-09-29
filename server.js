import 'dotenv/config';
import express from 'express';
import { HindsightClient } from '@vectorize-io/hindsight-client';

const app = express();
const PORT = 3000;
const BANK_NAME = 'devlore-team-rules';

const client = new HindsightClient({ 
    baseUrl: process.env.HINDSIGHT_URL,
    apiKey: process.env.HINDSIGHT_API_KEY
});

app.use(express.json());

app.post('/webhook', async (req, res) => {
    const event = req.headers['x-github-event'];
    res.status(200).send('Webhook received');

    if (event === 'issue_comment' && req.body.action === 'created') {
        if (req.body.issue?.pull_request) {
            const author = req.body.comment.user.login;
            const commentText = req.body.comment.body;
            
            if (req.body.comment.user.type === 'Bot') return;

            console.log(`\n🧠 [RETAIN] ${author}: "${commentText}"`);

            try {
                await client.retain(BANK_NAME, `Rule/Context by ${author}: ${commentText}`);
                console.log("✅ Saved to DevLore Memory!");
            } catch (error) {
                console.error("❌ Failed to save memory:", error);
            }
        }
    }
});

app.listen(PORT, () => console.log(`🚀 DevLore server listening on port ${PORT}...`));
