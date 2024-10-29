import "./MapFilter.css"
export const MapFilter = ({ displayCurrent, displaySMD, displayMMD, displayPrecincts }) => {
    return (
        <div className="map_filter">
            <button className="map_filter_option">Current</button>
            <button className="map_filter_option">SMD</button>
            <button className="map_filter_option">MMD</button>
            <button className="map_filter_option">Precincts</button>
        </div>
    )
}