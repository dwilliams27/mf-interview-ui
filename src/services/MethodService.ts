import { BACKEND_URL, Payment } from "../shared/models";

export function addPaymentFile(fileName: string, payments: Payment[]) {
  return fetch(BACKEND_URL + '/paymentFiles', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ fileName, payments })
  });
}

export function getPaymentFiles() {
  return fetch(BACKEND_URL + '/paymentFiles', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET",
  });
}
