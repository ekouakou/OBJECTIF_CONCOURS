import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import componentMap from "./componentMap";
import QCMQuestions from "./AppPages/CoteDivoire/QCMOrganisationsAfricaines";
import QCMCapitalesMonde from "./AppPages/CoteDivoire/QCMCapitalesMonde";

// Simuler des données récupérées de l'API (tableau d'objets)
const simulatedApiData = [
  {
    QCMCapitalesMonde: QCMCapitalesMonde
  },
  {
    QCMQuestions: QCMQuestions,
  }
];

// Fusionner tous les objets en un seul pour accès direct
const variables = simulatedApiData.reduce((acc, obj) => ({ ...acc, ...obj }), {});

// Fonction de récupération dynamique avec vérification des données
const getVariableByName = (name) => {
  if (variables && variables.hasOwnProperty(name)) {
    return variables[name];
  } else {
    return null;
  }
};

function App() {
  // Ajoute ici les routes avec ou sans paramètres dynamiques
  const [routesFromApi] = useState([
    {
      path: "/",
      component: "UMLQcmNew",
      title: "Test de connaissances Organisation Africaine",
      props: {
        questionSerie: "QCMQuestions"
      }
    },
    {
      path: "/test",
      component: "QCMApp",
      title: "Test de connaissances Afrique",
      props: {
        questions: "QCMCapitalesMonde"
      }
    },
    {
      path: "/test/:category?", // paramètre optionnel
      component: "QCMApp",
      title: "Test par catégorie",
      props: {
        questions: "QCMCapitalesMonde"
      }
    },
    {
      path: "/quiz/:quizId/:questionId?", // quizId obligatoire, questionId optionnel
      component: "QuizApp",
      title: "Quiz dynamique",
      props: {
        questions: "QCMQuestions"
      }
    }
  ]);

  // Met à jour les props dynamiquement avec les données appropriées
  const enrichedRoutes = routesFromApi.map((route) => {
    const enrichedProps = { ...route.props };

    for (const propKey in enrichedProps) {
      const variableName = enrichedProps[propKey];
      enrichedProps[propKey] = getVariableByName(variableName);
    }

    return { ...route, props: enrichedProps };
  });

  return (
    <div className="app-content">
      <Router>
        <div className="content">
          <Routes>
            {enrichedRoutes.map((route, index) => {
              const Component = componentMap[route.component];
              if (!Component) return null;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Component Title={route.title} {...(route.props || {})} />}
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
