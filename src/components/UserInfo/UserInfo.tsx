import { FC, useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useAppSelector } from '../../hook/reduxHook'
import { UserPopup } from '../UserPopup/UserPopap'
import s from './UserInfo.module.scss'

export const UserInfo: FC = () => {
	const [popup, setPopup] = useState(false)
	const [nameUser, setNameUser] = useState('')
	const [logoName, setLogoName] = useState('')
	const user = useAppSelector(state => state.viewer.user)

	useEffect(() => {
		let fullName = ''
		if (user) {
			fullName = user.fullName
		}
		const getName = (name: string) => {
			let fullNameArr = name.split(' ')
			setNameUser(fullNameArr[0])
			if (fullNameArr.length === 2) {
				setLogoName(fullNameArr[0][0] + fullNameArr[1][0])
			} else {
				setLogoName(fullNameArr[0][0])
			}
		}
		getName(fullName)
	}, [user])
	const handelClickPopup: React.MouseEventHandler<HTMLDivElement> = event => {
		setPopup(!popup)
		event.stopPropagation()
	}

	return (
		<div className={s.container}>
			<div className={s.user}>Welcome, {nameUser}!</div>
			<div onClick={handelClickPopup} className={s.logo_user}>
				<div className={s.logo_user_text}>{logoName}</div>
			</div>
			<div className={!popup ? s.arrow : [s.rote, s.arrow].join(' ')}>
				{<MdOutlineKeyboardArrowDown />}
			</div>
			{popup && <UserPopup popup={popup} setPopup={setPopup} user={user} />}
		</div>
	)
}
