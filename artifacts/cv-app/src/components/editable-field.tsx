import React, { useEffect, useRef } from 'react';
import { useCV } from '../context/cv-context';

interface EditableFieldProps {
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
}

export function EditableField({ 
  value, 
  onChange, 
  multiline = false, 
  className = "",
  tag = "span"
}: EditableFieldProps) {
  const { editMode } = useCV();
  const Tag = tag as any;

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full min-h-[100px] p-2 border border-blue-500/30 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-transparent editable-field resize-y ${className}`}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-1 border border-blue-500/30 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-transparent editable-field ${className}`}
    />
  );
}
