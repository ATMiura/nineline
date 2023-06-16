import {gsap, Linear} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';
import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
	el: document.querySelector('[data-scroll-container]'),
	smooth: true,
	tablet: {
		smooth: false,
		breakpoint: 0,
	},
	smartphone: {
		smooth: false,
		breakpoint: 0,
	},
	getDirection: true
});
locoScroll.on('scroll', (instance) => {
	ScrollTrigger.update();
	document.documentElement.setAttribute('data-scrolling', instance.direction);
});

ScrollTrigger.scrollerProxy('[data-scroll-container]', {
	scrollTop(value) {
		return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
	},
	pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
});
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();

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

gsap.set(".block__head, .experience-item, .education-item, .skill-item", {opacity: 0, y: 30});

ScrollTrigger.batch(".block__head, .experience-item, .education-item, .skill-item", {
	scroller: "[data-scroll-container]",
	onEnter: batch => {
		gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15})
		locoScroll.update()
	},
	onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15}),

	start: "top 80%",
	end: "bottom 20%",
	scrub: 1,
	duration: 1,
	markers: false,
});

// ScrollTrigger.create({
// 	trigger: 'footer',
// 	onEnter: () => {
// 		console.log('123')
// 		document.querySelector('#btn-up').classList.add('_visible')
// 	},
// 	onLeave: () => {
// 		document.querySelector('#btn-up').classList.remove('_visible');
// 	}
// })

// locoScroll.on('scroll', (position) => {
// 	if ((position.scroll.y) > document.body.offsetHeight) {
// 		document.querySelector('#btn-up').classList.add('_visible')
// 	} else {
// 		document.querySelector('#btn-up').classList.remove('_visible');
// 	}
// });
