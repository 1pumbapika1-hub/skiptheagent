export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#070707",
      color: "white",
      fontFamily: "Arial, sans-serif"
    }}>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 60px",
        borderBottom: "1px solid rgba(201, 159, 43, 0.25)"
      }}>
        <div style={{
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "2px",
          color: "#C99F2B"
        }}>
          SKIP THE AGENT
        </div>

        <div style={{
          display: "flex",
          gap: "28px",
          alignItems: "center",
          fontSize: "15px"
        }}>
          <a>Sell</a>
          <a>Buy</a>
          <a>How it works</a>
          <a>Solicitor Support</a>
          <button style={{
            background: "#C99F2B",
            color: "#070707",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            List Your Home
          </button>
        </div>
      </nav>

      <section style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "60px",
        alignItems: "center",
        padding: "90px 60px"
      }}>
        <div>
          <p style={{
            color: "#C99F2B",
            letterSpacing: "3px",
            fontWeight: "bold",
            marginBottom: "20px"
          }}>
            SELL SMART. SETTLE SAFE.
          </p>

          <h1 style={{
            fontSize: "70px",
            lineHeight: "1.02",
            margin: "0 0 28px"
          }}>
            Sell your home without agent commissions.
          </h1>

          <p style={{
            fontSize: "21px",
            lineHeight: "1.6",
            color: "#D6D6D6",
            maxWidth: "680px",
            marginBottom: "36px"
          }}>
            Skip The Agent helps Queensland sellers create premium listings,
            manage buyer enquiries, schedule open homes, and connect with
            solicitor support when ready to move to contract.
          </p>

          <div style={{ display: "flex", gap: "16px" }}>
            <button style={{
              background: "#C99F2B",
              color: "#070707",
              border: "none",
              padding: "16px 28px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer"
            }}>
              Start Listing
            </button>

            <button style={{
              background: "transparent",
              color: "white",
              border: "1px solid #C99F2B",
              padding: "16px 28px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer"
            }}>
              Browse Properties
            </button>
          </div>
        </div>

        <div style={{
          border: "1px solid rgba(201, 159, 43, 0.4)",
          borderRadius: "26px",
          padding: "34px",
          background: "linear-gradient(145deg, #111, #050505)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)"
        }}>
          <div style={{
            height: "360px",
            borderRadius: "20px",
            background: "#111",
            border: "1px solid rgba(201,159,43,0.25)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#C99F2B",
            fontSize: "44px",
            fontWeight: "bold",
            letterSpacing: "8px"
          }}>
            STA
          </div>

          <div style={{
            marginTop: "24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px"
          }}>
            <InfoCard title="$20k+" text="Potential commission savings" />
            <InfoCard title="QLD" text="Built for private sellers" />
          </div>
        </div>
      </section>

      <section style={{
        padding: "30px 60px 90px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "22px"
      }}>
        <Feature title="List your home" text="Upload photos, details, price guide, and property features." />
        <Feature title="Manage buyers" text="Receive enquiries, inspection bookings, and buyer messages." />
        <Feature title="Open homes" text="Create inspection times and let buyers register attendance." />
        <Feature title="Settle safely" text="Connect with solicitor support for contracts and settlement." />
      </section>
    </main>
  );
}

function Feature({ title, text }) {
  return (
    <div style={{
      border: "1px solid rgba(201,159,43,0.25)",
      borderRadius: "18px",
      padding: "26px",
      background: "#0D0D0D"
    }}>
      <h3 style={{ color: "#C99F2B", marginBottom: "12px" }}>{title}</h3>
      <p style={{ color: "#CFCFCF", lineHeight: "1.5" }}>{text}</p>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div style={{
      border: "1px solid rgba(201,159,43,0.25)",
      borderRadius: "14px",
      padding: "18px",
      background: "#080808"
    }}>
      <strong style={{ color: "#C99F2B", fontSize: "24px" }}>{title}</strong>
      <p style={{ color: "#CFCFCF", margin: "8px 0 0" }}>{text}</p>
    </div>
  );
}
