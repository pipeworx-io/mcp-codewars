interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Codewars MCP.
 */


const BASE = 'https://www.codewars.com/api/v1';
const UA = 'pipeworx-mcp-codewars/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  { name: 'user', description: 'User profile.', inputSchema: { type: 'object', properties: { username: { type: 'string' } }, required: ['username'] } },
  { name: 'user_completed', description: 'Completed challenges.', inputSchema: { type: 'object', properties: { username: { type: 'string' }, page: { type: 'number' } }, required: ['username'] } },
  { name: 'user_authored', description: 'Authored kata.', inputSchema: { type: 'object', properties: { username: { type: 'string' } }, required: ['username'] } },
  { name: 'kata', description: 'Single kata.', inputSchema: { type: 'object', properties: { id_or_slug: { type: 'string' } }, required: ['id_or_slug'] } },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const get = async (path: string, params?: URLSearchParams) => {
    const url = `${BASE}${path}${params ? `?${params}` : ''}`;
    const res = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': UA } });
    if (res.status === 404) throw new Error('Codewars: 404 — not found.');
    if (!res.ok) throw new Error(`Codewars: ${res.status}`);
    return res.json();
  };
  switch (name) {
    case 'user':
      return get(`/users/${encodeURIComponent(reqStr(args, 'username', '"jhoffner"'))}`);
    case 'user_completed': {
      const p = new URLSearchParams();
      if (args.page != null) p.set('page', String(args.page));
      return get(`/users/${encodeURIComponent(reqStr(args, 'username', '"jhoffner"'))}/code-challenges/completed`, p);
    }
    case 'user_authored':
      return get(`/users/${encodeURIComponent(reqStr(args, 'username', '"jhoffner"'))}/code-challenges/authored`);
    case 'kata':
      return get(`/code-challenges/${encodeURIComponent(reqStr(args, 'id_or_slug', '"multiples-of-3-and-5"'))}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
