import React from 'react';

interface SortColHeaderProps {
  headerText: string;
  colName: string;
  onSort: Function;
  sortColName: string;
}

export const SortColHeader: React.FC<SortColHeaderProps> = ({
  headerText,
  colName,
  onSort: sort,
  sortColName,
}) => {
  return (
    <th onClick={() => sort(colName)}>
      {headerText} {sortColName === colName && 'v'}
    </th>
  );
};
