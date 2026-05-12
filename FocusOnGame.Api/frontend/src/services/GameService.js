const API_URL = "http://localhost:5265/api/games";

export const gameService = {

  async getGames(idPathway) {
    const res = await fetch(`${API_URL}?userId=${idPathway}`);
    return res.json();
  },

  async createGame(game) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game)
    });

    return res.json();
  },

  async updateGame(idGame, game) {
    const res = await fetch(`${API_URL}/${idGame}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game)
    });

    return res.json();
  },

  async deleteGame(idGAme) {
    await fetch(`${API_URL}/${idGAme}`, {
      method: "DELETE"
    });
  }
};