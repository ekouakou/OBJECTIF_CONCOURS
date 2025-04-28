const QCMLogique = [
    {
      id: 1,
      question: "Qu'est-ce qu'un algorithme ?",
      options: [
        "Un langage de programmation",
        "Une suite finie d'instructions permettant de résoudre un problème",
        "Un type de variable spécifique",
        "Une base de données"
      ],
      correctAnswer: 1,
      explanation: "Un algorithme est une suite finie et non ambiguë d'opérations ou d'instructions permettant de résoudre un problème ou d'obtenir un résultat. C'est la description précise, étape par étape, de la méthode à suivre pour accomplir une tâche ou résoudre un problème.",
      examples: "Par exemple, une recette de cuisine est un algorithme : elle liste les ingrédients (entrées) et donne des instructions précises pour obtenir un plat (sortie). En informatique, un algorithme de tri comme le tri à bulles est une séquence d'étapes pour réorganiser une liste d'éléments.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Algorithme", "https://interstices.info/les-algorithmes/", "https://www.geeksforgeeks.org/introduction-to-algorithms/"]
    },
    {
      id: 2,
      question: "Quelle est la complexité temporelle de l'algorithme de recherche binaire ?",
      options: [
        "O(n)",
        "O(n²)",
        "O(log n)",
        "O(n log n)"
      ],
      correctAnswer: 2,
      explanation: "La recherche binaire a une complexité temporelle de O(log n), où n est le nombre d'éléments dans la liste. À chaque étape, l'algorithme divise par deux l'espace de recherche, ce qui permet d'atteindre une efficacité logarithmique. Cependant, la recherche binaire nécessite une liste préalablement triée.",
      examples: "Par exemple, pour rechercher un nombre dans une liste triée de 1 000 000 éléments, la recherche binaire prendra au maximum environ 20 comparaisons (log₂ 1 000 000 ≈ 20), alors qu'une recherche linéaire pourrait nécessiter jusqu'à 1 000 000 de comparaisons.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Recherche_dichotomique", "https://www.geeksforgeeks.org/binary-search/", "https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search"]
    },
    {
      id: 3,
      question: "Qu'est-ce qu'une structure de données de type 'pile' (stack) ?",
      options: [
        "Une structure qui suit le principe FIFO (First In, First Out)",
        "Une structure qui suit le principe LIFO (Last In, First Out)",
        "Une structure qui permet l'accès direct à n'importe quel élément",
        "Une structure qui organise les données en graphe"
      ],
      correctAnswer: 1,
      explanation: "Une pile (stack) est une structure de données linéaire qui suit le principe LIFO (Last In, First Out), ce qui signifie que le dernier élément ajouté est le premier à être retiré. Les opérations principales sur une pile sont 'push' (ajouter un élément au sommet) et 'pop' (retirer l'élément du sommet).",
      examples: "Par exemple, la pile d'assiettes dans un restaurant fonctionne comme une pile informatique : on ajoute et retire toujours par le haut. En programmation, la pile d'appels des fonctions suit également ce principe, ce qui permet la récursion.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Pile_(informatique)", "https://www.geeksforgeeks.org/stack-data-structure/", "https://visualgo.net/en/list"]
    },
    {
      id: 4,
      question: "Quelle est la différence entre une boucle 'while' et une boucle 'do-while' ?",
      options: [
        "Il n'y a aucune différence, ce sont deux syntaxes pour la même chose",
        "La boucle 'while' peut ne jamais s'exécuter, alors que la boucle 'do-while' s'exécute au moins une fois",
        "La boucle 'do-while' peut contenir plusieurs conditions, la boucle 'while' une seule",
        "La boucle 'while' est plus efficace en termes de performances"
      ],
      correctAnswer: 1,
      explanation: "La principale différence est que dans une boucle 'while', la condition est vérifiée avant l'exécution du bloc de code, ce qui signifie que si la condition est fausse dès le début, le bloc ne sera jamais exécuté. Dans une boucle 'do-while', le bloc de code est exécuté une première fois, puis la condition est vérifiée, garantissant ainsi au moins une exécution du bloc.",
      examples: "Par exemple, pour lire des entrées utilisateur jusqu'à obtenir une valeur valide, une boucle 'do-while' est appropriée car nous voulons demander au moins une fois. À l'inverse, pour traiter des éléments d'une liste potentiellement vide, une boucle 'while' serait plus adaptée.",
      usefulLinks: ["https://www.geeksforgeeks.org/loops-in-programming/", "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/do...while", "https://www.w3schools.com/js/js_loop_while.asp"]
    },
    {
      id: 5,
      question: "Qu'est-ce qu'une fonction récursive ?",
      options: [
        "Une fonction qui utilise des variables globales",
        "Une fonction qui s'appelle elle-même",
        "Une fonction qui ne renvoie aucune valeur",
        "Une fonction qui prend un nombre variable d'arguments"
      ],
      correctAnswer: 1,
      explanation: "Une fonction récursive est une fonction qui s'appelle elle-même dans sa propre définition. Pour être efficace et éviter une récursion infinie, elle doit avoir un cas de base (condition d'arrêt) et un cas récursif qui se rapproche progressivement du cas de base.",
      examples: "Le calcul du factoriel est un exemple classique de récursion : factoriel(n) = n * factoriel(n-1), avec factoriel(0) = 1 comme cas de base. La résolution des Tours de Hanoï et les algorithmes de parcours d'arbres sont d'autres exemples où la récursion est particulièrement adaptée.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Algorithme_récursif", "https://www.geeksforgeeks.org/recursion/", "https://www.programiz.com/javascript/recursion"]
    },
    {
      id: 6,
      question: "Quel est le principe du tri par fusion (merge sort) ?",
      options: [
        "Sélectionner successivement le plus petit élément et le placer dans la position correcte",
        "Échanger des éléments adjacents jusqu'à ce que la liste soit triée",
        "Diviser la liste en deux, trier chaque moitié, puis fusionner les deux moitiés triées",
        "Choisir un pivot et répartir les éléments plus petits à gauche et plus grands à droite"
      ],
      correctAnswer: 2,
      explanation: "Le tri par fusion (merge sort) est un algorithme de tri basé sur la technique 'diviser pour régner'. Il fonctionne en divisant récursivement la liste en deux moitiés, en triant chaque moitié, puis en fusionnant les deux moitiés triées. Sa complexité temporelle est O(n log n) dans tous les cas, ce qui en fait un algorithme efficace.",
      examples: "Par exemple, pour trier [38, 27, 43, 3, 9, 82, 10], l'algorithme divise d'abord la liste en [38, 27, 43, 3] et [9, 82, 10], puis continue à diviser et à fusionner jusqu'à obtenir [3, 9, 10, 27, 38, 43, 82].",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Tri_fusion", "https://www.geeksforgeeks.org/merge-sort/", "https://visualgo.net/en/sorting"]
    },
    {
      id: 7,
      question: "Qu'est-ce qu'une expression régulière (regex) ?",
      options: [
        "Une formule mathématique pour calculer des probabilités",
        "Une séquence de caractères définissant un motif de recherche",
        "Un type de variable qui ne peut contenir que des nombres",
        "Une instruction conditionnelle avancée"
      ],
      correctAnswer: 1,
      explanation: "Une expression régulière (regex) est une séquence de caractères qui définit un motif de recherche, utilisée principalement pour la recherche de motifs dans des chaînes de caractères. C'est un outil puissant pour la validation de format, l'extraction et la manipulation de texte.",
      examples: "Par exemple, l'expression régulière `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$` peut être utilisée pour valider une adresse e-mail. La regex `\\d{3}-\\d{3}-\\d{4}` peut correspondre à un numéro de téléphone américain au format xxx-xxx-xxxx.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Expression_régulière", "https://regex101.com/", "https://www.regular-expressions.info/"]
    },
    {
      id: 8,
      question: "Quel problème les arbres binaires de recherche (BST) résolvent-ils ?",
      options: [
        "La compression de données",
        "La recherche efficace d'éléments dans une collection ordonnée",
        "Le routage réseau",
        "Le calcul parallèle"
      ],
      correctAnswer: 1,
      explanation: "Les arbres binaires de recherche (BST) résolvent le problème de la recherche efficace dans une collection ordonnée. Ils permettent d'insérer, de supprimer et de rechercher des éléments avec une complexité moyenne de O(log n), bien meilleure que la recherche linéaire O(n). Dans un BST, pour chaque nœud, tous les éléments dans le sous-arbre gauche sont inférieurs au nœud, et tous les éléments dans le sous-arbre droit sont supérieurs.",
      examples: "Par exemple, pour rechercher le nombre 42 dans un BST, on commence à la racine, puis on descend à gauche si 42 est inférieur à la valeur du nœud actuel, ou à droite s'il est supérieur, jusqu'à trouver le nombre ou atteindre une feuille.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Arbre_binaire_de_recherche", "https://www.geeksforgeeks.org/binary-search-tree-data-structure/", "https://visualgo.net/en/bst"]
    },
    {
      id: 9,
      question: "Qu'est-ce qu'une table de hachage (hash table) ?",
      options: [
        "Une structure qui stocke les données dans un tableau multidimensionnel",
        "Une structure qui associe des clés à des valeurs via une fonction de hachage",
        "Une méthode de cryptage des données",
        "Une technique pour compresser des fichiers"
      ],
      correctAnswer: 1,
      explanation: "Une table de hachage est une structure de données qui associe des clés à des valeurs. Elle utilise une fonction de hachage pour calculer un indice dans un tableau où la valeur correspondante peut être trouvée. Les tables de hachage offrent un temps d'accès moyen en O(1), ce qui les rend très efficaces pour la recherche, l'insertion et la suppression.",
      examples: "Par exemple, un dictionnaire en Python est implémenté comme une table de hachage. L'expression `dict['clé'] = valeur` stocke la valeur à un emplacement déterminé par le hachage de 'clé', permettant un accès ultérieur rapide via `dict['clé']`.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Table_de_hachage", "https://www.geeksforgeeks.org/hashing-data-structure/", "https://visualgo.net/en/hashtable"]
    },
    {
      id: 10,
      question: "Quel est le principe de la programmation dynamique ?",
      options: [
        "Écrire du code qui peut changer pendant l'exécution",
        "Résoudre des problèmes complexes en les décomposant en sous-problèmes plus simples et en mémorisant les résultats",
        "Créer des interfaces utilisateur réactives",
        "Programmer des systèmes qui évoluent automatiquement"
      ],
      correctAnswer: 1,
      explanation: "La programmation dynamique est une technique algorithmique qui résout des problèmes complexes en les décomposant en sous-problèmes plus simples, puis en résolvant chaque sous-problème une seule fois et en stockant sa solution. Cela évite de recalculer les mêmes sous-problèmes, ce qui peut réduire considérablement la complexité temporelle. Elle s'applique quand un problème a une structure de sous-problèmes qui se chevauchent et une sous-structure optimale.",
      examples: "Le calcul des nombres de Fibonacci est un exemple classique : au lieu de recalculer fib(n-1) et fib(n-2) à chaque appel récursif, on stocke ces valeurs dans un tableau. D'autres exemples incluent le problème du sac à dos, le plus court chemin, et l'alignement de séquences en bioinformatique.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Programmation_dynamique", "https://www.geeksforgeeks.org/dynamic-programming/", "https://www.topcoder.com/thrive/articles/Dynamic%20Programming:%20From%20Novice%20to%20Advanced"]
    },
    {
      id: 11,
      question: "Qu'est-ce que la complexité spatiale d'un algorithme ?",
      options: [
        "La taille du code source de l'algorithme",
        "La quantité de mémoire utilisée par l'algorithme en fonction de la taille des entrées",
        "Le nombre de lignes de code nécessaires pour implémenter l'algorithme",
        "L'espace disque requis pour stocker l'algorithme"
      ],
      correctAnswer: 1,
      explanation: "La complexité spatiale d'un algorithme est la quantité de mémoire utilisée par l'algorithme en fonction de la taille de ses entrées. Elle mesure l'efficacité de l'algorithme en termes d'utilisation de la mémoire, généralement exprimée en notation O grande. La complexité spatiale inclut l'espace pour les variables d'entrée, les variables auxiliaires, et la pile d'appels pour les algorithmes récursifs.",
      examples: "Par exemple, un algorithme qui crée un tableau de taille n a une complexité spatiale de O(n). Le tri fusion a une complexité spatiale de O(n) car il nécessite un espace supplémentaire proportionnel à la taille de l'entrée, tandis que le tri à bulles a une complexité spatiale de O(1) car il trie en place.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Complexité_en_espace", "https://www.geeksforgeeks.org/analysis-of-algorithms-set-4-analysis-of-loops/", "https://www.baeldung.com/cs/space-complexity"]
    },
    {
      id: 12,
      question: "Qu'est-ce qu'une file de priorité (priority queue) ?",
      options: [
        "Une structure de données qui suit le principe FIFO avec des priorités associées aux éléments",
        "Un algorithme de planification de processus dans un système d'exploitation",
        "Une technique pour gérer les interruptions dans un système embarqué",
        "Une structure de données qui stocke des éléments en ordre alphabétique"
      ],
      correctAnswer: 0,
      explanation: "Une file de priorité est une structure de données similaire à une file, mais où chaque élément a une priorité associée et les éléments sont extraits selon leur priorité plutôt que leur ordre d'arrivée. L'élément avec la priorité la plus élevée (ou la plus basse, selon l'implémentation) est toujours le premier à être retiré. Les files de priorité sont souvent implémentées à l'aide de tas (heaps).",
      examples: "Par exemple, dans un système de gestion d'urgences médicales, les patients sont traités selon la gravité de leur état, pas selon leur ordre d'arrivée. Dans les algorithmes de recherche comme A*, une file de priorité est utilisée pour sélectionner le nœud le plus prometteur à explorer ensuite.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/File_de_priorité", "https://www.geeksforgeeks.org/priority-queue-set-1-introduction/", "https://visualgo.net/en/heap"]
    },
    {
      id: 13,
      question: "Quelle est la différence entre un langage de programmation compilé et interprété ?",
      options: [
        "Les langages compilés sont plus récents que les langages interprétés",
        "Les langages compilés sont convertis en code machine avant l'exécution, tandis que les langages interprétés sont exécutés ligne par ligne",
        "Les langages compilés sont utilisés pour le développement web, les langages interprétés pour les applications de bureau",
        "Les langages compilés ne peuvent pas accéder à la mémoire directement, contrairement aux langages interprétés"
      ],
      correctAnswer: 1,
      explanation: "La principale différence est que les langages compilés sont traduits entièrement en code machine avant l'exécution, créant un fichier exécutable indépendant. Les langages interprétés, quant à eux, sont traduits et exécutés ligne par ligne pendant l'exécution. Les langages compilés offrent généralement de meilleures performances mais sont moins portables, tandis que les langages interprétés sont plus portables mais souvent moins performants.",
      examples: "Par exemple, C et C++ sont des langages compilés : le code source est compilé en un exécutable spécifique à une architecture. Python et JavaScript sont des langages interprétés : le code est exécuté par un interpréteur sans compilation préalable en exécutable indépendant.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Compilation_(informatique)", "https://www.geeksforgeeks.org/difference-between-compiled-and-interpreted-language/", "https://www.freecodecamp.org/news/compiled-versus-interpreted-languages/"]
    },
    {
      id: 14,
      question: "Qu'est-ce que la complexité temporelle amortie ?",
      options: [
        "La complexité moyenne d'un algorithme sur un grand nombre d'exécutions",
        "La complexité temporelle divisée par le nombre d'opérations effectuées",
        "Le coût moyen d'une opération dans une séquence d'opérations",
        "La complexité temporelle d'un algorithme parallèle"
      ],
      correctAnswer: 2,
      explanation: "La complexité temporelle amortie est le coût moyen par opération dans une séquence d'opérations, même si certaines opérations individuelles peuvent être coûteuses. Elle permet d'analyser plus précisément les performances de structures de données comme les tableaux dynamiques, où des opérations occasionnelles (comme la réallocation) sont coûteuses mais rares.",
      examples: "Par exemple, dans un tableau dynamique (comme ArrayList en Java ou vector en C++), l'ajout d'un élément a généralement une complexité de O(1), mais nécessite parfois une réallocation en O(n) lorsque le tableau sous-jacent est plein. L'analyse amortie montre que le coût moyen par opération reste O(1).",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Analyse_amortie", "https://www.geeksforgeeks.org/analysis-algorithm-set-5-amortized-analysis-introduction/", "https://www.cs.cornell.edu/courses/cs3110/2011sp/Lectures/lec20-amortized/amortized.htm"]
    },
    {
      id: 15,
      question: "Qu'est-ce que le paradigme de programmation fonctionnelle ?",
      options: [
        "Une approche centrée sur la création de fonctions réutilisables",
        "Un style de programmation qui traite le calcul comme l'évaluation de fonctions mathématiques et évite les changements d'état et les données mutables",
        "Une méthode de programmation où les fonctions sont définies à l'intérieur d'autres fonctions",
        "Un paradigme qui organise le code en modules fonctionnels indépendants"
      ],
      correctAnswer: 1,
      explanation: "La programmation fonctionnelle est un paradigme de programmation qui traite le calcul comme l'évaluation de fonctions mathématiques et évite les changements d'état et les données mutables. Elle met l'accent sur l'application de fonctions à des valeurs immuables pour créer de nouvelles valeurs, plutôt que sur la modification d'état. Les concepts clés incluent les fonctions pures, l'immutabilité, les fonctions d'ordre supérieur et la récursion.",
      examples: "Par exemple, en programmation fonctionnelle, au lieu de modifier un tableau avec une boucle for, on créerait une nouvelle liste transformée avec une fonction map. Les langages Haskell, Clojure, et Elixir sont fortement fonctionnels, tandis que JavaScript, Python et Ruby supportent des styles de programmation fonctionnelle.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Programmation_fonctionnelle", "https://www.geeksforgeeks.org/functional-programming-paradigm/", "https://www.freecodecamp.org/news/functional-programming-principles-in-javascript/"]
    }
  ];

  export default QCMLogique;