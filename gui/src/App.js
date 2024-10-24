import React, { useState } from "react";
import "./App.css"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { HomePage } from './HomePage';
import { UtahMap } from "./state_map/UtahMap";
import { TexasMap } from './state_map/TexasMap'
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom"
import { DataSourcesPage } from "./DataSourcesPage";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  // Set default state based on the current route
  const getDefaultState = () => {
    switch (location.pathname) {
      case "/texas": return "Texas";
      case "/utah": return "Utah";
      default: return "State"; // for HomePage or default
    }
  };

  const [selectedState, setSelectedState] = useState(getDefaultState);

  // Handle state change and navigation
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);

    // Navigate to the corresponding state map
    switch (state) {
      case "Texas":
        navigate("/texas");
        break;
      case "Utah":
        navigate("/utah");
        break;
      default:
        navigate("/");
        break;
    }
  }

  return (
    <>
      <nav >
        <ul>
          <li>
            <Link to="/" className="navigation_links" onClick={() => setSelectedState("State")}>Home</Link>
          </li>
          <li>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="navigation_select_links"
            >
              <option value="State">State</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
            </select>
          </li>
          <li>
            <Link to="/datasources" className="navigation_links">Sources</Link>
          </li>
          <li>
            <Link to="/datasources" className="navigation_links">Data Sources</Link>
          </li>
          <li>
            <Link to="/datasources" className="navigation_links">Data Sources</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/texas" element={<TexasMap />} />
        <Route path="/utah" element={<UtahMap />} />
        <Route path="/datasources" element={<DataSourcesPage />} />
      </Routes>
    </>
  );
}

export default App;
 