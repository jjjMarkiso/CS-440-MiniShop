# Product Service

This microservice manages product data for MiniShop.

## Responsibilities
- Store product data in its own database schema/table
- Create products via `POST /products`
- Read products via `GET /products`

## Setup
1. Copy `.env.example` to `.env` and update values as needed.
2. Install dependencies:
   - `npm install`
3. Initialize the database table:
   - `npm run init-db`
4. Start the service:
   - `npm run dev`

## API

### GET /products
Returns all products.

Response example:
```json
[
  {
    "id": 1,
    "name": "Apple",
    "price": "1.00",
    "description": "Fresh red apple",
    "created_at": "2026-04-21T22:00:00.000Z"
  }
]
```

### POST /products
Creates a new product.

Request body:
```json
{
  "name": "Apple",
  "price": 1.0,
  "description": "Fresh red apple"
}
```
