import { ParsedMail } from 'mailparser';
import { getFromAddresses, getToAddresses } from '../utils';

export interface RaptorMailData {
  mailId: string;
  from: string[];
  to: string[];
}

export const raptorMessagesMap = new Map<string, RaptorMailData>();

export function searchRaptorMessage(mail: ParsedMail) {
  if (mail.text?.toLowerCase().includes('raptor')) {
    raptorMessagesMap.set(mail.messageId, {
      mailId: mail.messageId,
      from: getFromAddresses(mail),
      to: getToAddresses(mail),
    });
  }
}
