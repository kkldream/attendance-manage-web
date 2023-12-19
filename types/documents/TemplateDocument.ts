export interface Template {
  name: string;
  template: {
    peopleId: string;
    status: string;
  }[];
}

export type TemplateDocument = Template & Document;
