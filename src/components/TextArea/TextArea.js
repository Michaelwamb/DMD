import { TextArea } from './TextStyle';

import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

export default function Input({ name, ...rest }) {
  const textRef = useRef(null);
  const { fieldName, defaultValue, registerField, } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textRef,
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

  return <TextArea ref={textRef} defaultValue={defaultValue} {...rest} />
}