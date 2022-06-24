export class CategoryLot {
  id: number;
  name: string;
  urlIcon: string;

  constructor(id: number, name: string, iconPath: string) {
    this.id = id;
    this.name = name;
    this.urlIcon = iconPath;
  }
}
