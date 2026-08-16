import { ImageResponse } from "next/og";

export const alt = "Study in Czechia — free guides and tools for Arabic-speaking students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a1e3d 0%, #11335a 50%, #0a1e3d 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(212, 33, 39, 0.15) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "72px",
              fontWeight: 700,
              letterSpacing: "-2px",
            }}
          >
            <span style={{ color: "#f8fafc" }}>study</span>
            <span style={{ color: "#d42127" }}>.</span>
            <span style={{ color: "#d42127" }}>czechia</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 28px",
              borderRadius: "9999px",
              background: "rgba(212, 33, 39, 0.12)",
              border: "1px solid rgba(212, 33, 39, 0.3)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#d42127",
              }}
            />
            <span
              style={{
                fontSize: "20px",
                color: "#e8e8e8",
                fontWeight: 500,
              }}
            >
              Your trusted bridge to Czech university life
            </span>
          </div>

          <div
            style={{
              fontSize: "26px",
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {["60+ Universities", "400+ Programmes", "Cost Tools", "Visa Guides"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "10px 22px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "16px",
                  color: "#f8fafc",
                  fontWeight: 500,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
