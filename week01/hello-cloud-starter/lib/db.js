import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function saveUrl(shortCode, originalUrl) {
  await sql`
    INSERT INTO urls (short_code, original_url)
    VALUES (${shortCode}, ${originalUrl})
  `;
}


export async function findUrlByShortCode(shortCode) {
  const rows = await sql`
    SELECT original_url
    FROM urls
    WHERE short_code = ${shortCode}
    LIMIT 1
  `;

  return rows[0]?.original_url ?? null;
}


// 같은 원본 URL이 이미 저장되어 있으면 그 shortCode를, 없으면 null을 반환합니다.
export async function findShortCodeByUrl(originalUrl) {
  const rows = await sql`
    SELECT short_code
    FROM urls
    WHERE original_url = ${originalUrl}
    LIMIT 1
  `;

  return rows[0]?.short_code ?? null;
}