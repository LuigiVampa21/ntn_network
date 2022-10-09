import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'username'
})

export class UsernamePipe implements PipeTransform {
    transform(nameObj: { firstName: string, lastName: string }): string {     
        return `${nameObj.lastName.toUpperCase()} ${nameObj.firstName.charAt(0).toUpperCase() + nameObj.firstName.slice(1).toLowerCase()}`
    }
}