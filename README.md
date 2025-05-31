<h1 align="center">
  <a href="https://puter.com/app/api-tester" target="_blank">API Tester</a>
</h1>

<p align="center">A simple web-based API testing tool that allows you to test HTTP APIs, similar to Postman or Insomnia.
</p>

<p align="center">
  <img src="screenshot.png" alt="Screenshot" width="600" />
</p>

## Features

- **Multiple HTTP Methods**: Support for GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS requests
- **Custom Headers**: Add and manage custom HTTP headers for your requests
- **Request Body Support**: Send JSON, text, or other data in request bodies
- **Response Visualization**: View formatted JSON responses with syntax highlighting
- **Response Metrics**: See response status codes, status text, and response times
- **Modern UI**: Clean, responsive interface that works on all devices
- **No Installation Required**: Runs directly in your browser

## Getting Started

Clone the repository: 

```bash
git clone https://github.com/puter-apps/api-tester.git
```

and open the `/src/index.html` file in your browser.

## How It Works

1. Select your HTTP method (GET, POST, PUT, etc.)
2. Enter the API endpoint URL you want to test
3. Add custom headers if needed (Accept, Authorization, etc.)
4. For POST/PUT/PATCH requests, add your request body in JSON or text format
5. Click "Send Request" to execute the API call
6. View the formatted response with status code and response time

## Technical Details

This application uses:
- **Puter.js** for making cross-origin HTTP requests and bypassing CORS restrictions
- **Vanilla JavaScript** for the frontend logic and API interactions
- **Modern CSS** with responsive design principles and gradient styling
- **JSON Syntax Highlighting** for better response readability
- **Real-time Response Metrics** showing status codes and timing

## Puter.js Features Used

- **Networking**: Making HTTP requests to external APIs using `puter.net.fetch()`

## Example APIs to Test

- **HTTPBin**: https://httpbin.org/get (for testing GET requests)
- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/posts (for testing REST APIs)
- **Public APIs**: Any publicly accessible REST API endpoint

## License

MIT
