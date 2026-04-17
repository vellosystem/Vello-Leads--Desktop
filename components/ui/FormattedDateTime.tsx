'use client';

import { useState, useEffect } from 'react';

interface FormattedDateTimeProps {
  date: Date | string | number;
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
  type?: 'date' | 'time' | 'datetime';
}

export default function FormattedDateTime({ 
  date, 
  options, 
  locale = 'pt-BR', 
  type = 'datetime' 
}: FormattedDateTimeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="invisible">...</span>; // Placeholder during SSR
  }

  const d = new Date(date);
  let result = '';
  
  if (type === 'date') {
    result = d.toLocaleDateString(locale, options);
  } else if (type === 'time') {
    result = d.toLocaleTimeString(locale, options);
  } else {
    result = d.toLocaleString(locale, options);
  }
  
  return <span>{result}</span>;
}
