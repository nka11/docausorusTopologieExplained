# Géométrie Riemannienne - Notebook Interactif

**Auteur** : Manus AI  
**Date** : 12 Octobre 2025

Ce notebook explore les concepts fondamentaux de la géométrie riemannienne : métriques, connexions, courbure et géodésiques.

## Table des Matières

1. Variétés Riemanniennes et Métriques
2. Connexions et Transport Parallèle
3. Courbure de Riemann
4. Géodésiques et Distance
5. Applications en Physique

## 1. Variétés Riemanniennes et Métriques

### Définition

Une **variété riemannienne** $(M,g)$ est une variété différentielle $M$ munie d'une **métrique riemannienne** $g$, c'est-à-dire un champ de tenseurs métriques positifs définis.

En coordonnées locales $(x^1, \ldots, x^n)$, la métrique s'écrit :
$$g = g_{ij} dx^i \otimes dx^j$$

### Exemples de Métriques

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from scipy.linalg import expm, logm

# Métrique euclidienne sur ℝ²
def euclidean_metric():
    """Métrique euclidienne standard"""
    return np.eye(2)

# Métrique sur la sphère S²
def sphere_metric(theta, phi):
    """Métrique induite sur la sphère unité"""
    return np.array([
        [1, 0],
        [0, np.sin(theta)**2]
    ])

# Métrique hyperbolique sur le disque de Poincaré
def poincare_metric(x, y):
    """Métrique hyperbolique sur le disque unité"""
    r_squared = x**2 + y**2
    if r_squared >= 1:
        return None  # En dehors du disque
    
    factor = 4 / (1 - r_squared)**2
    return factor * np.eye(2)

print("Exemples de métriques:")
print("1. Métrique euclidienne sur ℝ²:")
print(euclidean_metric())
print()

# Visualiser la sphère avec sa métrique
fig = plt.figure(figsize=(15, 5))

# Sphère 3D
ax1 = fig.add_subplot(131, projection='3d')
u = np.linspace(0, 2 * np.pi, 20)
v = np.linspace(0, np.pi, 20)
x = np.outer(np.cos(u), np.sin(v))
y = np.outer(np.sin(u), np.sin(v))
z = np.outer(np.ones(np.size(u)), np.cos(v))
ax1.plot_surface(x, y, z, alpha=0.7, color='lightblue')
ax1.set_title('Sphère S² avec métrique induite')

# Métrique sur la sphère
ax2 = fig.add_subplot(132)
theta_range = np.linspace(0, np.pi, 50)
phi_range = np.linspace(0, 2*np.pi, 50)
Theta, Phi = np.meshgrid(theta_range, phi_range)

# Calculer le déterminant de la métrique
g_det = np.sin(Theta)**2
contour = ax2.contourf(Theta, Phi, g_det, levels=20, cmap='viridis')
ax2.set_xlabel('θ (latitude)')
ax2.set_ylabel('φ (longitude)')
ax2.set_title('Déterminant de la métrique sur S²')
plt.colorbar(contour, ax=ax2)

# Métrique hyperbolique
ax3 = fig.add_subplot(133)
x_range = np.linspace(-0.9, 0.9, 50)
y_range = np.linspace(-0.9, 0.9, 50)
X, Y = np.meshgrid(x_range, y_range)

# Calculer le facteur de la métrique hyperbolique
r_squared = X**2 + Y**2
valid_mask = r_squared < 1
hyperbolic_factor = np.zeros_like(X)
hyperbolic_factor[valid_mask] = 4 / (1 - r_squared[valid_mask])**2

contour = ax3.contourf(X, Y, hyperbolic_factor, levels=20, cmap='plasma')
ax3.set_xlabel('x')
ax3.set_ylabel('y')
ax3.set_title('Métrique hyperbolique (facteur)')
ax3.set_aspect('equal')
plt.colorbar(contour, ax=ax3)

plt.tight_layout()
plt.show()
```

## 2. Connexions et Transport Parallèle

### Connexion de Levi-Civita

La **connexion de Levi-Civita** $\nabla$ est l'unique connexion métrique sans torsion.

### Symboles de Christoffel

Les symboles de Christoffel sont définis par :
```
Γ^k_ij = (1/2) g^kl [∂g_il/∂x^j + ∂g_jl/∂x^i - ∂g_ij/∂x^l]
```

```python
# Calcul des symboles de Christoffel pour la sphère
def christoffel_sphere(theta, phi):
    """Symboles de Christoffel pour la métrique sphérique"""
    # Métrique et son inverse
    g = np.array([
        [1, 0],
        [0, np.sin(theta)**2]
    ])
    g_inv = np.linalg.inv(g)
    
    # Symboles de Christoffel (approximation discrète)
    Gamma = np.zeros((2, 2, 2))
    
    # Γ^θ_φφ = -sin(θ)cos(θ)
    Gamma[0, 1, 1] = -np.sin(theta) * np.cos(theta)
    
    # Γ^φ_θφ = Γ^φ_φθ = cot(θ)
    Gamma[1, 0, 1] = Gamma[1, 1, 0] = np.cos(theta) / np.sin(theta)
    
    return Gamma, g, g_inv

# Visualiser les symboles de Christoffel
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

theta_range = np.linspace(0.1, np.pi-0.1, 50)
phi_range = np.linspace(0, 2*np.pi, 50)
Theta, Phi = np.meshgrid(theta_range, phi_range)

# Calculer les symboles pour chaque point
Gamma_theta_phi_phi = -np.sin(Theta) * np.cos(Theta)
Gamma_phi_theta_phi = np.cos(Theta) / np.sin(Theta)

# Visualiser Γ^θ_φφ
im1 = axes[0, 0].contourf(Theta, Phi, Gamma_theta_phi_phi, levels=20, cmap='RdBu_r')
axes[0, 0].set_title('Γ^θ_φφ = -sin(θ)cos(θ)')
axes[0, 0].set_xlabel('θ')
axes[0, 0].set_ylabel('φ')
plt.colorbar(im1, ax=axes[0, 0])

# Visualiser Γ^φ_θφ
im2 = axes[0, 1].contourf(Theta, Phi, Gamma_phi_theta_phi, levels=20, cmap='RdBu_r')
axes[0, 1].set_title('Γ^φ_θφ = cot(θ)')
axes[0, 1].set_xlabel('θ')
axes[0, 1].set_ylabel('φ')
plt.colorbar(im2, ax=axes[0, 1])

# Transport parallèle d'un vecteur
def parallel_transport_sphere(theta0, phi0, v0, path_theta, path_phi):
    """Transport parallèle d'un vecteur le long d'une courbe sur la sphère"""
    v = v0.copy()
    transported_vectors = [v.copy()]
    
    for i in range(1, len(path_theta)):
        theta, phi = path_theta[i], path_phi[i]
        dtheta = path_theta[i] - path_theta[i-1]
        dphi = path_phi[i] - path_phi[i-1]
        
        # Calculer les symboles de Christoffel
        Gamma, _, _ = christoffel_sphere(theta, phi)
        
        # Équation de transport parallèle
        dv_dtheta = -(Gamma[0, 0, 0] * v[0] * dtheta + Gamma[0, 0, 1] * v[1] * dtheta +
                      Gamma[0, 1, 0] * v[0] * dphi + Gamma[0, 1, 1] * v[1] * dphi)
        
        dv_dphi = -(Gamma[1, 0, 0] * v[0] * dtheta + Gamma[1, 0, 1] * v[1] * dtheta +
                    Gamma[1, 1, 0] * v[0] * dphi + Gamma[1, 1, 1] * v[1] * dphi)
        
        # Mettre à jour le vecteur
        v[0] += dv_dtheta
        v[1] += dv_dphi
        
        # Normaliser pour rester sur la sphère
        v = v / np.linalg.norm(v)
        transported_vectors.append(v.copy())
    
    return np.array(transported_vectors)

# Exemple de transport parallèle le long d'un méridien
theta_path = np.linspace(0.1, np.pi-0.1, 100)
phi_path = np.zeros_like(theta_path)  # Méridien φ = 0

v_initial = np.array([1, 0])  # Vecteur initial
transported = parallel_transport_sphere(theta_path[0], phi_path[0], v_initial, theta_path, phi_path)

# Visualiser le transport parallèle
ax = axes[1, 0]
ax.plot(theta_path, transported[:, 0], 'b-', label='Composante θ', linewidth=2)
ax.plot(theta_path, transported[:, 1], 'r-', label='Composante φ', linewidth=2)
ax.set_xlabel('θ')
ax.set_ylabel('Composantes du vecteur')
ax.set_title('Transport parallèle le long d\'un méridien')
ax.legend()
ax.grid(True, alpha=0.3)

# Visualiser l'angle de rotation
ax = axes[1, 1]
angles = np.arctan2(transported[:, 1], transported[:, 0])
ax.plot(theta_path, angles, 'g-', linewidth=2)
ax.set_xlabel('θ')
ax.set_ylabel('Angle de rotation')
ax.set_title('Rotation du vecteur transporté parallèlement')
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## 3. Courbure de Riemann

### Tenseur de Courbure

Le **tenseur de courbure de Riemann** R mesure la déviation de la géométrie locale par rapport à l'espace euclidien.

### Courbure Sectionnelle

Pour un plan Π engendré par deux vecteurs u et v, la **courbure sectionnelle** est :
```
K(Π) = R(u,v,u,v) / [|u|²|v|² - ⟨u,v⟩²]
```

```python
# Calcul de la courbure pour la sphère
def riemann_tensor_sphere(theta, phi):
    """Composantes du tenseur de Riemann pour la sphère"""
    # Pour la sphère de rayon R, les seules composantes non-nulles sont :
    # R^θ_φθφ = sin²(θ)
    R = np.zeros((2, 2, 2, 2))
    R[0, 1, 0, 1] = np.sin(theta)**2
    R[0, 1, 1, 0] = -np.sin(theta)**2
    R[1, 0, 0, 1] = -np.sin(theta)**2
    R[1, 0, 1, 0] = np.sin(theta)**2
    return R

def sectional_curvature_sphere(theta, phi, u, v):
    """Courbure sectionnelle pour la sphère"""
    # Pour la sphère de rayon 1, K = 1 partout
    return 1.0

# Visualiser la courbure de la sphère
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Sphère avec courbure codée par couleur
ax1 = fig.add_subplot(2, 2, 1, projection='3d')
u = np.linspace(0, 2 * np.pi, 30)
v = np.linspace(0, np.pi, 30)
x = np.outer(np.cos(u), np.sin(v))
y = np.outer(np.sin(u), np.sin(v))
z = np.outer(np.ones(np.size(u)), np.cos(v))

# Courbure constante = 1 pour la sphère
curvature = np.ones_like(x)
surface = ax1.plot_surface(x, y, z, facecolors=plt.cm.viridis(curvature), alpha=0.8)
ax1.set_title('Sphère : Courbure constante K = 1')

# Comparaison avec le plan (courbure = 0)
ax2 = fig.add_subplot(2, 2, 2)
x_plane = np.linspace(-2, 2, 50)
y_plane = np.linspace(-2, 2, 50)
X_plane, Y_plane = np.meshgrid(x_plane, y_plane)
curvature_plane = np.zeros_like(X_plane)
contour = ax2.contourf(X_plane, Y_plane, curvature_plane, levels=20, cmap='viridis')
ax2.set_title('Plan : Courbure constante K = 0')
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_aspect('equal')
plt.colorbar(contour, ax=ax2)

# Géométrie hyperbolique (courbure négative)
ax3 = fig.add_subplot(2, 2, 3)
x_hyp = np.linspace(-0.9, 0.9, 50)
y_hyp = np.linspace(-0.9, 0.9, 50)
X_hyp, Y_hyp = np.meshgrid(x_hyp, y_hyp)
r_squared = X_hyp**2 + Y_hyp**2
valid_mask = r_squared < 1
curvature_hyp = np.zeros_like(X_hyp)
curvature_hyp[valid_mask] = -1  # Courbure constante négative
contour = ax3.contourf(X_hyp, Y_hyp, curvature_hyp, levels=20, cmap='RdBu_r')
ax3.set_title('Disque de Poincaré : Courbure constante K = -1')
ax3.set_xlabel('x')
ax3.set_ylabel('y')
ax3.set_aspect('equal')
plt.colorbar(contour, ax=ax3)

# Visualisation des triangles dans différentes géométries
ax4 = fig.add_subplot(2, 2, 4)

# Triangle dans le plan euclidien
triangle_euclidean = np.array([[0, 0], [1, 0], [0.5, np.sqrt(3)/2], [0, 0]])
ax4.plot(triangle_euclidean[:, 0], triangle_euclidean[:, 1], 'b-', linewidth=2, label='Euclidien')

# Triangle sur la sphère (approximation)
theta_tri = np.array([0, np.pi/3, np.pi/6, 0])
phi_tri = np.array([0, 0, np.pi/4, 0])
x_tri = np.cos(phi_tri) * np.sin(theta_tri)
y_tri = np.sin(phi_tri) * np.sin(theta_tri)
ax4.plot(x_tri, y_tri, 'r-', linewidth=2, label='Sphérique')

ax4.set_xlim(-0.5, 1.5)
ax4.set_ylim(-0.5, 1.5)
ax4.set_title('Comparaison des triangles')
ax4.legend()
ax4.set_aspect('equal')
ax4.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("Observations importantes:")
print("1. Sphère : courbure positive → somme des angles > 180°")
print("2. Plan : courbure nulle → somme des angles = 180°")
print("3. Hyperbolique : courbure négative → somme des angles < 180°")
```

## 4. Géodésiques et Distance

### Équation des Géodésiques

Une courbe γ(t) est une **géodésique** si elle satisfait :
```math
d²γ^k/dt² + Γ^k_ij (dγ^i/dt)(dγ^j/dt) = 0
```

### Distance Géodésique

La **distance géodésique** entre deux points est la longueur de la géodésique les reliant.

```python
# Résolution numérique des géodésiques sur la sphère
def geodesic_sphere(theta0, phi0, v0, t_max=2*np.pi, n_points=100):
    """Calcule une géodésique sur la sphère"""
    t = np.linspace(0, t_max, n_points)
    dt = t[1] - t[0]
    
    # Conditions initiales
    theta = np.zeros_like(t)
    phi = np.zeros_like(t)
    dtheta_dt = np.zeros_like(t)
    dphi_dt = np.zeros_like(t)
    
    theta[0] = theta0
    phi[0] = phi0
    dtheta_dt[0] = v0[0]
    dphi_dt[0] = v0[1]
    
    # Intégration numérique (méthode d'Euler)
    for i in range(1, n_points):
        # Calculer les symboles de Christoffel
        Gamma, _, _ = christoffel_sphere(theta[i-1], phi[i-1])
        
        # Équations des géodésiques
        d2theta_dt2 = -(Gamma[0, 0, 0] * dtheta_dt[i-1]**2 + 
                        2 * Gamma[0, 0, 1] * dtheta_dt[i-1] * dphi_dt[i-1] +
                        Gamma[0, 1, 1] * dphi_dt[i-1]**2)
        
        d2phi_dt2 = -(Gamma[1, 0, 0] * dtheta_dt[i-1]**2 + 
                      2 * Gamma[1, 0, 1] * dtheta_dt[i-1] * dphi_dt[i-1] +
                      Gamma[1, 1, 1] * dphi_dt[i-1]**2)
        
        # Mise à jour
        dtheta_dt[i] = dtheta_dt[i-1] + d2theta_dt2 * dt
        dphi_dt[i] = dphi_dt[i-1] + d2phi_dt2 * dt
        
        theta[i] = theta[i-1] + dtheta_dt[i] * dt
        phi[i] = phi[i-1] + dphi_dt[i] * dt
    
    # Convertir en coordonnées cartésiennes
    x = np.sin(theta) * np.cos(phi)
    y = np.sin(theta) * np.sin(phi)
    z = np.cos(theta)
    
    return x, y, z, theta, phi

# Calculer plusieurs géodésiques
fig = plt.figure(figsize=(15, 5))

# Géodésiques sur la sphère
ax1 = fig.add_subplot(131, projection='3d')

# Sphère de référence
u = np.linspace(0, 2 * np.pi, 20)
v = np.linspace(0, np.pi, 20)
x_sphere = np.outer(np.cos(u), np.sin(v))
y_sphere = np.outer(np.sin(u), np.sin(v))
z_sphere = np.outer(np.ones(np.size(u)), np.cos(v))
ax1.plot_surface(x_sphere, y_sphere, z_sphere, alpha=0.3, color='lightblue')

# Différentes géodésiques
geodesics = []
colors = ['red', 'green', 'blue', 'orange']

for i, color in enumerate(colors):
    theta0 = np.pi/4 + i * np.pi/8
    phi0 = 0
    v0 = np.array([0.5, 1.0])  # Vitesse initiale
    
    x, y, z, theta, phi = geodesic_sphere(theta0, phi0, v0)
    ax1.plot(x, y, z, color=color, linewidth=3, label=f'Géodésique {i+1}')

ax1.set_title('Géodésiques sur la Sphère')
ax1.legend()

# Comparaison avec les "lignes droites" dans différentes géométries
ax2 = fig.add_subplot(132)

# Ligne droite dans le plan euclidien
x_euclidean = np.linspace(-2, 2, 100)
y_euclidean = 0.5 * x_euclidean + 1
ax2.plot(x_euclidean, y_euclidean, 'b-', linewidth=2, label='Euclidien')

# Géodésique hyperbolique (arc de cercle orthogonal au bord)
theta_hyp = np.linspace(-np.pi/3, np.pi/3, 100)
r_hyp = 0.8
x_hyp = r_hyp * np.cos(theta_hyp)
y_hyp = r_hyp * np.sin(theta_hyp)
ax2.plot(x_hyp, y_hyp, 'r-', linewidth=2, label='Hyperbolique')

# Cercle unité (bord du disque de Poincaré)
circle_theta = np.linspace(0, 2*np.pi, 100)
circle_x = np.cos(circle_theta)
circle_y = np.sin(circle_theta)
ax2.plot(circle_x, circle_y, 'k--', linewidth=1, alpha=0.5)

ax2.set_xlim(-1.5, 1.5)
ax2.set_ylim(-1.5, 1.5)
ax2.set_aspect('equal')
ax2.set_title('Géodésiques dans différentes géométries')
ax2.legend()
ax2.grid(True, alpha=0.3)

# Visualisation de la distance géodésique
ax3 = fig.add_subplot(133)

# Distance entre deux points sur la sphère
def spherical_distance(theta1, phi1, theta2, phi2):
    """Distance géodésique entre deux points sur la sphère"""
    # Formule de la distance sphérique
    cos_delta = (np.sin(theta1) * np.sin(theta2) * np.cos(phi1 - phi2) + 
                 np.cos(theta1) * np.cos(theta2))
    return np.arccos(np.clip(cos_delta, -1, 1))

# Calculer la distance entre le pôle nord et différents points
theta_north = 0
phi_north = 0
theta_points = np.linspace(0, np.pi, 50)
phi_points = np.zeros_like(theta_points)

distances = []
for theta, phi in zip(theta_points, phi_points):
    dist = spherical_distance(theta_north, phi_north, theta, phi)
    distances.append(dist)

ax3.plot(theta_points, distances, 'g-', linewidth=2)
ax3.set_xlabel('θ (latitude)')
ax3.set_ylabel('Distance géodésique')
ax3.set_title('Distance du pôle nord')
ax3.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## 5. Applications en Physique

### Relativité Générale

La géométrie riemannienne est le cadre mathématique de la relativité générale, où la métrique de l'espace-temps est déterminée par la distribution de matière.

### Équations d'Einstein

```math
G_μν + Λ g_μν = (8πG/c⁴) T_μν
```

où G_μν est le tenseur d'Einstein, g_μν la métrique, et T_μν le tenseur énergie-impulsion.

```python
# Visualisation de l'espace-temps courbé
def schwarzschild_metric(r, rs=1):
    """Métrique de Schwarzschild pour un trou noir de masse M"""
    if r <= rs:
        return None  # En dessous de l'horizon des événements
    
    return np.array([
        [-(1 - rs/r), 0, 0, 0],
        [0, 1/(1 - rs/r), 0, 0],
        [0, 0, r**2, 0],
        [0, 0, 0, r**2 * np.sin(np.pi/2)**2]  # θ = π/2
    ])

# Visualiser la métrique de Schwarzschild
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

r_range = np.linspace(1.1, 10, 100)
rs = 1  # Rayon de Schwarzschild

# Composantes de la métrique
g_tt = -(1 - rs/r_range)
g_rr = 1/(1 - rs/r_range)

axes[0, 0].plot(r_range, g_tt, 'b-', linewidth=2, label='g_tt')
axes[0, 0].axvline(x=rs, color='red', linestyle='--', label='Horizon (r_s)')
axes[0, 0].set_xlabel('r')
axes[0, 0].set_ylabel('g_tt')
axes[0, 0].set_title('Composante temporelle de la métrique')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

axes[0, 1].plot(r_range, g_rr, 'r-', linewidth=2, label='g_rr')
axes[0, 1].axvline(x=rs, color='red', linestyle='--', label='Horizon (r_s)')
axes[0, 1].set_xlabel('r')
axes[0, 1].set_ylabel('g_rr')
axes[0, 1].set_title('Composante radiale de la métrique')
axes[0, 1].legend()
axes[0, 1].grid(True, alpha=0.3)

# Géodésiques dans l'espace-temps de Schwarzschild
def schwarzschild_geodesic(r0, dr_dt0, phi0, dphi_dt0, t_max=10, n_points=1000):
    """Géodésique dans l'espace-temps de Schwarzschild (approximation)"""
    t = np.linspace(0, t_max, n_points)
    dt = t[1] - t[0]
    
    r = np.zeros_like(t)
    phi = np.zeros_like(t)
    dr_dt = np.zeros_like(t)
    dphi_dt = np.zeros_like(t)
    
    r[0] = r0
    phi[0] = phi0
    dr_dt[0] = dr_dt0
    dphi_dt[0] = dphi_dt0
    
    rs = 1
    
    for i in range(1, n_points):
        if r[i-1] <= rs:
            break
            
        # Équations des géodésiques simplifiées
        d2r_dt2 = rs/(2*r[i-1]**2) * dr_dt[i-1]**2 + r[i-1] * dphi_dt[i-1]**2 * (1 - rs/r[i-1])
        d2phi_dt2 = -2/r[i-1] * dr_dt[i-1] * dphi_dt[i-1]
        
        dr_dt[i] = dr_dt[i-1] + d2r_dt2 * dt
        dphi_dt[i] = dphi_dt[i-1] + d2phi_dt2 * dt
        
        r[i] = r[i-1] + dr_dt[i] * dt
        phi[i] = phi[i-1] + dphi_dt[i] * dt
    
    return r[:i], phi[:i]

# Différentes orbites
r_orbit1, phi_orbit1 = schwarzschild_geodesic(5, 0, 0, 0.3)
r_orbit2, phi_orbit2 = schwarzschild_geodesic(8, 0, 0, 0.2)
r_orbit3, phi_orbit3 = schwarzschild_geodesic(3, 0.1, 0, 0.4)

# Convertir en coordonnées cartésiennes
x1 = r_orbit1 * np.cos(phi_orbit1)
y1 = r_orbit1 * np.sin(phi_orbit1)
x2 = r_orbit2 * np.cos(phi_orbit2)
y2 = r_orbit2 * np.sin(phi_orbit2)
x3 = r_orbit3 * np.cos(phi_orbit3)
y3 = r_orbit3 * np.sin(phi_orbit3)

axes[1, 0].plot(x1, y1, 'b-', linewidth=2, label='Orbite circulaire')
axes[1, 0].plot(x2, y2, 'g-', linewidth=2, label='Orbite elliptique')
axes[1, 0].plot(x3, y3, 'r-', linewidth=2, label='Orbite capturée')

# Trou noir (horizon des événements)
circle = plt.Circle((0, 0), rs, color='black', alpha=0.8)
axes[1, 0].add_patch(circle)
axes[1, 0].set_xlim(-10, 10)
axes[1, 0].set_ylim(-10, 10)
axes[1, 0].set_aspect('equal')
axes[1, 0].set_title('Géodésiques dans l\'espace-temps de Schwarzschild')
axes[1, 0].legend()
axes[1, 0].grid(True, alpha=0.3)

# Courbure de l'espace-temps
r_curvature = np.linspace(1.1, 10, 100)
curvature = rs / (2 * r_curvature**3)  # Approximation de la courbure

axes[1, 1].plot(r_curvature, curvature, 'purple', linewidth=2)
axes[1, 1].axvline(x=rs, color='red', linestyle='--', label='Horizon (r_s)')
axes[1, 1].set_xlabel('r')
axes[1, 1].set_ylabel('Courbure')
axes[1, 1].set_title('Courbure de l\'espace-temps')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("Applications de la géométrie riemannienne en physique:")
print("1. Relativité générale : espace-temps courbé par la matière")
print("2. Cosmologie : évolution de l'univers")
print("3. Physique des particules : théories de jauge")
print("4. Théorie des cordes : variétés de Calabi-Yau")
```

## Exercices

### Exercice 1 : Métrique sur le Cylindre
Calculer la métrique induite sur un cylindre de rayon $R$ et montrer que ses géodésiques sont des hélices.

### Exercice 2 : Transport Parallèle
Montrer qu'un vecteur transporté parallèlement le long d'un triangle sur la sphère subit une rotation égale à l'aire du triangle.

### Exercice 3 : Courbure de Gauss
Calculer la courbure de Gauss d'une surface de révolution et vérifier le théorème de Gauss-Bonnet.

### Exercice 4 : Géodésiques de Schwarzschild
Résoudre analytiquement les géodésiques circulaires dans l'espace-temps de Schwarzschild.

## Conclusion

Ce notebook a exploré les concepts fondamentaux de la géométrie riemannienne :

1. **Métriques riemanniennes** : Structure géométrique de base
2. **Connexions** : Transport parallèle et dérivation covariante
3. **Courbure** : Déviation de la géométrie euclidienne
4. **Géodésiques** : Chemins de longueur minimale
5. **Applications physiques** : Relativité générale et cosmologie

Ces concepts constituent le fondement de notre compréhension moderne de l'espace, du temps et de la gravité.

## Références

- Do Carmo, M. "Riemannian Geometry"
- Lee, J. "Introduction to Riemannian Manifolds"
- Misner, C., Thorne, K., Wheeler, J. "Gravitation"
- Wald, R. "General Relativity"
