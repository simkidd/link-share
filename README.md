# Link Share

A full-stack link-sharing application built with Next.js, TypeScript, and Firebase.

## Features

- User Authentication (Sign Up, Sign In, Sign Out)
- Profile Management (Profile Picture, First Name, Last Name, Email)
- CRUD Operations for Links
- Link Previews
- Responsive Design
- Pixel-perfect implementation based on Figma design

## Tech Stack

- **Frontend:** Next.js, TypeScript
- **Backend:** Firebase (Firestore, Authentication)
- **State Management:** Zustand
- **Styling:** SCSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Firebase account

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/link-share.git
    cd link-share
    ```

2. **Install dependencies:**

    ```bash
    yarn
    ```

3. **Set up environment variables:**

    - Create a `.env.local` file in the root of your project with the following content:

    ```env
    NEXT_PUBLIC_API_KEY=your-api-key
    NEXT_PUBLIC_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_PROJECT_ID=your-project-id
    NEXT_PUBLIC_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_APP_ID=your-app-id
    NEXT_PUBLIC_MEASUREMENT_ID=your-measurement-id
    ```

    Replace the placeholders (`your-api-key`, `your-auth-domain`, etc.) with the actual values from your Firebase project settings.

4. **Set up Firebase configuration:**

    - Create a file named `config.ts` with the following content:

    ```typescript
    export const config = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    };
    ```

    - Create a file named `firebaseConfig.ts` with the following content:

    ```typescript
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
    import { config } from "./config";

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      // measurementId: config.measurementId,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    export { auth, db };
    ```

5. **Run the development server:**

    ```bash
    yarn dev
    ```

6. Open your browser and go to [http://localhost:3000](http://localhost:3000).


