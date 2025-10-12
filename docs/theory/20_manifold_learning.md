## Module 7.1 : Manifold Learning - Apprendre la Géométrie des Données

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Les Données ne Vivent pas dans un Vide

En science des données, nous sommes souvent confrontés à des données de très grande dimension : une image de 100x100 pixels est un point dans un espace à 10 000 dimensions ; un document texte peut être représenté par un vecteur de la taille du vocabulaire. Cependant, il est très peu probable que les données "intéressantes" remplissent uniformément cet espace de grande dimension. Au contraire, elles ont tendance à se concentrer sur des structures de plus faible dimension, des **variétés** (manifolds), qui sont plongées dans l'espace ambiant.

C'est l'**hypothèse de la variété (manifold hypothesis)**. Par exemple, l'ensemble de toutes les images possibles de visages humains est un sous-ensemble minuscule de l'espace de toutes les images possibles. Ce sous-ensemble a une structure : on peut passer continûment d'un visage à un autre en changeant l'âge, l'expression, l'orientation, etc. Cette structure est une variété de faible dimension.

Le **Manifold Learning** (ou apprentissage de variétés) est un ensemble de techniques de réduction de dimensionnalité non-linéaire qui cherchent à découvrir et à exploiter cette structure de variété sous-jacente. L'objectif n'est pas seulement de réduire le nombre de dimensions pour combattre le "fléau de la dimensionnalité", mais aussi de trouver une représentation plus significative des données qui respecte leur géométrie intrinsèque.

## 1. Les Limites des Méthodes Linéaires : PCA

L'**Analyse en Composantes Principales (PCA)** est la technique de réduction de dimensionnalité la plus connue. Elle trouve les directions de plus grande variance dans les données et projette les données sur un sous-espace linéaire de plus faible dimension. Le PCA est extrêmement efficace si les données se trouvent sur ou près d'un sous-espace linéaire.

Cependant, si les données se trouvent sur une variété courbe, le PCA échoue lamentablement. L'exemple classique est le **"Swiss Roll"** (rouleau suisse) : un nuage de points 2D enroulé sur lui-même dans un espace 3D. Le PCA, cherchant à préserver les grandes distances euclidiennes, va écraser le rouleau et ne pas parvenir à le "dérouler" correctement. Les points qui sont loin dans l'espace 3D (aux extrémités opposées du rouleau) peuvent être très proches si l'on suit la surface de la variété.

## 2. Techniques de Manifold Learning

Les algorithmes de Manifold Learning visent à surmonter cette limitation en se concentrant sur la préservation des distances et des voisinages **locaux**.

### Isomap (Isometric Mapping)

Isomap est l'une des premières et des plus intuitives techniques de Manifold Learning. Il généralise l'idée de la mise à l'échelle multidimensionnelle (MDS), qui préserve les distances par paires, en remplaçant la distance euclidienne par la **distance géodésique** sur la variété.

L'algorithme se déroule en trois étapes :
1.  **Construction du graphe de voisinage** : Pour chaque point, on trouve ses *k* plus proches voisins (ou tous les voisins dans un rayon \epsilon) et on construit un graphe où les arêtes relient ces voisins.
2.  **Calcul des distances géodésiques** : On approxime la distance géodésique entre deux points quelconques par la distance du plus court chemin entre eux dans ce graphe (en utilisant un algorithme comme Dijkstra ou Floyd-Warshall).
3.  **Plongement (Embedding)** : On utilise l'algorithme de MDS classique sur la matrice des distances géodésiques pour trouver un plongement de faible dimension qui préserve au mieux ces distances.

Isomap est très efficace pour "dérouler" des variétés comme le Swiss Roll.

### LLE (Locally Linear Embedding)

LLE adopte une approche différente. Il suppose que la variété est localement linéaire, c'est-à-dire que chaque point peut être bien approximé par une combinaison linéaire de ses voisins.

1.  **Reconstruction linéaire locale** : Pour chaque point *x_i*, on trouve ses *k* plus proches voisins. On cherche ensuite les poids *W_ij* qui permettent de reconstruire au mieux *x_i* à partir de ses voisins, en minimisant l'erreur ||x_i - \Sigma_j W_ij x_j||².
2.  **Plongement global** : On cherche ensuite des points *y_i* dans l'espace de faible dimension qui sont le mieux reconstruits par leurs voisins en utilisant les **mêmes poids** *W_ij*. On minimise la fonction de coût \Sigma_i ||y_i - \Sigma_j W_ij y_j||².

LLE est efficace pour trouver des plongements qui préservent les voisinages locaux.

### t-SNE (t-Distributed Stochastic Neighbor Embedding)

t-SNE est une technique extrêmement populaire, en particulier pour la **visualisation** de données de grande dimension. Son objectif est de préserver les voisinages locaux, en s'assurant que les points qui sont proches dans l'espace de grande dimension le restent dans l'espace de faible dimension.

1.  **Probabilités dans l'espace d'origine** : t-SNE convertit les distances euclidiennes en probabilités conditionnelles *p_j|i* qui représentent la similarité du point *x_j* par rapport à *x_i*. On utilise une distribution gaussienne centrée sur *x_i*.
2.  **Probabilités dans l'espace de faible dimension** : On définit des probabilités similaires *q_ij* dans l'espace de faible dimension, mais en utilisant une distribution de Student (t-distribution) à longue queue. L'utilisation de cette distribution permet de mieux séparer les clusters et d'éviter que les points ne s'agglutinent au centre.
3.  **Minimisation de la divergence** : L'algorithme minimise la divergence de Kullback-Leibler entre les distributions de probabilités conjointes P et Q, ce qui force les deux représentations à avoir des similarités similaires.

t-SNE produit des visualisations souvent spectaculaires, avec des clusters bien séparés, mais il faut être prudent dans leur interprétation : les distances globales et les tailles des clusters dans un graphique t-SNE ne sont généralement pas significatives.

### UMAP (Uniform Manifold Approximation and Projection)

UMAP est un concurrent plus récent de t-SNE, qui est souvent plus rapide et préserve mieux la structure globale des données. Il est basé sur des fondements mathématiques solides issus de la topologie riemannienne et de la topologie algébrique.

1.  **Construction d'un graphe topologique** : UMAP construit un graphe de voisinage pondéré dans l'espace de grande dimension, en supposant que les données sont uniformément distribuées sur une variété localement riemannienne.
2.  **Optimisation dans l'espace de faible dimension** : Il cherche ensuite un plongement de faible dimension qui a une structure topologique aussi proche que possible, en minimisant une fonction de coût de type "entropie croisée" (cross-entropy).

## Conclusion

Le Manifold Learning est un ensemble d'outils puissants qui nous permet de "voir" la structure intrinsèque de nos données. En passant d'une vision purement euclidienne à une vision basée sur la géométrie de la variété, ces techniques peuvent révéler des relations non-linéaires complexes et fournir des représentations de plus faible dimension qui sont plus significatives et plus utiles pour les tâches de visualisation, de clustering ou de classification.

Ces idées sont au cœur de l'apprentissage de représentations (representation learning) moderne. Dans les modules suivants, nous verrons comment des concepts similaires sont utilisés pour apprendre des représentations de mots (Word Embeddings) et de graphes (Graph Embeddings), en définissant des notions de "proximité" et de "géométrie" dans des espaces de plus en plus abstraits.

---

## Références

[1] Tenenbaum, J. B., de Silva, V., & Langford, J. C. (2000). *A global geometric framework for nonlinear dimensionality reduction*. Science, 290(5500), 2319-2323.
[2] Roweis, S. T., & Saul, L. K. (2000). *Nonlinear dimensionality reduction by locally linear embedding*. Science, 290(5500), 2323-2326.
[3] van der Maaten, L., & Hinton, G. (2008). *Visualizing data using t-SNE*. Journal of Machine Learning Research, 9(Nov), 2579-2605.
[4] McInnes, L., Healy, J., & Melville, J. (2018). *UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction*. arXiv preprint arXiv:1802.03426.

