# Products API

A RESTful API service for managing headphone products, built with Express.js, TypeScript, and Supabase.

## Features

- 🚀 Express.js with TypeScript
- 📦 Supabase for data storage
- 🔒 Environment-based configuration
- 🌐 CORS enabled
- 🔍 Type-safe request handling
- 📝 Detailed error responses
- 🏗️ Automatic database initialization

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=3001
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-service-role-key
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eric-nichols-nyc/products-api.git
   cd products-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Products

#### GET /api/products
Get all products, sorted by creation date.

Response:
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": number,
    "sku": "string",
    "stock_quantity": number,
    "category": "string",
    "created_at": "string",
    "updated_at": "string",
    "image_url": "string"
  }
]
```

#### GET /api/products/:id
Get a specific product by ID.

Response:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": number,
  "sku": "string",
  "stock_quantity": number,
  "category": "string",
  "created_at": "string",
  "updated_at": "string",
  "image_url": "string"
}
```

## Error Handling

The API returns detailed error responses:

```json
{
  "error": "Error message",
  "details": "Detailed error description",
  "code": "Error code"
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
products-api/
├── src/
│   ├── index.ts        # App entry point
│   └── routes/
│       └── products.ts # Product routes
├── .env.example        # Example environment variables
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## Deployment on Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Configure environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.