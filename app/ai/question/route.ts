import { openaiClient } from "app/lib/openai/client"; 
import { extractModelMessage } from "app/lib/openai/utils";

export async function POST(request: Request) {
  const jsonHeaders = { 'Content-Type': 'application/json' };

  // nothing in this world is free, and you know you're going to run this more than a few times for testing
  const useMock = true;

  try {
    const { articleQuestion } = await request.json();

    let response;

    if (useMock) {
      // mocked response for testing
      // what is VIM?
      response = `VIM, or "Vi IMproved," is a text editor that is an extended version of the original Vi editor found in UNIX systems. It is widely used for programming and editing configuration files due to its efficiency, speed, and powerful features. VIM offers modes for inserting text, navigating, and performing commands, allowing users to work quickly without the need for a mouse. It supports syntax highlighting, multi-file editing, plugins, and scripting, making it highly customizable and suitable for a range of editing tasks. VIM can be used on various operating systems, including UNIX, Linux, and Windows.`;
    } else {
      // actual API call
      let modelResponse = await openaiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: JSON.stringify({ articleQuestion }) },
          ],
        });
      response = extractModelMessage(modelResponse);
    }
    return new Response(response, { headers: jsonHeaders });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
}
