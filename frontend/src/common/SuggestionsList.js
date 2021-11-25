import React from "react"

const SuggestionsList = props => {
  return (
    <div className='sidebar__suggestions'>
      <p className='title'>Suggestions for you</p>
      <div className='fade-edge'>
        <div className='fade-edge__top' />
        <div className='fade-edge__bot' />
        <div className='suggestions-list'>
          {props.data.map(item => {
            return <props.renderComponent key={item.id} {...item} />
          })}
        </div>
      </div>
      <p className='copyrignt-text'>Copyright @2021 Istagram Company</p>
    </div>
  )
}

export default SuggestionsList
