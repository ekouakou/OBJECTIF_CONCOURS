import React from 'react';
import { Container, Header, Content, Panel, Form, Button, Checkbox } from 'rsuite';

const ConfigScreen = ({ config, updateConfig, startQuiz }) => {
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

export default ConfigScreen;