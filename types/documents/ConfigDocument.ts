export interface status {
    key: string;
    name: string;
}

export interface Config {
    type: "statusList";
    config: status[];
}

export type ConfigDocument = Config & Document;
