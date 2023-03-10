import { BoardStatus } from "./board-status.enum";

export interface Board {
    id: number;
    title: string;
    description: string;
    status: BoardStatus;
}

