export const DataSourcesPage = () => {
    return (
      <div className="education_container">

        <h1 className="education_title">Data Sources Used To Create Application</h1>

        <ul>
                <li><a href="https://redistrictingdatahub.org/" target="_blank">Redistricting Data Hub (RDH)</a></li>
                <li><a href="https://redistrictingdatahub.org/state/utah/" target="_blank">Utah RDH Data</a></li>
                <li><a href="https://redistrictingdatahub.org/state/texas/" target="_blank">Texas RDH Data</a></li>
                <li><a href="https://github.com/mggg/maup" target="_blank">Maup Library on GitHub</a></li>
            </ul>
        
        <section className="education_section">
          <h2>Redistricting Data Hub</h2>
          <p>
            Redistricting Data Hub is an open-source platform that provides a large amount of data to support redistricting efforts
             in the United States. The goal of RDH is to promote transparency and eliminate unfairness in redistricting by making 
             election-related data available to the public. This allows us to tackle issues such as the Voting Rights Act, FRA, underrepresentation of minority groups in voting, 
             and gerrymandering (manipulation of electoral district boundaries for political gain).
          </p>
          <p>
            RDH has data involving precinct boundaries, election results, demographic data from the census, voter files, and community maps.
            For this application, we obtained different types of data from the RDH for our two states, Utah and Texas. 
            All of our data was from between 2020 and 2022, which was the most recently available and up-to-date information.
            We obtained district level data in order to display the different districts for our states on the map. 
            We also got precinct level data for the election voting data, for example, whether Republican or Democrats won and which candidates received the most votes.
            Lastly, we obtained census block level data in order to get more information on the population and racial demographics.

          </p>
        </section>
  
        <section className="education_section">
          <h2>Obtaining Data</h2>
          <p>
          Visit the Redistricting Data Hub website and search for relevant datasets.
           You will typically find precinct shapefiles (.shp files) or election data, download these shapefiles for map geometry
           Open QGIS (a free GIS software)
Click Layer → Add Layer → Add Vector Layer, and browse to the .shp file you downloaded.
The precinct or boundary data will load as a map layer.
Right-click the layer in QGIS.
Select Export → Save Features As.
Export as GeoJSON and with the GeoJSON file ready, you can now integrate it into your Leaflet map.
          </p>
         
          <p>
          To aggregate data using the maup library, you align datasets across different geographies (e.g., precincts, districts, and census blocks) by redistributing values based on geographic intersections. In this case, you can use maup to match election results from precincts with district boundaries and population demographics from census blocks. First, obtain the shapefiles and data from the Redistricting Data Hub for Utah and Texas. Then, use maup.assign() to map each block or precinct to the relevant district. If the geographic units don’t perfectly align, maup uses area-weighted interpolation to distribute data proportionally. This enables you to aggregate the population data from blocks and election results from precincts into districts, ensuring all data sources contribute meaningfully to your Leaflet map visualization.
          </p>
        </section>
      </div>
    );
  };