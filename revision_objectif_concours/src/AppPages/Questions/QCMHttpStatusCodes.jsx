const QCMHttpStatusCodes = [
    // ---------------- 1xx : Information ----------------
    {
      id: 1,
      question: "Que signifie le code HTTP 100 (Continue) ?",
      options: [
        "Le serveur a compris la requête et l'a acceptée.",
        "Le serveur demande au client de continuer l'envoi de la requête.",
        "La ressource demandée est disponible à un autre emplacement.",
        "Le serveur a rencontré une erreur interne."
      ],
      correctAnswer: 1,
      explanation: "Le code 100 (Continue) est une réponse intermédiaire indiquant que le serveur a reçu les en-têtes de la requête et que le client peut continuer à envoyer le corps de la requête.",
      examples: "Par exemple, lors de l'envoi d'un fichier volumineux, le serveur peut répondre avec 100 pour demander au client de continuer.",
      usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/100"]
    },
    {
      id: 2,
      question: "Que signifie le code HTTP 101 (Switching Protocols) ?",
      options: [
        "La requête a été traitée avec succès.",
        "Le serveur change de protocole comme demandé par le client.",
        "Le serveur redirige temporairement vers une autre URL.",
        "La ressource n'a pas été modifiée."
      ],
      correctAnswer: 1,
      explanation: "Le code 101 indique que le serveur accepte de passer à un autre protocole comme demandé via l'en-tête Upgrade.",
      examples: "Lors d'une mise à jour de connexion HTTP vers WebSocket, une réponse 101 est envoyée.",
      usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/101"]
    },
    {
      id: 3,
      question: "Que signifie le code HTTP 102 (Processing) ?",
      options: [
        "La requête est encore en cours de traitement.",
        "La ressource a été déplacée définitivement.",
        "Le serveur ne trouve pas la ressource demandée.",
        "L'accès à la ressource est interdit."
      ],
      correctAnswer: 0,
      explanation: "Le code 102 signifie que le serveur a reçu la requête et la traite, mais qu'aucune réponse finale n'est disponible pour l'instant.",
      examples: "Utilisé dans WebDAV pour indiquer que le traitement d'une requête complexe prend du temps.",
      usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/102"]
    },
    {
      id: 4,
      question: "Que signifie le code HTTP 103 (Early Hints) ?",
      options: [
        "Le serveur est en train de changer de protocole.",
        "La requête est acceptée pour traitement mais non encore terminée.",
        "Le serveur envoie des en-têtes avant la réponse finale pour précharger des ressources.",
        "La ressource a été définitivement supprimée."
      ],
      correctAnswer: 2,
      explanation: "Le code 103 permet d'envoyer des en-têtes de réponse précoces avant que la réponse finale ne soit prête, pour accélérer le chargement de ressources.",
      examples: "Un serveur peut envoyer des en-têtes Link pour précharger des fichiers CSS/JS avant l'arrivée de la réponse 200.",
      usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/103"]
    },
    // ---------------- 2xx : Succès ----------------
{
    id: 5,
    question: "Que signifie le code HTTP 200 (OK) ?",
    options: [
      "La ressource a été créée.",
      "La requête a réussi.",
      "La ressource a été déplacée temporairement.",
      "Le serveur demande au client de continuer."
    ],
    correctAnswer: 1,
    explanation: "Le code 200 signifie que la requête a réussi et que le serveur a renvoyé la réponse attendue.",
    examples: "Lorsqu'on demande une page web et que le serveur renvoie son contenu sans erreur.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/200"]
  },
  {
    id: 6,
    question: "Que signifie le code HTTP 201 (Created) ?",
    options: [
      "La ressource a été supprimée.",
      "La requête est acceptée pour traitement.",
      "La requête a entraîné la création d'une ressource.",
      "La ressource n'existe plus."
    ],
    correctAnswer: 2,
    explanation: "Le code 201 indique que la requête a réussi et qu'une nouvelle ressource a été créée en conséquence.",
    examples: "Lorsqu'un nouvel utilisateur est enregistré via une API REST.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/201"]
  },
  {
    id: 7,
    question: "Que signifie le code HTTP 202 (Accepted) ?",
    options: [
      "La requête a été traitée immédiatement.",
      "La requête a été reçue mais pas encore traitée.",
      "Le serveur refuse d'exécuter la requête.",
      "La ressource est introuvable."
    ],
    correctAnswer: 1,
    explanation: "Le code 202 signifie que la requête a été acceptée pour traitement, mais que le traitement n'est pas encore terminé.",
    examples: "Souvent utilisé pour lancer des traitements asynchrones comme l'analyse d'une image.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/202"]
  },
  {
    id: 8,
    question: "Que signifie le code HTTP 203 (Non-Authoritative Information) ?",
    options: [
      "Le serveur a répondu avec des métadonnées provenant d'une autre source.",
      "La requête a échoué.",
      "La ressource a été déplacée définitivement.",
      "L'accès est interdit."
    ],
    correctAnswer: 0,
    explanation: "Le code 203 indique que la réponse est correcte mais les informations proviennent d'une source non officielle.",
    examples: "Un proxy modifie la réponse originale avant de la renvoyer au client.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/203"]
  },
  {
    id: 9,
    question: "Que signifie le code HTTP 204 (No Content) ?",
    options: [
      "La requête a échoué.",
      "La requête a réussi mais sans contenu à renvoyer.",
      "La ressource a été créée.",
      "Le serveur a rencontré une erreur."
    ],
    correctAnswer: 1,
    explanation: "Le code 204 indique que la requête a été traitée avec succès mais qu'il n'y a aucun contenu à renvoyer.",
    examples: "Après une suppression réussie d'une ressource sans réponse nécessaire.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/204"]
  },
  {
    id: 10,
    question: "Que signifie le code HTTP 205 (Reset Content) ?",
    options: [
      "La session est expirée.",
      "Le client doit réinitialiser le document affiché.",
      "Le serveur refuse la requête.",
      "Le traitement est en cours."
    ],
    correctAnswer: 1,
    explanation: "Le code 205 signifie que le client doit réinitialiser la vue actuelle, par exemple vider un formulaire.",
    examples: "Après soumission d'un formulaire, pour effacer les champs.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/205"]
  },
  {
    id: 11,
    question: "Que signifie le code HTTP 206 (Partial Content) ?",
    options: [
      "La requête est incomplète.",
      "Le serveur retourne une partie de la ressource.",
      "La ressource a été supprimée définitivement.",
      "Le serveur a changé de protocole."
    ],
    correctAnswer: 1,
    explanation: "Le code 206 indique que le serveur renvoie une partie de la ressource (par exemple pour les téléchargements en plusieurs morceaux).",
    examples: "Lorsqu'un client demande uniquement un morceau d'un fichier via l'en-tête 'Range'.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/206"]
  },
  {
    id: 12,
    question: "Que signifie le code HTTP 207 (Multi-Status) ?",
    options: [
      "La ressource a été mise à jour partiellement.",
      "Le serveur renvoie plusieurs réponses pour une seule requête.",
      "La requête a échoué totalement.",
      "Le serveur demande un changement de protocole."
    ],
    correctAnswer: 1,
    explanation: "Le code 207 indique que le serveur fournit plusieurs statuts dans une seule réponse, souvent utilisé avec WebDAV.",
    examples: "Répondre avec les statuts de plusieurs fichiers dans une opération WebDAV.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/207"]
  },
  {
    id: 13,
    question: "Que signifie le code HTTP 208 (Already Reported) ?",
    options: [
      "La ressource est déjà présente dans la réponse précédente.",
      "Le traitement est en cours.",
      "La ressource a été supprimée.",
      "Le client doit s'authentifier."
    ],
    correctAnswer: 0,
    explanation: "Le code 208 signifie que les éléments ont déjà été signalés dans une réponse précédente, notamment en cas de réponses de collections WebDAV.",
    examples: "Lors d'une synchronisation de répertoires WebDAV où les statuts ont déjà été fournis.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/208"]
  },
  {
    id: 14,
    question: "Que signifie le code HTTP 226 (IM Used) ?",
    options: [
      "Le serveur a rencontré une erreur.",
      "Le serveur a utilisé des métadonnées de transformations pour renvoyer une ressource modifiée.",
      "La requête a échoué à cause d'un mauvais format.",
      "Le serveur exige une authentification supplémentaire."
    ],
    correctAnswer: 1,
    explanation: "Le code 226 indique que la ressource a été manipulée par une ou plusieurs transformations définies dans la requête.",
    examples: "Utilisé avec la fonctionnalité HTTP Delta Encoding pour ne récupérer que des modifications.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/226"]
  },
  // ---------------- 3xx : Redirections ----------------
{
    id: 15,
    question: "Que signifie le code HTTP 300 (Multiple Choices) ?",
    options: [
      "La requête a réussi, mais il existe plusieurs ressources possibles.",
      "La ressource a été déplacée de façon permanente.",
      "Le serveur a rencontré une erreur interne.",
      "Le client doit attendre avant de refaire la requête."
    ],
    correctAnswer: 0,
    explanation: "Le code 300 indique que le client doit choisir entre plusieurs options de ressources possibles.",
    examples: "Lorsqu'une ressource peut être accessible via plusieurs formats (par exemple, HTML ou JSON).",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/300"]
  },
  {
    id: 16,
    question: "Que signifie le code HTTP 301 (Moved Permanently) ?",
    options: [
      "La ressource a été déplacée de façon permanente vers une nouvelle URL.",
      "La requête a échoué.",
      "Le serveur est occupé.",
      "La ressource est temporairement inaccessible."
    ],
    correctAnswer: 0,
    explanation: "Le code 301 signifie que la ressource a été déplacée de façon permanente vers une nouvelle URL, et le client doit utiliser cette nouvelle URL pour les futures requêtes.",
    examples: "Un site web qui a changé d'adresse et redirige toutes les anciennes pages vers les nouvelles.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/301"]
  },
  {
    id: 17,
    question: "Que signifie le code HTTP 302 (Found) ?",
    options: [
      "La ressource a été déplacée de façon permanente.",
      "La ressource est disponible ailleurs.",
      "La ressource a été déplacée temporairement.",
      "La requête est incorrecte."
    ],
    correctAnswer: 2,
    explanation: "Le code 302 indique que la ressource a été déplacée temporairement vers une autre URL, et que le client doit utiliser la même URL pour les futures requêtes.",
    examples: "Lors de la redirection d'un utilisateur pendant une maintenance ou une mise à jour temporaire.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/302"]
  },
  {
    id: 18,
    question: "Que signifie le code HTTP 303 (See Other) ?",
    options: [
      "Le serveur a rencontré une erreur interne.",
      "Le client doit effectuer une nouvelle requête à une autre URL.",
      "La ressource est introuvable.",
      "La requête a échoué."
    ],
    correctAnswer: 1,
    explanation: "Le code 303 signifie que le client doit faire une requête GET à une autre URL pour obtenir la ressource demandée.",
    examples: "Souvent utilisé après une soumission de formulaire (POST) pour rediriger vers une page de confirmation.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/303"]
  },
  {
    id: 19,
    question: "Que signifie le code HTTP 304 (Not Modified) ?",
    options: [
      "La ressource a été modifiée depuis la dernière requête.",
      "La requête est valide, mais aucune modification n'a été effectuée.",
      "Le serveur a échoué à traiter la requête.",
      "Le client doit se réauthentifier."
    ],
    correctAnswer: 1,
    explanation: "Le code 304 signifie que la ressource demandée n'a pas été modifiée depuis la dernière requête du client, donc aucun nouveau contenu n'est renvoyé.",
    examples: "Utilisé pour la mise en cache dans les navigateurs.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/304"]
  },
  {
    id: 20,
    question: "Que signifie le code HTTP 305 (Use Proxy) ?",
    options: [
      "Le client doit passer par un serveur proxy.",
      "La ressource est inaccessible.",
      "Le serveur a refusé la requête.",
      "Le client doit se réauthentifier."
    ],
    correctAnswer: 0,
    explanation: "Le code 305 signifie que le client doit passer par un serveur proxy pour accéder à la ressource.",
    examples: "Lorsque l'accès à une ressource est filtré et nécessite un proxy.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/305"]
  },
  {
    id: 21,
    question: "Que signifie le code HTTP 306 (Switch Proxy) ?",
    options: [
      "Le client doit changer de proxy.",
      "Le serveur a rencontré une erreur interne.",
      "La ressource a été supprimée.",
      "Le serveur redirige l'utilisateur vers une autre page."
    ],
    correctAnswer: 0,
    explanation: "Le code 306 était réservé pour indiquer que le client devait changer de proxy. Cependant, il n'est plus utilisé.",
    examples: "Ce code n'est plus couramment utilisé.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/306"]
  },
  {
    id: 22,
    question: "Que signifie le code HTTP 307 (Temporary Redirect) ?",
    options: [
      "La ressource a été déplacée définitivement.",
      "La requête a échoué.",
      "La ressource a été déplacée temporairement vers une autre URL.",
      "Le serveur demande un changement de protocole."
    ],
    correctAnswer: 2,
    explanation: "Le code 307 indique que la ressource a été déplacée temporairement vers une autre URL, et que le client doit utiliser cette URL pour cette requête uniquement.",
    examples: "Utilisé pendant une mise à jour ou un processus temporaire de redirection.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/307"]
  },
  {
    id: 23,
    question: "Que signifie le code HTTP 308 (Permanent Redirect) ?",
    options: [
      "La ressource a été déplacée définitivement vers une autre URL.",
      "Le serveur ne peut pas traiter la requête.",
      "Le client doit réauthentifier.",
      "Le serveur a échoué."
    ],
    correctAnswer: 0,
    explanation: "Le code 308 indique que la ressource a été déplacée définitivement vers une autre URL et que cette nouvelle URL doit être utilisée pour toutes les requêtes futures.",
    examples: "Lorsque l'URL de la ressource est changée de façon permanente.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/308"]
  },
// ---------------- 4xx : Erreurs Client ----------------
{
    id: 24,
    question: "Que signifie le code HTTP 400 (Bad Request) ?",
    options: [
      "La requête est valide et acceptée.",
      "La requête est mal formulée.",
      "La ressource n'existe pas.",
      "Le serveur a rencontré une erreur."
    ],
    correctAnswer: 1,
    explanation: "Le code 400 indique que le serveur ne peut pas traiter la requête car elle est mal formulée ou invalide.",
    examples: "Par exemple, si un paramètre obligatoire est manquant dans une requête API.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/400"]
  },
  {
    id: 25,
    question: "Que signifie le code HTTP 401 (Unauthorized) ?",
    options: [
      "L'accès est refusé en raison de l'absence d'une authentification valide.",
      "La ressource est introuvable.",
      "Le serveur est temporairement inaccessible.",
      "Le serveur n'a pas pu traiter la requête."
    ],
    correctAnswer: 0,
    explanation: "Le code 401 indique que l'authentification est requise pour accéder à la ressource et que l'authentification fournie est manquante ou invalide.",
    examples: "Si un utilisateur essaie d'accéder à une page protégée sans être connecté.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/401"]
  },
  {
    id: 26,
    question: "Que signifie le code HTTP 402 (Payment Required) ?",
    options: [
      "L'accès à la ressource est autorisé.",
      "La ressource est payante et le paiement est nécessaire.",
      "Le serveur a échoué.",
      "L'authentification est incorrecte."
    ],
    correctAnswer: 1,
    explanation: "Le code 402 signifie que l'accès à la ressource est limité et qu'un paiement est requis.",
    examples: "Utilisé dans des systèmes d'abonnement ou d'achat pour accéder à du contenu premium.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/402"]
  },
  {
    id: 27,
    question: "Que signifie le code HTTP 403 (Forbidden) ?",
    options: [
      "Le serveur refuse d'exécuter la requête.",
      "Le client a envoyé une requête invalide.",
      "La ressource est introuvable.",
      "Le serveur a rencontré une erreur interne."
    ],
    correctAnswer: 0,
    explanation: "Le code 403 indique que le serveur refuse d'exécuter la requête, généralement pour des raisons d'autorisation.",
    examples: "Lorsqu'un utilisateur tente d'accéder à un fichier ou une page qu'il n'est pas autorisé à voir.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/403"]
  },
  {
    id: 28,
    question: "Que signifie le code HTTP 404 (Not Found) ?",
    options: [
      "Le serveur a rencontré une erreur.",
      "La ressource demandée n'a pas été trouvée.",
      "Le client a envoyé une requête mal formée.",
      "Le serveur exige une authentification."
    ],
    correctAnswer: 1,
    explanation: "Le code 404 indique que la ressource demandée n'a pas été trouvée sur le serveur.",
    examples: "Lorsqu'un utilisateur essaie d'accéder à une page web qui n'existe pas.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/404"]
  },
  {
    id: 29,
    question: "Que signifie le code HTTP 405 (Method Not Allowed) ?",
    options: [
      "La méthode HTTP utilisée est interdite pour cette ressource.",
      "La requête a réussi, mais la ressource n'existe pas.",
      "Le serveur exige une authentification.",
      "Le serveur ne peut pas traiter la requête."
    ],
    correctAnswer: 0,
    explanation: "Le code 405 signifie que la méthode HTTP utilisée (comme GET, POST, etc.) n'est pas autorisée pour la ressource demandée.",
    examples: "Si un utilisateur tente d'envoyer des données avec GET alors que la ressource nécessite une méthode POST.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/405"]
  },
// ---------------- 5xx : Erreurs Serveur ----------------
{
    id: 30,
    question: "Que signifie le code HTTP 500 (Internal Server Error) ?",
    options: [
      "Le client a envoyé une requête incorrecte.",
      "Le serveur a rencontré une erreur interne.",
      "La ressource demandée est introuvable.",
      "Le client doit se réauthentifier."
    ],
    correctAnswer: 1,
    explanation: "Le code 500 indique qu'une erreur interne s'est produite sur le serveur, empêchant le traitement de la requête.",
    examples: "Lorsqu'un serveur rencontre une exception non gérée lors du traitement d'une requête.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/500"]
  },
  {
    id: 31,
    question: "Que signifie le code HTTP 502 (Bad Gateway) ?",
    options: [
      "Le serveur a agi en tant que proxy et a reçu une réponse invalide.",
      "La ressource demandée est introuvable.",
      "Le client doit se réauthentifier.",
      "Le serveur ne peut pas traiter la requête."
    ],
    correctAnswer: 0,
    explanation: "Le code 502 indique qu'un serveur agissant en tant que proxy ou passerelle a reçu une réponse invalide d'un autre serveur.",
    examples: "Lorsqu'un serveur proxy ne parvient pas à obtenir une réponse valide du serveur principal.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/502"]
  },
  {
    id: 32,
    question: "Que signifie le code HTTP 503 (Service Unavailable) ?",
    options: [
      "Le serveur est temporairement hors service.",
      "Le client a envoyé une requête incorrecte.",
      "La ressource est introuvable.",
      "Le serveur exige une authentification."
    ],
    correctAnswer: 0,
    explanation: "Le code 503 signifie que le serveur est temporairement hors service, généralement en raison d'une surcharge ou d'une maintenance.",
    examples: "Lorsqu'un site Web subit une forte afflux de trafic et ne peut pas répondre aux demandes.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/503"]
  },
  {
    id: 33,
    question: "Que signifie le code HTTP 504 (Gateway Timeout) ?",
    options: [
      "Le serveur a agi en tant que proxy et a expiré en attendant une réponse.",
      "La requête a échoué.",
      "Le serveur a rencontré une erreur interne.",
      "La ressource est introuvable."
    ],
    correctAnswer: 0,
    explanation: "Le code 504 indique qu'un serveur agissant en tant que proxy ou passerelle n'a pas reçu de réponse dans le délai imparti.",
    examples: "Lorsqu'un serveur proxy attend une réponse d'un autre serveur, mais que le délai de réponse expire.",
    usefulLinks: ["https://developer.mozilla.org/fr/docs/Web/HTTP/Status/504"]
  }
      
  ];
  

  export default QCMHttpStatusCodes;