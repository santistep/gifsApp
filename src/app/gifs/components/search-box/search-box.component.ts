import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class SearchBoxComponent {
  //----- pasamos valor por referencia -----//
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    // Disparo la busqueda en el servicio
    this.gifsService.searchTag(newTag);
    // Limpio la caja de texto
    this.tagInput.nativeElement.value = '';
  }

  // searchTag(newTag: string) {
  //   console.log({ newTag });
  // }

  constructor(private gifsService: GifsService) {}
}
