export interface AppUserInterface {
  email: string;
  password: string | undefined;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  postcode: string;
  termsAndConditions: boolean | undefined;
}
