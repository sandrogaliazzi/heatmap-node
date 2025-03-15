import path from "path";
import { fileURLToPath } from "url";
import parseKml from "parse-kml";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "/TOMODAT.kml");

function formatCoordinates(coordsArray) {
  const formatedCoordList = [];

  coordsArray.forEach(dot => {
    const [lng, lat] = dot;

    formatedCoordList.push({
      lat,
      lng,
    });
  });

  return formatedCoordList;
}

function parseKmlCableDataToJson(kmlData) {
  const kmlPoints = kmlData.features;

  const cables = kmlPoints.filter(
    point => point.geometry.type === "LineString"
  );

  return cables.map(cable => {
    return {
      name: cable.properties.name,
      color: cable.properties.stroke,
      coord: formatCoordinates(cable.geometry.coordinates),
    };
  });
}

export async function listCables() {
  try {
    const kmlData = await parseKml.toJson(filePath);

    const cables = parseKmlCableDataToJson(kmlData);

    return cables;
  } catch (error) {
    console.error("erro ao listar cabos " + error);
  }
}
