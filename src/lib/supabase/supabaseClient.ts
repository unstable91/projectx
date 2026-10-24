import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL_KEY = 'algoforge_supabase_url';
const SUPABASE_ANON_KEY_KEY = 'algoforge_supabase_anon_key';

export function getSupabaseCredentials(): { url: string; anonKey: string } {
  const url =
    localStorage.getItem(SUPABASE_URL_KEY) ||
    (import.meta.env.VITE_SUPABASE_URL as string) ||
    '';
  const anonKey =
    localStorage.getItem(SUPABASE_ANON_KEY_KEY) ||
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
    '';
  return { url: url.trim(), anonKey: anonKey.trim() };
}

export function saveSupabaseCredentials(url: string, anonKey: string): void {
  if (url.trim()) {
    localStorage.setItem(SUPABASE_URL_KEY, url.trim());
  } else {
    localStorage.removeItem(SUPABASE_URL_KEY);
  }

  if (anonKey.trim()) {
    localStorage.setItem(SUPABASE_ANON_KEY_KEY, anonKey.trim());
  } else {
    localStorage.removeItem(SUPABASE_ANON_KEY_KEY);
  }

  // Reset client cache
  cachedClient = null;
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const { url, anonKey } = getSupabaseCredentials();
  if (!url || !anonKey) {
    return null;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

export async function testSupabaseConnection(): Promise<{ ok: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, message: 'Supabase URL or Anon Key is missing.' };
  }

  try {
    const { error } = await client.from('problems').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      return { ok: false, message: error.message };
    }
    return { ok: true, message: 'Successfully connected to Supabase database!' };
  } catch (err: any) {
    return { ok: false, message: err.message || 'Connection test failed.' };
  }
}
