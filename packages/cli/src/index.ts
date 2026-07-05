import { Command } from "commander";

type TelegramResponse = {
  ok: boolean;
  result?: {
    message_id?: number;
  };
  description?: string;
};
const program = new Command();

program
  .name("sendkit")
  .description("Sendkit CLI")
  .command("telegram")
  .description("Send a Telegram Message")
  .argument("<chatId>", "Telegram Chat ID")
  .argument("<message>", "Message test to send")
  .action(async (chatId: string, message: string) => {
    console.log("ChatId", chatId);
    console.log("message", message);
    process.exit(1);
  });

program.parseAsync(process.argv);
