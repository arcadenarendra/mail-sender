# 📧 Mail Sender

A simple and secure contact form backend built with **Node.js**, **Express.js**, **EJS**, and **Nodemailer**. It allows users to send messages directly from a website to your Gmail inbox using Gmail SMTP and Google App Password authentication.

Perfect for portfolio websites, personal websites, landing pages, and business contact forms.

---

## 🚀 Features

- 📩 Contact form with email support
- 🔐 Secure Gmail authentication using App Password
- ⚡ Fast Express.js backend
- 🎨 EJS template engine
- 📁 Clean project structure
- 🌍 Ready for deployment
- 🔒 Environment variable support using `.env`

---

# 📂 Project Structure

```
mail-sender/
│
├── config/
│   └── mailConfig.js
│
├── controllers/
│   └── mailController.js
│
├── routes/
│   └── mailRoutes.js
│
├── services/
│   └── sendMail.js
│
├── views/
│   ├── mail.ejs
│   └── success.ejs
│
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- Nodemailer
- EJS
- Dotenv

---

# 📥 Clone Repository

```bash
git clone https://github.com/arcadenarendra/mail-sender.git
```

Move into the project.

```bash
cd mail-sender
```

---

# 📦 Install Dependencies

Install all dependencies.

```bash
npm install
```

or manually

```bash
npm install express ejs dotenv nodemailer
```

Install Nodemon for development.

```bash
npm install -D nodemon
```

---

# ▶️ Run the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

The application will start on

```
http://localhost:3000
```

or

```
http://localhost:3000/mail
```

depending on your configured routes.

---

# 🔐 Environment Variables

Create a file named

```
.env
```

inside the root directory.

Example

```env
MAIL=yourgmail@gmail.com
PASS=your_google_app_password
```

Example

```env
MAIL=johndoe@gmail.com
PASS=abcd efgh ijkl mnop
```

Never commit this file to GitHub.

---

# 🔒 Create a Gmail App Password

Google no longer allows applications like Nodemailer to authenticate using your normal Gmail password.

Instead, generate an App Password.

---

## Step 1

Open

https://myaccount.google.com/

---

## Step 2

Go to

```
Security
```

---

## Step 3

Enable

```
2-Step Verification
```

If it is already enabled, continue.

---

## Step 4

Open

https://myaccount.google.com/apppasswords

or search

```
App Passwords
```

inside your Google Account.

---

## Step 5

Select

```
App

Mail
```

Device

```
Other (Custom Name)
```

Example

```
Mail Sender
```

Click

```
Generate
```

---

## Step 6

Google will generate a password similar to

```
abcd efgh ijkl mnop
```

Copy it.

This is **NOT** your Gmail password.

Use it inside

```
.env
```

Example

```env
MAIL=yourgmail@gmail.com
PASS=abcd efgh ijkl mnop
```

---

# 📤 How Email Sending Works

```
User fills the contact form
            │
            ▼
Express Route (/send)
            │
            ▼
Nodemailer
            │
            ▼
Gmail SMTP
            │
            ▼
Your Inbox
```

---

# 🧪 API Testing

## Endpoint

```
POST /send
```

### Example Request

```json
{
    "from": "john.doe@gmail.com",
    "subject": "Portfolio Inquiry",
    "message": "Hello! This is a test email."
}
```

---

# 🌐 Deploying

This project can be deployed on

- Vercel
- Railway
- Render

Before deploying, add the following Environment Variables inside your hosting platform.

```
MAIL=yourgmail@gmail.com
PASS=your_google_app_password
```


---

# 📄 Scripts

Run in development mode

```bash
npm run dev
```

Run in production

```bash
npm start
```

Install packages

```bash
npm install
```

---

# 🤝 Integrating with Your Portfolio

Once deployed, your frontend can send requests directly to your backend.

Example

```javascript
fetch("https://your-backend-url.vercel.app/send", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        from,
        subject,
        message
    })
});
```

The request flow is:

```
Portfolio Website
        │
        ▼
Mail Sender Backend
        │
        ▼
Gmail SMTP
        │
        ▼
Your Inbox
```

# 👨‍💻 Author

**Narendra Prajapati**

GitHub:
https://github.com/arcadenarendra

Repository:
https://github.com/arcadenarendra/mail-sender
