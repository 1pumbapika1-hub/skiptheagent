"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function Buy() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url,
            is_cover,
            sort_order
          )
        `)
        .eq("status", "live")
        .order("created_at", { ascending: false });

      if (!error) {
        setProperties(data || []);
      }

      setLoading(false);
    }

    loadProperties();
  }, []);

  return (
    <main className="onboarding-page">
      <section className="onboarding-hero">
        <p className="eyebrow">Browse properties</p>
        <h1>Private-sale homes across Queensland.</h1>
        <p>
          Browse live listings from sellers using Skip The Agent. Enquiry,
          inspection booking, and offer tools are coming next.
        </p>
      </section>

      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <section className="seller-form">
          <h2>No live listings yet.</h2>
          <p className="form-intro">
            Once a seller publishes a listing, it will appear here.
          </p>
        </section>
      ) : (
        <section className="property-results-grid">
          {properties.map((property) => {
            const coverImage =
              property.property_images?.find((img) => img.is_cover)?.image_url ||
              property.property_images?.[0]?.image_url;

            return (
              <Link
                href={`/properties/${property.id}`}
                className="public-property-card"
                key={property.id}
              >
                <div className="public-property-image">
                  {coverImage ? (
                    <img src={coverImage} alt={property.title || "Property"} />
                  ) : (
                    <span>No image yet</span>
                  )}
                </div>

                <div className="public-property-content">
                  <p className="preview-label">
                    {property.suburb || "Queensland"}
                  </p>

                  <h3>{property.title || "Untitled property"}</h3>

                  <p>
                    {property.bedrooms || 0} bed · {property.bathrooms || 0} bath ·{" "}
                    {property.car_spaces || 0} car
                  </p>

                  <strong>
                    {property.price
                      ? `$${Number(property.price).toLocaleString()}`
                      : "Price guide available"}
                  </strong>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}
