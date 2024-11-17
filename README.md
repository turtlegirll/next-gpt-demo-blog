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

## ✅  Setup: openai

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

## ✅ Add blog post context to openai


### 8. Add a context to the route

Here's the fun part! Let's add some context. We will start with something simple: let's make our route answer a question about one of our blog posts.

If we look at the structre of blog posts from the template, each post has a `slug` and `content`. 
We can use the `slug` to identify the post and use the content as the context.

```json
{
    "metadata": {
        "title": "Spaces vs. Tabs: The Indentation Debate Continues",
        "publishedAt": "2024-04-08",
        "summary": "Explore the enduring debate between using spaces and tabs for code indentation, and why this choice matters more than you might think."
    },
    "slug": "spaces-vs-tabs",
    "content": "..."
}

```

We will add another route `ai/question-blog-post` that will take a `slug` and a `question` and return the response.

If we check blog/utils, there's already a `getBlobPosts` method. Let's create a new method `getBlogPost` off of that will take a `slug` and return the post.

```typescript   
export function getBlogPost(slug: string) {
  let posts = getBlogPosts()
  return posts.find((post) => post.slug === slug)
}
```

We can now use that in our route and pass it as part of a system prompt. (HINT: when using this particular model, the entire conversation is passed with every request)

So our `messages` array now looks like this:

```typescript
[
    { role: 'system', content: "our system prompt with the blog post" },
    { role: 'user', content: "our question" }
]
```

Now our route is aware of a single blog post and can answer questions about it!

## ✅ A component for interacting with one of our routes (You are here!)

Now that the route is complete, let's create a component that will allow us to interact with it. We will create a new component `components/ai/question.tsx` that will take a `slug` as a prop and allow us to ask questions about that blog post.

We will use 4 states:

- `question` (string): The user's question input.
- `response` (string | null): The AI-generated response to the user's question.
- `loading` (boolean): Indicates whether the form submission is in progress.
- `error` (string | null): Error message if the form submission fails.

State is a fundamental concept in React. It allows you to store and update the data that determines the content of your components. The default state is an object, but it can be a string, number, boolean, or any other JavaScript data type. In our case (which is why we're passing stuff to our useState-s):

- `question` by default is an empty string.
- `response` by default is null.
- `loading` by default is false.
- `error` by default is null.

We then use those states to display the form and the response.

For us, the error state for example is very useful: we can conditionally render an error message if `error` is not null.

## All done!