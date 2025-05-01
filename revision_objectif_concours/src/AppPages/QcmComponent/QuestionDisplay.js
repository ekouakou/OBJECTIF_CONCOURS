import React, { useEffect, useState, useCallback } from 'react';
import { Divider, Radio, RadioGroup, Checkbox, CheckboxGroup } from 'rsuite';

const QuestionDisplay = ({
    question,
    currentQuestionIndex,
    selectedAnswers,
    allowMultipleAnswers,
    onSelectionChange,
    // Nouvelles props pour gérer l'audio
    speakText,
    cancelAllSpeech,
    questionReadCount,
    audioPlayCount,
    setAudioPlayCount,
    isNavigatingRef,
    isTransitioning,
    setAudioCompleted,
    startTimer
}) => {
    // État local pour suivre la lecture audio
    const [isPlaying, setIsPlaying] = useState(false);

    // Fonction pour lire l'audio de la question - avec useCallback pour éviter les recréations
    const playQuestionAudio = useCallback(() => {
        // Ne pas continuer si nous sommes en cours de navigation
        if (isNavigatingRef.current || isTransitioning) {
            return;
        }

        // Annuler d'abord toute lecture en cours
        cancelAllSpeech();

        if (audioPlayCount >= questionReadCount) {
            startTimer();
            setAudioCompleted(true);
            return;
        }

        // Construire le texte à lire
        const textToRead = `Question ${currentQuestionIndex + 1}: ${question.question}. 
                         Les options sont: ${question.options.map((opt, idx) =>
            `Option ${idx + 1}: ${opt}`).join('. ')}`;

        // Configurer le callback pour la fin de la lecture
        const onEnd = () => {
            // Vérifier si nous sommes en transition avant de continuer
            if (isNavigatingRef.current || isTransitioning) {
                return; // Ne pas continuer si nous sommes en transition
            }
            
            const newCount = audioPlayCount + 1;
            setAudioPlayCount(newCount);
            setIsPlaying(false);

            if (newCount < questionReadCount) {
                // Pause entre les lectures
                setTimeout(() => {
                    // Vérifier à nouveau si nous sommes en transition avant de lire la prochaine itération
                    if (!isNavigatingRef.current && !isTransitioning) {
                        playQuestionAudio();
                    }
                }, 1000);
            } else {
                startTimer();
                setAudioCompleted(true);
            }
        };

        // Lire le texte et mettre à jour l'état de lecture
        speakText(textToRead, onEnd);
        setIsPlaying(true);
    }, [
        audioPlayCount,
        cancelAllSpeech,
        currentQuestionIndex,
        isNavigatingRef,
        isTransitioning,
        question,
        questionReadCount,
        setAudioCompleted,
        setAudioPlayCount,
        speakText,
        startTimer
    ]);

    // Réinitialiser les états lorsque la question change
    useEffect(() => {
        setIsPlaying(false);
        setAudioPlayCount(0);
        setAudioCompleted(false);
    }, [currentQuestionIndex, setAudioPlayCount, setAudioCompleted]);

    // Démarrer la lecture audio lorsque le composant est monté ou que la question change
    useEffect(() => {
        // Un petit délai pour s'assurer que tout est prêt
        const timer = setTimeout(() => {
            if (!isNavigatingRef.current && !isTransitioning && !isPlaying && audioPlayCount < questionReadCount) {
                playQuestionAudio();
            }
        }, 500);
        
        return () => {
            clearTimeout(timer);
        };
    }, [
        question, 
        currentQuestionIndex, 
        isNavigatingRef, 
        isTransitioning, 
        isPlaying, 
        audioPlayCount, 
        questionReadCount,
        playQuestionAudio
    ]);

    return (
        <div className="question-content">
            <h3>{question.question}</h3>

            <Divider />

            <div className="answer-options">
                {allowMultipleAnswers ? (
                    <CheckboxGroup
                        name={`question-${currentQuestionIndex}`}
                        value={selectedAnswers || []}
                        onChange={onSelectionChange}
                    >
                        {question.options.map((option, optionIndex) => (
                            <Checkbox key={optionIndex} value={optionIndex}>
                                {option}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                ) : (
                    <RadioGroup
                        name={`question-${currentQuestionIndex}`}
                        value={selectedAnswers && selectedAnswers.length > 0 ? selectedAnswers[0] : null}
                        onChange={value => onSelectionChange(value)}
                    >
                        {question.options.map((option, optionIndex) => (
                            <Radio key={optionIndex} value={optionIndex}>
                                {option}
                            </Radio>
                        ))}
                    </RadioGroup>
                )}
            </div>
        </div>
    );
};

export default QuestionDisplay;