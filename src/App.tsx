import "./App.css";
import {useState} from "react";
import {Header, Main, Footer, AboutCard} from "@components/Components";
import "leaflet/dist/leaflet.css";

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
      <>
        <Header
            setShowCreateModal={setShowCreateModal}
        />

        <Main
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
        />
        <AboutCard/>
        <Footer/>
      </>
  );
}

export default App;