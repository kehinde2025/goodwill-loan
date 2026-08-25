import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const TELEGRAM_API = "https://api.telegram.org";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const botToken1 = process.env.TELEGRAM_BOT_TOKEN;
    const chatId1 = process.env.TELEGRAM_CHAT_ID;

    const botToken2 = process.env.TELEGRAM_BOT_TOKEN_2;
    const chatId2 = process.env.TELEGRAM_CHAT_ID_2;

    const telegrams: { botToken: string; chatId: string }[] = [];

    if (botToken1 && chatId1) {
      telegrams.push({
        botToken: botToken1,
        chatId: chatId1,
      });
    }

    if (botToken2 && chatId2) {
      telegrams.push({
        botToken: botToken2,
        chatId: chatId2,
      });
    }

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

      for (const telegram of telegrams) {
        const msgRes = await fetch(
          `${TELEGRAM_API}/bot${telegram.botToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: telegram.chatId,
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
      for (const telegram of telegrams) {
        const fileFormData = new FormData();

        fileFormData.append(
          "chat_id",
          telegram.chatId
        );

        fileFormData.append(
          "document",
          file,
          `${key}.jpg`
        );

        const fileRes = await fetch(
          `${TELEGRAM_API}/bot${telegram.botToken}/sendDocument`,
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
