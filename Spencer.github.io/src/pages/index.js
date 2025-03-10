import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Hey, I’m <span className={styles.heroHighlight}>Spencer</span>!
        </Heading>
        <p className={styles.heroGreeting}>Nice to meet you</p>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function NavigationCard({ title, description, to, href }) {
  return (
    <div className={styles.card}>
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDescription}>{description}</p>
      {to ? (
        <Link to={to} className={styles.cardLink}>
          Dive In →
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
          Check It Out →
        </a>
      )}
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Spencer’s Byte-Sized Universe"
    >
      <HomepageHeader />
      <main className={styles.main}>
        <section className={clsx('container', styles.introSection)}>
          <p className={styles.introText}>
            I’m a tech enthusiast and problem-solver. This is my digital playground—expect scripts, insights, and a bit of chaos from my journey in Technology and Security.
          </p>
        </section>
        <section className={clsx('container', styles.navSection)}>
          <Heading as="h2" className={styles.sectionTitle}>
            Get Around
          </Heading>
          <div className={styles.cardGrid}>
            <NavigationCard
              title="Blog"
              description="Tech thoughts, PowerShell hacks, and random musings—like my NinjaOne Admin Lock post."
              to="/blog"
            />
            <NavigationCard
              title="GitHub"
              description="Check out my code and projects on GitHub."
              href="https://github.com/Sp-e-n-c-er/"
            />
            <NavigationCard
              title="Discord"
              description="Join me on Discord for a chat or collab."
              href="https://discordapp.com/users/286552274099240960"
            />
          </div>
        </section>
        <footer className={styles.footer}>
          <p>Thanks for stopping by—hope you find something cool! <em>Updated: March 2025</em></p>
        </footer>
      </main>
    </Layout>
  );
}