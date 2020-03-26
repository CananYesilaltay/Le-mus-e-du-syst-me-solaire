import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import iconTypeSource from '../images/ICONS/icon-type.svg'
import iconSunDistanceSource from '../images/ICONS/icon-distance-soleil.svg'
import iconRotationPeriodSource from '../images/ICONS/icon-periode-de-rotation.svg'
import iconRevolutionPeriodSource from '../images/ICONS/icon-periode-de-revolution.svg'
import iconRayonSource from '../images/ICONS/icon-rayon.svg'
import iconMassSource from '../images/ICONS/icon-masse.svg'
import iconTemperatureSource from '../images/ICONS/icon-temperature.svg'
import iconAstrologySource from '../images/ICONS/icon-astrologie.svg'


export default class Fiche
{
    constructor( planetName, planetSubtitle, planetOrigins, planetType, planetSunDistance, planetRotationPeriod, planetRayon, planetRevolutionPeriod, planetMass, planetTemperature, planetAstrology)
    {
        this.planetName = planetName
        this.planetSubtitle = planetSubtitle
        this.planetOrigins = planetOrigins
        this.planetType = planetType
        this.planetSunDistance = planetSunDistance
        this.planetRotationPeriod = planetRotationPeriod
        this.planetRayon = planetRayon
        this.planetRevolutionPeriod = planetRevolutionPeriod
        this.planetMass = planetMass
        this.planetTemperature = planetTemperature
        this.planetAstrology = planetAstrology

        this.group = new THREE.Group()

        // Fiche container
    const infoContainer = document.createElement('div')
    infoContainer.classList.add('container')

    // Title
    const ficheName = document.createElement('div')
    ficheName.classList.add('ficheName')
    infoContainer.appendChild(ficheName)
    const nameTitle = document.createElement ('h1')
    nameTitle.textContent = planetName
    ficheName.appendChild(nameTitle)
    const nameSubtitle = document.createElement ('p')
    nameSubtitle.classList.add('subtitle')
    nameSubtitle.textContent = planetSubtitle
    ficheName.appendChild(nameSubtitle)

    // Origins
    const ficheOrigins = document.createElement('div')
    ficheOrigins.classList.add('origins')
    infoContainer.appendChild(ficheOrigins)
    const originsTitle = document.createElement('h4')
    originsTitle.textContent = "D'où vient son nom ?"
    ficheOrigins.appendChild(originsTitle)
    const originsText = document.createElement('p')
    originsText.textContent = planetOrigins
    ficheOrigins.appendChild(originsText)

    // General container
    const generalInfosContainer = document.createElement('div')
    generalInfosContainer.classList.add('general-info-container')
    infoContainer.appendChild(generalInfosContainer)

        // Type info
    const planetTypeContainer = document.createElement('div')
    planetTypeContainer.classList.add('general-info')
    generalInfosContainer.appendChild(planetTypeContainer)
    const iconType = document.createElement('img')
    iconType.classList.add('icons')
    iconType.src = iconTypeSource
    planetTypeContainer.appendChild(iconType)
    const textType = document.createElement('p')
    textType.textContent = planetType
    planetTypeContainer.appendChild(textType)
        // SunDistance
    const planetSunDistanceContainer = document.createElement('div')
    planetSunDistanceContainer.classList.add('general-info')
    generalInfosContainer.appendChild(planetSunDistanceContainer)
    const iconSunDistance = document.createElement('img')
    iconSunDistance.classList.add('icons')
    iconSunDistance.src = iconSunDistanceSource
    planetSunDistanceContainer.appendChild(iconSunDistance)
    const textSunDistance = document.createElement('p')
    textSunDistance.textContent = planetSunDistance
    planetSunDistanceContainer.appendChild(textSunDistance)
        // Rotation Period
    const planetRotationPeriodContainer = document.createElement('div')
    planetRotationPeriodContainer.classList.add('general-info')
    generalInfosContainer.appendChild(planetRotationPeriodContainer)
    const iconRotationPeriod = document.createElement('img')
    iconRotationPeriod.classList.add('icons')
    iconRotationPeriod.src = iconRotationPeriodSource
    planetRotationPeriodContainer.appendChild(iconRotationPeriod)
    const textRotationPeriod = document.createElement('p')
    textRotationPeriod.textContent = planetRotationPeriod
    planetRotationPeriodContainer.appendChild(textRotationPeriod)
        // Rayon
    const planetRayonContainer = document.createElement('div')
    planetRayonContainer.classList.add('general-info')
    generalInfosContainer.appendChild(planetRayonContainer)
    const iconRayon = document.createElement('img')
    iconRayon.classList.add('icons')
    iconRayon.src = iconRayonSource
    planetRayonContainer.appendChild(iconRayon)
    const textRayon = document.createElement('p')
    textRayon.textContent = planetRayon
    planetRayonContainer.appendChild(textRayon)
        // Revolution Period
    const planetRevolutionPeriodContainer = document.createElement('div')
    planetRevolutionPeriodContainer.classList.add('general-info')
    generalInfosContainer.appendChild(planetRevolutionPeriodContainer)
    const iconRevolutionPeriod = document.createElement('img')
    iconRevolutionPeriod.classList.add('icons')
    iconRevolutionPeriod.src = iconRevolutionPeriodSource
    planetRevolutionPeriodContainer.appendChild(iconRevolutionPeriod)
    const textRevolutionPeriod = document.createElement('p')
    textRevolutionPeriod.textContent = planetRevolutionPeriod
    planetRevolutionPeriodContainer.appendChild(textRevolutionPeriod)
        // Masse
    const planetMassContainer = document.createElement('div')
    planetMassContainer.classList.add('general-info')
    generalInfosContainer.appendChild(planetMassContainer)
    const iconMass = document.createElement('img')
    iconMass.classList.add('icons')
    iconMass.src = iconMassSource
    planetMassContainer.appendChild(iconMass)
    const textMass = document.createElement('p')
    textMass.textContent = planetMass
    planetMassContainer.appendChild(textMass)
        // Temperature
    const planetTemperatureContainer = document.createElement('div')
    planetTemperatureContainer.classList.add('general-info')
    generalInfosContainer.appendChild(planetTemperatureContainer)
    const iconTemperature = document.createElement('img')
    iconTemperature.classList.add('icons')
    iconTemperature.src = iconTemperatureSource
    planetTemperatureContainer.appendChild(iconTemperature)
    const textTemperature = document.createElement('p')
    textTemperature.textContent = planetTemperature
    planetTemperatureContainer.appendChild(textTemperature)
        // Astrology
    const planetAstrologyContainer = document.createElement('div')
    planetAstrologyContainer.classList.add('general-info')
    generalInfosContainer.appendChild(planetAstrologyContainer)
    const iconAstrology = document.createElement('img')
    iconAstrology.classList.add('icons')
    iconAstrology.src = iconAstrologySource
    planetAstrologyContainer.appendChild(iconAstrology)
    const textAstrology = document.createElement('p')
    textAstrology.textContent = planetAstrology
    planetAstrologyContainer.appendChild(textAstrology)

    const info = new CSS2DObject( infoContainer );
    info.position.set( 0, 0 , 0 )
    this.group.add(info)
    }
}
