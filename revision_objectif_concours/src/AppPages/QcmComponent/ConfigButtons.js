import React from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const ConfigButtons = ({ 
  expandAll, 
  toggleExpandAll, 
  handleToggleAllAnswers, 
  handleToggleAllExplanations 
}) => {
  return (
    <div className="config-buttons">
      <ButtonToolbar>
        <ButtonGroup>
          <Button
            appearance="primary"
            onClick={toggleExpandAll}
          >
            {expandAll ? 'Réduire toutes les questions' : 'Développer toutes les questions'}
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

export default ConfigButtons;