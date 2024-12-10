import { CurrentDistrictPlansFeatureProperties, PrecinctsFeatureProperties } from "../utils/MongoDocumentProperties";

export const getDistrictDataPopupContent = (feature) => {
    const popupContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h3 style="margin: 0;">District No: ${feature.properties[CurrentDistrictPlansFeatureProperties.district]}</h3>
        <p><strong>Representative:</strong> ${feature.properties[CurrentDistrictPlansFeatureProperties.representative]}</p>
        <p><strong>Population:</strong> ${feature.properties[CurrentDistrictPlansFeatureProperties.population].toLocaleString()}</p>

        <p><strong>Republican:</strong> ${(
          (feature.properties[CurrentDistrictPlansFeatureProperties.republican] / (feature.properties[CurrentDistrictPlansFeatureProperties.republican] + feature.properties[CurrentDistrictPlansFeatureProperties.democrat])) *
          100
        ).toFixed(2)}%</p>

        <p><strong>Democrat:</strong> ${(
          (feature.properties[CurrentDistrictPlansFeatureProperties.democrat] / (feature.properties[CurrentDistrictPlansFeatureProperties.republican] + feature.properties[CurrentDistrictPlansFeatureProperties.democrat])) *
          100
        ).toFixed(2)}%</p>

        <p><strong>White:</strong> ${(
          (feature.properties[CurrentDistrictPlansFeatureProperties.white] / feature.properties[CurrentDistrictPlansFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Black:</strong> ${(
          (feature.properties[CurrentDistrictPlansFeatureProperties.black] / feature.properties[CurrentDistrictPlansFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Hispanic:</strong> ${(
          (feature.properties[CurrentDistrictPlansFeatureProperties.hispanic] / feature.properties[CurrentDistrictPlansFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Asian:</strong> ${(
          (feature.properties[CurrentDistrictPlansFeatureProperties.asian] / feature.properties[CurrentDistrictPlansFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Pacific:</strong> ${(
          (feature.properties[CurrentDistrictPlansFeatureProperties.pacific] / feature.properties[CurrentDistrictPlansFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Indigenous:</strong> ${(
          (feature.properties[CurrentDistrictPlansFeatureProperties.indigenous] / feature.properties[CurrentDistrictPlansFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Other:</strong> ${(
          (feature.properties[CurrentDistrictPlansFeatureProperties.other] / feature.properties[CurrentDistrictPlansFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
    </div>
    `;
    return popupContent;
};

export const getPrecinctDataPopupContent = (feature) => {
    const popupContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h3 style="margin: 0;">Precinct: ${feature.properties[PrecinctsFeatureProperties.precinct]}</h3>
        <p><strong>Population:</strong> ${feature.properties[PrecinctsFeatureProperties.population].toLocaleString()}</p>
        <p><strong>Republican:</strong> ${(
          (feature.properties[PrecinctsFeatureProperties.republican] / (feature.properties[PrecinctsFeatureProperties.republican] + feature.properties[PrecinctsFeatureProperties.democrat])) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Democrat:</strong> ${(
          (feature.properties[PrecinctsFeatureProperties.democrat] / (feature.properties[PrecinctsFeatureProperties.republican] + feature.properties[PrecinctsFeatureProperties.democrat])) *
          100
        ).toFixed(2)}%</p>
        <p><strong>White:</strong> ${(
          (feature.properties[PrecinctsFeatureProperties.white] / feature.properties[PrecinctsFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Black:</strong> ${(
          (feature.properties[PrecinctsFeatureProperties.black] / feature.properties[PrecinctsFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Hispanic:</strong> ${(
          (feature.properties[PrecinctsFeatureProperties.hispanic] / feature.properties[PrecinctsFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Asian:</strong> ${(
          (feature.properties[PrecinctsFeatureProperties.asian] / feature.properties[PrecinctsFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Pacific:</strong> ${(
          (feature.properties[PrecinctsFeatureProperties.pacific] / feature.properties[PrecinctsFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Indigenous:</strong> ${(
          (feature.properties[PrecinctsFeatureProperties.indigenous] / feature.properties[PrecinctsFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
        <p><strong>Other:</strong> ${(
          (feature.properties[PrecinctsFeatureProperties.other] / feature.properties[PrecinctsFeatureProperties.population]) *
          100
        ).toFixed(2)}%</p>
    </div>
    `;
    return popupContent;
};
