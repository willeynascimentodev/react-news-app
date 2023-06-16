import LoginForm from "../components/LoginForm";
import NavMenu from "../components/NavMenu";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { reset } from '../resources/login/login.slice';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

function SignUp() {
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
            toast.success('successfully created');
			navigate('/sign-up');
		}

		dispatch(reset);

	}, [navigate, isError, isSuccess, user, isLoading, dispatch]);

	return (
		<>
			<NavMenu />
                
            <Loading loading={isLoading} />
            
			<div className="container">
				<h2 className="text-center">Create Your Account</h2>
				<LoginForm isRegister={true}/>
			</div>
		</>
	)
}

export default SignUp;