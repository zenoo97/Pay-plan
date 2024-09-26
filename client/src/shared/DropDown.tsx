import React, {useState} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

function DropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {id: 1, label: 'Apple', value: 'apple'},
    {id: 2, label: 'Banana', value: 'banana'},
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={9999}
    />
  );
}

export default DropDown;
