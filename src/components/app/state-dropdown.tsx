import { createListCollection, SelectRootProps } from '@chakra-ui/react'
import { getStates } from '@brazilian-utils/brazilian-utils'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '../ui/select'
import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { StateCode } from '@brazilian-utils/brazilian-utils/dist/common/states'
import { NativeSelectField, NativeSelectRoot } from '../ui/native-select'
export interface StateDropdownProps extends SelectRootProps {
  name: string
}

export function StateDropdown({ name, ...props }: any) {
  const inputBg = '#1b1b1b'
  const { register, unregister, setValue, watch } = useFormContext()
  const value = watch(name)
  const items = useMemo(() => {
    return getStates().map(({ code, name }) => {
      return { label: name, value: code }
    })
  }, [])

  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    <NativeSelectRoot
      borderRadius="32px"
      px="16px"
      bg={inputBg}
      border="none"
      textAlign="center"
      _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
      {...props}
    >
      <NativeSelectField
        value={value}
        bg={inputBg}
        onChange={(x) => setValue(name, x.currentTarget.value)}
        placeholder={value ? undefined : 'Estado'}
        items={items}
      />
    </NativeSelectRoot>
  )
}
