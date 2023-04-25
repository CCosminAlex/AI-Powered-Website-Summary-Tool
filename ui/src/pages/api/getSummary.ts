import axios from "axios";

export async function GetSummary(url: string) {
  try {
    const response = await axios.post("http://127.0.0.1:5000/submit-url", {
      url,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
