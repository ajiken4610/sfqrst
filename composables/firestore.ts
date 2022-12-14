import { doc, getDoc, onSnapshot, updateDoc } from "@firebase/firestore";
import type { Ref } from "vue";
import type { UserData } from "./UserData";
import type { StampData } from "./useStamps";

const db = useDB();
const describes: { [key: string]: () => void } = {};
const userDatas: { [key: string]: Ref<UserData> } = {};
watch(useUserId(), (_new, old) => {
  if (old && typeof describes[old] === "function") {
    describes[old]();
    delete userDatas[old];
  }
});
export const useUserData = (id?: string) => {
  const userId = id || useUserId().value;
  if (userDatas[userId]) {
    return (async () => userDatas[userId])();
  } else {
    const ret = ref<UserData>();
    return new Promise<Ref<UserData>>((resolve) => {
      describes[userId] = onSnapshot(doc(db, "user", userId), (snapshot) => {
        ret.value = {
          ...{
            owner: "Invalid",
            name: "",
            type: "Invalid",
            stamps: {},
          },
          ...snapshot.data(),
        } as UserData;
        userDatas[userId] = ret;
        resolve(ret);
      });
    });
  }
};

export const saveUserData = (data: Partial<UserData>, id?: string) =>
  updateDoc(doc(db, "user", id || useUserId().value), data);

export const getStampData = async (id: string) => {
  return (await getDoc(doc(db, "stamp", id))).data() as StampData;
};
