<img width="1920" height="947" alt="Screenshot (19)" src="https://github.com/user-attachments/assets/70f7fd67-075c-4cbf-887a-d9efc8ca9391" />


# 💬 TalkIO — Real-Time Chat Application


<p align="center">
  A modern, production-style full-stack real-time chat application built with React, Node.js, Express, MongoDB and Socket.io.
</p>

<p align="center">
  <a href="#-highlights">Highlights</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-environment-variables">Environment Variables</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## ✨ Highlights

- 💬 **Full-stack real-time chat application** built from scratch
- ⚛️ **React frontend** with Tailwind CSS and Hero UI
- 🚀 **Node.js + Express.js backend**
- 🔐 **Clerk authentication** with webhook support
- 🗄️ **MongoDB Atlas** database integration
- ⚡ **Socket.io real-time messaging**
- 🟢 **Online user presence tracking**
- 🖼️ **Image and video sharing**
- 🎨 **Light and dark mode**
- 🖌️ **13 custom wallpapers**
- 🌈 **11 beautiful themes**
- ⌨️ **Optional keyboard sound effects**
- 🔌 **Build-your-own WebSocket server**
- 🚫 **No Firebase or Supabase required**
- 📤 **Media uploads and optimization with ImageKit**
- 🔔 **Webhooks explained and implemented**
- ⏰ **Cron jobs from scratch**
- 🛡️ **Express middleware deep dive**
- 📁 **File upload and media handling**
- 🌐 **Live deployment workflow**
- 🆓 **Free-to-start development setup**
- 📂 **Complete source-code structure**
- 🎯 **Resume-ready, production-style project**

---

## 🖥️ UI Preview

The repository includes a polished demo visual with anonymized sample users and generic demo avatars so screenshots can be shared publicly without exposing personal profile information.

---

## 🧩 Core Features

### 💬 Real-Time Messaging
Send and receive messages instantly using Socket.io without refreshing the page.

### 🟢 Online Presence
Track which users are online and show their current presence in the conversation list.

### 🖼️ Media Sharing
Share images and videos with optimized media delivery through ImageKit.

### 🎨 Themes & Wallpapers
Switch between light/dark mode, multiple visual themes, and custom wallpapers to personalize the chat experience.

### 🔐 Authentication
Clerk provides secure authentication while webhooks synchronize user events with the application backend.

### 📁 Uploads & Media Handling
Handle file uploads, media processing, optimization, and delivery without relying on Firebase or Supabase.

---

## 🏗️ Tech Stack

### Frontend

- React
- Tailwind CSS
- Hero UI
- Zustand
- Socket.io Client
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Socket.io
- Clerk
- ImageKit

### Deployment

- **Frontend:** Render
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🔐 Environment Variables

### Backend — `/backend/.env`

```env
PORT=<your_port>
NODE_ENV=<development_or_production>

MONGO_URI=<your_mongodb_connection_string>

CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>
CLERK_WEBHOOK_SIGNING_SECRET=<your_clerk_webhook_signing_secret>

IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>

FRONTEND_URL=<your_frontend_url>
```

### Frontend — `/frontend/.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
```

> ⚠️ Never commit real secrets, API keys, webhook signing secrets, or database credentials to GitHub. Use `.env` files locally and configure secrets through your deployment provider.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/TalkIo.git
cd TalkIo
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

Create the required `.env` files in the `backend` and `frontend` directories using the variables listed above.

### 5. Start the development servers

From the backend:

```bash
npm run dev
```

From the frontend:

```bash
npm run dev
```

Then open the local frontend URL shown by Vite.

---

## 🔄 How the Application Works

```text
React + Tailwind + Hero UI
          │
          ▼
     Socket.io Client
          │
          ▼
   Node.js + Express.js
       │         │
       │         ├── Clerk Authentication
       │         ├── ImageKit Media
       │         └── Webhooks / Cron Jobs
       │
       ▼
    MongoDB Atlas
```

---

## 🌐 Deployment

The project is designed to be deployed as a full-stack application:

| Layer | Platform |
|---|---|
| Frontend | Render |
| Backend | Render |
| Database | MongoDB Atlas |
| Media | ImageKit |
| Authentication | Clerk |

Before deploying, configure the production environment variables and make sure the frontend URL is correctly set in the backend.

---

## 📁 Suggested Project Structure

```text
talkio/
├── backend/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
│
├── assets/
│   ├── talkio-readme-poster.png
│   └── talkio-ui-preview.png
│
└── README.md
```

---

## 🧪 Production-Style Topics Covered

This project is more than a basic chat demo. It also covers practical backend and deployment concepts such as:

- WebSocket architecture
- Socket.io events and presence
- Express middleware
- Authentication and authorization flows
- Clerk webhooks
- Cron jobs
- File uploads
- Media optimization
- MongoDB integration
- Environment-variable management
- Production deployment
- Building a custom WebSocket server

---

## ⭐ Why This Project?

TalkIO is designed to demonstrate how a real-world chat platform can be built with a modern JavaScript stack without depending on Firebase or Supabase for the core application architecture.

It is a strong portfolio project for showcasing:

**Frontend engineering + Backend APIs + Real-time systems + Authentication + Databases + Media handling + Deployment**

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a pull request

---

## 📄 License

Add the license that matches your project and repository requirements.

---

## ❤️ Support

If you found TalkIO useful or learned something from the project, consider giving the repository a ⭐ on GitHub.

<p align="center">
  <b>Made with ❤️ by You — Happy Coding!</b>
</p>
