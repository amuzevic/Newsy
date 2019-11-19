# Newsy instructions

  0. Since there is no frontend, to test the server use Postman or a similar tool
  1. Install all dependencies and run the server from a terminal
  2. Send a POST request to /api/auth with the following json:
        {
          "email": "admin@admin.com",
          "password":"123456789"
        }
  3. The server will reply with a json web token, for all future requests make sure to include it in the header with the key "x-auth-   token", and you'll be logged in with admin privileges
