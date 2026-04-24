export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <div className="brand">
          <div className="logo-mark">STA</div>
          <div>
            <div className="brand-name">Skip The Agent</div>
            <div className="brand-tagline">Sell Smart. Settle Safe.</div>
          </div>
        </div>

        <div className="nav-links">
          <a>Sell</a>
          <a>Buy</a>
          <a>How it works</a>
          <a>Solicitor support</a>
          <button className="nav-button">List your home</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Queensland private property sales</p>

          <h1>Sell your home without agent commissions.</h1>

          <p className="hero-subtitle">
            Create a premium listing, manage buyer enquiries, schedule open
            homes, and connect with solicitor support when you are ready to
            move to contract.
          </p>

          <div className="hero-actions">
            <button className="primary-button">Start listing</button>
            <button className="secondary-button">Browse properties</button>
          </div>

          <div className="trust-row">
            <span>✓ Queensland focused</span>
            <span>✓ Secure seller dashboard</span>
            <span>✓ Solicitor support available</span>
          </div>
        </div>

        <div className="hero-card">
          <div className="property-image-placeholder">
            <div className="house-line-art">STA</div>
          </div>

          <div className="property-preview">
            <div>
              <p className="preview-label">Example listing</p>
              <h3>Modern family home</h3>
              <p>Brisbane, QLD · 4 bed · 2 bath · 2 car</p>
            </div>
            <div className="price-chip">$850k+</div>
          </div>
        </div>
      </section>

      <section className="search-panel">
        <div>
          <label>Location</label>
          <input placeholder="Suburb, postcode or region" />
        </div>
        <div>
          <label>Property type</label>
          <select>
            <option>Any property</option>
            <option>House</option>
            <option>Townhouse</option>
            <option>Apartment</option>
            <option>Land</option>
          </select>
        </div>
        <div>
          <label>Price</label>
          <select>
            <option>Any price</option>
            <option>Under $750k</option>
            <option>$750k - $1m</option>
            <option>$1m+</option>
          </select>
        </div>
        <button>Search homes</button>
      </section>

      <section className="trust-strip">
        <div>
          <strong>No agent commission</strong>
          <span>Keep more of your sale price.</span>
        </div>
        <div>
          <strong>Organised inspections</strong>
          <span>Open homes and private bookings.</span>
        </div>
        <div>
          <strong>Legal confidence</strong>
          <span>Connect with solicitor support.</span>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>A guided private sale, not a risky DIY sale.</h2>
        </div>

        <div className="feature-grid">
          <Feature
            number="01"
            title="Create your listing"
            text="Upload photos, add property details, select features, set your price guide, and choose inspection times."
          />
          <Feature
            number="02"
            title="Manage serious buyers"
            text="Receive enquiries, track open home bookings, and keep buyer communication organised."
          />
          <Feature
            number="03"
            title="Move to contract safely"
            text="When you're ready, connect with solicitor or conveyancing support for the legal side."
          />
        </div>
      </section>

      <section className="split-section">
        <div className="savings-card">
          <p className="eyebrow">Savings calculator</p>
          <h2>See what commission could cost you.</h2>

          <div className="calculator-box">
            <div>
              <span>Example sale price</span>
              <strong>$850,000</strong>
            </div>
            <div>
              <span>Example 2.5% commission</span>
              <strong>$21,250</strong>
            </div>
            <div className="highlight">
              <span>Potential saving</span>
              <strong>$20k+</strong>
            </div>
          </div>
        </div>

        <div className="legal-card">
          <p className="eyebrow">Solicitor support</p>
          <h2>Designed around legal confidence.</h2>
          <p>
            Skip The Agent is built to help sellers avoid unnecessary commission
            while still treating contracts, disclosure, and settlement as serious
            legal steps.
          </p>
          <button className="secondary-button">Learn about settlement</button>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Featured listings</p>
          <h2>Premium property presentation, without the agent fee.</h2>
        </div>

        <div className="listing-grid">
          <Listing title="Coastal family home" location="Sunshine Coast, QLD" />
          <Listing title="Modern inner-city townhouse" location="Brisbane, QLD" />
          <Listing title="Private acreage retreat" location="Gold Coast Hinterland, QLD" />
        </div>
      </section>

      <section className="cta-section">
        <p className="eyebrow">Ready to skip the commission?</p>
        <h2>Start your private sale with a professional system behind you.</h2>
        <button className="primary-button">List your home</button>
      </section>

      <footer>
        <div>
          <h3>Skip The Agent</h3>
          <p>Sell Smart. Settle Safe.</p>
        </div>
        <p className="footer-note">
          Platform concept only. Legal advice should be provided by qualified
          legal professionals.
        </p>
      </footer>
    </main>
  );
}

function Feature({ number, title, text }) {
  return (
    <div className="feature-card">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Listing({ title, location }) {
  return (
    <div className="listing-card">
      <div className="listing-image-placeholder">Property photo</div>
      <div className="listing-content">
        <h3>{title}</h3>
        <p>{location}</p>
        <button>View listing</button>
      </div>
    </div>
  );
}
