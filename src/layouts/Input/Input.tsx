import { useEffect, useState } from 'react';
import AutoSuggest from '../../components/inputs/Autosuggest/Autosuggest';
import axios from '../../services/axios';
import Table from '../Table/Table';

const Input = () => {
  const [options, setOptions] = useState({});
  const [data, setData] = useState([{}]);
  const [error, setError] = useState('');

  const fetchOptions = async () => {
    const fetch = await axios.get('rows/names/');
    setOptions(fetch.data);
  };
  const fetchRows = async () => {
    const fetch = await axios.get('rows/');
    setData(fetch.data);
  };
  useEffect(() => {
    fetchOptions();
    fetchRows();
  }, []);

  const postRule = (rule: any) => {
    axios
      .post('rows/', rule)
      .then((res: any) => {
        setData(res.data.slice(0, 5));
      })
      .catch(() => {
        setError('La regla no es válida.');
      });
  };

  const table_header = () => {
    const columns = Object.keys(data[0]);
    return (
      <Table.Row>
        {columns.map((col, index) => {
          return (
            <Table.Cell
              className="bg-gray-600 font-semibold text-white"
              key={index}
            >
              {col}
            </Table.Cell>
          );
        })}
      </Table.Row>
    );
  };

  const table_body = () => {
    return data.map((row: any, rowIndex: number) => {
      const cols = Object.keys(row).map((col: string, colIndex: number) => {
        return (
          <Table.Cell className="border-b-2 text-center" key={colIndex}>
            {row[col].toString()}
          </Table.Cell>
        );
      });
      return <Table.Row key={rowIndex}>{cols}</Table.Row>;
    });
  };

  return (
    <div>
      <div className="bg-gray-300 p-3">
        <AutoSuggest options={options} postRule={postRule} err={error} setErr={setError} reset={fetchRows} />
      </div>
      <div className="m-3 flex w-auto justify-center">
        <Table>
          <Table.Head>{table_header()}</Table.Head>
          <Table.Body>{table_body()}</Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Input;
