export interface IRouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface INews {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
}

export interface ICity {
  _id: string;
  stateEn: string;
  cityEn: string;
  countyEn: string;
}

export interface INewsResponse {
  news: INews[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface IFriends {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  address: string;
  imageUrl: string;
  workDays: {
    _id: string;
    isOpen: boolean;
    from: string;
  };
  phone: string;
  email: string;
}

export interface INotices {
  _id: string;
  species: string;
  category: string;
  price: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  popularity: number;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface INoticesResponse {
  results: INotices[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface IUser {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  phone?: string | null;
  token?: string | null;
  avatar?: string | null;
  pets?: IPet[] | [];
  noticesFavorites?: INotices[];
  noticesViewed?: INotices[];
}

export interface IPet {
  _id?: string;
  title: string;
  name: string;
  imgURL: string;
  species: string;
  sex: string;
  birthday: string;
}

export interface IWorkDay {
  _id: string;
  isOpen: boolean;
  from: string;
  to: string;
}
