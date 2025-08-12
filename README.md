# 🚀 DigitAI – Frontend

DigitAI is a web-based AI solution for handwritten digit recognition, built with **Next.js** and **Tailwind CSS**.  
It connects to a Flask backend (link will be added after deployment) that runs trained **MLP** and **VGG16** models for digit prediction.

---

## 📌 Overview

DigitAI provides an intuitive interface where users can:
- Draw digits directly on an interactive canvas.
- Upload images of handwritten numbers.
- Get instant AI-powered predictions.

The project is designed for quick digit recognition with a clean, user-friendly UI.

---

## ✨ Features

- 🎨 **Modern UI** – Styled with Tailwind CSS for a responsive, mobile-friendly experience.
- 🖌 **Interactive Drawing Canvas** – Users can draw digits for instant recognition.
- 📂 **Image Upload Support** – Recognize handwritten digits from uploaded images.
- ⚡ **Real-time Predictions** – Fast API response from backend AI models.
- 🔒 **Secure & Scalable** – Ready for deployment with HTTPS and secure API calls.

---

## 🧠 Models Used (Backend)

- **MLP (Multi-Layer Perceptron)** – High accuracy with low computational cost.
- **VGG16** – Deep learning CNN model for image recognition.

> ⚠ The backend code is not in this repository.  
> After deployment, the backend link will be added here:  
> **Backend API URL:** _Coming Soon_

---

## 📂 Project Structure

```plaintext
frontend/              # Next.js + Tailwind CSS app
├── components/        # Reusable UI components
├── pages/             # Next.js pages
├── public/            # Static assets (images, icons)
├── styles/            # Tailwind and global CSS
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
