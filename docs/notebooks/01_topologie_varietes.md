# Topologie et Variétés - Notebook Interactif

## Introduction

Ce notebook explore les concepts fondamentaux de la topologie et des variétés différentielles. Nous allons visualiser et comprendre ces concepts géométriques abstraits à travers des exemples concrets et des visualisations interactives.

## 1. Espaces Topologiques

### Définition

Un **espace topologique** est un ensemble $X$ muni d'une **topologie** $\tau$, c'est-à-dire une collection de sous-ensembles de $X$ (appelés **ouverts**) satisfaisant :

1. L'ensemble vide $\emptyset$ et $X$ sont ouverts
2. L'union d'une famille d'ouverts est ouverte
3. L'intersection finie d'ouverts est ouverte

### Exemples Visuels

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import networkx as nx

# Exemple 1: Topologie discrète sur un ensemble fini
def visualize_discrete_topology():
    """Visualise la topologie discrète sur un ensemble de 5 points"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    
    # Points de l'espace
    points = np.array([[0, 0], [1, 1], [2, 0], [1, -1], [0.5, 0.5]])
    
    # Topologie discrète - chaque point est un ouvert
    ax1.scatter(points[:, 0], points[:, 1], c='red', s=100, zorder=5)
    for i, point in enumerate(points):
        circle = plt.Circle(point, 0.1, alpha=0.3, color='blue')
        ax1.add_patch(circle)
        ax1.text(point[0]+0.15, point[1], f'x{i+1}', fontsize=10)
    
    ax1.set_xlim(-0.5, 2.5)
    ax1.set_ylim(-1.5, 1.5)
    ax1.set_title('Topologie Discrète\n(Chaque point est un ouvert)')
    ax1.grid(True, alpha=0.3)
    
    # Topologie grossière - seulement ∅ et X sont ouverts
    ax2.scatter(points[:, 0], points[:, 1], c='red', s=100, zorder=5)
    # Tous les points dans un seul grand ouvert
    all_points = np.vstack([points, points[0:1]])  # Fermer le polygone
    ax2.plot(all_points[:, 0], all_points[:, 1], 'b--', alpha=0.5, linewidth=2)
    ax2.fill(all_points[:, 0], all_points[:, 1], alpha=0.2, color='blue')
    
    for i, point in enumerate(points):
        ax2.text(point[0]+0.15, point[1], f'x{i+1}', fontsize=10)
    
    ax2.set_xlim(-0.5, 2.5)
    ax2.set_ylim(-1.5, 1.5)
    ax2.set_title('Topologie Grossière\n(Seuls ∅ et X sont ouverts)')
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()

visualize_discrete_topology()
```

## 2. Variétés Topologiques

### Définition

Une **variété topologique** de dimension $n$ est un espace topologique $M$ tel que :
- $M$ est **Hausdorff** (points distincts ont des voisinages disjoints)
- $M$ est **à base dénombrable**
- Chaque point de $M$ a un voisinage homéomorphe à $\mathbb{R}^n$

### Exemples de Variétés

```python
def visualize_manifolds():
    """Visualise différents types de variétés"""
    fig = plt.figure(figsize=(15, 10))
    
    # 1. Sphère S²
    ax1 = fig.add_subplot(2, 3, 1, projection='3d')
    u = np.linspace(0, 2 * np.pi, 20)
    v = np.linspace(0, np.pi, 20)
    x = np.outer(np.cos(u), np.sin(v))
    y = np.outer(np.sin(u), np.sin(v))
    z = np.outer(np.ones(np.size(u)), np.cos(v))
    ax1.plot_surface(x, y, z, alpha=0.7, color='lightblue')
    ax1.set_title('Sphère S²\n(Variété de dimension 2)')
    
    # 2. Tore T²
    ax2 = fig.add_subplot(2, 3, 2, projection='3d')
    R, r = 2, 1
    u = np.linspace(0, 2*np.pi, 20)
    v = np.linspace(0, 2*np.pi, 20)
    U, V = np.meshgrid(u, v)
    x = (R + r*np.cos(V)) * np.cos(U)
    y = (R + r*np.cos(V)) * np.sin(U)
    z = r * np.sin(V)
    ax2.plot_surface(x, y, z, alpha=0.7, color='lightgreen')
    ax2.set_title('Tore T²\n(Variété de dimension 2)')
    
    # 3. Plan projectif RP² (représentation par antipodes)
    ax3 = fig.add_subplot(2, 3, 3, projection='3d')
    # On visualise RP² comme une sphère avec identification des antipodes
    ax3.plot_surface(x, y, z, alpha=0.5, color='lightcoral')
    ax3.plot_surface(-x, -y, -z, alpha=0.5, color='lightcoral')
    ax3.set_title('Plan Projectif RP²\n(Sphère avec antipodes identifiés)')
    
    # 4. Cylindre S¹ × ℝ
    ax4 = fig.add_subplot(2, 3, 4, projection='3d')
    theta = np.linspace(0, 2*np.pi, 20)
    z = np.linspace(-2, 2, 20)
    Theta, Z = np.meshgrid(theta, z)
    x = np.cos(Theta)
    y = np.sin(Theta)
    ax4.plot_surface(x, y, Z, alpha=0.7, color='lightyellow')
    ax4.set_title('Cylindre S¹ × ℝ\n(Variété de dimension 2)')
    
    # 5. Bouteille de Klein (représentation simplifiée)
    ax5 = fig.add_subplot(2, 3, 5, projection='3d')
    # Approximation de la bouteille de Klein
    u = np.linspace(0, 2*np.pi, 20)
    v = np.linspace(0, 2*np.pi, 20)
    U, V = np.meshgrid(u, v)
    x = (2 + np.cos(V)) * np.cos(U)
    y = (2 + np.cos(V)) * np.sin(U)
    z = np.sin(V) * np.cos(U/2)
    ax5.plot_surface(x, y, z, alpha=0.7, color='lightpink')
    ax5.set_title('Bouteille de Klein\n(Variété non-orientable)')
    
    # 6. Variété de dimension 1 (cercle)
    ax6 = fig.add_subplot(2, 3, 6)
    theta = np.linspace(0, 2*np.pi, 100)
    x = np.cos(theta)
    y = np.sin(theta)
    ax6.plot(x, y, 'b-', linewidth=3)
    ax6.scatter([1], [0], color='red', s=100, zorder=5)
    ax6.text(1.2, 0, 'Point de base', fontsize=10)
    ax6.set_xlim(-1.5, 1.5)
    ax6.set_ylim(-1.5, 1.5)
    ax6.set_aspect('equal')
    ax6.set_title('Cercle S¹\n(Variété de dimension 1)')
    ax6.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()

visualize_manifolds()
```

## 3. Cartes et Atlas

### Définition

Une **carte** sur une variété $M$ est un couple $(U, \phi)$ où :
- $U \subset M$ est un ouvert
- $\phi: U \to \mathbb{R}^n$ est un homéomorphisme

Un **atlas** est une collection de cartes qui recouvre $M$.

### Visualisation des Cartes

```python
def visualize_charts():
    """Visualise les cartes sur une sphère"""
    fig = plt.figure(figsize=(15, 5))
    
    # Sphère avec cartes stéréographiques
    ax1 = fig.add_subplot(1, 3, 1, projection='3d')
    
    # Sphère
    u = np.linspace(0, 2 * np.pi, 30)
    v = np.linspace(0, np.pi, 30)
    x = np.outer(np.cos(u), np.sin(v))
    y = np.outer(np.sin(u), np.sin(v))
    z = np.outer(np.ones(np.size(u)), np.cos(v))
    ax1.plot_surface(x, y, z, alpha=0.3, color='lightblue')
    
    # Carte stéréographique du pôle nord
    # Points sur la sphère (hémisphère sud)
    theta = np.linspace(0, 2*np.pi, 20)
    phi = np.linspace(np.pi/2, np.pi, 10)
    for p in phi:
        x_circle = np.sin(p) * np.cos(theta)
        y_circle = np.sin(p) * np.sin(theta)
        z_circle = np.cos(p) * np.ones_like(theta)
        ax1.plot(x_circle, y_circle, z_circle, 'r-', alpha=0.7)
    
    ax1.set_title('Carte Stéréographique\n(Pôle Nord)')
    
    # Projection stéréographique sur le plan
    ax2 = fig.add_subplot(1, 3, 2)
    
    # Transformation stéréographique: (x,y,z) -> (x/(1-z), y/(1-z))
    # Pour z = cos(phi), on a (1-z) = 1 - cos(phi)
    phi_range = np.linspace(0, np.pi/2, 20)
    for phi in phi_range:
        if phi < np.pi/2:  # Éviter le pôle nord
            x_proj = np.sin(phi) / (1 - np.cos(phi))
            y_proj = np.zeros_like(x_proj)
            ax2.plot(x_proj, y_proj, 'r-', alpha=0.7)
            
            # Cercles concentriques
            theta = np.linspace(0, 2*np.pi, 50)
            x_circle = x_proj[0] * np.cos(theta)
            y_circle = x_proj[0] * np.sin(theta)
            ax2.plot(x_circle, y_circle, 'b-', alpha=0.5)
    
    ax2.set_xlim(-5, 5)
    ax2.set_ylim(-5, 5)
    ax2.set_aspect('equal')
    ax2.set_title('Projection Stéréographique\n(Sur le plan)')
    ax2.grid(True, alpha=0.3)
    
    # Atlas complet
    ax3 = fig.add_subplot(1, 3, 3, projection='3d')
    ax3.plot_surface(x, y, z, alpha=0.3, color='lightblue')
    
    # Deux cartes qui se chevauchent
    # Carte 1: Hémisphère nord (z > 0)
    x1 = x.copy()
    y1 = y.copy()
    z1 = z.copy()
    z1[z1 < 0] = np.nan
    ax3.plot_surface(x1, y1, z1, alpha=0.7, color='red')
    
    # Carte 2: Hémisphère sud (z < 0)
    x2 = x.copy()
    y2 = y.copy()
    z2 = z.copy()
    z2[z2 > 0] = np.nan
    ax3.plot_surface(x2, y2, z2, alpha=0.7, color='green')
    
    ax3.set_title('Atlas avec Chevauchement\n(Rouge: Nord, Vert: Sud)')
    
    plt.tight_layout()
    plt.show()

visualize_charts()
```

## 4. Homéomorphismes et Diffeomorphismes

### Définition

- Un **homéomorphisme** est une bijection continue avec inverse continu
- Un **difféomorphisme** est un homéomorphisme différentiable avec inverse différentiable

### Exemples de Transformations

```python
def visualize_transformations():
    """Visualise différents types de transformations"""
    fig, axes = plt.subplots(2, 3, figsize=(15, 10))
    
    # Grille initiale
    x = np.linspace(-2, 2, 20)
    y = np.linspace(-2, 2, 20)
    X, Y = np.meshgrid(x, y)
    
    # 1. Transformation identité
    ax = axes[0, 0]
    ax.plot(X, Y, 'b-', alpha=0.7)
    ax.plot(X.T, Y.T, 'b-', alpha=0.7)
    ax.set_title('Identité\n(f(x,y) = (x,y))')
    ax.set_aspect('equal')
    ax.grid(True, alpha=0.3)
    
    # 2. Rotation
    ax = axes[0, 1]
    angle = np.pi/4
    X_rot = X * np.cos(angle) - Y * np.sin(angle)
    Y_rot = X * np.sin(angle) + Y * np.cos(angle)
    ax.plot(X_rot, Y_rot, 'r-', alpha=0.7)
    ax.plot(X_rot.T, Y_rot.T, 'r-', alpha=0.7)
    ax.set_title(f'Rotation\n(angle = {angle:.2f} rad)')
    ax.set_aspect('equal')
    ax.grid(True, alpha=0.3)
    
    # 3. Dilatation
    ax = axes[0, 2]
    scale = 2
    X_scale = X * scale
    Y_scale = Y * scale
    ax.plot(X_scale, Y_scale, 'g-', alpha=0.7)
    ax.plot(X_scale.T, Y_scale.T, 'g-', alpha=0.7)
    ax.set_title(f'Dilatation\n(facteur = {scale})')
    ax.set_aspect('equal')
    ax.grid(True, alpha=0.3)
    
    # 4. Cisaillement
    ax = axes[1, 0]
    shear = 0.5
    X_shear = X + shear * Y
    Y_shear = Y
    ax.plot(X_shear, Y_shear, 'm-', alpha=0.7)
    ax.plot(X_shear.T, Y_shear.T, 'm-', alpha=0.7)
    ax.set_title(f'Cisaillement\n(facteur = {shear})')
    ax.set_aspect('equal')
    ax.grid(True, alpha=0.3)
    
    # 5. Transformation non-linéaire
    ax = axes[1, 1]
    X_nl = X + 0.1 * Y**2
    Y_nl = Y + 0.1 * X**2
    ax.plot(X_nl, Y_nl, 'c-', alpha=0.7)
    ax.plot(X_nl.T, Y_nl.T, 'c-', alpha=0.7)
    ax.set_title('Transformation\nNon-linéaire')
    ax.set_aspect('equal')
    ax.grid(True, alpha=0.3)
    
    # 6. Transformation qui n'est pas un homéomorphisme
    ax = axes[1, 2]
    # Transformation qui contracte tout vers l'origine
    X_contract = X * 0.1
    Y_contract = Y * 0.1
    ax.plot(X_contract, Y_contract, 'orange', alpha=0.7)
    ax.plot(X_contract.T, Y_contract.T, 'orange', alpha=0.7)
    ax.set_title('Contraction\n(Non bijective)')
    ax.set_aspect('equal')
    ax.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()

visualize_transformations()
```

## 5. Classification des Surfaces

### Théorème de Classification

Toute surface compacte orientable est homéomorphe à une sphère avec $g$ anses (genre $g$).

### Visualisation des Surfaces

```python
def visualize_surface_classification():
    """Visualise la classification des surfaces"""
    fig = plt.figure(figsize=(15, 10))
    
    # Genre 0: Sphère
    ax1 = fig.add_subplot(2, 3, 1, projection='3d')
    u = np.linspace(0, 2 * np.pi, 20)
    v = np.linspace(0, np.pi, 20)
    x = np.outer(np.cos(u), np.sin(v))
    y = np.outer(np.sin(u), np.sin(v))
    z = np.outer(np.ones(np.size(u)), np.cos(v))
    ax1.plot_surface(x, y, z, alpha=0.7, color='lightblue')
    ax1.set_title('Genre 0: Sphère\n(g = 0)')
    
    # Genre 1: Tore
    ax2 = fig.add_subplot(2, 3, 2, projection='3d')
    R, r = 2, 1
    u = np.linspace(0, 2*np.pi, 20)
    v = np.linspace(0, 2*np.pi, 20)
    U, V = np.meshgrid(u, v)
    x = (R + r*np.cos(V)) * np.cos(U)
    y = (R + r*np.cos(V)) * np.sin(U)
    z = r * np.sin(V)
    ax2.plot_surface(x, y, z, alpha=0.7, color='lightgreen')
    ax2.set_title('Genre 1: Tore\n(g = 1)')
    
    # Genre 2: Double tore
    ax3 = fig.add_subplot(2, 3, 3, projection='3d')
    # Approximation d'un double tore
    u = np.linspace(0, 2*np.pi, 30)
    v = np.linspace(0, 2*np.pi, 30)
    U, V = np.meshgrid(u, v)
    
    # Premier tore
    x1 = (2 + 0.8*np.cos(V)) * np.cos(U)
    y1 = (2 + 0.8*np.cos(V)) * np.sin(U)
    z1 = 0.8 * np.sin(V) + 1
    
    # Deuxième tore
    x2 = (2 + 0.8*np.cos(V)) * np.cos(U)
    y2 = (2 + 0.8*np.cos(V)) * np.sin(U)
    z2 = 0.8 * np.sin(V) - 1
    
    ax3.plot_surface(x1, y1, z1, alpha=0.7, color='lightcoral')
    ax3.plot_surface(x2, y2, z2, alpha=0.7, color='lightcoral')
    ax3.set_title('Genre 2: Double Tore\n(g = 2)')
    
    # Plan projectif RP²
    ax4 = fig.add_subplot(2, 3, 4, projection='3d')
    # Représentation par une bande de Möbius fermée
    u = np.linspace(0, 2*np.pi, 30)
    v = np.linspace(-1, 1, 20)
    U, V = np.meshgrid(u, v)
    
    x = (1 + V*np.cos(U/2)) * np.cos(U)
    y = (1 + V*np.cos(U/2)) * np.sin(U)
    z = V * np.sin(U/2)
    
    ax4.plot_surface(x, y, z, alpha=0.7, color='lightpink')
    ax4.set_title('Plan Projectif RP²\n(Non-orientable)')
    
    # Bouteille de Klein
    ax5 = fig.add_subplot(2, 3, 5, projection='3d')
    u = np.linspace(0, 2*np.pi, 30)
    v = np.linspace(0, 2*np.pi, 30)
    U, V = np.meshgrid(u, v)
    
    x = (2 + np.cos(V)) * np.cos(U)
    y = (2 + np.cos(V)) * np.sin(U)
    z = np.sin(V) * np.cos(U/2)
    
    ax5.plot_surface(x, y, z, alpha=0.7, color='lightyellow')
    ax5.set_title('Bouteille de Klein\n(Non-orientable)')
    
    # Classification générale
    ax6 = fig.add_subplot(2, 3, 6)
    ax6.axis('off')
    
    classification_text = """
Classification des Surfaces

ORIENTABLES:
• Genre 0: Sphère
• Genre 1: Tore  
• Genre g: Sphère avec g anses

NON-ORIENTABLES:
• Plan projectif RP²
• Bouteille de Klein
• Surface de Klein

Formule d'Euler-Poincaré:
χ = 2 - 2g (orientable)
χ = 2 - g (non-orientable)
    """
    
    ax6.text(0.1, 0.9, classification_text, transform=ax6.transAxes, 
             fontsize=12, verticalalignment='top', fontfamily='monospace')
    
    plt.tight_layout()
    plt.show()

visualize_surface_classification()
```

## 6. Exercices et Applications

### Exercice 1: Vérification des Axiomes Topologiques

Montrez que les ensembles suivants forment des topologies sur ℝ :

1. **Topologie usuelle** : τ = \{U ⊂ ℝ : ∀x ∈ U, ∃ε > 0, (x-ε, x+ε) ⊂ U\}

2. **Topologie des rayons** : τ = \{U ⊂ ℝ : U = ∅ ou U = (a, +∞) pour un a ∈ ℝ\}

### Exercice 2: Homéomorphismes

Démontrez que les espaces suivants sont homéomorphes :

1. $\mathbb{R}$ et $(0,1)$
2. $S^1$ et $\mathbb{R}^2 \setminus \{0\}$ (via projection stéréographique)
3. Le tore $T^2$ et $S^1 \times S^1$

### Exercice 3: Variétés

Vérifiez que les espaces suivants sont des variétés et calculez leur dimension :

1. La sphère $S^n = \{x \in \mathbb{R}^{n+1} : \|x\| = 1\}$
2. L'espace projectif réel $\mathbb{RP}^n$
3. Le groupe $SO(n)$ des matrices orthogonales

## Conclusion

Ce notebook a introduit les concepts fondamentaux de la topologie et des variétés :

1. **Espaces topologiques** : Structure de base pour la continuité
2. **Variétés** : Espaces localement euclidiens
3. **Cartes et atlas** : Systèmes de coordonnées locaux
4. **Homéomorphismes** : Équivalences topologiques
5. **Classification** : Organisation des surfaces

Ces concepts constituent le fondement de la géométrie différentielle et de nombreuses applications en physique et en analyse de données.

## Références

- Hatcher, A. "Algebraic Topology"
- Munkres, J. "Topology"
- Lee, J. "Introduction to Smooth Manifolds"
- Milnor, J. "Topology from the Differentiable Viewpoint"
