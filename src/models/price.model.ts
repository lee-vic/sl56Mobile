export class PriceInfo{
    Name:string;
    ModeOfTransportName:string;
    StartDate:string;
    EndDate:string;
    Currency:string;
}
export class PriceInfoList{
    AllowDownloadPrice:boolean;
    Items:PriceInfo[];
}