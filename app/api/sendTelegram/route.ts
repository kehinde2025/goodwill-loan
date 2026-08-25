import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const TELEGRAM_API = "https://api.telegram.org";

type TelegramConfig = {
  botToken: string;
  chatId: string;
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const telegrams: TelegramConfig[] = [
      {
        botToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
        chatId: process.env.TELEGRAM_CHAT_ID ?? "",
      },
      {
        botToken: process.env.TELEGRAM_BOT_TOKEN_2 ?? "",
        chatId: process.env.TELEGRAM_CHAT_ID_2 ?? "",
      },
    ].filter(
      (telegram): telegram is TelegramConfig =>
        Boolean(telegram.botToken && telegram.chatId)
    );

    if (telegrams.length === 0) {
      throw new Error(
        "No Telegram bot token or chat ID configured"
      );
    }

    const textEntries: string[] = [];
    const files: { key: string; file: Blob }[] = [];

    data.forEach((value, key) => {
      if (value instanceof Blob && value.size > 0) {
        files.push({
          key,
          file: value,
        });
      } else if (typeof value === "string") {
        textEntries.push(`${key}: ${value}`);
      }
    });

    // Send text to both Telegram bots
    if (textEntries.length > 0) {
      const text = textEntries.join("\n");

      for (const { botToken, chatId } of telegrams) {
        const msgRes = await fetch(
          `${TELEGRAM_API}/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: chatId,
              text,
            }),
          }
        );

        if (!msgRes.ok) {
          const err = await msgRes.text();

          throw new Error(
            `SendMessage failed: ${err}`
          );
        }
      }
    }

    // Send uploaded files to both Telegram bots
    for (const { key, file } of files) {
      for (const { botToken, chatId } of telegrams) {
        const fileFormData = new FormData();

        fileFormData.append("chat_id", chatId);

        fileFormData.append(
          "document",
          file,
          `${key}.jpg`
        );

        const fileRes = await fetch(
          `${TELEGRAM_API}/bot${botToken}/sendDocument`,
          {
            method: "POST",
            body: fileFormData,
          }
        );

        if (!fileRes.ok) {
          const err = await fileRes.text();

          throw new Error(
            `SendDocument failed for ${key}: ${err}`
          );
        }
      }
    }

    return NextResponse.json({
      ok: true,
      message: "All data sent to both Telegram accounts",
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
