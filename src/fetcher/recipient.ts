import { Recipient } from "../types/recipient";

export const getRecipients = async () => {
  try {
    const res = await fetch(`http://localhost:3000/recipients`);
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addRecipient = async (newRecipient: Recipient) => {
  const res = await fetch(`http://localhost:3000/recipients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRecipient),
  });
  const recipient = await res.json();
  return recipient;
};

export const deleteRecipient = async (recipientId: string) => {
  const res = await fetch(`http://localhost:3000/recipients/${recipientId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const recipient = await res.json();
  return recipient;
};
