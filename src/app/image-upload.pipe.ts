import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUpload'
})
export class ImageUploadPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
