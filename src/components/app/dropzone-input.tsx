import { ReactNode, useCallback, useEffect } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { Field } from '../ui/field'
import { Flex, Image, Text } from '@chakra-ui/react'
import { FiImage } from 'react-icons/fi'

export type DropzoneInputProps = {
  name: string
  accept: Accept
  label: ReactNode
}

export function DropzoneInput({ label, name, accept }: DropzoneInputProps) {
  const inputBg = '#1b1b1b'
  const activeColor = 'green.400'
  const { register, unregister, setValue, watch } = useFormContext()
  const file = watch(name)
  const onDrop = useCallback(
    (droppedFiles: File[]) => {
      let file = droppedFiles?.[0]

      if (file) {
        file = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      }

      setValue(name, file, { shouldValidate: true })
    },
    [setValue, name]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  })
  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    <Field label={label}>
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
          {file?.preview ? (
            <Image src={file?.preview} maxW="100%" maxH="100%" />
          ) : (
            <>
              <FiImage size={24} />
              <Text mt={2}>Trocar Imagem</Text>
              <Text fontSize="sm" color="gray.400" mt={2}>
                Clique ou arraste a imagem aqui
              </Text>
            </>
          )}
        </Flex>
      </Flex>
    </Field>
  )
}
