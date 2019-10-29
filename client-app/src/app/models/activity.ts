import { inheritInnerComments } from "@babel/types";

export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date
}

export class ActivityFormValues implements IActivityFormValues{
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    venue: string = '';

    //add constructor to load activity if exist
    constructor(init?: IActivityFormValues) {
        //if there is date, init time as well
        if (init && init.date){
            init.time = init.date
        }
        Object.assign(this, init);  
        
    }
}