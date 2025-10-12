## Module 2.2 : Géométrie Riemannienne - La Géométrie Intrinsèque

**Auteur** : Manus AI  
**Date** : 12 Octobre 2025

## Introduction : Libérer la Géométrie de l'Espace Ambiant

Le *Theorema Egregium* de Gauss nous a laissé une idée profonde : la courbure d'une surface peut être comprise de manière totalement **intrinsèque**, en utilisant uniquement des mesures effectuées *sur* la surface. Bernhard Riemann, dans sa leçon inaugurale de 1854, a généralisé cette idée à des espaces de dimension arbitraire. Et si l'espace lui-même était courbe ?

La **géométrie riemannienne** est l'étude des variétés différentielles munies d'une **métrique riemannienne**, qui est une règle pour mesurer la longueur des vecteurs tangents en chaque point. Cette structure, bien que simple, est incroyablement riche. Elle nous permet de définir de manière intrinsèque les notions de longueur de courbe, d'angle, de volume, et surtout, de **courbure**.

Cette théorie est le langage mathématique de la relativité générale d'Einstein, où la gravitation n'est plus une force mais la manifestation de la courbure de l'espace-temps. Elle est également fondamentale en apprentissage automatique (*manifold learning*), en robotique, et dans de nombreux autres domaines de la science et de l'ingénierie.

---

## 1. Le Tenseur Métrique : Mesurer sur une Variété

L'objet fondamental de la géométrie riemannienne est le **tenseur métrique**.

> **Définition : Métrique Riemannienne**  
> Une **métrique riemannienne** *g* sur une variété différentielle *M* est une application lisse qui assigne à chaque point *p ∈ M* un produit scalaire *gₚ* sur l'espace tangent *TₚM*.  
> Un produit scalaire est une forme bilinéaire symétrique définie positive.  
> Une variété munie d'une métrique riemannienne est appelée une **variété riemannienne** *(M, g)*.

**Intuition** : Le tenseur métrique est une sorte de "produit scalaire infinitésimal" qui varie de manière lisse d'un point à l'autre.  
Dans un système de coordonnées locales *(x¹, ..., xⁿ)*, la métrique est représentée par une matrice symétrique et définie positive :

```latex
g_{ij}(p) = g_p(∂/∂xⁱ, ∂/∂xʲ)
````

Cette matrice nous permet de calculer la longueur d'un vecteur tangent
*v = vⁱ ∂/∂xⁱ* comme :

```latex
‖v‖² = g_{ij} vⁱ vʲ
```

Une fois que nous pouvons mesurer la longueur des vecteurs, nous pouvons mesurer la longueur des courbes en intégrant la norme de leur vecteur vitesse :

```latex
Longueur(γ) = ∫ ‖γ'(t)‖ dt = ∫ √[ g_{ij}(γ(t)) γ'ⁱ(t) γ'ʲ(t) ] dt
```

---

## 2. La Connexion de Levi-Civita : Différentier sur une Variété

Sur une variété courbe, comment comparer des vecteurs tangents en des points différents ?
Comment définir la "dérivée" d'un champ de vecteurs ?
La réponse est donnée par une **connexion**, qui est une règle pour différentier les champs de vecteurs.

Le **théorème fondamental de la géométrie riemannienne** garantit qu'il existe une unique connexion, appelée **connexion de Levi-Civita** (ou connexion riemannienne), qui est compatible avec la métrique et sans torsion.

> **Définition : Dérivée Covariante**
> La connexion de Levi-Civita, notée ∇, définit la **dérivée covariante** ∇ₓY d'un champ de vecteurs *Y* dans la direction d'un champ de vecteurs *X*.
> Elle satisfait plusieurs propriétés :
>
> * **Compatibilité avec la métrique** :
>
>   ```latex
>   X⟨Y, Z⟩ = ⟨∇ₓY, Z⟩ + ⟨Y, ∇ₓZ⟩
>   ```
> * **Absence de torsion** :
>
>   ```latex
>   ∇ₓY - ∇ᵧX = [X, Y]
>   ```

En coordonnées locales, la connexion est encodée par les **symboles de Christoffel** Γᵏᵢⱼ, qui décrivent comment les vecteurs de base changent d'un point à l'autre.

---

## 3. Transport Parallèle et Géodésiques

* **Transport Parallèle** :
  La dérivée covariante nous permet de définir ce que signifie "transporter" un vecteur le long d'une courbe sans le "tourner".
  Un champ de vecteurs *V* est dit parallèle le long d'une courbe *γ* si :

  ```latex
  ∇_{γ'} V = 0
  ```

  Dans un espace courbe, le transport parallèle dépend du chemin suivi.

* **Géodésiques** :
  Une **géodésique** est une courbe qui transporte parallèlement son propre vecteur tangent :

  ```latex
  ∇_{γ'} γ' = 0
  ```

> **Principe Variationnel**
> Les géodésiques sont aussi les courbes qui réalisent localement le **plus court chemin** entre deux points.

**Exemples :**

* Dans l’espace euclidien, les géodésiques sont les lignes droites.
* Sur une sphère, les géodésiques sont les **grands cercles** (comme l’équateur).
* Sur un cylindre, les géodésiques sont les **hélices**.

---

## 4. La Courbure de Riemann : Le Cœur de la Géométrie Intrinsèque

> **Définition : Tenseur de Courbure de Riemann**
> Le **tenseur de courbure de Riemann** *R* est un tenseur qui mesure le défaut de commutation des dérivées covariantes secondes :
>
> ```latex
> R(X, Y)Z = ∇ₓ∇ᵧZ - ∇ᵧ∇ₓZ - ∇_{[X,Y]}Z
> ```

**Intuition :**

* *R* mesure l’échec du transport parallèle à être indépendant du chemin.
  Si l’on transporte un vecteur le long d’une petite boucle fermée, le vecteur qui revient n’est pas identique à celui de départ.
  Le tenseur de Riemann quantifie cette différence.
* Il mesure aussi la **déviation géodésique** : deux géodésiques qui partent parallèles vont-elles le rester, converger ou diverger ?
  La réponse est donnée par *R*.

Le tenseur de Riemann contient toute l’information sur la courbure intrinsèque de la variété.
Pour le simplifier, on effectue des **contractions** :

* **Tenseur de Ricci (Ric)** :
  Contraction du tenseur de Riemann, mesure la déformation des volumes.
  Une courbure de Ricci positive tend à faire **converger** les géodésiques.

* **Courbure Scalaire (R)** :
  Contraction du tenseur de Ricci — un nombre en chaque point donnant la moyenne de la courbure.

---

## Conclusion

La géométrie riemannienne généralise la géométrie euclidienne.
En postulant simplement l’existence d’une métrique en chaque point, nous avons pu reconstruire tout un univers de concepts géométriques — **connexion**, **géodésiques**, **courbure** — de manière totalement **intrinsèque**.

Cette vision est au cœur de la relativité générale, où la métrique de l’espace-temps est déterminée par la distribution de matière et d’énergie.
La géométrie riemannienne est ainsi devenue le langage de la **cosmologie** et de la **gravitation modernes**, tout en inspirant des applications contemporaines en **machine learning** et en **robotique**.

---

## Références

[1] do Carmo, M. P. (1992). *Riemannian Geometry*. Birkhäuser.
[2] Lee, J. M. (1997). *Riemannian Manifolds: An Introduction to Curvature*. Springer.
[3] Carroll, S. (2019). *Spacetime and Geometry: An Introduction to General Relativity*. Cambridge University Press.

