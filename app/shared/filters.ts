import {Pipe, PipeTransform} from 'angular2/core';
@Pipe({
    name: 'idFilter'
})
export class IdFilterPipe implements PipeTransform {
    transform(value: any): any {
       var values = value.split(';');
       return values.length > 0 ? values[0] : 0;
    }
}