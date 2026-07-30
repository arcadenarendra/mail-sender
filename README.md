# Mail Sender API

REST API for a portfolio contact form built with Node.js, Express, Nodemailer, Gmail SMTP, dotenv, and cors.

## Installation

```bash
npm install
```

## Running Locally

```bash
npm run dev
```

or

```bash
npm start
```

The server listens on `process.env.PORT`.

On Railway, `PORT` is injected automatically and must not be hardcoded in the deployment.

## Environment Variables

Create a `.env` file in the project root:

```env
MAIL=yourgmail@gmail.com
PASS=your_google_app_password
CORS_ORIGIN=https://your-portfolio-domain.com
```

`MAIL` is the Gmail inbox that receives the portfolio messages.

`PASS` is the Gmail App Password, not your regular Gmail password.

`CORS_ORIGIN` is the exact browser origin allowed to call the API. Use a comma-separated list if you need multiple origins.

## Gmail App Password

Google requires an App Password for SMTP access when 2-Step Verification is enabled.

1. Open https://myaccount.google.com/
2. Go to `Security`
3. Enable `2-Step Verification` if needed
4. Open https://myaccount.google.com/apppasswords
5. Create an App Password for `Mail`
6. Put the generated password in `PASS`

## CORS

Allowed browser origins are controlled by `CORS_ORIGIN` in `.env` and Railway. Use a comma-separated list if you need more than one origin.

The CORS policy is enforced in [`app.js`](app.js).

## API Endpoint

### `POST /send`

Request body:

```json
{
  "name": "Narendra Prajapati",
  "from": "narendra@gmail.com",
  "message": "Hello, I want to work with you."
}
```

If any field is missing or blank, the API returns `400`:

```json
{
  "success": false,
  "message": "All fields are required."
}
```

If the email is sent successfully, the API returns `200`:

```json
{
  "success": true,
  "message": "Message sent successfully."
}
```

If sending fails, the API returns `500`:

```json
{
  "success": false,
  "message": "Failed to send email."
}
```

If the JSON body is malformed, the API also returns JSON:

```json
{
  "success": false,
  "message": "Invalid JSON payload."
}
```

The route also validates email format and basic field length limits before attempting SMTP delivery.

### `GET /health`

Returns:

```json
{
  "status": "ok"
}
```

### `GET /`

Returns a success JSON response confirming the API is live.

## Example Request

```javascript
fetch("https://your-backend-url/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    from,
    message
  })
});
```

## Example Response

```json
{
  "success": true,
  "message": "Message sent successfully."
}
```

## Railway Deployment

1. Push the repository to GitHub.
2. Create a new Railway service from the repo.
3. Set `MAIL`, `PASS`, and `CORS_ORIGIN` in Railway.
4. Deploy without code changes.

## Render Deployment

1. Create a new Render Web Service from the repository.
2. Set `MAIL` and `PASS` in the environment variables.
3. Use the existing start command.
4. Deploy without code changes.

## Email Format

The received email uses this structure:

```text
New Portfolio Contact

Name:
{{name}}

Email:
{{from}}

Message:

{{message}}
```

The sender's email is used as `Reply-To`.

## Project Structure

- `config/` for the Nodemailer transporter
- `controllers/` for the HTTP response logic
- `middleware/` for request validation
- `routes/` for endpoint wiring
- `services/` for the mail-sending logic