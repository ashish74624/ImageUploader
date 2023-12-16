# ImageDrop

ImageDrop is a web application built using React, Express.js, and MongoDB that allows users to create accounts, upload, and organize multiple images into different folders. These stored images can be accessed through specific URLs for integration into various projects. The project also utilizes the React-Vite framework and Tailwind CSS for a fast and responsive user interface.

## Demo

Check out the live demo: [ImageDrop Demo](https://imagedrop.vercel.app)

## Features

- User authentication system for account creation and management
- Image uploading and storage with folder organization
- Access images through specific URLs: `image-get.vercel.app/<email>/<folder>/<imageName>`
- Integration with dynamic background images based on current weather conditions (see Weather App)

## Tech Stack

- Frontend: React, React-Vite, Tailwind CSS
- Backend: Express.js
- Database: MongoDB
- Deployment: Vercel

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

    
   git clone https://github.com/your-username/imagedrop.git
   cd imagedrop
     

2. Install dependencies for the frontend and backend:

    
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
     

3. Set up environment variables:

   Create a `.env` file in the `server` directory and add the following:

     
   PORT=3001
   MONGODB_URI=your_mongodb_uri
     

4. Start the application:

    
   # Start the frontend
   cd ../client
   npm run dev

   # Start the backend
   cd ../server
   npm start
     

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Usage

- Create an account on the website
- Upload images and organize them into different folders
- Access images through specific URLs for integration into projects

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
