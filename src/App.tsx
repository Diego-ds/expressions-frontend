import React from 'react';
import Autocomplete from './components/inputs/Autocomplete/Autocomplete';
import Input from './layouts/Input/Input';
import Navbar from './layouts/Navbar/Navbar';
import Table from './layouts/Table/Table';

const data = [
  { columna1: '-', columna2: 1 },
  { columna1: '-', columna2: 2 },
  { columna1: '-', columna2: 1 },
  { columna1: '-', columna2: 2 },
];

const columns = ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 3'];

function App() {
  const table_header = (
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

  const table_body = data.map((row: any, rowIndex: number) => {
    const cols = Object.keys(row).map((col: string, colIndex: number) => {
      return (
        <Table.Cell className="border-b-2 text-center" key={colIndex}>
          {row[col]}
        </Table.Cell>
      );
    });
    return <Table.Row key={rowIndex}>{cols}</Table.Row>;
  });

  return (
    <>
      <Navbar />
      <Input />
      <div className="flex w-auto m-3 justify-center">
        <Table>
          <Table.Head>{table_header}</Table.Head>
          <Table.Body>{table_body}</Table.Body>
        </Table>
      </div>
    </>
  );
}

export default App;
