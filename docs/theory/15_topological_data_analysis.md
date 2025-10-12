## Module 5.2 : Topological Data Analysis (TDA) - Révéler la Forme des Données

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Au-delà des Statistiques Traditionnelles

À l'ère du Big Data, nous sommes inondés de données complexes et de grande dimension. Les méthodes traditionnelles d'analyse, comme les statistiques descriptives (moyenne, variance) ou même l'analyse en composantes principales (PCA), peuvent manquer des caractéristiques structurelles importantes. Comment pouvons-nous détecter des motifs, des boucles, des clusters ou des vides dans un nuage de points de grande dimension ?

L'**Analyse Topologique des Données (TDA)** est un domaine relativement nouveau qui applique les concepts de la topologie algébrique pour extraire des informations structurelles et qualitatives à partir de données. L'idée centrale est que les données ont une "forme" sous-jacente, et que cette forme a une importance. Le TDA fournit des outils pour calculer, visualiser et interpréter cette forme.

L'outil principal du TDA est l'**homologie persistante**, une adaptation de l'homologie classique qui est robuste au bruit et qui permet de distinguer les caractéristiques topologiques significatives des artefacts de l'échantillonnage.

## 1. Des Données à un Espace Topologique

Le point de départ du TDA est un ensemble de données, qui est souvent un **nuage de points** dans un espace de grande dimension (par exemple, des images, des données génomiques, des séries temporelles). La première étape consiste à transformer ce nuage de points discret en un espace topologique continu.

L'approche la plus courante consiste à "épaissir" chaque point en le remplaçant par une boule, et à faire croître le rayon de ces boules. Un **complexe simplicial** est construit en fonction des intersections de ces boules :

- On ajoute une **arête** (un 1-simplexe) entre deux points si leurs boules s'intersectent.
- On ajoute un **triangle** (un 2-simplexe) entre trois points si leurs trois boules ont une intersection commune.
- Et ainsi de suite pour les dimensions supérieures.

Le complexe simplicial le plus utilisé est le **complexe de Vietoris-Rips**. Il est plus simple à calculer : on fixe un rayon \epsilon, et on connecte tous les points dont la distance est inférieure à \epsilon. Puis on remplit tous les simplexes possibles (si toutes les paires de sommets d'un k-simplexe sont connectées, on ajoute le k-simplexe).

## 2. L'Homologie Persistante : La Topologie à Plusieurs Échelles

Le choix du rayon \epsilon est crucial. Un \epsilon trop petit ne révélera aucune structure (juste des points isolés). Un \epsilon trop grand connectera tout à tout, formant un simplexe géant sans topologie intéressante. L'idée de l'homologie persistante est de ne pas choisir un seul \epsilon, mais de les considérer **tous**.

On construit une séquence de complexes simpliciaux imbriqués, appelée **filtration**, en augmentant continûment le paramètre d'échelle \epsilon.

K_\epsilon₁ \subseteq K_\epsilon₂ \subseteq K_\epsilon₃ \subseteq ...

Pour chaque complexe K_\epsilon de la filtration, on peut calculer ses groupes d'homologie H_n(K_\epsilon). L'homologie persistante suit l'évolution de ces groupes à travers la filtration. Elle identifie les caractéristiques topologiques (les "trous") et suit leur "durée de vie" :

- Une caractéristique **naît** à une valeur \epsilon_birth lorsqu'elle apparaît pour la première fois.
- Elle **meurt** à une valeur \epsilon_death lorsqu'elle est "rebouchée" par des simplexes de dimension supérieure.

La **persistance** d'une caractéristique est la différence \epsilon_death - \epsilon_birth.

> **L'Hypothèse de Persistance** :
> - Les caractéristiques avec une **grande persistance** sont considérées comme des caractéristiques topologiques **significatives** de l'espace sous-jacent.
> - Les caractéristiques avec une **faible persistance** sont considérées comme du **bruit**.

## 3. Le Diagramme de Persistance : Visualiser la Topologie

Le résultat d'une analyse par homologie persistante est un **diagramme de persistance** (ou barcode). C'est une représentation visuelle de toutes les caractéristiques topologiques détectées.

- **Barcode (Code-barres)** : Chaque caractéristique topologique est représentée par un intervalle horizontal [\epsilon_birth, \epsilon_death]. Les longs segments correspondent aux caractéristiques persistantes.

- **Diagramme de Persistance** : C'est un diagramme de dispersion où chaque caractéristique est un point de coordonnées (\epsilon_birth, \epsilon_death). 
    - Les points **loin de la diagonale** (y=x) correspondent aux caractéristiques très persistantes (grande différence entre la mort et la naissance).
    - Les points **proches de la diagonale** correspondent au bruit (faible persistance).

Ces diagrammes sont des signatures topologiques des données. On peut définir des distances entre eux (comme la distance bottleneck ou Wasserstein) pour comparer quantitativement la forme de différents ensembles de données.

| Dimension | Caractéristique Topologique | Interprétation dans les Données |
| :--- | :--- | :--- |
| **H₀** | Composantes connexes | Clusters, groupes |
| **H₁** | Trous circulaires | Boucles, cycles, périodicité |
| **H₂** | Vides, cavités | Vides, poches, sphéroïdes |

## 4. L'Algorithme Mapper : Une Carte Topologique des Données

Mapper est un autre outil puissant du TDA, axé sur la visualisation. Il simplifie un nuage de points de grande dimension en un **graphe** (un complexe simplicial 1D) qui capture sa structure topologique et géométrique.

L'algorithme Mapper fonctionne en trois étapes :

1.  **Filtrage** : On projette les données sur une ou plusieurs dimensions à l'aide d'une ou plusieurs fonctions de filtrage (par exemple, la hauteur, la densité, ou une projection PCA).
2.  **Clustering** : On découpe l'intervalle de la fonction de filtrage en segments qui se chevauchent. Pour chaque segment, on regroupe les points de données correspondants en clusters.
3.  **Construction du Graphe** : Chaque cluster devient un nœud dans le graphe. On relie deux nœuds par une arête si les clusters correspondants partagent des points de données.

Le graphe Mapper résultant est une sorte de "squelette" topologique des données. En colorant les nœuds du graphe en fonction des valeurs de certaines variables, on peut visualiser des relations complexes et identifier des sous-populations de données.

## Conclusion

L'analyse topologique des données offre une nouvelle perspective pour comprendre la structure des données complexes. En se concentrant sur la forme plutôt que sur des coordonnées spécifiques, elle fournit des descripteurs robustes au bruit et aux déformations. L'homologie persistante nous donne un moyen de quantifier la topologie à plusieurs échelles et de séparer le signal du bruit. L'algorithme Mapper nous fournit des cartes simplifiées et visualisables de paysages de données complexes.

Le TDA a déjà trouvé des applications dans de nombreux domaines, de la découverte de nouveaux sous-types de cancer du sein à l'analyse de la structure du cerveau, en passant par l'étude des matériaux et la modélisation financière. C'est un domaine en pleine expansion qui illustre parfaitement la puissance des mathématiques pures pour résoudre des problèmes concrets du monde moderne.

---

## Références

[1] Carlsson, G. (2009). *Topology and data*. Bulletin of the American Mathematical Society, 46(2), 255-308.
[2] Edelsbrunner, H., & Harer, J. (2010). *Computational Topology: An Introduction*. American Mathematical Society.
[3] Ghrist, R. (2014). *Elementary Applied Topology*. Createspace.
[4] Singh, G., Mémoli, F., & Carlsson, G. (2007). *Topological Methods for the Analysis of High Dimensional Data Sets and 3D Object Recognition*. SPBG.

