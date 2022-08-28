import { useToast } from "balm-ui";
export default (message: string) => {
  useToast()(message);
};
