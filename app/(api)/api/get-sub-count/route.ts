import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_YT_API_KEY;
  const channelId = process.env.NEXT_PUBLIC_YT_CHANNEL_ID;

  const ytSubCountAPI = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
  );

  const ytSubCountAPIData: any = await ytSubCountAPI.json();

  if (ytSubCountAPIData.error) {
    return NextResponse.json({
      ytSubCountAPIData: null,
      errorObj: ytSubCountAPIData.error,
      isError: true,
    });
  }

  return NextResponse.json({
    ytSubCountAPIData,
    errorObj: null,
    isError: false,
  });
}
