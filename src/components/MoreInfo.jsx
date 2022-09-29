import React, { useRef, useEffect } from 'react';
import '../styles/MoreInfo.scss';
import icon1 from '../assets/icons/icon1.svg';
import icon2 from '../assets/icons/icon2.svg';
import icon3 from '../assets/icons/icon3.svg';
import icon4 from '../assets/icons/icon4.svg';
import OfferSection from './OfferSection';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MoreInfo = () => {
    const igdRef = useRef();
    const icn = gsap.utils.selector(igdRef)

    const moveDown = () => {
        window.scrollTo({
            top: 1000,
            left: 0,
            behavior: 'smooth'
        })
    }
    useEffect(()=> {
        gsap.from(icn(".icn-icon"), { delay: 1, duration:1, translateY: -30, opacity:0, stagger: {
            from: "end",
            each: 0.2
        }})
    }, [])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.popUp-container',
                start: 'top 89%',
                end: 'top 15%',
                scrub: true
            }
        })

        tl.to(['.popUp-container', '.popUp-cta'], { duration: 0.6, width: 'calc(100% + 4px)', x: -2, ease: 'Power1.easeOut', delay: 0.1 })
        tl.to('.ingredients', { duration: 1, y: -60, opacity: 0, ease: 'Power1.easeOut'}, '<')
        tl.to('.popUp-container',
            { duration: 0.4, height: 'calc(100% + 4px)', y: -2, ease: 'Power1.easeInOut' }, '>+=1')
        tl.to('#popUpCta', { duration: 0.3, opacity: 0 }, '<')
        tl.set('#popUpCta', { display: 'none' }, '>')
        tl.set('#offerSection', { display: 'flex', opacity: 1 }, '<')
        tl.from('#offerSection .bg', { duration: 0.6, opacity: 0, ease: 'Power1.easeIn' }, '>')
        tl.from(['#offerSection .recepie-content', '#offerSection .form-container'],
            { duration: 0.6, opacity: 0, ease: 'Power1.easeIn' }, '>+=1')
    })


    return (
        <article className="info-container">
            <div className="popUp-container">
                <button className='popUp-cta' id='popUpCta' onClick={moveDown}>
                    Find more recepies
                </button>
                <OfferSection id="offerSection" extraClass="opacity-0 display-none"/>
            </div>
            <div className="ingredients" ref={igdRef}>
                <img src={icon1} alt="ingredient-icon-1" className='icn-icon'/>
                <img src={icon2} alt="ingredient-icon-2" className='icn-icon'/>
                <img src={icon3} alt="ingredient-icon-3" className='icn-icon'/>
                <img src={icon4} alt="ingredient-icon-4" className='icn-icon'/>
            </div>
        </article>
    )
}

export { MoreInfo }