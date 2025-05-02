import "./App.css";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import LoadExternalScripts from './AppComponents/LoadExternalScripts';
import QCMApp from "./AppPages/QcmComponent/QCMApp";
import UMLQcmNew from "./AppPages/QcmComponent/UMLQcmNew";
import QCMQuestions from"./AppPages/CoteDivoire/QCMOrganisationsAfricaines"

function App() {
  return (
    <div className="app-content">
      <Router>
        {/* <ScrollToTop /> */}

        <div className="content">
          <Routes>
            {/* <Route path="/" element={<UMLQcm questionSerie ={QCMQuestions} Title="Test de connaissances QRCODE" />} /> */}
            <Route path="/" element={<UMLQcmNew questionSerie ={QCMQuestions} Title="Test de connaissances Organistaion Africaine" />} />
            <Route path="/test" element={<QCMApp questions ={QCMQuestions} Title="Test de connaissances Organistaion Africaine" />} />


            {/* <Route path="/:PARAM_LG_AGEID" element={<VerticalTicketWizard />} />
            <Route path="/ecran/:PARAM_LG_AGEID" element={<ModernQueueSystem />} /> */}
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
      {/* <LoadExternalScripts /> */}
    </div>
  );
}

export default App;
