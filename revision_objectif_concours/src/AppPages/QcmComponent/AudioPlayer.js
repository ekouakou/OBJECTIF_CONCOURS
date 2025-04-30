import React, { useState, useEffect, useRef } from 'react';
import { Button, Whisper, Tooltip } from 'rsuite';
import { Speaker, PauseOutline } from '@rsuite/icons';
import 'rsuite/dist/rsuite.min.css';

const AudioPlayer = ({ id, text, isPlaying, setIsPlaying, speechSynthRef, buttonText }) => {
  const [isSupported, setIsSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState([]);
  const selectedVoiceRef = useRef(null);

  // Vérification du support et chargement initial des voix
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    // Fonction pour initialiser et charger les voix
    const initVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Log toutes les voix disponibles
        if (voices.length > 0) {
          console.log('Voix disponibles:', voices.map(v => `${v.name} (${v.lang})`));
          
          // Présélection de la voix pour accélérer la lecture
          selectedVoiceRef.current = findBestFrenchFemaleVoice(voices);
          if (selectedVoiceRef.current) {
            console.log('Voix présélectionnée:', selectedVoiceRef.current.name);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des voix:", error);
      }
    };

    // Chargement initial
    initVoices();

    // Configuration de l'événement pour les navigateurs qui chargent les voix de manière asynchrone
    window.speechSynthesis.onvoiceschanged = initVoices;

    // Nettoyage au démontage du composant
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      
      // S'assurer que toute lecture en cours est arrêtée
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Fonction pour trouver la meilleure voix féminine française
  const findBestFrenchFemaleVoice = (voices) => {
    if (!voices || !voices.length) return null;
    
    // 1. Voix Google féminine française
    const googleFrenchFemaleVoice = voices.find(voice => 
      voice.lang.includes('fr') && 
      voice.name.includes('Google') && 
      (voice.name.toLowerCase().includes('female') || 
       voice.name.toLowerCase().includes('féminin') ||
       voice.name.toLowerCase().includes('femme'))
    );
    
    if (googleFrenchFemaleVoice) {
      return googleFrenchFemaleVoice;
    }
    
    // 2. N'importe quelle voix Google française
    const googleFrenchVoice = voices.find(voice => 
      voice.lang.includes('fr') && 
      voice.name.includes('Google')
    );
    
    if (googleFrenchVoice) {
      return googleFrenchVoice;
    }
    
    // 3. N'importe quelle voix féminine française
    const femaleFrenchVoice = voices.find(voice => 
      voice.lang.includes('fr') && 
      (voice.name.toLowerCase().includes('female') || 
       voice.name.toLowerCase().includes('féminin') ||
       voice.name.toLowerCase().includes('femme'))
    );
    
    if (femaleFrenchVoice) {
      return femaleFrenchVoice;
    }
    
    // 4. N'importe quelle voix française
    const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
    
    if (frenchVoice) {
      return frenchVoice;
    }
    
    return null;
  };

  // Fonction principale pour gérer la lecture audio
  const toggleSpeech = () => {
    // Vérifier que la synthèse vocale est disponible
    if (!window.speechSynthesis) {
      console.error("La synthèse vocale n'est pas disponible");
      return;
    }
    
    // Si la lecture est déjà en cours pour cet élément, l'arrêter
    if (isPlaying[id]) {
      window.speechSynthesis.cancel();
      
      setIsPlaying(prev => ({
        ...prev,
        [id]: false
      }));
      return;
    }
    
    // ÉTAPE CRUCIALE: Réinitialiser complètement l'état de la synthèse vocale
    window.speechSynthesis.cancel();
    
    // Attendre un court instant pour s'assurer que la synthèse est bien réinitialisée
    setTimeout(() => {
      // Vérifier que nous avons du texte à lire
      if (!text || text.trim() === '') {
        console.warn("Aucun texte à lire");
        return;
      }
      
      // Créer un nouvel objet d'énonciation
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configuration des paramètres de base
      utterance.lang = 'fr-FR';
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // Légèrement plus aigu pour une voix plus féminine
      utterance.volume = 1.0;
      
      // Sélectionner la voix
      try {
        // Utiliser la voix présélectionnée si disponible
        if (selectedVoiceRef.current) {
          utterance.voice = selectedVoiceRef.current;
          console.log('Utilisation de la voix présélectionnée:', selectedVoiceRef.current.name);
        } 
        // Sinon essayer de trouver une voix en direct
        else {
          const voices = window.speechSynthesis.getVoices();
          const bestVoice = findBestFrenchFemaleVoice(voices);
          
          if (bestVoice) {
            utterance.voice = bestVoice;
            console.log('Voix sélectionnée en direct:', bestVoice.name);
          } else {
            console.log('Aucune voix française trouvée. Utilisation de la voix par défaut.');
          }
        }
      } catch (error) {
        console.error("Erreur lors de la sélection de la voix:", error);
      }
      
      // Gestion des événements
      utterance.onstart = () => {
        console.log('Début de la lecture vocale');
        
        // Réinitialiser toutes les lectures en cours
        const newIsPlaying = {};
        Object.keys(isPlaying).forEach(key => {
          newIsPlaying[key] = false;
        });
        
        // Activer uniquement la lecture actuelle
        setIsPlaying({
          ...newIsPlaying,
          [id]: true
        });
      };
      
      utterance.onend = () => {
        console.log('Fin de la lecture vocale');
        setIsPlaying(prev => ({
          ...prev,
          [id]: false
        }));
      };
      
      utterance.onerror = (event) => {
        console.error(`Erreur de synthèse vocale (${event.error}):`, event);
        setIsPlaying(prev => ({
          ...prev,
          [id]: false
        }));
      };
      
      // Démarrer la lecture vocale
      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Erreur lors du démarrage de la lecture:", error);
        setIsPlaying(prev => ({
          ...prev,
          [id]: false
        }));
      }
    }, 100); // Délai de sécurité
  };

  // Si la synthèse vocale n'est pas prise en charge, ne pas rendre le bouton
  if (!isSupported) {
    return null;
  }

  return (
    <Whisper
      placement="top"
      trigger="hover"
      speaker={
        <Tooltip>
          {isPlaying[id] ? 'Arrêter la lecture audio' : buttonText || 'Lire à haute voix'}
        </Tooltip>
      }
    >
      <Button
        appearance="subtle"
        size="sm"
        onClick={toggleSpeech}
        className="audio-button"
      >
        {isPlaying[id] ? <PauseOutline /> : <Speaker />}
      </Button>
    </Whisper>
  );
};

export default AudioPlayer;