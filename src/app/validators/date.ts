import { FormControl } from '@angular/forms';


export class DateValidator {
    


    static isValid(control: FormControl): any {

        var now = new Date();
        var nowStr = "" + now.getFullYear() + "-" + ('0' + (now.getMonth()+1)).slice(-2) + "-" + ('0' + now.getDate()).slice(-2) + "T" + now.getHours() + ":" + now.getMinutes() + ":00Z";
        
        console.log("Control value: " + control.value);
        console.log("Now value: " + nowStr);
        
        /* Validator to check if the is scheduled for a future time*/
        if(control.value < nowStr){
            return {
                "Ops, can't create a task for the past": true
            };
        }

        return null;
    }

}