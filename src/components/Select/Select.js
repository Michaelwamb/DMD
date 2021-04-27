import { FormSelect } from './StyleSelect';

import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

export default function Select({ name, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return <FormSelect
  cacheOptions
  defaultValue={defaultValue}
  ref={selectRef}
  classNamePrefix="react-select"
  {...rest}
/>
}
