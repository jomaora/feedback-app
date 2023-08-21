import {createContext, useState} from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState([
    {id: 1, text: 'This item is from context', rating: 5},
    {id: 2, text: 'This item is from context 2', rating: 2},
    {id: 3, text: 'This item is from context 3', rating: 3}
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState([
    {item: {}, edit: false}
  ]);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {
    setFeedback([newFeedback, ...feedback])
  }

  const editFeedback = feedback => {
    setFeedbackEdit({item: feedback, edit: true});
  }

  return (<FeedbackContext.Provider value={{
    feedback,
    deleteFeedback,
    addFeedback,
    editFeedback,
    feedbackEdit
  }}>
    {children}
  </FeedbackContext.Provider>);
};

export default FeedbackContext;
