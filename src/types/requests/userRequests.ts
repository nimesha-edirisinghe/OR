export interface FetchUserRequest {
  id: number;
  includePosts?: boolean;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
  isActive?: boolean;
}
