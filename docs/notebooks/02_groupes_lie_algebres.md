# Groupes de Lie et Algèbres de Lie - Notebook Interactif

**Auteur** : Manus AI  
**Date** : 12 Octobre 2025

Ce notebook explore les groupes de Lie matriciels, leurs algèbres de Lie, et l'application exponentielle.

## Table des Matières

1. Groupes de Lie Matriciels (SO(3), SU(2), etc.)
2. L'Application Exponentielle
3. Algèbres de Lie et le Crochet de Lie
4. Représentations
5. Le Groupe de Poincaré

## 1. Le Groupe SO(3) : Rotations dans l'Espace 3D

SO(3) est le groupe des matrices orthogonales 3×3 de déterminant 1. C'est le groupe des rotations de l'espace euclidien ℝ³.

### Définition et Propriétés

Une matrice $R \in SO(3)$ satisfait :
- **Orthogonalité** : $R^T R = I$
- **Déterminant** : $\det(R) = 1$

### Visualisation des Rotations

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Définir une matrice de rotation autour de l'axe z
def rotation_z(theta):
    """Matrice de rotation d'angle theta autour de l'axe z"""
    return np.array([
        [np.cos(theta), -np.sin(theta), 0],
        [np.sin(theta), np.cos(theta), 0],
        [0, 0, 1]
    ])

# Vérifier les propriétés de SO(3)
theta = np.pi/4
R = rotation_z(theta)

print("Matrice de rotation R(π/4) autour de z:")
print(R)
print()

# Vérifier l'orthogonalité : R^T R = I
print("R^T R (doit être l'identité):")
print(R.T @ R)
print()

# Vérifier le déterminant
print("det(R) =", np.linalg.det(R), "(doit être 1)")
print()

# Visualiser l'effet de la rotation sur un vecteur
v = np.array([1, 0, 0])  # Vecteur initial
v_rotated = R @ v  # Vecteur après rotation

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Tracer les axes
ax.quiver(0, 0, 0, 1, 0, 0, color='r', arrow_length_ratio=0.1, linewidth=2, label='x')
ax.quiver(0, 0, 0, 0, 1, 0, color='g', arrow_length_ratio=0.1, linewidth=2, label='y')
ax.quiver(0, 0, 0, 0, 0, 1, color='b', arrow_length_ratio=0.1, linewidth=2, label='z')

# Tracer le vecteur original et le vecteur tourné
ax.quiver(0, 0, 0, v[0], v[1], v[2], color='orange', arrow_length_ratio=0.15, linewidth=3, label='v original')
ax.quiver(0, 0, 0, v_rotated[0], v_rotated[1], v_rotated[2], color='purple', arrow_length_ratio=0.15, linewidth=3, label='R(π/4)·v')

# Tracer l'arc de rotation
angles = np.linspace(0, theta, 50)
arc_x = np.cos(angles)
arc_y = np.sin(angles)
arc_z = np.zeros_like(angles)
ax.plot(arc_x, arc_y, arc_z, 'k--', linewidth=2, alpha=0.5)

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('Rotation dans SO(3) : R_z(π/4)', fontsize=14)
ax.legend()
ax.set_xlim([-1, 1])
ax.set_ylim([-1, 1])
ax.set_zlim([-1, 1])

plt.tight_layout()
plt.show()
```

## 2. L'Algèbre de Lie so(3) : Matrices Antisymétriques

L'algèbre de Lie so(3) est l'espace tangent à SO(3) à l'identité. Elle est constituée de matrices 3×3 antisymétriques.

### Générateurs de so(3)

```python
# Définir les générateurs de so(3)
# Ce sont les matrices antisymétriques de base

# Générateur de rotation autour de x
L_x = np.array([
    [0, 0, 0],
    [0, 0, -1],
    [0, 1, 0]
])

# Générateur de rotation autour de y
L_y = np.array([
    [0, 0, 1],
    [0, 0, 0],
    [-1, 0, 0]
])

# Générateur de rotation autour de z
L_z = np.array([
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, 0]
])

print("Générateurs de so(3):")
print("\nL_x (rotation infinitésimale autour de x):")
print(L_x)
print("\nL_y (rotation infinitésimale autour de y):")
print(L_y)
print("\nL_z (rotation infinitésimale autour de z):")
print(L_z)

# Vérifier qu'ils sont antisymétriques
print("\nVérification de l'antisymétrie (L_z^T = -L_z):")
print("L_z^T =")
print(L_z.T)
print("-L_z =")
print(-L_z)
print("Égaux ?", np.allclose(L_z.T, -L_z))
```

## 3. Le Crochet de Lie : [L_i, L_j] = ε_ijk L_k

Le crochet de Lie de deux matrices est leur commutateur $[A, B] = AB - BA$.

### Relations de Commutation

```python
def lie_bracket(A, B):
    """Calcule le crochet de Lie [A, B] = AB - BA"""
    return A @ B - B @ A

# Calculer les crochets de Lie des générateurs
print("Relations de commutation de l'algèbre de Lie so(3):")
print()

bracket_xy = lie_bracket(L_x, L_y)
print("[L_x, L_y] =")
print(bracket_xy)
print("Doit être égal à L_z:")
print(L_z)
print("Égaux ?", np.allclose(bracket_xy, L_z))
print()

bracket_yz = lie_bracket(L_y, L_z)
print("[L_y, L_z] =")
print(bracket_yz)
print("Doit être égal à L_x:")
print(L_x)
print("Égaux ?", np.allclose(bracket_yz, L_x))
print()

bracket_zx = lie_bracket(L_z, L_x)
print("[L_z, L_x] =")
print(bracket_zx)
print("Doit être égal à L_y:")
print(L_y)
print("Égaux ?", np.allclose(bracket_zx, L_y))
print()

print("Ces relations sont isomorphes au produit vectoriel dans ℝ³:")
print("e_x × e_y = e_z, e_y × e_z = e_x, e_z × e_x = e_y")
```

## 4. L'Application Exponentielle : exp : so(3) → SO(3)

L'exponentielle d'une matrice antisymétrique donne une matrice de rotation.

### Connexion Algèbre-Groupe

```python
from scipy.linalg import expm

# Calculer l'exponentielle d'un élément de l'algèbre de Lie
theta = np.pi/3  # Angle de rotation
omega = theta * L_z  # Élément de so(3)

print("Élément de l'algèbre de Lie: θ L_z avec θ = π/3")
print(omega)
print()

# Calculer l'exponentielle
R_exp = expm(omega)
print("Exponentielle exp(θ L_z):")
print(R_exp)
print()

# Comparer avec la matrice de rotation directe
R_direct = rotation_z(theta)
print("Matrice de rotation directe R_z(π/3):")
print(R_direct)
print()

print("Les deux sont égales ?", np.allclose(R_exp, R_direct))
print()

# Visualiser l'exponentielle comme un chemin continu
fig = plt.figure(figsize=(12, 5))

# Sous-graphique 1 : Chemin dans l'algèbre de Lie
ax1 = fig.add_subplot(121)
t_values = np.linspace(0, 1, 50)
angles = theta * t_values

ax1.plot(t_values, angles, 'b-', linewidth=2)
ax1.scatter([0, 1], [0, theta], c=['green', 'red'], s=100, zorder=5)
ax1.set_xlabel('Paramètre t', fontsize=12)
ax1.set_ylabel('Angle θ(t)', fontsize=12)
ax1.set_title('Chemin dans l\'algèbre de Lie so(3)', fontsize=14)
ax1.grid(True, alpha=0.3)
ax1.annotate('0 (identité)', xy=(0, 0), xytext=(0.1, 0.2), fontsize=10,
            arrowprops=dict(arrowstyle='->', color='green'))
ax1.annotate('θ L_z', xy=(1, theta), xytext=(0.7, theta+0.2), fontsize=10,
            arrowprops=dict(arrowstyle='->', color='red'))

# Sous-graphique 2 : Chemin dans le groupe SO(3)
ax2 = fig.add_subplot(122, projection='3d')

# Tracer la trajectoire d'un vecteur sous l'action du groupe à un paramètre
v0 = np.array([1, 0, 0])
trajectory = []
for angle in angles:
    R_t = rotation_z(angle)
    v_t = R_t @ v0
    trajectory.append(v_t)

trajectory = np.array(trajectory)
ax2.plot(trajectory[:, 0], trajectory[:, 1], trajectory[:, 2], 'b-', linewidth=3, label='Orbite')
ax2.scatter([v0[0]], [v0[1]], [v0[2]], c='green', s=100, label='Départ')
ax2.scatter([trajectory[-1, 0]], [trajectory[-1, 1]], [trajectory[-1, 2]], c='red', s=100, label='Arrivée')

ax2.set_xlabel('X')
ax2.set_ylabel('Y')
ax2.set_zlabel('Z')
ax2.set_title('Chemin dans le groupe SO(3)', fontsize=14)
ax2.legend()

plt.tight_layout()
plt.show()

print("L'application exponentielle 'intègre' un chemin dans l'algèbre de Lie")
print("en un chemin (un sous-groupe à un paramètre) dans le groupe de Lie.")
```

## 5. Le Groupe SU(2) et sa Relation avec SO(3)

SU(2) est le groupe des matrices unitaires 2×2 de déterminant 1. Il est le revêtement double de SO(3).

### Matrices de Pauli et Générateurs

```python
# Les matrices de Pauli (générateurs de su(2))
sigma_x = np.array([[0, 1], [1, 0]], dtype=complex)
sigma_y = np.array([[0, -1j], [1j, 0]], dtype=complex)
sigma_z = np.array([[1, 0], [0, -1]], dtype=complex)

print("Matrices de Pauli (générateurs de su(2)):")
print("\nσ_x =")
print(sigma_x)
print("\nσ_y =")
print(sigma_y)
print("\nσ_z =")
print(sigma_z)
print()

# Les générateurs de su(2) sont (i/2) σ_i
J_x = 1j * sigma_x / 2
J_y = 1j * sigma_y / 2
J_z = 1j * sigma_z / 2

print("Générateurs de su(2): J_i = (i/2) σ_i")
print("\nJ_x =")
print(J_x)
print("\nJ_y =")
print(J_y)
print("\nJ_z =")
print(J_z)
print()

# Vérifier les relations de commutation [J_i, J_j] = i ε_ijk J_k
bracket_jx_jy = lie_bracket(J_x, J_y)
print("[J_x, J_y] =")
print(bracket_jx_jy)
print("i J_z =")
print(1j * J_z)
print("Égaux ?", np.allclose(bracket_jx_jy, 1j * J_z))
print()

# Calculer un élément de SU(2)
theta = np.pi/2
U = expm(theta * J_z)
print(f"Élément de SU(2): U = exp(π/2 J_z)")
print(U)
print()

# Vérifier les propriétés de SU(2)
print("Vérification: U† U = I")
print(U.conj().T @ U)
print()
print("det(U) =", np.linalg.det(U), "(doit être 1)")
print()

print("Fait remarquable: SU(2) est difféomorphe à la sphère S³ dans ℂ² ≅ ℝ⁴")
print("SU(2) est le revêtement double de SO(3): une rotation de 4π dans SU(2) = rotation de 2π dans SO(3)")
print("C'est crucial pour comprendre le spin en mécanique quantique!")
```

## 6. Le Groupe de Poincaré : Symétries de l'Espace-Temps

Le groupe de Poincaré est le groupe des isométries de l'espace-temps de Minkowski. Il combine le groupe de Lorentz et les translations.

### Métrique de Minkowski et Transformations de Lorentz

```python
# Métrique de Minkowski
eta = np.diag([-1, 1, 1, 1])  # Signature (-,+,+,+)

print("Métrique de Minkowski η:")
print(eta)
print()

# Une transformation de Lorentz (boost) le long de l'axe x
def lorentz_boost_x(v):
    """Boost de Lorentz le long de x avec vitesse v (en unités où c=1)"""
    gamma = 1 / np.sqrt(1 - v**2)
    beta = v
    return np.array([
        [gamma, -gamma*beta, 0, 0],
        [-gamma*beta, gamma, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])

v = 0.6  # 60% de la vitesse de la lumière
Lambda = lorentz_boost_x(v)

print(f"Transformation de Lorentz (boost à v = {v}c):")
print(Lambda)
print()

# Vérifier que Λ^T η Λ = η (préservation de la métrique)
print("Vérification: Λ^T η Λ = η")
result = Lambda.T @ eta @ Lambda
print(result)
print("Égal à η ?", np.allclose(result, eta))
print()

# Appliquer le boost à un quadrivecteur
x = np.array([1, 0, 0, 0])  # Événement au repos (t=1, x=y=z=0)
x_boosted = Lambda @ x

print("Quadrivecteur original (t, x, y, z):")
print(x)
print("Après boost:")
print(x_boosted)
print()

# Calculer l'intervalle d'espace-temps (invariant)
s2 = x @ eta @ x
s2_boosted = x_boosted @ eta @ x_boosted

print(f"Intervalle d'espace-temps s² = x^T η x:")
print(f"Avant boost: s² = {s2}")
print(f"Après boost: s² = {s2_boosted}")
print(f"Invariant ? {np.isclose(s2, s2_boosted)}")
print()

print("Le groupe de Poincaré = Groupe de Lorentz ⋉ Translations")
print("C'est le groupe de symétries de la relativité restreinte.")
print("Dimension : 10 (6 pour Lorentz + 4 pour les translations)")
```

## 7. Visualisation Interactive : Rotation Continue dans SO(3)

### Animation d'un Cube en Rotation

```python
# Créer une animation de rotation
n_frames = 50
angles = np.linspace(0, 2*np.pi, n_frames)

# Définir un cube pour visualiser la rotation
vertices = np.array([
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
]).T

# Visualiser plusieurs positions du cube
fig = plt.figure(figsize=(15, 5))

# Position initiale
ax1 = fig.add_subplot(131, projection='3d')
R0 = rotation_z(0)
rotated_vertices_0 = R0 @ vertices
plot_cube(ax1, rotated_vertices_0, 'Position initiale')

# Position à π/4
ax2 = fig.add_subplot(132, projection='3d')
R1 = rotation_z(np.pi/4)
rotated_vertices_1 = R1 @ vertices
plot_cube(ax2, rotated_vertices_1, 'Rotation π/4')

# Position à π/2
ax3 = fig.add_subplot(133, projection='3d')
R2 = rotation_z(np.pi/2)
rotated_vertices_2 = R2 @ vertices
plot_cube(ax3, rotated_vertices_2, 'Rotation π/2')

plt.tight_layout()
plt.show()

def plot_cube(ax, vertices, title):
    """Fonction utilitaire pour tracer un cube"""
    # Définir les arêtes
    edge_indices = [
        (0,1), (1,2), (2,3), (3,0),  # Face inférieure
        (4,5), (5,6), (6,7), (7,4),  # Face supérieure
        (0,4), (1,5), (2,6), (3,7)   # Arêtes verticales
    ]
    
    for i, j in edge_indices:
        ax.plot([vertices[0, i], vertices[0, j]], 
                [vertices[1, i], vertices[1, j]], 
                [vertices[2, i], vertices[2, j]], 'b-', linewidth=2)
    
    ax.set_xlim([-2, 2])
    ax.set_ylim([-2, 2])
    ax.set_zlim([-2, 2])
    ax.set_title(title)
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')

print("Ceci visualise un sous-groupe à un paramètre de SO(3).")
```

## 8. Exercices

### Exercice 1 : Composition de rotations
Calculer $R_x(\pi/4) \cdot R_y(\pi/4)$ et vérifier que ce n'est pas égal à $R_y(\pi/4) \cdot R_x(\pi/4)$. Que cela signifie-t-il ?

### Exercice 2 : Formule de Rodrigues
Vérifier la formule de Rodrigues pour l'exponentielle d'une rotation autour d'un axe arbitraire :

$$R(\theta, \hat{n}) = I + \sin(\theta) K + (1 - \cos(\theta)) K^2$$

où $K$ est la matrice antisymétrique associée au vecteur $\hat{n}$.

### Exercice 3 : Algèbre de Lie de SL(2, ℝ)
Trouver les générateurs de $\mathfrak{sl}(2, \mathbb{R})$ (matrices 2×2 de trace nulle) et calculer leurs crochets de Lie.

### Exercice 4 : Représentations de SU(2)
Montrer que les matrices de Pauli forment une représentation de dimension 2 de $\mathfrak{su}(2)$.

## Conclusion

Ce notebook a exploré :

- Les **groupes de Lie matriciels** SO(3), SU(2) et le groupe de Poincaré
- Les **algèbres de Lie** comme espaces tangents et leurs générateurs
- Le **crochet de Lie** $[·,·]$ et les relations de commutation
- L'**application exponentielle** qui relie l'algèbre au groupe
- La relation profonde entre SU(2) et SO(3) (revêtement double)

Ces concepts sont au cœur de la physique théorique moderne, de la mécanique quantique à la théorie des cordes.

## Références

- Hall, B. "Lie Groups, Lie Algebras, and Representations"
- Stillwell, J. "Naive Lie Theory"
- Gilmore, R. "Lie Groups, Physics, and Geometry"
- Sattinger, D. "Lie Groups and Algebras with Applications to Physics"
