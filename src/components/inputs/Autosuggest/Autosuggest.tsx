import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from 'react';
import { Editor, Transforms, Range, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
} from 'slate-react';
import { BaseInputProps } from '../../../models/Input.model';
import Button from '../../buttons/Button/Button';
import axios from '../../../services/axios';

export type OptionElement = {
  type: 'option';
  character: string;
  children: CustomText[];
};

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text: string;
};

interface ExtraAutosuggestProps {
  options: Object;
  postRule?: any;
  err?: string;
  setErr?: any;
  reset?: any;
}

export type AutosuggestProps = ExtraAutosuggestProps & BaseInputProps;

const AutoSuggest = (props: AutosuggestProps) => {
  const { options, postRule, err, setErr, reset } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<Range | undefined | null>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withOptions(withReact(withHistory(createEditor()))),
    [],
  );
  const [inputArr, setInputArr] = useState<string[]>([]);

  const suggestions = Object.keys(options)
    .filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(search.toLowerCase()) > -1,
    )
    .slice(0, 10);

  const onKeyDown = useCallback(
    (event: any) => {
      if (target && suggestions.length > 0) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= suggestions.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? suggestions.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            insertOption(editor, suggestions[index]);
            setTarget(null);
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [suggestions, editor, index, target],
  );

  useEffect(() => {
    if (target && suggestions.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [suggestions.length, editor, index, search, target]);

  const operators = ['>', '<', '=', '!=', 'AND', 'OR', '(', ')'];

  const renderButtons = () => {
    return (
      <div className="box-border grid w-full grid-cols-4 justify-between">
        {operators.map((v) => {
          /*
          let disabled = true;
          switch (option?.type) {
            case 'string':
              disabled = v === '=' || v === '!=' ? false : true;
              break;
            case 'number':
              disabled = v === 'AND' || v === 'OR' ? true : false;
              break;
            case 'boolean':
              disabled = v === '>' || v === '<' ? true : false;
              break;
          }*/
          return (
            <Button
              key={v}
              onClick={() => insertOperator(editor, v)}
              //disabled={v === '(' || v === ')' ? false : disabled}
            >
              {v}
            </Button>
          );
        })}
      </div>
    );
  };

  const onApply = (e: any) => {
    const str = inputArr
      .join(' ')
      .replace(/ +(?= )/g, '')
      .toLowerCase();
    postRule({ rule: str });
  };
  const onClear = (e: any) => {
    reset();
  };

  return (
    <div className="flex flex-wrap justify-center md:space-x-3">
      <div className="w-full md:w-1/2">
        <h2 className="font-semibold">Logic Rule:</h2>
        <div className=" h-auto w-full rounded border-2 border-gray-900 bg-white p-1.5">
          <Slate
            editor={editor}
            value={initialValue}
            onChange={() => {
              setErr('');
              const { selection } = editor;

              if (selection && Range.isCollapsed(selection)) {
                const [start] = Range.edges(selection);
                const wordBefore = Editor.before(editor, start, {
                  unit: 'word',
                });
                const before = wordBefore && Editor.before(editor, wordBefore);
                const beforeRange =
                  before && Editor.range(editor, before, start);
                const beforeText =
                  beforeRange && Editor.string(editor, beforeRange);
                const beforeMatch = beforeText && beforeText.match(/^!(\w+)$/);
                const after = Editor.after(editor, start);
                const afterRange = Editor.range(editor, start, after);
                const afterText = Editor.string(editor, afterRange);
                const afterMatch = afterText.match(/^(\s|$)/);

                if (beforeMatch && afterMatch) {
                  setTarget(beforeRange);
                  setSearch(beforeMatch[1]);
                  setIndex(0);
                  return;
                }
              }

              setTarget(null);

              const arr: string[] = editor.children[0].children.map(
                (element: any) => {
                  return element.character
                    ? '$' + element.character
                    : element.text;
                },
              );
              const fi = !Boolean(arr[0]) ? arr.slice(1) : arr.slice(0);
              setInputArr(fi);

              /*if (fi.length > 1) {
                const col = fi[fi.length - 2];
                if (col.startsWith('$'))
                  setOption(options.find((x) => x.label === col.slice(1)));
              }*/
            }}
          >
            <Editable
              className="bg-slate-200"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={onKeyDown}
              placeholder="Write rule..."
            />
            {target && suggestions.length > 0 && (
              <div
                ref={ref}
                className="z-1 absolute rounded bg-slate-100 p-1 shadow"
                data-cy={'option-portal'}
              >
                {suggestions.map((suggestion, i) => (
                  <div
                    className={
                      'rounded p-1' +
                      (i === index ? ' bg-slate-300' : ' bg-transparent')
                    }
                    key={suggestion}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </Slate>
          <label className="text-red-600">{err}</label>
        </div>
      </div>
      <div className="flex w-full md:block md:w-1/5">
        <div className="m-1 flex flex-col justify-between md:space-y-2">
          <Button fullWidth onClick={onApply}>
            Apply
          </Button>
          <Button fullWidth onClick={onClear}>
            Clear
          </Button>
        </div>
        {renderButtons()}
      </div>
    </div>
  );
};

const withOptions = (editor: any) => {
  const { isInline, isVoid, markableVoid } = editor;

  editor.isInline = (element: any) => {
    return element.type === 'option' ? true : isInline(element);
  };

  editor.isVoid = (element: any) => {
    return element.type === 'option' ? true : isVoid(element);
  };

  editor.markableVoid = (element: any) => {
    return element.type === 'option' || markableVoid(element);
  };

  return editor;
};

const insertOption = (editor: Editor, character: string) => {
  const option: OptionElement = {
    type: 'option',
    character,
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, option);
  Transforms.move(editor);
};

const insertOperator = (editor: Editor, character: string) => {
  const operator = {
    text: character,
  };
  Transforms.insertNodes(editor, operator);
  Transforms.move(editor);
};

// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element = (props: any) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'option':
      return <Option {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Option = ({ attributes, children, element }: any) => {
  const selected = useSelected();
  const focused = useFocused();
  const style: React.CSSProperties = {
    fontSize: '0.9em',
    boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
  };
  // See if our empty text child has any styling marks applied and apply those
  if (element.children[0].bold) {
    style.fontWeight = 'bold';
  }
  if (element.children[0].italic) {
    style.fontStyle = 'italic';
  }
  return (
    <span
      className="mx-0.5 inline-block rounded bg-slate-400 px-1 py-0.5 align-baseline font-semibold"
      {...attributes}
      contentEditable={false}
      data-cy={`option-${element.character.replace(' ', '-')}`}
      style={style}
    >
      {children}
      {element.character}
    </span>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export default AutoSuggest;
