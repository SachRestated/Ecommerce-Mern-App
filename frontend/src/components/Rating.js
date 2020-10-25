import React from 'react'
import PropTypes from 'prop-types'


const Rating = ({value, text, color}) => {
    const stars = []
    while(value > 0) {
        if(value >= 1) {
            stars.push(
                <span key={stars.length}> 
                    <i style={{color}}className='fas fa-star'></i>
                </span>
            )
        } 
        else {
            stars.push(
                <span key={stars.length} style={{color}}>
                    <i className='fas fa-star-half-alt'></i>
                </span>
            )
        }
        value -= 1;
    }

    while(stars.length !== 5) {
        stars.push(
            <span key={stars.length} style={{color}}>
                <i className='far fa-star'></i>
            </span>
        )
    }
    stars.push(<span key={stars.length}>{text && ` ${text}`}</span>)

    return (
        <div className='rating'>
            {stars.map((star) => star)}
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8d825'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}


export default Rating
