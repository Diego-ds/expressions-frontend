import Button from '../../components/buttons/Button/Button';
import Autocomplete from '../../components/inputs/Autocomplete/Autocomplete';

const Input = () => {
  const options: { label: string; value: number }[] = [
    { label: 'option1', value: 1 },
    { label: 'option2', value: 2 },
    { label: 'option3', value: 3 },
    { label: 'option4', value: 4 },
    { label: 'option5', value: 5 },
  ];
  return (
    <div className="bg-gray-300 p-3">
      <div className="pl-3 pt-3 font-black">Inicio</div>
      <div className="flex flex-wrap justify-center space-x-3">
        <div className="w-full md:w-1/2">
          <h2>Regla lógica</h2>
          <div className="h-36 w-full rounded border-2 border-gray-900 bg-white p-3">
            <Autocomplete options={options} />
          </div>
        </div>
        <div className="flex w-full justify-center md:w-1/5 md:flex-col">
          <Button>Aplicar</Button>
          <Button>Previsualizar</Button>
        </div>
      </div>
    </div>
  );
};

export default Input;
