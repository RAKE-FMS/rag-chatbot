import type { Document } from '../domain/document';

type DocsViewProps = {
    docs: Document[];
};

export function DocsView({ docs }: DocsViewProps) {
    return (
        <div className="h-full overflow-y-auto">
            <ul className="p-4 space-y-4">
                {docs.map((doc, index) => (
                    <DocItem key={doc.id} doc={doc} index={index} />
                ))}
            </ul>
        </div>
    );
}

function DocItem({ doc, index }: { doc: Document; index: number }) {
    return (
        <li className="rounded-[20px] bg-bg-muted p-3">
            <div className="text-sm text-text">
                [{index}] {doc.title}
            </div>
            <div className="text-xs text-text-muted whitespace-pre-wrap">{doc.content}</div>
        </li>
    );
}
