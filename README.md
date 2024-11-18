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

## 🟡 Setup OpenAI (You are here!)

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

