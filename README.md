# @pipeworx/codewars

[Codewars](https://docs.codewars.com/) MCP — keyless user + kata lookups.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `user(username)` — user profile (honor, leaderboardPosition, ranks, languages)
- `user_completed(username, page?)` — completed challenges
- `user_authored(username)` — authored kata
- `kata(id_or_slug)` — single kata
- `code_challenges_search(...)` — _omitted_ (no public search endpoint)

## Data source

`https://www.codewars.com/api/v1`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "codewars": {
      "url": "https://gateway.pipeworx.io/codewars/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Codewars data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
