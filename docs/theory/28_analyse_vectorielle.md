---
sidebar_position: 28
title: Analyse Vectorielle
---

# Analyse Vectorielle : Div, Grad, Curl et Champs Vectoriels

L'analyse vectorielle est un domaine fondamental des mathématiques qui étudie les champs vectoriels et les opérateurs différentiels. Ces concepts sont essentiels en physique, particulièrement en électromagnétisme, mécanique des fluides et relativité générale.

## Champs Vectoriels

### Définition

Un **champ vectoriel** sur un domaine $D \subset \mathbb{R}^n$ est une fonction :
$$F: D \to \mathbb{R}^n$$
$$(x_1, x_2, \ldots, x_n) \mapsto (F_1(x), F_2(x), \ldots, F_n(x))$$

### Exemples Classiques

1. **Champ gravitationnel** : $F(x,y,z) = -\frac{GM}{r^3}(x,y,z)$ où $r = \sqrt{x^2 + y^2 + z^2}$

2. **Champ électrique** : $E(x,y,z) = \frac{kQ}{r^3}(x,y,z)$

3. **Champ de rotation** : $F(x,y) = (-y, x)$

## Opérateurs Différentiels Fondamentaux

### 1. Gradient (Grad)

Le **gradient** d'une fonction scalaire $f: \mathbb{R}^n \to \mathbb{R}$ est défini par :

```
∇f = (∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ)
```

En coordonnées cartésiennes 3D :
```
∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)
```

#### Propriétés du Gradient

1. **Direction de croissance maximale** : Le gradient pointe dans la direction où $f$ croît le plus rapidement
2. **Magnitude** : $|\nabla f|$ donne le taux de croissance maximal
3. **Orthogonalité** : $\nabla f$ est perpendiculaire aux surfaces de niveau $f = \text{constante}$

### 2. Divergence (Div)

La **divergence** d'un champ vectoriel $F = (F_1, F_2, F_3)$ est définie par :

```
div F = ∇ · F = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z
```

#### Interprétation Physique

La divergence mesure le "flux net" sortant d'un volume infinitésimal :
- **div F > 0** : Source (plus de flux sort que rentre)
- **div F < 0** : Puits (plus de flux rentre que sort)
- **div F = 0** : Champ incompressible

### 3. Rotationnel (Curl)

Le **rotationnel** d'un champ vectoriel $F = (F_1, F_2, F_3)$ est défini par :

```
curl F = ∇ × F = (∂F₃/∂y - ∂F₂/∂z, ∂F₁/∂z - ∂F₃/∂x, ∂F₂/∂x - ∂F₁/∂y)
```

#### Interprétation Physique

Le rotationnel mesure la "circulation" du champ vectoriel :
- **curl F ≠ 0** : Champ tourbillonnaire
- **curl F = 0** : Champ irrotationnel (conservatif)

## Identités Vectorielles Importantes

### Identités de Base

1. **Divergence du rotationnel** :
   ```
   ∇ · (∇ × F) = 0
   ```

2. **Rotationnel du gradient** :
   ```
   ∇ × (∇f) = 0
   ```

3. **Laplacien** :
   ```
   ∇²f = ∇ · (∇f) = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²
   ```

### Identités de Produit

1. **Divergence d'un produit** :
   ```
   ∇ · (fF) = f(∇ · F) + F · (∇f)
   ```

2. **Rotationnel d'un produit** :
   ```
   ∇ × (fF) = f(∇ × F) + (∇f) × F
   ```

## Coordonnées Curvilignes

### Coordonnées Sphériques

En coordonnées sphériques $(r, \theta, \phi)$ :

**Gradient** :
```
∇f = (∂f/∂r) eᵣ + (1/r)(∂f/∂θ) e_θ + (1/r sin θ)(∂f/∂φ) e_φ
```

**Divergence** :
```
∇ · F = (1/r²)∂(r²Fᵣ)/∂r + (1/r sin θ)∂(sin θ F_θ)/∂θ + (1/r sin θ)∂F_φ/∂φ
```

**Rotationnel** :
```
∇ × F = (1/r sin θ)[∂(sin θ F_φ)/∂θ - ∂F_θ/∂φ] eᵣ + (1/r)[(1/sin θ)∂Fᵣ/∂φ - ∂(rF_φ)/∂r] e_θ + (1/r)[∂(rF_θ)/∂r - ∂Fᵣ/∂θ] e_φ
```

### Coordonnées Cylindriques

En coordonnées cylindriques $(r, \theta, z)$ :

**Gradient** :
```
∇f = (∂f/∂r) eᵣ + (1/r)(∂f/∂θ) e_θ + (∂f/∂z) e_z
```

**Divergence** :
```
∇ · F = (1/r)∂(rFᵣ)/∂r + (1/r)∂F_θ/∂θ + ∂F_z/∂z
```

## Théorèmes Fondamentaux

### Théorème de la Divergence (Gauss)

Pour un volume $V$ avec surface fermée $S$ :

```
∫∫∫_V (∇ · F) dV = ∫∫_S (F · n) dS
```

où $n$ est le vecteur normal unitaire sortant.

### Théorème de Stokes

Pour une surface $S$ avec bord $C$ :

```
∫∫_S (∇ × F) · n dS = ∮_C F · dr
```

### Théorème de Green

Dans le plan, pour une région $D$ avec bord $C$ :

```
∫∫_D (∂Q/∂x - ∂P/∂y) dx dy = ∮_C (P dx + Q dy)
```

## Applications en Physique

### Électromagnétisme

Les équations de Maxwell s'écrivent en termes d'opérateurs vectoriels :

1. **Loi de Gauss** :
   ```
   ∇ · E = ρ/ε₀
   ```

2. **Loi de Gauss pour le magnétisme** :
   ```
   ∇ · B = 0
   ```

3. **Loi de Faraday** :
   ```
   ∇ × E = -∂B/∂t
   ```

4. **Loi d'Ampère-Maxwell** :
   ```
   ∇ × B = μ₀J + μ₀ε₀∂E/∂t
   ```

### Mécanique des Fluides

1. **Équation de continuité** :
   ```
   ∂ρ/∂t + ∇ · (ρv) = 0
   ```

2. **Équation de Navier-Stokes** :
   ```
   ρ(∂v/∂t + v · ∇v) = -∇p + μ∇²v + ρg
   ```

### Thermodynamique

1. **Loi de Fourier** :
   ```
   q = -k∇T
   ```

2. **Équation de la chaleur** :
   ```
   ∂T/∂t = α∇²T
   ```

## Champs Conservatifs

### Définition

Un champ vectoriel $F$ est **conservatif** s'il existe une fonction scalaire $\phi$ telle que :
```
F = ∇φ
```

### Conditions d'Équivalence

Pour un domaine simplement connexe, les conditions suivantes sont équivalentes :

1. $F$ est conservatif
2. $\nabla \times F = 0$ partout
3. $\oint_C F \cdot dr = 0$ pour tout chemin fermé $C$
4. $\int_A^B F \cdot dr$ est indépendant du chemin

### Potentiel Vectoriel

Si $\nabla \cdot F = 0$, alors il existe un champ vectoriel $A$ tel que :
```
F = ∇ × A
```

## Visualisation et Intuition

### Lignes de Champ

Les **lignes de champ** d'un champ vectoriel $F$ sont les courbes tangentes à $F$ en chaque point. Elles sont solutions de :
```
dr/dt = F(r(t))
```

### Surfaces Équipotentielles

Pour un champ conservatif $F = \nabla \phi$, les **surfaces équipotentielles** sont définies par :
```
φ(x,y,z) = constante
```

Le gradient est perpendiculaire à ces surfaces.

## Exercices

### Exercice 1 : Calcul d'Opérateurs
Pour le champ vectoriel $F(x,y,z) = (x^2, y^2, z^2)$ :
1. Calculer $\nabla \cdot F$
2. Calculer $\nabla \times F$
3. Trouver un champ scalaire $\phi$ tel que $\nabla \phi = F$

### Exercice 2 : Identités Vectorielles
Vérifier les identités suivantes pour $f(x,y,z) = x^2 + y^2 + z^2$ et $F(x,y,z) = (y, -x, 0)$ :
1. $\nabla \times (\nabla f) = 0$
2. $\nabla \cdot (\nabla \times F) = 0$

### Exercice 3 : Théorème de la Divergence
Vérifier le théorème de Gauss pour $F(x,y,z) = (x, y, z)$ sur la sphère unité.

### Exercice 4 : Champ Conservatif
Montrer que $F(x,y) = (y, x)$ est conservatif et trouver son potentiel.

## Conclusion

L'analyse vectorielle fournit un cadre mathématique puissant pour décrire les phénomènes physiques. Les opérateurs gradient, divergence et rotationnel permettent de caractériser complètement les propriétés locales des champs vectoriels, tandis que les théorèmes fondamentaux (Gauss, Stokes, Green) établissent des relations entre les propriétés locales et globales.

Ces concepts sont la base de nombreuses théories physiques modernes et constituent un outil indispensable pour l'ingénieur et le physicien.

## Références

- Schey, H. "Div, Grad, Curl, and All That"
- Marsden, J. & Tromba, A. "Vector Calculus"
- Apostol, T. "Calculus, Volume II"
- Arfken, G. & Weber, H. "Mathematical Methods for Physicists"
