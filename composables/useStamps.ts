export interface StampData {
  name: string;
  description: string;
}
const stamps = reactive(JSON.parse(localStorage.getItem("stamps") || "{}"));
export default () => stamps as { [key: string]: StampData };
watchEffect(() => {
  localStorage.setItem("stamps", JSON.stringify(stamps));
});
