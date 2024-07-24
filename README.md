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

3. **Set up Firebase:**

    - Create a file named `firebaseConfig.ts` with your Firebase configuration:

    ```typescript
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';

    const firebaseConfig = {
      apiKey: 'your-api-key',
      authDomain: 'your-auth-domain',
      projectId: 'your-project-id',
      storageBucket: 'your-storage-bucket',
      messagingSenderId: 'your-messaging-sender-id',
      appId: 'your-app-id',
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    export { db, auth };
    ```

4. **Run the development server:**

    ```bash
    yarn dev
    ```

5. Open your browser and go to [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License.
