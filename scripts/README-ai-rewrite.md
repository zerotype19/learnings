# AI Definition Rewrite Script

This script uses OpenAI's GPT-4 to automatically rewrite all term definitions in the database with satirical, witty content.

## Features

- **Batch Processing**: Processes terms in batches of 10 to avoid rate limits
- **Rate Limiting**: Includes delays between batches to respect API limits
- **Error Handling**: Continues processing even if some definitions fail
- **Migration Generation**: Creates a SQL migration file for easy deployment
- **Detailed Reporting**: Generates a comprehensive report of all changes
- **Progress Tracking**: Shows real-time progress during processing

## Setup

1. **Get OpenAI API Key**:
   - Visit https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key

2. **Set Environment Variable**:
   ```bash
   export OPENAI_API_KEY='your-api-key-here'
   ```

3. **Run Setup Script**:
   ```bash
   ./scripts/setup-ai-rewrite.sh
   ```

## Usage

```bash
node scripts/ai-rewrite-definitions.js
```

## What It Does

1. **Fetches All Terms**: Retrieves all terms from the API (with pagination)
2. **Processes in Batches**: Groups terms into batches of 10 for processing
3. **AI Rewriting**: Uses GPT-4 to generate satirical definitions
4. **Generates Migration**: Creates a SQL migration file with all updates
5. **Creates Report**: Generates a detailed report of all changes

## Output Files

- `infra/d1-migrations/040_ai_rewritten_definitions.sql` - SQL migration file
- `ai-definitions-report.txt` - Detailed report of all changes

## Configuration

You can modify these settings in the script:

```javascript
const BATCH_SIZE = 10; // Terms per batch
const DELAY_BETWEEN_BATCHES = 2000; // Delay in milliseconds
```

## Cost Estimation

- **GPT-4 API Cost**: ~$0.03 per 1K tokens
- **Estimated Cost**: ~$5-15 for 500 terms (depending on definition length)
- **Processing Time**: ~10-15 minutes for 500 terms

## Safety Features

- **Rate Limiting**: Built-in delays to avoid API rate limits
- **Error Recovery**: Continues processing even if some requests fail
- **Validation**: Checks API responses before using them
- **Backup**: Original definitions are preserved in the report

## After Running

1. **Review the Migration**: Check the generated SQL file
2. **Apply Migration**: `wrangler d1 migrations apply learnings --remote`
3. **Verify Results**: Check the website to see the new definitions

## Example Output

```
Starting AI definition rewrite process...

Fetching all terms from API...
Fetched page 1: 100 terms (total: 100)
Fetched page 2: 100 terms (total: 200)
...
Total terms fetched: 500

Processing 500 terms in 50 batches of 10...

Processing batch 1/50 (10 terms)...
  Rewriting: Crypto Paradigm
  Rewriting: Seamless Synergy
  ...
  Batch 1 completed: 10/10 successful

✅ Process completed successfully!
📊 Statistics:
   - Total terms processed: 500
   - Successfully rewritten: 498
   - Success rate: 99.6%
```

## Troubleshooting

- **API Key Issues**: Make sure your OpenAI API key is valid and has credits
- **Rate Limiting**: The script includes delays, but you can increase them if needed
- **Network Issues**: The script will retry failed requests automatically
- **Memory Issues**: For very large datasets, consider reducing batch size
