import { readFile } from "node:fs/promises";
import process from "node:process";
import { AzureKeyCredential, SearchIndexClient } from "@azure/search-documents";

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value || value.trim().length === 0) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value.trim();
}

function trimTrailingSlash(value: string): string {
    return value.replace(/\/+$/, "");
}

async function main(): Promise<void> {
    const searchEndpoint = requireEnv("AZURE_SEARCH_SERVICE_ENDPOINT");
    const searchAdminKey = requireEnv("AZURE_SEARCH_ADMIN_KEY");

    const aoaiEndpoint = trimTrailingSlash(requireEnv("AZURE_OPENAI_ENDPOINT"));
    const aoaiApiKey = requireEnv("AZURE_OPENAI_API_KEY");
    const embeddingDeployment = requireEnv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT");

    const schemaPath = "schemas/index.json";
    const raw = await readFile(schemaPath, "utf-8");

    const replaced = raw
        .replaceAll("__AOAI_ENDPOINT__", aoaiEndpoint)
        .replaceAll("__AOAI_KEY__", aoaiApiKey)
        .replaceAll("__EMBEDDING_DEPLOYMENT__", embeddingDeployment);

    const indexDefinition = JSON.parse(replaced);

    const client = new SearchIndexClient(
        searchEndpoint,
        new AzureKeyCredential(searchAdminKey)
    );

    await client.createOrUpdateIndex(indexDefinition as any);

    console.log("Index applied:", indexDefinition.name);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});