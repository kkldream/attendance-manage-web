export interface Config {
  type: "statusList";
  config: string[];
}

export type ConfigDocument = Config & Document;
