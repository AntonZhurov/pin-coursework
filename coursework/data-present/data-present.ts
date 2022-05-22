import {
  dateToCountMessages,
  mailToCountReceivedMessages,
  raptorMessagesMap,
} from '../data-collection';
import { generateChartImage } from '../utils';

export async function presentData(): Promise<void> {
  console.log('Raptor messages count', raptorMessagesMap.size);

  const activeReceivers = Array.from(mailToCountReceivedMessages.entries())
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10);
  console.log('Active receivers', activeReceivers);

  await generateChartImage(dateToCountMessages);
}
