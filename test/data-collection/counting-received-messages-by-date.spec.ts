/**
  01-11-2000 = 2
  12-01-2001 = 1
  13-05-2000 = 1
*/

import { emails } from '../test-data';
import {
  countingReceivedMessagesByDate,
  dateToCountMessages,
} from '../../coursework/data-collection';

describe('Received messages by date', () => {
  beforeEach(() => {
    dateToCountMessages.clear();
    emails.forEach((mail) => countingReceivedMessagesByDate(mail));
  });

  it('Match date with received messages', () => {
    expect(dateToCountMessages.get('01-11-2000')).toBe(2);
    expect(dateToCountMessages.get('12-01-2001')).toBe(1);
    expect(dateToCountMessages.get('13-05-2000')).toBe(1);
  });
});
