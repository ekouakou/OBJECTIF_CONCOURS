const QCMQuestionsLogique = [
    {
      id: 1,
      question: "Dans une suite logique, quel nombre vient après : 2, 4, 8, 16, ... ?",
      options: [
        "24",
        "32",
        "20",
        "64"
      ],
      correctAnswer: 1,
      explanation: "Cette suite suit une progression géométrique où chaque terme est multiplié par 2 pour obtenir le terme suivant. Donc, après 16, on multiplie par 2 pour obtenir 32.",
      examples: "Par exemple, on peut vérifier : 2×2=4, 4×2=8, 8×2=16, 16×2=32.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Suite_géométrique"]
    },
    {
      id: 2,
      question: "Si tous les lapins ont des oreilles longues et Floppy a des oreilles longues, alors :",
      options: [
        "Floppy est certainement un lapin",
        "Floppy n'est pas un lapin",
        "On ne peut pas déterminer si Floppy est un lapin",
        "Floppy est un autre animal avec des oreilles longues"
      ],
      correctAnswer: 2,
      explanation: "Ce raisonnement illustre le sophisme d'affirmation du conséquent. Du fait que tous les lapins ont des oreilles longues, on ne peut pas conclure que tous les animaux aux oreilles longues sont des lapins. D'autres animaux peuvent aussi avoir des oreilles longues.",
      examples: "Par exemple, dire que tous les chiens aboient et que Rex aboie ne permet pas de conclure que Rex est un chien (il pourrait être un loup ou un renard).",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Affirmation_du_conséquent"]
    },
    {
      id: 3,
      question: "Dans un alignement de 5 personnes, Marie est à gauche de Léa mais à droite de Thomas. Sophie est à gauche de Thomas mais à droite de Pierre. Quelle est la position de Marie ?",
      options: [
        "1ère position (extrême gauche)",
        "2ème position",
        "3ème position (milieu)",
        "4ème position"
      ],
      correctAnswer: 3,
      explanation: "En analysant les positions relatives, on peut déduire l'ordre : Pierre, Sophie, Thomas, Marie, Léa. Marie occupe donc la 4ème position en partant de la gauche.",
      examples: "On peut résoudre pas à pas : Thomas est à gauche de Marie qui est à gauche de Léa. Sophie est entre Pierre (à sa gauche) et Thomas (à sa droite). L'ordre complet est donc : Pierre, Sophie, Thomas, Marie, Léa.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Problème_de_logique"]
    },
    {
      id: 4,
      question: "Complétez la séquence logique : 1, 4, 9, 16, 25, ... ?",
      options: [
        "30",
        "36",
        "49",
        "64"
      ],
      correctAnswer: 1,
      explanation: "Cette séquence représente les nombres carrés : 1=1², 4=2², 9=3², 16=4², 25=5², donc le terme suivant est 36=6².",
      examples: "Pour vérifier : 1=1×1, 4=2×2, 9=3×3, 16=4×4, 25=5×5, 36=6×6.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Carré_(arithmétique)"]
    },
    {
      id: 5,
      question: "Si A implique B, et B implique C, alors :",
      options: [
        "A implique C",
        "C implique A",
        "A et C sont équivalents",
        "On ne peut rien conclure sur la relation entre A et C"
      ],
      correctAnswer: 0,
      explanation: "C'est le principe de transitivité en logique. Si A implique B (A→B) et B implique C (B→C), alors A implique C (A→C). Ce principe est fondamental en logique déductive.",
      examples: "Par exemple, si 'il pleut' implique 'la route est mouillée', et 'la route est mouillée' implique 'il faut conduire prudemment', alors 'il pleut' implique 'il faut conduire prudemment'.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Transitivité_(mathématiques)"]
    },
    {
      id: 6,
      question: "Quel est l'intrus dans cette série ? Lion, Tigre, Léopard, Dauphin, Guépard",
      options: [
        "Lion",
        "Tigre",
        "Dauphin",
        "Guépard"
      ],
      correctAnswer: 2,
      explanation: "Le dauphin est l'intrus car c'est un mammifère marin alors que tous les autres sont des félins terrestres (mammifères carnivores de la famille des félidés).",
      examples: "Le lion, le tigre, le léopard et le guépard appartiennent tous à la famille des félidés, alors que le dauphin appartient à l'ordre des cétacés.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Felidae", "https://fr.wikipedia.org/wiki/Delphinidae"]
    },
    {
      id: 7,
      question: "Si l'on code CHAT comme DIBV, comment coderait-on SOURIS ?",
      options: [
        "TPVSHT",
        "TPVSJS",
        "TPVSJT",
        "RPVQJR"
      ],
      correctAnswer: 1,
      explanation: "Ce code consiste à remplacer chaque lettre par celle qui la suit dans l'alphabet. Donc C→D, H→I, A→B, T→V. En appliquant le même principe à SOURIS : S→T, O→P, U→V, R→S, I→J, S→T.",
      examples: "Vérifions lettre par lettre : S devient T, O devient P, U devient V, R devient S, I devient J, S devient T, ce qui donne TPVSJS.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Chiffrement_par_décalage"]
    },
    {
      id: 8,
      question: "Quelle proposition complète correctement l'analogie ? Avion est à ciel comme bateau est à :",
      options: [
        "Port",
        "Eau",
        "Naviguer",
        "Voyager"
      ],
      correctAnswer: 1,
      explanation: "L'analogie repose sur la relation entre un moyen de transport et son milieu naturel de déplacement. L'avion se déplace dans le ciel, le bateau se déplace sur l'eau.",
      examples: "D'autres analogies similaires seraient : voiture est à route comme train est à rail, ou poisson est à eau comme oiseau est à ciel.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Analogie"]
    },
    {
      id: 9,
      question: "Si aujourd'hui est lundi, quel jour sera-t-il 100 jours plus tard ?",
      options: [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi"
      ],
      correctAnswer: 2,
      explanation: "Pour déterminer le jour, il faut calculer le reste de la division de 100 par 7 (nombre de jours dans une semaine). 100 ÷ 7 = 14 avec un reste de 2. Donc 100 jours après un lundi, on arrive à un mercredi (lundi + 2 jours).",
      examples: "On peut vérifier : 7 jours après lundi, c'est encore lundi. 98 jours = 14 semaines complètes, donc encore lundi. 2 jours de plus = mercredi.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Arithmétique_modulaire"]
    },
    {
      id: 10,
      question: "Dans un syllogisme, si 'Tous les A sont B' et 'Tous les B sont C', quelle conclusion est correcte ?",
      options: [
        "Tous les C sont A",
        "Tous les A sont C",
        "Certains A sont C",
        "Aucun A n'est C"
      ],
      correctAnswer: 1,
      explanation: "Ce syllogisme suit la forme classique du syllogisme en Barbara. Si tous les A sont B et tous les B sont C, alors par transitivité, tous les A sont C.",
      examples: "Par exemple : 'Tous les chats sont des félins' et 'Tous les félins sont des mammifères' implique que 'Tous les chats sont des mammifères'.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Syllogisme"]
    },
    {
      id: 11,
      question: "Quelle figure vient logiquement après dans cette série : ◯, △, □, ◯, △, ... ?",
      options: [
        "◯",
        "△",
        "□",
        "⬠"
      ],
      correctAnswer: 2,
      explanation: "Cette série suit un motif répétitif simple : cercle, triangle, carré, cercle, triangle, carré... Donc, après le second triangle, vient logiquement un carré.",
      examples: "C'est comme compter : 1, 2, 3, 1, 2, 3... Le prochain nombre après le second 2 serait 3.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Suite_(mathématiques)"]
    },
    {
      id: 12,
      question: "Lequel n'est pas un synonyme logique de 'P implique Q' ?",
      options: [
        "Si P alors Q",
        "P seulement si Q",
        "Non P ou Q",
        "Q implique P"
      ],
      correctAnswer: 3,
      explanation: "En logique propositionnelle, 'P implique Q' est équivalent à 'Si P alors Q', à 'P seulement si Q' et à 'Non P ou Q'. Par contre, 'Q implique P' est l'implication inverse et n'est pas logiquement équivalente.",
      examples: "Si l'on dit 'S'il pleut, alors la rue est mouillée', cela n'équivaut pas à 'Si la rue est mouillée, alors il pleut' (car la rue peut être mouillée pour d'autres raisons).",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Implication_(logique)"]
    },
    {
      id: 13,
      question: "Dans une ville où les habitants disent toujours la vérité ou toujours des mensonges, une personne dit : 'Je mens toujours.' Cette personne est :",
      options: [
        "Un diseur de vérité",
        "Un menteur",
        "Ni l'un ni l'autre (paradoxe)",
        "Parfois diseur de vérité, parfois menteur"
      ],
      correctAnswer: 2,
      explanation: "C'est le paradoxe du menteur. Si la personne dit toujours la vérité, alors sa phrase 'Je mens toujours' serait vraie, ce qui impliquerait qu'elle ment toujours, contradiction. Si elle ment toujours, alors sa phrase serait fausse, ce qui impliquerait qu'elle ne ment pas toujours, autre contradiction. C'est donc un paradoxe.",
      examples: "Un paradoxe similaire est 'Cette phrase est fausse'. Si elle est vraie, elle est fausse; si elle est fausse, elle est vraie.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Paradoxe_du_menteur"]
    },
    {
      id: 14,
      question: "Complétez la suite numérique : 3, 6, 12, 24, 48, ... ?",
      options: [
        "72",
        "96",
        "60",
        "84"
      ],
      correctAnswer: 0,
      explanation: "Dans cette suite, chaque terme est multiplié par 2 pour obtenir le terme suivant : 3×2=6, 6×2=12, 12×2=24, 24×2=48, 48×2=96.",
      examples: "C'est une suite géométrique de premier terme 3 et de raison 2, où chaque terme est égal au terme précédent multiplié par 2.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Suite_géométrique"]
    },
    {
      id: 15,
      question: "Si 3 chats attrapent 3 souris en 3 minutes, combien faut-il de chats pour attraper 100 souris en 100 minutes ?",
      options: [
        "100 chats",
        "3 chats",
        "33 chats",
        "9 chats"
      ],
      correctAnswer: 1,
      explanation: "Il faut analyser le taux d'efficacité. 3 chats attrapent 3 souris en 3 minutes, soit 1 souris par chat par 3 minutes, ou encore 1/3 souris par chat par minute. Pour attraper 100 souris en 100 minutes, chaque chat peut attraper (1/3) × 100 = 33,33 souris pendant cette période. Donc 3 chats peuvent attraper 3 × 33,33 = 100 souris en 100 minutes.",
      examples: "On peut aussi dire que 3 chats attrapent 1 souris par minute. Donc en 100 minutes, ils attrapent 100 souris.",
      usefulLinks: ["https://fr.wikipedia.org/wiki/Problème_de_règle_de_trois"]
    }
  ];

  export default QCMQuestionsLogique;