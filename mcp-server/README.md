# my-mcp-server

Remote MCP server berjalan di Cloudflare Workers menggunakan [Agents SDK](https://developers.cloudflare.com/agents/model-context-protocol/).

## Tools

| Tool          | Deskripsi                          | Parameter              |
| ------------- | ---------------------------------- | ---------------------- |
| `hello`       | Pesan sapaan bahasa Indonesia       | `name` (opsional)      |
| `add`         | Menjumlahkan dua angka             | `a`, `b` (number)      |
| `current_time`| Mengembalikan waktu UTC saat ini   | —                      |

## Setup

```sh
npm install
```

## Jalankan secara lokal

```sh
npm run dev
```

Server akan berjalan di `http://localhost:8787/mcp`.

## Deploy ke Cloudflare

```sh
npm run deploy
```

Setelah deploy, endpoint MCP server Anda akan tersedia di:
```
https://my-mcp-server.<subdomain>.workers.dev/mcp
```

## Hubungkan ke MCP Client

### Claude Code
```sh
claude mcp add --transport http my-server https://my-mcp-server.<subdomain>.workers.dev/mcp
```

### MCP Inspector (untuk testing)
```sh
npx @modelcontextprotocol/inspector
```
Lalu masukkan URL MCP server Anda dan klik **Connect**.

## Menambahkan tool baru

Edit `src/index.ts`, tambahkan blok `server.registerTool(...)` di dalam `createServer()`:

```ts
server.registerTool(
  "nama_tool",
  {
    description: "Deskripsi tool",
    inputSchema: { param: z.string() },
  },
  async ({ param }) => {
    return {
      content: [{ type: "text", text: `Hasil: ${param}` }],
    };
  },
);
```

## Menambahkan autentikasi (opsional)

Server ini menerima semua koneksi tanpa login. Untuk menambahkan OAuth, lihat:
https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/
