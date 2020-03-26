import './style/main.styl'
import imageSource from './images/astro-rocket.svg'


const popUpBackground = document.createElement('div')
popUpBackground.classList.add('pop-up-background')
document.body.appendChild(popUpBackground)

const popUpContainer = document.createElement('div')
popUpContainer.classList.add('pop-up-container')
popUpBackground.appendChild(popUpContainer)

const spatiumTitle = document.createElement('h1')
popUpContainer.appendChild(spatiumTitle)
spatiumTitle.textContent = 'SPATIUM'

const spatiumText = document.createElement('p')
popUpContainer.appendChild(spatiumText)
spatiumText.textContent = 'Bienvenue dans Spatium, jeune spationaute ! Je suis là pour t’apprendre les merveilles de notre magnifique système solaire ! Prêt pour l’aventure ? '

const astroRocket = new Image()
astroRocket.src = imageSource
popUpContainer.appendChild(astroRocket)

const popUpButton = document.createElement('div')
popUpButton.classList.add('pop-up-button')
popUpContainer.appendChild(popUpButton)

const popUpButtonContent = document.createElement('h3')
popUpButtonContent.classList.add('pop-up-button-content')
popUpButtonContent.textContent = 'Allons y !'
popUpButton.appendChild(popUpButtonContent)

popUpButton.addEventListener('click', () =>
{
    popUpBackground.classList.add('hidden-item')
})