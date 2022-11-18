import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { ListboxModule } from 'primeng/listbox';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    DialogModule,
    FieldsetModule,
    ImageModule,
    ListboxModule,
    TabMenuModule,
  ],
})
export class PrimeNgModule {}
