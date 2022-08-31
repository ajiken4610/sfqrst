import { useToast } from "balm-ui";
const toast = useToast();
export default (message: string) => {
  toast(message);
};
