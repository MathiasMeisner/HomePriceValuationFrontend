const baseUrl = "https://homevaluation.azurewebsites.net/";
// https://localhost:44376/

Vue.createApp({
  data() {
    return {
      homes: [],
      id: 0,
      municipalityId: 0,
      squarePrice: "",
      price: 0,
      sqm: "",
      constructionYear: "",
      energyLabel: "",
      errormessage: "",
      singleHome: null,
      avgSquarePrice: "",
      calculatedPrice: 0,
    };
  },

  methods: {
    async helperGetAndShow(url) {
      try {
        const url = baseUrl + "api/homes";
        const response = await axios.get(url);
        this.homes = await response.data;
      } catch (ex) {
        alert(ex.message);
      }
    },

    getAllHomes() {
      this.helperGetAndShow(baseUrl);
    },

    async getById(id) {
      const url = baseUrl + "api/homes" + "/" + id;
      this.errormessage = "No such id";
      try {
        response = await axios.get(url);
        this.singleHome = await response.data;
      } catch {
        alert(this.errormessage);
      }
    },

    async getAvgSquarePrice(municipalityId) {
      const url = baseUrl + "api/homes/avgsqm" + "/" + municipalityId;
      this.errormessage = "No price data";
      try {
        response = await axios.get(url);
        const avgPrice = await response.data;
        const formattedAvgPrice = avgPrice.toLocaleString("da-DK");
        this.avgSquarePrice = formattedAvgPrice;
      } catch {
        alert(this.errormessage);
      }
    },

    async calculatePrice() {
      try {
        const url = `${baseUrl}/api/homes/singlehome?municipalityId=${this.municipalityId}&squareMeters=${this.sqm}&constructionYear=${this.constructionYear}&energyLabel=${this.energyLabel}`;

        const response = await axios.get(url);

        if (response.status === 200) {
          const data = response.data;
          const formattedPrice = data.toLocaleString("da-DK");
          this.calculatedPrice = formattedPrice;
        } else {
          this.errorMessage = "Error calculating price.";
          alert(this.errorMessage);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        this.errorMessage = "An error occurred while calculating price.";
        alert(this.errorMessage);
      }
    },
  },
}).mount("#app");
