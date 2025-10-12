## Module 4.1 : Fondements de la Complexité Algorithmique

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Mesurer la Difficulté

Nous avons tous une notion intuitive de ce qu'est un problème "facile" et un problème "difficile". Trier une liste de 1000 noms est facile pour un ordinateur. Planifier l'itinéraire optimal pour un voyageur de commerce visitant 1000 villes est, en pratique, impossible. La **théorie de la complexité algorithmique** est la branche de l'informatique théorique qui donne un sens rigoureux à cette intuition. Elle ne se contente pas de demander *si* un problème peut être résolu par un algorithme, mais *quelles sont les ressources nécessaires* pour le résoudre.

Les ressources les plus couramment étudiées sont le **temps** (le nombre d'opérations élémentaires) et l'**espace** (la quantité de mémoire utilisée). En classifiant les problèmes en fonction des ressources requises pour les résoudre, la théorie de la complexité nous fournit une carte de l'univers des problèmes calculatoires, avec ses continents de problèmes "faciles" et ses vastes océans de problèmes apparemment intraitables.

Ce module introduit le modèle de calcul formel qui sous-tend cette théorie – la **machine de Turing** – et définit les classes de complexité fondamentales, préparant le terrain pour l'une des plus grandes questions ouvertes en mathématiques et en informatique : le problème **P vs NP**.

## 1. Le Modèle de Calcul : La Machine de Turing

Pour parler rigoureusement de la complexité d'un algorithme, nous avons besoin d'un modèle de calcul universel et précis. Le modèle standard est la **machine de Turing**, conçue par Alan Turing en 1936.

> **Description : Machine de Turing**
> Une machine de Turing est un modèle abstrait de calcul composé de :
> 1.  Un **ruban infini**, divisé en cellules, chacune pouvant contenir un symbole.
> 2.  Une **tête de lecture/écriture** qui peut lire le symbole sous elle, écrire un nouveau symbole, et se déplacer d'une case vers la gauche ou la droite.
> 3.  Un **ensemble fini d'états** internes.
> 4.  Une **table de transition** (le "programme") qui dicte, en fonction de l'état actuel et du symbole lu, quel symbole écrire, dans quel nouvel état passer, et dans quelle direction déplacer la tête.

Malgré sa simplicité, la **thèse de Church-Turing** postule que tout ce qui est calculable par un algorithme peut être calculé par une machine de Turing. C'est le modèle de "l'ordinateur" dans sa forme la plus pure.

- **Machine de Turing Déterministe (MTD)** : Pour chaque situation (état, symbole lu), il n'y a qu'une seule action possible. C'est le modèle d'un ordinateur classique.
- **Machine de Turing Non-déterministe (MTN)** : Pour une situation donnée, il peut y avoir plusieurs actions possibles. La machine explore "en parallèle" tous les choix possibles. On peut l'imaginer comme une machine qui a une chance extraordinaire et fait toujours le bon choix pour atteindre un état d'acceptation si c'est possible.

## 2. Mesurer les Ressources : Temps et Espace

La complexité d'un algorithme (implémenté sur une machine de Turing) est mesurée en fonction de la **taille de l'entrée**, notée *n*.

- **Complexité en Temps T(n)** : Le nombre maximal d'étapes (de transitions) que la machine effectue pour une entrée de taille *n* avant de s'arrêter.
- **Complexité en Espace S(n)** : Le nombre maximal de cellules du ruban visitées par la tête de lecture/écriture pour une entrée de taille *n*.

On s'intéresse principalement au comportement **asymptotique** de ces fonctions, en utilisant la notation "Grand O" (O(n), O(n²), O(2ⁿ), etc.).

## 3. Classes de Complexité

Une **classe de complexité** est un ensemble de problèmes qui peuvent être résolus avec une quantité donnée de ressources, sur un certain type de machine.

> **Définition : Classe P (Temps Polynomial)**
> La classe **P** contient tous les problèmes de décision qui peuvent être résolus par une **machine de Turing déterministe** en **temps polynomial** par rapport à la taille de l'entrée (c'est-à-dire en temps O(n^k) pour une constante k).

La classe P est souvent considérée comme la classe des problèmes "**efficacement solubles**" ou "**traitables**". La plupart des problèmes que nous résolvons au quotidien (tri, recherche, arithmétique) sont dans P.

> **Définition : Classe NP (Temps Polynomial Non-déterministe)**
> La classe **NP** contient tous les problèmes de décision qui peuvent être résolus par une **machine de Turing non-déterministe** en **temps polynomial**.

Une définition équivalente et plus intuitive est que NP est la classe des problèmes pour lesquels une solution candidate (un "certificat") peut être **vérifiée** en temps polynomial par une machine déterministe. Trouver la solution peut être difficile, mais la vérifier est facile.

| Classe | Machine | Ressource | Borne | Signification Intuitive |
| :--- | :--- | :--- | :--- | :--- |
| **P** | Déterministe | Temps | Polynomiale | Facile à **résoudre** |
| **NP** | Non-déterministe | Temps | Polynomiale | Facile à **vérifier** |

Il existe de nombreuses autres classes de complexité :
- **PSPACE** : Problèmes solubles en espace polynomial.
- **EXPTIME** : Problèmes solubles en temps exponentiel (O(2^(n^k))).

On connaît la hiérarchie suivante : **P \subseteq NP \subseteq PSPACE \subseteq EXPTIME**. On sait aussi que P \ne EXPTIME, donc au moins une de ces inclusions est stricte, mais on ne sait pas lesquelles.

## 4. Réductions : Comparer la Difficulté des Problèmes

Comment prouver qu'un problème est "difficile" ? L'outil principal est la **réduction**. Une réduction est une transformation d'un problème A en un autre problème B.

> **Définition : Réduction Polynomiale**
> On dit qu'un problème A se **réduit en temps polynomial** au problème B (noté A \le_p B) s'il existe un algorithme en temps polynomial qui transforme toute instance *x* de A en une instance *f(x)* de B, de telle sorte que *x* est une instance "oui" de A si et seulement si *f(x)* est une instance "oui" de B.

**Intuition** : Si A \le_p B, alors B est **au moins aussi difficile** que A. Si on avait une solution efficace pour B, on pourrait l'utiliser pour résoudre A efficacement (en transformant d'abord l'entrée, puis en utilisant le solveur pour B).

Ce concept est la clé pour définir la notion de "problème le plus difficile" dans une classe de complexité, ce qui nous mènera directement à la notion de **NP-complétude** dans le prochain module.

## Conclusion

La théorie de la complexité fournit un cadre formel pour classer les problèmes en fonction de leur difficulté inhérente. En utilisant les machines de Turing comme modèle de calcul et en mesurant les ressources en temps et en espace, nous avons défini les classes fondamentales P et NP. La classe P représente les problèmes traitables, tandis que NP représente les problèmes dont les solutions sont facilement vérifiables. La relation entre ces deux classes est au cœur du problème P vs NP.

L'outil de réduction nous permet de comparer la difficulté relative des problèmes. Armés de ces concepts, nous sommes maintenant prêts à aborder la question P vs NP de front et à comprendre ce que signifie pour un problème d'être "le plus difficile" de la classe NP.

---

## Références

[1] Sipser, M. (2012). *Introduction to the Theory of Computation*. Cengage Learning.
[2] Arora, S., & Barak, B. (2009). *Computational Complexity: A Modern Approach*. Cambridge University Press.
[3] Papadimitriou, C. H. (1994). *Computational Complexity*. Addison-Wesley.

