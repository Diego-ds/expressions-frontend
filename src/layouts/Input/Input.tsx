import { useEffect, useState } from 'react';
import AutoSuggest from '../../components/inputs/Autosuggest/Autosuggest';
import { Column } from '../../models/Input.model';
import axios from '../../services/axios';

const Input = () => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchOptions = async () => {
      const fetch = await axios.get('rows/names/');
      setOptions(fetch.data);
    };
    fetchOptions();
  }, []);

  const postRule = (rule: string) => {
    axios.post('rows/', rule).then((res:any) => {
      console.log(res.data)
    })
  }

  return (
    <div className="bg-gray-300 p-3">
      <div className="pl-3 pt-3 font-black">Inicio</div>
      <AutoSuggest options={options} postRule={postRule} />
    </div>
  );
};

export default Input;
