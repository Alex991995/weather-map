export interface IUserBody {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  is_admin?: boolean;
}

export interface IUserCreateResult {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  is_admin: boolean;
}
