# Courbure de Ricci et Géométrie Riemannienne

## Introduction à la Courbure de Ricci

La **courbure de Ricci** est un tenseur fondamental en géométrie riemannienne qui mesure la déviation de la géométrie locale par rapport à l'espace euclidien. Elle joue un rôle central en relativité générale et en analyse géométrique.

### Définition du Tenseur de Ricci

Le **tenseur de Ricci** R_ij est défini comme la trace du tenseur de courbure de Riemann :

```
R\_ij = R^k\_kij = g^kl R\_kilj
```

où R_kilj sont les composantes du tenseur de Riemann et g^kl est la métrique inverse.

### Formule de Ricci

En coordonnées locales, le tenseur de Ricci s'exprime comme :

```
R\_ij = ∂Γ^k\_ij/∂x^k - ∂Γ^k\_ik/∂x^j + Γ^l\_ij Γ^k\_lk - Γ^l\_ik Γ^k\_lj
```

## Propriétés du Tenseur de Ricci

### Symétrie

Le tenseur de Ricci est **symétrique** :
```
R\_ij = R\_ji
```

Cette propriété découle directement de la symétrie du tenseur de Riemann.

### Trace : Courbure Scalaire

La **courbure scalaire** $R$ est définie comme la trace du tenseur de Ricci :

$$R = g^{ij} R_{ij} = R_i^i$$

Elle mesure la courbure totale en chaque point de la variété.

## Interprétation Géométrique

### Courbure Sectionnelle et Ricci

La courbure de Ricci peut être interprétée en termes de **courbure sectionnelle moyenne**. Pour un vecteur unitaire v :

```
Ric(v,v) = Σ_{i=1}^{n-1} K(v, e\_i)
```

où \{e\_i\} est une base orthonormale complétant v, et K(v,e\_i) est la courbure sectionnelle du plan engendré par v et e\_i.

### Évolution du Volume

La courbure de Ricci contrôle l'évolution du volume d'une petite boule géodésique. Si V(r) est le volume d'une boule de rayon r :

```
d²V/dr²|_{r=0} = -(1/3) R
```

## Équations d'Einstein

### Tenseur d'Einstein

Le **tenseur d'Einstein** est défini comme :

```math
G\_ij = R\_ij - (1/2) R g\_ij
```

### Équations de Champ d'Einstein

En relativité générale, les équations d'Einstein relient la géométrie de l'espace-temps à la matière :

```math
G_ij + Λ g_ij = (8πG/c⁴) T_ij
```

où :
- T_ij est le tenseur énergie-impulsion
- Λ est la constante cosmologique
- G est la constante de gravitation
- c est la vitesse de la lumière

## Espaces à Courbure de Ricci Constante

### Variétés d'Einstein

Une variété est dite **d'Einstein** si :
$$R_{ij} = \lambda g_{ij}$$

pour une constante $\lambda$. Les exemples incluent :
- **Espaces de courbure constante** (sphères, espaces hyperboliques)
- **Variétés de Calabi-Yau**
- **Espaces symétriques**

### Espaces Ricci-plats

Les variétés **Ricci-plates** satisfont :
$$R_{ij} = 0$$

Exemples notables :
- **Variétés de Calabi-Yau** (dimension 6)
- **Variétés hyper-Kähler**
- **Tore plat**

## Flot de Ricci

### Définition

Le **flot de Ricci** est l'équation d'évolution :

```math
∂g\_ij/∂t = -2 R\_ij
```

Cette équation différentielle parabolique fait évoluer la métrique dans le temps.

### Applications

Le flot de Ricci est utilisé pour :
1. **Classification des variétés** (théorème de Thurston-Perelman)
2. **Construction de métriques canoniques**
3. **Analyse de la topologie** des variétés

## Calcul Numérique de la Courbure de Ricci

### Approximation Discrète

Pour une surface discrète, la courbure de Ricci peut être approchée par :

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.sparse import csr_matrix
from scipy.sparse.linalg import spsolve

def compute_discrete_ricci_curvature(vertices, faces):
    """
    Calcule la courbure de Ricci discrète pour une surface triangulée
    """
    n_vertices = len(vertices)
    
    # Construction du graphe de voisinage
    neighbors = [[] for _ in range(n_vertices)]
    for face in faces:
        for i in range(3):
            for j in range(3):
                if i != j:
                    neighbors[face[i]].append(face[j])
    
    # Calcul des angles et des aires
    angles = np.zeros(n_vertices)
    areas = np.zeros(n_vertices)
    
    for i, face in enumerate(faces):
        # Calcul de l'aire du triangle
        v0, v1, v2 = vertices[face[0]], vertices[face[1]], vertices[face[2]]
        area = 0.5 * np.linalg.norm(np.cross(v1 - v0, v2 - v0))
        
        # Répartition de l'aire sur les sommets
        for vertex_idx in face:
            areas[vertex_idx] += area / 3
        
        # Calcul des angles
        for j in range(3):
            vertex_idx = face[j]
            v_center = vertices[vertex_idx]
            v_prev = vertices[face[(j-1) % 3]]
            v_next = vertices[face[(j+1) % 3]]
            
            # Vecteurs
            vec1 = v_prev - v_center
            vec2 = v_next - v_center
            
            # Normalisation
            vec1 = vec1 / np.linalg.norm(vec1)
            vec2 = vec2 / np.linalg.norm(vec2)
            
            # Angle
            cos_angle = np.dot(vec1, vec2)
            angle = np.arccos(np.clip(cos_angle, -1, 1))
            angles[vertex_idx] += angle
    
    # Courbure de Gauss discrète
    gaussian_curvature = (2 * np.pi - angles) / areas
    
    # Approximation de la courbure de Ricci
    ricci_curvature = gaussian_curvature / 2  # Pour les surfaces
    
    return ricci_curvature

# Exemple : Sphère
def create_sphere(n_points=100):
    """Crée une sphère triangulée"""
    from scipy.spatial import ConvexHull
    
    # Points sur la sphère
    phi = np.linspace(0, 2*np.pi, n_points)
    theta = np.linspace(0, np.pi, n_points//2)
    
    vertices = []
    for t in theta:
        for p in phi:
            x = np.sin(t) * np.cos(p)
            y = np.sin(t) * np.sin(p)
            z = np.cos(t)
            vertices.append([x, y, z])
    
    vertices = np.array(vertices)
    
    # Triangulation
    hull = ConvexHull(vertices)
    faces = hull.simplices
    
    return vertices, faces

# Calcul et visualisation
vertices, faces = create_sphere(50)
ricci_curvature = compute_discrete_ricci_curvature(vertices, faces)

# Visualisation
fig = plt.figure(figsize=(12, 5))

# Vue 3D
ax1 = fig.add_subplot(121, projection='3d')
scatter = ax1.scatter(vertices[:, 0], vertices[:, 1], vertices[:, 2], 
                     c=ricci_curvature, cmap='RdBu_r', s=20)
ax1.set_title('Courbure de Ricci sur la Sphère')
plt.colorbar(scatter, ax=ax1)

# Histogramme
ax2 = fig.add_subplot(122)
ax2.hist(ricci_curvature, bins=30, alpha=0.7, edgecolor='black')
ax2.set_xlabel('Courbure de Ricci')
ax2.set_ylabel('Fréquence')
ax2.set_title('Distribution de la Courbure de Ricci')
ax2.axvline(np.mean(ricci_curvature), color='red', linestyle='--', 
           label=f'Moyenne: {np.mean(ricci_curvature):.3f}')
ax2.legend()

plt.tight_layout()
plt.show()
```

## Applications en Physique

### Relativité Générale

La courbure de Ricci apparaît naturellement dans :
- **Équations d'Einstein** : Relient géométrie et matière
- **Équations de champ** : Déterminent la métrique de l'espace-temps
- **Ondes gravitationnelles** : Propagation des perturbations

### Cosmologie

- **Modèles cosmologiques** : Évolution de l'univers
- **Constante cosmologique** : Expansion accélérée
- **Singularités** : Big Bang, trous noirs

## Applications en Machine Learning

### Géométrie de l'Information

La courbure de Ricci est utilisée dans :
- **Variétés d'information** : Statistiques géométriques
- **Optimisation** : Méthodes de gradient naturel
- **Analyse de données** : Détection de structures géométriques

### Réseaux de Neurones

- **Architectures géométriques** : Intégration de contraintes
- **Optimisation sur variétés** : Méthodes de gradient naturel
- **Apprentissage profond** : Géométrie des espaces de paramètres

## Conclusion

La courbure de Ricci est un concept fondamental qui :

1. **Unifie** la géométrie et la physique
2. **Quantifie** la déviation de l'espace euclidien
3. **Gouverne** l'évolution des systèmes géométriques
4. **Applications** en relativité générale et machine learning

Sa compréhension est essentielle pour l'analyse géométrique moderne et ses applications interdisciplinaires.
