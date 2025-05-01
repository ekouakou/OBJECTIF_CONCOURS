import { useEffect, useRef } from 'react';

export const useTimer = ({
    isActive,
    timeLeft,
    setTimeLeft,
    isNavigatingRef,
    isTransitioning,
    timerRef,
    onTimeUpdate,
    onTimeUp
}) => {
    // Référence pour éviter les appels multiples à onTimeUp
    const hasCalledTimeUpRef = useRef(false);
    
    useEffect(() => {
        // Réinitialiser la référence lorsque timeLeft change de 0 à une valeur positive
        if (timeLeft > 0) {
            hasCalledTimeUpRef.current = false;
        }
        
        // Nettoyer tout timer existant pour éviter les chevauchements
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // Ne démarrer le timer que si les conditions sont réunies
        if (isActive && timeLeft > 0 && !isNavigatingRef.current && !isTransitioning) {
            timerRef.current = setTimeout(() => {
                // Double vérification que nous ne sommes pas en transition
                if (isNavigatingRef.current || isTransitioning) {
                    return;
                }
                
                setTimeLeft(prevTime => {
                    const newTime = prevTime - 1;
                    
                    // Si un handler de mise à jour du temps est fourni, l'appeler
                    if (onTimeUpdate && newTime > 0) {
                        onTimeUpdate(newTime);
                    }
                    
                    return newTime;
                });
            }, 1000);
        } else if (timeLeft === 0 && isActive && !isTransitioning && !isNavigatingRef.current && !hasCalledTimeUpRef.current) {
            // Assurer qu'on n'appelle onTimeUp qu'une seule fois
            hasCalledTimeUpRef.current = true;
            
            // Appeler onTimeUp à la fin de la queue d'exécution
            setTimeout(() => {
                // Vérifier à nouveau les conditions avant d'appeler onTimeUp
                if (timeLeft === 0 && isActive && !isTransitioning && !isNavigatingRef.current) {
                    if (onTimeUp) {
                        onTimeUp();
                    }
                }
            }, 0);
        }

        // Nettoyage du timer lors du démontage ou changement de dépendances
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [
        isActive,
        timeLeft,
        setTimeLeft,
        isNavigatingRef,
        isTransitioning,
        timerRef,
        onTimeUpdate,
        onTimeUp
    ]);
};