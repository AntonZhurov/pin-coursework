import { ParsedMail } from 'mailparser';
import * as dayjs from 'dayjs';

export const dateToCountMessages = new Map<string, number>();

export function countingReceivedMessagesByDate(mail: ParsedMail) {
  if (mail.date) {
    const dateString = dayjs(mail.date).format('DD-MM-YYYY');

    const value = dateToCountMessages.get(dateString);

    if (value) {
      dateToCountMessages.set(dateString, value + 1);
    } else {
      dateToCountMessages.set(dateString, 1);
    }
  }
}
