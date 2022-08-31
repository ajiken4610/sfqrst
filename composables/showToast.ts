import { useToast } from "balm-ui";
let message = ref("");

const toast = useToast();
export default (newMessage: string) => {
  toast(newMessage);
};
export const useToastMessage = () => message;
