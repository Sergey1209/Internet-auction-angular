import { Injectable, Input } from "@angular/core";
import { NgModel } from "@angular/forms";
import { Lot } from "./lot";

export class Category {
  id: number;
  name: string;
  urlIcon: string;
  lots: Lot[] | null = null;
  isSelected: boolean = false;

  constructor(id: number, name: string, iconPath: string) {
    this.id = id;
    this.name = name;
    this.urlIcon = iconPath;
  }

  toString() {
    return this.name;
  }

  togleSelect() {
    this.isSelected = !this.isSelected;
  }

}
