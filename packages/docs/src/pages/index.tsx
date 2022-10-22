import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--banner', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="hero__subtitle-sub">Simple and lightweight</p>
        <p className="hero__subtitle-sub">Web Components</p>
        <div className={styles.buttons}>
          <Link
            className="button hero-buttons hero-button-inverse button--secondary button--lg"
            to="https://github.com/monster-js">
              GitHub
          </Link>
          <Link
            className="button hero-buttons button--secondary button--lg"
            to="/docs/getting-started/what-is-monster-js">
              Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="MonsterJS is a JavaScript framework for building web applications or stand-alone components. It is based on web components suitable for encapsulating components and building micro frontend apps.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}