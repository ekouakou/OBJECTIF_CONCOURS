// routesConfig.js
import QCMApp from "./AppPages/QcmComponent/QCMApp";
import UMLQcmNew from "./AppPages/QcmComponent/UMLQcmNew";
import QCMQuestions from "./AppPages/CoteDivoire/QCMOrganisationsAfricaines";

const routesConfig = [
  {
    path: "/",
    element: <UMLQcmNew questionSerie={QCMQuestions} Title="Test de connaissances Organisation Africaine" />,
  },
  {
    path: "/test",
    element: <QCMApp questions={QCMQuestions} Title="Test de connaissances Organisation Africaine" />,
  },
  // Tu peux ajouter d'autres objets ici
];

export default routesConfig;
