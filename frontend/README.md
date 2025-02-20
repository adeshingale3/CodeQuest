# Online Coding Platform

## Overview
This project is an **Online Coding Platform** where users can solve coding challenges, earn points, and get ranked on a leaderboard. Additionally, a **Telegram bot** is integrated.

### Tech Stack:
- **Frontend**: React (Vite)
- **Backend**: Django
- **Database**: MySQL
- **Telegram Bot**: Telegraf.js

---

## Project Structure
```
|-- frontend/        # Frontend React Application
|   |-- src/        # Source code
|   |-- Bot/        # Telegram Bot
|-- backend/        # Backend Django Application
|   |-- codequest/  # Django project
|   |-- venv/       # Virtual environment
```

---

## Installation & Setup

### Backend Setup
1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Move into the Django project directory:
   ```sh
   cd codequest
   ```
3. Activate the virtual environment:
   ```sh
   venv\Scripts\activate  # Windows
   ```
4. Start the Django server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm i
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Running the Telegram Bot
1. Navigate to the `bot` directory inside `frontend`:
   ```sh
   cd frontend
   cd bot
   ```
2. Start the bot:
   ```sh
   node bot.js
   ```

---

## Features
- Users can solve coding challenges.
- Points are awarded based on performance.
- Leaderboard ranks users based on points.
- Integrated Telegram bot.

---

## Database
- MySQL is used as the primary database.
- Make sure to configure database settings in the `backend` project.




