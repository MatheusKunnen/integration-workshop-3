import api from "./api";

const dev_snacks = [
  {
    id: 1,
    name: "Snickers",
    price: 199,
    stock: 3,
    image: {
      id: 1,
      url: "http://localhost:3000/image/snickers.png",
    },
  },
  {
    id: 40,
    name: "Snickers",
    price: 199,
    stock: 3,
    image: {
      id: 1,
      url: "http://localhost:3000/image/snickers.png",
    },
  },
  {
    id: 34,
    name: "Snickers",
    price: 199,
    stock: 3,
    image: {
      id: 1,
      url: "http://localhost:3000/image/snickers.png",
    },
  },
  {
    id: 41,
    name: "Torcida",
    price: 199,
    stock: 3,
    image: {
      id: 2,
      url: "http://localhost:3000/image/torcida.png",
    },
  },
  {
    id: 35,
    name: "Torcida",
    price: 199,
    stock: 3,
    image: {
      id: 2,
      url: "http://localhost:3000/image/torcida.png",
    },
  },
  {
    id: 2,
    name: "Torcida",
    price: 199,
    stock: 3,
    image: {
      id: 2,
      url: "http://localhost:3000/image/torcida.png",
    },
  },
  {
    id: 42,
    name: "Bis",
    price: 699,
    stock: 3,
    image: {
      id: 3,
      url: "http://localhost:3000/image/bis.png",
    },
  },
  {
    id: 36,
    name: "Bis",
    price: 699,
    stock: 3,
    image: {
      id: 3,
      url: "http://localhost:3000/image/bis.png",
    },
  },
  {
    id: 3,
    name: "Bis",
    price: 699,
    stock: 3,
    image: {
      id: 3,
      url: "http://localhost:3000/image/bis.png",
    },
  },
  {
    id: 43,
    name: "M&M",
    price: 499,
    stock: 3,
    image: {
      id: 4,
      url: "http://localhost:3000/image/m&m.png",
    },
  },
  {
    id: 37,
    name: "M&M",
    price: 499,
    stock: 3,
    image: {
      id: 4,
      url: "http://localhost:3000/image/m&m.png",
    },
  },
  {
    id: 4,
    name: "M&M",
    price: 499,
    stock: 3,
    image: {
      id: 4,
      url: "http://localhost:3000/image/m&m.png",
    },
  },
  {
    id: 44,
    name: "Trento",
    price: 349,
    stock: 3,
    image: {
      id: 5,
      url: "http://localhost:3000/image/trento.png",
    },
  },
  {
    id: 38,
    name: "Trento",
    price: 349,
    stock: 3,
    image: {
      id: 5,
      url: "http://localhost:3000/image/trento.png",
    },
  },
  {
    id: 5,
    name: "Trento",
    price: 349,
    stock: 3,
    image: {
      id: 5,
      url: "http://localhost:3000/image/trento.png",
    },
  },
  {
    id: 6,
    name: "Club Social",
    price: 599,
    stock: 2,
    image: {
      id: 6,
      url: "http://localhost:3000/image/club-social.png",
    },
  },
  {
    id: 45,
    name: "Club Social",
    price: 599,
    stock: 3,
    image: {
      id: 6,
      url: "http://localhost:3000/image/club-social.png",
    },
  },
  {
    id: 39,
    name: "Club Social",
    price: 599,
    stock: 3,
    image: {
      id: 6,
      url: "http://localhost:3000/image/club-social.png",
    },
  },
];

class OrderService {
  // Get snacks
  async getSnacks(tagNumber) {
    try {
      //const response = await api.get('/snacks')
      return dev_snacks;
    } catch (error) {
      console.log("Failed to get snacks.", error);
      return [];
    }
  }

  async purchaseSnack(snackId) {
    try {
      const response = await api.post(`/snacks/purchase/${snackId}`);
      return response.data;
    } catch (error) {
      console.log("Failed to purchase snack.", error);
      return {};
    }
  }
}

// Create an instance of OrderService
const newInstance = new OrderService();

// Export the instance as the default module export
export default newInstance;
