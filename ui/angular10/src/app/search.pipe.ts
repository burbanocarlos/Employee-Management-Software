import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'search'
})

export class SearchPipe implements PipeTransform {
    transform(value: any[], searchInput: string): any[]{
        if(!value){
            return null;
        }
        if(!searchInput) {
            console.log(value)
            return  value;
        }

       searchInput = searchInput.toLowerCase();
    //    debugger;
       return value.filter(function(item){
        return JSON.stringify(item).toLowerCase().includes(searchInput);
       });
       
     }
}