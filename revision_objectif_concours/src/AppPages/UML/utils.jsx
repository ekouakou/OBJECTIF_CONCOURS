// utils.js
import html2pdf from 'html2pdf.js';

// Génération du PDF
export const generatePDF = (elementId, filename) => {
  const element = document.getElementById(elementId);
  const opt = {
    margin: 10,
    filename: filename || 'qcm-informatique-complet.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(element).save();
};

// Génère les lettres pour les options (de A à X)
export const getOptionLetters = () => 'ABCDEFGHIJKLMNOPQRSTUVWX';

// Activer/désactiver toutes les réponses
export const toggleAllItems = (items, value) => {
  const result = {};
  items.forEach(item => {
    result[item.id] = value;
  });
  return result;
};

// Préparer les données pour la pagination
export const paginateItems = (items, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};

// Calculer le nombre total de pages
export const getTotalPages = (items, itemsPerPage) => {
  return Math.ceil(items.length / itemsPerPage);
};

// Fonction de recherche
export const searchQuestions = (questions, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return questions;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return questions.filter(question => {
    // Recherche dans la question
    if (question.question.toLowerCase().includes(term)) {
      return true;
    }
    
    // Recherche dans les options
    if (question.options.some(option => option.toLowerCase().includes(term))) {
      return true;
    }
    
    // Recherche dans l'explication
    if (question.explanation && question.explanation.toLowerCase().includes(term)) {
      return true;
    }
    
    // Recherche dans les exemples
    if (question.examples && question.examples.toLowerCase().includes(term)) {
      return true;
    }
    
    return false;
  });
};