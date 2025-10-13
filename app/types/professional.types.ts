import { type Referral } from "./referral.types";

export interface Professional {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  referrals: Referral[];
}
