import { findUrlByShortCode } from "../../lib/db";
import { recordClick } from "../../lib/stats";            // A: 클릭 기록 함수 가져오기

export async function GET(request, { params }) {
  const { shortCode } = await params;

  const t0 = performance.now();
  const originalUrl = await findUrlByShortCode(shortCode);
  const t1 = performance.now();

  if (originalUrl === null) {
    console.warn("Short URL not found", { shortCode });   // B: 운영자용 로그 (warn)
    return new Response("Not Found", { status: 404 });    // 사용자용 응답
  }

  // C: 원본 URL을 찾았을 때만 클릭 기록
  try {
    await recordClick(shortCode);                         // 클릭 수 +1 (await = 끝날 때까지 기다림)
  } catch (error) {
    console.error("Failed to record click", { shortCode }); // 실패해도 로그만 남기고
  }                                                         // 아래 리다이렉트는 계속 (정책 B)
  const t2 = performance.now();

  const lookupMs = (t1 - t0).toFixed(1);
  const updateMs = (t2 - t1).toFixed(1);
  const totalMs = (t2 - t0).toFixed(1);
  console.log({ lookupMs, updateMs, totalMs });

  return new Response(null, {
    status: 307,
    headers: {
      Location: originalUrl,
      "Cache-Control": "no-store",
      "Server-Timing": `lookup;dur=${lookupMs}, update;dur=${updateMs}, total;dur=${totalMs}`,
    },
  });
}