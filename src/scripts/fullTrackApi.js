import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const apiKey = process.env.FULLTRACK_API_KEY;
const secretKey = process.env.FULLTRACK_SECRET_KEY;

export async function getAllVehiclePosition() {
    try {
        const response = await axios.get(
          "https://ws.fulltrack2.com/events/all",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              apiKey,
              secretKey,
            },
          }
        );
        if (response.status === 200) {
          return response.data.data;
        } else {
          console.log(response);
        }
      } catch (error) {
        throw new Error("Erro ao obter dados do fulltrack " + error);
      }
}

export async function getLastVehiclePosition(id) {
  try {
    const response = await axios.get(
      "https://ws.fulltrack2.com/events/single/id/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          apiKey,
          secretKey,
        },
      }
    );
    if (response.status === 200) {
      return response.data.data[0];
    } else {
      console.log(response);
    }
  } catch (error) {
    throw new Error("Erro ao obter dados do fulltrack " + error);
  }
}
