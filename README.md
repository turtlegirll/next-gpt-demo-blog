# A starter Next.JS app from portfolio-starter-kit with OpenAI integration

## ✅ Preprequisites

- Node.js
- pnpm

## ✅ Setup

### 1. Clone and enter the project

```bash
git clone -b setup-initial-template git@github.com:evelynforkhands/next-gpt-demo-blog.git
cd blog
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

## 🟡 Setup: openai (You are here!)

### 1. Create the `.env` file from `.env.example` 

```bash
cp .env.example .env
```

### 2. Update the following 3 values in the `.env` file

```bash
AZURE_OPENAI_API_KEY
AZURE_OPENAI_ENDPOINT
OPENAI_API_VERSION
```
If we keep to this naming, the AzureOpenAI client will be initialised with them without needing to pass them in as arguments.

### 3. Install the openai packages

Install both `openai` and `@azure/openai`. From `openai`, we will use some types and from `@azure/openai`, we will use the client.


```bash
npm install openai @azure/openai
```

### 4. Initialise the AzureOpenAI client

Let's separate the client from the handler. We will initialise the client in `lib/openai/client.ts` and export it.

We only need to pass the `deployment` to the client. The client will be initialised with the `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, and `OPENAI_API_VERSION` from the `.env` file.

```typescript
import { AzureOpenAI } from "openai";

const deployment = process.env.DEPLOYMENT;

export const openaiClient = new AzureOpenAI({deployment})
```

### 5. Create a route 

We will start with a no-context route that will just call the client and return the response.

Create a new file `app/ai/question/route.ts` - API routes don't have to start with `pages/api` but can be anywhere in the `app` directory, let's keep our ai-related routes in `app/ai`.

We will add a `useMock` flag to the route to allow us to test the route without calling the OpenAI API.


### 6. Create a method to extract the response message

To keep our route clean, we will create a collections of util methods in `lib/openai/utils.ts`, and start with one that will take the raw response from the client and return the message.

```typescript
import OpenAI from "openai";

export const extractModelMessage = (completion: OpenAI.ChatCompletion) => {
    return completion.choices[0]?.message?.content;
}
```

### 7. Complete the route

Now we can complete the route by calling the client and returning the response. If all goes well, we will return the response message. If there is an error, we will return the error message. Now you can test the route by calling it with a question!

POST `/api/ai/question` with a body like:

```json
{
    "question": "What is VIM?"
}
```