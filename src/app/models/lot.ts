export class Lot{
  id: number;
  name: string;
  description: string;
  initialPrice: number;
  images: string[];
  deadline:Date;
  categoryId: number;
  ownerId: number;
  
  constructor(id: number, 
              name: string, 
              description:string, 
              initialPrice: number, 
              images: string[], 
              deadline:Date,
              ownerId: number,
              ownerName: string,
              categoryId: number
              ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.initialPrice = initialPrice;
    this.images = images;
    this.deadline = deadline;
    this.ownerId = ownerId;
    this.categoryId = categoryId;
  }
}