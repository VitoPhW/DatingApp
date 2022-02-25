import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    BsDatepickerModule.forRoot()
  ],
  declarations: [],
  exports: [
    TabsModule,
    BsDropdownModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    ToastrModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
