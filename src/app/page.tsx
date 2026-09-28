import { beyondCv, achievements, education, journey, leadership, learning, oneForma, projects, researchInterests, researchProject, site, skillGroups } from "@/content/site";
import { getEditableProfile } from "@/content/profile-store";

export const dynamic = "force-dynamic";

function SectionHeading({ number, eyebrow, title, intro }: { number: string; eyebrow: string; title: string; intro: string }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="section-intro">{intro}</p>
      </div>
    </div>
  );
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">-&gt;</span>;
}

function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return <p className="placeholder-note"><span className="placeholder-dot" aria-hidden="true" />{children}</p>;
}

export default async function HomePage() {
  const profile = await getEditableProfile();
  const links = [
    { label: "LinkedIn", href: profile.linkedin, note: profile.linkedin ? "Open profile" : "URL to add" },
    { label: "GitHub", href: profile.github, note: profile.github ? "Open profile" : "URL to add" },
    { label: "Email", href: profile.email ? `mailto:${profile.email}` : "", note: profile.email ? "Send an email" : "Address to add" },
    { label: "Phone", href: profile.phone ? `tel:${profile.phone.replace(/[^\d+]/g, "")}` : "", note: profile.phone ? "Call" : "Number to add" },
    ...profile.otherLinks.map((link) => ({ label: link.label, href: link.url, note: "Open link" })),
  ].map((link) => ({ ...link, href: link.href || "#contact", external: link.href.startsWith("http") }));

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Back to homepage">
          <span className="wordmark-mark">NC</span>
          <span>{profile.shortName}</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {site.nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <a className="header-action" href="#contact">Start a conversation <Arrow /></a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span className="menu-lines" aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation">
            {site.nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
        </details>
      </header>

      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker"><span className="status-dot" aria-hidden="true" />Science / Data / AI / Health</p>
            <h1>{profile.name}</h1>
            <p className="hero-headline">{profile.headline}</p>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <Arrow /></a>
              <a className="button button-secondary" href="/cv/ndibueze-cv.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-links" aria-label="Professional links">
              {links.slice(0, 3).map((social) => <a key={social.label} href={social.href} target={social.external ? "_blank" : undefined} rel={social.external ? "noreferrer" : undefined}>{social.label} <span>{social.note}</span></a>)}
            </div>
          </div>
          <div className="hero-aside">
            <div className="direction-card">
              <div className="card-topline"><span>Current direction</span><span>01—04</span></div>
              <div className="direction-item"><span className="direction-index">01</span><div><strong>Scientific foundation</strong><p>Microbiology &amp; public health</p></div></div>
              <div className="direction-rule" />
              <div className="direction-item active"><span className="direction-index">02</span><div><strong>Computational practice</strong><p>Data, ML &amp; AI applications</p></div></div>
              <div className="direction-rule" />
              <div className="direction-item"><span className="direction-index">03</span><div><strong>Next frontier</strong><p>Human-centered digital health</p></div></div>
              <div className="direction-footer"><span>Open to research, learning &amp; collaboration</span><span className="mini-arrow">↗</span></div>
            </div>
          </div>
          <div className="hero-bottomline"><span>Based in {profile.location}</span><span>Building a career at the intersection of science and computation</span><span>Scroll to explore <span aria-hidden="true">↓</span></span></div>
        </section>

        <div className="signal-strip" aria-label="Areas of focus">
          <span>Microbiology</span><i aria-hidden="true">×</i><span>Public health</span><i aria-hidden="true">×</i><span>Machine learning</span><i aria-hidden="true">×</i><span>Digital health</span><i aria-hidden="true">×</i><span>Human-centered AI</span>
        </div>

        <section id="about" className="section-shell section-light">
          <SectionHeading number="01" eyebrow="The throughline" title="A scientific foundation, extended by computation." intro="My direction has evolved, but the question underneath it has stayed consistent: how can careful evidence and useful tools help us understand and respond to complex health problems?" />
          <div className="about-grid">
            <div className="about-story">
              <p className="lead-copy">I started in microbiology, where I learned to pay attention to systems that are not always visible but shape real outcomes. Public health research made that perspective more concrete: the quality of a question, a dataset, and an interpretation can affect how we understand people&apos;s health.</p>
              <p>As I learned more about data science, machine learning, and artificial intelligence, I saw a natural extension of that scientific training. Computational methods give me another way to investigate patterns, build useful systems, and ask better questions. I am not leaving microbiology behind; I am carrying its discipline into work with data and AI.</p>
              <p>My current focus is practical and still developing: building technical depth while staying close to healthcare, public health, infectious disease, and the people who will rely on these systems.</p>
              <a className="text-link" href="#research">Read the research direction <Arrow /></a>
            </div>
            <div className="journey-list">
              {journey.map((item) => <div className="journey-item" key={item.number}><span className="journey-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}
            </div>
          </div>
        </section>

        <section id="education" className="section-shell section-warm">
          <SectionHeading number="02" eyebrow="Education" title="A microbiology degree with a wider computational horizon." intro="My academic foundation is rooted in the life sciences. The technical direction that follows grows from that foundation rather than replacing it." />
          <div className="education-grid">
            <article className="education-card">
              <p className="eyebrow">Undergraduate degree</p>
              <h3>{education.institution}</h3>
              <p className="education-degree">{education.degree}</p>
              <p className="education-result">{education.result}</p>
              <PlaceholderNote>{education.period}</PlaceholderNote>
            </article>
            <div className="education-context">
              <span className="small-label">Academic context</span>
              <p>{education.context}</p>
              <div className="education-bridge"><span>Next layer</span><strong>Professional learning and applied practice</strong><a className="text-link" href="#learning">See the learning path <Arrow /></a></div>
            </div>
          </div>
        </section>

        <section id="research" className="section-shell section-ink">
          <SectionHeading number="03" eyebrow="Research" title="Questions that connect biology, people, and data." intro="I am interested in research that respects both the complexity of biological systems and the realities of the people and institutions within them." />
          <div className="research-grid">
            <article className="research-feature">
              <div className="feature-label">Undergraduate project / 2023</div>
              <h3>{researchProject.title}</h3>
              <p className="research-question">{researchProject.question}</p>
              <div className="research-details">
                <div><span>Context</span><p>{researchProject.relevance}</p></div>
                <div><span>Study design</span><p>{researchProject.design}</p></div>
                <div><span>Analysis</span><p>{researchProject.analysis}</p></div>
                <div><span>Findings</span><p>{researchProject.findings}</p></div>
              </div>
              <PlaceholderNote>Research report details are intentionally left open for the final methods and results.</PlaceholderNote>
            </article>
            <aside className="interest-panel">
              <div className="feature-label">Research interests</div>
              <p>Areas I am currently exploring as I prepare for deeper study and collaboration.</p>
              <div className="interest-list">{researchInterests.map((interest, index) => <span key={interest}><b>{String(index + 1).padStart(2, "0")}</b>{interest}</span>)}</div>
            </aside>
          </div>
        </section>

        <section id="projects" className="section-shell section-warm">
          <SectionHeading number="04" eyebrow="Selected work" title="Building with care at the application layer." intro="The strongest example of my current direction is work on healthcare-oriented conversational AI. The scope below is deliberately precise about what I own." />
          <div className="project-stack">
            {projects.map((project) => <article className="project-feature" key={project.title}>
              <div className="project-visual" aria-label="MedSought AI conversation layer architecture diagram">
                <div className="visual-caption"><span>MedSought AI</span><span>ML / AI layer</span></div>
                <div className="architecture-flow">
                  <div className="architecture-node"><span>01</span><strong>User context</strong><small>Question / conversation</small></div>
                  <div className="flow-line" aria-hidden="true">→</div>
                  <div className="architecture-node highlighted"><span>02</span><strong>AI layer</strong><small>Intent · urgency · safety</small></div>
                  <div className="flow-line" aria-hidden="true">→</div>
                  <div className="architecture-node"><span>03</span><strong>Response</strong><small>Grounded · contextual · useful</small></div>
                </div>
                <div className="visual-foot"><span>Retrieval-augmented generation</span><span>API integration</span><span>Guardrails</span></div>
              </div>
              <div className="project-copy">
                <p className="eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="role-callout"><span>My role</span><strong>{project.role}</strong><p>{project.built}</p></div>
                <div className="project-columns"><div><span className="small-label">Problem</span><p>{project.problem}</p></div><div><span className="small-label">Outcome</span><p>{project.outcome}</p></div></div>
                <div className="tag-list">{project.components.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="project-footer"><div className="tag-list compact">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div><div className="project-links">{project.links.map((link) => <a key={link.label} href={link.href} aria-disabled={!link.available}>{link.label} <span>{link.available ? "↗" : "to add"}</span></a>)}</div></div>
              </div>
            </article>)}
            <div className="future-project"><span className="future-plus">+</span><div><span className="small-label">The project shelf is open</span><h3>More work will live here as it becomes ready to share.</h3><p>The content model is prepared for additional projects, write-ups, screenshots, repositories, and live demos without changing the page structure.</p></div><a className="text-link" href="#contact">Add a project <Arrow /></a></div>
          </div>
        </section>

        <section id="experience" className="section-shell section-light">
          <SectionHeading number="05" eyebrow="Experience" title="Evidence of practice, with room to grow." intro="I am building a career across scientific research, technical learning, and applied AI work. This section is designed to grow with the next chapter." />
          <div className="experience-grid">
            <article className="oneforma-card">
              <div className="feature-label">{oneForma.eyebrow}</div>
              <h3>{oneForma.title}</h3>
              <p>{oneForma.description}</p>
              <ul className="clean-list">{oneForma.activities.map((item) => <li key={item}><span aria-hidden="true">↳</span>{item}</li>)}</ul>
              <PlaceholderNote>{oneForma.details}</PlaceholderNote>
            </article>
            <div className="empty-timeline">
              <div className="timeline-line" aria-hidden="true" />
              <div className="timeline-entry"><span className="timeline-marker" aria-hidden="true" /><div><p className="eyebrow">Professional experience</p><h3>Future roles and collaborations</h3><p>Employers, positions, dates, responsibilities, and outcomes will be added here as they become part of the story.</p><a className="text-link" href="#contact">Share an update <Arrow /></a></div></div>
            </div>
          </div>
        </section>

        <section id="leadership" className="section-shell section-coral">
          <SectionHeading number="06" eyebrow="Leadership & community" title="Making room for people to do good work." intro="Leadership has been one of the places where my scientific training became very practical: listen carefully, coordinate honestly, and keep the work moving." />
          <div className="leadership-grid">
            <div><p className="feature-label">{leadership.eyebrow}</p><h3>{leadership.title}</h3><p className="leadership-description">{leadership.description}</p><p className="leadership-reflection">{leadership.reflection}</p></div>
            <div className="responsibility-list">{leadership.responsibilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div>
          </div>
          <div className="service-placeholder"><span>Next additions</span><strong>NYSC leadership, volunteering, and service experiences</strong><p>Details to add when ready.</p></div>
        </section>

        <section id="skills" className="section-shell section-ink skills-section">
          <SectionHeading number="07" eyebrow="Technical toolkit" title="A growing toolkit, described without inflated scores." intro="These are the languages, methods, and tools connected to my learning and project work. I prefer context over arbitrary proficiency bars." />
          <div className="skills-grid">{skillGroups.map((group, index) => <article className="skill-group" key={group.title}><div className="skill-index">0{index + 1}</div><h3>{group.title}</h3><p>{group.note}</p><div className="tag-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
        </section>

        <section id="learning" className="section-shell section-light">
          <SectionHeading number="08" eyebrow="Learning" title="Continuous learning that stays close to application." intro="I am most interested in learning that changes how I think, what I can build, or how responsibly I can evaluate a system." />
          <div className="learning-list">{learning.map((item, index) => <article key={item.name} className="learning-item"><span className="learning-index">0{index + 1}</span><div><p className="eyebrow">{item.type}</p><h3>{item.name}</h3><p>{item.text}</p><PlaceholderNote>{item.detail}</PlaceholderNote></div><span className="learning-arrow" aria-hidden="true">↗</span></article>)}</div>
        </section>

        <section className="section-shell section-warm achievements-section">
          <div className="split-heading"><div><p className="eyebrow">09 / Selected markers</p><h2>Work that has shaped the direction.</h2></div><p>Not a wall of awards. A short record of the academic, leadership, research, and technical experiences that matter to the story.</p></div>
          <div className="achievement-grid">{achievements.map((item) => <article key={item.title}><span className="small-label">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>

        <section id="writing" className="section-shell section-light">
          <SectionHeading number="10" eyebrow="Writing / insights" title="A place for the thinking behind the work." intro="Technical notes, research reflections, project write-ups, and lessons from building AI applications will live here as they become ready to publish." />
          <div className="writing-placeholder"><div className="writing-mark">01</div><div><p className="eyebrow">Coming into focus</p><h3>Future notes will connect the work to the questions behind it.</h3><p>Writing is intentionally left open until there are pieces that add something useful: a clear explanation, a research reflection, or a lesson worth passing on.</p></div><a className="text-link" href="#contact">Suggest a topic <Arrow /></a></div>
        </section>

        <section className="section-shell section-sage beyond-section">
          <SectionHeading number="11" eyebrow="Beyond the CV" title="A little more context about the person doing the work." intro="The professional profile is important, but it is not the whole picture. These are quiet, recurring parts of how I learn and show up." />
          <div className="beyond-grid">{beyondCv.map((item, index) => <article key={item.title}><span className="beyond-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-inner">
            <div><p className="eyebrow">Let&apos;s connect</p><h2>Good work often begins with a thoughtful question.</h2><p className="contact-intro">I am open to conversations about research, graduate study, applied AI, digital health, data work, and collaborations that take the problem seriously.</p></div>
            <div className="contact-actions"><a className="button button-light" href={profile.email ? `mailto:${profile.email}` : "#contact"}>Email me <Arrow /></a><div className="contact-links">{links.map((social) => <a key={social.label} href={social.href} target={social.external ? "_blank" : undefined} rel={social.external ? "noreferrer" : undefined}>{social.label}<span>{social.note}</span></a>)}</div></div>
          </div>
          <div className="cv-note"><div><span className="small-label">Curriculum vitae</span><strong>The download slot is ready for the latest PDF.</strong><p>Replace <code>public/cv/ndibueze-cv.pdf</code> when the final CV is available.</p></div><a className="button button-outline-light" href="/cv/ndibueze-cv.pdf" download>Download CV <span aria-hidden="true">↓</span></a></div>
        </section>
      </main>

      <footer className="site-footer"><span>© {new Date().getFullYear()} {profile.name}</span><span>Science × Data × AI × Health</span><a href="#home">Back to top ↑</a></footer>
    </div>
  );
}
