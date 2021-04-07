import React, { useEffect, useState } from "react";
import { DeepPartial, UnpackNestedValue, useForm } from "react-hook-form";

export function useLocalStorage(args: {
  itemName: string;
  fallback?: () => string;
  delayInMs?: number;
}): [string, (newValue: string) => void] {
  const initial = () => {
    try {
      let saved = localStorage.getItem(args.itemName);
      if (!saved && args.fallback) {
        saved = args.fallback();
        localStorage.setItem(args.itemName, saved);
      }
      return saved;
    } catch (e) {
      return args.fallback();
    }
  };
  const [value, setValue] = useState(initial());

  let timeout: NodeJS.Timeout;

  const save = (newValue: string) => {
    setValue(newValue);

    if (!args.delayInMs) {
      localStorage.setItem(args.itemName, newValue);
    } else {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        localStorage.setItem(args.itemName, newValue);
      }, args.delayInMs);
    }
  };

  return [value, save];
}

export function useLocalStorageForm<T>(itemName: string) {
  const initialValues = (): UnpackNestedValue<DeepPartial<T>> => {
    try {
      const values = localStorage.getItem(itemName);
      if (values) {
        return JSON.parse(values) as UnpackNestedValue<DeepPartial<T>>;
      } else return {} as UnpackNestedValue<DeepPartial<T>>;
    } catch (e) {
      return {} as UnpackNestedValue<DeepPartial<T>>;
    }
  };

  const { watch, getValues, ...rest } = useForm<T>({
    defaultValues: initialValues(),
  });

  useEffect(() => {
    /* const json = JSON.stringify(watch()); */
    const json = JSON.stringify(getValues());
    localStorage.setItem(itemName, json);
  });

  return { watch, getValues, ...rest };
}
