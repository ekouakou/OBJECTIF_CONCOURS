import html2pdf from 'html2pdf.js';

// Génération du PDF
export const generatePDF = (elementId, filename) => {
    const element = document.getElementById(elementId);
    const opt = {
        margin: 10,
        filename: filename || 'qcm-informatique-complet.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
};

// Génère les lettres pour les options (de A à X)
export const getOptionLetters = () => 'ABCDEFGHIJKLMNOPQRSTUVWX';

// Activer/désactiver toutes les réponses
export const toggleAllItems = (items, value) => {
    const result = {};
    items.forEach(item => {
        result[item.id] = value;
    });
    return result;
};

// Préparer les données pour la pagination
export const paginateItems = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
};

// Calculer le nombre total de pages
export const getTotalPages = (items, itemsPerPage) => {
    return Math.ceil(items.length / itemsPerPage);
};

// Fonction de recherche
export const searchQuestions = (questions, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
        return questions;
    }
    
    const term = searchTerm.toLowerCase().trim();
    return questions.filter(question => {
        // Recherche dans la question
        if (question.question.toLowerCase().includes(term)) {
            return true;
        }
        // Recherche dans les options
        if (question.options.some(option => option.toLowerCase().includes(term))) {
            return true;
        }
        // Recherche dans l'explication
        if (question.explanation && question.explanation.toLowerCase().includes(term)) {
            return true;
        }
        // Recherche dans les exemples
        if (question.examples && question.examples.toLowerCase().includes(term)) {
            return true;
        }
        return false;
    });
};

// Formater le temps en minutes:secondes
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Vérifier si toutes les questions ont été répondues
export const allQuestionsAnswered = (questions, userAnswers) => {
    return questions.every(question => userAnswers[question.id] !== undefined);
};

// Stockage pour les références aux timers
const timerReferences = {};

// Fonction pour démarrer un compte à rebours pour une question
export const startCountdown = (questionId, timeLimit, setTimers, onTimeUp) => {
    console.log(`Démarrage du compte à rebours pour la question ${questionId} avec ${timeLimit} secondes`);
    
    // Arrêter le timer existant s'il y en a un
    if (timerReferences[questionId]) {
        clearInterval(timerReferences[questionId]);
        timerReferences[questionId] = null;
    }
    
    // Initialiser le timer dans l'état
    setTimers(prev => ({
        ...prev,
        [questionId]: {
            timeLeft: timeLimit,
            active: true,
            started: true,
            expired: false
        }
    }));
    
    // Créer le nouveau timer
    const intervalId = setInterval(() => {
        setTimers(prev => {
            // Vérifier si le timer est encore dans l'état
            if (!prev[questionId]) return prev;
            
            const currentTimeLeft = prev[questionId].timeLeft;
            const newTimeLeft = Math.max(0, currentTimeLeft - 1);
            
            console.log(`Question ${questionId}: ${currentTimeLeft} -> ${newTimeLeft}`);
            
            // Si le temps est écoulé
            if (newTimeLeft === 0) {
                console.log(`Temps écoulé pour la question ${questionId}`);
                clearInterval(intervalId);
                timerReferences[questionId] = null;
                
                if (onTimeUp) {
                    onTimeUp(questionId);
                }
                
                return {
                    ...prev,
                    [questionId]: {
                        ...prev[questionId],
                        timeLeft: 0,
                        active: false,
                        expired: true
                    }
                };
            }
            
            // Sinon, mettre à jour le temps restant
            return {
                ...prev,
                [questionId]: {
                    ...prev[questionId],
                    timeLeft: newTimeLeft
                }
            };
        });
    }, 1000);
    
    // Stocker la référence au timer
    timerReferences[questionId] = intervalId;
    
    return intervalId;
};

// Fonction pour arrêter un compte à rebours
export const stopCountdown = (questionId, setTimers) => {
    console.log(`Arrêt du compte à rebours pour la question ${questionId}`);
    
    if (timerReferences[questionId]) {
        clearInterval(timerReferences[questionId]);
        timerReferences[questionId] = null;
        
        setTimers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                active: false
            }
        }));
    }
};

// Nettoyer tous les timers
export const clearAllTimers = () => {
    console.log("Nettoyage de tous les minuteurs");
    
    Object.keys(timerReferences).forEach(questionId => {
        if (timerReferences[questionId]) {
            console.log(`Nettoyage du minuteur pour la question ${questionId}`);
            clearInterval(timerReferences[questionId]);
            timerReferences[questionId] = null;
        }
    });
    
    // Ne pas retourner d'objet vide pour éviter de réinitialiser l'état des timers
    // Au lieu de cela, c'est la responsabilité de l'appelant de mettre à jour l'état
};