// components/UserCreationDate.tsx

import React from 'react';
import { formatDate } from '@/utils/dateFormatter';
import { DateFormatterProps } from '@/types';


const DateFormatter: React.FC<DateFormatterProps> = ({ createdAt }) => {
  const date = new Date(createdAt);

  return (
    <div className="text-sm text-gray-500">
      {formatDate(date)}
    </div>
  );
};

export default DateFormatter;
