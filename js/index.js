const baseUrl = "https://homepricevaluation.azurewebsites.net/";
// https://localhost:44376/

Vue.createApp({
  data() {
    return {
      homes: [],
      id: 0,
      municipalityId: 0,
      squarePrice: "",
      price: 0,
      kvm: 0,
      errormessage: "",
      singleHome: null,
      avgSquarePrice: "",
      calculatedPrice: 0,
    };
  },

  methods: {
    async helperGetAndShow(url) {
      try {
        const url = baseUrl + "api/prices";
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
      const url = baseUrl + "api/prices" + "/" + id;
      this.errormessage = "No such id";
      try {
        response = await axios.get(url);
        this.singleHome = await response.data;
      } catch {
        alert(this.errormessage);
      }
    },

    async getAvgSquarePrice(municipalityId) {
      const url = baseUrl + "municipality/avgkvmprice" + "/" + municipalityId;
      this.errormessage = "No price data";
      try {
        response = await axios.get(url);
        this.avgSquarePrice = await response.data;
      } catch {
        alert(this.errormessage);
      }
    },

    async calculatePrice() {
      this.errormessage = "No price data";
      try {
        this.calculatedPrice = this.avgSquarePrice * this.kvm;
      } catch {
        alert(this.errormessage);
      }
    },
  },
}).mount("#app");
