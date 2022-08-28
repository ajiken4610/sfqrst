import { doc, getDoc, onSnapshot, updateDoc } from "@firebase/firestore";
import type { Ref } from "vue";
import type { UserData } from "./UserData";
import type { StampData } from "./useStamps";

const db = useDB();

const userDatas: { [key: string]: Ref<UserData> } = {};

export const useUserData = () => {
  if (userDatas[useUserId().value]) {
    return (async () => userDatas[useUserId().value])();
  } else {
    const ret = ref<UserData>();
    return new Promise<Ref<UserData>>((resolve) => {
      onSnapshot(doc(db, "user", useUserId().value), (snapshot) => {
        ret.value = {
          ...{
            owner: "Invalid",
            name: "Unknown",
            type: "Invalid",
            stamps: {},
          },
          ...snapshot.data(),
        } as UserData;
        userDatas[useUserId().value] = ret;
        resolve(ret);
      });
    });
  }
};

export const saveUserData = (data: Partial<UserData>) =>
  updateDoc(doc(db, "user", useUserId().value), data);

export const getStampData = async (id: string) => {
  return (await getDoc(doc(db, "stamp", id))).data() as StampData;
};
