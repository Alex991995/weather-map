export interface IResponseIdsCityUser {
  favoriteCities: IFavoriteCities[];
  is_admin: boolean;
}
export interface IFavoriteCities {
  id_city: number;
  userId: string;
}
