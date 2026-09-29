import { HindsightClient } from '@vectorize-io/hindsight-client';
import 'dotenv/config';
// Note: Ensure your Hindsight local server/docker is running on 8888, 
// or update this URL if the hackathon gave you a cloud URL!
const client = new HindsightClient({ 
    baseUrl: process.env.HINDSIGHT_URL,
    apiKey: process.env.HINDSIGHT_API_KEY
});

const BANK_NAME = 'devlore-team-rules';

async function run() {
    console.log("🧠 1. Retaining a new team rule...");
    
    // Simulating Bob (Tech Lead) leaving a comment on a PR
    await client.retain(
        BANK_NAME, 
        'Team Rule: We no longer use moment.js because of bundle size. Use date-fns instead. Source: Bob in PR #10'
    );
    console.log("✅ Rule saved to Hindsight!\n");

    console.log("🔍 2. Recalling rules for a new PR...");
    
    // Simulating Alice (New Hire) opening a PR using moment.js
    const response = await client.recall(
        BANK_NAME, 
        'The developer just wrote code using moment.js. Are there any rules about this?'
    );
    
    console.log("Hindsight found these past memories:");
    for (const r of response.results) {
        console.log(`- ${r.text}`);
    }

    console.log("\n🤖 3. Asking Hindsight to Reflect on what to do...");
    const answer = await client.reflect(
        BANK_NAME, 
        'A developer just opened a PR using moment.js. Based on team rules, what should I comment on their PR?'
    );
    console.log(`Bot Comment: ${answer.text}`);
}

run().catch(console.error);
