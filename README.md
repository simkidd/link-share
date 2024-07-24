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

## Add to .env

NEXT_PUBLIC_API_KEY="AIzaSyBvFQ21dIQew9nb1NkfH6VWUiP38ISLmIE"
NEXT_PUBLIC_AUTH_DOMAIN="link-sharing-4b58b.firebaseapp.com"
NEXT_PUBLIC_PROJECT_ID="link-sharing-4b58b"
NEXT_PUBLIC_STORAGE_BUCKET="link-sharing-4b58b.appspot.com"
NEXT_PUBLIC_MESSAGING_SENDER_ID="879456940913"
NEXT_PUBLIC_APP_ID="1:879456940913:web:b85b16a9fb77c885f4bcd0"
NEXT_PUBLIC_MEASUERMENT_ID="G-3J1MV58Y2M"