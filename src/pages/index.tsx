import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/theory/01_topologie_generale">
            Commencer le Cours 📚
          </Link>
          <Link
            className="button button--outline button--lg margin-left--md"
            to="/blog">
            Découvrir le Blog 📝
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({title, description, icon, to}) {
  return (
    <div className="col col--4">
      <div className="text--center padding-horiz--md">
        <div className="feature-icon" style={{fontSize: '3rem', marginBottom: '1rem'}}>
          {icon}
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link to={to} className="button button--outline button--primary">
          Explorer
        </Link>
      </div>
    </div>
  );
}

function CourseOverview() {
  return (
    <section className="padding-vert--xl">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2">🎓 Vue d'Ensemble du Cours</Heading>
              <p className="hero__subtitle">
                Un voyage à travers les mathématiques les plus avancées, de la topologie algébrique à la théorie des cordes
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <FeatureCard
            title="🧮 Mathématiques Pures"
            description="Topologie, géométrie différentielle, groupes de Lie, algèbres de Lie"
            icon="🧮"
            to="/docs/theory/01_topologie_generale"
          />
          <FeatureCard
            title="💻 Théorie de la Complexité"
            description="P vs NP, NP-complétude, algorithmes d'approximation, heuristiques"
            icon="💻"
            to="/docs/theory/11_complexite_fondements"
          />
          <FeatureCard
            title="🌌 Physique Théorique"
            description="Relativité générale, théorie des cordes, variétés de Calabi-Yau"
            icon="🌌"
            to="/docs/theory/17_intro_cordes"
          />
        </div>
        <div className="row">
          <FeatureCard
            title="🔬 Applications Modernes"
            description="TDA, manifold learning, word embeddings, graph neural networks"
            icon="🔬"
            to="/docs/theory/20_manifold_learning"
          />
          <FeatureCard
            title="📖 Dictionnaire Mathématique"
            description="Plus de 500 concepts mathématiques expliqués et illustrés"
            icon="📖"
            to="/docs/dictionary/mathematical_concepts_dictionary"
          />
          <FeatureCard
            title="📓 Notebooks Interactifs"
            description="Jupyter notebooks avec exemples pratiques et visualisations"
            icon="📓"
            to="/docs/notebooks/01_topologie_varietes"
          />
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  return (
    <section className="padding-vert--xl" style={{backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2">📝 Derniers Articles du Blog</Heading>
              <p className="hero__subtitle">
                Découvrez des exemples concrets, des visualisations interactives et des applications pratiques
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col--4">
            <div className="blog-card padding--md">
              <Heading as="h4">🌌 Analyse Topologique des Données</Heading>
              <p>Révélez la structure cachée de vos données avec la TDA. Exemples pratiques et visualisations.</p>
              <Link to="/blog/topological-data-analysis-visualization" className="button button--primary button--sm">
                Lire l'article
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className="blog-card padding--md">
              <Heading as="h4">🧩 P vs NP : Le Problème du Millénaire</Heading>
              <p>Explorez l'un des plus grands mystères des mathématiques avec des exemples concrets.</p>
              <Link to="/blog/p-vs-np-complexity-explained" className="button button--primary button--sm">
                Lire l'article
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className="blog-card padding--md">
              <Heading as="h4">🎻 Théorie des Cordes</Heading>
              <p>La symphonie mathématique de l'univers. Visualisations des vibrations de cordes.</p>
              <Link to="/blog/string-theory-mathematical-beauty" className="button button--primary button--sm">
                Lire l'article
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statistics() {
  return (
    <section className="padding-vert--xl">
      <div className="container">
        <div className="row">
          <div className="col col--3">
            <div className="text--center">
              <div className="stat-number" style={{fontSize: '3rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)'}}>
                24
              </div>
              <div className="stat-label">Chapitres Théoriques</div>
            </div>
          </div>
          <div className="col col--3">
            <div className="text--center">
              <div className="stat-number" style={{fontSize: '3rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)'}}>
                7
              </div>
              <div className="stat-label">Notebooks Interactifs</div>
            </div>
          </div>
          <div className="col col--3">
            <div className="text--center">
              <div className="stat-number" style={{fontSize: '3rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)'}}>
                500+
              </div>
              <div className="stat-label">Concepts Mathématiques</div>
            </div>
          </div>
          <div className="col col--3">
            <div className="text--center">
              <div className="stat-number" style={{fontSize: '3rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)'}}>
                4
              </div>
              <div className="stat-label">Domaines d'Application</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Accueil"
      description="Cours complet de mathématiques avancées : topologie, géométrie, complexité et physique théorique">
      <HomepageHeader />
      <main>
        <CourseOverview />
        <BlogPreview />
        <Statistics />
      </main>
    </Layout>
  );
}
