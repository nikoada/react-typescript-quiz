import React from 'react';
import { Caterogies, Difficulty, TotalAmount } from '../API';

type Props = {
    title: string;
    enumName: typeof Caterogies | typeof Difficulty | typeof TotalAmount;
    setOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    isNumber: boolean;
}

const Select: React.FC<Props> = ({ title, enumName, setOption, isNumber }) => (
    <>
    <label>{title}</label>
        <select name={title.toLowerCase()} onChange={setOption}>
          {Object.keys(enumName).map((item, index) => {
            return isNumber ? !isNaN(Number(item)) && <option value={item} key={index}>{item}</option>
            : isNaN(Number(item)) && <option value={item} key={index}>{item}</option>
          })}
        </select>
    </>
);

export default Select;