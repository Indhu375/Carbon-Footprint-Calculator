# 🌱 Carbon Footprint Calculator

A web-based **Carbon Footprint Calculator** that helps users estimate their personal CO₂ emissions based on daily activities such as transportation, energy usage, food habits, and lifestyle choices. The application uses **Firebase Authentication** and **Cloud Firestore** to securely store user-specific data.

---

## 📌 Problem Statement

Climate change is a growing global concern, and individuals often lack awareness of how their daily activities contribute to carbon emissions. This project aims to provide an easy-to-use platform that allows users to calculate and understand their carbon footprint, encouraging more sustainable lifestyle choices.

---

## ✨ Features

* 🔐 User Authentication (Login & Register using Firebase)
* 👤 User-specific carbon footprint calculation
* ☁️ Cloud Firestore for secure data storage
* 🧮 Emission calculation based on predefined factors
* 📊 Category-wise calculation:

  * Transportation
  * Electricity & Energy usage
  * Food consumption
  * Lifestyle habits
* 🖥️ Simple and responsive UI

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend (BaaS):** Firebase

  * Firebase Authentication
  * Cloud Firestore
* **Version Control:** Git & GitHub

---

## 📂 Project Structure

```
Carbon-Footprint-Calculator/
│
├── index.html        # Main calculator page
├── login.html        # User login page
├── register.html     # User registration page
├── auth.js           # Authentication logic
├── firebase.js       # Firebase configuration
├── script.js         # Carbon calculation logic
├── styles.css        # Styling
├── README.md         # Project documentation
```

---

## ⚙️ How It Works

1. User registers or logs in using Firebase Authentication.
2. The user enters activity details (transport, energy, food, lifestyle).
3. Carbon emissions are calculated on the client side using emission factors.
4. Results are stored in Cloud Firestore under the authenticated user ID.
5. Users can view their personalized carbon footprint.

---

## 🚀 How to Run the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Indhu375/Carbon-Footprint-Calculator.git
   ```

2. Open the project folder:

   ```bash
   cd Carbon-Footprint-Calculator
   ```

3. Open `index.html` in your browser

⚠️ Ensure you have an active internet connection for Firebase services.

---

## 🔐 Firebase Security

User data is protected using Firebase Authentication and Firestore security rules, ensuring that users can only access their own data.

---

## 📈 Future Enhancements

* 📊 Visual charts for emission comparison
* 📅 Monthly and yearly carbon footprint tracking
* 📄 Downloadable PDF report
* 🌍 Country-wise emission factors

---

## 👩‍💻 Author

**Indhu Sri S**
GitHub: [Indhu375](https://github.com/Indhu375)

---

## ⭐ Acknowledgements

* Firebase Documentation
* Environmental emission factor references

---

⭐ If you find this project useful, feel free to star the repository!
