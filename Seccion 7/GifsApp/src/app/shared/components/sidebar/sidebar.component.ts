import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  get historial() {
    return this.gifsService.tagsHistory;
  }

  buscaElemento(tag: string) {
    this.gifsService.searchTag(tag);
  }

  constructor(private gifsService: GifsService) { }
}
