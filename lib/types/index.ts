import { z } from "zod";
import { loginSchema, registrationSchema } from "../validations";

export type CountNumber<N extends number, Counter extends 0[] = []> = Counter['length'] extends N ? Counter['length'] : CountNumber<N, [...Counter, 0]>;


export type DynPixel<P> = P extends `${infer T}px` ? T : P;

export type LoginType = 'individual' | 'company' | 'service-provider';

export type DataAccessType = 'email' | 'contacts' | 'location' | 'others' 


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

export type RefreshTokenApiResponse = {
  access_token:string;
  refresh_token:string;
}
export interface SPRegistrationDetails {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  registrationNumber: string;
  fullName: string;
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


export type ApplicationCreationData = {  
  website_url: string;
  name:string; 
  logo_url: string;
  data_access: DataAccessType[];
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



//start API types

export type Role = 'user' | 'transaction_party';
export interface LoginDetails{
  email:string;
  password:string;
}


export interface ApiResponse{
  status?:number;
  message?: string; 
}

export interface IndividualProfileResponse extends ApiResponse{
  data:{
    firstName:string;
    lastName:string;
    email:string;
    id:string;
  }

}

export interface Application{
  id:string;
  name:string;
  logo_url:string;
  website_url:string;
  updatedAt:string;
  createdAt:string;
  data_access?:Array<DataAccessType>;
  purpose_of_access?:string;
}

export interface ServiceProviderApplicationsResponse extends ApiResponse{
    data:Array<Application>;
}

export interface IndividualOverviewResponse extends ApiResponse{
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
export interface IndividualLoginResponse extends ApiResponse { 
  token: { access_token: string; refresh_token: string; } 
  role:Role;
  firstTimeLogin:boolean;
}

export interface SPLoginResponse extends ApiResponse { 
  token: { access_token: string; refresh_token: string; } ;
  role:Role;
  firstTimeLogin:boolean;
}

