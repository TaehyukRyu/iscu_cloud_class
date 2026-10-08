import { findUrlByShortCode } from "../../lib/db";
import { recordClick } from "../../lib/stats";            // A: 클릭 기록 함수 가져오기

export async function GET(request, { params }) {
  const { shortCode } = await params;

  const originalUrl = await findUrlByShortCode(shortCode);

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

  return new Response(null, {
    status: 307,
    headers: {
      Location: originalUrl,
      "Cache-Control": "no-store",
    },
  });
}