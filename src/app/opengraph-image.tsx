import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/constants/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0B1F3A 0%, #071A2E 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#0EA5E9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#0B1F3A",
            }}
          >
            N
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#F8FAFC", display: "flex" }}>
            {SITE_NAME}
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 56,
            fontWeight: 700,
            color: "#F8FAFC",
            maxWidth: 900,
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#94A3B8",
            display: "flex",
          }}
        >
          Nepal&apos;s Carrier-Neutral Internet Exchange
        </div>
      </div>
    ),
    { ...size },
  );
}
