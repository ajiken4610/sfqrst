export interface UserData {
  name: null | string;
  owner: string;
  type: string;
  age: null | number;
  stamps: { [key: string]: true };
  temp: null | number;
  used?: true;
  reuseable?: true;
}
