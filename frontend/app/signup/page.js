import Link from "next/link";

export default function Signup() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Create account</p>
        <h1>Start your private sale securely.</h1>
        <p className="auth-subtitle">
          Create an account to save listings, manage property details, and
          prepare your home for review.
        </p>

        <form className="auth-form">
          <label>Email</label>
          <input placeholder="you@email.com" />

          <label>Password</label>
          <input type="password" placeholder="Create a password" />

          <label>Account type</label>
          <select>
            <option>Seller</option>
            <option>Buyer</option>
          </select>

          <button type="button" className="primary-button">
            Create account
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
