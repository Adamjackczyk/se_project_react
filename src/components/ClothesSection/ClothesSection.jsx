import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
function ClothesSection({ clothingItems, handleAddClick, handleCardClick }) {
  const defaultClothingItems = clothingItems || [];
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__text">Your items</p>
        <button
          type="button"
          onClick={() => {
            console.log("Button clicked in ClothesSection");
            handleAddClick();
          }}
          className="clothes-section__button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
