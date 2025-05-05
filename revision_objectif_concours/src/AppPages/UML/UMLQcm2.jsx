import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Panel,
    Container,
    Content,
    Header,
    Footer,
    ButtonToolbar,
    ButtonGroup,
    Message,
    Radio,
    RadioGroup,
    Progress,
    Modal,
    InputNumber,
    Tooltip,
    Whisper,
    Badge
} from 'rsuite';
import { Speaker, CheckOutline, CloseOutline, PlayOutline, PauseOutline } from '@rsuite/icons';
import 'rsuite/dist/rsuite.min.css';
// import QCMQuestions from './QCMQuestions';
import QCMQuestions from '../CoteDivoire/QCMSportQuestion';
import Pagination from '../QcmComponent/Pagination';
import PageSizeSelector from './PageSizeSelector';
import SearchBar from './SearchBar';
import {
    generatePDF,
    getOptionLetters,
    toggleAllItems,
    paginateItems,
    getTotalPages,
    searchQuestions,
    formatTime,
    startCountdown,
    stopCountdown,
    clearAllTimers
} from './utils';
import '../styles.css';

const UMLQcm = () => {
    const [activeKey, setActiveKey] = useState(null);
    const [showAnswers, setShowAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState({});
    const [expandAll, setExpandAll] = useState(false);

    // État pour stocker les réponses de l'utilisateur
    const [userAnswers, setUserAnswers] = useState({});

    // État pour le mode évaluation
    const [evaluationMode, setEvaluationMode] = useState(true);

    // État pour les résultats de l'évaluation
    const [evaluationResults, setEvaluationResults] = useState({
        score: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        showResults: false
    });

    // Recherche
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState(QCMQuestions);

    // Pagination
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [activePage, setActivePage] = useState(1);
    const [paginatedQuestions, setPaginatedQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Option letters
    const optionLetters = getOptionLetters();

    // Référence pour l'objet SpeechSynthesis
    const speechSynthRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState({});

    // État pour gérer les minuteurs par question
    const [questionTimers, setQuestionTimers] = useState({});
    const [timeLimit, setTimeLimit] = useState(60); // Temps par défaut: 60 secondes (1 minute)

    // Initialiser la synthèse vocale
    useEffect(() => {
        if ('speechSynthesis' in window) {
            speechSynthRef.current = window.speechSynthesis;
        }

        // Nettoyer les instances de synthèse vocale lors du démontage du composant
        return () => {
            if (speechSynthRef.current) {
                speechSynthRef.current.cancel();
            }
            clearAllTimers(questionTimers);
        };
    }, []);


    useEffect(() => {
        return () => {
            // Cette fonction sera appelée uniquement lors du démontage du composant
            clearAllTimers();
            // Réinitialiser l'état des timers si nécessaire lors du démontage
            setQuestionTimers({});
        };
    }, []); // Liste de dépendances vide = exécution uniquement au montage/démontage


    // Effectuer la recherche lorsque le terme de recherche change
    useEffect(() => {
        const results = searchQuestions(QCMQuestions, searchTerm);
        setFilteredQuestions(results);
        setActivePage(1); // Retour à la première page après une recherche
    }, [searchTerm]);

    // Mettre à jour les questions paginées quand la page active, le nombre d'éléments par page ou les résultats de recherche changent
    useEffect(() => {
        // Si on choisit d'afficher tout (999), on affiche toutes les questions filtrées
        const effectiveItemsPerPage = itemsPerPage === 999 ? filteredQuestions.length : itemsPerPage;

        // Calculer le nombre total de pages
        const pages = getTotalPages(filteredQuestions, effectiveItemsPerPage);
        setTotalPages(pages);

        // Vérifier si la page active est toujours valide
        const validActivePage = Math.min(Math.max(1, activePage), Math.max(1, pages));
        if (validActivePage !== activePage) {
            setActivePage(validActivePage);
        }

        // Filtrer les questions pour la page active
        const questions = paginateItems(filteredQuestions, validActivePage, effectiveItemsPerPage);
        setPaginatedQuestions(questions);
    }, [activePage, itemsPerPage, filteredQuestions]);

    const handleSelect = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };

    const toggleAnswers = (id) => {
        setShowAnswers(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const toggleExplanation = (id) => {
        setShowExplanation(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Afficher/masquer toutes les questions
    const toggleExpandAll = () => {
        setExpandAll(!expandAll);
        setActiveKey(expandAll ? null : 'all');
    };

    // Afficher/masquer toutes les réponses
    const handleToggleAllAnswers = (show) => {
        setShowAnswers(toggleAllItems(QCMQuestions, show));
    };

    // Afficher/masquer toutes les explications
    const handleToggleAllExplanations = (show) => {
        setShowExplanation(toggleAllItems(QCMQuestions, show));
    };

    // Changer le nombre d'éléments par page
    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setActivePage(1); // Revenir à la première page quand on change le nombre d'éléments
    };

    // Gestion de la recherche
    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    // Mode PDF - Affiche tout le contenu
    const prepareForPDF = () => {
        // Sauvegarder l'état actuel pour le restaurer après
        const currentItemsPerPage = itemsPerPage;
        const currentActivePage = activePage;
        const currentSearchTerm = searchTerm;

        // Afficher toutes les questions, réponses et explications
        setSearchTerm(''); // Effacer la recherche pour afficher toutes les questions
        setItemsPerPage(999); // Afficher tout
        handleToggleAllAnswers(true);
        handleToggleAllExplanations(true);

        if (!expandAll) {
            toggleExpandAll();
        }

        // Petit délai pour laisser le DOM se mettre à jour
        setTimeout(() => {
            generatePDF('qcm-content', 'qcm-informatique-complet.pdf');

            // Restaurer l'état précédent après un délai supplémentaire
            setTimeout(() => {
                setSearchTerm(currentSearchTerm);
                setItemsPerPage(currentItemsPerPage);
                setActivePage(currentActivePage);
                if (expandAll !== (currentItemsPerPage === 999)) {
                    toggleExpandAll();
                }
            }, 500);
        }, 500);
    };

    // Gestion du changement de page
    const handlePageChange = (page) => {
        setActivePage(page);
        window.scrollTo(0, 0); // Scroller en haut de la page
    };

    // Déterminer si on doit afficher la pagination
    const showPagination = itemsPerPage !== 999 && totalPages > 1;

    // *** FONCTIONS POUR LE TEXT-TO-SPEECH ***

    // Préparer le texte complet pour la lecture audio
    const prepareQuestionTextForSpeech = (question) => {
        let text = `Question ${question.id}: ${question.question} `;

        // Ajouter les options
        question.options.forEach((option, index) => {
            text += `Option ${optionLetters[index]}: ${option}. `;
        });

        // Ajouter la bonne réponse si elle est affichée
        if (showAnswers[question.id]) {
            const correctOptionLetter = optionLetters[question.correctAnswer];
            text += `La bonne réponse est l'option ${correctOptionLetter}: ${question.options[question.correctAnswer]}. `;

            // Ajouter l'explication si elle est affichée
            if (showExplanation[question.id]) {
                text += `Explication: ${question.explanation} `;

                // Ajouter les exemples s'ils existent
                if (question.examples) {
                    text += `Exemples: ${question.examples} `;
                }
            }
        }

        return text;
    };

    // Fonction pour lire le texte à voix haute
    const speakText = (id, text) => {
        // Arrêter toute lecture en cours
        if (speechSynthRef.current) {
            speechSynthRef.current.cancel();
        }

        // Créer une nouvelle instance de synthèse vocale
        const utterance = new SpeechSynthesisUtterance(text);

        // Configurer la voix en français
        utterance.lang = 'fr-FR';

        // Chercher une voix française
        const voices = speechSynthRef.current.getVoices();
        const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
        if (frenchVoice) {
            utterance.voice = frenchVoice;
        }

        // Événements pour suivre l'état de la lecture
        utterance.onstart = () => {
            setIsPlaying(prev => ({ ...prev, [id]: true }));
        };

        utterance.onend = () => {
            setIsPlaying(prev => ({ ...prev, [id]: false }));
        };

        utterance.onerror = () => {
            setIsPlaying(prev => ({ ...prev, [id]: false }));
        };

        // Lancer la lecture
        speechSynthRef.current.speak(utterance);
    };

    // Fonction pour télécharger l'audio
    const downloadAudio = (id, text) => {
        alert("La fonctionnalité de téléchargement audio nécessite une API backend. Cette démonstration montre uniquement l'interface utilisateur.");
    };

    // Fonction pour lire une question à voix haute
    const handleSpeak = (question) => {
        const text = prepareQuestionTextForSpeech(question);
        speakText(question.id, text);
    };

    // Fonction pour télécharger l'audio d'une question
    const handleDownloadAudio = (question) => {
        const text = prepareQuestionTextForSpeech(question);
        downloadAudio(question.id, text);
    };

    // *** NOUVELLES FONCTIONS POUR L'ÉVALUATION ***

    // Basculer entre le mode évaluation et le mode consultation
    const toggleEvaluationMode = () => {
        if (evaluationMode) {
            // Si on quitte le mode évaluation, réinitialiser les réponses
            setUserAnswers({});
            setEvaluationResults({
                score: 0,
                totalQuestions: 0,
                correctAnswers: 0,
                showResults: false
            });

            // Arrêter tous les minuteurs
            clearAllTimers();
            setQuestionTimers({});
        } else {
            // Si on entre en mode évaluation...
            // Code existant
        }
        setEvaluationMode(!evaluationMode);
    };

    // Gérer la sélection d'une réponse par l'utilisateur
    const handleUserAnswerChange = (questionId, answerIndex) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answerIndex
        }));

        // Arrêter le minuteur pour cette question lorsqu'une réponse est donnée
        if (questionTimers[questionId] && questionTimers[questionId].active) {
            stopCountdown(questionId, setQuestionTimers);
        }
    };


    // Évaluer les réponses et calculer le score
    const evaluateAnswers = () => {
        let correctCount = 0;
        let totalCount = 0;

        clearAllTimers();

        // Si nous utilisons la recherche ou la pagination, évaluons uniquement les questions visibles
        const questionsToEvaluate = itemsPerPage === 999 ? filteredQuestions : paginatedQuestions;

        totalCount = questionsToEvaluate.length;

        questionsToEvaluate.forEach(question => {
            const userAnswer = userAnswers[question.id];

            // Vérifier si l'utilisateur a répondu et si la réponse est correcte
            if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
                correctCount++;
            }
        });

        const scorePercentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

        // Mettre à jour les résultats
        setEvaluationResults({
            score: scorePercentage,
            totalQuestions: totalCount,
            correctAnswers: correctCount,
            showResults: true
        });

        // Afficher les bonnes réponses
        const newShowAnswers = {};
        questionsToEvaluate.forEach(question => {
            newShowAnswers[question.id] = true;
        });
        setShowAnswers(newShowAnswers);

        // Arrêter tous les minuteurs
        clearAllTimers(questionTimers);
    };

    // Fermer la modal des résultats
    const closeResults = () => {
        setEvaluationResults(prev => ({
            ...prev,
            showResults: false
        }));
    };

    // Réinitialiser le test
    const resetTest = () => {
        setUserAnswers({});
        setEvaluationResults({
            score: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            showResults: false
        });
        handleToggleAllAnswers(false);

        // Arrêter tous les minuteurs
        clearAllTimers();
        // Réinitialiser l'état des minuteurs
        setQuestionTimers({});
    };


    // *** FONCTIONS POUR LE MINUTEUR ***

    // Gérer le changement de la limite de temps
    const handleTimeLimitChange = (value) => {
        setTimeLimit(value);
    };

    // Démarrer le minuteur pour une question spécifique
    const handleStartTimer = (questionId) => {
        // Vérifier si l'utilisateur a déjà répondu à cette question
        if (userAnswers[questionId] !== undefined) {
            return; // Ne pas démarrer le minuteur si la question a déjà été répondue
        }

        // Fonction à exécuter lorsque le temps est écoulé
        const onTimeUp = (qId) => {
            setQuestionTimers(prev => ({
                ...prev,
                [qId]: {
                    ...prev[qId],
                    timeLeft: 0,
                    active: false,
                    expired: true
                }
            }));
        };

        // Démarrer le compte à rebours avec la nouvelle implémentation
        startCountdown(questionId, timeLimit, setQuestionTimers, onTimeUp);
    };


    // Vérifier si une question peut être répondue (minuteur actif ou pas encore démarré)
    const canAnswer = (questionId) => {
        const timer = questionTimers[questionId];
        if (!timer) return true; // Pas de minuteur = peut répondre
        if (timer.expired) return false; // Minuteur expiré = ne peut pas répondre
        return timer.active || !timer.started; // Minuteur actif ou pas encore démarré = peut répondre
    };

    return (
        <Container className="qcm-container">
            <Header className="qcm-header">
                <h1>QCM d'Informatique</h1>
                <div className="header-controls">
                    <Button appearance="primary" onClick={prepareForPDF} className="pdf-button">
                        Télécharger en PDF complet
                    </Button>
                    <Button
                        appearance={evaluationMode ? "primary" : "ghost"}
                        onClick={toggleEvaluationMode}
                        className="evaluation-button"
                    >
                        {evaluationMode ? "Quitter le mode évaluation" : "Passer en mode évaluation"}
                    </Button>
                </div>
            </Header>

            {evaluationMode && (
                <div className="evaluation-controls">
                    <Message showIcon type="info">
                        <b>Mode évaluation actif</b> - Sélectionnez vos réponses et cliquez sur "Évaluer mes réponses" quand vous avez terminé.
                    </Message>

                    <div className="timer-controls">
                        <label>Limite de temps par question (secondes):</label>
                        <InputNumber
                            min={10}
                            max={600}
                            value={timeLimit}
                            onChange={handleTimeLimitChange}
                            step={10}
                        />
                        <Whisper
                            placement="top"
                            trigger="hover"
                            speaker={<Tooltip>Le temps commence à courir individuellement pour chaque question lorsque vous cliquez sur le bouton "Commencer"</Tooltip>}
                        >
                            <Button appearance="link">?</Button>
                        </Whisper>
                    </div>

                    <Button
                        appearance="primary"
                        color="green"
                        onClick={evaluateAnswers}
                        disabled={Object.keys(userAnswers).length === 0}
                        block
                    >
                        Évaluer mes réponses
                    </Button>
                    <Button
                        appearance="subtle"
                        onClick={resetTest}
                        disabled={Object.keys(userAnswers).length === 0}
                        block
                    >
                        Réinitialiser le test
                    </Button>
                </div>
            )}

            {!evaluationMode && (
                <div className="global-controls">
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button
                                appearance="ghost"
                                onClick={toggleExpandAll}
                            >
                                {expandAll ? 'Masquer toutes les questions' : 'Afficher toutes les questions'}
                            </Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button
                                appearance="ghost"
                                onClick={() => handleToggleAllAnswers(true)}
                            >
                                Afficher toutes les réponses
                            </Button>
                            <Button
                                appearance="ghost"
                                onClick={() => handleToggleAllAnswers(false)}
                            >
                                Masquer toutes les réponses
                            </Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button
                                appearance="ghost"
                                onClick={() => handleToggleAllExplanations(true)}
                            >
                                Afficher toutes les explications
                            </Button>
                            <Button
                                appearance="ghost"
                                onClick={() => handleToggleAllExplanations(false)}
                            >
                                Masquer toutes les explications
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
            )}

            <Content className="qcm-content" id="qcm-content">
                <div className="qcm-intro">
                    <h2>Test de connaissances en informatique</h2>
                    <p>Ce QCM couvre divers sujets liés à l'informatique, du développement web aux concepts avancés.</p>
                </div>

                {/* Barre de recherche */}
                <div className="search-section">
                    <SearchBar
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onClear={clearSearch}
                        disabled={evaluationMode}
                    />
                </div>

                {/* Résultats de recherche */}
                {searchTerm && !evaluationMode && (
                    <div className="search-results-info">
                        <p>
                            {filteredQuestions.length === 0
                                ? 'Aucune question ne correspond à votre recherche.'
                                : `${filteredQuestions.length} question(s) trouvée(s) pour "${searchTerm}"`}
                        </p>
                        {filteredQuestions.length > 0 && (
                            <Button
                                appearance="link"
                                onClick={clearSearch}
                                className="clear-search-link"
                            >
                                Effacer la recherche
                            </Button>
                        )}
                    </div>
                )}

                {/* Contrôles de pagination et affichage */}
                <div className="pagination-controls">
                    <PageSizeSelector
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        disabled={evaluationMode}
                    />

                    {showPagination && !evaluationMode && (
                        <Pagination
                            activePage={activePage}
                            totalPages={totalPages}
                            onSelect={handlePageChange}
                        />
                    )}
                </div>

                {/* Message quand il n'y a pas de résultats */}
                {filteredQuestions.length === 0 ? (
                    <div className="no-results">
                        <Message type="info" showIcon>
                            Aucune question ne correspond à votre recherche. Veuillez essayer avec d'autres termes.
                        </Message>
                    </div>
                ) : (
                    // Affichage des questions
                    paginatedQuestions.map((item) => (
                        <Panel
                            key={item.id}
                            className={`question-panel ${evaluationMode && userAnswers[item.id] !== undefined
                                ? 'answered'
                                : evaluationMode && questionTimers[item.id]?.expired
                                    ? 'time-expired'
                                    : ''
                                }`}
                            header={
                                <div className="question-header-content">
                                    <span>{`Question ${item.id}: ${item.question}`}</span>
                                    {!evaluationMode && (
                                        <div className="audio-controls">
                                            <Button
                                                appearance="subtle"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSpeak(item);
                                                }}
                                                disabled={isPlaying[item.id]}
                                                className="audio-button"
                                            >
                                                <Speaker /> {isPlaying[item.id] ? 'Lecture en cours...' : 'Écouter'}
                                            </Button>
                                            <Button
                                                appearance="subtle"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDownloadAudio(item);
                                                }}
                                                className="download-button"
                                            >
                                                Télécharger l'audio
                                            </Button>
                                        </div>
                                    )}
                                    {evaluationMode && (
                                        <div className="timer-control">
                                            {!questionTimers[item.id]?.started ? (
                                                <Button
                                                    appearance="ghost"
                                                    color="blue"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStartTimer(item.id);
                                                    }}
                                                    disabled={userAnswers[item.id] !== undefined}
                                                >
                                                    <PlayOutline /> Commencer ({timeLimit}s)
                                                </Button>
                                            ) : (
                                                <div className="timer-display">
                                                    Temps restant:
                                                    <Badge
                                                        content={formatTime(questionTimers[item.id]?.timeLeft || 0)}
                                                        color={
                                                            questionTimers[item.id]?.timeLeft > 30
                                                                ? 'green'
                                                                : questionTimers[item.id]?.timeLeft > 10
                                                                    ? 'yellow'
                                                                    : 'red'
                                                        }
                                                    />
                                                    {questionTimers[item.id]?.expired && (
                                                        <span className="time-expired-badge">Temps écoulé</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            }
                            collapsible
                            expanded={expandAll || activeKey === item.id}
                            onSelect={() => !expandAll && handleSelect(item.id)}
                        >
                            {evaluationMode ? (
                                <div className="options-container evaluation">
                                    <RadioGroup
                                        name={`question-${item.id}`}
                                        value={userAnswers[item.id]}
                                        onChange={(value) => handleUserAnswerChange(item.id, value)}
                                        disabled={!canAnswer(item.id)}
                                    >
                                        {item.options.map((option, index) => (
                                            <Radio
                                                key={index}
                                                value={index}
                                                disabled={!canAnswer(item.id)}
                                                className={`option-radio ${showAnswers[item.id] && (
                                                    item.correctAnswer === index
                                                        ? 'correct-answer'
                                                        : userAnswers[item.id] === index
                                                            ? 'incorrect-answer'
                                                            : ''
                                                )
                                                    }`}
                                            >
                                                <span className="option-letter">{optionLetters[index]}.</span> {option}
                                                {showAnswers[item.id] && item.correctAnswer === index && (
                                                    <span className="correct-badge"><CheckOutline /></span>
                                                )}
                                                {showAnswers[item.id] && userAnswers[item.id] === index && item.correctAnswer !== index && (
                                                    <span className="incorrect-badge"><CloseOutline /></span>
                                                )}
                                            </Radio>
                                        ))}
                                    </RadioGroup>

                                    {questionTimers[item.id]?.expired && !userAnswers[item.id] && (
                                        <Message showIcon type="error" className="time-expired-message">
                                            Temps écoulé pour cette question. Vous ne pouvez plus y répondre.
                                        </Message>
                                    )}
                                </div>
                            ) : (
                                <div className="options-container">
                                    {item.options.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`option ${showAnswers[item.id] && item.correctAnswer === index ? 'correct-answer' : ''}`}
                                        >
                                            <span className="option-letter">{optionLetters[index]}.</span> {option}
                                            {showAnswers[item.id] && item.correctAnswer === index && <span className="correct-badge">✓</span>}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!evaluationMode && (
                                <div className="button-container">
                                    <Button
                                        className="answer-button"
                                        appearance="subtle"
                                        onClick={() => toggleAnswers(item.id)}
                                    >
                                        {showAnswers[item.id] ? 'Masquer la réponse' : 'Afficher la réponse'}
                                    </Button>
                                    <Button
                                        className="explanation-button"
                                        appearance="subtle"
                                        onClick={() => toggleExplanation(item.id)}
                                        disabled={!showAnswers[item.id]}
                                    >
                                        {showExplanation[item.id] ? 'Masquer l\'explication' : 'Afficher l\'explication'}
                                    </Button>
                                </div>
                            )}

                            {(showExplanation[item.id] && showAnswers[item.id]) && (
                                <div className="explanation-box">
                                    <h4>Explication:</h4>
                                    <p>{item.explanation}</p>
                                    <br />
                                    <h4>Plus de détail:</h4>
                                    {item.detailedExplanation}
                                    <br />
                                    {item.examples && (
                                        <div className="examples-section">
                                            <h4>Exemples:</h4>
                                            <p>{item.examples}</p>
                                        </div>
                                    )}

                                    {item.imageUrl && (
                                        <div className="examples-section">
                                            <h4>Illustration:</h4>
                                            <img src={item.imageUrl} className='w-100' />
                                        </div>
                                    )}

                                    {item.usefulLinks && item.usefulLinks.length > 0 && (
                                        <div className="links-section">
                                            <h4>Liens utiles:</h4>
                                            <ul>
                                                {item.usefulLinks.map((link, index) => (
                                                    <li key={index}>
                                                        <a href={link} target="_blank" rel="noopener noreferrer">
                                                            {link}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Panel>
                    ))
                )}

                {/* Pagination en bas aussi pour plus de confort */}
                {showPagination && filteredQuestions.length > 0 && !evaluationMode && (
                    <div className="bottom-pagination">
                        <Pagination
                            activePage={activePage}
                            totalPages={totalPages}
                            onSelect={handlePageChange}
                        />
                    </div>
                )}
            </Content>


            <Footer className="qcm-footer">
                <p>© 2025 - QCM d'Informatique</p>
            </Footer>

            {/* Modal des résultats */}
            <Modal
                open={evaluationResults.showResults}
                onClose={closeResults}
                size="md"
            >
                <Modal.Header>
                    <Modal.Title>Résultats de votre évaluation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="results-content">
                        <h3>Score final: {evaluationResults.score}%</h3>
                        <Progress.Line
                            percent={evaluationResults.score}
                            status={evaluationResults.score >= 70 ? "success" : evaluationResults.score >= 50 ? "active" : "fail"}
                            strokeWidth={8}
                        />
                        <p>Vous avez répondu correctement à {evaluationResults.correctAnswers} question(s) sur {evaluationResults.totalQuestions}.</p>

                        {evaluationResults.score >= 80 && (
                            <Message type="success" showIcon className="result-message">
                                <h4>Excellent travail !</h4>
                                <p>Vous maîtrisez très bien ce sujet.</p>
                            </Message>
                        )}

                        {evaluationResults.score >= 60 && evaluationResults.score < 80 && (
                            <Message type="info" showIcon className="result-message">
                                <h4>Bon travail !</h4>
                                <p>Vous avez une bonne compréhension du sujet, mais il reste quelques points à améliorer.</p>
                            </Message>
                        )}

                        {evaluationResults.score < 60 && (
                            <Message type="warning" showIcon className="result-message">
                                <h4>Continuez vos efforts !</h4>
                                <p>Revoyez les explications des questions pour améliorer votre compréhension du sujet.</p>
                            </Message>
                        )}

                        <p className="review-instructions">Les réponses correctes sont maintenant affichées en vert. Vous pouvez consulter les explications pour en savoir plus sur chaque question.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeResults} appearance="primary">
                        Voir les corrections
                    </Button>
                    <Button onClick={() => {
                        closeResults();
                        resetTest();
                    }} appearance="subtle">
                        Recommencer le test
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UMLQcm;