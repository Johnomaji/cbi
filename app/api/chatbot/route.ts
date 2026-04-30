import { answerCbiQuestion } from "@/lib/chatbot";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string };
    const message = body.message?.trim();

    if (!message) {
      return Response.json({ error: "Message is required." }, { status: 400 });
    }

    const result = await answerCbiQuestion(message);
    return Response.json(result);
  } catch {
    return Response.json(
      { error: "Could not process your request right now." },
      { status: 500 },
    );
  }
}
