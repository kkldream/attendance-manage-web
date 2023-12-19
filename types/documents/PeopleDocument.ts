export interface People {
  index: number;
  name: string;
  direction: string;
  email: string;
}

export type PeopleDocument = People & Document;
