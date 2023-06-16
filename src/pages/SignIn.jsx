import LoginForm from "../components/LoginForm";
import NavMenu from "../components/NavMenu";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { reset } from '../resources/login/login.slice';

function SignIn() {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { user, isLoading, isSuccess, message, isError } = useSelector(
		(state) => state.login
	);


	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess) {
			navigate('/feed')
		}

		dispatch(reset);

	}, [isError, isSuccess, user, isLoading, dispatch]);

	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			<NavMenu

			/>
			<div className="container">
				<h1 className="text-center">News Agregator Sign In</h1>
				<LoginForm />
			</div>
		</>
	)
}

export default SignIn;