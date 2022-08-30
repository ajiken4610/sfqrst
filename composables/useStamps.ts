export interface StampData {
  name: string;
}
const stamps = reactive(JSON.parse(localStorage.getItem("stamps") || "{}"));

export default async () => {
  for (const key in (await useUserData()).value.stamps) {
    if (!(key in stamps)) {
      stamps[key] = await getStampData(key);
    }
  }
  return stamps as { [key: string]: StampData };
};
watchEffect(() => {
  localStorage.setItem("stamps", JSON.stringify(stamps));
});
