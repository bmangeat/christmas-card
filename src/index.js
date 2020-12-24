import './styles.css'
import Scene from "./Scene"


const msieversion = () => {

    window.scene = new Scene()


    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {


    }
    else  // If another browser, return 0
    {
        document.querySelector('.user-ie').style.opacity = 0
    }

    return false;
}

msieversion()
