import React from 'react';
import { InputNumber } from 'antd';

export const InputNumberFormat = () => {
  return (
    <InputNumber
      min={0}
      style={{ width: '95%' }}
      formatter={(value) => {
        const str = value.toString();
        const decimalIndex = str.indexOf('.');
        const decimalPart = decimalIndex >= 0 ? str.slice(decimalIndex) : '';
        const integerPart =
          decimalIndex >= 0 ? str.slice(0, decimalIndex) : str;
        const formattedIntegerPart = integerPart
          .split('')
          .reverse()
          .map((char, index) => {
            if (index > 0 && index % 3 === 0) {
              return `${char},`;
            }
            return char;
          })
          .reverse()
          .join('');
        return `${formattedIntegerPart}${decimalPart}`;
      }}
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      precision={2}
    ></InputNumber>
  );
};
