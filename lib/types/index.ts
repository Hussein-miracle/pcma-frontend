export type CountNumber<N extends number,Counter extends 0[] = []> = Counter['length'] extends N ?  Counter['length'] : CountNumber<N,[...Counter,0]> ; 


export type DynPixel<P> = P extends `${infer T}px` ? T : P;

export type UserLoginType = 'individual' | 'company';

export  type SelectItem<T> = {
  label:string;
  value:T;
}

export type OverviewActivity = {
  name:string;
  activity:string;
  date:string;
}