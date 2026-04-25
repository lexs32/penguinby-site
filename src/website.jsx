import React from "react";

export default function WebsitePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header" role="banner">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="Homepage">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Website</span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main" className="site-main" tabIndex={-1}>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1>Build on a solid structure</h1>
              <p>
                This page uses semantic HTML, accessible navigation, and a simple layout system so it’s easy to
                extend.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#features">
                  See features
                </a>
                <a className="button" href="#contact">
                  Get in touch
                </a>
              </div>
            </div>

            <aside className="hero-card" aria-label="Quick stats">
              <dl className="stats">
                <div className="stat">
                  <dt>Layout</dt>
                  <dd>Responsive</dd>
                </div>
                <div className="stat">
                  <dt>Accessibility</dt>
                  <dd>Keyboard-first</dd>
                </div>
                <div className="stat">
                  <dt>Structure</dt>
                  <dd>Modular files</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section id="features" className="section">
          <div className="container">
            <h2>Features</h2>
            <div className="grid">
              <article className="card">
                <h3>Semantic layout</h3>
                <p>Header, nav, main, sections, and footer for clarity and SEO.</p>
              </article>
              <article className="card">
                <h3>Accessible defaults</h3>
                <p>Skip link, focus styles, and sensible landmarks out of the box.</p>
              </article>
              <article className="card">
                <h3>Clean separation</h3>
                <p>HTML + CSS + JS are split for easier maintenance and growth.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="section alt">
          <div className="container">
            <h2>About</h2>
            <p>
              Start here and replace the copy and sections with your real content. The CSS uses a small token system
              (colors, spacing) so styling stays consistent.
            </p>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2>Contact</h2>
            <form className="form" onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} required />
              </div>
              <button className="button primary" type="submit">
                Send
              </button>
              <p className="form-status" role="status" aria-live="polite" />
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <small>© {new Date().getFullYear()} Website. All rights reserved.</small>
          <a href="#main">Back to top</a>
        </div>
      </footer>
    </>
  );
}

