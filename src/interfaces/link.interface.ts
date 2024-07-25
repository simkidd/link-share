export interface Link {
  id: string;
  platform: string;
  url: string;
}

export interface CreateLinkInput {
  platform: string;
  url: string;
}

export interface UpdateLinkInput extends CreateLinkInput {
  id: string;
}
