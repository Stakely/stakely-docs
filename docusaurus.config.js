// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
require('dotenv').config();

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    }
  },
  customFields: {
    stakingApiUrl: process.env.STAKING_API_URL,
    appUrl: process.env.APP_URL,
  },
  title: 'Stakely Docs',
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
          breadcrumbs: true,
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: false,
          sidebarCollapsible: false, // Still thinkingif this is a good idea
        },
        blog: false, // Optional: disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@scalar/docusaurus',
      {
        label: '',
        route: '/staking-api/api-reference',
        configuration: {
          // theme: 'solarized',
          // layout: 'classic',
          spec: {
            url: process.env.STAKING_API_DOC_JSON_URL
          },
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/STKL_Docs.webp',
      navbar: {
        logo: {
          alt: 'Stakely Docs Logo',
          src: 'img/STKL_Docs.webp',
          srcDark: 'img/STKL_Docs_dark.png',
        },
        items: [
          {
            to: "staking-api/what-is-staking",
            label: "Staking API",
            position: "left",
            activeBasePath: 'staking-api/',
          },
          {
            to: "public-nodes/introduction",
            label: "Public Nodes",
            position: "left",
            activeBasePath: 'public-nodes/',
          },
          {
            to: "obol-portal/introduction",
            label: "Obol Portal",
            position: "left",
            activeBasePath: 'obol-portal/',
          },
          {
            to: "simple-csm/introduction",
            label: "Simple CSM",
            position: "left",
            activeBasePath: 'simple-csm/',
          },
          {
            href: 'https://stakely.io',
            position: 'right',
            label: 'Stakely Home',
          },
          {
            href: 'https://github.com/Stakely/stakely-docs',
            label: 'Contribute',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'About Stakely',
            items: [
              {
                label: 'Main Website',
                href: 'https://stakely.io',
              },
              {
                label: 'Blog',
                href: 'https://stakely.io/blog',
              },
              {
                label: 'Security',
                href: 'https://security.stakely.io/',
              },
              {
                href: 'https://github.com/Stakely',
                label: 'GitHub',
              }
            ]
          },
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
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/stakely-io',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy Policy',
                href: 'https://stakely.io/policies/privacy-policy',
              },
              {
                label: 'Terms of Use',
                href: 'https://stakely.io/policies/terms-of-use',
              },
            ]
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Stakely, SL`,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
    themes: [
      '@docusaurus/theme-mermaid',
      [
        // @ts-ignore
        require.resolve("@easyops-cn/docusaurus-search-local"),
        /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
        // @ts-ignore
        ({
          // `hashed` is recommended as long-term-cache of index file is possible
          language: ["en"],
          indexDocs: true,
          indexBlog: false,
          docsRouteBasePath: "/",
        }),
      ]
    ],
};

export default config;
