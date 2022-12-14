import { BaseTableProps, Data } from '../../models/Table.models';

const Table = (props: BaseTableProps) => {
  const { children } = props;
  return <table>{children}</table>;
};

export const TableHead = (props: BaseTableProps) => {
  const { children } = props;
  return <thead>{children}</thead>;
};

export const TableBody = (props: BaseTableProps) => {
  const { className, children } = props;
  return <tbody>{children}</tbody>;
};

const TableRow = (props: BaseTableProps) => {
  const { children } = props;
  return <tr>{children}</tr>;
};

const TableCell = (props: BaseTableProps) => {
  const { className, children } = props;
  return <td className={'pt-4 pb-4 pr-6 pl-6 text-center ' + className}>{children}</td>;
};

export default Object.assign(Table, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
});
