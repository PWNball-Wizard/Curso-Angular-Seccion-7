import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrl: './gifs-card.component.css'
})
export class GifsCardComponent implements OnInit{

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) {
      throw new Error('Gif is required');
    }
  }

}
