import React, { useRef, useState } from 'react';
import { Input } from './atoms/input';
import closeIcon from '../assets/icons/close-icon.svg';
import heartIcon from '../assets/icons/heart-icon.svg';
import heartIconFull from '../assets/icons/heart-icon-full.svg';
import gsap from 'gsap';
import '../styles/Button.scss';
import '../styles/OfferSection.scss';

const OfferSection = (props) => {
    const { extraClass, id } = props;
    const form = useRef(null);
    const btn = useRef(null);
    const container = useRef(null);
    const btnIconStates = { state1: 'unset', state2: 'loading', state3: 'success', state4: 'fail' }
    let [btnIcon, setBtnIcon] = useState(btnIconStates.state1)
    const recepieImg = 'https://firebasestorage.googleapis.com/v0/b/luispalomo-b0f22.appspot.com/o/empanadas-caseras.jpg?alt=media&token=268f25e4-d8f2-4a20-88c6-342f30e229dc'
    const URL = 'https://jsonplaceholder.typicode.com/posts';

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        }) 
    }

    const buttonAnimation = (status) => {
        const changeState = (state) => {
            setBtnIcon(state)
        }
        if(status === btnIconStates.state2) {
            container.current.style.cursor = 'wait'
            btn.current.style.cursor = 'wait'
            form.current[0].style.cursor = 'wait'
            form.current[1].style.cursor = 'wait'
            form.current[0].disabled = true
            form.current[1].disabled = true
            gsap.to(btn.current, { duration: 0.3, color: '#ffffff00', ease: 'Power2.easeInOut',
                onComplete: changeState, onCompleteParams: [btnIconStates.state2] })
        }
        if(status === btnIconStates.state3) {
            container.current.style.cursor = 'auto'
            btn.current.style.cursor = 'auto'
            form.current[0].style.cursor = 'auto'
            form.current[1].style.cursor = 'auto'
            changeState(btnIconStates.state3)
            gsap.to(btn.current, { duration: 0.3, color: '#51fac2', ease: 'Power2.easeInOut' })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(form.current);
        const data = {
            username: formData.get('name'),
            email: formData.get('email')
        }
        
        if(btnIcon !== btnIconStates.state3) {

            //Validate form data
            form.current[1].style.border = 'none'
            if (data.email.search('@') === -1) {
                console.log('Email failed')
                form.current[1].style.border = '1px red solid'
                return
            }

            buttonAnimation(btnIconStates.state2)

            await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }).then(res => {
                res.json()
                buttonAnimation(btnIconStates.state3)
            }).then(json => {
                console.log(json)
            }).catch(error => {
                console.error(error.message)
            })
        }
    }
    
    return (
        <div id={id} ref={container} className={"offerSection flex-center " + extraClass}>
            <div className="bg">
                <div className="bgColor1"></div>
                <div className="bgColor2"></div>
                <div className="bgColor3"></div>
                <div className="bgColor4"></div>
                <div className="bgColor5"></div>
            </div>
            <button className='closeBtn' onClick={ scrollUp }>
                <img src={closeIcon} alt="close-icon" />
            </button>
            <div className="recepie-content">
                <img src={recepieImg} alt="recepie-image" />
                <div className="recepie-info">
                    <img src={heartIcon} alt="like icon" />
                    <img src={heartIconFull} alt="like icon" className='opacity-0'/>
                    <h4>Empanadas caseras</h4>
                    <p>Likes: 236,587</p>
                    <p>Views: 3,433,012</p>
                </div>
            </div>
            <div className="form-container">
                <h2 className="offer-title">Get your first recepie by suscribe!</h2>
                <form action="/" ref={ form }>
                    <label htmlFor="name">Your name here:</label>
                    <Input name="name" type="text" extraClass="" max="30"/>
                    <label htmlFor="email">Your email here:</label>
                    <Input name="email" type="email" extraClass="" max="30"/>
                    <button
                        ref={btn}
                        type='submit'
                        className='btn dark'
                        onClick={ handleSubmit }>
                            { btnIcon === btnIconStates.state1 ? 'SUSCRIBE' : 'SENT! THNAK YOU'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OfferSection;