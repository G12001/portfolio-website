/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";
import { getSystemPrompt } from "@/data/knowledgeBase";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Sanitize incoming messages to ensure content is never undefined
  const sanitizedMessages = messages.map((m: any) => ({
    ...m,
    content: m.content || "",
  }));

  const result = streamText({
    model: google("gemini-3.6-flash"),
    system: getSystemPrompt(),
    messages: sanitizedMessages,
    tools: {
      showResume: tool({
        description: "Show the user's resume in the UI",
        parameters: z.object({}),
      } as any),
      showProjects: tool({
        description: "Show the interactive projects workspace in the UI",
        parameters: z.object({}),
      } as any),
      showGithub: tool({
        description: "Show the live GitHub profile and stats in the UI",
        parameters: z.object({}),
      } as any),
      explainProjectArchitecture: tool({
        description: "Show the interactive architecture diagram for a specific project",
        parameters: z.object({
          projectId: z.enum(["fleetlink", "erp"]).describe("The ID of the project to explain"),
        }),
      } as any),
    } as any,
  });

  return result.toUIMessageStreamResponse();
}
