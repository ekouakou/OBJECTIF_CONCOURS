import React, { useState, useEffect } from 'react';
import { Button, Whisper, Tooltip } from 'rsuite';
import { Speaker, PauseOutline } from '@rsuite/icons';
import 'rsuite/dist/rsuite.min.css';

const AudioPlayer = ({ id, text, isPlaying, setIsPlaying, speechSynthRef, buttonText }) => {
  const [isSupported, setIsSupported] = useState(true);
  const [voices, setVoices] = useState([]);
  
  useEffect(() => {
    // Vérifier si la synthèse vocale est prise en charge
    setIsSupported('speechSynthesis' in window);
    
    // Fonction pour charger les voix disponibles
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    
    // Charger les voix initiales
    loadVoices();
    
    // Certains navigateurs chargent les voix de manière asynchrone
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Fonction pour trouver la meilleure voix féminine française de Google
  const getBestFrenchFemaleVoice = () => {
    // Si les voix n'ont pas été chargées, essayez de les récupérer directement
    if (!voices.length && window.speechSynthesis) {
      const directVoices = window.speechSynthesis.getVoices();
      if (directVoices.length > 0) {
        return findBestVoice(directVoices);
      }
      return null;
    }
    
    return findBestVoice(voices);
  };
  
  // Fonction séparée pour la logique de recherche de voix
  const findBestVoice = (voicesList) => {
    if (!voicesList || !voicesList.length) return null;
    
    // Priorités pour la sélection de voix
    // 1. Voix Google féminine française
    const googleFrenchFemaleVoices = voicesList.filter(voice => 
      voice.lang.includes('fr') && 
      voice.name.includes('Google') && 
      (voice.name.toLowerCase().includes('female') || 
       voice.name.toLowerCase().includes('féminin') ||
       voice.name.toLowerCase().includes('femme'))
    );
    
    if (googleFrenchFemaleVoices.length > 0) {
      console.log("Utilisation d'une voix Google féminine française:", googleFrenchFemaleVoices[0].name);
      return googleFrenchFemaleVoices[0];
    }
    
    // 2. N'importe quelle voix Google française
    const googleFrenchVoices = voicesList.filter(voice => 
      voice.lang.includes('fr') && 
      voice.name.includes('Google')
    );
    
    if (googleFrenchVoices.length > 0) {
      console.log("Utilisation d'une voix Google française:", googleFrenchVoices[0].name);
      return googleFrenchVoices[0];
    }
    
    // 3. N'importe quelle voix féminine française
    const femaleFrenchVoices = voicesList.filter(voice => 
      voice.lang.includes('fr') && 
      (voice.name.toLowerCase().includes('female') || 
       voice.name.toLowerCase().includes('féminin') ||
       voice.name.toLowerCase().includes('femme'))
    );
    
    if (femaleFrenchVoices.length > 0) {
      console.log("Utilisation d'une voix féminine française (non-Google):", femaleFrenchVoices[0].name);
      return femaleFrenchVoices[0];
    }
    
    // 4. N'importe quelle voix française
    const frenchVoices = voicesList.filter(voice => voice.lang.includes('fr'));
    
    if (frenchVoices.length > 0) {
      console.log("Utilisation d'une voix française:", frenchVoices[0].name);
      return frenchVoices[0];
    }
    
    // Si aucune voix française n'est disponible, utiliser la voix par défaut
    console.log("Aucune voix française trouvée. Utilisation de la voix par défaut.");
    return null;
  };

  // Fonction pour gérer la lecture audio avec gestion améliorée des erreurs
  const toggleSpeech = () => {
    // Si la lecture est déjà en cours pour cet élément, l'arrêter
    if (isPlaying[id]) {
      if (speechSynthRef.current) {
        try {
          speechSynthRef.current.cancel();
        } catch (error) {
          console.warn("Erreur lors de l'annulation de la synthèse vocale:", error);
        }
      }
      setIsPlaying((prev) => ({
        ...prev,
        [id]: false
      }));
      return;
    }
    
    // Pause pour éviter les conflits avec des annulations précédentes
    setTimeout(() => {
      // Arrêter toute lecture en cours
      if (speechSynthRef.current) {
        try {
          speechSynthRef.current.cancel();
        } catch (error) {
          console.warn("Erreur lors de l'annulation de la synthèse vocale:", error);
        }
      }
    
    // Réinitialiser tous les états de lecture
    const newIsPlaying = {};
    Object.keys(isPlaying).forEach(key => {
      newIsPlaying[key] = false;
    });
    
    // Configurer la nouvelle lecture
    if (speechSynthRef.current && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configurer les paramètres de base de la voix
      utterance.lang = 'fr-FR';
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // Légèrement plus aigu pour une voix plus féminine
      utterance.volume = 1.0;
      
      // Sélectionner la meilleure voix féminine française disponible
      const bestVoice = getBestFrenchFemaleVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
        console.log('Voix sélectionnée:', bestVoice.name);
      }
      
      // Événement de fin de lecture
      utterance.onend = () => {
        setIsPlaying(prev => ({
          ...prev,
          [id]: false
        }));
      };
      
      // Événement d'erreur - gestion améliorée des erreurs
      utterance.onerror = (event) => {
        // Ne pas afficher d'erreur pour les interruptions intentionnelles
        if (event.error !== 'interrupted' || !isPlaying[id]) {
          console.error(`Erreur de synthèse vocale (${event.error}):`, event);
        }
        
        // Dans tous les cas, réinitialiser l'état de lecture
        setIsPlaying(prev => ({
          ...prev,
          [id]: false
        }));
      };
      
      try {
        // Démarrer la lecture avec gestion d'erreur
        speechSynthRef.current.speak(utterance);
        
        // Mettre à jour l'état pour cet élément
        setIsPlaying({
          ...newIsPlaying,
          [id]: true
        });
      } catch (error) {
        console.error("Erreur lors du démarrage de la lecture:", error);
      }
    }
  }, 50); // Petit délai pour éviter les conflits
  };

  // Afficher un petit message de débogage avec la liste des voix disponibles
  useEffect(() => {
    if (voices.length > 0) {
      console.log('Voix disponibles:', voices.map(v => `${v.name} (${v.lang})`).join(', '));
    }
  }, [voices]);
  
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