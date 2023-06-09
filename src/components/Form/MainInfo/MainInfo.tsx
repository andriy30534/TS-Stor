import { Field, Form, Formik } from 'formik'
import { FC, useState } from 'react'
import * as Yup from 'yup'

import { useAppSelector } from '../../../hook/reduxHook'

import { Auth } from '../../../api/Api'
import { Button } from '../../Button/Button'
import { Input } from '../../Input/Input'
import { MySelect } from '../../Select/Select'
import s from './MainInfo.module.scss'

export const MainInfo: FC = () => {
	const isUser = useAppSelector(state => state.viewer.user)
	const country = useAppSelector(state => state.getCountry.country)
	const [selectValue, setSelectValue] = useState(() => isUser?.country || '')

	const validateSchema = Yup.object().shape({
		fullName: Yup.string()
			.trim()
			.required('Full name is required')
			.matches(/^[a-zA-Z\s]+$/, 'Invalid full name'),

		email: Yup.string().email('Invalid email').required('Email is required'),

		phone: Yup.string()
			.required('Phone is required')
			.matches(/^(\+)?([0-9]){10,14}$/, 'Invalid phone'),

		city: Yup.string().trim().required('City is required'),

		address: Yup.string().trim().required('Address is required'),
	})

	return (
		<div>
			<Formik
				initialValues={{
					fullName: isUser?.fullName ? isUser?.fullName : '',
					email: isUser?.email ? isUser.email : '',
					phone: isUser?.phone ? isUser?.phone : '',
					city: isUser?.city ? isUser?.city : '',
					address: isUser?.address ? isUser?.address : '',
				}}
				validationSchema={validateSchema}
				onSubmit={values => {
					const data = { ...values, country: selectValue }

					Auth.updateUserAccount(data)
				}}
			>
				{({ errors, touched }) => (
					<Form className={s.form}>
						<Input>
							<Field autoComplete='off' type='text' name='fullName' placeholder='Full Name' />
							{touched.fullName && <div>{errors.fullName}</div>}
						</Input>
						<Input>
							<Field name='email' placeholder='Email' />
							{errors.email && touched.email && <div>{errors.email}</div>}
						</Input>
						<Input>
							<Field type='phone' name='phone' placeholder='Phone Number' />
							{touched.phone && <div>{errors.phone}</div>}
						</Input>

						<MySelect defaultValue={isUser?.country} selectValue={setSelectValue} data={country} />

						<Input>
							<Field type='text' name='city' placeholder='City' />
							{touched.city && <div>{errors.city}</div>}
						</Input>
						<Input>
							<Field type='text' name='address' placeholder='Address' />
							{touched.address && <div>{errors.address}</div>}
						</Input>
						<Button or={true}>
							<span>Save</span>
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
