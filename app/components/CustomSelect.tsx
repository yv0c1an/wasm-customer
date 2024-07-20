// components/CustomSelect.tsx
import React from 'react';
import { Description, Field, Label, Select } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  description?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  description,
  options,
  value,
  onChange,
  name,
  className = "",
}) => {
  return (
    <Field className={clsx("w-full", className)}>
      <Label className=" block text-xs font-medium">{label}</Label>
      {description && (
        <Description className="text-sm/6 text-white/50">{description}</Description>
      )}
      <div className="relative">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name={name}
          className={clsx(
            'mt-2 block w-full appearance-none rounded-lg border border-white bg-[#131722] py-1.5 px-3 text-sm/6 ',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
          aria-hidden="true"
        />
      </div>
    </Field>
  );
};

export default CustomSelect;