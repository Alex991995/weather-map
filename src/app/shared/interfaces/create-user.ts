export interface IUserBody {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  is_admin: boolean;
}

export type IUserCreateResult = Omit<IUserBody, 'password'> & { id: string };

export type IUserLoginCredential = Pick<IUserBody, 'email' | 'password'>;
