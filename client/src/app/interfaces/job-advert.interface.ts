export interface JobAdvertInterface {
  title: string,
  company: string,
  location: string,
  description: string
  salary?: string;
  employerId?: string;
  _id?: string;
  score?: number;
}

export interface JobAdvertResponseInterface {
  docCount: number;
  results: JobAdvertInterface[];
}
