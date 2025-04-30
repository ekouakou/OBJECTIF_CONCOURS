import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Fonction pour générer un PDF à partir d'un élément HTML
export const generatePDF = (elementId, filename) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element with ID '${elementId}' not found`);
    return;
  }

  // Afficher un message de chargement
  const loadingMessage = document.createElement('div');
  loadingMessage.style.position = 'fixed';
  loadingMessage.style.top = '50%';
  loadingMessage.style.left = '50%';
  loadingMessage.style.transform = 'translate(-50%, -50%)';
  loadingMessage.style.padding = '20px';
  loadingMessage.style.background = 'rgba(0, 0, 0, 0.7)';
  loadingMessage.style.color = 'white';
  loadingMessage.style.borderRadius = '10px';
  loadingMessage.style.zIndex = '9999';
  loadingMessage.textContent = 'Génération du PDF en cours...';
  document.body.appendChild(loadingMessage);

  // Utiliser html2canvas pour capturer le contenu
  html2canvas(element, {
    scale: 1,
    useCORS: true,
    logging: false,
    allowTaint: true
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Dimensions de la page PDF
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Dimensions du canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Calculer le ratio pour ajuster la taille
    const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
    const imgWidth = canvasWidth * ratio;
    const imgHeight = canvasHeight * ratio;
    
    // Calculer le nombre de pages nécessaires
    const pageCount = Math.ceil(canvasHeight / (pdfHeight * canvasWidth / imgWidth));
    
    // Ajouter chaque segment au PDF
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      
      const srcY = i * canvasWidth * pdfHeight / imgWidth;
      const srcHeight = Math.min(canvasWidth * pdfHeight / imgWidth, canvasHeight - srcY);
      
      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        imgWidth,
        srcHeight * imgWidth / canvasWidth,
        '',
        'FAST',
        0,
        srcY
      );
    }
    
    // Enregistrer le PDF
    pdf.save(filename);
    
    // Retirer le message de chargement
    document.body.removeChild(loadingMessage);
  });
};

// Obtenir les lettres d'options (A, B, C, D, etc.)
export const getOptionLetters = () => {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
};

// Basculer l'état de tous les éléments (réponses ou explications)
export const toggleAllItems = (questions, show) => {
  const newState = {};
  questions.forEach(question => {
    newState[question.id] = show;
  });
  return newState;
};

// Paginer les éléments
export const paginateItems = (items, page, itemsPerPage) => {
  const startIndex = (page - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
};

// Calculer le nombre total de pages
export const getTotalPages = (items, itemsPerPage) => {
  return Math.ceil(items.length / itemsPerPage);
};

// Fonction de recherche dans les questions
export const searchQuestions = (questions, searchTerm) => {
  if (!searchTerm) return questions;
  
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  return questions.filter(question => {
    // Recherche dans la question
    if (question.question.toLowerCase().includes(lowercaseSearchTerm)) return true;
    
    // Recherche dans les options
    if (question.options.some(option => option.toLowerCase().includes(lowercaseSearchTerm))) return true;
    
    // Recherche dans l'explication
    if (question.explanation && question.explanation.toLowerCase().includes(lowercaseSearchTerm)) return true;
    
    // Recherche dans l'explication détaillée
    if (question.detailedExplanation && question.detailedExplanation.toLowerCase().includes(lowercaseSearchTerm)) return true;
    
    // Recherche dans les exemples
    if (question.examples && question.examples.toLowerCase().includes(lowercaseSearchTerm)) return true;
    
    // Aucune correspondance trouvée
    return false;
  });
};

// Format du temps (pour les minuteurs)
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Timers et leur gestion
const timers = {};

// Démarrer un compte à rebours
export const startCountdown = (id, duration, setQuestionTimers, onTimeUp) => {
  // Arrêter le timer existant s'il y en a un
  if (timers[id]) {
    clearInterval(timers[id]);
  }

  // Initialiser l'état du timer
  setQuestionTimers(prev => ({
    ...prev,
    [id]: {
      timeLeft: duration,
      active: true,
      started: true,
      expired: false
    }
  }));

  // Créer un nouvel intervalle
  timers[id] = setInterval(() => {
    setQuestionTimers(prev => {
      const currentTimer = prev[id] || { timeLeft: duration, active: true, started: true, expired: false };
      
      // Vérifier si le timer est encore actif
      if (!currentTimer.active) {
        clearInterval(timers[id]);
        return prev;
      }

      // Décrémenter le temps restant
      const newTimeLeft = currentTimer.timeLeft - 1;
      
      // Si le temps est écoulé
      if (newTimeLeft <= 0) {
        clearInterval(timers[id]);
        onTimeUp(id);
        return prev;
      }

      // Mettre à jour le temps restant
      return {
        ...prev,
        [id]: {
          ...currentTimer,
          timeLeft: newTimeLeft
        }
      };
    });
  }, 1000);
};

// Arrêter un compte à rebours
export const stopCountdown = (id, setQuestionTimers) => {
  if (timers[id]) {
    clearInterval(timers[id]);
    delete timers[id];
    
    setQuestionTimers(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        active: false
      }
    }));
  }
};

// Nettoyer tous les minuteurs
export const clearAllTimers = () => {
  Object.keys(timers).forEach(id => {
    clearInterval(timers[id]);
    delete timers[id];
  });
};