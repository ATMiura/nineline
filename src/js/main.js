import './vendor';
import './helpers';
import './components/social';
import './components/animations';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';

import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';
import {BtnUp} from './components/btnUp'
import {customEvents} from "./components/customEvents";

ieFix();
vhFix();
actualYear();
scrollToAnchor.init();

header.init();
lazyLoading.init();

document.addEventListener('DOMContentLoaded', () => {
	customEvents()

	setTimeout(() => {
		new BtnUp
	}, 3)


	window.addEventListener('optimizedScroll', function() {
		console.log('Resource conscious scroll callback!');
	});
})
