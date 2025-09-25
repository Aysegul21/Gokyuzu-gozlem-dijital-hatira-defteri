export interface Wish {
  id: string;
  name: string;
  message: string;
  image?: string;
  date: string;
  timestamp: number;
}

export interface StarfieldProps {
  className?: string;
}