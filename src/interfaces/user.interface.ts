export interface User {
  uid: string;
  photoURL?: string;
  displayName: string | null;
  email: string | null;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateProfileInput {
  firstName: string;
  lastName: string;
  email: string;
  photoURL: string;
}
