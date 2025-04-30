import React, { useState, useEffect, useRef } from 'react';
import {
    Panel,
    Button,
    ButtonGroup,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Progress,
    Modal,
    FlexboxGrid,
    Content,
    Container,
    Header,
    Footer,
    Form,
    Divider,
    Message,
    toaster
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import AudioPlayer from './AudioPlayer'; // Votre composant existant

const QCMApp = ({ questions, questionReadCount = 1, answerTime = 20, allowMultipleAnswers = false }) => {
    // États du composant
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(answerTime);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [audioPlayCount, setAudioPlayCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [showConfiguration, setShowConfiguration] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false); // Nouvel état pour gérer les transitions
    const [config, setConfig] = useState({
        questionReadCount: questionReadCount,
        answerTime: answerTime,
        allowMultipleAnswers: allowMultipleAnswers
    });
    
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

    // Références
    const speechSynthRef = useRef();
    const timerRef = useRef(null);
    const audioCountRef = useRef(0);
    const currentUtteranceRef = useRef(null); // Référence pour suivre l'utterance en cours
    const isNavigatingRef = useRef(false); // Référence pour suivre l'état de navigation

    // État pour suivre si l'audio a été lu le nombre de fois requis
    const [audioCompleted, setAudioCompleted] = useState(false);

    // La question actuelle
    const currentQuestion = questions[currentQuestionIndex];

    // Vérifier s'il s'agit de la dernière question
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // Fonction améliorée pour annuler toutes les lectures vocales en cours
    const cancelAllSpeech = () => {
        // Arrêter toute synthèse vocale en cours
        window.speechSynthesis.cancel();
        
        // Détacher tous les gestionnaires d'événements
        if (currentUtteranceRef.current) {
            currentUtteranceRef.current.onend = null;
            currentUtteranceRef.current.onpause = null;
            currentUtteranceRef.current.onresume = null;
            currentUtteranceRef.current.onstart = null;
            currentUtteranceRef.current.onboundary = null;
            currentUtteranceRef.current.onerror = null;
            currentUtteranceRef.current = null;
        }
    };

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
        
        // Réinitialiser l'état de navigation
        isNavigatingRef.current = false;
        
        setTimeLeft(config.answerTime);
        setIsTimerActive(false);
        setAudioPlayCount(0);
        setAudioCompleted(false);
        setIsTransitioning(false); // Réinitialiser l'état de transition
        
        // Réinitialiser l'état de lecture pour toutes les questions
        setIsPlaying({});

        // Effacer les marqueurs d'annonces précédents pour cette question
        const questionKey = `timer_announced_${currentQuestionIndex}`;
        window[questionKey] = false;
        
        // Démarrer automatiquement la lecture audio avec un léger délai
        setTimeout(() => {
            playQuestionAudio();
        }, 500);
    };

    // Fonction pour lire l'audio de la question
    const playQuestionAudio = () => {
        // Ne pas continuer si nous sommes en cours de navigation
        if (isNavigatingRef.current) {
            return;
        }

        // Annuler d'abord toute lecture en cours
        cancelAllSpeech();

        if (audioPlayCount >= config.questionReadCount) {
            startTimer();
            setAudioCompleted(true);
            return;
        }

        // Construire le texte à lire
        const textToRead = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}. 
                         Les options sont: ${currentQuestion.options.map((opt, idx) =>
            `Option ${idx + 1}: ${opt}`).join('. ')}`;

        // Créer un objet d'énonciation
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0;
        
        utterance.onend = () => {
            // Vérifier si nous sommes en transition avant de continuer
            if (isNavigatingRef.current || isTransitioning) {
                return; // Ne pas continuer si nous sommes en transition
            }
            
            const newCount = audioPlayCount + 1;
            setAudioPlayCount(newCount);

            if (newCount < config.questionReadCount) {
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

        // Stocker l'utterance dans la référence
        currentUtteranceRef.current = utterance;

        // Démarrer la nouvelle lecture
        window.speechSynthesis.speak(utterance);

        // Mettre à jour l'état de lecture UNIQUEMENT pour la question actuelle
        setIsPlaying({ [currentQuestionIndex]: true });
    };

    // Fonction pour démarrer le minuteur
    const startTimer = () => {
        // Ne pas démarrer le timer si nous sommes en transition
        if (isNavigatingRef.current || isTransitioning) {
            return;
        }
        
        setIsTimerActive(true);
        
        // On utilise une référence pour suivre si l'annonce a déjà été faite
        const questionKey = `timer_announced_${currentQuestionIndex}`;
        if (!window[questionKey]) {
            // Annonce vocale que le temps commence
            const startAnnounce = new SpeechSynthesisUtterance(`Vous avez ${config.answerTime} secondes pour répondre.`);
            startAnnounce.lang = 'fr-FR';
            
            // Stocker l'utterance dans la référence
            currentUtteranceRef.current = startAnnounce;
            
            window.speechSynthesis.speak(startAnnounce);
            
            // Marquer cette annonce comme déjà faite pour cette question
            window[questionKey] = true;
        }
    };

    // Effet pour gérer le minuteur
    useEffect(() => {
        if (isTimerActive && timeLeft > 0 && !isNavigatingRef.current) {

            
            timerRef.current = setTimeout(() => {
                // Vérifier à nouveau que nous ne sommes pas en transition
                if (isNavigatingRef.current || isTransitioning) {
                    return;
                }
                
                setTimeLeft(prevTime => {
                    const newTime = prevTime - 1;

                    // Annonces vocales à certains moments
                    if (newTime === 10) {
                        // Ne faire l'annonce que si nous ne sommes pas en transition
                        if (!isNavigatingRef.current && !isTransitioning) {
                            // Annuler toute lecture en cours avant de faire une nouvelle annonce
                            cancelAllSpeech();
                            
                            const timeWarning = new SpeechSynthesisUtterance("Plus que 10 secondes.");
                            timeWarning.lang = 'fr-FR';
                            currentUtteranceRef.current = timeWarning;
                            window.speechSynthesis.speak(timeWarning);
                        }
                    } else if (newTime === 5) {
                        // Ne faire l'annonce que si nous ne sommes pas en transition
                        if (!isNavigatingRef.current && !isTransitioning) {
                            // Annuler toute lecture en cours avant de faire une nouvelle annonce
                            cancelAllSpeech();
                            
                            const timeWarning = new SpeechSynthesisUtterance("5 secondes restantes.");
                            timeWarning.lang = 'fr-FR';
                            currentUtteranceRef.current = timeWarning;
                            window.speechSynthesis.speak(timeWarning);
                        }
                    }

                    return newTime;
                });
            }, 1000);
        } else if (timeLeft === 0 && isTimerActive && !isTransitioning && !isNavigatingRef.current) {

            // Marquer comme étant en transition pour éviter les doubles notifications
            setIsTransitioning(true);
            
            // Annuler toute lecture en cours
            cancelAllSpeech();
            
            // Temps écoulé
            const timeUpAnnounce = new SpeechSynthesisUtterance("Temps écoulé!");
            timeUpAnnounce.lang = 'fr-FR';
            
            // Ajouter un gestionnaire pour savoir quand cette annonce est terminée
            timeUpAnnounce.onend = () => {
                // Vérifier que nous ne sommes pas déjà en cours de navigation
                if (!isNavigatingRef.current) {
                    // Passer à la question suivante seulement après que l'annonce soit terminée
                    handleNextQuestion();
                }
            };
            
            currentUtteranceRef.current = timeUpAnnounce;
            window.speechSynthesis.speak(timeUpAnnounce);
        }

        // Nettoyage du timer lors du démontage
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isTimerActive, timeLeft, isTransitioning]);

    // Nettoyer tous les events audio lors du démontage du composant
    useEffect(() => {
        return () => {
            // Faire un nettoyage complet lors du démontage
            cancelAllSpeech();
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    // Gérer le changement de sélection
    const handleSelectionChange = (value) => {
        if (config.allowMultipleAnswers) {
            setSelectedAnswers(prev => ({
                ...prev,
                [currentQuestionIndex]: Array.isArray(value) ? value : [value]
            }));
        } else {
            setSelectedAnswers(prev => ({
                ...prev,
                [currentQuestionIndex]: [value]
            }));
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
        
        // S'assurer que l'état de lecture est réinitialisé
        setIsPlaying({});
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
            } else {
                // Passer à la question suivante 
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                
                // Petit délai supplémentaire avant de préparer la nouvelle question
                setTimeout(() => {
                    prepareQuestion();
                }, 300);
            }
        }, 100);
    };

    // Calculer le score
    const calculateScore = () => {
        let correctCount = 0;
        let totalQuestions = questions.length;

        questions.forEach((question, index) => {
            const userAnswers = selectedAnswers[index] || [];

            // Dans le cas d'une seule bonne réponse
            if (!Array.isArray(question.correctAnswer)) {
                if (userAnswers.includes(question.correctAnswer)) {
                    correctCount++;
                }
            }
            // Dans le cas de plusieurs bonnes réponses
            else {
                const correctAnswers = question.correctAnswer;
                const allCorrect = correctAnswers.every(ans => userAnswers.includes(ans));
                const noIncorrect = userAnswers.every(ans => correctAnswers.includes(ans));

                if (allCorrect && noIncorrect) {
                    correctCount++;
                }
            }
        });

        return {
            score: correctCount,
            total: totalQuestions,
            percentage: Math.round((correctCount / totalQuestions) * 100)
        };
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
        
        // Réinitialiser aussi l'état de lecture
        setIsPlaying({});
        
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

    // Rendu des résultats
    const renderResults = () => {
        const result = calculateScore();
        const resultText = `Vous avez obtenu ${result.score} bonnes réponses sur ${result.total} questions (${result.percentage}%).`;

        // S'assurer que toute synthèse vocale précédente est terminée
        cancelAllSpeech();

        // Lire le résultat après un court délai
        setTimeout(() => {
            // Vérifier que nous ne sommes pas en transition
            if (!isNavigatingRef.current && !isTransitioning) {
                const resultAnnounce = new SpeechSynthesisUtterance(resultText);
                resultAnnounce.lang = 'fr-FR';
                currentUtteranceRef.current = resultAnnounce;
                window.speechSynthesis.speak(resultAnnounce);
            }
        }, 500);

        return (
            <Container className="results-container">
                <Header>
                    <h2>Résultats du QCM</h2>
                </Header>
                <Content>
                    <Panel bordered>
                        <h3>Score final</h3>
                        <Progress.Circle
                            percent={result.percentage}
                            strokeColor={result.percentage >= 70 ? '#4CAF50' : result.percentage >= 50 ? '#FF9800' : '#F44336'}
                            showInfo={true}
                            status={result.percentage >= 70 ? 'success' : result.percentage >= 50 ? 'active' : 'fail'}
                        />
                        <Divider />
                        <p className="result-text">{resultText}</p>

                        <Divider />

                        <h3>Détail des réponses</h3>
                        {questions.map((q, qIndex) => {
                            const userAnswers = selectedAnswers[qIndex] || [];
                            const isCorrect = Array.isArray(q.correctAnswer)
                                ? q.correctAnswer.every(ans => userAnswers.includes(ans)) && userAnswers.every(ans => q.correctAnswer.includes(ans))
                                : userAnswers.includes(q.correctAnswer);

                            return (
                                <div key={q.id} className="question-result">
                                    <p className="question-text">
                                        <b>Question {qIndex + 1}:</b> {q.question}
                                    </p>
                                    <Message
                                        type={isCorrect ? 'success' : 'error'}
                                        showIcon
                                    >
                                        {isCorrect ? 'Correct' : 'Incorrect'}
                                    </Message>
                                    <p>
                                        <b>Votre réponse:</b> {userAnswers.map(idx => q.options[idx]).join(', ') || 'Aucune réponse'}
                                    </p>
                                    <p>
                                        <b>Réponse correcte:</b> {
                                            Array.isArray(q.correctAnswer)
                                                ? q.correctAnswer.map(idx => q.options[idx]).join(', ')
                                                : q.options[q.correctAnswer]
                                        }
                                    </p>
                                    {q.explanation && (
                                        <p className="explanation"><b>Explication:</b> {q.explanation}</p>
                                    )}
                                    <Divider />
                                </div>
                            );
                        })}
                    </Panel>
                </Content>
                <Footer>
                    <Button appearance="primary" block onClick={restartQuiz}>
                        Recommencer le quiz
                    </Button>
                </Footer>
            </Container>
        );
    };

    // Écran de configuration
    const renderConfigScreen = () => {
        return (
            <Container>
                <Header>
                    <h2>Configuration du QCM</h2>
                </Header>
                <Content>
                    <Panel bordered>
                        <Form fluid>
                            <Form.Group>
                                <Form.ControlLabel>Nombre de lectures de la question:</Form.ControlLabel>
                                <Form.Control
                                    name="questionReadCount"
                                    accepter={props => (
                                        <input
                                            {...props}
                                            type="number"
                                            min="1"
                                            max="5"
                                            value={config.questionReadCount}
                                            onChange={e => updateConfig('questionReadCount', parseInt(e.target.value, 10))}
                                            className="rs-input"
                                        />
                                    )}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.ControlLabel>Temps pour répondre (secondes):</Form.ControlLabel>
                                <Form.Control
                                    name="answerTime"
                                    accepter={props => (
                                        <input
                                            {...props}
                                            type="number"
                                            min="5"
                                            max="120"
                                            value={config.answerTime}
                                            onChange={e => updateConfig('answerTime', parseInt(e.target.value, 10))}
                                            className="rs-input"
                                        />
                                    )}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.ControlLabel>Type de réponse:</Form.ControlLabel>
                                <Form.Control
                                    name="allowMultipleAnswers"
                                    accepter={props => (
                                        <Checkbox
                                            {...props}
                                            checked={config.allowMultipleAnswers}
                                            onChange={(_, checked) => updateConfig('allowMultipleAnswers', checked)}
                                        >
                                            Autoriser les réponses multiples
                                        </Checkbox>
                                    )}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Button appearance="primary" block onClick={startQuiz}>
                                    Commencer le QCM
                                </Button>
                            </Form.Group>
                        </Form>
                    </Panel>
                </Content>
            </Container>
        );
    };

    // Rendu de la question actuelle
    const renderQuestion = () => {
        return (
            <Container>
                <Header>
                    <FlexboxGrid justify="space-between" align="middle">
                        <FlexboxGrid.Item colspan={16}>
                            <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
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
                                    style={{ width: 40, marginRight: 10 }}
                                />
                                <span className="timer-text">{timeLeft}s</span>
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Header>

                <Content>
                    <Panel bordered>
                        <div className="question-content">
                            <div className="question-header">
                                <h3>{currentQuestion.question}</h3>
                                <AudioPlayer
                                    id={currentQuestionIndex}
                                    text={`${currentQuestion.question}. Les options sont: ${currentQuestion.options.map((opt, idx) =>
                                        `Option ${idx + 1}: ${opt}`).join('. ')}`}
                                    isPlaying={isPlaying}
                                    setIsPlaying={setIsPlaying}
                                    speechSynthRef={speechSynthRef}
                                    buttonText="Réécouter la question"
                                />
                            </div>

                            <Divider />

                            <div className="answer-options">
                                {config.allowMultipleAnswers ? (
                                    <CheckboxGroup
                                        name={`question-${currentQuestionIndex}`}
                                        value={selectedAnswers[currentQuestionIndex] || []}
                                        onChange={handleSelectionChange}
                                    >
                                        {currentQuestion.options.map((option, optionIndex) => (
                                            <Checkbox key={optionIndex} value={optionIndex}>
                                                {option}
                                            </Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                ) : (
                                    <RadioGroup
                                        name={`question-${currentQuestionIndex}`}
                                        value={selectedAnswers[currentQuestionIndex]?.[0]}
                                        onChange={value => handleSelectionChange(value)}
                                    >
                                        {currentQuestion.options.map((option, optionIndex) => (
                                            <Radio key={optionIndex} value={optionIndex}>
                                                {option}
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                )}
                            </div>
                        </div>
                    </Panel>
                </Content>

                <Footer>
                    <Button
                        appearance="primary"
                        block
                        onClick={handleNextQuestion}
                        disabled={!audioCompleted || isTransitioning || isNavigatingRef.current}
                    >
                        {isLastQuestion ? "Terminer" : "Question suivante"}
                    </Button>
                </Footer>
            </Container>
        );
    };

    // Rendu principal
    return (
        <div className="qcm-container">
            {showConfiguration && renderConfigScreen()}

            {quizStarted && !quizFinished && !showResults && renderQuestion()}

            {showResults && renderResults()}

            <style jsx global>{`
        .qcm-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .question-content {
          margin-bottom: 20px;
        }
        
        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .timer-container {
          display: flex;
          align-items: center;
        }
        
        .timer-text {
          font-size: 18px;
          font-weight: bold;
        }
        
        .answer-options {
          margin-top: 20px;
        }
        
        .results-container {
          text-align: center;
        }
        
        .results-container .rs-progress-circle {
          margin: 20px auto;
          width: 120px;
          height: 120px;
        }
        
        .result-text {
          font-size: 18px;
          margin: 20px 0;
        }
        
        .question-result {
          text-align: left;
          margin-bottom: 20px;
        }
        
        .question-text {
          margin-bottom: 10px;
        }
        
        .explanation {
          font-style: italic;
          color: #666;
          margin-top: 10px;
        }
      `}</style>
        </div>
    );
};

export default QCMApp;