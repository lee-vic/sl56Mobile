export class Menu{
    title:string;
    image:string;
    page:string;
    type:Array<number>;
}
export class MenuRow{
    items:Array<Menu>;
}
export class Menus{
    rows:Array<MenuRow>;
}