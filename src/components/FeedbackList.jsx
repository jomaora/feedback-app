import {useContext} from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import {motion, AnimatePresence} from 'framer-motion';
import PropTypes from 'prop-types'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from "../context/FeedbackContext";

function FeedbackList() {
  const {feedback, isLoading} = useContext(FeedbackContext);

  if (isLoading) {
    return (
      <div className='loader'>
        <BeatLoader color='#AA0000'/>
      </div>
    );
  }

  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }

  return (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div 
            key={item.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ),
}

export default FeedbackList
