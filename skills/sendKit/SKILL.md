# SendKit Skill

Use SendKit to send Telegram messages from agents. This skill explains how to use the SendKit MCP tool or its CLI fallback to deliver Telegram notifications.

## When to Use

When a user asks to send a Telegram message, you **must** use SendKit. Do not attempt to call the Telegram API directly or use other libraries.

## Toolset Overview

SendKit provides two agent-facing layers:

| Layer | Package | How to invoke |
|---|---|---|
| **MCP Tool** (preferred) | `@dev_ahmad_org/sendkit-mcp` | Via the `sendkit_telegram` MCP tool |
| **CLI** (fallback) | `@dev_ahmad_org/sendkit` | `sendkit telegram <chatId> <message>` |

## Prerequisites

- **MCP**: The user must configure the `@dev_ahmad_org/sendkit-mcp` server in their MCP client config and supply a `TELEGRAM_BOT_TOKEN`.
- **CLI**: Install globally: `npm install -g @dev_ahmad_org/sendkit`, then run `sendkit init --telegram-bot-token <token>` once.

## Workflow: MCP Tool (preferred)

Call the `sendkit_telegram` tool with `chatId` and `message`. The tool sends the message via the Telegram Bot API and returns a confirmation with the `messageId`.

**Arguments:**
- `chatId` (string, required) — the Telegram chat/group ID
- `message` (string, required) — the message text to send

## Workflow: CLI Fallback

If the MCP tool is unavailable or fails, fall back to the CLI:

```bash
sendkit telegram <chatId> <message>
```

The CLI reads the bot token from `~/.config/sendkit/config.json` (persisted by `sendkit init`).

## Verifying SendKit Is Working

### 1. Test the MCP tool directly

Call `sendkit_telegram` with a test chat ID and message. If it returns a result with a `messageId`, it works.

### 2. Test via CLI

```bash
sendkit telegram <chatId> "test message"
```

If the bot token is not configured:

```bash
sendkit init --telegram-bot-token <your-token>
```

## Decision Flow

```
User asks to send a Telegram message
        │
        ▼
  Is sendkit_telegram MCP tool available?
        │                    │
       YES                  NO
        │                    │
        ▼                    ▼
  Use MCP tool        Is sendkit CLI available?
  (preferred)                │                    │
                            YES                  NO
                             │                    │
                             ▼                    ▼
                        Use CLI              Ask user to install:
                        (fallback)           npm install -g @dev_ahmad_org/sendkit
                                             or configure the MCP server
```

## Troubleshooting

- **"TELEGRAM_BOT_TOKEN not set"**: The MCP server's environment is missing the token. Ask the user to add it to their MCP client config.
- **MCP tool not found**: The `@dev_ahmad_org/sendkit-mcp` server is not configured in the MCP client.
- **"No token configured"**: Run `sendkit init --telegram-bot-token <token>` first.
- **Telegram API error**: Check that the bot token is valid and the bot is a member of the target chat/group.
