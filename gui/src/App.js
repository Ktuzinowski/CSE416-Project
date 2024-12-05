import React, { useState, useEffect } from "react";
import { HomePage } from './HomePage';
import { StateMap } from "./state_map/StateMap";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom"
import { DataSourcesPage } from "./DataSourcesPage";
import { getStatesAvailable } from "./axiosClient";
import "./App.css"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [statesAvailable, setStatesAvailable] = useState([]);
  const [selectedState, setSelectedState] = useState("State");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadStatesAvailable = async () => {
      try {
        const states = await getStatesAvailable();
        setStatesAvailable(states);
      } catch (error) {
        console.error("Failed to load state outlines:", error.message);
      }
    }
    loadStatesAvailable();
  }, []);

   // Synchronize selectedState with URL path changes
   useEffect(() => {
    const pathState = location.pathname.slice(1).toLowerCase(); // Extract state from path

    // Check if pathState matches a state in statesAvailable
    const matchedState = statesAvailable.find(
      (state) => state.toLowerCase() === pathState
    );

    // Update selectedState if a match is found; otherwise, default to "State"
    if (matchedState)  {
      setSelectedState(matchedState);
    } else {
      setSelectedState("State");
    }
  }, [location.pathname, statesAvailable]);

  // Handle state change and navigation
  const handleStateChange = (e) => {
    const state = e.target.value;
    const formattedState = state.charAt(0).toUpperCase() + state.slice(1).toLowerCase();

    setSelectedState(formattedState);

    if (formattedState === "State") {
      navigate("/");
    }
    else {
      navigate(`/${state.toLowerCase()}`);
    }
  }

  const handleStateMapSelect = (link) => {
    const selectedState = link.charAt(1).toUpperCase() + link.slice(2);
    setSelectedState(selectedState);
    navigate(link);
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
              {(
                statesAvailable.map((state) => (
                  <option key={state} value={state}>
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </option>
                ))
              )}
            </select>
          </li>
          <li>
            <Link to="/datasources" className="navigation_links">Sources</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage handleStateMapSelect={handleStateMapSelect} />} />
        {statesAvailable.map((state) => (
          <Route
          key={state}
          path={`/${state.toLowerCase()}`}
          element={<StateMap key={state} state={state.toLowerCase()} />}
          />
        ))}
        <Route path="/datasources" element={<DataSourcesPage />} />
        <Route path="*" element={<HomePage />} /> {/* Fallback route */}
      </Routes>
    </>
  );
}

export default App;
 