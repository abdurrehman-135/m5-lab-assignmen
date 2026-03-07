# Shop to React

A React + Vite shopping UI assignment that matches the provided design, uses local product images, and updates a cart item count based on product quantities.

## Tech Stack

- React 18
- Vite 5
- Bootstrap 5

## Features

- Header with `Shop to React` title and live cart item count
- Four product rows:
- `Unisex Cologne`
- `Apple iWatch`
- `Unique Mug`
- `Mens Wallet`
- Quantity input for each product (minimum `0`)
- Cart total automatically recalculates as quantities change

## Project Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

- `src/App.jsx` main shopping page UI and quantity logic
- `src/main.jsx` React entry point and Bootstrap import
- `src/styles.css` custom styling overrides
- `products/` local images used by the product cards
