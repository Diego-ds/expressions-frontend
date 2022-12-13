import Button from '../../components/buttons/Button/Button';
import TextField from '../../components/inputs/TextField/TextField';

const Input = () => {
  return (
    <div className="bg-gray-300">
      <div className="font-black pl-3 pt-3">Inicio</div>
      <div className="flex flex-wrap justify-center space-x-3">
        <TextField fullWidth id="rule" type="text" placeholder="Escribir regla..." />
        <div className='w-full flex justify-center md:w-1/5 md:flex-col'>
          <Button>Aplicar</Button>
          <Button>Previsualizar</Button>
        </div>
      </div>
    </div>
  );
};

export default Input;
