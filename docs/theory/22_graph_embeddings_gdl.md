## Module 7.3 : Graph Embeddings et Geometric Deep Learning

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Le Défi des Données Non-Euclidiennes

Le succès spectaculaire du Deep Learning, en particulier des Réseaux de Neurones Convolutifs (CNN) pour les images et des Réseaux de Neurones Récurrents (RNN) pour le texte, a été largement confiné à des données avec une structure de grille régulière (euclidienne). Les images sont des grilles de pixels, le texte est une séquence 1D. Mais que faire des données dont la structure sous-jacente est un **graphe** ?

Les graphes sont omniprésents : réseaux sociaux, molécules, réseaux de connaissances, réseaux de transport, maillages 3D. Comment peut-on appliquer le deep learning à de telles données ? Comment définir une "convolution" sur un graphe où chaque nœud a un nombre variable de voisins et pas d'ordre canonique ?

Le **Geometric Deep Learning (GDL)** est un domaine émergent qui vise à généraliser les techniques de deep learning aux données non-euclidiennes, principalement les graphes et les variétés. Une idée fondamentale du GDL est l'**embedding de graphe (graph embedding)** : apprendre à représenter les nœuds, les arêtes, ou des graphes entiers comme des vecteurs dans un espace de faible dimension, de manière à ce que la structure du graphe soit préservée.

## 1. Embeddings de Nœuds (Node Embeddings)

L'objectif est d'apprendre une représentation vectorielle pour chaque nœud du graphe. L'intuition est similaire à celle des word embeddings : des nœuds qui ont des voisinages similaires dans le graphe devraient avoir des vecteurs proches dans l'espace d'embedding.

### Approches Basées sur la Marche Aléatoire

Ces méthodes s'inspirent directement de l'algorithme Skip-gram de Word2Vec.

1.  **Génération de "phrases"** : On simule de nombreuses **marches aléatoires** courtes à partir de chaque nœud du graphe. La séquence de nœuds visités lors d'une marche est traitée comme une "phrase".
2.  **Apprentissage de l'embedding** : On applique ensuite l'algorithme Skip-gram sur ce corpus de "phrases" de nœuds. L'algorithme apprend à prédire les nœuds voisins dans la marche aléatoire, et ce faisant, il apprend une représentation vectorielle pour chaque nœud.

- **DeepWalk** : La première méthode à populariser cette approche.
- **Node2Vec** : Améliore DeepWalk en introduisant des marches aléatoires "biaisées" qui peuvent interpoler entre une exploration en largeur (BFS, qui capture l'homophilie) et une exploration en profondeur (DFS, qui capture la similarité structurelle).

## 2. Réseaux de Neurones sur Graphes (Graph Neural Networks - GNNs)

Les embeddings de nœuds sont "transductifs" : ils ne peuvent pas générer d'embeddings pour des nœuds qui n'étaient pas vus pendant l'entraînement. Les **Réseaux de Neurones sur Graphes (GNNs)** sont une approche plus puissante et "inductive" qui apprend une fonction pour générer des embeddings de nœuds en se basant sur la structure du graphe.

L'idée centrale des GNNs est l'**agrégation de voisinage** (ou passage de messages). Pour chaque nœud, on met à jour sa représentation vectorielle en agrégeant les représentations de ses voisins.

> **Schéma d'Agrégation de Voisinage** :
> Pour chaque nœud *v* et à chaque couche *k* du réseau :
> 1.  **Agrégation** : Agréger les vecteurs de caractéristiques *h_u^(k-1)* de tous les voisins *u* de *v* pour former un "message" *m_v^k*.
> 2.  **Mise à jour** : Combiner le message agrégé *m_v^k* avec la propre représentation du nœud *v* de la couche précédente, *h_v^(k-1)*, pour obtenir sa nouvelle représentation *h_v^k*.

Après *k* couches d'agrégation, la représentation d'un nœud contient de l'information sur son voisinage à *k* sauts.

### Variantes de GNNs

Différents GNNs se distinguent par la manière dont ils implémentent les fonctions d'agrégation et de mise à jour.

- **Graph Convolutional Network (GCN)** : Utilise une agrégation simple (la moyenne des vecteurs des voisins, normalisée) et une transformation linéaire avec une fonction d'activation. C'est une approximation d'une convolution spectrale sur le graphe.

- **GraphSAGE** : Généralise le GCN en permettant d'utiliser des fonctions d'agrégation plus complexes (comme un max-pooling ou un LSTM) sur les voisins.

- **Graph Attention Network (GAT)** : Introduit des mécanismes d'**attention**. Lors de l'agrégation, le modèle apprend à donner des poids différents aux différents voisins, en se concentrant sur les plus importants pour la tâche à accomplir.

## 3. Le Point de Vue du Geometric Deep Learning : Symétrie et Invariance

Le GDL fournit un cadre théorique unificateur pour comprendre les GNNs, basé sur les idées du Programme d'Erlangen de Klein : la géométrie est l'étude des invariants sous un groupe de transformations.

- **Invariance par Permutation** : Un GNN doit produire les mêmes résultats quel que soit l'ordre dans lequel on présente les nœuds et les arêtes. Les fonctions d'agrégation (comme la somme ou la moyenne) sont intrinsèquement invariantes aux permutations des voisins, ce qui est une propriété essentielle.

- **Équivariance** : Si l'on renomme (permute) les nœuds du graphe, les embeddings de sortie devraient être renommés (permutés) de la même manière. Les GNNs basés sur le passage de messages sont naturellement équivariants à la permutation.

Le GDL cherche à construire des briques de base pour les réseaux de neurones (convolutions, pooling) qui respectent les symétries du domaine sous-jacent (le graphe, la variété).

## 4. Applications

Les GNNs ont révolutionné l'apprentissage sur les données structurées en graphe.

- **Classification de Nœuds** : Prédire une étiquette pour chaque nœud (ex: prédire la catégorie d'un article sur Wikipédia en se basant sur les liens hypertextes).
- **Prédiction de Liens** : Prédire s'il devrait y avoir une arête entre deux nœuds (ex: recommander des amis sur un réseau social).
- **Classification de Graphes** : Prédire une étiquette pour un graphe entier (ex: prédire si une molécule est toxique ou non).
- **Découverte de Médicaments** : Prédire les propriétés de molécules, leurs interactions avec des protéines.
- **Systèmes de Recommandation** : Modéliser les interactions utilisateurs-produits comme un graphe biparti.
- **Physique** : Simuler des systèmes de particules, reconstruire des trajectoires dans des détecteurs comme le LHC.

## Conclusion

Le Geometric Deep Learning et les GNNs étendent la portée du deep learning au-delà des données euclidiennes, en nous permettant d'apprendre directement à partir de données relationnelles complexes. En s'inspirant de la géométrie et de la théorie des groupes, le GDL fournit un cadre de principes pour concevoir des architectures de réseaux qui respectent les symétries inhérentes aux données.

L'idée d'apprendre des représentations (embeddings) qui préservent la structure est un thème unificateur qui relie le Manifold Learning, les Word Embeddings et les Graph Embeddings. C'est l'une des idées les plus puissantes de l'apprentissage automatique moderne, nous permettant de traduire des structures complexes en une géométrie que les algorithmes peuvent comprendre et exploiter.

---

## Références

[1] Bronstein, M. M., Bruna, J., LeCun, Y., Szlam, A., & Vandergheynst, P. (2017). *Geometric deep learning: going beyond euclidean data*. IEEE Signal Processing Magazine, 34(4), 18-42.
[2] Kipf, T. N., & Welling, M. (2016). *Semi-supervised classification with graph convolutional networks*. arXiv preprint arXiv:1609.02907.
[3] Veličković, P., et al. (2017). *Graph attention networks*. arXiv preprint arXiv:1710.10903.
[4] Hamilton, W. L., Ying, R., & Leskovec, J. (2017). *Inductive representation learning on large graphs*. Advances in neural information processing systems, 30.

