import { Command } from "commander";
import { sendTelegramMessage } from "sendkit-core";

const program = new Command();

program
  .name("sendkit")
  .description("Sendkit CLI")
  .command("telegram")
  .description("Send a Telegram Message")
  .argument("<chatId>", "Telegram Chat ID")
  .argument("<message>", "Message test to send")
  .action(async (chatId: string, message: string) => {
    try {
      const token = process.env.TELEGRAM_BOT_TOKEN;
      if (!token) {
        console.error(
          "Error: TELEGRAM_BOT_TOKEN environment variable is not set.",
        );
        process.exit(1);
      }
      if (!chatId || !message) {
        console.error("Error: Both chatId and message are required.");
        process.exit(1);
      }

      const result = await sendTelegramMessage({
        botToken: token,
        chatId,
        message,
      });

      console.log(
        `Message has been send to ${result.chatId} and text ${result.messageId}`,
      );
    } catch (error) {
      console.error("Error sending Telegram message:", error);
    }
  });

program.parseAsync(process.argv);
