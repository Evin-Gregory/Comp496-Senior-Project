import axios from "axios";
import AuthorizationHeader from "./authHeaderJwt";

class MoodService {
  async fetchAllMoods() {
    const res = await axios.get("/user-moods", AuthorizationHeader());
    const moods = res.data;
    return moods;
  }

  async fetchMood(date) {
    const res = await axios.get(`/user-mood/${date}`, AuthorizationHeader());
    const mood = res.data;
    return mood;
  }

  async setMood(mood) {
    const { date } = mood;
    const res = await axios.post(`/user-mood/${date}`, mood, AuthorizationHeader());
    return res.data;
  }

  async dayRecommendation(mood) {
    const res = await axios.post("/day-recommend", mood, AuthorizationHeader());
    return res.data;
  }

  async todayRecommendation() {
    const res = await axios.get("/today-recommend", AuthorizationHeader());
    return res.data;
  }

  async weekRecommendation() {
    const res = await axios.get("/week-recommend", AuthorizationHeader());
    return res.data;
  }

  async monthRecommendation() {
    const res = await axios.get("/month-recommend", AuthorizationHeader());
    return res.data;
  }
}

export default new MoodService();