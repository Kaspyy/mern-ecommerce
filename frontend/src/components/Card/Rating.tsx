const Rating = ({
  value,
  text,
  color,
}: {
  value: number;
  text?: string;
  color?: string;
}) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'far fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'far fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'far fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'far fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'far fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#ffc107',
};

export default Rating;
