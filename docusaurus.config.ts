import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import math from 'remark-math';
import katex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Cours Complet : Géométrie, Topologie, Complexité et Physique Théorique',
  tagline: 'De la Géométrie de Lie à la Théorie des Cordes',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: process.env.GITHUB_PAGES_URL || 'https://your-site.com',
  baseUrl: '/docausorusTopologieExplained/',

  organizationName: 'manus-ai',
  projectName: 'advanced-mathematics-course',

  onBrokenLinks: 'throw',

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
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, locale: 'fr', options: {wordsPerMinute: 300}}),
          feedOptions: {
            type: 'all',
            title: 'Cours Avancé - Blog',
            description: 'Articles et exemples du cours de mathématiques avancées',
            copyright: `Copyright © ${new Date().getFullYear()} Manus AI.`,
            language: 'fr',
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],


  markdown: {
    mermaid: true,
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
    },
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
          label: '📚 Cours',
        },
        {
          to: '/blog',
          label: '📝 Blog',
          position: 'left',
        },
        {
          to: '/docs/dictionary/mathematical_concepts_dictionary',
          label: '📖 Dictionnaire',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: '🔬 Ressources',
          position: 'left',
          items: [
            {
              to: '/docs/notebooks/topologie_varietes',
              label: '📓 Notebooks Jupyter',
            },
            {
              to: '/docs/applications/applications_synthesis',
              label: '🚀 Applications',
            },
          ],
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
              to: '/docs/theory/topologie_generale',
            },
            {
              label: 'Groupes de Lie',
              to: '/docs/theory/groupes_lie',
            },
            {
              label: 'P vs NP',
              to: '/docs/theory/p_vs_np',
            },
          ],
        },
        {
          title: 'Applications',
          items: [
            {
              label: 'Manifold Learning',
              to: '/docs/theory/manifold_learning',
            },
            {
              label: 'Word Embeddings',
              to: '/docs/theory/word_embeddings',
            },
            {
              label: 'TDA',
              to: '/docs/theory/topological_data_analysis',
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
              to: '/docs/notebooks/topologie_varietes',
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
