import {createContext, useEffect, useState} from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const fetchFeedback = async () => {
    const response  = await fetch('http://localhost:5005/feedback?_sort=id&_order=desc');
    const data = await response.json();
    setIsLoading(false);
    setFeedback(data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);
  // we add this to run it as soon as the page loads, and it is empty to run only once

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

  const updateFeedback = (id, text, rating) => {
    const index = feedback.findIndex(feedback => feedback.id === id);
    const newList = [...feedback];
    newList[index] = {id, text, rating};
    setFeedback([...newList]);
    setFeedbackEdit({item: {}, edit: false});
  }

  const editFeedback = feedback => {
    setFeedbackEdit({item: feedback, edit: true});
  }

  return (<FeedbackContext.Provider value={{
    feedback,
    deleteFeedback,
    addFeedback,
    editFeedback,
    feedbackEdit,
    updateFeedback,
    isLoading
  }}>
    {children}
  </FeedbackContext.Provider>);
};

export default FeedbackContext;
