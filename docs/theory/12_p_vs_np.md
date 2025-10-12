## Module 4.2 : P vs NP et la NP-Complétude

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : La Question à un Million de Dollars

Au cœur de l'informatique théorique se trouve une question simple à énoncer, mais dont la réponse nous échappe depuis plus de 50 ans : **P = NP ?**

Cette question, l'un des sept "Problèmes du prix du millénaire" du Clay Mathematics Institute, demande essentiellement si les problèmes pour lesquels une solution est facile à *vérifier* sont aussi des problèmes faciles à *résoudre*. Si la réponse était "oui", cela aurait des conséquences cataclysmiques pour la science, la technologie, l'économie et la sécurité. La plupart des systèmes cryptographiques qui protègent nos données deviendraient instantanément obsolètes. Des problèmes d'optimisation monstrueux dans la logistique, la biologie ou l'ingénierie pourraient soudainement être résolus efficacement.

Pour aborder cette question, la théorie de la complexité a développé un concept crucial : la **NP-complétude**. Les problèmes NP-complets sont les "problèmes les plus difficiles" de la classe NP. Ils sont tous interconnectés par des réductions polynomiales, formant une sorte de "noyau dur" de la difficulté calculatoire. Si un seul d'entre eux pouvait être résolu en temps polynomial, alors tous les problèmes NP le pourraient, et P serait égal à NP.

Ce module plonge au cœur de ce mystère, en définissant formellement le problème P vs NP et en explorant le monde fascinant des problèmes NP-complets.

## 1. Le Problème P versus NP

Nous avons défini les classes P et NP :
- **P** : Problèmes de décision résolubles en temps polynomial par une machine déterministe (faciles à résoudre).
- **NP** : Problèmes de décision dont une solution peut être vérifiée en temps polynomial par une machine déterministe (faciles à vérifier).

La relation **P \subseteq NP** est évidente. Si un problème est facile à résoudre, il est aussi facile à vérifier (il suffit de le résoudre et de voir si la réponse est "oui").

La grande question est l'inclusion inverse : **NP \subseteq P ?**

> **La Question P vs NP** :
> Est-ce que tout problème dont la solution peut être vérifiée rapidement peut aussi être résolu rapidement ?

- Si **P = NP**, alors les deux classes sont identiques. La distinction entre "facile à résoudre" et "facile à vérifier" s'effondre.
- Si **P \ne NP**, ce qui est l'hypothèse la plus largement acceptée, alors il existe des problèmes dans NP qui sont intrinsèquement plus difficiles à résoudre qu'à vérifier. Ces problèmes ne peuvent pas être résolus en temps polynomial par un algorithme déterministe.

## 2. NP-Difficulté et NP-Complétude

Pour comprendre la structure de la classe NP, on introduit deux concepts liés.

> **Définition : NP-Difficile (NP-hard)**
> Un problème H est dit **NP-difficile** si tout problème L de la classe NP se réduit en temps polynomial à H (L \le_p H). 

Cela signifie qu'un problème NP-difficile est **au moins aussi difficile** que n'importe quel problème dans NP. Il n'est pas nécessairement *dans* NP lui-même (il pourrait être encore plus difficile, ou ne pas être un problème de décision).

> **Définition : NP-Complet**
> Un problème C est dit **NP-complet** s'il satisfait deux conditions :
> 1.  **C est dans NP** (il est facile à vérifier).
> 2.  **C est NP-difficile** (il est au moins aussi difficile que tout problème dans NP).

Les problèmes NP-complets sont donc les "problèmes les plus difficiles de NP". Ils sont à la frontière de la difficulté calculatoire. Si l'on trouvait un algorithme polynomial pour un seul problème NP-complet, alors, par la magie des réductions, on en aurait un pour tous les problèmes de NP, et on aurait prouvé que P = NP.

## 3. Le Théorème de Cook-Levin : La Pierre de Rosette

Comment prouver qu'un problème est NP-complet ? Pour le premier, il a fallu une percée monumentale.

> **Théorème de Cook-Levin (1971)** :
> Le problème de la **satisfiabilité booléenne (SAT)** est NP-complet.

**SAT** est le problème suivant : étant donné une formule logique booléenne, existe-t-il une assignation de valeurs VRAI/FAUX à ses variables qui rend la formule entière VRAI ?

La preuve de Cook et Levin est une "preuve de concept". Ils ont montré que l'on peut construire, pour n'importe quel problème dans NP et n'importe quelle entrée, une formule SAT qui simule le calcul de la machine de Turing non-déterministe correspondante. La formule est satisfiable si et seulement si la machine accepte l'entrée. Cette réduction prouve que SAT est NP-difficile. Comme SAT est aussi dans NP (il est facile de vérifier une assignation donnée), il est NP-complet.

Le théorème de Cook-Levin a fourni le "patient zéro" de la NP-complétude. Pour prouver qu'un nouveau problème B est NP-complet, il n'est plus nécessaire de repartir de zéro. Il suffit de :
1.  Montrer que B est dans NP.
2.  Prendre un problème A déjà connu comme étant NP-complet (comme SAT) et montrer que **A \le_p B**.

## 4. Un Zoo de Problèmes NP-Complets

Depuis 1971, des milliers de problèmes fondamentaux dans tous les domaines de la science et de l'ingénierie ont été prouvés NP-complets. Ils sont tous, d'un point de vue calculatoire, "le même problème" déguisé.

- **3-SAT** : Une version restreinte de SAT où la formule est une conjonction de clauses de 3 littéraux. C'est souvent le point de départ le plus pratique pour les réductions.

- **Problèmes sur les Graphes** :
    - **CLIQUE** : Un graphe G contient-il une clique (un sous-graphe complet) de taille k ?
    - **VERTEX COVER** (Couverture par sommets) : Existe-t-il un sous-ensemble de k sommets tel que chaque arête du graphe est incidente à au moins un de ces sommets ?
    - **HAMILTONIAN CYCLE** (Cycle Hamiltonien) : Existe-t-il un cycle qui visite chaque sommet exactement une fois ?
    - **GRAPH COLORING** (Coloration de graphe) : Peut-on colorier les sommets d'un graphe avec k couleurs sans que deux sommets adjacents aient la même couleur ?

- **Problèmes d'Optimisation et de Logistique** :
    - **TRAVELING SALESPERSON PROBLEM (TSP)** (Voyageur de commerce) : Existe-t-il un tour de toutes les villes dont la longueur totale est inférieure à k ?
    - **KNAPSACK** (Sac à dos) : Peut-on choisir des objets parmi un ensemble pour remplir un sac à dos (de capacité limitée) de manière à ce que la valeur totale des objets dépasse k ?

## Conclusion

La théorie de la NP-complétude est l'un des outils les plus puissants de l'informatique. Elle nous permet de reconnaître la difficulté inhérente d'un problème. Face à un problème NP-complet, il est très probable qu'une solution générale et efficace n'existe pas. Plutôt que de chercher en vain un tel algorithme, nous devons changer notre approche.

Cela ne signifie pas que tout est perdu. Le prochain module explorera les stratégies pour faire face à la NP-complétude : les **algorithmes d'approximation**, qui cherchent des solutions "assez bonnes" mais pas nécessairement optimales ; les **heuristiques**, qui fonctionnent bien en pratique sur de nombreux cas mais sans garantie théorique ; et les algorithmes pour des cas particuliers.

La question P vs NP reste ouverte, mais la théorie qu'elle a engendrée a profondément structuré notre compréhension du calcul et de ses limites.

---

## Références

[1] Cook, S. A. (1971). *The complexity of theorem-proving procedures*. Proceedings of the third annual ACM symposium on Theory of computing.
[2] Karp, R. M. (1972). *Reducibility among combinatorial problems*. In Complexity of computer computations. Springer.
[3] Garey, M. R., & Johnson, D. S. (1979). *Computers and Intractability: A Guide to the Theory of NP-Completeness*. W. H. Freeman.

