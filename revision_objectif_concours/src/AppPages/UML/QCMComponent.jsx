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
import { Speaker, CheckOutline, CloseOutline, PlayOutline } from '@rsuite/icons';
import 'rsuite/dist/rsuite.min.css';
import Pagination from '../QcmComponent/Pagination';
import PageSizeSelector from './PageSizeSelector';
import SearchBar from './SearchBar';
import {
    generatePDF,
    getOptionLetters,
    toggleAllItems,
    formatTime,
    startCountdown,
    stopCountdown,
    clearAllTimers
} from './utils';
import '../styles.css';

const quizData = {
    "status": "success",
    "total": 9,
    "page": 1,
    "items_per_page": 10,
    "total_pages": 1,
    "questions": [
        {
            "id": 1,
            "text": "En quelle année a eu lieu la Révolution française ?",
            "explanation": "La Révolution française est un tournant majeur dans l'histoire de France, marquant la fin de la monarchie absolue.",
            "difficulty_level": "débutant",
            "created_at": "2025-05-03 00:43:15",
            "updated_at": "2025-05-03 00:43:15",
            "quiz": {
                "id": 1,
                "title": "Les grandes dates de l'Histoire de France",
                "description": "Testez vos connaissances sur les dates importantes de l'histoire française",
                "difficulty_level": "intermédiaire"
            },
            "options": [
                {
                    "id": 1,
                    "text": "1789",
                    "is_correct": 1,
                    "explanation": "La Révolution française a commencé en 1789 avec la prise de la Bastille le 14 juillet."
                },
                {
                    "id": 2,
                    "text": "1799",
                    "is_correct": 0,
                    "explanation": "1799 est l'année du coup d'État du 18 Brumaire qui a porté Napoléon Bonaparte au pouvoir."
                },
                {
                    "id": 3,
                    "text": "1769",
                    "is_correct": 0,
                    "explanation": "1769 est l'année de naissance de Napoléon Bonaparte."
                },
                {
                    "id": 4,
                    "text": "1815",
                    "is_correct": 0,
                    "explanation": "1815 est l'année de la bataille de Waterloo et de la fin du Premier Empire."
                },
                {
                    "id": 33,
                    "text": "Singapour",
                    "is_correct": 1,
                    "explanation": null
                },
                {
                    "id": 34,
                    "text": "Jakarta",
                    "is_correct": 0,
                    "explanation": null
                },
                {
                    "id": 35,
                    "text": "Kuala Lumpur",
                    "is_correct": 0,
                    "explanation": null
                },
                {
                    "id": 36,
                    "text": "Bangkok",
                    "is_correct": 0,
                    "explanation": null
                }
            ],
            "periods": [
                {
                    "id": 4,
                    "name": "Époque contemporaine",
                    "start_year": 1789,
                    "end_year": null,
                    "description": "De la Révolution française à nos jours"
                }
            ],
            "years": [
                {
                    "id": 1,
                    "year": 1789,
                    "description": "Année de la Révolution française"
                }
            ],
            "translations": []
        },
        {
            "id": 2,
            "text": "En quelle année Napoléon Bonaparte est-il devenu empereur ?",
            "explanation": "Napoléon s'est proclamé empereur des Français sous le nom de Napoléon Ier.",
            "difficulty_level": "intermédiaire",
            "created_at": "2025-05-03 00:43:15",
            "updated_at": "2025-05-03 00:43:15",
            "quiz": {
                "id": 1,
                "title": "Les grandes dates de l'Histoire de France",
                "description": "Testez vos connaissances sur les dates importantes de l'histoire française",
                "difficulty_level": "intermédiaire"
            },
            "options": [
                {
                    "id": 5,
                    "text": "1804",
                    "is_correct": 1,
                    "explanation": "Napoléon Bonaparte s'est couronné empereur des Français le 2 décembre 1804 à Notre-Dame de Paris."
                },
                {
                    "id": 6,
                    "text": "1799",
                    "is_correct": 0,
                    "explanation": "En 1799, Napoléon Bonaparte devient Premier Consul après le coup d'État du 18 Brumaire."
                },
                {
                    "id": 7,
                    "text": "1812",
                    "is_correct": 0,
                    "explanation": "1812 est l'année de la campagne de Russie, qui fut un désastre pour l'armée napoléonienne."
                },
                {
                    "id": 8,
                    "text": "1821",
                    "is_correct": 0,
                    "explanation": "1821 est l'année de la mort de Napoléon Bonaparte en exil sur l'île de Sainte-Hélène."
                }
            ],
            "periods": [],
            "years": [],
            "translations": []
        },
        {
            "id": 3,
            "text": "Quelle bataille marque la défaite définitive de Napoléon ?",
            "explanation": "Cette bataille a mis fin aux Cent-Jours et à l'ère napoléonienne.",
            "difficulty_level": "intermédiaire",
            "created_at": "2025-05-03 00:43:15",
            "updated_at": "2025-05-03 00:43:15",
            "quiz": {
                "id": 1,
                "title": "Les grandes dates de l'Histoire de France",
                "description": "Testez vos connaissances sur les dates importantes de l'histoire française",
                "difficulty_level": "intermédiaire"
            },
            "options": [
                {
                    "id": 9,
                    "text": "La bataille de Waterloo",
                    "is_correct": 1,
                    "explanation": "La bataille de Waterloo, le 18 juin 1815, marque la défaite définitive de Napoléon face aux forces alliées."
                },
                {
                    "id": 10,
                    "text": "La bataille d'Austerlitz",
                    "is_correct": 0,
                    "explanation": "La bataille d'Austerlitz (1805) était une victoire majeure de Napoléon, non une défaite."
                },
                {
                    "id": 11,
                    "text": "La bataille de Leipzig",
                    "is_correct": 0,
                    "explanation": "La bataille de Leipzig (1813) était une défaite importante, mais pas la défaite définitive."
                },
                {
                    "id": 12,
                    "text": "La bataille de Wagram",
                    "is_correct": 0,
                    "explanation": "La bataille de Wagram (1809) était une victoire de Napoléon sur les Autrichiens."
                }
            ],
            "periods": [],
            "years": [
                {
                    "id": 6,
                    "year": 1815,
                    "description": "Bataille de Waterloo"
                }
            ],
            "translations": []
        },
        {
            "id": 4,
            "text": "En quelle année a été proclamée la Cinquième République française ?",
            "explanation": "La Cinquième République est le régime républicain en vigueur en France aujourd'hui.",
            "difficulty_level": "intermédiaire",
            "created_at": "2025-05-03 00:43:15",
            "updated_at": "2025-05-03 00:43:15",
            "quiz": {
                "id": 1,
                "title": "Les grandes dates de l'Histoire de France",
                "description": "Testez vos connaissances sur les dates importantes de l'histoire française",
                "difficulty_level": "intermédiaire"
            },
            "options": [
                {
                    "id": 13,
                    "text": "1958",
                    "is_correct": 1,
                    "explanation": "La Cinquième République a été proclamée en 1958 avec l'adoption d'une nouvelle Constitution et le retour du général de Gaulle au pouvoir."
                },
                {
                    "id": 14,
                    "text": "1945",
                    "is_correct": 0,
                    "explanation": "1945 marque la fin de la Seconde Guerre mondiale et le début de la Quatrième République."
                },
                {
                    "id": 15,
                    "text": "1968",
                    "is_correct": 0,
                    "explanation": "1968 est l'année des événements de Mai 68, mais pas celle de la proclamation de la Cinquième République."
                },
                {
                    "id": 16,
                    "text": "1940",
                    "is_correct": 0,
                    "explanation": "1940 marque le début du régime de Vichy sous l'occupation allemande."
                }
            ],
            "periods": [],
            "years": [],
            "translations": []
        },
        {
            "id": 5,
            "text": "Quand a commencé la Seconde Guerre mondiale en Europe ?",
            "explanation": "L'invasion de la Pologne par l'Allemagne nazie est considérée comme le début officiel de la Seconde Guerre mondiale en Europe.",
            "difficulty_level": "débutant",
            "created_at": "2025-05-03 00:43:15",
            "updated_at": "2025-05-03 00:43:15",
            "quiz": {
                "id": 2,
                "title": "La Seconde Guerre mondiale",
                "description": "Quiz complet sur le conflit le plus meurtrier de l'histoire",
                "difficulty_level": "avancé"
            },
            "options": [
                {
                    "id": 17,
                    "text": "1er septembre 1939",
                    "is_correct": 1,
                    "explanation": "L'Allemagne nazie a envahi la Pologne le 1er septembre 1939, déclenchant la Seconde Guerre mondiale."
                },
                {
                    "id": 18,
                    "text": "1er septembre 1938",
                    "is_correct": 0,
                    "explanation": "Cette date correspond aux accords de Munich, un an avant le début de la guerre."
                },
                {
                    "id": 19,
                    "text": "10 mai 1940",
                    "is_correct": 0,
                    "explanation": "Cette date correspond au début de l'offensive allemande à l'Ouest (France, Belgique, Pays-Bas)."
                },
                {
                    "id": 20,
                    "text": "22 juin 1941",
                    "is_correct": 0,
                    "explanation": "Cette date correspond au lancement de l'opération Barbarossa, l'invasion de l'URSS par l'Allemagne nazie."
                }
            ],
            "periods": [
                {
                    "id": 7,
                    "name": "Seconde Guerre mondiale",
                    "start_year": 1939,
                    "end_year": 1945,
                    "description": "Conflit militaire le plus meurtrier de l'histoire"
                }
            ],
            "years": [
                {
                    "id": 2,
                    "year": 1914,
                    "description": "Début de la Première Guerre mondiale"
                }
            ],
            "translations": []
        },
        {
            "id": 6,
            "text": "Quelle opération militaire désigne le débarquement allié en Normandie ?",
            "explanation": "Cette opération est la plus grande invasion amphibie de l'histoire.",
            "difficulty_level": "débutant",
            "created_at": "2025-05-03 00:43:15",
            "updated_at": "2025-05-03 00:43:15",
            "quiz": {
                "id": 2,
                "title": "La Seconde Guerre mondiale",
                "description": "Quiz complet sur le conflit le plus meurtrier de l'histoire",
                "difficulty_level": "avancé"
            },
            "options": [
                {
                    "id": 21,
                    "text": "Opération Overlord",
                    "is_correct": 1,
                    "explanation": "L'opération Overlord est le nom de code du débarquement allié en Normandie le 6 juin 1944."
                },
                {
                    "id": 22,
                    "text": "Opération Market Garden",
                    "is_correct": 0,
                    "explanation": "L'opération Market Garden était une offensive alliée aux Pays-Bas en septembre 1944."
                },
                {
                    "id": 23,
                    "text": "Opération Torch",
                    "is_correct": 0,
                    "explanation": "L'opération Torch était le débarquement allié en Afrique du Nord en novembre 1942."
                },
                {
                    "id": 24,
                    "text": "Opération Barbarossa",
                    "is_correct": 0,
                    "explanation": "L'opération Barbarossa était le nom de code de l'invasion allemande de l'URSS."
                }
            ],
            "periods": [
                {
                    "id": 7,
                    "name": "Seconde Guerre mondiale",
                    "start_year": 1939,
                    "end_year": 1945,
                    "description": "Conflit militaire le plus meurtrier de l'histoire"
                }
            ],
            "years": [],
            "translations": []
        },
        {
            "id": 7,
            "text": "Qui était le dirigeant de l'URSS pendant la Seconde Guerre mondiale ?",
            "explanation": "Il a dirigé l'Union soviétique pendant la \"Grande Guerre patriotique\".",
            "difficulty_level": "intermédiaire",
            "created_at": "2025-05-03 00:43:15",
            "updated_at": "2025-05-03 00:43:15",
            "quiz": {
                "id": 2,
                "title": "La Seconde Guerre mondiale",
                "description": "Quiz complet sur le conflit le plus meurtrier de l'histoire",
                "difficulty_level": "avancé"
            },
            "options": [
                {
                    "id": 25,
                    "text": "Joseph Staline",
                    "is_correct": 1,
                    "explanation": "Joseph Staline a dirigé l'Union soviétique pendant la Seconde Guerre mondiale de 1939 à 1945."
                },
                {
                    "id": 26,
                    "text": "Léon Trotsky",
                    "is_correct": 0,
                    "explanation": "Léon Trotsky était en exil et a été assassiné au Mexique en 1940."
                },
                {
                    "id": 27,
                    "text": "Vladimir Lénine",
                    "is_correct": 0,
                    "explanation": "Vladimir Lénine est mort en 1924, bien avant le début de la Seconde Guerre mondiale."
                },
                {
                    "id": 28,
                    "text": "Nikita Khrouchtchev",
                    "is_correct": 0,
                    "explanation": "Nikita Khrouchtchev a dirigé l'URSS après la mort de Staline en 1953."
                }
            ],
            "periods": [
                {
                    "id": 7,
                    "name": "Seconde Guerre mondiale",
                    "start_year": 1939,
                    "end_year": 1945,
                    "description": "Conflit militaire le plus meurtrier de l'histoire"
                }
            ],
            "years": [],
            "translations": []
        },
        {
            "id": 8,
            "text": "En quelle année le Japon a-t-il capitulé, marquant la fin de la Seconde Guerre mondiale ?",
            "explanation": "La capitulation du Japon est survenue après les bombardements atomiques d'Hiroshima et Nagasaki.",
            "difficulty_level": "intermédiaire",
            "created_at": "2025-05-03 00:43:15",
            "updated_at": "2025-05-03 00:43:15",
            "quiz": {
                "id": 2,
                "title": "La Seconde Guerre mondiale",
                "description": "Quiz complet sur le conflit le plus meurtrier de l'histoire",
                "difficulty_level": "avancé"
            },
            "options": [
                {
                    "id": 29,
                    "text": "1945",
                    "is_correct": 1,
                    "explanation": "Le Japon a capitulé le 2 septembre 1945, après les bombardements atomiques d'Hiroshima et Nagasaki."
                },
                {
                    "id": 30,
                    "text": "1944",
                    "is_correct": 0,
                    "explanation": "1944 est l'année du débarquement de Normandie et de la libération de Paris."
                },
                {
                    "id": 31,
                    "text": "1943",
                    "is_correct": 0,
                    "explanation": "1943 est l'année de la bataille de Stalingrad et du débarquement en Sicile."
                },
                {
                    "id": 32,
                    "text": "1946",
                    "is_correct": 0,
                    "explanation": "En 1946, la guerre était déjà terminée depuis un an."
                }
            ],
            "periods": [
                {
                    "id": 7,
                    "name": "Seconde Guerre mondiale",
                    "start_year": 1939,
                    "end_year": 1945,
                    "description": "Conflit militaire le plus meurtrier de l'histoire"
                }
            ],
            "years": [
                {
                    "id": 3,
                    "year": 1945,
                    "description": "Fin de la Seconde Guerre mondiale"
                }
            ],
            "translations": []
        },
        {
            "id": 9,
            "text": "Quelle est la capitale de Singapour ?",
            "explanation": "Singapour est à la fois le nom du pays et de sa capitale. C'est une cité-État située en Asie du Sud-Est.",
            "difficulty_level": "intermédiaire",
            "created_at": "2025-05-03 03:05:03",
            "updated_at": "2025-05-03 03:05:03",
            "quiz": {
                "id": 1,
                "title": "Les grandes dates de l'Histoire de France",
                "description": "Testez vos connaissances sur les dates importantes de l'histoire française",
                "difficulty_level": "intermédiaire"
            },
            "options": [],
            "periods": [],
            "years": [],
            "translations": []
        }
    ]
}

const QCMComponent = () => {
    // États de base
    const [activeKey, setActiveKey] = useState(null);
    const [showAnswers, setShowAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState({});
    const [expandAll, setExpandAll] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [evaluationMode, setEvaluationMode] = useState(true);
    const [evaluationResults, setEvaluationResults] = useState({
        score: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        showResults: false
    });

    // Recherche et pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [activePage, setActivePage] = useState(1);
    const [paginatedQuestions, setPaginatedQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Options et timers
    const optionLetters = getOptionLetters();
    const speechSynthRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState({});
    const [questionTimers, setQuestionTimers] = useState({});
    const [timeLimit, setTimeLimit] = useState(60);

    // Initialisation des questions
    useEffect(() => {
        if (quizData && quizData.status === "success" && quizData.questions) {
            setFilteredQuestions(quizData.questions);
        }
    }, [quizData]);

    // Initialisation de la synthèse vocale
    useEffect(() => {
        if ('speechSynthesis' in window) {
            speechSynthRef.current = window.speechSynthesis;
        }

        return () => {
            if (speechSynthRef.current) {
                speechSynthRef.current.cancel();
            }
            clearAllTimers(questionTimers);
        };
    }, []);

    // Nettoyage lors du démontage
    useEffect(() => {
        return () => {
            clearAllTimers();
            setQuestionTimers({});
        };
    }, []);

    // Recherche dans les questions
    useEffect(() => {
        if (!quizData || !quizData.questions) return;
        
        const results = searchQuestions(quizData.questions, searchTerm);
        setFilteredQuestions(results);
        setActivePage(1);
    }, [searchTerm, quizData]);

    // Mise à jour des questions paginées
    useEffect(() => {
        const effectiveItemsPerPage = itemsPerPage === 999 ? filteredQuestions.length : itemsPerPage;
        const pages = Math.ceil(filteredQuestions.length / effectiveItemsPerPage) || 1;
        setTotalPages(pages);

        const validActivePage = Math.min(Math.max(1, activePage), Math.max(1, pages));
        if (validActivePage !== activePage) {
            setActivePage(validActivePage);
        }

        const startIdx = (validActivePage - 1) * effectiveItemsPerPage;
        const endIdx = startIdx + effectiveItemsPerPage;
        setPaginatedQuestions(filteredQuestions.slice(startIdx, endIdx));
    }, [activePage, itemsPerPage, filteredQuestions]);

    // Fonction de recherche adaptée au nouveau format
    const searchQuestions = (questions, term) => {
        if (!term.trim()) return questions;
        
        const searchTermLower = term.toLowerCase();
        return questions.filter(question => {
            // Recherche dans la question
            if (question.text.toLowerCase().includes(searchTermLower)) return true;
            
            // Recherche dans les options
            if (question.options.some(option => option.text.toLowerCase().includes(searchTermLower))) return true;
            
            // Recherche dans les explications
            if (question.explanation && question.explanation.toLowerCase().includes(searchTermLower)) return true;
            
            return false;
        });
    };

    // Fonctions de gestion des panneaux
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

    const toggleExpandAll = () => {
        setExpandAll(!expandAll);
        setActiveKey(expandAll ? null : 'all');
    };

    const handleToggleAllAnswers = (show) => {
        const newState = {};
        filteredQuestions.forEach(question => {
            newState[question.id] = show;
        });
        setShowAnswers(newState);
    };

    const handleToggleAllExplanations = (show) => {
        const newState = {};
        filteredQuestions.forEach(question => {
            newState[question.id] = show;
        });
        setShowExplanation(newState);
    };

    // Gestion de la pagination et des items par page
    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setActivePage(1);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        window.scrollTo(0, 0);
    };

    // Gestion de la recherche
    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    // Génération PDF
    const prepareForPDF = () => {
        const currentItemsPerPage = itemsPerPage;
        const currentActivePage = activePage;
        const currentSearchTerm = searchTerm;

        setSearchTerm('');
        setItemsPerPage(999);
        handleToggleAllAnswers(true);
        handleToggleAllExplanations(true);

        if (!expandAll) {
            toggleExpandAll();
        }

        setTimeout(() => {
            generatePDF('qcm-content', 'qcm-complet.pdf');

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

    // Text-to-Speech
    const prepareQuestionTextForSpeech = (question) => {
        let text = `Question ${question.id}: ${question.text} `;

        question.options.forEach((option, index) => {
            text += `Option ${optionLetters[index]}: ${option.text}. `;
        });

        if (showAnswers[question.id]) {
            const correctOption = question.options.find(opt => opt.is_correct === 1);
            const correctOptionIndex = question.options.findIndex(opt => opt.is_correct === 1);
            const correctOptionLetter = optionLetters[correctOptionIndex];
            
            text += `La bonne réponse est l'option ${correctOptionLetter}: ${correctOption.text}. `;

            if (showExplanation[question.id]) {
                text += `Explication: ${question.explanation} `;

                if (question.examples) {
                    text += `Exemples: ${question.examples} `;
                }
            }
        }

        return text;
    };

    const speakText = (id, text) => {
        if (speechSynthRef.current) {
            speechSynthRef.current.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';

        const voices = speechSynthRef.current.getVoices();
        const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
        if (frenchVoice) {
            utterance.voice = frenchVoice;
        }

        utterance.onstart = () => {
            setIsPlaying(prev => ({ ...prev, [id]: true }));
        };

        utterance.onend = () => {
            setIsPlaying(prev => ({ ...prev, [id]: false }));
        };

        utterance.onerror = () => {
            setIsPlaying(prev => ({ ...prev, [id]: false }));
        };

        speechSynthRef.current.speak(utterance);
    };

    const handleSpeak = (question) => {
        const text = prepareQuestionTextForSpeech(question);
        speakText(question.id, text);
    };

    const downloadAudio = (id, text) => {
        alert("La fonctionnalité de téléchargement audio nécessite une API backend. Cette démonstration montre uniquement l'interface utilisateur.");
    };

    const handleDownloadAudio = (question) => {
        const text = prepareQuestionTextForSpeech(question);
        downloadAudio(question.id, text);
    };

    // Gestion de l'évaluation
    const toggleEvaluationMode = () => {
        if (evaluationMode) {
            setUserAnswers({});
            setEvaluationResults({
                score: 0,
                totalQuestions: 0,
                correctAnswers: 0,
                showResults: false
            });

            clearAllTimers();
            setQuestionTimers({});
        }
        setEvaluationMode(!evaluationMode);
    };

    const handleUserAnswerChange = (questionId, answerIndex) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answerIndex
        }));

        if (questionTimers[questionId] && questionTimers[questionId].active) {
            stopCountdown(questionId, setQuestionTimers);
        }
    };

    const evaluateAnswers = () => {
        let correctCount = 0;
        let totalCount = 0;

        clearAllTimers();

        const questionsToEvaluate = itemsPerPage === 999 ? filteredQuestions : paginatedQuestions;
        totalCount = questionsToEvaluate.length;

        questionsToEvaluate.forEach(question => {
            const userAnswer = userAnswers[question.id];
            const correctOptionIndex = question.options.findIndex(opt => opt.is_correct === 1);

            if (userAnswer !== undefined && userAnswer === correctOptionIndex) {
                correctCount++;
            }
        });

        const scorePercentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

        setEvaluationResults({
            score: scorePercentage,
            totalQuestions: totalCount,
            correctAnswers: correctCount,
            showResults: true
        });

        const newShowAnswers = {};
        questionsToEvaluate.forEach(question => {
            newShowAnswers[question.id] = true;
        });
        setShowAnswers(newShowAnswers);

        clearAllTimers(questionTimers);
    };

    const closeResults = () => {
        setEvaluationResults(prev => ({
            ...prev,
            showResults: false
        }));
    };

    const resetTest = () => {
        setUserAnswers({});
        setEvaluationResults({
            score: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            showResults: false
        });
        handleToggleAllAnswers(false);

        clearAllTimers();
        setQuestionTimers({});
    };

    // Gestion des minuteurs
    const handleTimeLimitChange = (value) => {
        setTimeLimit(value);
    };

    const handleStartTimer = (questionId) => {
        if (userAnswers[questionId] !== undefined) {
            return;
        }

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

        startCountdown(questionId, timeLimit, setQuestionTimers, onTimeUp);
    };

    const canAnswer = (questionId) => {
        const timer = questionTimers[questionId];
        if (!timer) return true;
        if (timer.expired) return false;
        return timer.active || !timer.started;
    };

    // Détermine si on affiche la pagination
    const showPagination = itemsPerPage !== 999 && totalPages > 1;

    if (!quizData || !quizData.questions) {
        return <Message type="info">Chargement des questions...</Message>;
    }

    return (
        <Container className="qcm-container">
            <Header className="qcm-header">
                <h1>{quizData.questions[0]?.quiz?.title || "QCM"}</h1>
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
                            <Button appearance="ghost" onClick={toggleExpandAll}>
                                {expandAll ? 'Masquer toutes les questions' : 'Afficher toutes les questions'}
                            </Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button appearance="ghost" onClick={() => handleToggleAllAnswers(true)}>
                                Afficher toutes les réponses
                            </Button>
                            <Button appearance="ghost" onClick={() => handleToggleAllAnswers(false)}>
                                Masquer toutes les réponses
                            </Button>
                        </ButtonGroup>

                        <ButtonGroup>
                            <Button appearance="ghost" onClick={() => handleToggleAllExplanations(true)}>
                                Afficher toutes les explications
                            </Button>
                            <Button appearance="ghost" onClick={() => handleToggleAllExplanations(false)}>
                                Masquer toutes les explications
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
            )}

            <Content className="qcm-content" id="qcm-content">
                <div className="qcm-intro">
                    <h2>{quizData.questions[0]?.quiz?.title || "Test de connaissances"}</h2>
                    <p>{quizData.questions[0]?.quiz?.description || "Ce QCM couvre divers sujets."}</p>
                </div>

                <div className="search-section">
                    <SearchBar
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onClear={clearSearch}
                        disabled={evaluationMode}
                    />
                </div>

                {searchTerm && !evaluationMode && (
                    <div className="search-results-info">
                        <p>
                            {filteredQuestions.length === 0
                                ? 'Aucune question ne correspond à votre recherche.'
                                : `${filteredQuestions.length} question(s) trouvée(s) pour "${searchTerm}"`}
                        </p>
                        {filteredQuestions.length > 0 && (
                            <Button appearance="link" onClick={clearSearch} className="clear-search-link">
                                Effacer la recherche
                            </Button>
                        )}
                    </div>
                )}

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

                {filteredQuestions.length === 0 ? (
                    <div className="no-results">
                        <Message type="info" showIcon>
                            Aucune question ne correspond à votre recherche. Veuillez essayer avec d'autres termes.
                        </Message>
                    </div>
                ) : (
                    paginatedQuestions.map((item) => {
                        // Trouver l'index de la bonne réponse
                        const correctOptionIndex = item.options.findIndex(opt => opt.is_correct === 1);
                        return (
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
                                        <span>{`Question ${item.id}: ${item.text}`}</span>
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
                                                        correctOptionIndex === index
                                                            ? 'correct-answer'
                                                            : userAnswers[item.id] === index
                                                                ? 'incorrect-answer'
                                                                : ''
                                                    )
                                                        }`}
                                                >
                                                    <span className="option-letter">{optionLetters[index]}.</span> {option.text}
                                                    {showAnswers[item.id] && correctOptionIndex === index && (
                                                        <span className="correct-badge"><CheckOutline /></span>
                                                    )}
                                                    {showAnswers[item.id] && userAnswers[item.id] === index && correctOptionIndex !== index && (
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
                                                className={`option ${showAnswers[item.id] && option.is_correct === 1 ? 'correct-answer' : ''}`}
                                            >
                                                <span className="option-letter">{optionLetters[index]}.</span> {option.text}
                                                {showAnswers[item.id] && option.is_correct === 1 && <span className="correct-badge">✓</span>}
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
                                        
                                        {item.detailed_explanation && (
                                            <>
                                                <br />
                                                <h4>Plus de détail:</h4>
                                                <p>{item.detailed_explanation}</p>
                                            </>
                                        )}
                                        
                                        {item.examples && (
                                            <div className="examples-section">
                                                <h4>Exemples:</h4>
                                                <p>{item.examples}</p>
                                            </div>
                                        )}

                                        {item.image_url && (
                                            <div className="examples-section">
                                                <h4>Illustration:</h4>
                                                <img src={item.image_url} className='w-100' alt={`Illustration pour la question ${item.id}`} />
                                            </div>
                                        )}

                                        {item.usefulLinks && item.usefulLinks.length > 0 && (
                                            <div className="links-section">
                                                <h4>Liens utiles:</h4>
                                                <ul>
                                                    {item.usefulLinks.map((link, index) => (
                                                        <li key={index}>
                                                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                                {link.description || link.url}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Panel>
                        );
                    })
                )}

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
                <p>© {new Date().getFullYear()} - QCM</p>
            </Footer>

            <Modal open={evaluationResults.showResults} onClose={closeResults} size="md">
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

                        <p className="review-instructions">Les réponses correctes sont maintenant affichées en vert. Vous pouvez consulter les explications pour en savoir plus</p></div>
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

export default QCMComponent;