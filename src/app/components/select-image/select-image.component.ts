import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent implements OnInit {
  
  urlValue: string = '';
  
  @Input()
    accept:string = '';

  constructor(private httpClient: HttpClient) {   }

  ngOnInit(): void {  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement).files?.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.urlValue = event.target.result;
    }
    reader.readAsDataURL(file as Blob);

    this.onChangedUrl.emit(file);
  }

  @Output()
    onChangedUrl = new EventEmitter<File | null | undefined>();

  @Input()
    set url(url: string){
      if (url){
        this.urlValue = url;
      }
    }

  reset(){
    this.urlValue = '';
    this.onChangedUrl.emit(null);
  }

}
