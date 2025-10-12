## Module 3.2 : Groupes de Lie - La Symétrie Continue

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Quand la Géométrie Rencontre l'Algèbre

Nous avons exploré deux mondes : celui, souple et continu, des **variétés différentielles**, et celui, rigide et structuré, des **groupes**. Que se passe-t-il lorsque ces deux mondes fusionnent ? On obtient l'un des objets les plus puissants et les plus élégants des mathématiques modernes : le **groupe de Lie**.

Un groupe de Lie est un groupe qui est aussi une variété différentielle, où les opérations de groupe (multiplication et inversion) sont des applications lisses. Cette double nature lui confère une richesse extraordinaire. Il capture l'essence de la **symétrie continue**, un concept fondamental dans presque tous les domaines de la physique, de la mécanique classique aux théories de jauge du Modèle Standard.

Ce module introduit ces objets fascinants, en se concentrant sur les exemples les plus importants : les **groupes de Lie matriciels**. Nous verrons comment les outils de l'analyse (comme l'application exponentielle) peuvent être utilisés pour comprendre la structure de ces groupes de symétries.

## 1. Définition d'un Groupe de Lie

L'idée est de combiner les axiomes d'un groupe et la structure d'une variété différentielle de manière compatible.

> **Définition : Groupe de Lie**
> Un **groupe de Lie** est un ensemble G qui est à la fois :
> 1.  Un **groupe**.
> 2.  Une **variété différentielle lisse**.
> Et qui satisfait la condition de compatibilité que les applications de groupe :
> -   **Multiplication** : \mu: G \times G \to G, (g, h) \mapsto gh
> -   **Inversion** : i: G \to G, g \mapsto g⁻¹
> sont des applications **lisses** (infiniment différentiables).

Cette condition de lissité est cruciale. Elle garantit que la structure géométrique (la variété) et la structure algébrique (le groupe) interagissent de manière cohérente. On peut ainsi utiliser le calcul différentiel pour étudier les propriétés du groupe.

## 2. Les Groupes de Lie Matriciels : Des Exemples Concrets

La grande majorité des groupes de Lie importants peuvent être représentés comme des groupes de matrices. Ce sont des sous-groupes fermés du groupe général linéaire GL(n, ℂ).

- **Le Groupe Général Linéaire GL(n, ℝ)** : Le groupe de toutes les matrices n\timesn réelles inversibles. C'est un groupe de Lie car c'est un ouvert de l'espace de toutes les matrices M(n, ℝ) \cong ℝ^(n²). Sa dimension est n².

- **Le Groupe Spécial Linéaire SL(n, ℝ)** : Le sous-groupe de GL(n, ℝ) des matrices de déterminant 1. C'est une sous-variété de dimension n²-1.

- **Le Groupe Orthogonal O(n)** : Le groupe des matrices A telles que AᵀA = I. Il représente le groupe des **isométries** de ℝⁿ qui fixent l'origine (rotations et réflexions). C'est une variété compacte de dimension n(n-1)/2.

- **Le Groupe Spécial Orthogonal SO(n)** : Le sous-groupe de O(n) des matrices de déterminant 1. Il représente le groupe des **rotations** pures. SO(2) est le groupe des rotations du plan (isomorphe au cercle S¹). SO(3) est le groupe des rotations de l'espace, de dimension 3.

- **Le Groupe Unitaire U(n)** : Le groupe des matrices complexes n\timesn A telles que A†A = I (où A† est la transposée conjuguée). C'est le groupe des isométries de ℂⁿ. C'est une variété compacte de dimension n².

- **Le Groupe Spécial Unitaire SU(n)** : Le sous-groupe de U(n) des matrices de déterminant 1. C'est une variété compacte de dimension n²-1. SU(2) est intimement lié aux rotations et au spin en mécanique quantique ; il est difféomorphe à la sphère S³.

| Groupe | Description | Dimension | Compact ? |
| :--- | :--- | :--- | :--- |
| **GL(n, ℝ)** | Matrices réelles inversibles | n² | Non |
| **SL(n, ℝ)** | det(A) = 1 | n²-1 | Non |
| **SO(n)** | Rotations réelles | n(n-1)/2 | Oui |
| **SU(n)** | Rotations complexes (det=1) | n²-1 | Oui |

## 3. L'Application Exponentielle : Du Linéaire au Courbe

Comment passer de la structure linéaire de l'algèbre de Lie (que nous verrons au prochain module) à la structure courbe du groupe de Lie ? La clé est l'**application exponentielle de matrices**.

> **Définition : Exponentielle d'une Matrice**
> Pour une matrice carrée A, son exponentielle e^A ou exp(A) est définie par la série de Taylor, qui converge toujours :
> exp(A) = I + A + A²/2! + A³/3! + ...

L'application exponentielle a des propriétés remarquables :
- Elle envoie l'algèbre de Lie du groupe (son espace tangent à l'identité) dans le groupe lui-même.
- Pour de nombreuses matrices A, t \mapsto exp(tA) définit un **sous-groupe à un paramètre**, qui est un homomorphisme de (ℝ, +) dans G. C'est une géodésique passant par l'identité.

**Exemple** : Dans SO(2), une rotation d'angle \theta est donnée par la matrice R(\theta). Son algèbre de Lie so(2) est l'espace des matrices antisymétriques 2x2. L'exponentielle d'une telle matrice donne une rotation :

exp( [ 0 -\theta ; \theta 0 ] ) = [ cos(\theta) -sin(\theta) ; sin(\theta) cos(\theta) ] = R(\theta)

L'application exponentielle est un difféomorphisme local entre un voisinage de 0 dans l'algèbre de Lie et un voisinage de l'identité dans le groupe de Lie. Elle nous permet de "linéariser" le groupe pour l'étudier.

## 4. Symétries de l'Espace-Temps : Groupes de Lorentz et de Poincaré

Les groupes de Lie sont au cœur de la physique fondamentale car ils décrivent les symétries de l'espace-temps.

- **Groupe de Lorentz O(1, 3)** : C'est le groupe des isométries de l'espace-temps de Minkowski. Il laisse invariant l'intervalle d'espace-temps ds² = -c²dt² + dx² + dy² + dz². Il contient les rotations spatiales et les "boosts" (changements de référentiel inertiel). C'est un groupe de Lie non compact de dimension 6.

- **Groupe de Poincaré** : C'est le groupe de toutes les symétries de la relativité restreinte. Il est formé du groupe de Lorentz et des **translations** dans l'espace et le temps. C'est un groupe de Lie de dimension 10.

## Conclusion

Les groupes de Lie sont des objets d'une richesse et d'une importance exceptionnelles. Ils réalisent la synthèse parfaite entre l'algèbre et la géométrie, nous permettant d'utiliser les outils de l'analyse pour étudier les symétries continues. Presque toutes les théories fondamentales de la physique, de la relativité au modèle standard des particules, sont formulées en termes de symétries de groupe de Lie.

Cependant, la structure non linéaire d'un groupe de Lie peut être complexe. Le prochain module montrera comment simplifier radicalement cette étude en se concentrant sur son "approximation linéaire" : son **algèbre de Lie**. La relation profonde entre un groupe de Lie et son algèbre de Lie est l'un des plus beaux résultats des mathématiques du 20ème siècle.

---

## Références

[1] Hall, B. C. (2015). *Lie Groups, Lie Algebras, and Representations: An Elementary Introduction*. Springer.
[2] Rossmann, W. (2002). *Lie Groups: An Introduction Through Linear Groups*. Oxford University Press.
[3] Warner, F. W. (1983). *Foundations of Differentiable Manifolds and Lie Groups*. Springer.

