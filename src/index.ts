import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

function createServer() {
  const server = new McpServer({
    name: "my-mcp-server",
    version: "1.0.0",
  });

  server.registerTool(
    "cek_server",
    {
      description: "Mengembalikan ID unik server ini",
      inputSchema: {},
    },
    async () => {
      return {
        content: [
          { type: "text", text: "Server ID: MCP-DION-2026-XK7Q9" },
        ],
      };
    },
  )
  // Tool: sapa — mengembalikan pesan sapaan
  server.registerTool(
    "hello",
    {
      description: "Mengembalikan pesan sapaan dalam bahasa Indonesia",
      inputSchema: { name: z.string().optional() },
    },
    async ({ name }) => {
      return {
        content: [
          { type: "text", text: `Halo, ${name ?? "Dunia"}! 👋` },
        ],
      };
    },
  );

  // Tool: tambah — menjumlahkan dua angka
  server.registerTool(
    "add",
    {
      description: "Menjumlahkan dua angka",
      inputSchema: { a: z.number(), b: z.number() },
    },
    async ({ a, b }) => {
      return {
        content: [
          { type: "text", text: `Hasil ${a} + ${b} = ${a + b}` },
        ],
      };
    },
  );

  // Tool: waktu — mengembalikan waktu saat ini
  server.registerTool(
    "current_time",
    {
      description: "Mengembalikan waktu UTC saat ini",
      inputSchema: {},
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: new Date().toISOString(),
          },
        ],
      };
    },
  );

  return server;
}

export default {
  fetch(request, env, ctx) {
    return createMcpHandler(createServer)(request, env, ctx);
  },
} satisfies ExportedHandler;
