"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function EditListing({ params }) {
  const propertyId = params.id;

  const [user, setUser] = useState(null);
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadListing() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        window.location.href = "/login";
        return;
      }

      setUser(userData.user);

      const { data: propertyData, error: propertyError } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single();

      if (propertyError) {
        setMessage(propertyError.message);
        return;
      }

      setProperty(propertyData);

      const { data: imageData } = await supabase
        .from("property_images")
        .select("*")
        .eq("property_id", propertyId)
        .order("sort_order", { ascending: true });

      setImages(imageData || []);
    }

    loadListing();
  }, [propertyId]);

  function updateField(field, value) {
    setProperty((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveListing() {
    setMessage("Saving listing...");

    const { error } = await supabase
      .from("properties")
      .update({
        title: property.title,
        address_line: property.address_line,
        suburb: property.suburb,
        postcode: property.postcode,
        property_type: property.property_type,
        bedrooms: property.bedrooms ? Number(property.bedrooms) : null,
        bathrooms: property.bathrooms ? Number(property.bathrooms) : null,
        car_spaces: property.car_spaces ? Number(property.car_spaces) : null,
        land_size_sqm: property.land_size_sqm ? Number(property.land_size_sqm) : null,
        floor_area_sqm: property.floor_area_sqm ? Number(property.floor_area_sqm) : null,
        price: property.price ? Number(property.price) : null,
        description: property.description,
        has_pool: property.has_pool,
        has_aircon: property.has_aircon,
        has_solar: property.has_solar,
        has_study: property.has_study,
        has_outdoor_area: property.has_outdoor_area,
        updated_at: new Date().toISOString(),
      })
      .eq("id", propertyId);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Listing saved.");
    }
  }

  async function uploadImages(event) {
    const files = Array.from(event.target.files);

    if (!files.length || !user) return;

    setUploading(true);
    setMessage("Uploading images...");

    for (const file of files) {
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${user.id}/${propertyId}/${Date.now()}-${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(filePath, file);

      if (uploadError) {
        setMessage(uploadError.message);
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase.from("property_images").insert({
        property_id: propertyId,
        seller_id: user.id,
        image_url: imageUrl,
        storage_path: filePath,
        sort_order: images.length,
        is_cover: images.length === 0,
      });

      if (dbError) {
        setMessage(dbError.message);
        setUploading(false);
        return;
      }
    }

    const { data: imageData } = await supabase
      .from("property_images")
      .select("*")
      .eq("property_id", propertyId)
      .order("sort_order", { ascending: true });

    setImages(imageData || []);
    setMessage("Images uploaded.");
    setUploading(false);
  }

  if (!property) {
    return (
      <main className="onboarding-page">
        <p>{message || "Loading listing..."}</p>
      </main>
    );
  }

  return (
    <main className="onboarding-page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Edit listing</p>
          <h1>{property.title || "Untitled property"}</h1>
          <p>Status: {property.status}</p>
        </div>

        <button className="primary-button" onClick={saveListing}>
          Save listing
        </button>
      </section>

      <section className="seller-form">
        <h2>Property details</h2>

        <div className="form-grid">
          <div className="full">
            <label>Listing title</label>
            <input
              value={property.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>

          <div className="full">
            <label>Address</label>
            <input
              value={property.address_line || ""}
              onChange={(e) => updateField("address_line", e.target.value)}
            />
          </div>

          <div>
            <label>Suburb</label>
            <input
              value={property.suburb || ""}
              onChange={(e) => updateField("suburb", e.target.value)}
            />
          </div>

          <div>
            <label>Postcode</label>
            <input
              value={property.postcode || ""}
              onChange={(e) => updateField("postcode", e.target.value)}
            />
          </div>

          <div>
            <label>Property type</label>
            <select
              value={property.property_type || "House"}
              onChange={(e) => updateField("property_type", e.target.value)}
            >
              <option>House</option>
              <option>Townhouse</option>
              <option>Apartment</option>
              <option>Land</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Price</label>
            <input
              value={property.price || ""}
              onChange={(e) => updateField("price", e.target.value)}
            />
          </div>

          <div>
            <label>Bedrooms</label>
            <input
              value={property.bedrooms || ""}
              onChange={(e) => updateField("bedrooms", e.target.value)}
            />
          </div>

          <div>
            <label>Bathrooms</label>
            <input
              value={property.bathrooms || ""}
              onChange={(e) => updateField("bathrooms", e.target.value)}
            />
          </div>

          <div>
            <label>Car spaces</label>
            <input
              value={property.car_spaces || ""}
              onChange={(e) => updateField("car_spaces", e.target.value)}
            />
          </div>

          <div>
            <label>Land size sqm</label>
            <input
              value={property.land_size_sqm || ""}
              onChange={(e) => updateField("land_size_sqm", e.target.value)}
            />
          </div>

          <div className="full">
            <label>Description</label>
            <textarea
              value={property.description || ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows="6"
              placeholder="Describe the home, location, features and lifestyle..."
            />
          </div>
        </div>

        <div className="checkbox-grid">
          <label>
            <input
              type="checkbox"
              checked={property.has_pool || false}
              onChange={(e) => updateField("has_pool", e.target.checked)}
            />
            Pool
          </label>

          <label>
            <input
              type="checkbox"
              checked={property.has_aircon || false}
              onChange={(e) => updateField("has_aircon", e.target.checked)}
            />
            Air conditioning
          </label>

          <label>
            <input
              type="checkbox"
              checked={property.has_solar || false}
              onChange={(e) => updateField("has_solar", e.target.checked)}
            />
            Solar
          </label>

          <label>
            <input
              type="checkbox"
              checked={property.has_study || false}
              onChange={(e) => updateField("has_study", e.target.checked)}
            />
            Study
          </label>

          <label>
            <input
              type="checkbox"
              checked={property.has_outdoor_area || false}
              onChange={(e) => updateField("has_outdoor_area", e.target.checked)}
            />
            Outdoor area
          </label>
        </div>
      </section>

      <section className="seller-form image-upload-section">
        <h2>Property photos</h2>
        <p className="form-intro">
          Upload photos for this listing. The first uploaded image will be used
          as the cover image for now.
        </p>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={uploadImages}
        />

        {uploading && <p className="auth-link">Uploading...</p>}
        {message && <p className="auth-link">{message}</p>}

        <div className="uploaded-image-grid">
          {images.map((image) => (
            <div className="uploaded-image-card" key={image.id}>
              <img src={image.image_url} alt="Property uploaded image" />
              {image.is_cover && <span>Cover</span>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
