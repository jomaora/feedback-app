import {useState} from 'react'

function RatingSelect({setRating}) {
  const [selected, setSelected] = useState(10);

  const handleChange = (e) => {
    setSelected(parseInt(e.target.value));
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
            checked={selected === i}
          />
          <label htmlFor={`num${i}`}>{i}</label>
        </li>
        );
      })}
    </ul>
  )
}

export default RatingSelect