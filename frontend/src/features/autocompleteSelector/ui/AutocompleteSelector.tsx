import { useState, useEffect, ReactNode } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

import { GETLocationGeoDataResponse } from '@/shared/api/server/types';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IAutocompleteSelectorProps {
  data: GETLocationGeoDataResponse;
  setData: (searchString: string) => void;
  registerForm: UseFormRegisterReturn;
  isInvalid: boolean;
  errorMessage: ReactNode;
  label: string;
  placeholder: string;
}
//Solving typescript error <<Property 'continuePropagation' does not exist on type 'React.KeyboardEvent<HTMLInputElement> | KeyboardEvent'>>
interface CustomKeyboardEvent extends React.KeyboardEvent<HTMLInputElement> {
  continuePropagation: () => void;
}

export function AutocompleteSelector({
  data,
  registerForm,
  setData,
  isInvalid,
  errorMessage,
  label,
  placeholder,
}: IAutocompleteSelectorProps) {
  const [query, setQuery] = useState('');
  const [delay, setDelay] = useState<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(delay);
    const newDelay = setTimeout(() => {
      setData(query);
    }, 500);
    setDelay(newDelay);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <Autocomplete
      {...registerForm}
      label={label}
      placeholder={placeholder}
      fullWidth={true}
      radius="sm"
      variant="faded"
      labelPlacement={'outside'}
      onKeyDown={(e: CustomKeyboardEvent) => {
        e.continuePropagation();
      }}
      items={data}
      inputValue={query}
      onInputChange={(value) => setQuery(value)}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      menuTrigger="input"
    >
      {(item) => (
        <AutocompleteItem key={item.locationName}>{item.locationName}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
