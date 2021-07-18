import { BoardItem } from "./BoardItem";

export interface Board {
  id: string;
  title: string;
  updatedAt: string;
  items: BoardItem[];
}