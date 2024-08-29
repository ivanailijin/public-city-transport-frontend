export interface LineRegistration {
    id: number;
    name: string;
    lineType: LineType;
    length: number;
    time: number;
}

export enum LineType {
    city = 0,
    suburban
}