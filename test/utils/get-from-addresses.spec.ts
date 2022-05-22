import { getFromAddresses } from '../../coursework/utils';
import { clearMail2, raptorMail1 } from '../test-data';

describe('Get from addresses util', () => {
  it('Test correct work', () => {
    expect(getFromAddresses(clearMail2)).toContain('moshuffle@hotmail.com');
    expect(getFromAddresses(raptorMail1)).toContain('phillip.allen@enron.com');
  });
});
