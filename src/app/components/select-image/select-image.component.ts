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
    this.urlValue = url;
    var blob = this.httpClient.get<File>(url, {});
    const arr = url.split('/');
    const name = arr[arr.length-1];
    const file = this.getFile(url, name);
    this.onChangedUrl.emit(file);
  }

  getFile(url: string, fileName: string){
    var bytes = url.split(',')[0].indexOf('base64') >= 0 ?
              atob(url.split(',')[1]) :
              (<any>window).unescape(url.split(',')[1]);
    var mime = url.split(',')[0].split(':')[1].split(';')[0];
    var max = bytes.length;
    var ia = new Uint8Array(max);
    for (var i = 0; i < max; i++) {
      ia[i] = bytes.charCodeAt(i);    
    }
    var newImageFileFromCanvas = new File([ia], fileName, { type: mime });
    return newImageFileFromCanvas;
  }

  reset(){
    this.onChangedUrl.emit(null);
  }

}
