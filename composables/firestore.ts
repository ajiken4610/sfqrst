import { doc, onSnapshot } from "@firebase/firestore";
import type { Ref } from "vue";
import type { UserData } from "./UserData";

const db = useDB();

export const useUserData = () => {
  const ret = ref<UserData>();
  return new Promise<Ref<UserData>>((resolve) => {
    onSnapshot(doc(db, "user", useUserId()), (snapshot) => {
      ret.value = (snapshot.data() || {
        owner: "Invalid",
        type: "Invalid",
        stamps: {},
      }) as UserData;
      resolve(ret);
    });
  });
};
