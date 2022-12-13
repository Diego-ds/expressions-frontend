import { ReactElement } from "react";

export interface BaseInputProps {
  name?: string;
  autoComplete?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  label?: string | ReactElement;
  helperText?: string;
  disabled?: boolean;
  startAdornment?: any;
  endAdornment?: any;
  maxLength?: number;
  value?: any;
  onChange?: (event: any) => void;
  children?: any;
  inputRef?: any;
  color?: 'primary' | 'secondary';
}

export interface Option {
  label: string;
  value: string | number | boolean;
}
