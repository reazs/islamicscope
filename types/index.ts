export type IAyah = {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: false;
};
export type IAyahs = IAyah[];

export interface ISurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: IAyahs;
}

export type ISurahs = ISurah[];

export type IUser = {
  _id: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};
export type INewUser = {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
  password: string;
};

export type ICreateThread = {
  email: string;
  title: string;
  content: string;
};

export type IThread = {
  _id: string;
  user: IUser;
  title: string;
  content: string;
  createdAt: string;
  likes?: IUser[];
  comments?: [];
};
