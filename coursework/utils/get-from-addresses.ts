import { ParsedMail } from 'mailparser';

export const getFromAddresses: (mail: ParsedMail) => string[] = (mail) => {
  return mail.from?.value?.map((value) => value.address) || [];
};
