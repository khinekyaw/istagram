import React from "react"
import { Users } from "lucide-react"
import SuggestionItem from "./SuggestionItem"

const SuggestionsList = props => {
  return (
    <div className='sidebar__suggestions'>
      <p className='title'>Suggestions for you</p>
      <div className='fade-edge'>
        <div className='fade-edge__top' />
        <div className='fade-edge__bot' />
        {props.data ? (
          <div className='suggestions-list'>
            {props.data.map(item => {
              return <SuggestionItem key={item.id} {...item} />
            })}
          </div>
        ) : (
          <div className='empty-suggestions'>
            <Users className='icon' />
          </div>
        )}
      </div>
      <p className='copyrignt-text'>Copyright @2021 Istagram Company</p>
    </div>
  )
}

export default SuggestionsList
