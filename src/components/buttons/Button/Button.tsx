import { BaseInputProps } from '../../../models/Input.model';

const Button = (props: BaseInputProps) => {
  const { children } = props;
  return (
    <button
      className="m-1 relative box-border inline-flex justify-center rounded bg-gray-800 py-2 px-4 font-bold leading-normal text-white hover:bg-gray-900 focus:shadow-gray-600 focus:outline-none"
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
