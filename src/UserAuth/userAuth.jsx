import React, { useState } from 'react';
import './userAuth.css';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
    MDBTabsContent
} from 'mdb-react-ui-kit';
import logo from '../Images/logo.svg';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom'
import { SIGNIN_URL, SIGNUP_URL } from '../URLconstants';

const UserAuth = () => {
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [btndisabled, setbtnDisabled] = useState(false)
    const [userName, setUserName] = useState('');
    const [passWord, setPassword] = useState('');

    const history = useHistory();

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
        setUserName('');
        setPassword('');
    };
    const onChangeText = (e, type) => {
        if (type === 'username') {
            setUserName(e.target.value)
        }
        if (type === 'password') {
            setPassword(e.target.value)
        }
    }

    const onSignup = async () => {
        setbtnDisabled(true)
        try {
            const response = await axios({ method: 'post', url: SIGNUP_URL, data: { username: userName, password: passWord } });
            if (response && response.status === 200) {
                toast.success("Registered Succesfully")
                setJustifyActive('tab1');

            }
        }

        catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error('No response received from the server');
            } else {
                toast.error('Error: ' + error.message);
            }

        }
        setbtnDisabled(false)
        setUserName('');
        setPassword('');

    }
    const onSignIn = async () => {
        setbtnDisabled(true)
        try {
            const response = await axios({
                method: 'post',
                url: SIGNIN_URL,
                data: { username: userName, password: passWord }
            });

            if (response && response.status === 200) {
                const token = response.data.token;
                history.push('/questions');
                toast.success('LogIn successful');
                localStorage.setItem('token', token);

            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error('No response received from the server');
            } else {
                toast.error('Error: ' + error.message);
            }
            setUserName('');
            setPassword('');
        }
        setbtnDisabled(false)

    }
    return (
        <div className='bg-color'>
            <MDBContainer fluid className="">
                <MDBRow>
                    <MDBCol col='10' md='6' style={{ paddingLefteft: '39px' }}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            className="custom-img" alt="" style={{ width: '170%', height: '100%' }} />
                    </MDBCol>
                    <MDBCol col='4' md='6'>
                        <div className='vertical-center border-style'>
                            <div className='d-flex flex-row'><img src={logo} alt="logo" className="" />
                                <p className='logo-header'>SenereMindz</p>
                            </div>
                            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                                <MDBTabsItem>
                                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'} className='header-title bg-color-cus'>
                                        Login
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'} className='header-title bg-color-cus'>
                                        Register
                                    </MDBTabsLink>
                                </MDBTabsItem>
                            </MDBTabs>

                            <MDBTabsContent>
                                <MDBTabsPane show={justifyActive === 'tab1'}>
                                    <p className='margin-bottom2'>Username</p>
                                    <MDBInput wrapperClass='mb-4' type='text' placeholder="username" onChange={(e) => onChangeText(e, 'username')} />
                                    <p className='margin-bottom2'>Password</p>
                                    <MDBInput wrapperClass='mb-4' type='password' placeholder="password" onChange={(e) => onChangeText(e, 'password')} />
                                    <button className='btn-sign' onClick={() => {onSignIn()}}disabled={btndisabled}>Sign In</button>
                                    <p className="text-center">Not a member? <a href="#!" onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>Register</a></p>

                                </MDBTabsPane>

                                <MDBTabsPane show={justifyActive === 'tab2'}>
                                    <p className='margin-bottom2'>Username</p>
                                    <MDBInput wrapperClass='mb-4' type='text' onChange={(e) => onChangeText(e, 'username')} value={userName} />
                                    <p className='margin-bottom2'>Password</p>
                                    <MDBInput wrapperClass='mb-4' type='password' onChange={(e) => onChangeText(e, 'password')} value={passWord} />
                                    <button className='btn-sign' onClick={() => onSignup()} disabled={btndisabled}>Sign Up</button>

                                </MDBTabsPane>

                            </MDBTabsContent>
                        </div>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </div>
    );
}

export default UserAuth;