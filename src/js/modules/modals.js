import calcScroll from './calcScroll';

let marginScroll = calcScroll();

function openModal(selector, display = 'block') {
	selector.style.display = display;
	document.body.style.marginRight = `${marginScroll}px`;
	document.body.classList.add('modal-open');
}

function closeModal(selector) {
		selector.style.display = "none";
		document.body.style.marginRight = '0px';
		document.body.classList.remove('modal-open');
}

const modals = () => {
	let btnPressed = false;

	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]');

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				windows.forEach(item => {
					item.style.display = 'none';
					item.classList.add('animated', 'fadeIn');
				});

				btnPressed = true;

				openModal(modal);
			});
		});

		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			});
		
			closeModal(modal);
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay && modal.style.display == 'block') {
				windows.forEach(item => {
					item.style.display = 'none';
				});

				closeModal(modal);
			}

			if (e.target.getAttribute('data-close') == "") {
				setTimeout(() => {
					closeModal(modal);
				}, 1000);
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(function () {
			openModal(document.querySelector(selector));
		}, time);
	}

	function showModalByScroll(selector) {
		window.addEventListener('scroll', () => {
			let scrollHeight = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);

			if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= 
				  scrollHeight)) {
					openModal(document.querySelector(selector));
					document.querySelector(selector).classList.add('animated', 'fadeIn');
			}
		});
	}

	showModalByScroll('.popup-modal');

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
	
	showModalByTime('.popup-modal' , 60000);

};

export default modals;
export { openModal, closeModal };
