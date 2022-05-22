import { emails } from '../test-data';
import {
  countingActiveReceivers,
  mailToCountReceivedMessages,
} from '../../coursework/data-collection';

/**
 * Most active receiver is "paul.lucci@enron.com"
 */

describe('Test counting active receivers', () => {
  beforeEach(() => {
    mailToCountReceivedMessages.clear();
    emails.forEach((mail) => countingActiveReceivers(mail));
  });

  it('paul.lucci@enron.com is most active receiver', () => {
    expect(mailToCountReceivedMessages.get('paul.lucci@enron.com')).toBe(4);
  });

  it('Email to received messages', () => {
    expect(mailToCountReceivedMessages.get('paul.lucci@enron.com')).toBe(4);
    expect(mailToCountReceivedMessages.get('david.delainey@enron.com')).toBe(1);
    expect(mailToCountReceivedMessages.get('moshuffle@hotmail.com')).toBe(2);
    expect(
      mailToCountReceivedMessages.get('kenneth.shulklapper@enron.com'),
    ).toBe(1);
  });
});
