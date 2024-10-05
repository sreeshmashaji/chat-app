import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import userSignUp from '../../hooks/userSignUp'

function SignUp() {
	const [inputs,setInputs]=useState({
		fullName:'',
		username:'',

		password:'',

		confirmPassword:'',
		gender:''


	})

	const{loading,signup} = userSignUp();

	const handleCheckBoxChange=(gender)=>{
		setInputs({...inputs,gender})
	}

	const handleSubmit=async (e)=>{
		e.preventDefault()
		console.log(inputs)
		await signup(inputs);
	}
  return (
    
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    SignUp
                    <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                <div>
						<label className='label p-2'>
							<span className='text-base label-text text-yellow-50'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='Damon Salvatore'
							className='w-full input input-bordered  h-10'
							value={inputs.fullName}
							onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}
							
						/>
					</div>
                    <div>
						<label className='label p-2'>
							<span className='text-base label-text text-yellow-50'>Username</span>
						</label>
						<input
							type='text'
							placeholder='damonsalvatore'
							className='w-full input input-bordered  h-10'
							value={inputs.username}
							onChange={(e)=>setInputs({...inputs,username:e.target.value})}
							
						/>
					</div>
                    <div>
						<label className='label p-2'>
							<span className='text-base label-text text-yellow-50'>Password</span>
						</label>
						<input
							type='text'
							placeholder='Enter Password'
							className='w-full input input-bordered  h-10'
							value={inputs.password}
							onChange={(e)=>setInputs({...inputs,password:e.target.value})}
							
						/>
					</div>
                    <div>
						<label className='label p-2'>
							<span className='text-base label-text text-yellow-50'> Confirm Password</span>
						</label>
						<input
							type='text'
							placeholder='Confirm Password'
							className='w-full input input-bordered  h-10'
							value={inputs.confirmPassword}
							onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
							
						/>
					</div>
                    <div className='mt-4'>
                    <GenderCheckBox  onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender} />
                    </div>
                    
                    <div>
                    <Link to='/login'  className='text-sm  hover:underline hover:text-blue-600 mt-3 inline-block text-gray-300'>Already have an account?</Link>

                    </div>

                    <div>
					<button className='btn btn-block btn-sm mt-6' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span>:"Sign Up"}
						
						</button>
					</div>
                </form>
            </div>
            </div>
  )
}

export default SignUp