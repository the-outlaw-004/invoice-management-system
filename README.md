# Invoice Management System (React Application)

This project is the React frontend for the Invoice Management System, built using Vite for optimal performance and development experience. It communicates with the Node.js backend service to manage invoices, products, and related data.

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- A terminal or command-line interface

### Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd invoice-management-react
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   
   Create a `.env` file in the root directory and add the following configuration:

   ```env
   VITE_APP_API_URL=http://localhost:3001/api/
   ```

   Replace the `VITE_APP_API_URL` value with the URL of your backend service if it's different.

4. **Run the Application:**

   ```bash
   npm run dev
   ```

   The application will start at `http://localhost:5173` by default.

---

## Scripts

### Development Server
Run the development server with live-reloading:

```bash
npm run dev
```