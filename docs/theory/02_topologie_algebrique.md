# Module 1.2 : Topologie Algébrique - Classifier les Formes

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : De la Forme à l'Algèbre

La topologie générale nous a donné les outils pour définir la notion de "forme" d'un espace de manière rigoureuse. Cependant, comment pouvons-nous déterminer si deux espaces sont homéomorphes ou non ? Comment pouvons-nous quantifier des caractéristiques intuitives comme les "trous", les "cavités" ou les "tunnels" ?

La **topologie algébrique** répond à ces questions en associant des objets algébriques, généralement des groupes, à des espaces topologiques. L'idée fondamentale est que si deux espaces sont topologiquement équivalents (homéomorphes), alors les objets algébriques qui leur sont associés doivent être isomorphes. Ces objets algébriques, appelés **invariants topologiques**, sont souvent plus simples à calculer et à comparer que les espaces eux-mêmes.

Ce module introduit deux des plus importants invariants topologiques : le **groupe fondamental**, qui capture l'information sur les boucles et les "trous 1D", et l'**homologie**, qui généralise cette idée à des dimensions supérieures.

## 1. Homotopie : La Notion de Déformation Continue

L'idée centrale de la topologie algébrique est la **déformation continue**. L'homotopie est la formalisation mathématique de ce concept.

> **Définition : Homotopie**
> Soient f et g deux applications continues d'un espace topologique X vers un espace Y, f, g: X \to Y. On dit que f est **homotope** à g (noté f ≃ g) s'il existe une application continue H: X \times [0, 1] \to Y telle que :
> - H(x, 0) = f(x) pour tout x \in X
> - H(x, 1) = g(x) pour tout x \in X

**Intuition** : L'application H est une "déformation continue" de la fonction f vers la fonction g. Le paramètre t \in [0, 1] peut être vu comme le "temps". À t=0, nous avons la fonction f. À mesure que t augmente, la fonction se déforme continûment pour devenir la fonction g à t=1.

Un cas particulièrement important est celui des **lacets** (ou boucles), qui sont des chemins fermés dans un espace. Deux lacets sont homotopes s'ils peuvent être déformés l'un en l'autre sans quitter l'espace et sans rompre la boucle.

## 2. Le Groupe Fondamental (\pi₁)

Le groupe fondamental est le premier et le plus important des groupes d'homotopie. Il capture la structure des "trous" unidimensionnels d'un espace en analysant les classes d'équivalence de lacets.

Considérons un espace topologique X et un point de base x₀ \in X. Un **lacet** basé en x₀ est une application continue \gamma: [0, 1] \to X telle que \gamma(0) = \gamma(1) = x₀.

On peut définir une "multiplication" de deux lacets \gamma₁ et \gamma₂ en les parcourant l'un après l'autre. L'ensemble des classes d'homotopie de lacets basés en x₀, muni de cette opération, forme un groupe.

> **Définition : Groupe Fondamental**
> Le **groupe fondamental** de X au point de base x₀, noté **\pi₁(X, x₀)**, est l'ensemble des classes d'homotopie de lacets basés en x₀, muni de la loi de composition [\gamma₁] * [\gamma₂] = [\gamma₁ ⋅ \gamma₂] (concaténation des chemins).

**Propriétés** :
- L'élément neutre est la classe du lacet constant (rester en x₀).
- L'inverse d'un lacet est le même lacet parcouru en sens inverse.
- Si l'espace X est connexe par arcs, le groupe fondamental est indépendant (à isomorphisme près) du choix du point de base x₀.

Un espace dont le groupe fondamental est trivial (réduit à l'élément neutre) est dit **simplement connexe**. Cela signifie que toute boucle peut être continûment rétrécie en un point.

| Espace | Groupe Fondamental (\pi₁) | Intuition |
| :--- | :--- | :--- |
| **Plan Euclidien (ℝ²)** | \{e\} (trivial) | Simplement connexe. Pas de trou pour "accrocher" un lacet. |
| **Sphère (S²)** | \{e\} (trivial) | Simplement connexe. Tout lacet peut glisser et se réduire à un point. |
| **Cercle (S¹)** | ℤ (groupe des entiers) | Un lacet est caractérisé par le nombre de tours qu'il fait autour du centre (entier positif ou négatif). |
| **Tore (T²)** | ℤ \times ℤ | Un lacet est caractérisé par deux nombres : le nombre de tours "horizontaux" et "verticaux". |

## 3. Homologie : Compter les Trous de Toutes Dimensions

Le groupe fondamental est excellent pour les trous 1D, mais il ne détecte pas les "cavités" de dimensions supérieures, comme le vide à l'intérieur d'une sphère. L'**homologie** est une théorie plus générale qui assigne une séquence de groupes abéliens H_n(X) à un espace X, où chaque H_n(X) détecte les "trous" de dimension n.

L'approche la plus intuitive est l'**homologie simpliciale**, qui s'applique aux espaces pouvant être décomposés en **complexes simpliciaux** (des points, des arêtes, des triangles, des tétraèdres, et leurs analogues en dimensions supérieures).

**Idées clés** :
- **Chaînes** : Des combinaisons formelles de simplexes de même dimension.
- **Opérateur de bord (\partial)** : Une application qui à un simplexe de dimension k associe la somme de ses faces de dimension (k-1).
- **Cycles** : Des chaînes dont le bord est nul (par exemple, un ensemble d'arêtes formant une boucle).
- **Bords** : Des chaînes qui sont elles-mêmes le bord de quelque chose de dimension supérieure.

Un fait crucial est que **le bord d'un bord est toujours nul (\partial ∘ \partial = 0)**. Cela implique que tout bord est un cycle.

> **Définition : Groupe d'Homologie**
> Le n-ième groupe d'homologie, H_n(X), est le groupe quotient des n-cycles par les n-bords :
> H_n(X) = Ker(\partial_n) / Im(\partial_\{n+1\})

**Intuition** : H_n(X) compte les "trous" de dimension n. Un cycle qui n'est pas un bord représente un trou. Par exemple, une boucle sur un tore (un 1-cycle) n'est pas le bord d'une surface 2D contenue dans le tore, elle entoure un trou.

## 4. Nombres de Betti et Caractéristique d'Euler

Les groupes d'homologie peuvent être compliqués. On les résume souvent par leur rang, appelé **nombre de Betti**.

> **Définition : Nombre de Betti**
> Le n-ième **nombre de Betti**, noté \beta_n, est le rang du n-ième groupe d'homologie H_n(X).

**Intuition** :
- **\beta₀** : Nombre de composantes connexes (trous de dimension 0).
- **\beta₁** : Nombre de trous "circulaires" ou "tunnels" (trous de dimension 1).
- **\beta₂** : Nombre de "vides" ou "cavités" (trous de dimension 2).

| Espace | \beta₀ | \beta₁ | \beta₂ |
| :--- | :- | :- | :- |
| **Point** | 1 | 0 | 0 |
| **Cercle (S¹)** | 1 | 1 | 0 |
| **Sphère (S²)** | 1 | 0 | 1 |
| **Tore (T²)** | 1 | 2 | 1 |
| **Bande de Möbius** | 1 | 1 | 0 |
| **Bouteille de Klein** | 1 | 1 | 0 |

La **caractéristique d'Euler**, un autre invariant topologique puissant, peut être calculée à partir des nombres de Betti :

\chi(X) = \beta₀ - \beta₁ + \beta₂ - \beta₃ + ...

Pour un polyèdre, elle se réduit à la célèbre formule d'Euler : **\chi = S - A + F** (Sommets - Arêtes + Faces).

## Conclusion

La topologie algébrique transforme des problèmes géométriques complexes en problèmes d'algèbre (souvent de l'algèbre linéaire). En calculant des invariants comme le groupe fondamental ou les nombres de Betti, nous pouvons prouver rigoureusement que deux espaces ne sont pas homéomorphes. Par exemple, comme le tore et la sphère ont des groupes d'homologie différents, nous savons qu'il est impossible de déformer l'un en l'autre. Ces outils seront essentiels pour comprendre la structure des variétés complexes en géométrie différentielle et en théorie des cordes, et ils forment la base théorique de l'analyse topologique des données (TDA).

---

## Références

[1] Hatcher, A. (2002). *Algebraic Topology*. Cambridge University Press. Disponible sur : [https://pi.math.cornell.edu/~hatcher/AT/AT.pdf](https://pi.math.cornell.edu/~hatcher/AT/AT.pdf)
[2] Munkres, J. R. (1984). *Elements of Algebraic Topology*. Addison-Wesley.
[3] Ghrist, R. (2014). *Elementary Applied Topology*. Createspace. Disponible sur : [https://www.math.upenn.edu/~ghrist/notes.html](https://www.math.upenn.edu/~ghrist/notes.html)

