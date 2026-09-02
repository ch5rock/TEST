export type Inspiration = {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  summary: string;
  body: string;
  contentType: string;
  licenseType: string;
  price: number;
  tags: string[];
  parentId: string | null;
  mediaName: string | null;
  mediaType: string | null;
  createdAt: string;
  saveCount?: number;
};

export type Project = {
  id: string;
  inspirationId: string;
  inspirationTitle?: string;
  ownerId: string;
  ownerName: string;
  title: string;
  description: string;
  rolesNeeded: string[];
  status: string;
  outputUrl: string | null;
  createdAt: string;
  memberCount?: number;
};

export type CurrentUser = {
  id: string;
  email: string | null;
  name: string;
};
