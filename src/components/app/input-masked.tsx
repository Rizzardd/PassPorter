import { Input, InputProps } from '@chakra-ui/react'
import { useMask } from '@react-input/mask'

export interface InputMaskedProps extends InputProps {
  mask: string
}

export function InputMasked({ mask, ...props }: any) {
  const inputRef = useMask({
    mask,
    replacement: { _: /\d/ },
  })

  return <Input ref={inputRef} {...props} />
}
