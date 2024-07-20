// components/CustomInput.tsx
import React from 'react';

interface CustomInputProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  type = 'text',
  className = '',
}) => {
  const inputClassName = `mt-1 block w-full border border-white rounded-md shadow-sm py-2 px-3 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-white text-xs appearance-none ${className}`;

  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium mb-2 text-white">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputClassName}
      />
    </div>
  );
};

export default CustomInput;