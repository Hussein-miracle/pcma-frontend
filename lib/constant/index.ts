import { SelectItem, UserLoginType } from "../types";

export const USER_LOGIN_TYPES:SelectItem<UserLoginType>[] = [
  {
    label:"Individual",
    value:"individual",
  },
  {
    label:"Company",
    value:"company",
  }
]