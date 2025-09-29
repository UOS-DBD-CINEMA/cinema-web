# Cinema Web

A modern web application for browsing movies, built with React, Tailwind CSS, and other modern technologies.

## Live Demo

You can view the live application here: [https://cinema-web-puce.vercel.app/](https://cinema-web-puce.vercel.app/)

## Features

*   Browse popular, top-rated, and upcoming movies.
*   Search for movies by title.
*   View movie details, including synopsis, cast, and reviews.
*   Filter movies by genre.
*   Responsive design for a seamless experience on all devices.

## Tech Stack

*   **Library:** [React](https://reactjs.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
*   **Routing:** [React Router](https://reactrouter.com/)
*   **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
*   **Form Handling:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Linting/Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or higher) and [Yarn](https://yarnpkg.com/) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/cinema-web.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd cinema-web
    ```
3.  Install the dependencies:
    ```bash
    yarn install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run:

*   `yarn dev`: Runs the app in development mode.
*   `yarn build`: Builds the app for production.
*   `yarn lint`: Lints the code using ESLint.
*   `yarn preview`: Serves the production build locally.
*   `yarn format`: Formats the code with Prettier.

## Project Structure

The project structure is organized as follows:

```
src
├── api/         # API-related logic, including Axios instances and data fetching functions.
├── assets/      # Static assets like images and fonts.
├── components/  # Reusable UI components.
├── constants/   # Constant values used throughout the application.
├── hooks/       # Custom React hooks.
├── lib/         # Utility functions and library configurations.
├── routes/      # Application routes and page components.
├── store/       # Zustand store for state management.
├── global.css   # Global styles.
├── main.tsx     # Main application entry point.
└── vite-env.d.ts # Vite environment type definitions.
```