export class Bet {
  betValue: number;
  customerNickname: string;

  constructor(betValue: number, customerNickname: string) {
    this.betValue = betValue;
    this.customerNickname = customerNickname;
  }
}
