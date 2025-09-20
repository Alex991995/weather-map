export interface IUserBody {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  is_admin: boolean;
}

export type IUserCreateResult = Omit<IUserBody, 'password'> & { id: string };

// export interface IUserCreateResult {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   is_admin: boolean;
// }
