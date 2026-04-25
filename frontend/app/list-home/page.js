"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ListHome() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    title: "",
    address: "",
    suburb: "",
    postcode: "",
    propertyType: "House",
    expectedPrice: "",
  });

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/signup";
        return;
      }

      setUser(data.user);
    }

    checkUser();
  }, []);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleCreateListing() {
    if (!user) return;

    setMessage("Creating listing...");

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      account_type: "Seller",
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
    });

    if (profileError) {
      setMessage(profileError.message);
      return;
    }

    const { error: propertyError } = await supabase.from("properties").insert({
      seller_id: user.id,
      title: form.title || "Untitled property",
      address_line: form.address,
      suburb: form.suburb,
      postcode: form.postcode,
      property_type: form.propertyType,
      price: form.expectedPrice ? Number(form.expectedPrice) : null,
      status: "draft",
    });

    if (propertyError) {
      setMessage(propertyError.message);
      return;
    }

    setMessage("Listing created successfully.");
    window.location.href = "/dashboard";
  }

  return (
    <main className="onboarding-page">
      <section className="onboarding-hero">
        <p className="eyebrow">Seller onboarding</p>
        <h1>List your Queensland home in a guided private-sale workflow.</h1>
        <p>
          Add your property details, upload photos, set open-home times, choose
          a package, and connect with solicitor support before moving to contract.
        </p>
      </section>

      <section className="onboarding-layout">
        <div className="step-panel">
          <Step number="01" title="Create account" active />
          <Step number="02" title="Property details" active />
          <Step number="03" title="Photos & media" />
          <Step number="04" title="Open homes" />
          <Step number="05" title="Solicitor support" />
          <Step number="06" title="Payment & review" />
        </div>

        <form className="seller-form">
          <h2>Start your listing</h2>
          <p className="form-intro">
            This creates a draft listing in your seller dashboard. We’ll add
            image upload and open-home scheduling next.
          </p>

          <div className="form-grid">
            <div>
              <label>First name</label>
              <input
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="Jane"
              />
            </div>

            <div>
              <label>Last name</label>
              <input
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="Smith"
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="0400 000 000"
              />
            </div>

            <div>
              <label>Listing title</label>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Modern family home"
              />
            </div>

            <div className="full">
              <label>Property address</label>
              <input
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Street address"
              />
            </div>

            <div>
              <label>Suburb</label>
              <input
                value={form.suburb}
                onChange={(e) => updateField("suburb", e.target.value)}
                placeholder="Brisbane"
              />
            </div>

            <div>
              <label>Postcode</label>
              <input
                value={form.postcode}
                onChange={(e) => updateField("postcode", e.target.value)}
                placeholder="4000"
              />
            </div>

            <div>
              <label>Property type</label>
              <select
                value={form.propertyType}
                onChange={(e) => updateField("propertyType", e.target.value)}
              >
                <option>House</option>
                <option>Townhouse</option>
                <option>Apartment</option>
                <option>Land</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Expected sale price</label>
              <input
                value={form.expectedPrice}
                onChange={(e) => updateField("expectedPrice", e.target.value)}
                placeholder="850000"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-button">
              Save draft
            </button>
            <button type="button" className="primary-button" onClick={handleCreateListing}>
              Create listing
            </button>
          </div>

          {message && <p className="auth-link">{message}</p>}
        </form>
      </section>
    </main>
  );
}

function Step({ number, title, active }) {
  return (
    <div className={active ? "onboarding-step active" : "onboarding-step"}>
      <span>{number}</span>
      <strong>{title}</strong>
    </div>
  );
}
