export class Lot{
  id: number;
  name: string;
  description: string;
  initialPrice: number;
  images: string[];
  deadline:Date;
  categoryId: number;
  ownerId: number;
  ownerName: string;
  auctionId: number;
  betValue: number;
  initialDate: Date;
  
  constructor(id: number, 
              name: string, 
              description:string, 
              initialPrice: number, 
              images: string[], 
              deadline:Date,
              ownerId: number,
              ownerName: string,
              categoryId: number,
              auctionId:number,
              betValue: number,
              initialDate: Date
              ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.initialPrice = initialPrice;
    this.images = images;
    this.deadline = deadline;
    this.ownerId = ownerId;
    this.ownerName = ownerName;
    this.categoryId = categoryId;
    this.auctionId = auctionId;
    this.betValue = betValue;
    this.initialDate = initialDate;
  }
}