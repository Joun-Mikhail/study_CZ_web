export interface Certificate {
  uniqueId: string;
  studentName: string;
  courseTitle: { en: string; ar: string };
  completionDate: string;
  issuerName: string;
  tradeLicenceNumber: string;
}

export const TRADE_LICENCE_NUMBER = "TODO: Insert number";

export const certificates: Certificate[] = [];
