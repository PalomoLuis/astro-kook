import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/TitleCont.scss';

const TitleCont = (config) => {

    const contRef = useRef();
    const q = gsap.utils.selector(contRef);
    
    useEffect(() => {
        const tl = gsap.timeline();
        tl.from(q('.copy-1'), { duration: 1, opacity:0, x: -50})
        tl.from(q('.copy-2'), { duration: 1, opacity:0, x: -50}, '<+=0.3')
        tl.from(q('.copy-3'), { duration: 1, opacity:0, x: -50}, '<+=0.3')
    }, [])

    return (
        <article className="title-container" ref={contRef}>
            <p className='copy-1'>{config.preTitle}</p>
            <h1 className="mb-2 copy-2">{config.title}</h1>
            <p className='copy-3'>{config.description}</p>
        </article>
    )
}

export { TitleCont }
