"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        window.location.href = "/login";
        return;
      }

      setUser(userData.user);

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("seller_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setProperties(data || []);
      }

      setLoading(false);
    }

    loadDashboard();
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
          text={`${properties.length} draft/listing record(s) created.`}
          button="Create listing"
          href="/list-home"
        />
        <DashboardCard
          title="Buyer enquiries"
          text="View messages and inspection requests from buyers."
          button="View enquiries"
          href="/dashboard"
        />
        <DashboardCard
          title="Open homes"
          text="Schedule inspection times and track attendees."
          button="Manage times"
          href="/dashboard"
        />
        <DashboardCard
          title="Solicitor support"
          text="Request help with contracts, disclosure, and settlement."
          button="Request support"
          href="/dashboard"
        />
      </section>

      <section className="seller-form dashboard-listings">
        <h2>Your listings</h2>

        {properties.length === 0 ? (
          <p className="form-intro">
            You have not created any listings yet.
          </p>
        ) : (
          <div className="listing-table">
            {properties.map((property) => (
              <div className="listing-row" key={property.id}>
                <div>
                  <strong>{property.title || "Untitled property"}</strong>
                  <p>
                    {property.suburb || "No suburb"} · {property.property_type || "Property"} ·{" "}
                    {property.status}
                  </p>
                </div>

                <div>
                  <span>
                    {property.price
                      ? `$${Number(property.price).toLocaleString()}`
                      : "No price"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function DashboardCard({ title, text, button, href }) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p>{text}</p>
      <Link href={href} className="primary-button">
        {button}
      </Link>
    </div>
  );
}
