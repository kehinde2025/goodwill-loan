import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const TELEGRAM_API = "https://api.telegram.org";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      throw new Error("Bot token or chat ID not set in environment variables");
    }

    const textEntries: string[] = [];
    const files: { key: string; file: Blob }[] = [];

    data.forEach((value, key) => {
      if (value instanceof Blob && value.size > 0) {
        files.push({ key, file: value });
      } else if (typeof value === "string") {
        textEntries.push(`${key}: ${value}`);
      }
    });

    if (textEntries.length > 0) {
      const text = textEntries.join("\n");
      const msgRes = await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      if (!msgRes.ok) {
        const err = await msgRes.text();
        throw new Error(`SendMessage failed: ${err}`);
      }
    }

    for (const { key, file } of files) {
      // Compress: send as photo if small enough, else document
      const fileFormData = new FormData();
      fileFormData.append("chat_id", chatId);
      fileFormData.append("document", file, `${key}.jpg`);

      const fileRes = await fetch(`${TELEGRAM_API}/bot${botToken}/sendDocument`, {
        method: "POST",
        body: fileFormData,
      });
      if (!fileRes.ok) {
        const err = await fileRes.text();
        throw new Error(`SendDocument failed for ${key}: ${err}`);
      }
    }

    return NextResponse.json({ ok: true, message: "All data sent to Telegram" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
