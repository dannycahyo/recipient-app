import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Recipient } from "../types/recipient";
import {
  getRecipients,
  addRecipient,
  deleteRecipient,
} from "../fetcher/recipient";

export default function useRecipient() {
  const queryClient = useQueryClient();

  const { data: recipients } = useQuery<Recipient[]>({
    queryKey: ["recipients"],
    queryFn: getRecipients,
  });

  const { mutate: addNewRecipient } = useMutation<Recipient, Error, Recipient>({
    mutationFn: addRecipient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
    },
  });

  const { mutate: deleteRecipientById } = useMutation({
    mutationFn: deleteRecipient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipients"] });
    },
  });

  return {
    recipients,
    addNewRecipient,
    deleteRecipientById,
  };
}
