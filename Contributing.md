# Task Manager

Task Manager is a project designed to help users efficiently manage tasks and organize their workflow. It includes authentication, project categorization, and calendar integration.

The installation guide is available below, and contributions are welcome!

---

## Installation Guide

Follow these steps to set up and run the Task Manager project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) (Comes with Node.js)
- [Drizzle Kit](https://orm.drizzle.team/)
- [Resend](https://resend.com/) account for email support
- Google and GitHub OAuth credentials (if using social login)

### Steps to Install

1. **Clone the repository**

   ```sh
   git clone https://github.com/Prajwal-kp-18/Task-Manager.git
   cd task-manager
   ```

2. **Set up environment variables**
   Copy the sample environment file and update it with your credentials:

   ```sh
   cp .env.sample .env
   ```

   Fill in the necessary values, including OAuth credentials and Resend API keys.

3. **Install dependencies**

   ```sh
   npm install
   ```

4. **Set up the database**

   ```sh
   npx drizzle-kit push
   ```

   This will create and migrate your SQLite (or Turso) database.

5. **Run the application**
   ```sh
   npm run dev
   ```
   The project will now be available at [http://localhost:3000](http://localhost:3000).

---

## Contributing

We welcome contributions to improve Task Manager! Before submitting a pull request, please follow these guidelines:

### Fork the Repository

Click the **Fork** button at the top of the repository page to create your own copy.

### Create a Feature Branch

Clone the repository and create a new branch:

```sh
git checkout -b feature-name
```

### Make Your Changes

Ensure your changes align with the project's structure and follow best practices.

### Commit and Push

```sh
git add .
git commit -m "Add feature: description"
git push origin feature-name
```

### Submit a Pull Request

Open a pull request (PR) to the **main** branch with a clear description of your changes.

### Contribution Guidelines

- Keep contributions focused on core functionality and authentication-related features.
- Ensure your code is well-documented and follows project conventions.
- Suggested future improvements: MFA, sign-out from all devices, etc.

Thank you for contributing to Task Manager! 🚀
