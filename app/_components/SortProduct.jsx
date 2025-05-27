import React from 'react';
import {
          Select,
          SelectContent,
          SelectItem,
          SelectTrigger,
          SelectValue,
} from "@/components/ui/select";

export default function SortProduct({ onSortChange }) {
          const list = [
                    {
                              label: 'NEWEST',
                              field: 'id',
                              order: 'desc'
                    },
                    {
                              label: 'PRICE (LOW TO HIGH)',
                              field: 'price',
                              order: 'asc'
                    },
                    {
                              label: 'PRICE (HIGH TO LOW)',
                              field: 'price',
                              order: 'desc'
                    },
                    {
                              label: 'MOST VIEWED',
                              field: 'views',
                              order: 'desc'
                    },
          ];

          return (
                    <div>
                              <Select onValueChange={(value) => onSortChange(JSON.parse(value))}>
                                        <SelectTrigger className="w-[180px]">
                                                  <SelectValue placeholder="Sort" />
                                        </SelectTrigger>
                                        <SelectContent>
                                                  {list.map((item, index) => (
                                                            <SelectItem value={JSON.stringify(item)} key={index}>
                                                                      {item.label}
                                                            </SelectItem>
                                                  ))}
                                        </SelectContent>
                              </Select>
                    </div>
          );
}
