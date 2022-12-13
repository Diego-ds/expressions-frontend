import { BaseInputProps } from '../../../models/Input.model';

interface ExtraTextFieldProps {
  id: string | undefined;
  fullWidth?: boolean;
  type: string;
  placeholder: string;
}

export type TextFieldProps = ExtraTextFieldProps & BaseInputProps;

const TextField = (props: TextFieldProps) => {
  const { fullWidth, id, type, placeholder } = props;
  return (
    <div className="w-full md:w-1/2">
      <label className="mb-2 block text-sm font-semibold tracking-wide text-gray-700">
        Regla lógica
      </label>
      <div
        className={
          'relative box-border inline-flex rounded leading-tight' +
          (fullWidth ? ' w-full' : '')
        }
      >
        <input
          className="box-content block w-full appearance-none rounded border border-gray-600 py-4 px-3 text-gray-700 shadow focus:shadow-gray-600 focus:outline-none"
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextField;
