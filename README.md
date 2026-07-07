# 📦 SendKit Skill

Use **SendKit** to send Telegram messages from AI agents. This skill provides a standardized way to send Telegram notifications using either the **SendKit MCP Tool** (recommended) or the **SendKit CLI** (fallback).

> **Important**
> Always use SendKit when a user requests sending a Telegram message. Do **not** interact with the Telegram Bot API directly or use third-party Telegram libraries.

---

# Features

- ✅ Send Telegram messages from AI agents
- ✅ MCP-first architecture
- ✅ CLI fallback when MCP isn't available
- ✅ Simple setup
- ✅ Supports any MCP-compatible client

---

# Tool Overview

| Method | Package | Usage |
|---------|----------|------|
| **MCP Tool (Recommended)** | `@dev_ahmad_org/sendkit-mcp` | `sendkit_telegram` |
| **CLI (Fallback)** | `@dev_ahmad_org/sendkit` | `sendkit telegram <chatId> <message>` |

---

# Installation

## MCP Server

Install the MCP server:

```bash
npm install @dev_ahmad_org/sendkit-mcp
```

Configure your MCP client and provide:

```text
TELEGRAM_BOT_TOKEN=<your_bot_token>
```

---

## CLI

Install globally:

```bash
npm install -g @dev_ahmad_org/sendkit
```

Initialize SendKit:

```bash
sendkit init --telegram-bot-token <your_bot_token>
```

This stores your bot token in:

```
~/.config/sendkit/config.json
```

---

# Usage

## Preferred: MCP Tool

Use the `sendkit_telegram` MCP tool.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `chatId` | string | ✅ | Telegram chat or group ID |
| `message` | string | ✅ | Message text |

### Example

```json
{
  "chatId": "-1001234567890",
  "message": "Deployment completed successfully 🚀"
}
```

### Expected Response

```json
{
  "success": true,
  "messageId": 124
}
```

---

# CLI Fallback

If the MCP tool is unavailable, use the CLI.

```bash
sendkit telegram <chatId> "<message>"
```

Example:

```bash
sendkit telegram -1001234567890 "Hello from SendKit!"
```

---

# Verification

## Verify MCP

Send a test message using the MCP tool.

If the response contains a `messageId`, the configuration is working correctly.

Example response:

```json
{
  "success": true,
  "messageId": 315
}
```

---

## Verify CLI

```bash
sendkit telegram <chatId> "Test message"
```

If successful, the message will be delivered and a confirmation will be displayed.

---

# Decision Flow

```text
User requests Telegram message
             │
             ▼
 Is sendkit_telegram MCP available?
             │
      ┌──────┴──────┐
      │             │
     YES           NO
      │             │
      ▼             ▼
Use MCP Tool   Is CLI installed?
                    │
            ┌───────┴────────┐
            │                │
           YES              NO
            │                │
            ▼                ▼
        Use CLI      Ask user to install

        npm install -g @dev_ahmad_org/sendkit

        or configure the MCP server.
```

---

# Troubleshooting

## `TELEGRAM_BOT_TOKEN not set`

The MCP server is missing the Telegram bot token.

Add the following environment variable to your MCP configuration:

```text
TELEGRAM_BOT_TOKEN=<your_bot_token>
```

---

## MCP Tool Not Found

The SendKit MCP server has not been configured.

Install and configure:

```bash
npm install @dev_ahmad_org/sendkit-mcp
```

---

## No Token Configured

Initialize the CLI first:

```bash
sendkit init --telegram-bot-token <your_bot_token>
```

---

## Telegram API Error

Possible causes:

- Invalid bot token
- Bot is not a member of the target group
- Invalid chat ID
- Bot lacks permission to send messages

---

# Best Practices

- Prefer the MCP tool over the CLI.
- Configure `TELEGRAM_BOT_TOKEN` using environment variables.
- Never hardcode bot tokens.
- Avoid using the Telegram Bot API directly from agent code.
- Use the CLI only as a fallback.

---

# Example Workflow

1. User asks the agent to send a Telegram message.
2. Agent checks whether the `sendkit_telegram` MCP tool is available.
3. If available, send the message using MCP.
4. Otherwise, use the CLI.
5. Return the resulting `messageId` to confirm delivery.

---

# License

MIT

---

Built with ❤️ using **SendKit**.
