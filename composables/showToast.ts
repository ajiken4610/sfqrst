let message = ref("");
export default (newMessage: string) => {
  message.value = newMessage;
};
export const useToastMessage = () => message;
