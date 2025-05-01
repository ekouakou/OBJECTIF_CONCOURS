import React, { useEffect, useState, useRef } from 'react';
import { 
  Container, 
  Header, 
  Content, 
  Footer, 
  Panel, 
  Progress, 
  Divider, 
  Message, 
  Button,
  FlexboxGrid,
  Animation,
  IconButton,
  Tag,
  ButtonGroup
} from 'rsuite';
import { calculateScore } from './utils/quizUtils';
import AudioPlayer from './AudioPlayer'; // Importation du composant AudioPlayer

const ResultsScreen = ({
    questions,
    selectedAnswers,
    restartQuiz,
    speakText,
    cancelAllSpeech,
    isNavigatingRef,
    isTransitioning
}) => {
    const result = calculateScore(questions, selectedAnswers);
    const resultText = `Vous avez obtenu ${result.score} bonnes réponses sur ${result.total} questions (${result.percentage}%).`;
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [isPlaying, setIsPlaying] = useState({}); // État pour suivre les lectures audio
    const speechSynthRef = useRef(null);

    // Effet pour lire le résultat à voix haute
    useEffect(() => {
        // S'assurer que toute synthèse vocale précédente est terminée
        cancelAllSpeech();

        // Lire le résultat après un court délai
        const timer = setTimeout(() => {
            // Vérifier que nous ne sommes pas en transition
            if (!isNavigatingRef.current && !isTransitioning) {
                speakText(resultText);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [cancelAllSpeech, speakText, resultText, isNavigatingRef, isTransitioning]);

    // Fonction pour obtenir la couleur du score
    const getScoreColor = (percentage) => {
        if (percentage >= 80) return '#4CAF50';
        if (percentage >= 60) return '#2196F3';
        if (percentage >= 40) return '#FF9800';
        return '#F44336';
    };

    // Fonction pour obtenir le message selon le score
    const getScoreMessage = (percentage) => {
        if (percentage >= 80) return 'Excellent!';
        if (percentage >= 60) return 'Bien joué!';
        if (percentage >= 40) return 'Pas mal!';
        return 'À améliorer';
    };

    // Fonction pour afficher/masquer les détails d'une question
    const toggleQuestionDetails = (index) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    };

    return (
        <Container className="results-container">
            <Header className="quiz-header">
                <FlexboxGrid justify="center" align="middle">
                    <FlexboxGrid.Item colspan={24}>
                        <h2 className="text-center">Résultats du QCM</h2>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Header>
            
            <Content className="quiz-content">
                {/* Panneau du score */}
                <Animation.Bounce in={true}>
                    <Panel bordered className="score-panel">
                        <FlexboxGrid justify="center" align="middle">
                            <FlexboxGrid.Item colspan={12} md={8}>
                                <div className="score-circle-container">
                                    <Progress.Circle
                                        percent={result.percentage}
                                        strokeColor={getScoreColor(result.percentage)}
                                        showInfo={true}
                                        strokeWidth={8}
                                        width={180}
                                        status={result.percentage >= 60 ? 'success' : result.percentage >= 40 ? 'active' : 'fail'}
                                    />
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={12} md={16}>
                                <div className="score-details">
                                    <h3>{getScoreMessage(result.percentage)}</h3>
                                    <p className="result-text">{resultText}</p>
                                    <Tag color={result.percentage >= 60 ? 'green' : result.percentage >= 40 ? 'blue' : 'red'} size="lg">
                                        {result.score} / {result.total}
                                    </Tag>
                                    
                                    {/* AudioPlayer pour le résultat global */}
                                    <AudioPlayer 
                                        id="result-summary"
                                        text={resultText}
                                        isPlaying={isPlaying}
                                        setIsPlaying={setIsPlaying}
                                        speechSynthRef={speechSynthRef}
                                        buttonText="Écouter le résultat"
                                    />
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Panel>
                </Animation.Bounce>

                <Divider className="stylish-divider">
                    <span>Détail des réponses</span>
                </Divider>

                {/* Panneau des réponses détaillées */}
                <div className="questions-results-list">
                    {questions.map((q, qIndex) => {
                        const userAnswers = selectedAnswers[qIndex] || [];
                        const isCorrect = Array.isArray(q.correctAnswer)
                            ? q.correctAnswer.every(ans => userAnswers.includes(ans)) && userAnswers.every(ans => q.correctAnswer.includes(ans))
                            : userAnswers.includes(q.correctAnswer);

                        return (
                            <Panel 
                                key={q.id} 
                                className={`question-result-panel ${isCorrect ? 'correct-panel' : 'incorrect-panel'}`}
                                bordered
                                shaded
                                header={
                                    <div className="question-result-header" onClick={() => toggleQuestionDetails(qIndex)}>
                                        <FlexboxGrid justify="space-between" align="middle">
                                            <FlexboxGrid.Item colspan={18}>
                                                <div className="question-title">
                                                    <span className="question-number">Question {qIndex + 1}</span>
                                                    <Tag color={isCorrect ? 'green' : 'red'}>
                                                        {isCorrect ? 'Correct' : 'Incorrect'}
                                                    </Tag>
                                                </div>
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    </div>
                                }
                                collapsible
                                expanded={activeQuestion === qIndex}
                            >
                                <div className="question-details">
                                    <p className="question-text">{q.question}</p>
                                    
                                    <div className="answer-comparison">
                                        <div className="answer-block">
                                            <h5>Votre réponse:</h5>
                                            <p className={isCorrect ? 'correct-answer' : 'incorrect-answer'}>
                                                {userAnswers.map(idx => q.options[idx]).join(', ') || 'Aucune réponse'}
                                            </p>
                                        </div>
                                        
                                        <div className="answer-block">
                                            <h5>Réponse correcte:</h5>
                                            <p className="correct-answer">
                                                {Array.isArray(q.correctAnswer)
                                                    ? q.correctAnswer.map(idx => q.options[idx]).join(', ')
                                                    : q.options[q.correctAnswer]
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {q.explanation && (
                                        <div className="explanation-block">
                                            <FlexboxGrid align="middle">
                                                <FlexboxGrid.Item colspan={22}>
                                                    <h5>Explication:</h5>
                                                    <p>{q.explanation}</p>
                                                </FlexboxGrid.Item>
                                                <FlexboxGrid.Item colspan={2}>
                                                    {/* AudioPlayer pour l'explication de chaque question */}
                                                    <AudioPlayer 
                                                        id={`explanation-${qIndex}`}
                                                        text={q.explanation}
                                                        isPlaying={isPlaying}
                                                        setIsPlaying={setIsPlaying}
                                                        speechSynthRef={speechSynthRef}
                                                        buttonText="Écouter l'explication"
                                                    />
                                                </FlexboxGrid.Item>
                                            </FlexboxGrid>
                                        </div>
                                    )}
                                </div>
                            </Panel>
                        );
                    })}
                </div>
            </Content>
            
            <Footer className="quiz-footer">
                <ButtonGroup justified>
                    <Button appearance="primary" color="cyan" size="lg" onClick={restartQuiz}>
                        ↻ Recommencer le quiz
                    </Button>
                </ButtonGroup>
            </Footer>
        </Container>
    );
};

export default ResultsScreen;