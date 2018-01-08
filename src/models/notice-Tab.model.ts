import { Notice } from "./notice.model";

export class NoticeTab{
    categoryId:string;
    currentPageIndex:number;
    items:Notice[];
    title:string;
    isBusy:boolean;
}