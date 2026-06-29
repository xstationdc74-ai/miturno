import { NextResponse } from "next/server";

import { sendPush } from "@/lib/asalvo/sendPush";

export async function POST(
  request: Request
) {
  try {
    const {
      participantId,
      title,
      body,
    } = await request.json();

    if (
      !participantId ||
      !title ||
      !body
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing fields",
        },
        { status: 400 }
      );
    }

    const result =
      await sendPush({
        participantId,
        title,
        body,
      });

    return NextResponse.json(
      result,
      {
        status: result.success
          ? 200
          : 404,
      }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      },
      { status: 500 }
    );
  }
}