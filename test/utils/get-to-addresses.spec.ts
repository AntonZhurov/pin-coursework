import { getToAddresses } from '../../coursework/utils';
import { clearMail2, raptorMail1 } from '../test-data';

describe('Get to addresses util', () => {
  it('Test correct work', () => {
    const to1 = getToAddresses(clearMail2);
    const to2 = getToAddresses(raptorMail1);

    expect(to1).toContain('paul.lucci@enron.com');
    expect(to1).toContain('kenneth.shulklapper@enron.com');

    expect(to2).toContain('moshuffle@hotmail.com');
    expect(to2).toContain('paul.lucci@enron.com');
  });
});
