import { Address } from './address';
export class EntrepriseDto {
  name: string;
  headOffice?: Address;
  siteURL?: string;
  logo?: string;
}
