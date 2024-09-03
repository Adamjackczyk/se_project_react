function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
      <h2 className="card__name">{item.name}</h2>
    </li>
  );
}

export default ItemCard;
