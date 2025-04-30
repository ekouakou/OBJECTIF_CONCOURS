import "./App.css";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import LoadExternalScripts from './AppComponents/LoadExternalScripts';
import UMLQcm from "./AppPages/QcmComponent/UMLQcmNew_2";
// import UMLQcm from "./AppPages/UML/UMLQcm";

import QCMQuestions from"./AppPages/Questions/CODEBARRE_QRCCODE_QCMQuestions"
// import VerticalTicketWizard from "./AppPages/Home/wiazard/VerticalTicketWizard";
// import ModernQueueSystem from "./AppPages/Home/Ecran/ModernQueueSystem";

function App() {
  return (
    <div className="app-content">
      <Router>
        {/* <ScrollToTop /> */}

        <div className="content">
          <Routes>
            {/* <Route path="/" element={<UMLQcm questionSerie ={QCMQuestions} Title="Test de connaissances QRCODE" />} /> */}
            <Route path="/" element={<UMLQcm questions ={QCMQuestions} Title="Test de connaissances QRCODE" />} />

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
