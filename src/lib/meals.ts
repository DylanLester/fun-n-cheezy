export interface Ingredient {
  name: string
  ingredients?: Ingredient[]
  percentage?: number
}

export interface Meal {
  id: string
  name: string
  description: string
  ingredients: Ingredient[]
  // contains could be derived from ingredients if I were to add metadata. Maybe each ingredient should have a contains field?
  contains: Ingredient[]
  nutritionalInformation: {
    energyKj: number
    protein: number
    fatTotal: number
    fatSaturated: number
    carbsTotal: number
    carbsSugars: number
    fibre: number
    sodium: number
    servingSizeG: number
  }
  australianMadePercentage: number
  australianMadeLine?: string
  // categories: ['Fresh Chilled', ...]
  // imgUrl (probably not needed as it should use the ID of the item)
}

export const spaghetti: Meal = {
  id: "spaghetti",
  name: "Spaghetti Bolognaise",
  description:
    "Al dente spaghetti with a rich, chunky ground beef Bolognaise sauce, topped with grated parmesan cheese.",
  ingredients: [
    { name: "Tomato Pulp", ingredients: [{ name: "Citric Acid" }] },
    { name: "Pasta", percentage: 0.37 },
    { name: "Beef", percentage: 0.14 },
    { name: "Onion" },
    { name: "Tomato Paste" },
    { name: "Grana Padano Parmesan" },
    { name: "Sugar" },
    { name: "Garlic" },
    { name: "Corn Starch" },
    { name: "Salt" },
    { name: "Onion Extract" },
    { name: "Yeast Extract" },
    { name: "Herbs" },
    { name: "Olive Oil" },
    { name: "Pepper Contains Wheat" },
  ],
  contains: [{ name: "Wheat" }, { name: "Egg" }, { name: "Milk" }],
  nutritionalInformation: {
    energyKj: 441.1,
    protein: 6.5,
    fatTotal: 1.5,
    fatSaturated: 0.6,
    carbsTotal: 15.6,
    carbsSugars: 3.5,
    fibre: 1.3,
    sodium: 193.3,
    servingSizeG: 435,
  },
  australianMadePercentage: 0.83,
  australianMadeLine: "with quality Italian pasta",
}

export const crumbedFish: Meal = {
  id: "crumbedFish",
  name: "Crumbed Fish",
  // description:
  //   "Lightly crumbed fillet of sustainably sourced fish served with baked potato wedges and new season vegetables.",
  description:
    "Aenean interdum eros libero, nec semper quam varius a. In fermentum viverra tortor. Nunc sed semper lorem, in blandit libero. Vivamus interdum, leo euismod rhoncus finibus, metus massa aliquet metus, at egestas nisl purus sit amet odio. Nulla consequat rutrum arcu dictum auctor. Suspendisse consectetur arcu at posuere sodales. Pellentesque ut nisl in massa sollicitudin pretium vitae ut quam. Phasellus dictum sem sem, id tincidunt nunc accumsan eu. Quisque faucibus diam id egestas molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis enim quam, nec finibus massa porttitor ut. Aenean molestie erat sed sapien posuere, sit amet imperdiet ligula ultricies. Quisque pharetra sem id tincidunt fringilla. Phasellus et eros nec nisi suscipit dignissim. Aenean quis pharetra lectus. In eleifend eget enim vitae iaculis. Sed interdum consequat fringilla. Nulla placerat tellus quis tempus euismod. Aenean nec diam diam. Sed felis dui, imperdiet vel tristique in, dignissim vitae nunc. Etiam blandit, purus blandit tempor accumsan, est ipsum auctor neque, vel placerat risus dolor et arcu. Nullam sed ipsum lobortis, placerat velit in, elementum odio. Nulla nec orci massa. Aenean suscipit faucibus neque at rutrum.",
  ingredients: [
    {
      name: "Crumbed Fish",
      percentage: 0.25,
      ingredients: [
        { name: "Fish", percentage: 0.7 },
        {
          name: "Crumb",
          percentage: 0.08,
          ingredients: [
            { name: "Flour" },
            { name: "Gluten" },
            { name: "Sugar" },
            { name: "Salt" },
            { name: "Yeast" },
            { name: "Canola Oil" },
            {
              name: "Colours",
              ingredients: [{ name: "Turmeric" }, { name: "Paprika" }],
            },
          ],
        },
        { name: "Canola Oil" },
        { name: "Flour" },
        { name: "Water" },
        { name: "Gluten" },
        { name: "Wheat Starch" },
        { name: "Dried Vegetables" },
        { name: "Corn Starch" },
        { name: "Wheat Fibre" },
        { name: "Salt" },
        { name: "Egg" },
        { name: "Flavour" },
      ],
    },
    { name: "Potatoes" },
    { name: "Carrot" },
    { name: "Beans" },
    { name: "Corn" },
    { name: "Seasoning" },
    { name: "Sunflower Oil" },
  ],
  contains: [
    { name: "Wheat" },
    { name: "Egg" },
    { name: "Fish" },
    { name: "Milk" },
  ],
  nutritionalInformation: {
    energyKj: 401.4,
    protein: 5.2,
    fatTotal: 2.4,
    fatSaturated: 0.3,
    carbsTotal: 11.8,
    carbsSugars: 3.2,
    fibre: 3.0,
    sodium: 154.2,
    servingSizeG: 386,
  },
  australianMadePercentage: 0.37,
}

export const cornedBeef: Meal = {
  id: "cornedBeef",
  name: "Corned Beef",
  description:
    "Corned silverside carved the traditional way then topped with creamy white sauce with farm fresh vegetables and mashed potato.",
  ingredients: [
    {
      name: "Corned Beef",
      percentage: 0.25,
      ingredients: [
        { name: "Beef", percentage: 0.24 },
        // Cure (Contains Preservative (250, 316))
        { name: "Cure" },
      ],
    },
    { name: "Water" },
    { name: "Potato" },
    { name: "Peas" },
    { name: "Carrot" },
    { name: "Cauliflower" },
    { name: "Leek" },
    { name: "Milk Powder" },
    { name: "Cheese" },
    { name: "Corn Starch" },
    { name: "Evaporated Milk" },
    { name: "Egg" },
    { name: "Butter" },
    { name: "Dijon Mustard" },
    { name: "Maltodextrin" },
    { name: "Salt" },
    { name: "Yeast Extract" },
    { name: "Sugar" },
    { name: "Onion Extract" },
    { name: "Pepper" },
    { name: "Spices" },
    { name: "Herbs" },
  ],
  contains: [{ name: "Egg" }, { name: "Milk" }],
  nutritionalInformation: {
    energyKj: 304.8,
    protein: 6.9,
    fatTotal: 1.3,
    fatSaturated: 0.7,
    carbsTotal: 7.4,
    carbsSugars: 2.5,
    fibre: 2.1,
    sodium: 333.3,
    servingSizeG: 488,
  },
  australianMadePercentage: 0.74,
}

export const shepherdsPie: Meal = {
  id: "shepherdsPie",
  name: "Shepherd's Pie",
  description:
    "Prime ground beef in a delicious gravy, topped with creamy whipped potato then baked golden brown and served with seasonal vegetables.",
  ingredients: [
    { name: "Potato", percentage: 0.17 },
    { name: "Beef", percentage: 0.17 },
    { name: "Carrot" },
    { name: "Beef Stock" },
    { name: "Sweet Potato" },
    { name: "Cauliflower" },
    { name: "Onion" },
    { name: "Celery" },
    { name: "Water" },
    { name: "Peas" },
    { name: "Beans" },
    { name: "Corn Starch" },
    { name: "Evaporated Milk" },
    { name: "Tomato Paste" },
    { name: "Egg" },
    { name: "Milk Powder" },
    { name: "Port" },
    { name: "Cheese" },
    { name: "Salt" },
    { name: "Garlic" },
    { name: "Worcestershire Sauce" },
    { name: "Yeast Extract" },
    { name: "Olive Oil" },
    { name: "Sunflower Oil" },
    { name: "Spices" },
    { name: "Mushroom" },
    { name: "Herbs" },
    { name: "Pepper" },
    { name: "Onion Extract" },
  ],
  contains: [
    { name: "Barley" },
    { name: "Egg" },
    { name: "Fish" },
    { name: "Milk" },
  ],
  nutritionalInformation: {
    energyKj: 339.9,
    protein: 7.3,
    fatTotal: 1.5,
    fatSaturated: 0.5,
    carbsTotal: 8.6,
    carbsSugars: 2.6,
    fibre: 2.1,
    sodium: 176.4,
    servingSizeG: 478,
  },
  australianMadePercentage: 0.85,
}

export const chickenAndCashews: Meal = {
  id: "chickenAndCashews",
  name: "Chicken & Cashews",
  description:
    "Stir-fried pieces of chicken breast and crisp vegetables, topped with whole cashews and served with steamed rice.",
  ingredients: [
    { name: "Chicken", percentage: 0.18, ingredients: [{ name: "Marinade" }] },
    { name: "Long Grain Rice" },
    { name: "Broccoli" },
    { name: "Chicken Stock" },
    { name: "Carrot" },
    { name: "Capsicum" },
    // Oyster Sauce (Contains Modified Corn Starch (1442))
    { name: "Oyster Sauce" },
    { name: "Onion" },
    { name: "Celery" },
    { name: "Chinese Cooking Wine" },
    { name: "Bamboo Shoots" },
    { name: "Cashews" },
    { name: "Corn Starch" },
    { name: "Sesame Oil" },
    { name: "Garlic" },
    { name: "Ginger" },
    { name: "Yeast Extract" },
    { name: "Sunflower Oil" },
  ],
  contains: [
    { name: "Wheat" },
    { name: "Fish" },
    { name: "Soybean" },
    { name: "Tree Nuts" },
    { name: "Sesame Seeds" },
  ],
  nutritionalInformation: {
    energyKj: 381.6,
    protein: 7.0,
    fatTotal: 2.3,
    fatSaturated: 0.5,
    carbsTotal: 9.9,
    carbsSugars: 2.2,
    fibre: 1.5,
    sodium: 312.8,
    servingSizeG: 440,
  },
  australianMadePercentage: 0.82,
}

export const meals = [
  spaghetti,
  crumbedFish,
  cornedBeef,
  chickenAndCashews,
  shepherdsPie,
]
