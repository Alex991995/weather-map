export interface IResponseIdsCityUser {
  favoriteCities: IFavoriteCities[];
  is_admin: boolean;
}
interface IFavoriteCities {
  id_city: number;
  userId: string;
}
