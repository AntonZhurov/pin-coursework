import { readCsv } from './data-read';
import { presentData } from './data-present';

(async () => {
  const start = performance.now();

  await readCsv();
  await presentData();

  const stop = performance.now();
  console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
})();
