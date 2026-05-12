const API_URL = "http://localhost:5265/api/pathways";

export const pathwayService = {

  async getPathways(idUser) {
    const res = await fetch(`${API_URL}/${idUser}`);
    return res.json();
  },

  async createPathway(pathway) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pathway)
    });

    return res.json();
  },

  async updatePathway(idPathway, pathway) {
    const res = await fetch(`${API_URL}/${idPathway}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pathway)
    });

    return res.json();
  },

  async deletePathway(idPathway) {
    await fetch(`${API_URL}/${idPathway}`, {
      method: "DELETE"
    });
  }
};