function RatingSelect({rating, setRating}) {
  const handleChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  return (
    <ul className='rating'>
      {Array.from({ length: 10 }, (_, index) => {
        const i = index + 1;
        return (
        <li key={`rating_${i}`}>
          <input
            type='radio'
            id={`num${i + 1}`}
            name='rating'
            value={i + 1}
            onChange={handleChange}
            checked={rating === i}
          />
          <label htmlFor={`num${i}`}>{i}</label>
        </li>
        );
      })}
    </ul>
  )
}

export default RatingSelect