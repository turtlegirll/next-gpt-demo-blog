# A starter Next.JS app from portfolio-starter-kit with OpenAI integration

## ✅ Preprequisites

- Node.js
- pnpm

## ✅ Setup template 

### 1. Clone and enter the project

```bash
git clone -b setup-initial-template git@github.com:evelynforkhands/next-gpt-demo-blog.git
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Now you have a blog with some example posts! You can view the blog at `http://localhost:3000`.

## ✅ Setup OpenAI

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
### 3. Install the openai packages

Install both `openai` and `@azure/openai`. From `openai`, we will use some types and from `@azure/openai`, we will use the client.

```bash
npm install openai @azure/openai
```

### 4. Create an AzureOpenAI client

To talk to AzureOpenAI, create a client in `lib/openai/client.ts` 

Look for AzureOpenAI in the openai package. Hint: you don't have to 
use azure/identity to authenticate, passing the keys directly to the client is enough:

https://yarnpkg.com/package?q=openai&name=openai


## ✅ Create a route handler

Create a route handler in `app/ai/question/route.ts`, allow POST requests, read the request body and return it.

https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body

Test it by sending a POST request to `http://localhost:3000/api/ai` with a JSON body:

```bash
curl -X POST http://localhost:3000/ai/question -H "Content-Type: application/json" -d '{"text": "Hello, World!"}'
```

Or, if you have Postman, you can use that to send a POST request to `http://localhost:3000/api/ai` with a JSON body. You can download Postman [here](https://www.postman.com/downloads/).

```json
{
  "text": "Hello, World!"
}
```

## ✅ Call Azure OpenAI from route handler

Now that you have a route handler, you can call OpenAI from it.

Update the `app/ai/question/route.ts` route handler:
- expect a JSON body with a `question` key
- and use the AzureOpenAI client you created earlier to call OpenAI with a question
- return the response from OpenAI as a `message` key in the response

Test it by sending a POST request to `http://localhost:3000/ai/question` with a JSON body containing a question:

```bash
curl -X POST http://localhost:3000/api/ai/question -H "Content-Type: application/json" -d '{"question": "what is VIM?"}'
````

## ✅ Add article content to route handler

Make the route handler pass a blog post content to OpenAI, so that we can ask questions about a specific blog post.

## ✅ Create a component

Create a component in `app/components/ai/question.tsx` that will allow you to ask questions about a blog post. The component should:
- have a text input for the question
- have a button to submit the question
- show the response from OpenAI, with formatting differences for a success or error response

Then use it in `app/blog/[slug].tsx`.

https://nextjs.org/docs/app/building-your-application/rendering/client-components
https://nextjs.org/docs/app/api-reference/components/form

## All done! 🎉