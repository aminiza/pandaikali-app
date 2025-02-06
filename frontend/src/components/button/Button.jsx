import React from 'react'

const Button = (props) => {
    const {children, onClick, className} = props
  return (
    <button onClick={onClick} className={className}>
        {children}
    </button>
  )
}

export default Button
