// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MonsterJS',
  tagline: 'Simple but powerful JavaScript framework.',
  url: 'https://monster-js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/monster.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'monster-js', // Usually your GitHub org/user name.
  projectName: 'monster-js', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        googleAnalytics: {
          trackingID: 'UA-229775239-1',
          anonymizeIP: true
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/monster-js/monster-js',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: '/img/og-image.png',
      metadata: [{name: 'keywords', content: 'web component, micro-frontend, monster-js, monsterjs, javascript framework'}],
      navbar: {
        title: 'MonsterJS',
        logo: {
          alt: 'MonsterJS',
          src: 'img/monster.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/what-is-monster-js',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/monster-js',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting started',
                to: '/docs/category/getting-started',
              },
              {
                label: 'CLI',
                to: '/docs/category/cli',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/monster-js',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/CY28Qq5yWE',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/mfpjayb',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/monster-js',
              },
              {
                label: 'Support Us',
                to: '/docs/getting-started/what-is-monster-js#support-us',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Darius Bualan Jr.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/nightOwlLight')
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;
