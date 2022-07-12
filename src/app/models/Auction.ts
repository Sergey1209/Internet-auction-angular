export class auction { 
  lotId: number;
  ownerId: number;
  customerNickname:string;
  betValue: number;
  deadline: Date;
  lotName: string;
  lotDescription: string
  lotImages: string[]

  constructor(
    lotId: number,
    ownerId:number,
    customerNickname: string, 
    betValue: number,
    deadline: Date,
    lotName: string,
    lotDescription: string,
    lotImages: string[],
    
    ) 
    {
      this.lotId = lotId;
      this.customerNickname = customerNickname;
      this.betValue = betValue;    
      this.deadline = deadline;    
      this.lotName = lotName;    
      this.lotDescription = lotDescription;    
      this.lotImages = lotImages;    
      this.ownerId = ownerId;    
    }
}
