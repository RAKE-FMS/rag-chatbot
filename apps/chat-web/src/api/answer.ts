import type { Document } from '../domain/document.js';
import { env } from '../config/env.js';

const ANSWER_ENDPOINT_PATH = '/answer';

export type AnswerBody = {
    query: string;
};

export type AnswerRes = {
    answer: string;
    docs: Document[];
};

export async function answer(query: string): Promise<AnswerRes> {
    const trimmed = query.trim();
    if (trimmed.length === 0) {
        throw new Error('query must not be empty');
    }

    const url = `${env.VITE_API_BASE_URL}${ANSWER_ENDPOINT_PATH}`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: trimmed }),
    });

    if (!res.ok) {
        let message = `Request failed with status ${res.status}`;
        try {
            const errorBody = await res.json();
            if (typeof errorBody?.message === 'string') {
                message = errorBody.message;
            }
        } catch {
            // ignore error
        }
        throw new Error(message);
    }

    const data = (await res.json()) as AnswerRes;
    return data;
}
