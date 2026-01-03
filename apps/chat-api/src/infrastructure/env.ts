import process from 'node:process';
import { z } from 'zod';

function normalizeEndpoint(value: string): string {
    return value.replace(/\/+$/, '');
}

const EnvSchema = z.object({
    // Azure AI Search
    AZURE_SEARCH_ENDPOINT: z.string().url().transform(normalizeEndpoint),
    AZURE_SEARCH_ADMIN_KEY: z.string().min(1),

    // Azure OpenAI
    AZURE_OPENAI_ENDPOINT: z.string().url().transform(normalizeEndpoint),
    AZURE_OPENAI_API_KEY: z.string().min(1),
    AZURE_OPENAI_GPT_4_1_MINI_NAME: z.string().min(1),

    // Azure Storage
    AZURE_DOCS_STORAGE_CONNECTION_STRING: z.string().min(1),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse({
    AZURE_SEARCH_ENDPOINT: process.env.AZURE_SEARCH_ENDPOINT,
    AZURE_SEARCH_ADMIN_KEY: process.env.AZURE_SEARCH_ADMIN_KEY,

    AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_API_KEY: process.env.AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_GPT_4_1_MINI_NAME: process.env.AZURE_OPENAI_GPT_4_1_MINI_NAME,

    AZURE_DOCS_STORAGE_CONNECTION_STRING: process.env.AZURE_DOCS_STORAGE_CONNECTION_STRING,
});