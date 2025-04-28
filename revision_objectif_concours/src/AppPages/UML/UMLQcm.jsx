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
    Message
} from 'rsuite';
import { Speaker, } from '@rsuite/icons';
import 'rsuite/dist/rsuite.min.css';
import QCMQuestions from './QCMLogique';
import Pagination from './Pagination';
import PageSizeSelector from './PageSizeSelector';
import SearchBar from './SearchBar';
import {
    generatePDF,
    getOptionLetters,
    toggleAllItems,
    paginateItems,
    getTotalPages,
    searchQuestions
} from './utils';
import './styles.css';

const UMLQcm = () => {
    const [activeKey, setActiveKey] = useState(null);
    const [showAnswers, setShowAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState({});
    const [expandAll, setExpandAll] = useState(false);

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
        };
    }, []);

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

    // *** NOUVELLES FONCTIONS POUR LE TEXT-TO-SPEECH ***

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
        // Utiliser une API de synthèse vocale plus avancée qui permet le téléchargement
        // Par exemple, Google Cloud Text-to-Speech API (nécessite une clé API)
        // Cette implémentation est simplifiée et nécessiterait un backend pour fonctionner correctement

        alert("La fonctionnalité de téléchargement audio nécessite une API backend. Cette démonstration montre uniquement l'interface utilisateur.");

        // Une implémentation réelle pourrait ressembler à ceci:
        /*
        fetch('/api/text-to-speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, lang: 'fr-FR' }),
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `question-${id}-audio.mp3`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });
        */
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

    return (
        <Container className="qcm-container">
            <Header className="qcm-header">
                <h1>QCM d'Informatique</h1>
                <div className="header-controls">
                    <Button appearance="primary" onClick={prepareForPDF} className="pdf-button">
                        Télécharger en PDF complet
                    </Button>
                </div>
            </Header>

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
                    />
                </div>

                {/* Résultats de recherche */}
                {searchTerm && (
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
                    />

                    {showPagination && (
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
                            className="question-panel"
                            header={
                                <div className="question-header-content">
                                    <span>{`Question ${item.id}: ${item.question}`}</span>
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
                                </div>
                            }
                            collapsible
                            expanded={expandAll || activeKey === item.id}
                            onSelect={() => !expandAll && handleSelect(item.id)}
                        >
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
                            {showExplanation[item.id] && showAnswers[item.id] && (
                                <div className="explanation-box">
                                    <h4>Explication:</h4>
                                    <p>{item.explanation}</p>

                                    {item.examples && (
                                        <div className="examples-section">
                                            <h4>Exemples:</h4>
                                            <p>{item.examples}</p>
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
                {showPagination && filteredQuestions.length > 0 && (
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
        </Container>
    );
};

export default UMLQcm;