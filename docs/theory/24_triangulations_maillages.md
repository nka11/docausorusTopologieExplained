## Module 8.2 : Triangulations et Maillages - Discrétiser l'Espace

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : De la Forme Continue à la Structure Discrète

De nombreuses formes et de nombreux espaces que nous étudions en mathématiques et en physique sont continus (variétés, surfaces). Cependant, pour les représenter et les manipuler sur un ordinateur, nous devons les discrétiser, c'est-à-dire les approximer par un ensemble fini d'éléments simples. Le **maillage (meshing)** est le processus de décomposition d'un domaine continu en un ensemble de cellules géométriques simples, comme des triangles (en 2D) ou des tétraèdres (en 3D).

Les **triangulations** et les maillages sont au cœur de nombreuses disciplines :
- **Graphisme par ordinateur** : Les modèles 3D de personnages, d'objets et de terrains sont presque toujours représentés par des maillages triangulaires.
- **Simulation numérique (Méthode des Éléments Finis)** : Pour résoudre des équations aux dérivées partielles (PDEs) qui décrivent des phénomènes physiques (mécanique des fluides, transfert de chaleur, électromagnétisme), on discrétise le domaine de calcul en un maillage.
- **Géométrie algorithmique** : Les triangulations sont des structures fondamentales pour de nombreux algorithmes géométriques.

Ce module explore deux des constructions les plus importantes de la géométrie algorithmique : la **triangulation de Delaunay** et son dual, le **diagramme de Voronoï**.

## 1. Diagrammes de Voronoï : Les Territoires les Plus Proches

Imaginez que vous avez un ensemble de "sites" (des villes, des antennes relais, etc.) dans un plan. Le diagramme de Voronoï partitionne le plan en régions, où chaque région correspond à un site et contient tous les points du plan qui sont plus proches de ce site que de n'importe quel autre.

> **Définition : Diagramme de Voronoï**
> Étant donné un ensemble de sites *P* = \{p₁, p₂, ..., p_n\} dans le plan, le **diagramme de Voronoï** de *P* est une partition du plan en *n* cellules *V(p_i)*, telle que :
> V(p_i) = \{x \in ℝ² | d(x, p_i) \le d(x, p_j) pour tout j \ne i\}

Les frontières entre les cellules sont des segments de la médiatrice des paires de sites. Les points où trois frontières (ou plus) se rencontrent sont équidistants de trois sites (ou plus) et sont les centres des cercles circonscrits aux triangles formés par ces sites.

## 2. Triangulation de Delaunay : L'Épine Dorsale du Nuage de Points

La **triangulation de Delaunay** est une triangulation d'un ensemble de points qui est intimement liée au diagramme de Voronoï. C'est le **dual géométrique** du diagramme de Voronoï : on crée une arête entre deux sites si et seulement si leurs cellules de Voronoï partagent une frontière commune.

Le résultat est une triangulation avec une propriété très spéciale et désirable.

> **Définition : Triangulation de Delaunay**
> Une triangulation d'un ensemble de points *P* est une triangulation de Delaunay si elle satisfait la **condition du cercle vide** (ou condition de Delaunay) :
> Pour chaque triangle de la triangulation, son cercle circonscrit ne contient aucun autre point de *P* dans son intérieur.

Cette condition a une conséquence importante : la triangulation de Delaunay tend à **maximiser l'angle minimal** de tous les triangles de la triangulation. Elle évite les triangles "plats" ou "effilés", ce qui est crucial pour la stabilité et la précision des simulations numériques.

## 3. Propriétés et Algorithmes

- **Convexité** : La triangulation de Delaunay d'un ensemble de points remplit l'**enveloppe convexe** de ces points.
- **Unicité** : La triangulation de Delaunay est unique si aucun ensemble de quatre points n'est co-circulaire.

**Algorithmes de construction** :
- **Algorithme incrémental** : On part d'un grand triangle englobant et on insère les points un par un. À chaque insertion, on supprime les triangles dont le cercle circonscrit contient le nouveau point, et on re-triangule la cavité ainsi formée.
- **Algorithme "diviser pour régner"** : On divise les points en deux, on calcule récursivement la triangulation de chaque moitié, puis on fusionne les deux triangulations.

## 4. Maillages Simpliciaux et Topologie

Les triangulations sont un cas particulier de **complexes simpliciaux**, la structure de données fondamentale de la topologie algébrique. Un maillage simplicial est une collection de simplexes (points, arêtes, triangles, tétraèdres, etc.) qui s'emboîtent correctement.

Cette représentation est extrêmement puissante car elle encode non seulement la géométrie, mais aussi la **topologie** de l'objet (ses propriétés de connectivité, ses trous, etc.). On peut utiliser les outils de l'homologie (vus au module 5.1) directement sur le maillage pour calculer les invariants topologiques de l'objet qu'il représente.

## 5. Applications

- **Graphisme par Ordinateur** : Les maillages triangulaires sont le standard pour la modélisation 3D. La propriété de "bons angles" de Delaunay est utile pour le rendu et l'animation.

- **Méthode des Éléments Finis (FEM)** : En simulation, la qualité du maillage est primordiale. Un maillage avec des triangles de mauvaise qualité peut conduire à des instabilités et des résultats de simulation incorrects. Les algorithmes basés sur Delaunay sont souvent utilisés pour générer des maillages de haute qualité.

- **Reconstruction de Surface** : Étant donné un nuage de points échantillonné à partir d'une surface, on peut utiliser des variantes de la triangulation de Delaunay (comme l'alpha-shape) pour reconstruire une approximation de la surface d'origine.

- **Interpolation et Systèmes d'Information Géographique (SIG)** : Le diagramme de Voronoï est utilisé pour l'interpolation du plus proche voisin. La triangulation de Delaunay est utilisée pour créer des Réseaux Triangulés Irréguliers (TIN), une structure de données pour représenter des surfaces comme le relief terrestre.

## Conclusion

Les diagrammes de Voronoï et les triangulations de Delaunay sont des structures géométriques duales d'une élégance et d'une utilité remarquables. Elles fournissent une manière canonique et robuste de dériver une structure de connectivité (un graphe, une triangulation) à partir d'un simple nuage de points.

En tant que fondement des maillages, elles sont le pont entre le monde continu des formes idéales et le monde discret des ordinateurs. Elles nous permettent de représenter, d'analyser et de simuler des objets et des phénomènes complexes, en fournissant une structure qui capture à la fois la géométrie locale et la topologie globale. La compréhension de ces constructions est essentielle pour quiconque travaille à l'intersection de la géométrie, de l'informatique et de la simulation.

---

## Références

[1] de Berg, M., Cheong, O., van Kreveld, M., & Overmars, M. (2008). *Computational Geometry: Algorithms and Applications*. Springer.
[2] Aurenhammer, F., Klein, R., & Lee, D. T. (2013). *Voronoi Diagrams and Delaunay Triangulations*. World Scientific.
[3] Si, H. (2015). *TetGen, a Delaunay-based quality tetrahedral mesh generator*. ACM Transactions on Mathematical Software (TOMS), 41(2), 1-36.

