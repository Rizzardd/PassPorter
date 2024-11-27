import { getCities, getStates } from '@brazilian-utils/brazilian-utils'
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
import { NativeSelectRootProps } from '@chakra-ui/react'

export interface CityDropdownProps extends NativeSelectRootProps {
  stateName: string
  name: string
}

export function CityDropdown({ stateName, name, ...props }: CityDropdownProps) {
  const inputBg = '#1b1b1b'
  const { register, unregister, resetField, setValue, watch } = useFormContext()
  const value = watch(name)
  const state = watch(stateName)

  const items = useMemo(() => {
    if (!state) return []

    return getCities(state)
  }, [state])

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
        placeholder={value ? undefined : 'Cidade'}
        items={items}
      />
    </NativeSelectRoot>
  )
}
