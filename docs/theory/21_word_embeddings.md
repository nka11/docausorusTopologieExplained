## Module 7.2 : Word Embeddings - La Géométrie du Langage

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : Donner un Sens aux Mots

Comment un ordinateur peut-il "comprendre" le sens des mots ? Traditionnellement, en traitement du langage naturel (NLP), les mots étaient traités comme des symboles discrets. Une approche courante était la représentation **one-hot**, où chaque mot du vocabulaire est un vecteur avec un 1 à sa propre position et des 0 partout ailleurs. Cette approche a deux inconvénients majeurs :

1.  **Grande dimensionnalité** : Les vecteurs sont de la taille du vocabulaire (des dizaines de milliers de dimensions).
2.  **Absence de sémantique** : Les vecteurs de mots différents sont orthogonaux. Le vecteur pour "roi" n'est pas plus proche du vecteur pour "reine" que du vecteur pour "crocodile".

Les **plongements de mots (Word Embeddings)** sont une solution révolutionnaire à ce problème. L'idée est de représenter les mots par des **vecteurs denses de faible dimension** (généralement entre 50 et 300 dimensions) dans un espace vectoriel continu. Ces vecteurs sont appris à partir de grands corpus de texte, et leur position dans l'espace est conçue pour capturer les relations sémantiques et syntaxiques entre les mots.

Cette approche repose sur l'**hypothèse distributionnelle** de la linguistique : "un mot est caractérisé par la compagnie qu'il fréquente" (J.R. Firth). Des mots qui apparaissent dans des contextes similaires auront des vecteurs similaires.

## 1. Modèles Prédictifs : Word2Vec

Développé par une équipe de Google dirigée par Tomáš Mikolov en 2013, **Word2Vec** a été un tournant pour le NLP. Il ne s'agit pas d'un seul algorithme, mais de deux architectures de réseaux de neurones simples pour apprendre les embeddings.

L'idée est de transformer l'apprentissage des embeddings en un problème de prédiction. On parcourt un grand texte avec une "fenêtre" de contexte.

### a) Skip-gram

Le modèle **Skip-gram** tente de **prédire les mots de contexte à partir d'un mot central**.
- **Entrée** : Le vecteur one-hot du mot central.
- **Sortie** : Les vecteurs one-hot des mots environnants dans la fenêtre de contexte.
- **L'astuce** : Le réseau de neurones n'a qu'une seule couche cachée linéaire. La véritable sortie de l'algorithme n'est pas la prédiction elle-même, mais les **poids de la couche cachée**. Cette matrice de poids, appelée la "matrice d'embedding", contient les vecteurs denses pour chaque mot du vocabulaire.

### b) Continuous Bag-of-Words (CBOW)

Le modèle **CBOW** fait l'inverse : il **prédit le mot central à partir de la somme des vecteurs des mots de contexte**.

Word2Vec est très efficace car il évite d'avoir une grande couche de sortie non-linéaire. Des techniques comme l'échantillonnage négatif (negative sampling) permettent d'optimiser le processus en ne mettant à jour qu'un petit sous-ensemble des poids à chaque étape.

## 2. Modèles Basés sur le Comptage : GloVe

Une autre approche consiste à d'abord construire une grande **matrice de co-occurrence** mot-mot à partir du corpus. L'entrée (i, j) de cette matrice compte le nombre de fois où le mot *j* apparaît dans le contexte du mot *i*.

Le problème est que ces matrices sont énormes et très creuses. Des techniques comme la SVD (Singular Value Decomposition) peuvent les réduire, mais elles ont du mal à capturer la structure sémantique fine.

**GloVe (Global Vectors)**, développé à Stanford, combine les avantages des modèles prédictifs et des modèles de comptage. Il est entraîné pour que le **produit scalaire** des vecteurs de deux mots soit proportionnel au **logarithme de leur probabilité de co-occurrence**.

## 3. La Géométrie de l'Espace d'Embedding

Le résultat le plus fascinant des word embeddings est que l'espace vectoriel résultant possède une structure sémantique étonnante. Les relations entre les mots sont capturées par des relations géométriques entre leurs vecteurs.

- **Similarité** : La similarité sémantique entre deux mots est mesurée par la **similarité cosinus** entre leurs vecteurs. Des mots comme "chien" et "chat" auront des vecteurs très proches.

- **Analogies** : L'espace d'embedding capture des relations analogiques par l'arithmétique vectorielle. L'exemple le plus célèbre est :

  **vecteur("roi") - vecteur("homme") + vecteur("femme") \approx vecteur("reine")**

Cela signifie que la direction du vecteur reliant "homme" à "femme" est la même que celle reliant "roi" à "reine". L'espace a appris le concept de "genre". De même, on trouve des relations comme "France" - "Paris" + "Berlin" \approx "Allemagne", capturant la relation "pays-capitale".

Cette structure géométrique montre que l'espace d'embedding n'est pas juste un nuage de points, mais une **variété** avec une structure locale et globale riche et significative.

## 4. Au-delà des Mots : Embeddings Contextualisés

Les modèles comme Word2Vec et GloVe ont une limitation majeure : ils assignent un seul vecteur à chaque mot, quel que soit son contexte. Or, un mot comme "banque" a des sens très différents dans "s'asseoir sur une banque" et "aller à la banque".

Les modèles de langage modernes, basés sur l'architecture **Transformer** (comme **BERT**, **ELMo**, **GPT**), ont résolu ce problème en créant des **embeddings contextualisés**.

- Dans ces modèles, l'embedding d'un mot n'est pas fixe. Il est calculé dynamiquement en fonction de la phrase entière dans laquelle il apparaît, en utilisant des mécanismes d'**attention**.
- Le même mot "banque" aura des représentations vectorielles très différentes dans les deux phrases ci-dessus, reflétant son sens contextuel.

Ces modèles ne produisent plus un simple espace d'embedding, mais une fonction complexe qui mappe une séquence de mots vers une séquence de vecteurs, capturant des nuances de sens beaucoup plus profondes.

## Conclusion

Les word embeddings ont été une avancée fondamentale en NLP, transformant le traitement du langage d'un problème de manipulation de symboles discrets à un problème de géométrie dans un espace continu. En apprenant des représentations denses à partir de données textuelles, ils capturent des relations sémantiques et syntaxiques complexes sous forme de relations géométriques.

Cette idée de "plongement" – de représenter des entités discrètes (mots, utilisateurs, produits, nœuds de graphe) comme des points dans un espace géométrique – est devenue l'un des paradigmes les plus puissants de l'apprentissage automatique moderne. Le module suivant explorera comment cette même idée peut être appliquée à un autre type de données omniprésent : les graphes.

---

## Références

[1] Mikolov, T., Chen, K., Corrado, G., & Dean, J. (2013). *Efficient estimation of word representations in vector space*. arXiv preprint arXiv:1301.3781.
[2] Pennington, J., Socher, R., & Manning, C. D. (2014). *GloVe: Global vectors for word representation*. Proceedings of the 2014 conference on empirical methods in natural language processing (EMNLP).
[3] Devlin, J., Chang, M. W., Lee, K., & Toutanova, K. (2018). *Bert: Pre-training of deep bidirectional transformers for language understanding*. arXiv preprint arXiv:1810.04805.

