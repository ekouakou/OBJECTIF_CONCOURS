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
          selectedVoiceRef.current = findBestAfricanFrenchVoice(voices);
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

  // Fonction pour trouver et forcer une voix féminine (priorité africaine)
  const findBestAfricanFrenchVoice = (voices) => {
    if (!voices || !voices.length) return null;
    
    console.log("Toutes les voix disponibles:", voices.map(v => v.name));
    
    // PRIORITÉ 1: Essayer des voix féminines spécifiques connues
    const knownFemaleVoices = [
      "Google français", // Souvent féminine par défaut
      "Amelie",
      "Thomas",
      "Audrey",
      "Virginie",
      "Microsoft Hélène",
      "Sylvie",

    ];
    
    for (const voiceName of knownFemaleVoices) {
      const voice = voices.find(v => v.name.includes(voiceName));
      if (voice) {
        console.log(`Voix féminine connue trouvée: ${voice.name}`);
        return voice;
      }
    }
    
    // PRIORITÉ 2: Voix Google avec langue française (généralement femme)
    const googleFrenchVoice = voices.find(v => 
      v.name.includes("Google") && 
      (v.lang.startsWith("fr") || v.name.toLowerCase().includes("français"))
    );
    
    if (googleFrenchVoice) {
      console.log(`Voix Google française trouvée: ${googleFrenchVoice.name}`);
      return googleFrenchVoice;
    }
    
    // PRIORITÉ 3: Voix explicitement féminine
    const explicitFemaleVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes("female") || 
             name.includes("femme") || 
             name.includes("féminin") || 
             name.includes("woman");
    });
    
    if (explicitFemaleVoice) {
      console.log(`Voix explicitement féminine trouvée: ${explicitFemaleVoice.name}`);
      return explicitFemaleVoice;
    }
    
    // PRIORITÉ 4: N'importe quelle voix française
    const frenchVoice = voices.find(v => v.lang.startsWith("fr"));
    if (frenchVoice) {
      console.log(`Fallback sur voix française: ${frenchVoice.name}`);
      return frenchVoice;
    }
    
    // PRIORITÉ 5: Première voix disponible
    console.log(`Aucune voix féminine trouvée, utilisation de la première voix disponible: ${voices[0].name}`);
    return voices[0];
  };

  // Appliquer des transformations pour un accent africain à un texte
  const transformTextForAfricanAccent = (text) => {
    if (!text) return text;
    
    // Cette fonction est optionnelle et peut être adaptée selon les besoins
    // Elle simule certaines caractéristiques de prononciation des français d'Afrique
    
    return text
      // Allonger certaines voyelles pour un rythme plus musical
      .replace(/é/g, 'é')
      .replace(/è/g, 'è')
      .replace(/à/g, 'à')
      // Ajouter des pauses pour un rythme plus cadencé
      .replace(/\./g, '... ')
      .replace(/,/g, ', ')
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
      // Option 1: Utiliser le texte original
      const utterance = new SpeechSynthesisUtterance(text);
      // Option 2: Utiliser le texte transformé (décommenter pour activer)
      // const transformedText = transformTextForAfricanAccent(text);
      // const utterance = new SpeechSynthesisUtterance(transformedText);
      
      // Configuration des paramètres pour une voix féminine africaine
      utterance.lang = 'fr-FR';  // On garde la langue française de base
      utterance.rate = 0.6;     // Rythme légèrement plus lent (caractéristique de certains accents africains)
      utterance.pitch = 0.4;     // Ton plus élevé pour une voix plus féminine
      utterance.volume = 1.0;    // Volume maximum

      utterance.rate = 0.9;     // Rythme légèrement plus lent (caractéristique de certains accents africains)
      utterance.pitch = 0.9;     // Ton plus élevé pour une voix plus féminine
      utterance.volume = 3.0;    // Volume maximum
      
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
          const bestVoice = findBestAfricanFrenchVoice(voices);
          
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
        console.log('Début de la lecture vocale avec voix féminine africaine');
        
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
          {isPlaying[id] ? 'Arrêter la lecture audio' : buttonText || 'Lire avec voix féminine africaine'}
        </Tooltip>
      }
    >
      <Button
        appearance="subtle"
        size="md"
        onClick={toggleSpeech}
        className="audio-button"
      >
        {isPlaying[id] ? <PauseOutline /> : <Speaker />}
      </Button>
    </Whisper>
  );
};

export default AudioPlayer;