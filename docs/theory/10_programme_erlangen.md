## Module 3.4 : Le Programme d'Erlangen - Unifier les Géométries

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Une Révolution dans la Pensée Géométrique

Au milieu du XIXe siècle, le monde de la géométrie était en pleine effervescence. Après 2000 ans de domination euclidienne, la découverte des géométries non-euclidiennes (hyperbolique, elliptique) avait brisé l'idée d'une seule et unique géométrie "vraie". La géométrie projective, issue de la perspective en art, offrait encore un autre point de vue. Comment organiser ce zoo de nouvelles géométries ? Qu'est-ce qu'une géométrie, au fond ?

En 1872, un jeune mathématicien de 23 ans, Felix Klein, proposa une réponse révolutionnaire dans son discours inaugural à l'Université d'Erlangen. Son idée, connue sous le nom de **Programme d'Erlangen**, était d'utiliser la théorie des groupes, alors une nouveauté, pour classifier et unifier toutes les géométries. Il a redéfini la géométrie non pas comme l'étude de figures, mais comme l'étude des **invariants** sous l'action d'un **groupe de transformations**.

Ce point de vue basé sur la symétrie a profondément transformé les mathématiques et la physique. Il a montré que les différentes géométries ne sont pas des mondes séparés, mais font partie d'une structure hiérarchique unifiée.

## 1. Le Principe Fondamental de Klein

L'idée centrale du Programme d'Erlangen est d'une simplicité et d'une puissance remarquables.

> **Principe du Programme d'Erlangen** :
> Une **géométrie** est l'étude des propriétés d'un espace *X* qui sont laissées **invariantes** par un groupe de transformations *G* agissant sur cet espace.
> **Géométrie = (Espace, Groupe)**

Cela signifie que pour définir une géométrie, il faut spécifier deux choses : un **espace** (l'ensemble des "points") et un **groupe de transformations** (les "mouvements" autorisés). Les théorèmes d'une géométrie donnée sont alors des énoncés sur les propriétés qui ne changent pas lorsqu'on applique ces transformations.

**Exemple : la géométrie euclidienne**
- **Espace** : Le plan ℝ².
- **Groupe** : Le groupe des **isométries** (translations, rotations, réflexions).
- **Invariants** : Les propriétés qui ne changent pas après une isométrie sont les **distances**, les **angles**, les **aires**. Le concept de "congruence" (deux triangles sont congruents s'ils ont les mêmes longueurs de côtés et les mêmes angles) est au cœur de la géométrie euclidienne.

## 2. La Hiérarchie des Géométries

Le Programme d'Erlangen révèle une magnifique hiérarchie entre les géométries, basée sur l'inclusion des groupes de transformations. Si un groupe G₁ est un sous-groupe d'un groupe plus grand G₂, alors la géométrie de G₂ est plus "générale" ou "fondamentale" que celle de G₁, car elle a moins d'invariants.

La hiérarchie principale est la suivante :

**Topologie ⊃ Géométrie Projective ⊃ Géométrie Affine ⊃ Géométrie Euclidienne**

| Géométrie | Groupe de Transformations (G) | Invariants Clés | Propriétés Perdues (par rapport à la précédente) |
| :--- | :--- | :--- | :--- |
| **Euclidienne** | Isométries | Distances, angles, aires | - |
| **Affine** | Transformations affines | Parallélisme, rapports de longueurs sur des droites parallèles, milieux | Distances, angles |
| **Projective** | Transformations projectives (homographies) | Alignement, incidence, birapport | Parallélisme, rapports de longueurs |
| **Topologie** | Homéomorphismes | Connexité, compacité, nombre de trous | Alignement, birapport |

- **De l'Euclidien à l'Affine** : En géométrie affine, on s'autorise les transformations qui ne préservent pas les longueurs, comme les cisaillements (pensez à pousser un jeu de cartes). Un cercle peut devenir une ellipse, mais une ligne reste une ligne et les lignes parallèles restent parallèles.

- **De l'Affine au Projectif** : La géométrie projective est la géométrie de la perspective. Elle ajoute des "points à l'infini" où les droites parallèles se rencontrent. Une transformation projective peut envoyer des droites parallèles sur des droites sécantes. La seule chose qui survit est l'alignement et une quantité subtile appelée le **birapport** de quatre points alignés.

- **Du Projectif à la Topologie** : En topologie, on autorise toute déformation continue. Une ligne droite peut devenir une courbe sinueuse. Presque toute la structure géométrique est perdue, ne laissant que les propriétés les plus fondamentales de connexion et de forme globale.

## 3. Géométries de Klein

Le cadre du Programme d'Erlangen a conduit à la notion moderne de **géométrie de Klein**. Un espace *X* est dit **homogène** pour un groupe *G* si pour toute paire de points x, y dans *X*, il existe une transformation g dans *G* telle que g.x = y. Cela signifie que l'espace est "le même partout".

Une géométrie de Klein est un couple (G, H) où G est un groupe de Lie et H est un sous-groupe de Lie fermé de G. L'espace de la géométrie est l'**espace homogène** X = G/H (l'ensemble des classes à gauche). Le groupe de transformations est G agissant sur G/H.

**Exemples** :
- **Géométrie Euclidienne** : G est le groupe des isométries de ℝⁿ, H est le groupe des isométries fixant l'origine (le groupe orthogonal O(n)). L'espace G/H est ℝⁿ.
- **Géométrie Sphérique** : L'espace est la sphère Sⁿ. Le groupe G est SO(n+1) et H est le sous-groupe qui fixe un point (par exemple, le pôle Nord), qui est isomorphe à SO(n). L'espace est Sⁿ \cong SO(n+1)/SO(n).
- **Géométrie Hyperbolique** : L'espace est le plan hyperbolique ℍ². Le groupe G est PSL(2, ℝ) (le groupe des transformations de Möbius) et H est SO(2).

## Conclusion

Le Programme d'Erlangen a été un moment unificateur dans l'histoire des mathématiques. En définissant la géométrie par la symétrie, Klein a non seulement organisé le chaos apparent des géométries du XIXe siècle, mais il a aussi fourni un cadre incroyablement fécond qui continue d'influencer la recherche aujourd'hui. Cette idée que la structure d'un espace est dictée par son groupe de symétries est un principe directeur en physique théorique, où les symétries de l'espace-temps (groupe de Poincaré) et les symétries de jauge internes (groupes de Lie comme SU(3), SU(2), U(1)) déterminent les lois fondamentales de la nature.

Ce module conclut notre exploration de la théorie des groupes et de son lien avec la géométrie. Nous sommes maintenant équipés pour aborder des sujets où ces idées trouvent des applications directes, de la complexité algorithmique à la physique des particules.

---

## Références

[1] Klein, F. (1872). *Vergleichende Betrachtungen über neuere geometrische Forschungen* (A comparative review of recent researches in geometry).
[2] Sharpe, R. W. (1997). *Differential Geometry: Cartan's Generalization of Klein's Erlangen Program*. Springer.
[3] Thurston, W. P. (1997). *Three-Dimensional Geometry and Topology*. Princeton University Press.

