import { z } from 'zod';

function normalizeBaseUrl(value: string): string {
    return value.replace(/\/+$/, '');
}

const EnvSchema = z.object({
    VITE_API_BASE_URL: z.url().transform(normalizeBaseUrl),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse(import.meta.env);
