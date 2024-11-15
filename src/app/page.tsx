import React from 'react';
import Image from 'next/image'
import IconWeb from '../../public/IconRemoverBg.png'
import LoginForm from '@/components/Login';

const LoginPage: React.FunctionComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <span className="border-2 bg-[#F0F1F5] rounded-md p-5 md:w-[60%] w-[80%] xl:w-[45%]">
          <div className="flex justify-between pt-2">
            <div className='flex justify-start'>
              <Image src={IconWeb} alt='' className='w-10' />
              <p className='font-bold text-sm'>TodoPlus</p>
            </div>
            <a href="http://localhost:3000/register">
              <p className='underline font-semibold text-sm'>Register</p>
            </a>
          </div>
          <br /><br /><br />
          <p className='font-bold text-center text-lg'>Welcome Back</p>
          <p className='text-center text-sm pt-1'>Enter Your Account Details</p>
          <LoginForm />
        </span>
      </div>
    </>
  );
}

export default LoginPage;