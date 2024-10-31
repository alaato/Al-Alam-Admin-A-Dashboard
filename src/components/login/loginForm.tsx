import { adminLogin, isAdminLoggedIn } from '@/lib/PocketBaseApi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Loader2 } from "lucide-react"

const schema = yup
	.object({
		email: yup.string().email('الرجاء إدخال البريد الإلكتروني الصحيح').required(),
		password: yup.string().min(10, 'يجب أن لا يكون كلمة المرور أقل من 10 أحرف').required('الرجاء إدخال كلمة المرور الصحيحة'),
	})
	.required()
type FormData = yup.InferType<typeof schema>

export default function LoginForm() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	useEffect(() => {
		isAdminLoggedIn().then(setIsLoggedIn)
	}, [])
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), })
	const onSubmit = async (data: FormData) => {
		setIsLoading(true)
		const res = await adminLogin(data.email, data.password)
		if (res.status === 'success') setIsLoggedIn(true)
		else setError(res.message)
		console.log(res)
		setIsLoading(false)
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card className="mx-auto max-w-sm">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Login</CardTitle>
					<CardDescription>
						Enter your email and password to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input {...register('email')} />
							<p className="text-red-500">{errors.email?.message}</p>

						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input {...register('password')} />
							<p className="text-red-500">{errors.password?.message}</p>
						</div>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
						</Button>
					</div>
				</CardContent>
				<CardFooter>
					<p className="text-red-500">{error}</p>

				</CardFooter>
			</Card>
		</form>
	)
}
