export const addIngredient = (ingredientType) => {
  return {
    type: "ADD_INGREDIENT",
    ingredientType: ingredientType,
  };
};
export const substractIngredient = (ingredientType) => {
  return {
    type: "SUBSTRACT_INGREDIENT",
    ingredientType: ingredientType,
  };
};
