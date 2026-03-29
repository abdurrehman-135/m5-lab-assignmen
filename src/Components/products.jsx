import cologneImage from "../../products/cologne.jpg";
import iwatchImage from "../../products/iwatch.jpg";
import mugImage from "../../products/mug.jpg";
import walletImage from "../../products/wallet.jpg";

const PRODUCTS = [
  {
    id: 1,
    name: "Unisex Cologne",
    desc: "Fresh citrus and amber notes for day or night.",
    price: 35,
    ratings: "4.6",
    image: cologneImage,
  },
  {
    id: 2,
    name: "Apple iWatch",
    desc: "Track workouts, calls, and health metrics on the go.",
    price: 199,
    ratings: "4.8",
    image: iwatchImage,
  },
  {
    id: 3,
    name: "Unique Mug",
    desc: "A hand-glazed mug with a comfortable grip.",
    price: 15,
    ratings: "4.4",
    image: mugImage,
  },
  {
    id: 4,
    name: "Mens Wallet",
    desc: "Slim leather wallet with plenty of card storage.",
    price: 48,
    ratings: "4.5",
    image: walletImage,
  },
];

export default PRODUCTS;
