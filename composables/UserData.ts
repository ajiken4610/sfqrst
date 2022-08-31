export interface UserData {
  name: null | string;
  owner: string;
  type: string;
  age: null | number;
  stamps: { [key: string]: true };
  temp: null | number;
  used?: Date;
  reuseable?: true;
  arriveSchedule?: "am17" | "pm17" | "am18" | "pm18";
  isArriveScheduleConstraint: boolean;
  giftReceived: boolean;
}
