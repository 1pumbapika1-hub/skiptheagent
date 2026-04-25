"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Seller");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    setMessage("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          account_type: accountType,
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created. Check your email to verify your account.");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Create account</p>
        <h1>Start your private sale securely.</h1>

        <form className="auth-form">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Account type</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option>Seller</option>
            <option>Buyer</option>
          </select>

          <button type="button" className="primary-button" onClick={handleSignup}>
            Create account
          </button>
        </form>

        {message && <p className="auth-link">{message}</p>}

        <p className="auth-link">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
