import { v4 as uuid } from 'uuid';
import { useContext, useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const {addFeedback} = useContext(FeedbackContext);

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }

    setText(e.target.value)
  }

  const handleOnSubmit = evt => {
    evt.preventDefault(); // avoid reload of form + page
    if (text !== '' && text.trim().length >= 10) {
      const newFeedback = {
        id: uuid(),
        rating,
        text
      }
      addFeedback(newFeedback);
      setText('');
      setRating(10);
      setBtnDisabled(false);
      setMessage('');
    }
  };

  return (
    <Card>
      <form onSubmit={handleOnSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect rating={rating} setRating={setRating}/>
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
