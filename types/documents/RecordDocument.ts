export interface Record {
  createTime: Date;
  record: {
    peopleId: string;
    status: string;
  }[];
}

export type RecordDocument = Record & Document;
