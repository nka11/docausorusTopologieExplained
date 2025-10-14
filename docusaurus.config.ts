import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Cours Complet : Géométrie, Topologie, Complexité et Physique Théorique',
  tagline: 'De la Géométrie de Lie à la Théorie des Cordes',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: process.env.GITHUB_PAGES_URL || 'https://your-site.com',
  baseUrl: process.env.NODE_ENV === 'production' ? '/docausorusTopologieExplained/' : '/',

  organizationName: 'manus-ai',
  projectName: 'advanced-mathematics-course',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Cours Avancé',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Cours Théorique',
        },
        {
          to: '/docs/dictionary/mathematical_concepts_dictionary',
          label: 'Dictionnaire',
          position: 'left',
        },
        {
          to: '/docs/notebooks/01_topologie_varietes',
          label: 'Notebooks',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Modules Théoriques',
          items: [
            {
              label: 'Topologie',
              to: '/docs/theory/01_topologie_generale',
            },
            {
              label: 'Groupes de Lie',
              to: '/docs/theory/08_groupes_lie',
            },
            {
              label: 'P vs NP',
              to: '/docs/theory/12_p_vs_np',
            },
          ],
        },
        {
          title: 'Applications',
          items: [
            {
              label: 'Manifold Learning',
              to: '/docs/theory/20_manifold_learning',
            },
            {
              label: 'Word Embeddings',
              to: '/docs/theory/21_word_embeddings',
            },
            {
              label: 'TDA',
              to: '/docs/theory/15_topological_data_analysis',
            },
          ],
        },
        {
          title: 'Ressources',
          items: [
            {
              label: 'Dictionnaire',
              to: '/docs/dictionary/mathematical_concepts_dictionary',
            },
            {
              label: 'Notebooks',
              to: '/docs/notebooks/01_topologie_varietes',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Manus AI. Cours créé le 12 Octobre 2025.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
