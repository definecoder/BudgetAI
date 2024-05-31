import { OpenAI } from "openai";
import fs from "fs";
import path from "path";
import { ChatCompletionFunctionRunnerParams } from "openai/lib/ChatCompletionRunner";
import { ChatCompletionMessageParam } from "openai/resources";

const systemMessage = fs.readFileSync(
  path.join(__dirname, "system_message.txt"),
  "utf8"
);

const userMessage = fs.readFileSync(
  path.join(__dirname, "user_message.txt"),
  "utf8"
);

const assistantMessage = fs.readFileSync(
  path.join(__dirname, "assistant_message.txt"),
  "utf8"
);

let converstationHistory: ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: systemMessage,
  },
  {
    role: "user",
    content: userMessage,
  },
  {
    role: "assistant",
    content: assistantMessage,
  },
];

export const getExpenseInfo = async (
  prompt: string,
  openai: OpenAI
): Promise<string> => {
  let result = "";

  converstationHistory.push({
    role: "user",
    content: prompt,
  });

  while (result.length < 2000) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: converstationHistory,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const content = response.choices[0].message.content;

    result += content;

    if (content && content[content.length - 1] === "}") {
      break;
    }

    const newPrompt = "Please complete it";

    converstationHistory.push(
      {
        role: "assistant",
        content: content,
      },
      {
        role: "user",
        content: newPrompt,
      }
    );
  }

  return result;
};
