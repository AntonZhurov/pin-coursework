import * as fs from 'fs';
import { parse, ParserRowTransformFunction } from 'fast-csv';
import { ParsedMail, simpleParser } from 'mailparser';
import {
  countingActiveReceivers,
  countingReceivedMessagesByDate,
  searchRaptorMessage,
} from '../data-collection';

interface CsvParseData {
  file: string;
  message: string;
}

export function readCsv(): Promise<void> {
  return new Promise((resolve, reject) => {
    const inputStream = fs.createReadStream(
      `${process.cwd()}/coursework/emails.csv`,
      'utf-8',
    );

    const parser = parse({
      delimiter: ',',
      headers: true,
      ignoreEmpty: true,
      trim: true,
      objectMode: true,
    });

    const transformCsvDataToMail: ParserRowTransformFunction<
      CsvParseData,
      ParsedMail
    > = async (row, next) => {
      try {
        const mail = await simpleParser(row.message, { objectMode: true });

        next(null, mail);
      } catch (e) {
        return next(e);
      }
    };

    inputStream
      .pipe(parser)
      .transform(transformCsvDataToMail)
      .on('data', (email: ParsedMail) => {
        searchRaptorMessage(email);
        countingActiveReceivers(email);
        countingReceivedMessagesByDate(email);
      })
      .on('end', function () {
        resolve();
      })
      .on('close', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}
