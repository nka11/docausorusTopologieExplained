## Module 8.1 : Arbres Métriques et Recherche Spatiale

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Organiser l'Espace

De nombreuses applications en informatique, du machine learning aux bases de données, en passant par la vision par ordinateur et la robotique, reposent sur une tâche fondamentale : la **recherche des plus proches voisins (Nearest Neighbor Search - NNS)**. Étant donné un ensemble de points dans un espace, comment trouver efficacement le point le plus proche d'un nouveau point de requête ?

L'approche naïve, qui consiste à calculer la distance entre le point de requête et tous les autres points de l'ensemble, a une complexité linéaire O(N), ce qui est beaucoup trop lent pour de grands ensembles de données. Pour accélérer cette recherche, nous avons besoin de structures de données qui organisent les points en fonction de leur position dans l'espace. Les **arbres de partitionnement de l'espace (space-partitioning trees)**, comme les k-d trees et les ball trees, sont des solutions classiques à ce problème.

Ces structures de données sont des exemples concrets de la manière dont les concepts géométriques et topologiques (distance, voisinage, partitionnement) sont utilisés pour construire des algorithmes efficaces. Elles sont la base de nombreux algorithmes de clustering, de classification (comme le k-NN) et de Manifold Learning.

## 1. Le Problème de la Recherche des Plus Proches Voisins (NNS)

- **Problème** : Étant donné un ensemble *P* de *n* points dans un espace métrique (un espace où une notion de distance est définie), et un point de requête *q*, trouver le point *p* dans *P* qui minimise la distance *d(p, q)*.
- **Variante k-NNS** : Trouver les *k* points les plus proches.

Le défi est de prétraiter l'ensemble *P* pour pouvoir répondre à des requêtes NNS beaucoup plus rapidement qu'en temps linéaire.

## 2. k-d Trees (k-dimensional trees)

Le **k-d tree** est l'une des structures de données de partitionnement de l'espace les plus connues. Il partitionne récursivement l'espace en deux à l'aide de hyperplans alignés sur les axes.

### Construction

1.  Choisir un axe de coordonnées (souvent en alternant entre les axes à chaque niveau de l'arbre).
2.  Trouver la **médiane** des points le long de cet axe.
3.  Placer le point médian dans le nœud actuel de l'arbre.
4.  Créer un hyperplan passant par ce point médian et perpendiculaire à l'axe choisi. Cet hyperplan divise l'espace en deux demi-espaces.
5.  Appliquer récursivement le processus aux points se trouvant dans le demi-espace gauche (pour construire le sous-arbre gauche) et aux points se trouvant dans le demi-espace droit (pour construire le sous-arbre droit).

Le résultat est un arbre binaire où chaque nœud représente une région de l'espace.

### Recherche

Pour trouver le plus proche voisin d'un point de requête *q*, on parcourt l'arbre de la racine à une feuille, en choisissant à chaque nœud le sous-arbre qui contient *q*. Cela nous donne un premier candidat pour le plus proche voisin.

Cependant, le vrai plus proche voisin pourrait se trouver de l'autre côté d'un hyperplan de partitionnement. L'algorithme doit donc **remonter** dans l'arbre (**backtracking**). À chaque nœud parent, il vérifie si la sphère centrée sur *q* avec un rayon égal à la distance au meilleur voisin actuel intersecte l'autre demi-espace. Si c'est le cas, il doit explorer l'autre sous-arbre, car il pourrait contenir un point encore plus proche.

**Avantages** : Simple à implémenter. Très efficace en faible dimension (généralement D < 20), avec un temps de recherche moyen de O(log N).
**Inconvénients** : La performance se dégrade rapidement avec la dimension. En grande dimension (le "fléau de la dimensionnalité"), la plupart des requêtes nécessitent d'explorer presque tout l'arbre, et la performance se rapproche de la recherche linéaire O(N).

## 3. Ball Trees

Les **Ball Trees** (ou arbres de boules) surmontent certaines des limitations des k-d trees, en particulier en grande dimension et pour des métriques non-euclidiennes. Au lieu de diviser l'espace avec des hyperplans, ils le partitionnent avec des hypersphères (des "boules").

### Construction

Chaque nœud de l'arbre représente une **boule** (définie par un centre et un rayon) qui contient un sous-ensemble des points de données.

1.  La racine de l'arbre est une boule qui contient tous les points.
2.  Pour un nœud donné, on choisit deux centres et on partitionne les points en deux ensembles, en assignant chaque point au centre le plus proche.
3.  On calcule la boule minimale contenant chacun de ces deux ensembles. Ces deux boules deviennent les enfants du nœud actuel.
4.  On répète le processus jusqu'à ce qu'un nœud ne contienne qu'un petit nombre de points.

### Recherche

La recherche est similaire à celle du k-d tree. On parcourt l'arbre en choisissant à chaque fois la boule enfant la plus prometteuse. L'avantage est que l'on peut utiliser l'inégalité triangulaire pour élaguer efficacement des branches entières de l'arbre. Si la distance entre le point de requête et le centre d'une boule, moins son rayon, est plus grande que la distance au meilleur voisin actuel, alors il est impossible que cette boule contienne un point plus proche, et on peut l'ignorer complètement.

**Avantages** : Plus efficace que les k-d trees en grande dimension. Fonctionne avec n'importe quelle métrique de distance (pas seulement euclidienne).
**Inconvénients** : Plus coûteux à construire.

## 4. Autres Structures de Données Spatiales

- **Quadtrees / Octrees** : Utilisés pour des données 2D (Quadtree) ou 3D (Octree). Ils divisent récursivement l'espace en quatre quadrants ou huit octants. Très utilisés en graphisme par ordinateur et en simulation physique.

- **R-trees** : Utilisés dans les bases de données spatiales pour indexer des objets étendus (comme des rectangles ou des polygones) et pas seulement des points. Chaque nœud de l'arbre correspond à un "rectangle englobant" minimum qui contient tous les objets de ses enfants.

- **Cover Trees** : Une structure de données plus récente, basée sur des idées topologiques. Elle est particulièrement efficace car sa complexité de construction et de recherche ne dépend que de la "constante de doublement" intrinsèque de l'ensemble de données, et non de la dimension de l'espace ambiant.

## Conclusion

Les arbres de partitionnement de l'espace sont des outils algorithmiques fondamentaux qui traduisent des concepts géométriques en performance de calcul. Ils nous permettent de naviguer efficacement dans des espaces de grande dimension en exploitant la structure de proximité des données.

Le choix de la bonne structure dépend de la dimensionnalité des données, de la métrique utilisée et du compromis entre le coût de construction de l'arbre et la vitesse de recherche. Ces structures sont les briques de base sur lesquelles reposent de nombreux algorithmes de machine learning, rendant possible l'analyse de millions de points de données en des temps raisonnables. Elles illustrent parfaitement comment l'organisation intelligente des données, basée sur leur géométrie, est la clé pour surmonter les défis de l'échelle et de la complexité.

---

## Références

[1] Bentley, J. L. (1975). *Multidimensional binary search trees used for associative searching*. Communications of the ACM, 18(9), 509-517.
[2] Omohundro, S. M. (1989). *Five balltree construction algorithms*. International Computer Science Institute.
[3] Samet, H. (1990). *The Design and Analysis of Spatial Data Structures*. Addison-Wesley.

