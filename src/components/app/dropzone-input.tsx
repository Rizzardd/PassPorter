import { useCallback, useEffect } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { Field } from '../ui/field'
import { Flex, Text } from '@chakra-ui/react'
import { FiImage } from 'react-icons/fi'

export type DropzoneInputProps = {
  name: string
  accept: Accept
}

export function DropzoneInput({ name }: DropzoneInputProps) {
  const inputBg = '#1b1b1b'
  const activeColor = 'green.400'
  const { register, unregister, setValue, watch } = useFormContext()
  const files = watch(name)
  const onDrop = useCallback(
    (droppedFiles: File[]) => {
      setValue(name, droppedFiles, { shouldValidate: true })
    },
    [setValue, name]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  })
  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    <Field label="Adicione uma imagem ou banner do seu evento">
      <Flex
        w="100%"
        borderWidth={2}
        borderStyle="dashed"
        borderColor={isDragActive ? activeColor : 'gray.300'}
        borderRadius="md"
        p={8}
        justify="center"
        textAlign="center"
        bg={inputBg}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Flex direction="column" align="center" justify="center">
          <FiImage size={24} />
          <Text mt={2}>Trocar Imagem</Text>
          <Text fontSize="sm" color="gray.400" mt={2}>
            Clique ou arraste a imagem aqui
          </Text>
        </Flex>
      </Flex>
    </Field>
  )
}
