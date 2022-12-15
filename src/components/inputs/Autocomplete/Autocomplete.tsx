import { useState } from 'react';
import { BaseInputProps, Option } from '../../../models/Input.model';

interface ExtraAutocompleteProps {
  options?: Option[];
  isLoadingOptions?: boolean;
}

export type AutocompleteProps = ExtraAutocompleteProps & BaseInputProps;

const Autocomplete = (props: AutocompleteProps) => {
  const { options, isLoadingOptions } = props;

  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [suggestions, setSuggestions] = useState(options);
  const [isShown, setIsShown] = useState(false);
  const [input, setInput] = useState('');

  const onChange = (e: any) => {
    const { options } = props;
    const input = e.currentTarget.value;
    const newFilteredSuggestions = options?.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(input.toLowerCase()) > -1,
    );
    setActiveSuggestion(0);
    setSuggestions(newFilteredSuggestions);
    setIsShown(true);
    setInput(e.currentTarget.value);
  };
  const onClick = (e: any) => {
    setActiveSuggestion(0);
    setSuggestions([]);
    setIsShown(false);
    setInput(e.currentTarget.innerText);
  };
  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // enter key
      setActiveSuggestion(0);
      setIsShown(false);
      setInput(suggestions ? suggestions[activeSuggestion].label : '');
    } else if (e.keyCode === 38) {
      // up arrow
      if (activeSuggestion === 0) return;
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      if (activeSuggestion - 1 === suggestions?.length) return;
      setActiveSuggestion(activeSuggestion + 1);
    }
  };
  const renderAutocomplete = () => {
    if (isShown && input) {
      if (suggestions?.length) {
        return (
          <ul>
            {suggestions.map((suggestion, index) => {
              return (
                <li
                  className={
                    'p-2 hover:cursor-pointer hover:font-semibold' +
                    (activeSuggestion === index
                      ? ' active bg-gray-500'
                      : ' hover:bg-gray-300')
                  }
                  key={index}
                  onClick={onClick}
                >
                  {suggestion.label}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  };
  return (
    <div className="w-1/3 md:w-1/3 lg:w-1/12">
      <div className="">
        <input
          className="box-content block w-full appearance-none"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
        />
      </div>
      <div className="absolute box-content block appearance-none rounded bg-white shadow">
        {renderAutocomplete()}
      </div>
    </div>
  );
};

export default Autocomplete;
