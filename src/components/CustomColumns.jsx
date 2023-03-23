import { useState } from 'react';
import { Button, Menu, Checkbox, Dropdown } from 'antd';

import { AiOutlineDown } from 'react-icons/ai';
import { CUSTOM_COLUMNS_CANDIDATES } from '../utils/const';
import { MyCheckBox } from './MyCheckBox';
import { useDispatch } from 'react-redux';
import { putListCustomColumns } from '../store/customColumnSlice';

export const CustomColumns = ({ namePage, listCustom }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  let newListCustomColumn = CUSTOM_COLUMNS_CANDIDATES;

  for (let i = 0; i < newListCustomColumn.length; i++) {
    if (listCustom.includes(newListCustomColumn[i].title)) {
      newListCustomColumn[i].check = true;
    } else {
      newListCustomColumn[i].check = false;
    }
  }

  const myMenu = (
    <Menu
      items={newListCustomColumn.map((item) => ({
        key: item.title,
        label: (
          <p>
            {item.disabled ? (
              <Checkbox
                id={item.title}
                disabled={item.disabled || false}
                onClick={(e) => e.stopPropagation()}
                checked={true}
              >
                <span onClick={(e) => e.stopPropagation()}>{item.label}</span>
              </Checkbox>
            ) : (
              <MyCheckBox item={item} check={item.check} />
            )}
          </p>
        ),
      }))}
    />
  );

  return (
    <Dropdown
      overlay={myMenu}
      onOpenChange={() => {
        setOpen(!open);
        if (open === true) {
          dispatch(
            putListCustomColumns({
              key_page: namePage,
              data: listCustom,
            }),
          );
        }
      }}
      open={open}
    >
      <Button
        type="primary"
        ghost
        style={{ display: 'flex', alignItems: 'center', marginRight: '54px' }}
      >
        Custom Column
        <AiOutlineDown style={{ marginLeft: '10px' }} />
      </Button>
    </Dropdown>
  );
};
