import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imageUrl: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    imageUrl: '/img/monster-1-128.png',
    description: (
      <>This framework is built to be simple, easy to understand, and easy to use.</>
    ),
  },
  {
    title: 'Component-Based',
    imageUrl: '/img/monster-2-128.png',
    description: (
      <>Build small components that manage their own states as building blocks to build larger applications.</>
    ),
  },
  {
    title: 'Web Components',
    imageUrl: '/img/monster-3-128.png',
    description: (
      <>It is based on web components suitable for building loosely coupled components.</>
    ),
  },
];

function Feature({title, imageUrl, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} src={imageUrl} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}