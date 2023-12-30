import type {Template} from "~/types/documents/TemplateDocument";

export interface Attendance {
    id: string,
    name: string,
    direction: string,
    email: string,
    select: number | null,
}

export interface TemplateWithId extends Template {
    templateId: string;
}
