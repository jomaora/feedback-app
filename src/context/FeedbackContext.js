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

  const deleteFeedback = async id => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`http://localhost:5005/feedback/${id}`, {
      method: 'DELETE'
    });
      
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = async newFeedback => {
    const response = await fetch('http://localhost:5005/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    });

    const data = await response.json();
    setFeedback([data, ...feedback])
  }

  const updateFeedback = async (id, text, rating) => {
    const response = await fetch(`http://localhost:5005/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text, rating})
    });
    
    const data = await response.json();

    setFeedback(feedback.map(feedback => {
      if (feedback.id !== id) return feedback;
      return data;
    }));
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
