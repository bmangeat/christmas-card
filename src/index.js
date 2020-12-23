import './styles.css'
import Scene from "./Scene"


const msieversion = () => {

    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        document.querySelector('.user-ie').style.opacity = 1
        document.querySelector('.main').style.backgroundColor = '#212121'
        let video = document.querySelector('.user-ie')
        video.style.opacity = 1
        video[0].onended = function (  ) {
            this.load()
            this.play()
        }

    }
    else  // If another browser, return 0
    {
       window.scene = new Scene()
    }

    return false;
}

msieversion()
