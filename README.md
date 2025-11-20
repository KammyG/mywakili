

# ✅ **README.md for MyWakili**

````markdown
# 🏛️ MyWakili — Legal Services & Lawyer Booking Platform

MyWakili is a modern web application that connects users with verified lawyers, provides legal education, and enables seamless booking, consultation management, and access to legal documents and petitions.

This platform is designed to make legal help simple, fast, and accessible — similar to how health apps like MyDawa democratize access to health information.

---

## ✨ Features

### 👩‍⚖️ Lawyer Services
- Browse verified lawyers by category, specialization, and location  
- View lawyer profiles, experience, pricing, and availability  
- Lawyer dashboard to accept/decline bookings  
- Secure login for lawyers and clients  
- Update lawyer availability times  

### 📅 Booking & Scheduling
- Create a booking with your preferred lawyer  
- View booking status (Pending, Accepted, Declined, Cancelled, Completed)  
- Lawyer approval workflow  
- Cancel or reschedule appointments  
- Payment hooks (placeholder for MPesa, PayPal or Stripe integration)

### 📘 Legal Education
- Access articles, legal guides, and constitutional summaries  
- Know your rights  
- Learn how petitions, affidavits, wills, contracts, and legal procedures work  
- Search & filter legal topics

### 📄 Petitions Module  
- Create petitions or legal documents  
- Lawyer review workflow  
- Track petition status  

### 🔐 Authentication & Security  
- JWT-based authentication  
- Role-based access (Admin, Lawyer, User)  
- Password hashing  
- Secure API endpoints  

### 💻 Tech Stack  

#### **Backend (Django + DRF)**
- Django 5 / Django REST Framework  
- JWT Authentication (SimpleJWT)  
- PostgreSQL / SQLite  
- Custom user model  
- Modular apps:
  - **users**
  - **lawyers**
  - **bookings**
  - **education**
  - **petitions**

#### **Frontend (React + Vite)**
- React 18  
- Vite  
- TailwindCSS  
- Shadcn UI  
- Axios  
- React Router  
- Lucide Icons  

---

## 📂 Project Structure

```bash
mywakili/
│
├── mywakili-backend/
│   ├── core/
│   ├── users/
│   ├── lawyers/
│   ├── bookings/
│   ├── education/
│   ├── petitions/
│   ├── requirements.txt
│   └── manage.py
│
└── mywakili-frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.ts
````

---

## 🛠️ Setup Instructions

### **Backend Setup**

```bash
cd mywakili-backend
python3 -m venv venv
venv\Scripts\activate   # On Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

---

### **Frontend Setup**

```bash
cd mywakili-frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173/
```

---

## 🔑 Environment Variables

Create a `.env` file inside **backend**:

```
SECRET_KEY=your_django_secret
DEBUG=True
ALLOWED_HOSTS=*
DATABASE_URL=sqlite:///db.sqlite3
```

Create a `.env` file in **frontend**:

```
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## 🚧 Current Development Status

### Completed:

* User Login & Signup
* Lawyer Model & API
* Lawyer Categories
* JWT Auth
* Frontend UI for Lawyers
* Legal Education API (Part 1)

### In Progress:

* Booking API
* Petitions API
* Payment hooks
* Lawyer approval workflow
* Availability system

---

## 🧪 Testing

Run Django tests:

```bash
python manage.py test
```

---

## 🤝 Contribution

Pull requests are welcome! For major changes, open an issue first.

---

## 📜 License

MIT License.

---

## 🙋🏽‍♀️ Author

**Christiana Muriuki (MyWakili Founder)**
Backend Engineer | Web Developer | Tech Innovator


