import { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader, Lock, Mail } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore.js';
import Input from '../../components/Input.jsx';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminLogin = () => {
	const { login, isLoggingIn } = useAdminStore();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		AOS.init({ duration: 1000, once: true });
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center my-5 text-base-content bg-base-200 px-4">
			<Motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="max-w-md w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden"
			>
				<div className="p-8" data-aos="fade-up">
					<h2 className="text-3xl font-bold mb-6 text-center">
						<span className="text-primary">Admin </span>Login
					</h2>

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

						<Motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
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
						</Motion.button>
					</form>
				</div>

				<div
					className="px-8 py-4 bg-base-200 text-sm flex justify-center"
					data-aos="fade-up"
					data-aos-delay="200"
				>
					<p>
						Doctor Login?{' '}
						<Link to="/doctor-login" className="text-primary hover:underline">
							Click here
						</Link>
					</p>
				</div>
			</Motion.div>
		</div>
	);
};

export default AdminLogin;
