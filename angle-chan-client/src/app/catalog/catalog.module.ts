import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import {CatalogComponent} from './catalog/catalog.component';
import {CatalogThumbnailComponent} from './catalog-thumbnail/catalog-thumbnail.component';


@NgModule({
  declarations: [
    CatalogComponent,
    CatalogThumbnailComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule { }
