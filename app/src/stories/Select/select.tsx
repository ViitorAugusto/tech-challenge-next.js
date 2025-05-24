"use client";

import * as React from "react";

import {
  Select as SelecBase,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from "../../components/ui/select";

type Item = {
  label: string;
  value: string;
};

type Props = {
  hasSeparator?: boolean;
  itemList: [Item];
};

export function Select({
  placeholder,
  disabled,
  hasSeparator = false,
  itemList,
}: React.ComponentProps<"input"> & Props) {
  return (
    <SelecBase disabled={disabled}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {itemList && <SelectContent>
        {itemList.map((item) => (
          <>
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
            {hasSeparator && <SelectSeparator />}
          </>
        ))}
      </SelectContent>}
    </SelecBase>
  );
}
