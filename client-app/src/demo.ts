export interface ICar{
    model: string,
    color:string,
    topspeed? : number
}

const car1: ICar = {
    color:'blue',
    model: 'BMW'
}

const car2: ICar = {
    color:'red',
    model: 'Toyota'
}

export const cars = [car1, car2];