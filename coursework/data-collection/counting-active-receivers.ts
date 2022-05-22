import { ParsedMail } from 'mailparser';
import { getToAddresses } from '../utils';

export const mailToCountReceivedMessages = new Map<string, number>();

export function countingActiveReceivers(email: ParsedMail) {
  getToAddresses(email).forEach((address) => {
    const value = mailToCountReceivedMessages.get(address);

    if (value) {
      mailToCountReceivedMessages.set(address, value + 1);
    } else {
      mailToCountReceivedMessages.set(address, 1);
    }
  });
}
