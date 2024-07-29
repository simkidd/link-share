export interface User {
  uid: string;
  photoUrl?: string;
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
  profilePhoto: string;
}
