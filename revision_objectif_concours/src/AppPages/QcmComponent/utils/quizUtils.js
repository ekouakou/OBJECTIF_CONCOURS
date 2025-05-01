// Safe utility to check if a value exists in an array
const safeIncludes = (array, value) => {
    return Array.isArray(array) && array.includes(value);
  };
  
  // Fixed calculation function with proper null/undefined checks
  export const calculateScore = (questions, selectedAnswers) => {
    if (!questions || !selectedAnswers) {
      return { score: 0, total: 0, percentage: 0 };
    }
  
    let correctCount = 0;
    
    questions.forEach((question, index) => {
      const userAnswers = selectedAnswers[index] || [];
      
      // Handle cases where correctAnswer is an array (multiple correct answers)
      if (Array.isArray(question.correctAnswer)) {
        // Check if every correct answer was selected by the user
        // AND if every user selection is actually correct
        const allCorrectAnswersSelected = question.correctAnswer.every(ans => 
          safeIncludes(userAnswers, ans));
          
        const noIncorrectAnswersSelected = userAnswers.every(ans => 
          safeIncludes(question.correctAnswer, ans));
          
        if (allCorrectAnswersSelected && noIncorrectAnswersSelected) {
          correctCount++;
        }
      } 
      // Handle single correct answer case
      else if (question.correctAnswer !== undefined) {
        if (safeIncludes(userAnswers, question.correctAnswer)) {
          correctCount++;
        }
      }
    });
  
    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    
    return {
      score: correctCount,
      total,
      percentage
    };
  };