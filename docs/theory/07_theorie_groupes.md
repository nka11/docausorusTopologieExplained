## Module 3.1 : Théorie des Groupes - Le Langage de la Symétrie

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Qu'est-ce que la Symétrie ?

La symétrie est une idée qui imprègne la nature, l'art et la science. Intuitivement, nous reconnaissons la symétrie d'un flocon de neige, d'un visage humain ou d'une équation physique. Mais comment pouvons-nous formaliser cette notion ? La **théorie des groupes** est la réponse mathématique à cette question. C'est le langage qui permet de décrire et d'analyser la symétrie de manière rigoureuse.

Un **groupe** est un ensemble d'opérations (ou de transformations) qui laissent un objet inchangé. Pensez aux rotations qui laissent un carré superposé à lui-même. On peut composer ces opérations, les inverser, et il y a toujours une opération "ne rien faire". Ces simples règles sont capturées dans la structure de groupe.

Ce module sert de fondation pour l'étude des **groupes de Lie**, qui sont des groupes de symétries *continues*. Comprendre la structure des groupes finis et discrets est une étape essentielle avant d'aborder la richesse des symétries continues qui sont omniprésentes en physique, de la mécanique quantique à la théorie des cordes.

## 1. Définition Axiomatique d'un Groupe

Un groupe est une structure algébrique simple mais profonde.

> **Définition : Groupe**
> Un **groupe** est un couple (G, *) où G est un ensemble et * est une loi de composition interne (une opération qui combine deux éléments de G pour en donner un troisième) satisfaisant les quatre axiomes suivants :
> 1.  **Clôture** : Pour tous a, b dans G, le résultat a * b est aussi dans G.
> 2.  **Associativité** : Pour tous a, b, c dans G, on a (a * b) * c = a * (b * c).
> 3.  **Élément neutre** : Il existe un élément e dans G tel que pour tout a dans G, on a e * a = a * e = a.
> 4.  **Élément inverse** : Pour chaque a dans G, il existe un élément a⁻¹ dans G tel que a * a⁻¹ = a⁻¹ * a = e.

Si, de plus, l'opération est commutative (a * b = b * a pour tous a, b), le groupe est dit **abélien** ou **commutatif**.

## 2. Exemples Fondamentaux de Groupes

- **Groupes Numériques** :
    - **(ℤ, +)** : Les entiers avec l'addition. Le neutre est 0, l'inverse de n est -n.
    - **(ℝ\{0}, \times)** : Les réels non nuls avec la multiplication. Le neutre est 1, l'inverse de x est 1/x.

- **Groupes de Permutations** :
    - Le **groupe symétrique S_n** est le groupe de toutes les bijections (permutations) d'un ensemble à n éléments. L'opération est la composition de fonctions. C'est un groupe non abélien pour n \ge 3.

- **Groupes de Symétries Géométriques** :
    - Le **groupe diédral D_n** est le groupe des symétries d'un polygone régulier à n côtés. Il contient n rotations et n réflexions.

- **Groupes de Matrices** :
    - **GL(n, ℝ)** : Le **groupe général linéaire**, groupe des matrices n\timesn inversibles à coefficients réels. C'est le groupe de toutes les transformations linéaires bijectives de ℝⁿ.
    - **SL(n, ℝ)** : Le **groupe spécial linéaire**, sous-groupe de GL(n, ℝ) des matrices de déterminant 1.

## 3. Sous-groupes, Homomorphismes et Groupes Quotients

- **Sous-groupe** : Un sous-ensemble H d'un groupe G qui est lui-même un groupe pour la même opération. Par exemple, les rotations d'un polygone forment un sous-groupe du groupe diédral.

- **Homomorphisme de groupe** : Une application f: G \to H entre deux groupes qui "respecte" la structure de groupe : f(a * b) = f(a) * f(b). Les homomorphismes sont les applications qui préservent la structure en théorie des groupes.
    - Un **isomorphisme** est un homomorphisme bijectif. Deux groupes isomorphes sont considérés comme "les mêmes" du point de vue de la théorie des groupes.

- **Groupe Quotient** : Si H est un type spécial de sous-groupe appelé **sous-groupe distingué** (ou normal), on peut construire un nouveau groupe, le **groupe quotient** G/H. Ses éléments sont les "classes" d'équivalence de G par rapport à H. Le groupe quotient capture la structure de G "modulo" la structure de H.

## 4. Actions de Groupe : La Symétrie en Action

Le concept d'**action de groupe** est la manière dont la théorie des groupes se connecte à la géométrie et à d'autres domaines. C'est la formalisation de l'idée qu'un groupe "agit" sur un ensemble en le transformant.

> **Définition : Action de Groupe**
> Une **action** d'un groupe G sur un ensemble X est une application G \times X \to X, notée (g, x) \mapsto g.x, telle que :
> 1.  e.x = x pour tout x \in X (l'identité agit trivialement).
> 2.  (g₁g₂).x = g₁.(g₂.x) pour tous g₁, g₂ \in G et x \in X (la composition est respectée).

**Exemples** :
- Le groupe des rotations SO(3) agit sur l'ensemble des points de la sphère S².
- Le groupe symétrique S_n agit sur l'ensemble \{1, 2, ..., n\}.

Deux concepts clés découlent des actions de groupe :
- **Orbite** : L'orbite d'un point x est l'ensemble de tous les points que x peut atteindre par l'action du groupe : Orb(x) = \{g.x | g \in G\}.
- **Stabilisateur** : Le stabilisateur d'un point x est le sous-groupe des éléments qui laissent x fixe : Stab(x) = \{g \in G | g.x = x\}.

Le **théorème orbite-stabilisateur** relie ces deux notions : |G| = |Orb(x)| \times |Stab(x)| pour les groupes finis.

## 5. Théorèmes de Sylow

Les théorèmes de Sylow sont des résultats fondamentaux sur la structure des groupes finis. Ils garantissent l'existence de sous-groupes d'un certain ordre (une puissance d'un nombre premier) et donnent des informations sur leur nombre et leurs relations.

## Conclusion

La théorie des groupes fournit un cadre puissant et unificateur pour l'étude de la symétrie. Les concepts de groupe, de sous-groupe, d'homomorphisme et d'action de groupe sont des outils fondamentaux qui transcendent les mathématiques et trouvent des applications profondes en physique, en chimie et en informatique. Ce module a établi le vocabulaire et les concepts de base. Nous sommes maintenant prêts à franchir une étape cruciale : combiner la structure rigide des groupes avec la structure souple des variétés différentielles pour introduire les **groupes de Lie**, les groupes de symétries continues qui sont au cœur de la physique moderne.

---

## Références

[1] Dummit, D. S., & Foote, R. M. (2003). *Abstract Algebra* (3rd ed.). Wiley.
[2] Artin, M. (2010). *Algebra* (2nd ed.). Pearson.
[3] Armstrong, M. A. (1988). *Groups and Symmetry*. Springer.

