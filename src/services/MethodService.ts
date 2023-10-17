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

export function getBranchAmounts(fileUuid: string) {
  return fetch(BACKEND_URL + '/reports/branch?fileUuid=' + fileUuid, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET",
  });
}

export function getSourceAmounts(fileUuid: string) {
  return fetch(BACKEND_URL + '/reports/source?fileUuid=' + fileUuid, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET",
  });
}

export function getPayments(fileUuid: string) {
  return fetch(BACKEND_URL + '/payments?fileUuid=' + fileUuid, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET",
  });
}
