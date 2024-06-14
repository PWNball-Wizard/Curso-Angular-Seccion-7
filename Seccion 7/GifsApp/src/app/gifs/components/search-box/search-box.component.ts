import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public txtTagInput!: ElementRef<HTMLInputElement>;
  /* input = ''; */

  muestraInputConsola() {
    const tag = this.txtTagInput.nativeElement.value;
    //console.log(tag);
    this.gifsService.searchTag(tag);//llama al metodo searchTag del servicio y le pasa el tag
    this.txtTagInput.nativeElement.value = '';//limpia el input
  }

  

  constructor(private gifsService: GifsService) { }



}
