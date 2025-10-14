# Géodésiques et Distances Riemanniennes

## Introduction aux Géodésiques

Les **géodésiques** sont les courbes de longueur minimale sur une variété riemannienne. Elles généralisent la notion de "ligne droite" dans l'espace euclidien.

### Définition Formelle

Une courbe γ: [a,b] → M sur une variété riemannienne (M,g) est une **géodésique** si elle satisfait l'équation des géodésiques :

```
d²γ^i/dt² + Γ^i_jk (dγ^j/dt)(dγ^k/dt) = 0
```

où Γ^i_jk sont les **symboles de Christoffel** définis par :

```
Γ^i_jk = (1/2) g^il [∂g_jl/∂x^k + ∂g_kl/∂x^j - ∂g_jk/∂x^l]
```

## Distance Géodésique

### Définition

La **distance géodésique** entre deux points p, q ∈ M est définie comme :

```math
d(p,q) = inf_γ ∫₀¹ √(g_γ(t)(γ̇(t), γ̇(t))) dt
```

où l'infimum est pris sur toutes les courbes γ: [0,1] → M reliant p à q.

### Propriétés de la Distance Géodésique

1. **Symétrie** : d(p,q) = d(q,p)
2. **Inégalité triangulaire** : d(p,r) ≤ d(p,q) + d(q,r)
3. **Non-négativité** : d(p,q) ≥ 0 avec égalité si et seulement si p = q

## Applications Pratiques

### Navigation sur la Sphère

Pour la sphère unité $S^2$ avec la métrique induite, les géodésiques sont les **grands cercles**. La distance géodésique entre deux points est l'angle entre leurs vecteurs position.

### Géométrie Hyperbolique

Dans le **modèle de Poincaré** du plan hyperbolique, les géodésiques sont :
- Les droites verticales
- Les demi-cercles orthogonaux à l'axe réel

## Algorithmes de Calcul

### Algorithme de Dijkstra sur Variétés

Pour calculer des distances géodésiques approximatives :

1. **Discrétisation** : Créer un maillage de la variété
2. **Graphe de voisinage** : Connecter les points proches
3. **Poids des arêtes** : Utiliser la distance euclidienne locale
4. **Plus court chemin** : Appliquer l'algorithme de Dijkstra

### Méthode du Shooting

Pour résoudre l'équation des géodésiques :

1. **Condition initiale** : Point de départ $p$ et direction initiale $v$
2. **Intégration** : Résoudre numériquement l'équation différentielle
3. **Arrêt** : Quand on atteint le point cible $q$
4. **Optimisation** : Ajuster $v$ pour minimiser la distance

## Visualisation des Géodésiques

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

def sphere_geodesic(p1, p2, n_points=100):
    """
    Calcule une géodésique sur la sphère entre deux points
    """
    # Normalisation des points
    p1 = np.array(p1) / np.linalg.norm(p1)
    p2 = np.array(p2) / np.linalg.norm(p2)
    
    # Angle entre les points
    cos_angle = np.dot(p1, p2)
    angle = np.arccos(np.clip(cos_angle, -1, 1))
    
    if angle < 1e-10:
        return np.array([p1] * n_points)
    
    # Paramétrisation de la géodésique
    t = np.linspace(0, 1, n_points)
    
    # Formule de slerp (spherical linear interpolation)
    geodesic = []
    for s in t:
        point = (np.sin((1-s) * angle) * p1 + np.sin(s * angle) * p2) / np.sin(angle)
        geodesic.append(point)
    
    return np.array(geodesic)

# Exemple d'utilisation
p1 = [1, 0, 0]
p2 = [0, 1, 0]

geodesic = sphere_geodesic(p1, p2)

# Visualisation
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Sphère unité
u = np.linspace(0, 2 * np.pi, 50)
v = np.linspace(0, np.pi, 50)
x = np.outer(np.cos(u), np.sin(v))
y = np.outer(np.sin(u), np.sin(v))
z = np.outer(np.ones(np.size(u)), np.cos(v))

ax.plot_surface(x, y, z, alpha=0.3, color='lightblue')

# Géodésique
ax.plot(geodesic[:, 0], geodesic[:, 1], geodesic[:, 2], 
        'r-', linewidth=3, label='Géodésique')

# Points de départ et d'arrivée
ax.scatter([p1[0]], [p1[1]], [p1[2]], color='green', s=100, label='Départ')
ax.scatter([p2[0]], [p2[1]], [p2[2]], color='red', s=100, label='Arrivée')

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.legend()
ax.set_title('Géodésique sur la Sphère')
plt.show()
```

## Théorie des Champs de Jacobi

### Définition

Un **champ de Jacobi** J(t) le long d'une géodésique γ(t) est un champ vectoriel qui satisfait l'équation de Jacobi :

```math
D²J/dt² + R(γ̇, J)γ̇ = 0
```

où R est le tenseur de courbure de Riemann.

### Applications

Les champs de Jacobi permettent de :
1. **Analyser la stabilité** des géodésiques
2. **Calculer les variations** de la longueur
3. **Détecter les points conjugués**

## Applications en Machine Learning

### Manifold Learning

Les distances géodésiques sont utilisées dans :
- **Isomap** : Préserve les distances géodésiques
- **Laplacian Eigenmaps** : Approche locale des géodésiques
- **Diffusion Maps** : Propagation basée sur les géodésiques

### Optimisation sur Variétés

- **Gradient descent sur variétés** : Utilise les géodésiques
- **Méthodes de Newton** : Approximation géodésique
- **Optimisation stochastique** : Marches aléatoires géodésiques

## Conclusion

Les géodésiques et distances riemanniennes constituent le fondement de la géométrie différentielle moderne. Leur compréhension est essentielle pour :

- La physique théorique (relativité générale)
- L'analyse de données (manifold learning)
- L'optimisation non-linéaire
- La géométrie computationnelle

Leur calcul numérique efficace reste un domaine de recherche actif, avec des applications pratiques dans de nombreux domaines scientifiques et techniques.
