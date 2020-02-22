import React from 'react';

// - the first parameter of a component is referred to as props
// and it contains all of the values passed in as attributes
// to the component
// - the name of the props properties correspond to the attribute
// names

interface ToolHeaderProps {
  headerText: string;
}
export const ToolHeader: React.FC<ToolHeaderProps> = ({ headerText }) => {
  return (
    <header>
      <h1>{headerText}</h1>
    </header>
  );
};
