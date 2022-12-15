import { ReactElement } from "react";

export interface BaseTableProps {
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
  children?: any;
  inputRef?: any;
  color?: 'primary' | 'secondary';
}
