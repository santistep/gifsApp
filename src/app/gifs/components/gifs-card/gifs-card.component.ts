import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
})
export class GifsCardComponent implements OnInit {
  ngOnInit(): void {
    // Validacion de que la propiedad Gif este presente en el componente
    if (!this.gif) throw new Error('Gif prop is required');
  }

  @Input()
  public gif!: Gif;
}
