import { useCallback, useState } from 'react';
import { BaseInputProps, Column } from '../../../models/Input.model';

interface ExtraAutocompleteProps {
  options?: Column[];
  remove?: any;
  isLoadingOptions?: boolean;
}

export type AutocompleteProps = ExtraAutocompleteProps & BaseInputProps;

const Autocomplete = (props: AutocompleteProps) => {
  const { options, remove } = props;

  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [suggestions, setSuggestions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const filterSuggestions = (str: string) => {
    const filter = options?.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(str.toLowerCase()) > -1,
    );
    return filter;
  };

  const onFocus = (e: any) => {
    const input = e.currentTarget.value;

    setActiveSuggestion(!Boolean(input) ? -1 : 0);
    setSuggestions(filterSuggestions(input));
    setIsOpen(true);
  };
  const onChange = (e: any) => {
    const input = e.currentTarget.value;

    setActiveSuggestion(!Boolean(input) ? -1 : 0);
    setSuggestions(filterSuggestions(input));
    setIsOpen(true);
    setInput(e.currentTarget.value);
  };
  const onClick = (e: any) => {
    if (!isOpen) setIsOpen(true);
  };
  const onBlur = (e: any) => {
    const item =
      activeSuggestion !== -1 && suggestions && suggestions.length !== 0
        ? suggestions[activeSuggestion].label
        : '';

    setActiveSuggestion(-1);
    setIsOpen(false);
    setInput(item);
  };
  const onKeyDown = useCallback(
    (event: any) => {
      switch (event.key) {
        case 'ArrowDown':
          if (activeSuggestion - 1 !== suggestions?.length)
            setActiveSuggestion(activeSuggestion + 1);
          break;
        case 'ArrowUp':
          if (activeSuggestion !== 0) setActiveSuggestion(activeSuggestion - 1);
          break;
        case 'Enter':
          setActiveSuggestion(0);
          setIsOpen(false);
          setInput(suggestions ? suggestions[activeSuggestion].label : '');
          break;
        case 'Escape':
          setActiveSuggestion(-1);
          setIsOpen(false);
          setInput('');
          break;
        case 'Backspace':
          if(input==='') {remove()};
          break;
      }
    },
    [activeSuggestion, input, remove, suggestions],
  );
  const mouseHighlight = (index: number) => {
    setActiveSuggestion(index);
  };
  const mouseSelect = (suggestion: any) => {
    setActiveSuggestion(0);
    setIsOpen(false);
    setInput(suggestion.label);
  };
  const renderAutocomplete = () => {
    if (isOpen) {
      if (suggestions?.length) {
        return (
          <div className="z-1 absolute box-border max-h-60 appearance-none overflow-y-scroll rounded-md bg-white shadow">
            {suggestions.map((suggestion, index) => {
              return (
                <div
                  className={
                    'border border-slate-300 py-0.5 px-1.5 hover:cursor-pointer' +
                    (activeSuggestion === index ? ' active bg-slate-300' : '')
                  }
                  key={index}
                  onClick={() => mouseSelect(suggestion)}
                  onMouseEnter={() => mouseHighlight(index)}
                >
                  {suggestion.label}
                </div>
              );
            })}
          </div>
        );
      } else {
        return (
          <div className="absolute bg-slate-300 py-0.5 px-1.5">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  };

  return (
    <div className="m-0.5 w-fit" aria-owns="listbox">
      <div className="w-fit">
        <input
          className={
            'box-content block w-32 appearance-none rounded bg-gray-200 py-0.5 px-1.5 focus:outline-none'
          }
          onFocus={onFocus}
          onClick={onClick}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="listbox"
          autoComplete="off"
          value={input}
        />
      </div>
      {renderAutocomplete()}
    </div>
  );
};

export default Autocomplete;
