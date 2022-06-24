import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent implements OnInit {
  file: File | null | undefined = null;
  urlValue: string = '';
 
  @Input()
    accept:string = '';

  constructor() {   }

  ngOnInit(): void {  }

  onFileSelected(event: Event){
    this.file = (event.target as HTMLInputElement).files?.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.urlValue = event.target.result;
    }
    reader.readAsDataURL(this.file as Blob);
    this.onChangedUrl.emit(this.file);
  }

  @Output()
    onChangedUrl = new EventEmitter<File | null | undefined>();

  @Input()
  set url(val: string){
    this.urlValue = val;
  }

  reset(){
    this.url = '';
    this.file = null;
    this.onChangedUrl.emit(this.file);
  }

}
