import Link from "next/link";

export default function Login() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to your dashboard.</h1>
        <p className="auth-subtitle">
          Access your listings, enquiries, open homes, and solicitor support.
        </p>

        <form className="auth-form">
          <label>Email</label>
          <input placeholder="you@email.com" />

          <label>Password</label>
          <input type="password" placeholder="Your password" />

          <button type="button" className="primary-button">
            Log in
          </button>
        </form>

        <p className="auth-link">
          No account yet? <Link href="/signup">Create one</Link>
        </p>
      </section>
    </main>
  );
}
