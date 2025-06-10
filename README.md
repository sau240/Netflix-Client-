🎬 Netflix Clone
A full-stack Netflix-inspired web app featuring Firebase authentication, TMDB movie integration, responsive design, and a MongoDB-backed user movie storage system. Built using modern web technologies for both frontend and backend, this clone mimics the core functionalities of Netflix including browsing, saving, and managing movies.

View Live Project: Netflix Clone Live Demo

## Live Demo
Frontend: https://netflix-client-omega.vercel.app/login

🗂️ Project Structure
bash
Copy
Edit
/netflix-clone
├── netflix-ui/               # Frontend (React)
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js (or CRA setup)
│
├── netflix-api/              # Backend (Node.js + MongoDB)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── README.md
└── .gitignore
✨ Features
🔐 Firebase Authentication – Sign up and log in users securely.

🎞️ TMDB API Integration – Browse movies using data fetched from The Movie Database.

🗃️ Save/Delete Movies – Logged-in users can save or remove movies, persisted in MongoDB.

🔄 Redux Toolkit – Handles global state and movie management efficiently.

🧪 Postman Tested – All APIs are tested and verified using Postman.

💻 Fully Responsive – Clean UI/UX on desktop, tablet, and mobile.

🎨 React Icons – Beautiful UI icons for interactivity.

📺 Inspired by Netflix, Google, and YouTube – UI and UX are influenced by top platforms for a professional experience.

🛠️ Tech Stack
Frontend:

React.js (with Vite or CRA)

Firebase Auth

TMDB API

Redux Toolkit

Tailwind CSS / Custom CSS

React Icons

Backend:

Node.js

Express.js

MongoDB (via MongoDB Atlas)

Mongoose ODM

Testing & Deployment:

Postman for API Testing

Vercel (Frontend)

Render or other platforms (Backend)

📸 Screenshots



![Screenshot 2025-06-10 123905](https://github.com/user-attachments/assets/60774f9c-ce15-40cf-bf3b-5b4b4f14fda3)
![Screenshot 2025-06-10 123937](https://github.com/user-attachments/assets/7d096062-636b-461e-90dc-461034691725)
![Screenshot 2025-06-10 124008](https://github.com/user-attachments/assets/997b2439-550e-425b-9725-75a40fc1faec)
![Screenshot 2025-06-10 124021](https://github.com/user-attachments/assets/50356474-5c69-4746-be40-a3c13516057b)
![Screenshot 2025-06-10 124032](https://github.com/user-attachments/assets/8602b4f2-2cca-4f95-b78e-97eb3bac4b9c)
![Screenshot 2025-06-10 123917](https://github.com/user-attachments/assets/edf991b8-01ea-4e5c-bbdc-12de67c1416f)
![Screenshot 2025-06-10 124044](https://github.com/user-attachments/assets/8871096f-c989-4bca-8623-33b3208626d9)









🧪 API Routes (Tested in Postman)
bash
Copy
Edit
POST    /api/users/register     # Register new user
POST    /api/users/login        # Login user
GET     /api/movies             # Get all movies
POST    /api/movies/save        # Save a movie
DELETE  /api/movies/remove/:id  # Remove saved movie
🚀 Getting Started
Clone the repository:

bash
Copy
Edit
git clone https://github.com/sau240/Netflix-Client.git
Frontend Setup (netflix-ui):

bash
Copy
Edit
cd netflix-ui
npm install
npm run dev
Backend Setup (netflix-api):

bash
Copy
Edit
cd netflix-api
npm install
Create a .env file in netflix-api/ with:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_key_if_used_on_server
PORT=8000
bash
Copy
Edit
node index.js
📚 Acknowledgements
Firebase

TMDB API

React Icons

MongoDB Atlas

Inspired by Netflix, YouTube, and Google UI

📄 License
This project is licensed under the MIT License – you're free to use, modify, and distribute it for personal or commercial use with attribution.


