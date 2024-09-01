import { z } from "zod";
import { loginSchema, registrationSchema } from "../validations";

export type CountNumber<
  N extends number,
  Counter extends 0[] = []
> = Counter["length"] extends N
  ? Counter["length"]
  : CountNumber<N, [...Counter, 0]>;

export type DynPixel<P> = P extends `${infer T}px` ? T : P;

export type LoginType = "individual" | "company" | "service-provider";

export type DataAccessType = "email" | "contact" | "location" | "others";

export interface LoginForm {
  email: string;
  password: string;
  login_type?: SelectItem<LoginType>;
}

export type InferredRegistrationForm = z.infer<typeof registrationSchema>;
export type InferredLoginForm = z.infer<typeof loginSchema>;

export interface IndividualRegistrationDetails {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  company_name?: string;
}

export type RefreshTokenApiResponse = {
  access_token: string;
  refresh_token: string;
};
export interface SPRegistrationDetails {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  company_name: string;
  company_address: string;
  phone_number: string;
  registration_number: string;
  // full_name: string;
}


export interface SpDashboardResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Activity[];
}


export interface RegistrationForm {
  email: string;
  password: string;
  confirm_password: string;
  registrationType: SelectItem<LoginType>;
  last_name?: string;
  first_name?: string;
  company_name?: string;
  full_name?: string;
  company_address?: string;
  phone_number?: string;
  registration_number?: string;
}

export type SelectItem<T> = {
  label: string;
  value: T;
};

export type OverviewActivity = {
  // name: string;
  // activity: string;
  // date: string;

  created_on: string;
  id: number;
  message: string;
  request: null;
  viewed_by_name: string;
};
export type Activity = {
  
  created_on?: string;
  requested_on: string;
  uuid?: number | string;
  message: string;
  is_valid:boolean;
  request: any;
  viewed_by_name?: string;
  user_name: string;
  status:string;
};


export interface ErrorItem {
  attr?: string;
  detail?: string;
  code?: string;
}


export type DashboardActivity = {
  
  requested_on: string;
  uuid: string;
  status:string;
  user_name: string;



  // message: string;
  // request: any;
};

export type ConnectedApplication = {
  company_name?: string;
  connected_date?: string;
  data_access?: string;
  last_accessed?: string;
};

export type ApplicationCreationData = {
  website_url: string;
  name: string;
  logo_url: string;
  data_access: DataAccessType[];
  purpose_of_access: string;
};

export type ApplicationUpdateData = {
  data_access: DataAccessType[];
  purpose_of_access: string;
};

export type AuditTrail = {
  application?: string;
  date_and_time?: string;
  action_type?: string;
};

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

export type Role = "end_user" | "service_provider";
export interface LoginDetails {
  email: string;
  password: string;
}

export interface BasicPiiData {
  email: string;
  first_name: string;
  last_name: string;
}
export interface PersonalPiiData {
  email?: string;
  first_name?: string;
  last_name?: string;

  date_of_birth: string;
  phone_number: string;
  home_address: string;
  country: string;
  occupation: string;
}

export interface ApiResponse {
  status?: number;
  message?: string;
}

export interface ApplicationDetails {
  id: string;
  public_key: string;
  secret_key: string;
  data_access: Array<DataAccessType>;
  website_url: string;
  logo_url: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  purpose_of_access?: string;
}
export interface ApplicationCreationResponse extends ApiResponse {
  data: ApplicationDetails;
}
export interface IndividualProfileResponse extends ApiResponse {
  data: {
    first_name: string;
    last_name: string;
    email: string;
    id: string;
  };
}


export interface ServiceProviderInformationForm {
  company_name: string;
  email: string;
  first_name:string;
  last_name:string;
  phone_number?: string;
  company_address?: string;
  registration_number?: string;
}
export interface ServiceProviderProfileResponse extends ApiResponse {
  user:Exclude<ServiceProviderInformationForm,'phone_number' | 'company_address' | 'registration_number'>;
  company: Exclude<ServiceProviderInformationForm,'first_name' | 'last_name'>;
}
export type Application = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  updatedAt: string;
  createdAt: string;
  data_access?: Array<DataAccessType>;
  purpose_of_access?: string;
};

export interface ServiceProviderApplicationsResponse extends ApiResponse {
  data: Array<Application>;
}
export interface ServiceProviderApplicationResponse extends ApiResponse {
  basic_pii:{
    email: string;
    first_name: string;
    last_name: string;
  },
  sensitive_pii:{
    date_of_birth: string;
    phone_number: string;
    home_address: string;
    country: string;
    occupation: string;
  },
  request:Partial<Activity>;
}

export interface IndividualOverviewResponse extends ApiResponse {
  // data: {

  approved: number;
  data_leaks: number;
  pending: number;
  rejected: number;
}

export interface PendingRequest {
  uuid: string;
  // id: number;
  requested_on: string;
  service_provider_company: string;
  status: string;
}
export interface IndividualPendingRequestResponse extends ApiResponse {}

export interface IndividualDashboardResponse extends ApiResponse {
  activities: {
    data: Array<any>;
    total: number;
  };
  request: {
    approved: number;
    data_leaks: number;
    pending: number;
    revoked: number;
  };
  basic_pii_saved: boolean;
  personal_pii_saved: boolean;
  connected_applications: Array<Partial<Application>>;
}
export interface IndividualLoginResponse extends ApiResponse {
  token: { access_token: string; refresh_token: string };
  role: Role;
  first_time_login: boolean;
  basic_pii_saved: boolean;
  personal_pii_saved: boolean;
}
export interface UnifiedLoginResponse extends ApiResponse {
  access_token: string;
  refresh_token: string;
  role: Role;
  first_time_login: boolean;
  basic_pii_saved: boolean;
  sensitive_pii_saved: boolean;
}

export interface SPLoginResponse extends ApiResponse {
  token: { access_token: string; refresh_token: string };
  role: Role;
  first_time_login: boolean;
}
