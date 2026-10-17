/**
 * 问题箱远程适配器（Supabase 免费层）。
 * 未配置环境变量时自动降级为纯本地模式。
 * 需要的表结构与安全策略见 README.md。
 */
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const table = import.meta.env.VITE_SUPABASE_TABLE || 'questions'

export const remoteEnabled = Boolean(url && key)

export interface RemoteQuestion {
  text: string
  kid: string
  source_issue?: string | null
  created_at: string
}

export async function sendToRemote(q: RemoteQuestion): Promise<boolean> {
  const u = url
  const k = key
  if (!u || !k) return false
  try {
    const res = await fetch(`${u}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: k,
        Authorization: `Bearer ${k}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify([q]),
    })
    return res.ok
  } catch (e) {
    console.warn('[问题箱] 远程备份失败（本地已保存）:', e)
    return false
  }
}
