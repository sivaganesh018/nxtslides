import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class NxtSlides extends Component {
  state = {
    slidesList: initialSlidesList,
    activeSlideId: initialSlidesList[0].id,
    activeHeadingInput: false,
    activeDescriptionInput: false,
  }

  renderNavBar = () => (
    <nav className="nav-bar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
        alt="nxt slides logo"
        className="nxt-slides-logo"
      />
      <h1 className="nav-bar-heading">Nxt Slides</h1>
    </nav>
  )

  renderSlidesList = () => {
    const {slidesList, activeSlideId} = this.state

    return (
      <ol className="slides-list-container">
        {slidesList.map(eachSlide => {
          const slideNumber = slidesList.indexOf(eachSlide) + 1

          const activeSlideClassName =
            activeSlideId === eachSlide.id
              ? 'active-slide slides-list-item'
              : 'slides-list-item'

          const onClickChangeActiveTabFromSlidesBar = () => {
            this.setState({
              activeSlideId: eachSlide.id,
              activeHeadingInput: false,
              activeDescriptionInput: false,
            })
          }

          return (
            <li
              key={eachSlide.id}
              className={activeSlideClassName}
              testid={`slideTab${slideNumber}`}
              onClick={onClickChangeActiveTabFromSlidesBar}
            >
              <p className="slide-index">{slideNumber}</p>
              <div className="slide-card">
                <h1 className="slide-card-heading">{eachSlide.heading}</h1>
                <p className="slide-card-description">
                  {eachSlide.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  onClickChangeHeadingElement = () => {
    this.setState({activeHeadingInput: true})
  }

  onClickChangeDescriptionElement = () => {
    this.setState({activeDescriptionInput: true})
  }

  onBlurChangeHeadingElement = () => {
    this.setState({
      activeHeadingInput: false,
    })
  }

  onBlurChangeDescriptionElement = () => {
    this.setState({activeDescriptionInput: false})
  }

  onChangeHeadingValue = event => {
    const {activeSlideId} = this.state
    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(eachSlide => {
        if (eachSlide.id === activeSlideId) {
          return {...eachSlide, heading: event.target.value}
        }
        return eachSlide
      }),
    }))
  }

  onChangeDescriptionValue = event => {
    const {activeSlideId} = this.state
    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(eachSlide => {
        if (eachSlide.id === activeSlideId) {
          return {...eachSlide, description: event.target.value}
        }
        return eachSlide
      }),
    }))
  }

  renderDisplaySlide = () => {
    const {
      activeSlideId,
      slidesList,
      activeHeadingInput,
      activeDescriptionInput,
    } = this.state
    const cardDetails = slidesList.filter(
      eachSlide => eachSlide.id === activeSlideId,
    )
    const {heading, description} = cardDetails[0]

    const headingElement = activeHeadingInput ? (
      <input
        type="text"
        onChange={this.onChangeHeadingValue}
        onBlur={this.onBlurChangeHeadingElement}
        value={heading}
        className="input-container"
      />
    ) : (
      <h1
        className="display-slide-heading"
        onClick={this.onClickChangeHeadingElement}
      >
        {heading}
      </h1>
    )
    const descriptionElement = activeDescriptionInput ? (
      <input
        type="text"
        onChange={this.onChangeDescriptionValue}
        onBlur={this.onBlurChangeDescriptionElement}
        value={description}
        className="input-container"
      />
    ) : (
      <p
        className="display-slide-description"
        onClick={this.onClickChangeDescriptionElement}
      >
        {description}
      </p>
    )

    return (
      <div className="display-slide-content-container">
        {headingElement}
        {descriptionElement}
      </div>
    )
  }

  onClickAddNewSlide = () => {
    const {slidesList, activeSlideId} = this.state

    const newSlide = {
      id: uuidv4(),
      heading: 'heading',
      description: 'description',
    }

    const activeSlideIndex = slidesList.findIndex(eachSlide => {
      if (activeSlideId === eachSlide.id) {
        return true
      }
      return false
    })

    const lengthOfList = slidesList.length

    console.log([
      ...slidesList.slice(0, activeSlideIndex + 1),
      newSlide,
      ...slidesList.slice(activeSlideIndex + 1, lengthOfList),
    ])

    this.setState(prevState => ({
      slidesList: [
        ...prevState.slidesList.slice(0, activeSlideIndex + 1),
        newSlide,
        ...prevState.slidesList.slice(activeSlideIndex + 1, lengthOfList),
      ],
      activeSlideId: newSlide.id,
    }))
  }

  render() {
    return (
      <>
        {this.renderNavBar()}
        <div className="content-container">
          <button
            type="button"
            className="new-btn"
            onClick={this.onClickAddNewSlide}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
              className="plus-icon"
            />
            <p className="btn-text">New</p>
          </button>
          <div className="slides-content-container">
            <div className="slides-container">{this.renderSlidesList()}</div>
            <div className="display-slide-container">
              {this.renderDisplaySlide()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default NxtSlides
