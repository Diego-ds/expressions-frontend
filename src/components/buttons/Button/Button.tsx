import { BaseInputProps } from '../../../models/Input.model';

interface ExtraButtonProps {
  fullWidth?: boolean;
}

export type ButtonProps = ExtraButtonProps & BaseInputProps;

const Button = (props: ButtonProps) => {
  const { fullWidth, children } = props;
  return (
    <button
      className={
        'relative box-border inline-flex justify-center rounded bg-gray-800 py-2 px-4 font-bold leading-normal text-white hover:bg-gray-900 focus:shadow-gray-600 focus:outline-none' +
        (fullWidth ? ' w-full' : ' m-1')
      }
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
