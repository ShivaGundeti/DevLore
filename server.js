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
// Serve the frontend dashboard
app.use(express.static('public'));

// Endpoint for the Dashboard to fetch memories
app.get('/api/rules', async (req, res) => {
    try {
        const response = await client.recall(BANK_NAME, 'team rules and coding standards');
        res.json({ rules: response.results || [] });
    } catch (error) {
        res.status(500).json({ rules: [] });
    }
});

app.post('/webhook', async (req, res) => {
    const event = req.headers['x-github-event'];
    res.status(200).send();

    if (event === 'issue_comment' && req.body.action === 'created') {
        if (req.body.issue?.pull_request) {
            const author = req.body.comment.user.login;
            const commentText = req.body.comment.body;
            
            if (req.body.comment.user.type === 'Bot') return;

            try {
                await client.retain(BANK_NAME, `Rule/Context by ${author}: ${commentText}`);
            } catch (error) {}
        }
    }

    if (event === 'pull_request' && (req.body.action === 'opened' || req.body.action === 'synchronize')) {
        const pr = req.body.pull_request;
        const owner = req.body.repository.owner.login;
        const repo = req.body.repository.name;
        
        try {
            const diffResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3.diff',
                    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                    'User-Agent': 'DevLore-App'
                }
            });
            const diff = await diffResponse.text();

            const recallQuery = `The developer wrote this code:\n${diff}\nAre there any team rules about this?`;
            const response = await client.recall(BANK_NAME, recallQuery);

            if (response.results && response.results.length > 0) {
                const answer = await client.reflect(BANK_NAME, 
                    `A developer wrote this code:\n${diff}\nBased on our team rules, write a short, polite GitHub PR comment advising them. Start your comment with "🤖 **DevLore (Team Memory):**"`
                );

                await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${pr.number}/comments`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                        'Content-Type': 'application/json',
                        'User-Agent': 'DevLore-App'
                    },
                    body: JSON.stringify({ body: answer.text })
                });
            }
        } catch (error) {}
    }
});

app.listen(PORT, () => console.log(`🚀 DevLore server listening on port ${PORT}...`));
