'use client';

import React, {useEffect, useMemo, useState} from 'react';

export type DateOfBirthPickerProps = {
  value: string;                         // 'YYYY-MM-DD' կամ ''
  onChange: (v: string) => void;         // կկանչվի երբ երեքն էլ ընտրված են, հակառակ դեպքում ''
  label?: string;
  className?: string;
  minYear?: number;                       // default: currentYear - 120
  maxYear?: number;                       // default: currentYear
  disabled?: boolean;
  monthLabels?: string[];                 // 12 տարրը՝ ['Jan','Feb',...]
};

const pad2 = (n: number) => String(n).padStart(2, '0');
const daysInMonth = (year: number, month1to12: number) =>
  new Date(year, month1to12, 0).getDate();

export default function DateOfBirthPicker({
                                            value,
                                            onChange,
                                            label = 'Birth date',
                                            className = '',
                                            minYear,
                                            maxYear,
                                            disabled = false,
                                            monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                                          }: DateOfBirthPickerProps) {
  const now = new Date();
  const _max = maxYear ?? now.getFullYear();
  const _min = minYear ?? _max - 120;

  // ներքին վիճակ՝ որ ընտրելիս արժեքները չկորչեն
  const [y, setY] = useState<number | ''>('');
  const [m, setM] = useState<number | ''>('');
  const [d, setD] = useState<number | ''>('');

  // sync արտաքին value֊ից
  useEffect(() => {
    if (value) {
      const [yy, mm, dd] = value.split('-').map(Number);
      setY(yy || '');
      setM(mm || '');
      setD(dd || '');
    } else {
      setY('');
      setM('');
      setD('');
    }
  }, [value]);

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let yy = _max; yy >= _min; yy--) arr.push(yy);
    return arr;
  }, [_max, _min]);

  const maxDays = (y && m) ? daysInMonth(Number(y), Number(m)) : 31;
  const days = Array.from({length: maxDays}, (_, i) => i + 1);

  // վերև փոխանցելու helper
  function emit(yy: number | '' = y, mm: number | '' = m, dd: number | '' = d) {
    if (yy && mm && dd) onChange(`${yy}-${pad2(Number(mm))}-${pad2(Number(dd))}`);
    else onChange('');
  }

  return (
    <div className={className}>
      <label className="block mb-1 text-sm text-gray-500 dark:text-gray-300 font-mono">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {/* Month */}
        <select
          disabled={disabled}
          className="px-3 py-2 rounded border border-gray-300 focus:border-cyan-300
                     bg-white dark:bg-black/40 text-gray-900 dark:text-gray-100"
          value={m}
          onChange={(e) => {
            const mm = Number(e.target.value);
            const dd = d && Number(d) > daysInMonth(Number(y || _max), mm) ? '' : d;
            setM(mm);
            setD(dd);
            emit(y, mm, dd);
          }}
        >
          <option value="" disabled>MM</option>
          {monthLabels.map((lbl, idx) => (
            <option key={idx+1} value={idx+1}>{lbl}</option>
          ))}
        </select>

        {/* Day */}
        <select
          disabled={disabled}
          className="px-3 py-2 rounded border border-gray-300 focus:border-cyan-300
                     bg-white dark:bg-black/40 text-gray-900 dark:text-gray-100"
          value={d}
          onChange={(e) => {
            const dd = Number(e.target.value);
            setD(dd);
            emit(y, m, dd);
          }}
        >
          <option value="" disabled>DD</option>
          {days.map((dd) => <option key={dd} value={dd}>{pad2(dd)}</option>)}
        </select>

        {/* Year */}
        <select
          disabled={disabled}
          className="px-3 py-2 rounded border border-gray-300 focus:border-cyan-300
                     bg-white dark:bg-black/40 text-gray-900 dark:text-gray-100"
          value={y}
          onChange={(e) => {
            const yy = Number(e.target.value);
            const dd = d && Number(d) > daysInMonth(yy, Number(m || 1)) ? '' : d;
            setY(yy);
            setD(dd);
            emit(yy, m, dd);
          }}
        >
          <option value="" disabled>YYYY</option>
          {years.map((yy) => <option key={yy} value={yy}>{yy}</option>)}
        </select>
      </div>
    </div>
  );
}
