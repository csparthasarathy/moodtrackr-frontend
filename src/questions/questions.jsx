import React, { useEffect, useState } from 'react';
import './questions.css'
import Header from '../Header/header';
import Iframe from 'react-iframe';
import axios from 'axios';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
  } from 'mdb-react-ui-kit';
import { GETQUESTIONNAIRE,SUBMITANSWERS } from '../URLconstants';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const user=localStorage.getItem('user')
let PREDICTMOOD=`https://serenemindz-moodprediction.streamlit.app/?embedded=true&user=${user}`
//let PREDICTMOOD=`http://localhost:8501/?embedded=true&user=${user}`

const Questions = () => {
    let [qAnswers, setQAnswers] = useState([{}])
    let [current, setCurrent] = useState(0);
    let [totalQues, setTotalQues] = useState()
    const [basicModal, setBasicModal] = useState(false);

    const OPTIONS = [1, 2, 3, 4];
    const history = useHistory();

    useEffect(() => {
        async function getQuestions() {
            const token = localStorage.getItem("token")
            if (token && token.length) {
                try {
                    const response = await axios({ method: 'get', url: GETQUESTIONNAIRE, headers: { 'Authorization': 'Bearer ' + token } });
                    if (response && response.status === 200) {
                        setTotalQues(response.data.QuestionnaireList.length)
                        setQAnswers(response.data.QuestionnaireList.map(i => ({ ...i, answer: '' })))
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
            } else {
                toast.error('You have been signed out due to invalid token. Please sign in again')
                history.push('/')
            }
        }
        getQuestions();
    }, [history]);

    const onRadioClick = (id, option) => {
        const newAns = qAnswers.map((i) => {
            if (i._id === id) {
                return { ...i, answer: option }
            }
            return i;
        })
        setQAnswers(newAns)
    }
    const toggleShow = () => setBasicModal(!basicModal);

    const onNextClick = () => {
        if (current <= totalQues) {
            setCurrent(current + 1)
        }
    }

    const onPrevClick = () => {
        if (current >= 1) {
            setCurrent(current - 1)
        }

    }

    const onSubmit = async () => {
        const noAns = qAnswers.filter(i => i.answer === '');
        const token = localStorage.getItem("token")
        if (noAns && noAns.length) {
            toast.error("Please answer all the questions")
        } else {
            let qformat = {}
            qAnswers.forEach((i, index) => {
                const qid = `q${index + 1}`
                qformat = { ...qformat, [qid]: i.answer }
            })
            try {
                const response = await axios({
                    method: 'post',
                    url: SUBMITANSWERS,
                    data: { ...qformat },
                    headers: { 'Authorization': 'Bearer ' + token }
                });

                if (response && response.status === 200) {
                    toast.success("Success")
                    setBasicModal(!basicModal);
                    const newAns = qAnswers.map((i) => {
                            return { ...i, answer: ''}
                    })
                    setQAnswers(newAns)
                    setCurrent(0)
                }
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message);
                } else if (error.request) {
                    toast.error('No response received from the server');
                } else {
                    toast.error('Error: ' + error.message);
                }
            }
        }

    }
    const onloadQuestions = () => {
        if (qAnswers && qAnswers.length) {
            const currentQues = qAnswers[current]
            return (
                <>
                    <div class="d-flex justify-content-between p-4">
                        <p class="p-2" style={{ fontWeight: 'bold' }}>{`Question ${current + 1}`}</p>
                        <p class="p-2" style={{ fontWeight: 'bold' }}>{`${current + 1} of ${totalQues}`}</p>
                    </div>
                    <p style={{ paddingLeft: '50px' }}>
                        {`${currentQues.question}`}
                    </p>
                    {OPTIONS.map((i) => {
                        return (
                            <>
                                <div style={{ marginLeft: '60px' }} className='p-3'>
                                    <input class="form-check-input" type="radio" name={`flexRadioDefault${i}`} id={i} checked={currentQues.answer === i} style={{ borderColor: 'black' }} onClick={() => { onRadioClick(currentQues._id, i) }} />
                                    <label class="form-check-label" for={`flexRadioDefault${i}`} style={{ paddingLeft: '15px' }}>
                                        {i}
                                    </label>
                                </div>
                            </>
                        )
                    })}
                    <div class="d-flex justify-content-between p-5">
                        <button class="btn btn-primary" type="button" onClick={() => onPrevClick()}>Previous</button>
                        {(current + 1) === totalQues ?
                            <button class="btn btn-primary" type="button" onClick={() => onSubmit()}>Submit</button>
                            : <button class="btn btn-primary" type="button" onClick={() => onNextClick()}>Next</button>}
                    </div>
                </>
            )

        }
    }
    return (
        <>
            <Header />
            <div className='align-items-center'>
                <p className='logo-header mt-4' style={{ fontSize: '40px' }}>Mental Well-being Questionnaire</p>
            </div>
            {onloadQuestions()}
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' >
                <MDBModalDialog size="lg" style={{'height':'500px'}}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Prediction</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody><Iframe url={PREDICTMOOD} width='100%' height='100%'/></MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
};
export default Questions;