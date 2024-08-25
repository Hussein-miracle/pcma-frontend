import { z, ZodObject } from 'zod';
import { PASSWORD_VALIDATION_REGEX, VALIDATION_ERROR_MESSAGES } from '../constants';
import { dynamicRequiredErrorMsg } from '../utils';


export const registrationSchema = z.object({
  registration_type: z.object({
    label: z.string(),
    value: z.string(),
  }).required(),
  email: z.string().min(1, VALIDATION_ERROR_MESSAGES.EMAIL).email({
    message: VALIDATION_ERROR_MESSAGES.INVALID_EMAIL
  }),
  password: z.string({
    message: VALIDATION_ERROR_MESSAGES.PASSWORD
  }).regex(PASSWORD_VALIDATION_REGEX, {
    message: VALIDATION_ERROR_MESSAGES.PASSWORD_SECURITY
  }),
  confirm_password: z.string({
    message: VALIDATION_ERROR_MESSAGES.COMFIRM_PASSWORD
  }).min(1, VALIDATION_ERROR_MESSAGES.COMFIRM_PASSWORD),
  last_name: z.string({
    message: dynamicRequiredErrorMsg("Last Name is required.")
  }),
  first_name: z.string({
    message: dynamicRequiredErrorMsg("First Name is required.")
  }),
  // full_name: z.string().optional(),
  company_name: z.string().optional(),
  company_address: z.string().optional(),
  phone_number: z.string().optional(),
  registration_number: z.string().optional(),
}).refine((schemaVal) => schemaVal.password === schemaVal.confirm_password, {
  message: "Confirm password must match password",
  path: ["confirm_password"]
}).superRefine((schemaValues, context) => {

  if ((schemaValues.registration_type.value !== "individual")) {
    if (!schemaValues.company_name) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company name is required",
        path: ["company_name"]
      })
    }


    if (!schemaValues.company_address) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company address is required",
        path: ["company_address"]
      })
    }

    if (!schemaValues.phone_number) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number is required",
        path: ["phone_number"]
      })
    }

    if (!schemaValues.registration_number) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Registration number is required",
        path: ["registration_number"]
      })
    }

  }
    
  
  
});


export const loginSchema = z.object({
  email: z.string({ message: VALIDATION_ERROR_MESSAGES.EMAIL }).min(1, VALIDATION_ERROR_MESSAGES.EMAIL).email(VALIDATION_ERROR_MESSAGES.INVALID_EMAIL),
  password: z.string({
    message: VALIDATION_ERROR_MESSAGES.PASSWORD,
    // required_error:VALIDATION_ERROR_MESSAGES.PASSWORD
  }).min(1, VALIDATION_ERROR_MESSAGES.PASSWORD),
  // login_type: z.object({
  //   label: z.string({
  //     required_error: "Please select login type"
  //   }),
  //   value: z.string({
  //     required_error: "Please select login type"
  //   }),
  // }).required(),
})


export const createApplicationSchema = z.object({
  name: z.string({
    message: dynamicRequiredErrorMsg('application name'),
    required_error: dynamicRequiredErrorMsg('application name'),
  }).min(4, "application name must be at least 4 characters long"),
  website_url: z.string({
    message: dynamicRequiredErrorMsg('website url')
  }).url("website url must be a valid url"),
  logo_url: z.string({
    message: dynamicRequiredErrorMsg('logo url')
  }).url("logo url must be a valid url")

    .startsWith("https", 'please provide a valid image url starting with https')
  ,
  purpose_of_access: z.string().optional(),
  data_access: z.array(z.string()).max(4).nonempty("At least one item must be selected"),
})
export const updateApplicationSchema = z.object({
  name: z.string({
    message: dynamicRequiredErrorMsg('application name'),
    required_error: dynamicRequiredErrorMsg('application name'),
  }).min(4, "application name must be at least 4 characters long").optional(),
  website_url: z.string({
    message: dynamicRequiredErrorMsg('website url')
  }).url("website url must be a valid url").optional(),
  logo_url: z.string({
    message: dynamicRequiredErrorMsg('logo url')
  }).url("logo url must be a valid url")

    .startsWith("https", 'please provide a valid image url starting with https').optional()
  ,
  purpose_of_access: z.string().optional(),
  data_access: z.array(z.string()).max(4).nonempty("At least one item must be selected").optional(),
})

export const basic_pii_schema = z.object({
  email: z.string().min(1, VALIDATION_ERROR_MESSAGES.EMAIL).email({
    message: VALIDATION_ERROR_MESSAGES.INVALID_EMAIL
  }),
  last_name: z.string(),
  first_name: z.string(),
})

export const personal_pii_schema = z.object({
  // fullname: z.string(),
  // email: z.string().email(),
  phone_number: z.string(),
  date_of_birth: z.string(),
  home_address: z.string(),
  country: z.string(),
  occupation: z.string(),
})