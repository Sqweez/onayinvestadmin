export interface Project {
  key: string;
  name: string;
  description: string;
  uid: string;
  author: {
    firstname: string;
    lastname: string;
    region: string;
    email: any;
  };
  imageUrl: any;
  videoUrl: any;
  stage: string;
  freelance: string;
  money: string;
  isAccepted: number;
}
