import React from 'react';
import { Button, ButtonToolbar, ButtonGroup, InputNumber, Whisper, Tooltip } from 'rsuite';

// Composant pour les contrôles de configuration en mode normal
export const NormalModeControls = ({ 
  expandAll, 
  toggleExpandAll, 
  handleToggleAllAnswers, 
  handleToggleAllExplanations 
}) => {
  return (
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
  );
};

// Composant pour les contrôles en mode évaluation
export const EvaluationModeControls = ({ 
  evaluateAnswers, 
  resetTest, 
  userAnswers, 
  timeLimit, 
  handleTimeLimitChange 
}) => {
  return (
    <div className="evaluation-controls">
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
  );
};

// Composant pour le bouton des actions générales
export const GeneralActions = ({ prepareForPDF, evaluationMode, toggleEvaluationMode }) => {
  return (
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
  );
};