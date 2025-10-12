## Module 3.3 : Algèbres de Lie - La Structure Infinitésimale

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Linéariser la Symétrie

Les groupes de Lie, bien que puissants, sont des objets non linéaires et souvent complexes à manipuler directement. L'idée géniale de Sophus Lie à la fin du XIXe siècle fut de les étudier à travers leur **approximation linéaire** au voisinage de l'élément identité. Cette approximation linéaire n'est pas juste un espace vectoriel ; elle possède une structure algébrique supplémentaire, un "produit" non associatif appelé le **crochet de Lie**. Cette nouvelle structure est une **algèbre de Lie**.

L'étude des algèbres de Lie est considérablement plus simple que celle des groupes de Lie, car elle relève de l'algèbre linéaire plutôt que de la géométrie différentielle. Pourtant, une grande partie de la structure du groupe de Lie est encodée dans son algèbre de Lie. La correspondance entre groupes de Lie et algèbres de Lie est l'un des thèmes les plus profonds et les plus fructueux des mathématiques, avec des applications fondamentales en physique quantique, où les algèbres de Lie représentent les observables physiques.

Ce module explore cette relation, en montrant comment l'algèbre de Lie capture l'essence "infinitésimale" d'un groupe de symétrie continue.

## 1. Définition d'une Algèbre de Lie

Une algèbre de Lie est avant tout un espace vectoriel, muni d'une opération spéciale.

> **Définition : Algèbre de Lie**
> Une **algèbre de Lie** est un espace vectoriel **g** sur un corps K (généralement ℝ ou ℂ), doté d'une application bilinéaire [\cdot, \cdot] : **g** \times **g** \to **g**, appelée le **crochet de Lie**, qui satisfait deux axiomes :
> 1.  **Antisymétrie** : Pour tous X, Y dans **g**, [X, Y] = -[Y, X].
> 2.  **Identité de Jacobi** : Pour tous X, Y, Z dans **g**, [X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0.

**Remarques importantes** :
- Le crochet de Lie n'est **pas associatif** en général. L'identité de Jacobi remplace la condition d'associativité.
- L'antisymétrie implique que [X, X] = 0 pour tout X.

**Exemple le plus important** : Pour les algèbres de Lie matricielles, le crochet de Lie est simplement le **commutateur** de matrices :

**[A, B] = AB - BA**

Il est facile de vérifier que le commutateur est antisymétrique et satisfait l'identité de Jacobi.

## 2. L'Algèbre de Lie d'un Groupe de Lie

Le lien fondamental entre un groupe de Lie G et son algèbre de Lie **g** est le suivant :

> **L'algèbre de Lie est l'espace tangent à l'identité.**
> **g** = T_eG

Les éléments de l'algèbre de Lie peuvent être vus comme des "générateurs infinitésimaux" des transformations du groupe. Si l'on pense à une courbe g(t) dans le groupe de Lie passant par l'identité à t=0 (g(0)=e), alors son vecteur vitesse à t=0, g'(0), est un élément de l'algèbre de Lie **g**.

Le crochet de Lie [X, Y] de deux éléments de l'algèbre de Lie mesure géométriquement le défaut de commutation des flots générés par X et Y sur la variété.

| Groupe de Lie (G) | Algèbre de Lie (**g** = T_eG) | Description de **g** | Dimension |
| :--- | :--- | :--- | :--- |
| **GL(n, ℝ)** | **gl(n, ℝ)** | Toutes les matrices réelles n\timesn | n² |
| **SL(n, ℝ)** | **sl(n, ℝ)** | Matrices réelles n\timesn de trace nulle | n²-1 |
| **O(n), SO(n)** | **so(n)** | Matrices réelles n\timesn antisymétriques (Aᵀ = -A) | n(n-1)/2 |
| **U(n)** | **u(n)** | Matrices complexes n\timesn anti-hermitiennes (A† = -A) | n² |
| **SU(n)** | **su(n)** | Matrices complexes n\timesn anti-hermitiennes de trace nulle | n²-1 |

**Exemple : SO(3) et so(3)**
Le groupe des rotations SO(3) a pour algèbre de Lie **so(3)**, l'espace des matrices 3x3 antisymétriques. Une telle matrice s'écrit `[[0, -z, y], [z, 0, -x], [-y, x, 0]]`. On voit qu'elle est déterminée par 3 paramètres (x, y, z). Ainsi, **so(3)** est un espace vectoriel de dimension 3, tout comme ℝ³. L'isomorphisme entre **so(3)** et ℝ³ est tel que le crochet de Lie dans **so(3)** correspond au **produit vectoriel** dans ℝ³.

## 3. La Correspondance Groupe-Algèbre

La connexion entre un groupe de Lie et son algèbre de Lie est réalisée par l'**application exponentielle**.

- **exp : g \to G**

Cette application envoie un vecteur de l'espace tangent (l'algèbre) vers un point du groupe. Elle "intègre" une transformation infinitésimale pour obtenir une transformation finie.

**Théorèmes de Lie** : Une série de théorèmes profonds établit une correspondance quasi-parfaite entre les algèbres de Lie et les groupes de Lie (connexes et simplement connexes).

- **Premier théorème de Lie** : Chaque groupe de Lie a une algèbre de Lie unique.
- **Deuxième théorème de Lie** : Chaque homomorphisme de groupes de Lie induit un homomorphisme d'algèbres de Lie.
- **Troisième théorème de Lie** : Chaque algèbre de Lie de dimension finie est l'algèbre de Lie d'un groupe de Lie.

Cela signifie que l'on peut étudier la structure locale des groupes de Lie et leurs relations en étudiant les algèbres de Lie et leurs homomorphismes, ce qui est un problème d'algèbre linéaire beaucoup plus simple.

## 4. Représentations

En physique, les symétries ne sont pas des objets abstraits ; elles agissent sur des espaces d'états (par exemple, l'espace de Hilbert en mécanique quantique). Une **représentation** d'un groupe ou d'une algèbre de Lie est une manière de la faire agir sur un espace vectoriel.

> **Définition : Représentation**
> Une **représentation** d'un groupe de Lie G sur un espace vectoriel V est un homomorphisme de groupe de Lie \rho: G \to GL(V).
> Une **représentation** d'une algèbre de Lie **g** sur V est un homomorphisme d'algèbre de Lie \pi: **g** \to **gl(V)** (où **gl(V)** est l'algèbre de Lie des endomorphismes de V avec le commutateur).

L'étude des représentations est cruciale. En mécanique quantique, les représentations irréductibles de groupes de symétrie (comme SU(2) pour le spin, ou SU(3) pour les quarks) classifient les types de particules possibles.

## 5. Classification des Algèbres de Lie Simples

Les algèbres de Lie peuvent être décomposées en briques élémentaires, les **algèbres de Lie simples**. La classification complète de toutes les algèbres de Lie simples (complexes, de dimension finie) est l'un des grands succès des mathématiques. Elle a été achevée par Élie Cartan et Wilhelm Killing.

Le résultat est que toute algèbre de Lie simple appartient à l'une des quatre familles infinies (les **algèbres classiques** A_n, B_n, C_n, D_n, qui correspondent à sl(n+1), so(2n+1), sp(2n), so(2n)) ou est l'une des cinq **algèbres exceptionnelles** (G₂, F₄, E₆, E₇, E₈).

Cette classification est magnifiquement encodée dans des objets combinatoires appelés **diagrammes de Dynkin**.

## Conclusion

L'algèbre de Lie est la "dérivée" d'un groupe de Lie à l'identité. Elle capture la structure infinitésimale du groupe dans un objet purement linéaire, l'espace vectoriel, enrichi du crochet de Lie. Cette linéarisation est une simplification spectaculaire qui permet d'utiliser les outils de l'algèbre linéaire pour comprendre les symétries continues. La correspondance profonde entre groupes et algèbres de Lie est un pilier de la physique théorique, où les générateurs des algèbres de Lie correspondent aux quantités conservées (via le théorème de Noether) et où leurs représentations classifient les particules fondamentales.

---

## Références

[1] Hall, B. C. (2015). *Lie Groups, Lie Algebras, and Representations: An Elementary Introduction*. Springer.
[2] Humphreys, J. E. (1972). *Introduction to Lie Algebras and Representation Theory*. Springer.
[3] Fulton, W., & Harris, J. (1991). *Representation Theory: A First Course*. Springer.

