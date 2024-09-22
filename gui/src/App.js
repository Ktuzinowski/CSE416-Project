import "./App.css"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { HomePage } from './HomePage';
import { ArizonaMap } from "./ArizonaMap";
import { UtahMap } from "./UtahMap";
import { TexasMap } from './TexasMap'
import { Education } from "./Education";
import { Routes, Route, Link } from "react-router-dom"

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  return (
    <>
      <nav >
        <ul>
          <li>
            <Link to="/" className="navigation_links">Home</Link>
          </li>
          <li>
            <Link to="/arizona" className="navigation_links">Arizona</Link>
          </li>
          <li>
            <Link to="/texas" className="navigation_links">Texas</Link>
          </li>
          <li>
            <Link to="/utah" className="navigation_links">Utah</Link>
          </li>
          <li>
            <Link to="/education" className="navigation_links">Education</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arizona" element={<ArizonaMap />} />
        <Route path="/texas" element={<TexasMap />} />
        <Route path="/utah" element={<UtahMap />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </>
  );
}

export default App;
 