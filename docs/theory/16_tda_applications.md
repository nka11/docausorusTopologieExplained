## Module 5.3 : Applications de l'Analyse Topologique des Données (TDA)

**Auteur** : Manus AI
**Date** : 12 Octobre 2025

## Introduction : De la Théorie à la Pratique

L'analyse topologique des données (TDA) n'est pas seulement un exercice théorique élégant ; c'est un ensemble d'outils qui a démontré sa valeur dans une multitude de domaines scientifiques et industriels. En se concentrant sur la "forme" des données, le TDA peut découvrir des structures, des relations et des biomarqueurs qui sont invisibles pour les méthodes d'analyse plus traditionnelles.

Ce module présente un aperçu de plusieurs études de cas où le TDA, et en particulier l'homologie persistante et l'algorithme Mapper, ont conduit à des découvertes significatives. Ces exemples illustrent comment la quantification de la structure topologique peut fournir des informations exploitables dans des domaines aussi variés que la biologie, la médecine, les sciences des matériaux et la finance.

## 1. Biologie et Médecine : Découvrir les Sous-types de Cancer

L'une des applications les plus célèbres du TDA a été la découverte d'un nouveau sous-type de cancer du sein.

- **Problème** : Le cancer du sein est une maladie hétérogène. Identifier des sous-types de patients distincts est crucial pour le pronostic et le traitement personnalisé.
- **Données** : Données d'expression génique (microarray) de patientes atteintes d'un cancer du sein.
- **Méthode** : L'algorithme **Mapper** a été appliqué au nuage de points de grande dimension des données d'expression génique.
- **Résultat** : Le graphe Mapper a révélé une structure complexe avec plusieurs branches et une bifurcation en forme de Y. La plupart des patientes se trouvaient sur deux branches principales, correspondant à des sous-types connus. Cependant, une petite branche distincte est apparue, composée de patientes qui ne correspondaient à aucun sous-type connu. L'analyse a montré que ce groupe avait un taux de survie exceptionnellement élevé et une signature génétique unique. Le TDA a ainsi identifié un nouveau sous-type de cancer avec un excellent pronostic qui était passé inaperçu avec les méthodes de clustering traditionnelles.

**Autres applications en médecine** :
- **Imagerie cérébrale** : Analyse de la connectivité fonctionnelle du cerveau (fMRI, EEG) pour distinguer les cerveaux sains des cerveaux de patients atteints de TDAH ou d'Alzheimer.
- **Cardiologie** : Analyse de la forme des ventricules cardiaques à partir d'images IRM pour prédire les maladies cardiaques.
- **Analyse de neurones** : Classification des types de neurones en fonction de la structure de ramification de leurs dendrites.

## 2. Sciences des Matériaux : Caractériser les Matériaux Poreux

La structure des matériaux, en particulier leur porosité, détermine leurs propriétés physiques (filtration, capacité de stockage, etc.).

- **Problème** : Quantifier et caractériser la structure complexe des pores dans des matériaux comme les verres, les céramiques ou les os.
- **Données** : Images 3D obtenues par tomographie aux rayons X.
- **Méthode** : L'**homologie persistante** est utilisée pour analyser la topologie de l'espace des pores.
- **Résultat** : Les diagrammes de persistance fournissent une "empreinte digitale" topologique du matériau.
    - La persistance en dimension 0 (H₀) mesure la distribution de la taille des pores individuels.
    - La persistance en dimension 1 (H₁) mesure la connectivité des tunnels à travers le matériau.
    - La persistance en dimension 2 (H₂) mesure la taille des grandes cavités isolées.
Ces signatures topologiques se sont avérées être de meilleurs prédicteurs des propriétés physiques des matériaux que les mesures traditionnelles comme la porosité moyenne.

## 3. Analyse de Séries Temporelles et de Signaux

Les séries temporelles peuvent être transformées en nuages de points de grande dimension en utilisant une technique appelée **l'enchâssement par retard temporel (time-delay embedding)**. Le TDA peut alors révéler la structure géométrique sous-jacente du système dynamique qui a généré la série.

- **Problème** : Détecter des régimes de marché, des crises financières ou des événements anormaux dans des données financières.
- **Données** : Séries temporelles de cours d'actions ou d'indices boursiers.
- **Méthode** : On construit un nuage de points par enchâssement par retard. L'homologie persistante est ensuite appliquée.
- **Résultat** : Des changements dans la topologie du nuage de points (l'apparition ou la disparition de boucles H₁) peuvent signaler des changements de régime dans le marché. Par exemple, l'apparition de boucles persistantes a été corrélée avec des périodes de forte volatilité ou des bulles spéculatives. Le TDA peut servir de système d'alerte précoce.

## 4. Traitement d'Images et Reconnaissance de Formes

Le TDA peut fournir des descripteurs d'images robustes aux déformations, aux changements d'éclairage et au bruit.

- **Problème** : Reconnaître des objets ou des textures dans des images.
- **Données** : Patches d'images en niveaux de gris.
- **Méthode** : On peut construire une filtration en faisant varier le seuil de niveau de gris. L'homologie persistante de cette filtration capture la manière dont les composantes connexes apparaissent et fusionnent.
- **Résultat** : Les diagrammes de persistance qui en résultent sont des descripteurs puissants de la texture de l'image. Ils ont été utilisés avec succès pour la classification de textures et la reconnaissance de chiffres manuscrits, offrant une alternative aux descripteurs plus traditionnels comme les SIFT ou les HOG.

## 5. Intégration avec le Machine Learning

Le TDA n'est pas une alternative au machine learning, mais un complément puissant. Les sorties du TDA (diagrammes de persistance, graphes Mapper) peuvent être utilisées comme de nouvelles **caractéristiques (features)** pour alimenter des modèles de machine learning.

- **Vectorisation des diagrammes de persistance** : Pour utiliser un diagramme de persistance dans un algorithme de ML (comme un SVM ou une forêt aléatoire), il doit être transformé en un vecteur de taille fixe. Des techniques comme les "persistence landscapes" ou les "persistence images" permettent de réaliser cette vectorisation.
- **Deep Learning et TDA** : Des travaux récents intègrent des couches topologiques directement dans les architectures de réseaux de neurones profonds, permettant au réseau d'apprendre des caractéristiques topologiques pertinentes pour la tâche à accomplir.

## Conclusion

L'analyse topologique des données est un pont entre les mathématiques pures et l'analyse de données appliquée. En fournissant des résumés quantitatifs de la forme des données, elle offre une nouvelle lentille pour observer et comprendre des systèmes complexes. Les exemples de ce module ne sont qu'un aperçu des domaines où le TDA a eu un impact. De la cosmologie à l'analyse de textes, en passant par la robotique et la chimie, la capacité du TDA à capturer la structure globale et les relations dans les données continue d'ouvrir de nouvelles voies de recherche et de découverte.

---

## Références

[1] Nicolau, M., Levine, A. J., & Carlsson, G. (2011). *Topology based data analysis identifies a subgroup of breast cancers with a unique mutational profile and excellent survival*. Proceedings of the National Academy of Sciences, 108(17), 7265-7270.
[2] Hiraoka, Y., Nakamura, T., et al. (2016). *Hierarchical structures of amorphous solids characterized by persistent homology*. Proceedings of the National Academy of Sciences, 113(34), 9477-9482.
[3] Gidea, M., & Katz, Y. (2018). *Topological data analysis of financial time series: Landscapes of crashes*. Physica A: Statistical Mechanics and its Applications, 491, 820-834.
[4] Adams, H., et al. (2017). *Persistence Images: A Stable Vector Representation of Persistent Homology*. Journal of Machine Learning Research, 18, 1-357:1-35.

