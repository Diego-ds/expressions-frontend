import { useEffect, useState } from "react";

export type ButtonProps = {
  fullWidth?: boolean;
  disabled?: boolean;
  children?: any;
  onClick?: any;
};

const Button = (props: ButtonProps) => {
  const { fullWidth, disabled, children, onClick } = props;

  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => setIsDisabled(disabled?disabled:false), [disabled])

  return (
    <button
      disabled={isDisabled}
      className={
        'relative box-border inline-flex justify-center rounded py-2 px-4 font-bold leading-normal text-white focus:shadow-gray-600 focus:outline-none' +
        (fullWidth ? ' w-full' : ' m-1') +
        (disabled ? ' bg-gray-600' : ' bg-gray-800  hover:bg-gray-900')
      }
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
