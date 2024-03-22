// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Staking Docs',
  tagline: 'Stakely developer Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.stakely.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'stakely', // Usually your GitHub org/user name.
  projectName: 'stakely-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
        },
        blog: false, // Optional: disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Developer & Staking Docs',
        logo: {
          alt: 'Stakely Logo',
          src: 'img/Stakely-io-logo.png',
        },
        items: [
          {
            href: 'https://stakely.io',
            position: 'right',
            label: 'Main Website',
          },
          {
            href: 'https://github.com/Stakely/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/Stakely_io',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/Stakely',
              },
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Stakely, SL`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
