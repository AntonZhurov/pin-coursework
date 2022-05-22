/**
  Count raptor messages = 2
 */

import {
  searchRaptorMessage,
  raptorMessagesMap,
} from '../../coursework/data-collection';
import { emails } from '../test-data';

describe('Search raptor messages', () => {
  beforeEach(() => {
    raptorMessagesMap.clear();
    emails.forEach((mail) => searchRaptorMessage(mail));
  });

  it('Count raptor messages', () => {
    expect(raptorMessagesMap.size).toBe(2);

    expect(
      raptorMessagesMap.get('<20826693.1075855687016.JavaMail.evans@thyme>'),
    ).toBeDefined();
    expect(
      raptorMessagesMap.get('<13455757.1075855671541.JavaMail.evans@thyme>'),
    ).toBeDefined();

    expect(
      raptorMessagesMap.get('<27598897.1075855671563.JavaMail.evans@thyme>'),
    ).toBeUndefined();
    expect(
      raptorMessagesMap.get('<31751710.1075855671584.JavaMail.evans@thyme>'),
    ).toBeUndefined();
  });
});
