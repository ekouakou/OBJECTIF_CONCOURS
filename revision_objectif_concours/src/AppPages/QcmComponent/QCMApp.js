import React, { useState, useEffect, useRef } from 'react';
import {
    Panel,
    Button,
    ButtonGroup,
    FlexboxGrid,
    Content,
    Container,
    Header,
    Footer,
    Form,
    Divider,
    Progress,
    IconButton
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { PauseOutline, PlayOutline } from '@rsuite/icons';
// Importation des composants externalisés
import QuestionDisplay from './QuestionDisplay';
import ConfigScreen from './ConfigScreen';
import ResultsScreen from './ResultsScreen';

// Importation des hooks personnalisés
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { useTimer } from './hooks/useTimer';

import './QCMApp.css';

const QCMApp = ({ questions, questionReadCount = 1, answerTime = 3, allowMultipleAnswers = false }) => {
    // États du composant
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(answerTime);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [audioPlayCount, setAudioPlayCount] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [showConfiguration, setShowConfiguration] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [audioCompleted, setAudioCompleted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [config, setConfig] = useState({
        questionReadCount: questionReadCount,
        answerTime: answerTime,
        allowMultipleAnswers: allowMultipleAnswers
    });
    
    // Références
    const timerRef = useRef(null);
    const isNavigatingRef = useRef(false);
    
    // Hooks personnalisés
    const { cancelAllSpeech, speakText, currentUtteranceRef } = useSpeechSynthesis();
    
    // La question actuelle
    const currentQuestion = questions[currentQuestionIndex];
    
    // Vérifier s'il s'agit de la dernière question
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // Initialisation du suivi des annonces pour chaque question
    useEffect(() => {
        // Créer un objet pour suivre les annonces déjà faites
        for (let i = 0; i < questions.length; i++) {
            window[`timer_announced_${i}`] = false;
        }
        
        // Nettoyer ces objets lors du démontage du composant
        return () => {
            for (let i = 0; i < questions.length; i++) {
                delete window[`timer_announced_${i}`];
            }
        };
    }, [questions.length]);

    // Fonction pour démarrer le quiz
    const startQuiz = () => {
        setQuizStarted(true);
        setShowConfiguration(false);
        prepareQuestion();
    };

    // Fonction pour préparer une nouvelle question
    const prepareQuestion = () => {
        // S'assurer que toute synthèse vocale précédente est bien arrêtée
        cancelAllSpeech();
        
        setTimeLeft(config.answerTime);
        setIsTimerActive(false);
        setAudioPlayCount(0);
        setAudioCompleted(false);
        setIsPaused(false);

        // Effacer les marqueurs d'annonces précédents pour cette question
        const questionKey = `timer_announced_${currentQuestionIndex}`;
        window[questionKey] = false;
    };

    // Fonction pour démarrer le minuteur
    const startTimer = () => {
        // Ne pas démarrer le timer si nous sommes en transition ou en pause
        if (isNavigatingRef.current || isTransitioning || isPaused) {
            return;
        }
        
        setIsTimerActive(true);
        
        // On utilise une référence pour suivre si l'annonce a déjà été faite
        const questionKey = `timer_announced_${currentQuestionIndex}`;
        if (!window[questionKey]) {
            // Annonce vocale que le temps commence
            speakText(`Vous avez ${config.answerTime} secondes pour répondre.`);
            
            // Marquer cette annonce comme déjà faite pour cette question
            window[questionKey] = true;
        }
    };

    // Hook pour gérer le minuteur
    useTimer({
        isActive: isTimerActive && !isPaused,
        timeLeft,
        setTimeLeft,
        isNavigatingRef,
        isTransitioning,
        timerRef,
        onTimeUpdate: (newTime) => {
            // Annonces vocales à certains moments
            if (newTime === 10) {
                if (!isNavigatingRef.current && !isTransitioning && !isPaused) {
                    cancelAllSpeech();
                    speakText("Plus que 10 secondes.");
                }
            } else if (newTime === 5) {
                if (!isNavigatingRef.current && !isTransitioning && !isPaused) {
                    cancelAllSpeech();
                    speakText("5 secondes restantes.");
                }
            }
        },
        onTimeUp: () => {
            // Marquer comme étant en transition pour éviter les doubles notifications
            setIsTransitioning(true);
            
            // Annuler toute lecture en cours
            cancelAllSpeech();
            
            // Configurer le callback pour la fin de l'annonce
            const onEnd = () => {
                // Vérifier que nous ne sommes pas déjà en cours de navigation
                if (!isNavigatingRef.current) {
                    // Passer à la question suivante seulement après que l'annonce soit terminée
                    handleNextQuestion();
                }
            };
            
            // Temps écoulé
            speakText("Temps écoulé!", onEnd);
        }
    });

    // Nettoyer tous les events audio lors du démontage du composant
    useEffect(() => {
        return () => {
            // Faire un nettoyage complet lors du démontage
            cancelAllSpeech();
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [cancelAllSpeech]);

    // Gérer le changement de sélection
    const handleSelectionChange = (value) => {
        if (config.allowMultipleAnswers) {
            setSelectedAnswers(prev => ({
                ...prev,
                [currentQuestionIndex]: Array.isArray(value) ? value : [value]
            }));
        } else {
            // Si value est null ou undefined, on enregistre un tableau vide
            setSelectedAnswers(prev => ({
                ...prev,
                [currentQuestionIndex]: value !== null && value !== undefined ? [value] : []
            }));
        }
    };

    // Fonction pour gérer la pause et la reprise du quiz
    const togglePause = () => {
        const newPauseState = !isPaused;
        setIsPaused(newPauseState);
        
        if (newPauseState) {
            // Mettre en pause
            cancelAllSpeech(); // Arrêter tout audio en cours
        } else {
            // Reprendre
            // Si le timer était actif avant la pause, le redémarrer
            if (isTimerActive && audioCompleted) {
                startTimer();
            }
        }
    };

    // Version améliorée de la fonction pour passer à la question suivante
    const handleNextQuestion = () => {
        // Définir l'état de navigation immédiatement pour bloquer tout traitement audio en cours
        isNavigatingRef.current = true;
        setIsTransitioning(true);
        
        // Arrêter le timer si actif
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        
        // Arrêter complètement toute synthèse vocale
        cancelAllSpeech();
        
        setIsTimerActive(false);
        
        // Effacer les marqueurs d'annonce pour TOUTES les questions
        for (let i = 0; i < questions.length; i++) {
            window[`timer_announced_${i}`] = false;
        }
        
        // Utiliser un timeout pour s'assurer que les événements audio sont bien nettoyés avant de continuer
        setTimeout(() => {
            if (isLastQuestion) {
                // Fin du quiz
                setQuizFinished(true);
                setShowResults(true);
                isNavigatingRef.current = false; // Réinitialiser l'état de navigation
                setIsTransitioning(false);
            } else {
                // Passer à la question suivante 
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                
                // Réinitialiser l'état audio pour la nouvelle question
                setAudioPlayCount(0);
                setAudioCompleted(false);
                setIsPaused(false);
                
                // Attendre un peu avant de réinitialiser les drapeaux de navigation
                setTimeout(() => {
                    // Réinitialiser les états de navigation
                    isNavigatingRef.current = false;
                    setIsTransitioning(false);
                    
                    // Préparer la nouvelle question
                    prepareQuestion();
                }, 300);
            }
        }, 100);
    };

    // Redémarrer le quiz
    const restartQuiz = () => {
        // Définir l'état de navigation pour bloquer tout traitement audio
        isNavigatingRef.current = true;
        
        // Annuler toute lecture en cours
        cancelAllSpeech();
        
        // Arrêter le timer si actif
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setTimeLeft(config.answerTime);
        setIsTimerActive(false);
        setAudioPlayCount(0);
        setShowResults(false);
        setQuizFinished(false);
        setShowConfiguration(true);
        setQuizStarted(false);
        setIsTransitioning(false);
        setIsPaused(false);
        
        // Réinitialiser l'état de navigation après un court délai
        setTimeout(() => {
            isNavigatingRef.current = false;
        }, 200);
    };

    // Mettre à jour la configuration
    const updateConfig = (key, value) => {
        setConfig(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Rendu principal avec design amélioré
    return (
        <div className="qcm-container modern-theme">
            {showConfiguration && 
                <ConfigScreen 
                    config={config} 
                    updateConfig={updateConfig} 
                    startQuiz={startQuiz} 
                />
            }

            {quizStarted && !quizFinished && !showResults && (
                <Container className="quiz-main-container">
                    <Header className="quiz-header">
                        <FlexboxGrid justify="space-between" align="middle">
                            <FlexboxGrid.Item colspan={12}>
                                <div className="question-progress">
                                    <h2>Question {currentQuestionIndex + 1}</h2>
                                    <div className="progress-indicator">
                                        {questions.map((_, index) => (
                                            <div 
                                                key={index} 
                                                className={`progress-dot ${index === currentQuestionIndex ? 'active' : ''} 
                                                           ${index < currentQuestionIndex ? 'completed' : ''}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={4} style={{ textAlign: 'center' }}>
                                <IconButton
                                    icon={isPaused ? <PlayOutline/>  : <PauseOutline/>}
                                    appearance="subtle"
                                    circle
                                    size="lg"
                                    onClick={togglePause}
                                    className={`pause-button ${isPaused ? 'paused' : ''}`}
                                    disabled={!audioCompleted || isTransitioning || isNavigatingRef.current}
                                />
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={8} style={{ textAlign: 'right' }}>
                                <div className="timer-container">
                                    <Progress.Circle
                                        percent={(timeLeft / config.answerTime) * 100}
                                        showInfo={false}
                                        status={
                                            timeLeft > config.answerTime * 0.5 ? 'success' :
                                                timeLeft > config.answerTime * 0.25 ? 'active' : 'fail'
                                        }
                                        strokeWidth={8}
                                        strokeColor={timeLeft > config.answerTime * 0.5 ? '#4CAF50' : 
                                                   timeLeft > config.answerTime * 0.25 ? '#FFC107' : '#F44336'}
                                        style={{ width: 60, marginRight: 15 }}
                                    />
                                    <span className={`timer-text ${timeLeft <= 10 ? 'timer-alert' : ''} ${isPaused ? 'paused' : ''}`}>
                                        {timeLeft}s {isPaused && "(Pause)"}
                                    </span>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Header>

                    <Content className="quiz-content">
                        <Panel bordered className={`question-panel ${isPaused ? 'paused' : ''}`}>
                            <QuestionDisplay 
                                question={currentQuestion}
                                currentQuestionIndex={currentQuestionIndex}
                                selectedAnswers={selectedAnswers[currentQuestionIndex] || []}
                                allowMultipleAnswers={config.allowMultipleAnswers}
                                onSelectionChange={handleSelectionChange}
                                // Nouvelles props pour gérer l'audio
                                speakText={speakText}
                                cancelAllSpeech={cancelAllSpeech}
                                questionReadCount={config.questionReadCount}
                                audioPlayCount={audioPlayCount}
                                setAudioPlayCount={setAudioPlayCount}
                                isNavigatingRef={isNavigatingRef}
                                isTransitioning={isTransitioning}
                                setAudioCompleted={setAudioCompleted}
                                startTimer={startTimer}
                                isPaused={isPaused}
                            />
                        </Panel>
                    </Content>

                    <Footer className="quiz-footer">
                        <Button
                            appearance="primary"
                            className={`next-button ${isLastQuestion ? 'finish-button' : ''} ${isPaused ? 'paused' : ''}`}
                            block
                            onClick={handleNextQuestion}
                            disabled={!audioCompleted || isTransitioning || isNavigatingRef.current || isPaused}
                        >
                            {isLastQuestion ? "Terminer le quiz" : "Question suivante"}
                        </Button>
                    </Footer>
                </Container>
            )}

            {showResults && 
                <ResultsScreen 
                    questions={questions} 
                    selectedAnswers={selectedAnswers}
                    restartQuiz={restartQuiz}
                    speakText={speakText}
                    cancelAllSpeech={cancelAllSpeech}
                    isNavigatingRef={isNavigatingRef}
                    isTransitioning={isTransitioning}
                />
            }
        </div>
    );
};

export default QCMApp;