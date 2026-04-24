export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#F7F3EA",
      color: "#102A43",
      fontFamily: "Arial, sans-serif",
      padding: "40px"
    }}>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "90px"
      }}>
        <h2>SkipTheAgent</h2>
        <button style={{
          background: "#102A43",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "999px",
          fontWeight: "bold"
        }}>
          List your home
        </button>
      </nav>

      <section style={{
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center"
      }}>
        <p style={{
          color: "#2F855A",
          fontWeight: "bold",
          marginBottom: "16px"
        }}>
          Queensland private property sales
        </p>

        <h1 style={{
          fontSize: "64px",
          lineHeight: "1.05",
          marginBottom: "24px"
        }}>
          Sell your home without paying agent commission.
        </h1>

        <p style={{
          fontSize: "22px",
          color: "#486581",
          lineHeight: "1.5",
          marginBottom: "36px"
        }}>
          Create a premium listing, manage buyer enquiries, schedule open homes,
          and connect with a solicitor when you are ready to move to contract.
        </p>

        <div style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center"
        }}>
          <button style={{
            background: "#2F855A",
            color: "white",
            border: "none",
            padding: "16px 28px",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "16px"
          }}>
            Start listing
          </button>

          <button style={{
            background: "white",
            color: "#102A43",
            border: "1px solid #CBD5E1",
            padding: "16px 28px",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "16px"
          }}>
            See how it works
          </button>
        </div>
      </section>
    </main>
  );
}
