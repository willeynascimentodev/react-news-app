import LoginForm from "../components/LoginForm";
import NavMenu from "../components/NavMenu";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { reset } from '../resources/login/login.slice';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

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
			<NavMenu />
			<div className="container">
				<h2 className="text-center">Sign In</h2>
				<LoginForm />
			</div>
		</>
	)
}

export default SignIn;