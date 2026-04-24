export default function ListHome() {
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
          <Step number="02" title="Property details" />
          <Step number="03" title="Photos & media" />
          <Step number="04" title="Open homes" />
          <Step number="05" title="Solicitor support" />
          <Step number="06" title="Payment & review" />
        </div>

        <form className="seller-form">
          <h2>Start your listing</h2>
          <p className="form-intro">
            This first version will collect the basic information. Later, we
            connect this to login, database storage, photo uploads, and payments.
          </p>

          <div className="form-grid">
            <div>
              <label>First name</label>
              <input placeholder="Jane" />
            </div>

            <div>
              <label>Last name</label>
              <input placeholder="Smith" />
            </div>

            <div>
              <label>Email</label>
              <input placeholder="jane@email.com" />
            </div>

            <div>
              <label>Phone</label>
              <input placeholder="0400 000 000" />
            </div>

            <div className="full">
              <label>Property address</label>
              <input placeholder="Street address, suburb, QLD" />
            </div>

            <div>
              <label>Property type</label>
              <select>
                <option>House</option>
                <option>Townhouse</option>
                <option>Apartment</option>
                <option>Land</option>
              </select>
            </div>

            <div>
              <label>Expected sale price</label>
              <input placeholder="$850,000" />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-button">
              Save draft
            </button>
            <button type="button" className="primary-button">
              Continue
            </button>
          </div>
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
