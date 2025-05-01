// useSpeechSynthesis.js
import { useRef, useCallback } from 'react';

export const useSpeechSynthesis = () => {
    const currentUtteranceRef = useRef(null);

    // Fonction pour annuler toute lecture en cours
    const cancelAllSpeech = useCallback(() => {
        if (window.speechSynthesis) {
            // Annuler toute synthèse vocale en cours
            window.speechSynthesis.cancel();
        }
        
        // Réinitialiser la référence
        currentUtteranceRef.current = null;
    }, []);

    // Fonction pour lire du texte
    const speakText = useCallback((text, onEndCallback = null) => {
        // Vérifier que l'API est disponible
        if (!window.speechSynthesis) {
            console.error('Speech synthesis not supported');
            return;
        }

        // Annuler toute lecture précédente pour éviter les chevauchements
        cancelAllSpeech();

        // Créer une nouvelle utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configurer la langue (français)
        utterance.lang = 'fr-FR';
        
        // Ajouter le callback de fin si fourni
        if (onEndCallback) {
            utterance.onend = () => {
                // S'assurer que l'événement n'est appelé qu'une seule fois
                utterance.onend = null;
                
                // Supprimer la référence une fois terminée
                if (currentUtteranceRef.current === utterance) {
                    currentUtteranceRef.current = null;
                }
                
                // Appeler le callback fourni
                onEndCallback();
            };
            
            // Gérer également les erreurs pour éviter les blocages
            utterance.onerror = () => {
                utterance.onend = null;
                utterance.onerror = null;
                
                if (currentUtteranceRef.current === utterance) {
                    currentUtteranceRef.current = null;
                }
                
                onEndCallback();
            };
        }
        
        // Stocker la référence à cette utterance
        currentUtteranceRef.current = utterance;
        
        // Démarrer la lecture
        window.speechSynthesis.speak(utterance);
    }, [cancelAllSpeech]);

    return {
        speakText,
        cancelAllSpeech,
        currentUtteranceRef
    };
};