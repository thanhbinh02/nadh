import React from 'react';
import { Button, Menu, Form, Checkbox, Dropdown } from 'antd';

import { AiOutlineDown } from 'react-icons/ai';
import { CUSTOM_COLUMNS_CANDIDATES } from '../utils/const';
import { Fragment } from 'react';

export const CustomColumns = () => {
  const myMenu = (
    // <Menu
    //   //   onClick={(e) => e.preventDefault()}
    //   items={CUSTOM_COLUMNS_CANDIDATES.map((item) => ({
    //     key: item.title,
    //     label: (
    //       <label htmlFor={item.label}>
    //         <Checkbox
    //           disabled={item.disabled || false}
    //           onClick={(e) => e.stopPropagation()}
    //         >
    //           {item.label}
    //         </Checkbox>
    //       </label>
    //     ),
    //   }))}
    // />
    <Menu
      items={CUSTOM_COLUMNS_CANDIDATES.map((item) => ({
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
                <p onClick={(e) => e.stopPropagation()}>{item.label}</p>
              </Checkbox>
            ) : (
              <Checkbox id={item.title} onClick={(e) => e.stopPropagation()}>
                <p onClick={(e) => e.stopPropagation()}>{item.label}</p>
              </Checkbox>
            )}
          </p>
        ),
      }))}
    />
  );

  return (
    <Dropdown overlay={myMenu}>
      <Button
        type="primary"
        ghost
        style={{ display: 'flex', alignItems: 'center' }}
      >
        Custom Column
        <AiOutlineDown style={{ marginLeft: '10px' }} />
      </Button>
    </Dropdown>
  );
};
