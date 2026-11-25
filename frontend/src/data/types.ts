export interface Profile {
  name: string;
  headline_badge: string;
  subtitle: string;
  badges: string[];
  tagline: string;
  bio: string;
  portrait: string;
  resume: string;
}

export interface Stat {
  label: string;
  value: string;
  note: string;
}

export interface Education {
  period: string;
  title: string;
  institution: string;
  result: string;
}

export interface Internship {
  period: string;
  title: string;
  place: string;
  points: string[];
}

export interface Achievement {
  meta: string;
  title: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface EventItem {
  category: string;
  date: string;
  title: string;
  place: string;
  description: string;
  photos: string[];
}

export interface Certificate {
  date: string;
  category: string;
  title: string;
  issuer: string;
  details: string;
  files: string[];
}

export interface ContactItem {
  label: string;
  value: string;
}

export interface Portfolio {
  profile: Profile;
  stats: Stat[];
  education: Education[];
  internships: Internship[];
  achievements: Achievement[];
  skills: SkillGroup[];
  events: EventItem[];
  certificates: Certificate[];
  contact: ContactItem[];
}

export interface LightboxImage {
  src: string;
  caption: string;
  sub?: string;
}
