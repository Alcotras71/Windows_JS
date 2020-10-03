import { openModal, closeModal } from './modals';

const images = () => {
	const imgPopup = document.createElement('div'),
			workSection = document.querySelector('.works'),
			bigImage = document.createElement('img');

	imgPopup.classList.add('popup');
	workSection.appendChild(imgPopup);

	imgPopup.style.justifyContent = 'center';
	imgPopup.style.alignItems = 'center';
	imgPopup.style.display = 'none';
	bigImage.style.maxWidth = '600px';
	bigImage.style.maxHeight = '500px';

	imgPopup.appendChild(bigImage);

	workSection.addEventListener('click', (e) => {
		e.preventDefault();

		let target = e.target;

		if ( target && target.classList.contains('preview')) {
			openModal(imgPopup, 'flex')
			imgPopup.classList.add('animated','fadeIn');
			const path = target.parentNode.getAttribute('href');
			bigImage.setAttribute('src', path);
		}

		if (target && target.matches('div.popup')) {
			closeModal(imgPopup);
		}
	});
};

export default images;