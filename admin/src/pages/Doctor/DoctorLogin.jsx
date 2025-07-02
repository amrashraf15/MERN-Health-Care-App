import { useState } from 'react'
import { Eye, EyeOff, Loader, Lock, Mail } from 'lucide-react';
import Input from '../../components/Input.jsx'
import { Link } from 'react-router-dom';
import { useDoctorStore } from '../../store/useDoctorStore.js';


const DoctorLogin = () => {
    
        const { login, isLoggingIn } = useDoctorStore();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
		} catch (error) {
			console.log(error);
		}
	};
  return (
    <div className='min-h-screen flex items-center justify-center py-5 text-base-content bg-base-200'>
        <div className='max-w-md w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8'>
                <h2 className='text-3xl font-bold pb-6  text-center'><span className='text-primary'>Doctor{' '}</span>Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
							icon={Mail}
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
                        <div className="relative">
							<Input
								icon={Lock}
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
                
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="size-5 text-base-content/40" />
								) : (
									<Eye className="size-5 text-base-content/40" />
								)}
							</button>
						</div>
                        <button
							type="submit"
							disabled={isLoggingIn}
							className={`btn w-full font-bold transition duration-200 ${
								isLoggingIn
									? 'btn-disabled'
									: 'btn-primary hover:brightness-110'
							}`}
						>
							{isLoggingIn ? (
								<Loader className="animate-spin mx-auto" size={24} />
							) : (
								'Login'
							)}
						</button>
                </form>
            </div>
            <div className="px-8 py-4 bg-base-200 text-sm flex justify-center">
					<p>
						Admin Login?{' '}
						<Link to="/admin-login" className="text-primary hover:underline">
							Click here
						</Link>
					</p>
				</div>
        </div>
    </div>
  )
}

export default DoctorLogin