// Connect to the database and select the collection containing your main document
const db = connect("mongodb://localhost:27017/geojson_db");
const mainCollection = db.getCollection("smd_district_summary");

// Retrieve the document
const document = mainCollection.findOne({ _id: ObjectId("673545339c10ac6e66e07acc") });

// Check if the document was found
if (document) {
  // Create a temporary copy of the document with populated `geometry` fields
  const populatedDocument = JSON.parse(JSON.stringify(document));  // Clone the document

  populatedDocument.features.forEach((feature, index) => {
    // Check if the `geometry` field is an ObjectId
    feature.geometry = ObjectId(`${feature.geometry}`);
    if (feature.geometry instanceof ObjectId) {
      // Find the document in `smd_district_geometry` with the matching ObjectId
      const geometryDoc = db.smd_district_geometry.findOne({ _id: feature.geometry });
      if (geometryDoc) {
        // Match the district number between the feature and geometryDoc
        const districtNumber = feature.properties.district;
        const districtGeometry = geometryDoc[districtNumber];  // Access the geometry by district number key
        if (districtGeometry) {
          // Populate the `geometry` field with the matching geometry data
          populatedDocument.features[index].geometry = districtGeometry;
        } else {
          print(`No geometry found for district ${districtNumber} in geometryDoc.`);
        }
      } else {
        print("Did not find associated geometry document.");
      }
    }
    else {
        print("not an object id");
    }
  });

  // Print the populated document
  printjson(populatedDocument);
} else {
  print("Document not found");
}
