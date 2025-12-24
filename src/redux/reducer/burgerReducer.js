const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  ingredientNames: {
    meat: "Үхрийн мах",
    salad: "Салад",
    bacon: "Гахайн мах",
    cheese: "Бяслага",
  },
  totalPrice: 1000,
  purchasable: false,
};
const INGREDIENTS_PRICE = {
  salad: 800,
  cheese: 1200,
  meat: 2500,
  bacon: 1700,
};

const Reducer = (state = initialState, action) => {
  if (action.type === "ADD_INGREDIENT") {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
      },
      totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientType],
      purchasable: true,
    };
  } else if (action.type === "SUBSTRACT_INGREDIENT") {
    const newPrice =
      state.totalPrice - INGREDIENTS_PRICE[action.ingredientType];
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
      },
      totalPrice: newPrice,
      purchasable: newPrice > 1000,
    };
  }
  return state;
};

export default Reducer;
