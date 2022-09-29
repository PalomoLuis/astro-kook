const fireBaseAPI = 'https://firebasestorage.googleapis.com/v0/b/luispalomo-b0f22.appspot.com/o/'
const bgUrlXL = fireBaseAPI + 'bg_1.jpg?alt=media&token=af2944d8-ee50-4148-b7ae-d61ee071605f';
const bgUrlM = fireBaseAPI + 'bg_1_1x1.png?alt=media&token=63b6d8de-c49c-4039-afd8-9feba59885a5';
const bgUrlS = fireBaseAPI + 'bg_1_mobile.png?alt=media&token=c95489bd-2f73-4bb7-b1e0-17a0e567e2ee';


function changeBgResponsive (queryselector) {
    const element = document.querySelector(queryselector)

    const changeBg = () => {
        const size = window.innerWidth;
        if (size > 1440) element.style.backgroundImage = `url(${bgUrlXL})`
        if (size <= 1440 && size > 1124) element.style.backgroundImage = `url(${bgUrlXL})`
        if (size <= 1124 && size > 425) element.style.backgroundImage = `url(${bgUrlM})`
        if (size <= 425) element.style.backgroundImage = `url(${bgUrlS})`
    }
    window.addEventListener('resize', changeBg);
    changeBg()
}

export default changeBgResponsive;
