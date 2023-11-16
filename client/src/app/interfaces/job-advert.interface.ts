export interface JobAdvertInterface {
  title: string,
  company: string,
  location: string,
  description: string
  datePosted: string,
  dateExpires: string,
  jobType: string,
  industry: string,
  availablePositions: number,
  experience: string,
  education?: string,
  skills?: string[],
  salary?: string;
  score?: number;
  tags?: string[]
  employerId?: string;
  _id?: string;
}

export interface JobAdvertResponseInterface {
  docCount: number;
  results: JobAdvertInterface[];
}
