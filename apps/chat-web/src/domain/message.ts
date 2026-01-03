import type { Document } from './document';

export type MessageType = 'user' | 'assistant';

export type BaseMessage = {
    // uuid v4 形式の文字列を想定
    id: string;
    type: MessageType;
    content: string;
    // RFC 3339 形式の文字列を想定 (例: "2025-01-01T12:34:56.789Z")
    createdAt: string;
};

export type UserMessage = BaseMessage & {
    type: 'user';
};

export type AssistantMessage = BaseMessage & {
    type: 'assistant';
    docs: Document[];
};

export type Message = UserMessage | AssistantMessage;
