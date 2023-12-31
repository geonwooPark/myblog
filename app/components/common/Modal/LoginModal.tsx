'use client'

import React, { useEffect, useState } from 'react'
import Input from '../../common/Input'
import { FcGoogle } from 'react-icons/fc'
import Button from '../../common/Button'
import { toast } from 'react-toastify'
import { useSignUpModalActions } from '@/app/hooks/store/useSignUpModalStore'
import { signIn } from 'next-auth/react'
import {
  useLoginModalActions,
  useLoginModalIsOpen,
} from '@/app/hooks/store/useLoginModalStore'
import Modal from './Modal'

export default function LoginModal() {
  const loginModalIsOpen = useLoginModalIsOpen()
  const { onClose: closeLoginModal } = useLoginModalActions()
  const { onOpen: openSignUpModal } = useSignUpModalActions()

  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const { email, password } = values
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  })
  const [isLoading, setisLoading] = useState(false)
  const [isLoading2, setisLoading2] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const onSubmit = async () => {
    setisLoading(true)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/

    try {
      if (!email || email.trim() === '') {
        setFocus({ ...focus, email: true })
        throw new Error('이메일을 입력해주세요.')
      }
      if (!emailRegex.test(email)) {
        setFocus({ ...focus, email: true })
        throw new Error('잘못된 이메일 형식입니다.')
      }
      if (!password || password.trim() === '') {
        setFocus({ ...focus, password: true })
        throw new Error('비밀번호를 입력해주세요.')
      }
      if (
        parseInt(password.length.toString(), 10) < 8 ||
        !passwordRegex.test(password)
      ) {
        setFocus({ ...focus, password: true })
        throw new Error('비밀번호는 영문을 포함하여 8~15자리이어야 합니다.')
      }

      await signIn('credentials', {
        ...values,
      }).then((callback) => {
        if (callback?.ok) {
          toast.success('로그인에 성공했습니다')
          closeLoginModal()
        }
        if (callback?.error) {
          if (callback.error === '존재하지 않는 회원입니다.') {
            setFocus({ ...focus, email: true })
          }
          if (callback.error === '잘못된 비밀번호입니다.') {
            setFocus({ ...focus, password: true })
          }
          throw new Error(callback.error)
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setisLoading(false)
    }
  }

  const onGoogleClick = async () => {
    setisLoading2(true)
    try {
      await signIn('google').then(() => {
        toast.success('로그인에 성공했습니다')
        closeLoginModal()
      })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setisLoading2(false)
    }
  }

  const bodyContent = (
    <>
      <Input
        type="email"
        name="email"
        value={email}
        placeholder="이메일"
        onChange={onChange}
        className={`mb-2 w-full ${
          focus.email ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="비밀번호"
        onChange={onChange}
        className={`mb-2 w-full ${
          focus.password ? 'border-red-400' : 'border-gray-300'
        }`}
      />
    </>
  )

  const footerContent = (
    <div className="mt-3">
      <hr className="mb-3" />
      <Button
        type="button"
        level="outline"
        size="s"
        fullWidth={true}
        label="구글로 로그인"
        icon={FcGoogle}
        disabled={isLoading2}
        onClick={onGoogleClick}
      />
      <p className="mt-4 text-center text-xs font-light text-gray-500">
        계정이 없으신가요?{' '}
        <span
          onClick={() => {
            closeLoginModal()
            openSignUpModal()
          }}
          className="cursor-pointer font-normal text-gray-800"
        >
          회원가입
        </span>
      </p>
    </div>
  )

  useEffect(() => {
    setFocus({
      email: false,
      password: false,
    })
  }, [email, password])

  return (
    <Modal
      title="로그인"
      body={bodyContent}
      footer={footerContent}
      isOpen={loginModalIsOpen}
      onClose={closeLoginModal}
      onSubmit={onSubmit}
      actionLabel="계속"
      isLoading={isLoading}
    />
  )
}
