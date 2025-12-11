export interface Invoice{
    invoiceId:number;
    billTo:string;
    invoiceDate:string;
    grandTotal:number;
    items:any[];
}
export interface Items{
    itemId:number;
    itemName:string;
    itemQuantity:number;
    itemUnitPrice:number;
    itemGstPer:number;
    itemGst:number;
    itemSubUnitTotal:number;
}
export interface User{
    user_id:number;
    user_name:string;
    email:string;
    password:string;
    role:string;
    createdAt:string;
}
