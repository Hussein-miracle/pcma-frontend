import { z, ZodObject } from 'zod';
import { PASSWORD_VALIDATION_REGEX, VALIDATION_ERROR_MESSAGES } from '../constants';
import { dynamicRequiredErrorMsg } from '../utils';


export const registrationSchema = z.object({
  registrationType: z.object({
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
  confirmPassword: z.string({
    message: VALIDATION_ERROR_MESSAGES.COMFIRM_PASSWORD
  }).min(1, VALIDATION_ERROR_MESSAGES.COMFIRM_PASSWORD),
  lastName: z.string().optional(),
  firstName: z.string().optional(),
  fullName: z.string().optional(),
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  phoneNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
}).refine((schemaVal) => schemaVal.password === schemaVal.confirmPassword, {
  message: "Confirm password must match password",
  path: ["confirmPassword"]
}).superRefine((schemaValues, context) => {

  if ((schemaValues.registrationType.value !== "individual")) {
    if (!schemaValues.companyName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company name is required",
        path: ["companyName"]
      })
    }


    if (!schemaValues.companyAddress) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company address is required",
        path: ["companyAddress"]
      })
    }

    if (!schemaValues.phoneNumber) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number is required",
        path: ["phoneNumber"]
      })
    }

    if (!schemaValues.registrationNumber) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Registration number is required",
        path: ["registrationNumber"]
      })
    }

    if (!schemaValues.fullName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Full name is required",
        path: ["fullName"]
      })
    }
  } else {
    if (!schemaValues.lastName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Last name is required",
        path: ["lastName"]
      })
    }
    if (!schemaValues.firstName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "First name is required",
        path: ["firstName"]
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
  login_type: z.object({
    label: z.string({
      required_error: "Please select login type"
    }),
    value: z.string({
      required_error: "Please select login type"
    }),
  }).required(),
})


export const createApplicationSchema = z.object({
  name:z.string({
    message: dynamicRequiredErrorMsg('application name'),
    required_error:dynamicRequiredErrorMsg('application name'),
  }).min(4,"application name must be at least 4 characters long"),
  website_url:z.string({
    message: dynamicRequiredErrorMsg('website url')
  }).url("website url must be a valid url"),
  logo_url:z.string({
    message: dynamicRequiredErrorMsg('logo url')
  }).url("logo url must be a valid url").startsWith("https",'please provide a valid image url starting with https'),
  purpose_of_access:z.string().optional(),
  data_access:z.array(z.string()).max(4).nonempty("At least one item must be selected"),
})