# ConnectSphere: Open-Source Video Conferencing

ConnectSphere is a free and open-source video conferencing application that allows users to connect in real-time for video calls, audio calls, and screen sharing. Built with modern web technologies, it provides a simple and secure way to communicate without requiring any authentication or user accounts.

## ✨ Features

- **Real-Time Video & Audio:** High-quality, low-latency video and audio powered by WebRTC.
- **Screen Sharing:** Share your entire screen with other participants in the room.
- **No Authentication:** Join rooms instantly with a unique room ID. No sign-ups required.
- **Modern UI:** A clean, responsive, and intuitive user interface built with Chakra UI.
- **Secure Peer-to-Peer Connections:** Direct P2P connections for media streams ensure privacy and reduce server load.

## 💻 Tech Stack

- **Frontend:** React, TypeScript, Chakra UI, Socket.IO Client
- **Backend:** Node.js, Express, Socket.IO
- **Real-Time Communication:** WebRTC (via `simple-peer`)

## 🚀 How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Adong-o/connect.git
   cd connect
   ```

2. **Set up the Backend Server:**
   - Navigate to the server directory:
     ```sh
     cd server
     ```
   - Install the dependencies:
     ```sh
     npm install
     ```
   - Start the server:
     ```sh
     npm start
     ```
   - The server will be running on `http://localhost:8080`.

3. **Set up the Frontend Client:**
   - Open a new terminal and navigate to the client directory from the root folder:
     ```sh
     cd client
     ```
   - Install the dependencies:
     ```sh
     npm install
     ```
   - Start the client:
     ```sh
     npm start
     ```
   - The application will open automatically in your browser at `http://localhost:3000`.

## 🤝 How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request