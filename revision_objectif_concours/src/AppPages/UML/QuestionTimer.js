import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from './utils';
import { Time } from '@rsuite/icons'; // Modifié ici de TimeIcon à Time
import './styles.css';

const QuestionTimer = ({ questionId, initialTime, isActive, onTimeUpdate }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const intervalRef = useRef(null);

    // Réinitialiser le chronomètre lorsque initialTime change
    useEffect(() => {
        setTimeLeft(initialTime);
    }, [initialTime]);

    // Démarrer/arrêter le chronomètre selon l'état isActive
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            // Démarrer le chronomètre
            intervalRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    const newTime = prevTime - 1;
                    onTimeUpdate(questionId, newTime);
                    return newTime;
                });
            }, 1000);
        } else {
            // Arrêter le chronomètre
            clearInterval(intervalRef.current);
        }

        // Nettoyage à la destruction du composant
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isActive, questionId, onTimeUpdate, timeLeft]);

    // Calculer le pourcentage de temps restant pour la barre de progression
    const progressPercentage = (timeLeft / initialTime) * 100;

    // Déterminer la couleur de la barre de progression
    const getTimerColor = () => {
        if (progressPercentage > 66) return 'green';
        if (progressPercentage > 33) return 'orange';
        return 'red';
    };

    return (
        <div className="question-timer">
            <div className="timer-icon">
                <Time /> {/* Modifié ici de TimeIcon à Time */}
            </div>
            <div className="timer-progress-container">
                <div
                    className="timer-progress-bar"
                    style={{
                        width: `${progressPercentage}%`,
                        backgroundColor: getTimerColor()
                    }}
                ></div>
            </div>
            <div className="timer-text">
                {formatTime(timeLeft)}
            </div>
        </div>
    );
};

export default QuestionTimer;