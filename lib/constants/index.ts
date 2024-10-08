import { SelectItem, LoginType } from "../types";
import { dynamicRequiredErrorMsg } from "../utils";


export enum DataAccessEnum{
  EMAIL = 'email',
  OTHERS = 'others',
  LOCATION = 'location',
  CONTACT = 'contact'    
}

export enum RoleEnum{
  END_USER = "END_USER",
   SERVICE_PROVIDER = "SERVICE_PROVIDER", 
}

export enum ApplicationFlowEnum {
  VIEW_APPLICATIONS = "VIEW_APPLICATIONS",
  CREATE_APPLICATION = "CREATE_APPLICATION",
  CONFIRM_APPLICATION = "CONFIRM_APPLICATION",
}


export const USER_LOGIN_TYPES : SelectItem<LoginType>[] = [
  {
    label:"Individual",
    value:"individual",
  },
  {
    label:"Service Provider",
    value:"service-provider",
  }
];


// NOTE: this is for validating if password created has a minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const PASSWORD_VALIDATION_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/



export const VALIDATION_ERROR_MESSAGES = {
  EMAIL:dynamicRequiredErrorMsg("email"),
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD: dynamicRequiredErrorMsg('password'),
  PASSWORD_SECURITY: `password must contain at least one uppercase letter, one lowercase letter, one number and one special character.`,
  COMFIRM_PASSWORD: dynamicRequiredErrorMsg('confirm password'),
}