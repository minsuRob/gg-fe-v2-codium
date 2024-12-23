export interface TodayLetterProps {
  hotelId: number,
  date: string
}
export interface TodayLetters {
  id: number,
  createdAt: string,
  senderNickname: string,
  content: string,
  isBlocked: boolean,
  imageUrl: string,
  feekStatus: string,
  feekComment: null | string
}

export interface NewHotel {
  structColor: string;
  bodyColor: string;
  nickname: string;
  description: string;
  buildingDecorator: string;
  gardenDecorator: string;
  windowDecorator: string;
  background: string;
  gender: string;
  birthDate: string;
  code: string;
}


export interface NewLetter {
  content: string; // requird
  senderNickname: string; // requird
  image: string;
  hotelId: string;
}
// export interface User {
//   nickname: string;
//   code: string;
//   membership: string;
//   gender: "MAN | WOMAN | null";
//   birthDate: "1998-06-13 | null";
//   keyCount: number;
//   feekCount: number;
// }


export interface Auth {
  email: string;
  sub: string; // Subject, uid
}

export interface KakaoAuth {
  name: string;
  ci: string;
  id: string;
}


export interface My {
  success: string;
  user: User;
  hotel: NewHotel;
}

export interface User {
  nickname: string;
  code: string;
  membership: string;
  gender: "MAN" | "WOMAN" | null;
  birthDate: string | null;
  keyCount: number;
  feekCount: number;
  email?: string;
}


export interface Hotel {
  id: number;
  nickname: string;
  description: string;
  structColor: string;
  bodyColot: string; // 오타 수정: bodyColor로 변경
}
export interface UserApiResponse {
  success: boolean;
  user: User;
  hotel: Hotel;
}
export interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  letterId: number;
  letterType: boolean;
  replyId: number;
}
export interface BottomSheetDeleteProps {
  isVisible: boolean;
  onClose: () => void;
  letterId: number;
  blocked: boolean;
  replyId: number;
}
export interface LetterArrayProps {
  content: string;
  createdAt: string;
  feekComment: any;
  feekStatus: any;
  id: number;
  imageUrl: any;
  isBlocked: boolean;
  senderNickname: string;
}
export interface ReplyArrayProps {
  content: string;
  createdAt: string;
  letterId: number;
  id: number;
  imageUrl: any;
  isBlocked: boolean;
  senderNickname: string;
}
export interface NewReply {
  content: string; // requird
  image: string;
  letterId: string;
}