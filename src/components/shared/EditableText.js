import { log } from "@antv/g2plot/lib/./utils";
import { Button, Input, Tooltip } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";

const DataContext = React.createContext();

export default function EditableContainer({ children }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState();
  const inputRef = useRef();

  const toggleEdit = () => setEditing(!editing);
  const save = () => {
    // TODO: call update api
    // then
    toggleEdit();
    //save result
    setText(text);
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <>
      <div>
        {editing ? (
          <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <DataContext.Provider value={{ text, setText }}>
            <div onClick={() => setEditing(true)}>{children}</div>
          </DataContext.Provider>
        )}
      </div>
    </>
  );
}

EditableContainer.Text = EditableText;
EditableContainer.Header = EditableHeader;

function EditableText({ value }) {
  const { text, setText } = useContext(DataContext);

  useEffect(() => {
    if (!text) setText(value);
  }, [value]);

  return (
    <p className="opacity-80 cursor-pointer text-gray-800 text-base">{text}</p>
  );
}
function EditableHeader({ value }) {
  const { text, setText } = useContext(DataContext);

  useEffect(() => {
    if (!text) setText(value);
  }, [value]);
  return <h2 className="cursor-pointer">{text}</h2>;
}
