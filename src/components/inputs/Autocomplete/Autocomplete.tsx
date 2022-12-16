import { useState } from 'react';
import { BaseInputProps, Option } from '../../../models/Input.model';

interface ExtraAutocompleteProps {
  options?: Option[];
  isLoadingOptions?: boolean;
}

export type AutocompleteProps = ExtraAutocompleteProps & BaseInputProps;

const Autocomplete = (props: AutocompleteProps) => {
  const { options } = props;

  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [suggestions, setSuggestions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const filterSuggestions = (str: string) => {
    const filter = options?.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(input.toLowerCase()) > -1,
    );
    return filter;
  };

  const onFocus = (e: any) => {
    setIsOpen(true);
  };
  const onChange = (e: any) => {
    const input = e.currentTarget.value;

    setActiveSuggestion(0);
    setSuggestions(filterSuggestions(input));
    setIsOpen(true);
    setInput(e.currentTarget.value);
  };
  const onClick = (e: any) => {
    if (!isOpen) setIsOpen(true);
  };
  const onBlur = (e: any) => {
    const input = e.currentTarget.value;
    const item = Boolean(input) && activeSuggestion && suggestions ? suggestions[activeSuggestion].label : '';

    setActiveSuggestion(0);
    setIsOpen(false);
    setInput(item)
  };
  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // enter key
      setActiveSuggestion(0);
      setIsOpen(false);
      setInput(suggestions ? suggestions[activeSuggestion].label : '');
    } else if (e.keyCode === 38) {
      // up arrow
      if (activeSuggestion === 0) return;
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      if (activeSuggestion - 1 === suggestions?.length) return;
      setActiveSuggestion(activeSuggestion + 1);
    } else if (e.keyCode === 27) {
      setActiveSuggestion(0);
      setIsOpen(false);
      setInput('');
    }
  };
  const mouseHighlight = (index: number) => {
    setActiveSuggestion(index);
  };
  const mouseSelect = (suggestion: any) => {
    setActiveSuggestion(0);
    setIsOpen(false);
    setInput(suggestion.label);
  };
  const renderAutocomplete = () => {
    if (isOpen && input) {
      if (suggestions?.length) {
        return (
          <div className="absolute box-border w-full appearance-none rounded-md bg-white shadow">
            {suggestions.map((suggestion, index) => {
              return (
                <div
                  className={
                    'w-full border border-gray-300 py-0.5 px-1.5 hover:cursor-pointer' +
                    (activeSuggestion === index ? ' active bg-gray-300' : '')
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
          <div className="py-0.5 px-1.5 bg-gray-300">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  };
  return (
    <div className="relative inline-block w-fit" aria-owns="listbox">
      <div className="w-fit">
        <input
          className="box-content block w-full appearance-none rounded bg-gray-300 focus:outline-none"
          onFocus={onFocus}
          onClick={onClick}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? 'listbox' : ''}
          autoComplete="off"
          value={input}
        />
      </div>
      {renderAutocomplete()}
    </div>
  );
};

export default Autocomplete;
