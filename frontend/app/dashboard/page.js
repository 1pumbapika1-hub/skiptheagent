"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setUser(data.user);
      setLoading(false);
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="onboarding-page">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="onboarding-page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome to your seller dashboard.</h1>
          <p>Logged in as: {user.email}</p>
        </div>

        <button className="secondary-button" onClick={handleLogout}>
          Log out
        </button>
      </section>

      <section className="dashboard-grid">
        <DashboardCard
          title="My listings"
          text="Create and manage your property listings."
          button="Create listing"
        />
        <DashboardCard
          title="Buyer enquiries"
          text="View messages and inspection requests from buyers."
          button="View enquiries"
        />
        <DashboardCard
          title="Open homes"
          text="Schedule inspection times and track attendees."
          button="Manage times"
        />
        <DashboardCard
          title="Solicitor support"
          text="Request help with contracts, disclosure, and settlement."
          button="Request support"
        />
      </section>
    </main>
  );
}

function DashboardCard({ title, text, button }) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="primary-button">{button}</button>
    </div>
  );
}
