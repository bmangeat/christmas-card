import './styles.css'
import Scene from "./Scene"


const msieversion = () => {

    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        console.log('je suis sur IE')
        document.querySelector('.user-ie').style.opacity = 1
        document.querySelector('.main').style.backgroundColor = '#212121'
        let container_video = document.querySelector('.user-ie')
        container_video.style.opacity = 1

    }
    else  // If another browser, return 0
    {
       window.scene = new Scene()
    }

    return false;
}

msieversion()
