# Module 2.1 : Géométrie Différentielle des Courbes et Surfaces

**Auteur** : Manus AI  
**Date** : 12 Octobre 2025

## Introduction : La Géométrie de notre Monde

Après avoir établi le cadre abstrait des variétés, nous revenons à des objets plus intuitifs : les courbes et les surfaces, principalement dans l'espace euclidien ℝ³. C'est le berceau historique de la géométrie différentielle. L'étude de ces objets nous permet de développer des outils fondamentaux pour quantifier la "courbure" et la forme, outils que nous généraliserons ensuite aux variétés de dimensions supérieures.

Comment mesurer la "tortuosité" d'une courbe ? Comment définir la courbure d'une surface en un point ? Est-ce une propriété intrinsèque à la surface, ou dépend-elle de la façon dont la surface est plongée dans l'espace ? Ce module répond à ces questions en introduisant les concepts de courbure, de torsion, et les deux formes fondamentales d'une surface.

---

## 1. Géométrie des Courbes dans ℝ³

Une courbe est une variété de dimension 1. Nous étudions des courbes paramétrées, c'est-à-dire des applications :

```latex
\gamma : I \to \mathbb{R}^3
````

d'un intervalle *I* de ℝ.

### Paramétrage par longueur d'arc

Pour simplifier l'étude, on préfère paramétrer une courbe par sa propre longueur, comme si on la parcourait à vitesse constante égale à 1.
C'est le **paramétrage par longueur d'arc**.
Dans ce cas, le vecteur vitesse (tangent) `γ'(s)` est toujours de norme 1.

### Courbure et Torsion : Le Repère de Frenet

Pour une courbe `γ(s)` paramétrée par longueur d'arc, on peut construire en chaque point un repère orthonormé mobile, le **repère de Frenet-Serret**, qui décrit la géométrie locale de la courbe :

1. **Vecteur Tangent (T)**

   ```latex
   T(s) = \gamma'(s)
   ```

   Il indique la direction de la courbe.

2. **Vecteur Normal (N)**

   ```latex
   N(s) = \frac{T'(s)}{\|T'(s)\|}
   ```

   Il indique la direction dans laquelle la courbe tourne.

3. **Vecteur Binormal (B)**

   ```latex
   B(s) = T(s) \times N(s)
   ```

   Il est orthogonal au plan osculateur (le plan qui contient *T* et *N*).

Les variations de ce repère le long de la courbe sont décrites par les **formules de Frenet-Serret** et font apparaître deux fonctions fondamentales :

* **Courbure (κ)**

  ```latex
  \kappa(s) = \|T'(s)\|
  ```

  Elle mesure la vitesse à laquelle la courbe s'écarte de sa ligne tangente.
  Une courbure nulle correspond à une droite. Une courbure constante correspond à un cercle.

* **Torsion (τ)**

  ```latex
  \tau(s) = -\langle B'(s), N(s)\rangle
  ```

  Elle mesure la vitesse à laquelle la courbe s'écarte de son plan osculateur.
  Une torsion nulle signifie que la courbe est plane.

> **Théorème Fondamental des Courbes**
> Deux courbes ayant la même courbure `κ(s) > 0` et la même torsion `τ(s)` en fonction de la longueur d'arc *s* sont identiques, à un déplacement et une rotation près (une isométrie de ℝ³).

Cela signifie que la courbure et la torsion caractérisent **entièrement** la forme locale d'une courbe.

---

## 2. Géométrie des Surfaces dans ℝ³

Une surface est une variété de dimension 2.
Pour l'étudier, on utilise des cartes locales :

```latex
\sigma : U \subset \mathbb{R}^2 \to S \subset \mathbb{R}^3
```

### La Première Forme Fondamentale : La Métrique Intrinsèque

La **première forme fondamentale**, notée *I*, est simplement la restriction du produit scalaire de ℝ³ à l'espace tangent de la surface.
Elle nous permet de mesurer des longueurs, des angles et des aires **sur la surface**.

Dans une base de coordonnées locales *(u, v)*, elle est représentée par une matrice 2×2 symétrique :

```latex
I = (g_{ij}) =
\begin{pmatrix}
\langle \sigma_u, \sigma_u \rangle & \langle \sigma_u, \sigma_v \rangle \\
\langle \sigma_v, \sigma_u \rangle & \langle \sigma_v, \sigma_v \rangle
\end{pmatrix}
```

Où `σ_u` et `σ_v` sont les vecteurs dérivés partiels de la paramétrisation.
La première forme fondamentale définit la **métrique riemannienne** induite sur la surface.
C'est une propriété **intrinsèque** : un habitant bidimensionnel de la surface pourrait la mesurer sans avoir connaissance de l'espace ambiant ℝ³.

---

### La Seconde Forme Fondamentale : La Courbure Extrinsèque

La **seconde forme fondamentale**, notée *II*, décrit comment la surface se courbe **dans l'espace ambiant ℝ³**.
Elle mesure la variation du vecteur normal à la surface.

Soit *n(p)* un champ de vecteurs normaux unitaires à la surface.
L'**application de Weingarten** (ou opérateur de forme) *Sₚ* est un endomorphisme de l'espace tangent *TₚS* qui mesure la dérivée du champ normal :

```latex
S_p(v) = -\nabla_v n
```

La seconde forme fondamentale est alors la forme bilinéaire :

```latex
II(v, w) = \langle S_p(v), w \rangle
```

---

## 3. Courbures d'une Surface

L'opérateur de forme *Sₚ* est auto-adjoint, il possède donc deux valeurs propres réelles *k₁* et *k₂*, appelées **courbures principales**.
Elles représentent les courbures maximale et minimale de la surface au point *p*.

À partir de ces courbures principales, on définit deux quantités scalaires fondamentales :

> **Définition : Courbure Gaussienne et Courbure Moyenne**
>
> 1. **Courbure Gaussienne (K)**
>
>    ```latex
>    K = k_1 \, k_2 = \det(S_p)
>    ```
> 2. **Courbure Moyenne (H)**
>
>    ```latex
>    H = \frac{k_1 + k_2}{2} = \tfrac{1}{2} \mathrm{tr}(S_p)
>    ```

| Type de Point    | Courbure Gaussienne (K) | Forme Locale de la Surface                                      |
| :--------------- | :---------------------- | :-------------------------------------------------------------- |
| **Elliptique**   | K > 0                   | Convexe, comme une sphère (k₁ et k₂ de même signe).             |
| **Hyperbolique** | K < 0                   | Forme de "selle de cheval" (k₁ et k₂ de signes opposés).        |
| **Parabolique**  | K = 0                   | Courbe dans une seule direction, plate dans l'autre (cylindre). |

---

### *Theorema Egregium* de Gauss

> **Theorema Egregium**
> La courbure gaussienne *K* d'une surface ne dépend que de sa première forme fondamentale.
> C'est une quantité **intrinsèque**.

Ce théorème est stupéfiant.
Il signifie qu'un être vivant sur la surface (comme dans le livre *Flatland*) pourrait mesurer la courbure de son univers en faisant des mesures de distances et d'angles, sans jamais avoir à "sortir" pour voir comment la surface est courbée dans l'espace.

Par exemple, il pourrait mesurer la somme des angles d'un triangle :

* Sur une surface à courbure positive (sphère), la somme est > 180°.
* Sur une surface à courbure négative (hyperbolique), elle est < 180°.

La courbure moyenne *H*, en revanche, est **extrinsèque**.
Elle dépend de la façon dont la surface est plongée dans l'espace.
Les **surfaces minimales** (comme les films de savon) sont celles dont la courbure moyenne est nulle partout (*H = 0*).

---

## Conclusion

L'étude des courbes et des surfaces nous a permis de développer un formalisme précis pour la notion de courbure.
Nous avons découvert une distinction fondamentale entre les propriétés **intrinsèques** (qui ne dépendent que de la métrique de la surface elle-même, comme la courbure gaussienne) et les propriétés **extrinsèques** (qui dépendent de son plongement dans l'espace, comme la courbure moyenne).

Le *Theorema Egregium* de Gauss est la première indication d'une idée beaucoup plus profonde qui sera au cœur du prochain module : la géométrie et la courbure peuvent être étudiées de manière totalement **intrinsèque** sur une variété, sans référence à un espace ambiant.
C'est la naissance de la **géométrie riemannienne**.

---

## Références

[1] do Carmo, M. P. (1976). *Differential Geometry of Curves and Surfaces*. Prentice-Hall.
[2] Pressley, A. (2010). *Elementary Differential Geometry*. Springer.
[3] Gauss, C. F. (1828). *Disquisitiones generales circa superficies curvas* (*Recherches générales sur les surfaces courbes*).


