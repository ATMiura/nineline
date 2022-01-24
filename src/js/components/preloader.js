import {gsap, Linear} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';

gsap.registerPlugin(ScrollTrigger);

let imgLoad = imagesLoaded('body');
let preloaderImage = $(".preloader__image");
let preloaderImageWidth = preloaderImage.width();
let images = $("img").length;
let loadedCount = 0;
let loadingProgress = 0;
let tlProgress = gsap.timeline();


imgLoad.on('progress', function () {
	loadProgress();
});

function loadProgress() {
	loadedCount++;
	loadingProgress = (loadedCount / images);

	gsap.to(tlProgress, 1, {progress: loadingProgress});
}

function loadComplete() {
	$('.preloader').fadeOut();
	$('html').removeClass('is-lock-scroll');

	gsap.fromTo($('.candidate__description'), {opacity: 0, y: 30, ease: "none"}, {opacity: 1, y: 0, duration: 1});
}

tlProgress = gsap.timeline({
	paused: true,
	onComplete: loadComplete
})

tlProgress
	.to(preloaderImage, 1, {top: -preloaderImageWidth, right: -preloaderImageWidth})

gsap.set(".resume-personage, .block__head, .experience-item, .education-item, .skill-item, .footer__picture", {opacity: 0, y: 30});

ScrollTrigger.batch(".resume-personage, .block__head, .experience-item, .education-item, .skill-item, .footer__picture", {
	onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),
	onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),

	start: "top 80%",
	end: "bottom 20%",
	markers: false,
});



