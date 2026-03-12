import cologneImage from "../../products/cologne.jpg";
import iwatchImage from "../../products/iwatch.jpg";
import mugImage from "../../products/mug.jpg";
import walletImage from "../../products/wallet.jpg";

const PRODUCTS = [
  {
    id: "cologne",
    name: "Unisex Cologne",
    desc: "Fresh citrus and amber notes for day or night.",
    ratings: "4.6",
    value: "$39.00",
    image: cologneImage,
  },
  {
    id: "iwatch",
    name: "Apple iWatch",
    desc: "Track workouts, calls, and health metrics on the go.",
    ratings: "4.8",
    value: "$199.00",
    image: iwatchImage,
  },
  {
    id: "mug",
    name: "Unique Mug",
    desc: "A hand-glazed mug with a comfortable grip.",
    ratings: "4.4",
    value: "$18.00",
    image: mugImage,
  },
  {
    id: "wallet",
    name: "Mens Wallet",
    desc: "Slim leather wallet with plenty of card storage.",
    ratings: "4.5",
    value: "$29.00",
    image: walletImage,
  },
];

export default PRODUCTS;
