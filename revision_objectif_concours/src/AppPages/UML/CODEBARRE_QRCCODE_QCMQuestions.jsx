// questions.js - Fichier contenant les questions du QCM

  const CODEBARRE_QRCCODE_QCMQuestions = [
    {
        id: 1,
        question: "Quelle est la principale différence entre un code-barres linéaire et un code QR ?",
        options: [
          "La couleur",
          "La capacité de stockage",
          "L'année d'invention",
          "Le coût de production"
        ],
        correctAnswer: 1,
        explanation: "La principale différence est la capacité de stockage. Un code QR est bidimensionnel et peut stocker beaucoup plus d'informations qu'un code-barres linéaire traditionnel (unidimensionnel).",
        examples: "Par exemple, un code-barres linéaire peut contenir jusqu'à 25 caractères, tandis qu'un code QR peut stocker jusqu'à 7089 caractères numériques ou 4296 caractères alphanumériques.",
        usefulLinks: ["https://www.qrcode.com/en/about/", "https://www.gs1.org/standards/barcodes"]
      },
      {
        id: 2,
        question: "Quand a été inventé le premier code QR ?",
        options: [
          "1952",
          "1974",
          "1994",
          "2002"
        ],
        correctAnswer: 2,
        explanation: "Le code QR a été inventé en 1994 par Denso Wave, une filiale de Toyota, au Japon. Il a été initialement créé pour suivre les pièces dans la fabrication automobile.",
        examples: "Le nom 'QR' vient de 'Quick Response' (réponse rapide), car il a été conçu pour être décodé rapidement.",
        usefulLinks: ["https://www.denso-wave.com/en/technology/vol1.html", "https://www.qrcode.com/en/history/"]
      },
      {
        id: 3,
        question: "Quel est le standard le plus utilisé pour les codes-barres dans le commerce de détail ?",
        options: [
          "Code 39",
          "UPC",
          "Code 128",
          "EAN-13"
        ],
        correctAnswer: 3,
        explanation: "L'EAN-13 (European Article Number) est le standard de code-barres le plus utilisé mondialement dans le commerce de détail. Il est composé de 13 chiffres et est utilisé pour identifier les produits commerciaux.",
        examples: "Aux États-Unis, le système UPC (Universal Product Code) à 12 chiffres est plus courant, mais il est considéré comme un sous-ensemble du système EAN.",
        usefulLinks: ["https://www.gs1.org/standards/barcodes/ean-upc", "https://www.barcodefaq.com/barcode-properties/symbologies/ean-13/"]
      },
      {
        id: 4,
        question: "Quelle technologie permet de lire un code QR ?",
        options: [
          "Un scanner laser",
          "Un capteur RFID",
          "Une caméra avec logiciel de décodage",
          "Un lecteur magnétique"
        ],
        correctAnswer: 2,
        explanation: "Les codes QR sont lus à l'aide d'une caméra (comme celle d'un smartphone) combinée à un logiciel de décodage qui analyse l'image pour interpréter les données codées dans le motif du code QR.",
        examples: "La plupart des smartphones modernes ont des applications de caméra intégrées capables de lire les codes QR sans avoir besoin d'installer d'application supplémentaire.",
        usefulLinks: ["https://www.qr-code-generator.com/qr-code-marketing/scan-qr-codes/", "https://www.kaspersky.com/resource-center/definitions/what-is-a-qr-code-how-to-scan"]
      },
      {
        id: 5,
        question: "Quelle caractéristique des codes QR permet de les lire même s'ils sont partiellement endommagés ?",
        options: [
          "La correction d'erreur",
          "Le contraste noir et blanc",
          "Les motifs de recherche",
          "La taille variable"
        ],
        correctAnswer: 0,
        explanation: "Les codes QR intègrent une technologie de correction d'erreur qui permet de les lire même si une partie du code est endommagée ou manquante. Il existe différents niveaux de correction d'erreur (L, M, Q, H) offrant une résistance croissante aux dommages.",
        examples: "Avec le niveau de correction d'erreur le plus élevé (H), un code QR peut être lu même si jusqu'à 30% du code est endommagé.",
        usefulLinks: ["https://www.qrcode.com/en/about/error_correction.html", "https://blog.qrstuff.com/2011/12/14/qr-code-error-correction"]
      },
      {
        id: 6,
        question: "Quel est le nombre maximum de caractères numériques qu'un code QR standard peut contenir ?",
        options: [
          "100",
          "1000",
          "3000",
          "7089"
        ],
        correctAnswer: 3,
        explanation: "Un code QR version 40 (le plus grand format standard) avec le niveau de correction d'erreur le plus bas (L) peut stocker jusqu'à 7089 caractères numériques.",
        examples: "La capacité diminue si l'on utilise des caractères alphanumériques (4296), des caractères binaires (2953) ou des caractères Kanji (1817).",
        usefulLinks: ["https://www.qrcode.com/en/about/version.html", "https://www.thonky.com/qr-code-tutorial/character-capacities"]
      },
      {
        id: 7,
        question: "Qu'est-ce que le Code 128 ?",
        options: [
          "Un type de code QR",
          "Un code-barres linéaire haute densité",
          "Un protocole de communication",
          "Un algorithme de chiffrement"
        ],
        correctAnswer: 1,
        explanation: "Le Code 128 est un code-barres linéaire haute densité utilisé pour la logistique et l'emballage. Il peut coder tous les 128 caractères ASCII, d'où son nom.",
        examples: "Le Code 128 est souvent utilisé pour les étiquettes d'expédition, les numéros de série, et les codes d'identification dans l'industrie.",
        usefulLinks: ["https://www.barcodefaq.com/barcode-properties/symbologies/code-128/", "https://www.tec-it.com/en/support/knowbase/barcode-overview/linear/code128/Default.aspx"]
      },
      {
        id: 8,
        question: "Quelle est la fonction des carrés situés dans trois des coins d'un code QR ?",
        options: [
          "Stocker des données supplémentaires",
          "Faciliter l'alignement et la détection",
          "Indiquer la version du code QR",
          "Améliorer l'esthétique du code"
        ],
        correctAnswer: 1,
        explanation: "Ces trois carrés sont appelés 'motifs de recherche' (finder patterns) et permettent aux scanners de détecter rapidement la présence d'un code QR, de déterminer son orientation et de faciliter la lecture en établissant les coordonnées du code.",
        examples: "Grâce à ces motifs, un code QR peut être lu quelle que soit son orientation (à 0°, 90°, 180° ou 270°).",
        usefulLinks: ["https://www.qrcode.com/en/howto/position.html", "https://www.explainthatstuff.com/how-data-matrix-codes-work.html"]
      },
      {
        id: 9,
        question: "Quelle technologie a précédé les codes-barres dans le domaine de l'identification automatique ?",
        options: [
          "Les cartes perforées",
          "Le code Morse",
          "Les étiquettes RFID",
          "Les QR codes"
        ],
        correctAnswer: 0,
        explanation: "Les cartes perforées ont précédé les codes-barres comme méthode d'entrée de données automatisée. Elles utilisaient des trous dans une carte papier rigide pour représenter des données.",
        examples: "Les cartes perforées ont été largement utilisées tout au long du 20e siècle, notamment pour les ordinateurs mainframe des années 1950-70, avant d'être remplacées par des technologies plus avancées.",
        usefulLinks: ["https://www.computerhistory.org/revolution/punched-cards/2/introduction", "https://history-computer.com/punched-card/"]
      },
      {
        id: 10,
        question: "Quel système a été développé pour identifier les wagons de chemin de fer et est considéré comme l'un des premiers usages de code-barres ?",
        options: [
          "Code EAN",
          "Code KarTrak",
          "Code Datamatrix",
          "Code UPC"
        ],
        correctAnswer: 1,
        explanation: "Le système KarTrak, développé dans les années 1960, utilisait des bandes réfléchissantes colorées pour identifier automatiquement les wagons de chemin de fer. Il est considéré comme l'un des premiers systèmes de code-barres utilisés commercialement.",
        examples: "Bien que le système KarTrak ait été abandonné en 1977 en raison de problèmes de fiabilité, il a ouvert la voie à d'autres applications de codes-barres dans la logistique et le transport.",
        usefulLinks: ["https://www.smithsonianmag.com/innovation/history-bar-code-180956704/", "https://www.barcoding.com/blog/barcode-history/"]
      },
      {
        id: 11,
        question: "Quelle est la principale utilisation des codes Datamatrix ?",
        options: [
          "Sur les billets de loterie",
          "Pour les petits composants électroniques",
          "Sur les emballages alimentaires",
          "Pour le marketing mobile"
        ],
        correctAnswer: 1,
        explanation: "Les codes Datamatrix sont principalement utilisés pour marquer de petits composants électroniques, des instruments médicaux, et d'autres petits objets où l'espace est limité. Ils sont très compacts et peuvent stocker des informations dans un espace réduit.",
        examples: "Dans l'industrie électronique, les codes Datamatrix peuvent être aussi petits que 2x2 mm tout en contenant des informations d'identification essentielles comme les numéros de série ou de lot.",
        usefulLinks: ["https://www.keyence.com/ss/products/auto_id/barcode_lecture/basic/2d-code/data-matrix.jsp", "https://barcodeguide.seagullscientific.com/Content/Symbologies/Data_Matrix.htm"]
      },
      {
        id: 12,
        question: "Quelle est la particularité des codes-barres GS1-128 (anciennement EAN-128) ?",
        options: [
          "Ils sont réservés aux produits alimentaires",
          "Ils contiennent des identifiants d'application standardisés",
          "Ils ne peuvent être utilisés qu'en Europe",
          "Ils sont uniquement imprimés en rouge"
        ],
        correctAnswer: 1,
        explanation: "Les codes-barres GS1-128 utilisent des identifiants d'application (IA) standardisés qui définissent le type d'information contenue dans chaque section du code. Cela permet d'encoder plusieurs types d'informations (numéro de lot, date d'expiration, poids, etc.) dans un seul code-barres.",
        examples: "Par exemple, l'IA '10' indique un numéro de lot, l'IA '15' indique une date de péremption, et l'IA '310X' indique un poids net en kilogrammes.",
        usefulLinks: ["https://www.gs1.org/standards/barcodes/gs1-128", "https://www.tec-it.com/en/support/knowbase/symbologies/gs1-128/Default.aspx"]
      },
      {
        id: 13,
        question: "Quelle est la principale limitation des codes-barres linéaires traditionnels ?",
        options: [
          "Ils ne peuvent contenir que des chiffres",
          "Ils sont trop coûteux à imprimer",
          "Leur capacité de stockage limitée",
          "Ils ne peuvent être lus que par des scanners professionnels"
        ],
        correctAnswer: 2,
        explanation: "La principale limitation des codes-barres linéaires est leur capacité de stockage relativement faible par rapport à leur taille. Un code-barres linéaire standard peut généralement stocker entre 10 et 25 caractères, ce qui limite les informations qu'il peut contenir.",
        examples: "Cette limitation a conduit au développement de codes-barres bidimensionnels comme les codes QR et Datamatrix, qui peuvent stocker beaucoup plus d'informations dans un espace similaire.",
        usefulLinks: ["https://www.scandit.com/blog/types-barcodes-choosing-right-barcode/", "https://www.barcodesinc.com/articles/barcode-comparison-chart.htm"]
      },
      {
        id: 14,
        question: "Qu'est-ce qu'un code QR dynamique ?",
        options: [
          "Un code QR qui change de couleur",
          "Un code QR dont le contenu peut être modifié sans changer le code",
          "Un code QR qui s'anime lorsqu'il est scanné",
          "Un code QR qui ne fonctionne que pendant une période limitée"
        ],
        correctAnswer: 1,
        explanation: "Un code QR dynamique contient une URL raccourcie qui redirige vers une destination web. Cette destination peut être modifiée par l'administrateur du code sans avoir à changer le code QR imprimé ou affiché.",
        examples: "Par exemple, une entreprise pourrait utiliser un code QR dynamique sur ses produits pour rediriger les clients vers des promotions saisonnières différentes tout au long de l'année, sans avoir à changer l'emballage du produit.",
        usefulLinks: ["https://www.qr-code-generator.com/qr-code-marketing/dynamic-qr-codes/", "https://www.beaconstac.com/static-vs-dynamic-qr-codes"]
      },
      {
        id: 15,
        question: "Quelle est la signification du premier chiffre dans un code-barres EAN-13 ?",
        options: [
          "Le prix du produit",
          "La catégorie du produit",
          "Le pays d'origine",
          "L'année de fabrication"
        ],
        correctAnswer: 2,
        explanation: "Le premier chiffre d'un code-barres EAN-13 indique le pays ou la région d'origine du fabricant ou de l'entreprise qui a enregistré le code. Par exemple, les codes commençant par 0-1 sont attribués aux États-Unis et au Canada, 30-37 à la France, 40-44 à l'Allemagne, etc.",
        examples: "Il est important de noter que ce chiffre n'indique pas nécessairement le pays de fabrication du produit, mais plutôt le pays où le code a été enregistré par l'entreprise.",
        usefulLinks: ["https://www.gs1.org/standards/id-keys/company-prefix", "https://www.barcodefaq.com/barcode-properties/symbologies/ean-13/"]
      },
      {
        id: 16,
        question: "Quelle est la fonction du chiffre de contrôle dans un code-barres ?",
        options: [
          "Identifier le fabricant",
          "Vérifier l'authenticité du produit",
          "Détecter les erreurs de lecture",
          "Indiquer le prix"
        ],
        correctAnswer: 2,
        explanation: "Le chiffre de contrôle, généralement le dernier chiffre d'un code-barres, sert à détecter les erreurs de lecture. Il est calculé à partir des autres chiffres du code selon un algorithme spécifique, ce qui permet au scanner de vérifier rapidement si le code a été lu correctement.",
        examples: "Par exemple, dans un code EAN-13, le 13e chiffre est calculé à partir des 12 premiers chiffres. Si le scanner obtient un résultat différent lors de la vérification, il sait qu'une erreur de lecture s'est produite.",
        usefulLinks: ["https://www.gs1.org/services/check-digit-calculator", "https://www.barcodeguide.com/category/check-digit-calculation"]
      },
      {
        id: 17,
        question: "Quelle organisation gère les standards des codes-barres au niveau international ?",
        options: [
          "ISO",
          "GS1",
          "IEEE",
          "W3C"
        ],
        correctAnswer: 1,
        explanation: "GS1 est l'organisation internationale à but non lucratif qui développe et maintient les standards mondiaux pour les codes-barres et l'identification des produits, notamment les standards EAN/UPC, GS1-128, GS1 DataMatrix, et GS1 QR Code.",
        examples: "GS1 attribue également les préfixes d'entreprise qui font partie des numéros GTIN (Global Trade Item Number) utilisés dans les codes-barres commerciaux.",
        usefulLinks: ["https://www.gs1.org/", "https://www.gs1.org/standards/barcodes"]
      },
      {
        id: 18,
        question: "Quelle technologie est utilisée dans les supermarchés pour la lecture automatique des codes-barres ?",
        options: [
          "Scanner à contact",
          "Scanner laser",
          "Lecteur RFID",
          "Caméra thermique"
        ],
        correctAnswer: 1,
        explanation: "Les supermarchés utilisent principalement des scanners laser pour lire les codes-barres. Ces scanners projettent un faisceau laser qui balaie le code-barres et détecte les variations de lumière réfléchie par les barres noires et les espaces blancs.",
        examples: "Les caisses de supermarché modernes utilisent souvent des scanners bi-optiques qui combinent plusieurs faisceaux laser pour lire les codes-barres dans pratiquement n'importe quelle orientation, accélérant ainsi le processus de passage en caisse.",
        usefulLinks: ["https://www.scandit.com/blog/how-barcode-scanners-work/", "https://www.posguys.com/barcode-scanner-information.html"]
      },
      {
        id: 19,
        question: "Quelle fonction spéciale peut être intégrée dans un code QR pour faciliter son utilisation ?",
        options: [
          "Autocorrection grammaticale",
          "Traduction automatique",
          "URL raccourcie",
          "Connexion Wi-Fi automatique"
        ],
        correctAnswer: 3,
        explanation: "Les codes QR peuvent contenir des données formatées spécifiquement pour configurer automatiquement une connexion Wi-Fi. Lorsqu'ils sont scannés, ces codes QR Wi-Fi peuvent automatiquement configurer le réseau, le mot de passe et le type de sécurité sur un smartphone sans que l'utilisateur ait à saisir ces informations manuellement.",
        examples: "D'autres fonctions spéciales des codes QR incluent l'ajout automatique d'un contact, l'envoi d'un SMS prédéfini, la composition d'un numéro de téléphone, ou l'ajout d'un événement au calendrier.",
        usefulLinks: ["https://www.qr-code-generator.com/solutions/wifi-qr-code/", "https://www.the-qrcode-generator.com/guides/wifi-qr-code"]
      },
      {
        id: 20,
        question: "Quel est l'avantage principal des codes Aztec par rapport aux autres codes 2D ?",
        options: [
          "Ils sont plus esthétiques",
          "Ils n'ont pas besoin de zone calme autour du code",
          "Ils peuvent stocker plus de données",
          "Ils sont plus colorés"
        ],
        correctAnswer: 1,
        explanation: "L'avantage principal des codes Aztec est qu'ils ne nécessitent pas de 'zone calme' (marge vide) autour du code, contrairement aux codes QR. Le motif de visée central en forme de carré concentrique permet au scanner de localiser et d'orienter le code sans avoir besoin d'espace supplémentaire autour.",
        examples: "Cette caractéristique rend les codes Aztec particulièrement adaptés aux applications où l'espace est limité, comme les billets électroniques de transport ou d'avion.",
        usefulLinks: ["https://en.wikipedia.org/wiki/Aztec_Code", "https://www.barcodefaq.com/2d/aztec-code/"]
      },
      {
        id: 21,
        question: "Quelle est la différence entre un code UPC-A et un code UPC-E ?",
        options: [
          "UPC-E est utilisé en Europe, UPC-A en Amérique",
          "UPC-A peut contenir des lettres, UPC-E uniquement des chiffres",
          "UPC-E est une version condensée de UPC-A",
          "UPC-A est en noir et blanc, UPC-E est en couleur"
        ],
        correctAnswer: 2,
        explanation: "UPC-E est une version condensée de UPC-A, conçue pour les produits plus petits où l'espace est limité. UPC-A contient 12 chiffres, tandis que UPC-E en contient 8 (dont 6 sont encodés dans le symbole). UPC-E supprime les zéros redondants pour créer un code-barres plus compact.",
        examples: "Par exemple, le code UPC-A 012345000058 peut être compressé en code UPC-E 01258, où les zéros sont supprimés selon des règles spécifiques.",
        usefulLinks: ["https://www.barcodefaq.com/barcode-properties/symbologies/upc-e/", "https://www.gs1us.org/tools/gs1-company-database-gepir/get-started-guide/upc-a-to-upc-e-compression"]
      },
      {
        id: 22,
        question: "Quelle technologie peut remplacer les codes-barres dans certaines applications logistiques ?",
        options: [
          "NFC",
          "RFID",
          "Bluetooth",
          "Wi-Fi"
        ],
        correctAnswer: 1,
        explanation: "La technologie RFID (Radio Frequency Identification) peut remplacer les codes-barres dans certaines applications logistiques. Contrairement aux codes-barres qui nécessitent une ligne de vue directe pour être lus, les puces RFID peuvent être lues à distance et à travers des matériaux, permettant la lecture simultanée de plusieurs articles et le suivi en temps réel.",
        examples: "Walmart, Amazon et d'autres grands détaillants utilisent la RFID pour gérer leurs inventaires et chaînes d'approvisionnement, ce qui leur permet de suivre les produits de la fabrication jusqu'au point de vente.",
        usefulLinks: ["https://www.atlasrfidstore.com/rfid-vs-barcodes/", "https://rfid4u.com/rfid-vs-barcode-comparison/"]
      },
      {
        id: 23,
        question: "Quel type de code-barres est spécialement conçu pour l'industrie pharmaceutique ?",
        options: [
          "Pharmacode",
          "Code 39",
          "GS1 DataBar",
          "Codabar"
        ],
        correctAnswer: 0,
        explanation: "Le Pharmacode (ou Code pharmaceutique) est un système de code-barres binaire spécialement conçu pour l'industrie pharmaceutique. Il est utilisé pour le contrôle qualité dans les processus de production et d'emballage des médicaments.",
        examples: "Le Pharmacode est particulièrement adapté aux environnements de production pharmaceutique car il peut être lu avec une fiabilité extrêmement élevée, même lorsqu'il est imprimé à faible contraste ou sur des surfaces courbes comme les ampoules ou les flacons.",
        usefulLinks: ["https://www.pharmaceutical-technology.com/glossary/pharmacode/", "https://www.laetus.com/solutions/barcode-verification/pharmacode-verification/"]
      },
      {
        id: 24,
        question: "Quelle est la particularité des codes MaxiCode utilisés par UPS ?",
        options: [
          "Ils sont colorés en marron",
          "Ils ont une forme hexagonale",
          "Ils contiennent un œil de bœuf central",
          "Ils sont imprimés en 3D"
        ],
        correctAnswer: 2,
        explanation: "Les codes MaxiCode, développés par UPS, ont une apparence distinctive avec un 'œil de bœuf' central (motif circulaire) entouré d'un motif de points hexagonaux. Cette conception permet une lecture omnidirectionnelle à grande vitesse, ce qui est idéal pour les opérations de tri de colis à haut débit.",
        examples: "UPS utilise le MaxiCode sur ses étiquettes d'expédition depuis les années 1990 pour encoder l'adresse de livraison, le code postal et d'autres informations d'acheminement.",
        usefulLinks: ["https://www.barcodefaq.com/2d/maxicode/", "https://www.ups.com/us/en/support/shipping-support/shipping-services-technology/maxicode.page"]
      },
      {
        id: 25,
        question: "Quel est le principe du code-barres invisible (ou filigrané) ?",
        options: [
          "Un code-barres imprimé avec une encre spéciale visible uniquement sous lumière UV",
          "Un motif intégré dans les images ou graphiques d'un document",
          "Un code-barres microscopique visible uniquement au microscope",
          "Un code-barres temporaire qui disparaît après quelques jours"
        ],
        correctAnswer: 1,
        explanation: "Les codes-barres invisibles ou filigranes numériques sont des motifs subtils intégrés dans les images ou les graphiques d'un document, généralement imperceptibles à l'œil nu mais détectables par des scanners spéciaux. Ils modifient légèrement la couleur ou la luminosité de certains pixels dans un motif spécifique.",
        examples: "Cette technologie est utilisée pour la protection contre la contrefaçon sur les billets de banque, les documents officiels, et pour le traçage des documents. Digimarc est l'un des principaux fournisseurs de cette technologie.",
        usefulLinks: ["https://www.digimarc.com/solutions/retail", "https://packagingeurope.com/news/invisible-barcodes-what-are-the-benefits/7259.article"]
      },
      {
        id: 26,
        question: "Quelle est la fonction d'un 'Quiet Zone' dans un code-barres ou un code QR ?",
        options: [
          "Stocker des informations confidentielles",
          "Améliorer la vitesse de lecture",
          "Permettre au scanner d'identifier les bords du code",
          "Réduire les interférences électromagnétiques"
        ],
        correctAnswer: 2,
        explanation: "La 'Zone Calme' (Quiet Zone) est une marge vide qui entoure un code-barres ou un code QR. Elle est essentielle pour permettre au scanner d'identifier clairement où commence et se termine le code, en le distinguant de son environnement.",
        examples: "Pour un code QR standard, la zone calme recommandée est d'au moins 4 modules (les petits carrés qui composent le code) de large sur tous les côtés. Sans cette zone, le scanner peut avoir des difficultés à identifier et décoder correctement le symbole.",
        usefulLinks: ["https://www.qrcode.com/en/howto/code.html", "https://www.barcodefaq.com/2d/qr-code/qr-code-quiet-zone/"]
      },
      {
        id: 27,
        question: "Quelle est la particularité des codes-barres ISBN utilisés pour les livres ?",
        options: [
          "Ils sont toujours imprimés en rouge",
          "Ils contiennent des informations sur l'éditeur et le titre",
          "Ils ne peuvent être scannés que par des appareils spéciaux",
          "Ils utilisent des symboles au lieu de chiffres"
        ],
        correctAnswer: 1,
        explanation: "Les codes-barres ISBN (International Standard Book Number) contiennent un identifiant unique pour chaque édition d'un livre. Le numéro ISBN lui-même, généralement imprimé au-dessus du code-barres, contient des segments qui identifient le pays ou la région linguistique, l'éditeur, et le titre spécifique.",
        examples: "Par exemple, dans l'ISBN 978-0-306-40615-7, '978' est le préfixe EAN, '0' représente la langue anglaise, '306' identifie l'éditeur, '40615' est l'identifiant unique du titre, et '7' est le chiffre de contrôle.",
        usefulLinks: ["https://www.isbn.org/about_ISBN_standard", "https://www.bowker.com/products/ISBN-US.html"]
      },
  ];
  
  
  export default CODEBARRE_QRCCODE_QCMQuestions;