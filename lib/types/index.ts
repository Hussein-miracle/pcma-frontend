import { z } from "zod";
import { loginSchema, registrationSchema } from "../validations";

export type CountNumber<N extends number, Counter extends 0[] = []> = Counter['length'] extends N ? Counter['length'] : CountNumber<N, [...Counter, 0]>;


export type DynPixel<P> = P extends `${infer T}px` ? T : P;

export type LoginType = 'individual' | 'company' | 'service-provider';

export interface LoginForm {
  email: string;
  password: string;
  login_type: SelectItem<LoginType>;
}


export type InferredRegistrationForm = z.infer<typeof registrationSchema>;
export type InferredLoginForm = z.infer<typeof loginSchema>;

export interface IndividualRegistrationDetails {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  companyName?: string;
}
export interface SPRegistrationDetails {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  companyName?: string;
}
export interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
  registrationType: SelectItem<LoginType>;
  lastName?: string;
  firstName?: string;
  companyName?: string;
  fullName?: string;
  companyAddress?: string;
  phoneNumber?: string;
  registrationNumber?: string;
}

export type SelectItem<T> = {
  label: string;
  value: T;
}

export type OverviewActivity = {
  name: string;
  activity: string;
  date: string;
}

export type ConnectedApplication = {
  company_name?: string;
  connected_date?: string;
  data_access?: string;
  last_accessed?: string;
}


export type ApplicationCreationForm = {
  applicationName: string;
  website_url: string;
  upload_logo: string | File | null;
  email_access: boolean;
  contacts_access: boolean;
  location_access: boolean;
  others_access: boolean;
  purpose_of_access: string;
}

export type AuditTrail = {
  application?: string;
  date_and_time?: string;
  action_type?: string;
}

export interface INotification {
  message?: string;
  title?: string;
  date?: string;
}
export interface IDateNotification {
  date: string;
  notifications: Array<INotification>;
}



//start



interface Response{
  status?:number;
  message?: string; 
}

export interface IndividualProfileResponse extends Response{
  data:{
    firstName:string;
    lastName:string;
    email:string;
    id:string;
  }

}
export interface IndividualOverviewResponse extends Response{
  data:{
    activities:{
      data:Array<any>;
      total:number;
    };
    request:{
      approved:number;
      data_leaks:number;
      pending:number;
      revoked:number;
    }
  }

}
export interface IndividualLoginResponse extends Response { 
  token: { access_token: string; refresh_token: string; } 
}
export interface SPLoginResponse extends Response { 
  token: { access_token: string; refresh_token: string; } ;
}

