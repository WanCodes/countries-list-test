export type Language = {
  code: string;
  name: string;
};

export type Country = {
  code: string;
  name: string;
  native: string;
  emoji: string;
  capital: string;
  languages: Language[];
  currency: string;
};
