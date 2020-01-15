import React, { useState, useReducer } from "react"
import nanoid from "nanoid"
import formatNumber from "format-number"
import { format as formatDate } from "date-fns"
import { GoTrashcan, GoAlert } from "react-icons/go"
import TooltipTrigger from "react-popper-tooltip"
import Modal from "react-modal"

import { categories, Category, meals, Meal } from "../lib/meals"
import { PAGE_CONTENT_MAX_WIDTH } from "../lib/utils"
import australianMadeLogo from "../images/australianMadeLogo.jpg"
import Header from "./Header"
import Footer from "./Footer"
import Button from "./Button"
import InfoButton from "./InfoButton"
import ErrorButton from "./ErrorButton"

const MealSelectionsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [cart, cartDispatch] = useReducer(cartReducer, { items: [] })

  const mealsFilteredByCategory = getMealsFilteredByCategory(
    meals,
    selectedCategory
  )

  return (
    <>
      <Modal
        isOpen={!!cart.error}
        onRequestClose={() => cartDispatch({ type: "CLOSE_ERROR_MODAL" })}
        style={{
          content: {
            top: "35%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid FireBrick",
            backgroundColor: "LavenderBlush",
            maxWidth: "20rem",
            textAlign: "center",
          },
          overlay: {
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 15, 15, 0.75)",
          },
        }}
        contentLabel="Cart Error Modal"
      >
        <GoAlert style={{ fontSize: "1.25rem", color: "FireBrick" }} />
        <p style={{ fontFamily: "sans-serif", color: "DimGray" }}>
          {cart.error === "MAX_ITEMS_REACHED" && (
            <span>
              You have already selected the maximum number of meals, please
              remove some if you wish to choose more.
            </span>
          )}
          {cart.error === "NOT_ENOUGH_ITEMS" && (
            <span>
              Invalid number of meals. Please select {REQUIRED_DINNERS} more to
              complete or delete all choices.
            </span>
          )}
        </p>
        <ErrorButton
          onClick={() => cartDispatch({ type: "CLOSE_ERROR_MODAL" })}
        >
          Ok
        </ErrorButton>
      </Modal>

      <Header />

      {/* Order info section */}
      <section
        style={{
          backgroundColor: "whiteSmoke",
          borderBottom: "1px solid lightgrey",
          // The padding for the x axis serves to align this section with the rest of the page's sections
          padding: "0 1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: PAGE_CONTENT_MAX_WIDTH,
            margin: "0 auto",
          }}
        >
          <div style={{ padding: "1.25rem", paddingLeft: 0 }}>
            <div style={OrderInfoSectionSecondaryTextStyles}>Member name</div>
            <div style={OrderInfoSectionPrimaryTextStyles}>
              {USER.firstName} {USER.lastName}
            </div>
          </div>
          <div style={{ padding: "1.25rem" }}>
            <div style={OrderInfoSectionSecondaryTextStyles}>
              For delivery on
            </div>
            <div style={OrderInfoSectionPrimaryTextStyles}>
              {formatDate(DELIVERY_DATE, "eeee, d MMMM yyyy")}
            </div>
          </div>
        </div>
      </section>

      {/* The padding for the x axis serves to align this section with the rest of the page's sections */}
      <section style={{ padding: "0 1rem" }}>
        <div
          style={{
            margin: "0 auto 5rem",
            padding: "1.5rem",
            borderRadius: 5,
            maxWidth: PAGE_CONTENT_MAX_WIDTH,
            backgroundColor: "whiteSmoke",
            border: "1px solid lightgrey",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "4px solid OliveDrab",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  color: "darkgreen",
                  fontWeight: "normal",
                  marginTop: 0,
                  marginBottom: "0.5rem",
                }}
              >
                Choose Dinners
              </h1>
              <div style={{ color: "darkgreen", marginBottom: "1rem" }}>
                {cart.items.length} dinner{cart.items.length !== 1 && "s"}{" "}
                selected /{" "}
                <strong>
                  {REQUIRED_DINNERS - cart.items.length} left to select
                </strong>
              </div>
            </div>
            <Button onClick={() => cartDispatch({ type: "CONFIRM_ITEMS" })}>
              Confirm Selections
            </Button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 2fr",
              gridColumnGap: "1.5rem",
              marginTop: "1.5rem",
            }}
          >
            <div style={{ maxHeight: MASTER_DETAIL_SIBLINGS_HEIGHT }}>
              <MealCategories
                selectedCategory={selectedCategory}
                onSelectCategory={category => {
                  const mealsFilteredByCategory = getMealsFilteredByCategory(
                    meals,
                    category
                  )
                  setSelectedCategory(category)
                  setSelectedMeal(mealsFilteredByCategory[0])
                }}
              />
            </div>
            <div
              style={{
                maxHeight: MASTER_DETAIL_SIBLINGS_HEIGHT,
                overflowY: "auto",
              }}
            >
              <MealListMaster
                meals={mealsFilteredByCategory}
                onAddToCart={meal => cartDispatch({ type: "ADD_ITEM", meal })}
                selectedMeal={selectedMeal}
                onSelectMeal={mealId =>
                  setSelectedMeal(x => (x === mealId ? null : mealId))
                }
              />
            </div>
            <div
              style={{
                maxHeight: MASTER_DETAIL_SIBLINGS_HEIGHT,
                overflowY: "auto",
              }}
            >
              {selectedMeal && (
                <MealListDetail
                  meal={selectedMeal}
                  onAddToCart={meal => cartDispatch({ type: "ADD_ITEM", meal })}
                />
              )}
            </div>
          </div>

          <div
            style={{
              border: "1px solid lightgrey",
              marginTop: "5rem",
              padding: "2rem",
              borderRadius: 5,
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                borderBottom: "4px solid OliveDrab",
              }}
            >
              <h2 style={{ color: "darkgreen" }}>Your Dinners Selections</h2>
              <span style={{ color: "darkgreen" }}>
                {cart.items.length} dinner{cart.items.length !== 1 && "s"}{" "}
                selected /{" "}
                <strong>
                  {REQUIRED_DINNERS - cart.items.length} left to select
                </strong>
              </span>
            </div>
            <CheckoutList
              meals={cart.items}
              onRemoveFromCart={meal =>
                cartDispatch({
                  type: "REMOVE_ITEM",
                  cartItemId: meal.cartItemId,
                })
              }
            />
          </div>
        </div>
      </section>

      <Footer>
        <div style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
          Scroll down to view your selections
        </div>
        <Button onClick={() => cartDispatch({ type: "CONFIRM_ITEMS" })}>
          Confirm Selections
        </Button>
      </Footer>
    </>
  )
}

const OrderInfoSectionSecondaryTextStyles: React.CSSProperties = {
  color: "Gray",
  fontFamily: "sans-serif",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "0.6rem",
  marginBottom: "0.25rem",
}

const OrderInfoSectionPrimaryTextStyles: React.CSSProperties = {
  fontFamily: "sans-serif",
  fontWeight: "bold",
  fontSize: "0.8rem",
}

// ============================================================================
// MealCategories
// ============================================================================

const MealCategories: React.FC<MealCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        height: "100%",
        overflowY: "auto",
        border: "1px solid lightgrey",
        borderRadius: 5,
      }}
    >
      {categories.map((category, i) => {
        const isLast = i === categories.length - 1
        const isSelected = category.id === selectedCategory.id

        return (
          <li
            key={category.id}
            style={{
              textAlign: "center",
              padding: "1rem",
              borderBottom: isLast ? "none" : "1px solid lightgrey",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              cursor: "pointer",
              color: isSelected ? "darkgreen" : "grey",
              backgroundColor: isSelected ? "honeydew" : "inherit",
              textDecoration: isSelected ? "underline" : "none",
            }}
            onClick={() => onSelectCategory(category)}
          >
            {category.name}
          </li>
        )
      })}
    </ul>
  )
}

interface MealCategoriesProps {
  selectedCategory: Category
  onSelectCategory: (category: Category) => void
}

// ============================================================================
// MealListMaster
// ============================================================================

const MealListMaster: React.FC<MealListMasterProps> = ({
  meals,
  onAddToCart,
  selectedMeal,
  onSelectMeal,
}) => {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {meals.map(meal => {
        const isSelected = selectedMeal && meal.id === selectedMeal.id

        return (
          <li
            key={meal.id}
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid lightgrey",
              padding: "0.75rem",
              backgroundColor: isSelected ? "lightgrey" : "initial",
              cursor: "pointer",
            }}
            onClick={() => onSelectMeal(meal)}
          >
            <img
              src={IMG_SERVER + meal.id + ".jpg"}
              alt={meal.name}
              style={{ maxHeight: "5rem", marginRight: "1rem" }}
            />{" "}
            <span style={{ marginRight: "auto", fontFamily: "sans-serif" }}>
              {meal.name}
            </span>{" "}
            <span style={{ marginLeft: "0.5rem", marginRight: "1rem" }}>
              <InfoButtonWithPopover meal={meal} />
            </span>
            <Button
              onClick={ev => {
                ev.stopPropagation()
                onAddToCart(meal)
              }}
            >
              + Add
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

interface MealListMasterProps {
  meals: Meal[]
  onAddToCart: (meal: Meal) => void
  selectedMeal: Meal | null
  onSelectMeal: (meal: Meal) => void
}

// ============================================================================
// MealListDetail
// ============================================================================

const MealListDetail: React.FC<MealListDetailProps> = ({
  meal,
  onAddToCart,
}) => {
  return (
    <>
      <img
        src={IMG_SERVER + meal.id + ".jpg"}
        alt={meal.name}
        style={{ width: "100%", maxHeight: DETAIL_IMAGE_MAX_HEIGHT }}
      />
      <h3
        style={{
          color: "darkgreen",
          fontSize: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {meal.name}
        <InfoButtonWithPopover meal={meal} />
      </h3>
      <p style={{ color: "grey", fontFamily: "sans-serif" }}>
        {meal.description}
      </p>
      <Button style={{ float: "right" }} onClick={() => onAddToCart(meal)}>
        + Add Meal
      </Button>
    </>
  )
}

interface MealListDetailProps {
  meal: Meal
  onAddToCart: (meal: Meal) => void
}

// ============================================================================
// CheckoutList
// ============================================================================

const CheckoutList: React.FC<CheckoutListProps> = ({
  meals,
  onRemoveFromCart,
}) => {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {meals.map((meal, i, self) => {
        const isLast = i === self.length - 1

        return (
          <li
            key={meal.id + i}
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: isLast ? "none" : "1px solid lightgrey",
              padding: "0.75rem",
            }}
          >
            <img
              src={IMG_SERVER + meal.id + ".jpg"}
              alt={meal.name}
              style={{ maxHeight: "5rem", marginRight: "1rem" }}
            />{" "}
            <span style={{ marginRight: "auto", fontFamily: "sans-serif" }}>
              {meal.name}
            </span>{" "}
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                color: "darkgreen",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => onRemoveFromCart(meal)}
            >
              <GoTrashcan style={{ marginRight: "0.5rem" }} /> Delete
            </button>
          </li>
        )
      })}
    </ul>
  )
}

interface CheckoutListProps {
  meals: CartItem[]
  onRemoveFromCart: (meal: CartItem) => void
}

// ============================================================================
// InfoButtonWithPopover
// ============================================================================

const InfoButtonWithPopover: React.FC<{ meal: Meal }> = ({ meal }) => {
  const [tab, setTab] = useState(0)

  const servingMultiplier = 100 / meal.nutritionalInformation.servingSizeG

  return (
    <span onClick={ev => ev.stopPropagation()}>
      <TooltipTrigger
        placement="right"
        trigger="click"
        tooltip={({ arrowRef, tooltipRef, getArrowProps, getTooltipProps }) => (
          <div
            {...getTooltipProps({
              ref: tooltipRef,
              style: {
                backgroundColor: "white",
                padding: "1.5rem",
                maxWidth: 350,
                borderRadius: 5,
                boxShadow:
                  "0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)",
              },
            })}
          >
            <div {...getArrowProps({ ref: arrowRef })} />

            <h4 style={{ margin: 0, fontSize: "1.5rem", color: "darkgreen" }}>
              {meal.name}
            </h4>
            <p
              style={{
                color: "grey",
                fontFamily: "sans-serif",
                maxHeight: HOVER_CARD_DESCRIPTION_MAX_HEIGHT,
                overflowY: "auto",
              }}
            >
              {meal.description}
            </p>

            <div style={{ display: "flex", marginBottom: "0.5rem" }}>
              <button
                type="button"
                style={{
                  flex: "1",
                  background: "none",
                  border: "none",
                  color: "grey",
                  padding: "0.5rem",
                  cursor: "pointer",
                  borderBottom:
                    tab === 0 ? "2px solid OliveDrab" : "2px solid transparent",
                }}
                onClick={() => setTab(0)}
              >
                Ingredients
              </button>
              <button
                type="button"
                style={{
                  flex: "1",
                  background: "none",
                  border: "none",
                  color: "grey",
                  padding: "0.5rem",
                  cursor: "pointer",
                  borderBottom:
                    tab === 1 ? "2px solid OliveDrab" : "2px solid transparent",
                }}
                onClick={() => setTab(1)}
              >
                Nutritional Information
              </button>
            </div>

            {tab === 0 ? (
              <>
                <p style={{ fontFamily: "sans-serif" }}>
                  {meal.ingredients.map(x => x.name).join(", ")}
                  {meal.contains.length && (
                    <strong>
                      {" "}
                      Contains {meal.contains.map(x => x.name).join(", ")}
                    </strong>
                  )}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "2rem",
                  }}
                >
                  <div style={{ flex: "0 0 40px", marginRight: "0.5rem" }}>
                    <img
                      src={australianMadeLogo}
                      alt="Australian Made Logo"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      color: "darkgreen",
                      fontFamily: "sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Made in Australia from at least{" "}
                    {percentageFormat(meal.australianMadePercentage)} Australian
                    ingredients
                    {meal.australianMadeLine && " " + meal.australianMadeLine}
                  </p>
                </div>
              </>
            ) : (
              <table
                style={{
                  fontFamily: "sans-serif",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "0.75rem 0",
                        borderBottom: "1px solid lightgrey",
                      }}
                    ></th>
                    <th
                      style={{
                        color: "grey",
                        padding: "0.75rem 0",
                        borderBottom: "1px solid lightgrey",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                      }}
                    >
                      Per 100g
                    </th>
                    <th
                      style={{
                        color: "grey",
                        padding: "0.75rem 0",
                        borderBottom: "1px solid lightgrey",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                      }}
                    >
                      Per serve ({meal.nutritionalInformation.servingSizeG}g)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <PopoverTableRowHeading>Energy (kj)</PopoverTableRowHeading>
                    <PopoverTableCell>
                      {basicFormat(meal.nutritionalInformation.energyKj)}
                    </PopoverTableCell>
                    <PopoverTableCell>
                      {basicFormat(
                        meal.nutritionalInformation.energyKj * servingMultiplier
                      )}
                    </PopoverTableCell>
                  </tr>
                  <tr>
                    <PopoverTableRowHeading>Enery (cal)</PopoverTableRowHeading>
                    <PopoverTableCell>
                      {basicFormat(
                        kilojouleToKilocalorie(
                          meal.nutritionalInformation.energyKj
                        )
                      )}
                    </PopoverTableCell>
                    <PopoverTableCell>
                      {basicFormat(
                        kilojouleToKilocalorie(
                          meal.nutritionalInformation.energyKj
                        ) * servingMultiplier
                      )}
                    </PopoverTableCell>
                  </tr>
                  <tr>
                    <PopoverTableRowHeading>Protein</PopoverTableRowHeading>
                    <PopoverTableCell>
                      {basicFormat(meal.nutritionalInformation.protein)}
                    </PopoverTableCell>
                    <PopoverTableCell>
                      {basicFormat(
                        meal.nutritionalInformation.protein * servingMultiplier
                      )}
                    </PopoverTableCell>
                  </tr>
                  <tr>
                    <PopoverTableRowHeading>Fat (total)</PopoverTableRowHeading>
                    <PopoverTableCell>
                      {basicFormat(meal.nutritionalInformation.fatTotal)}
                    </PopoverTableCell>
                    <PopoverTableCell>
                      {basicFormat(
                        meal.nutritionalInformation.fatTotal * servingMultiplier
                      )}
                    </PopoverTableCell>
                  </tr>
                  <tr>
                    <PopoverTableRowHeading>
                      Fat (saturated)
                    </PopoverTableRowHeading>
                    <PopoverTableCell>
                      {basicFormat(meal.nutritionalInformation.fatSaturated)}
                    </PopoverTableCell>
                    <PopoverTableCell>
                      {basicFormat(
                        meal.nutritionalInformation.fatSaturated *
                          servingMultiplier
                      )}
                    </PopoverTableCell>
                  </tr>
                  <tr>
                    <PopoverTableRowHeading>
                      Carbs (total)
                    </PopoverTableRowHeading>
                    <PopoverTableCell>
                      {basicFormat(meal.nutritionalInformation.carbsTotal)}
                    </PopoverTableCell>
                    <PopoverTableCell>
                      {basicFormat(
                        meal.nutritionalInformation.carbsTotal *
                          servingMultiplier
                      )}
                    </PopoverTableCell>
                  </tr>
                  <tr>
                    <PopoverTableRowHeading>
                      Carbs (sugars)
                    </PopoverTableRowHeading>
                    <PopoverTableCell>
                      {basicFormat(meal.nutritionalInformation.carbsSugars)}
                    </PopoverTableCell>
                    <PopoverTableCell>
                      {basicFormat(
                        meal.nutritionalInformation.carbsSugars *
                          servingMultiplier
                      )}
                    </PopoverTableCell>
                  </tr>
                  <tr>
                    <PopoverTableRowHeading>Fibre</PopoverTableRowHeading>
                    <PopoverTableCell>
                      {basicFormat(meal.nutritionalInformation.fibre)}
                    </PopoverTableCell>
                    <PopoverTableCell>
                      {basicFormat(
                        meal.nutritionalInformation.fibre * servingMultiplier
                      )}
                    </PopoverTableCell>
                  </tr>
                  <tr>
                    <PopoverTableRowHeading>Sodium</PopoverTableRowHeading>
                    <PopoverTableCell>
                      {basicFormat(meal.nutritionalInformation.sodium)}
                    </PopoverTableCell>
                    <PopoverTableCell>
                      {basicFormat(
                        meal.nutritionalInformation.sodium * servingMultiplier
                      )}
                    </PopoverTableCell>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        )}
      >
        {({ getTriggerProps, triggerRef }) => (
          <InfoButton {...getTriggerProps({ ref: triggerRef })} />
        )}
      </TooltipTrigger>
    </span>
  )
}

// ============================================================================
// PopoverTableRowHeading
// ============================================================================

const PopoverTableRowHeading: React.FC<React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>> = ({ style, ...props }) => (
  <td
    style={{
      color: "grey",
      padding: "0.75rem 0",
      borderBottom: "1px solid lightgrey",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: "0.75rem",
      ...style,
    }}
    {...props}
  />
)

// ============================================================================
// PopoverTableCell
// ============================================================================

const PopoverTableCell: React.FC<React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>> = ({ style, ...props }) => (
  <td
    style={{
      textAlign: "center",
      padding: "0.75rem 0",
      borderBottom: "1px solid lightgrey",
      ...style,
    }}
    {...props}
  />
)

// ============================================================================
// Helpers
// ============================================================================

const IMG_SERVER = "http://localhost:5000/"

/*
  Problem: different length detail descriptions cause the height of the component
  to jump up and down.

  This is actually an interesting problem. Here are a couple of solutions: 1.
  Iterate over all detail view permutations and calculate the max height -- use
  this height for the detail view. 2. Restrict the max height of the detail view
  to a static number and restrict the detail description's length to a maximum 
  size.

  1. This is quite hard to do and may be overengineering the problem. This also
  stops us from being able to lazy load each master list item and forces a large
  load of the initial list. This may or may not cause issues depending on the 
  domain information -- i.e. is the list always going to be small enough to load
  at once?
  2. This is a very easy implementation. This does spread
  constraints/dependencies/coupling of the systems more tightly -- i.e. the 
  CMS/description input field will need to be aware of this text field restriction.
  If this is not respected issues may occur, and to make this worse, this may need
  to be respected across entirely different systems. A failsafe for this would
  be to truncate/scroll-the-detail-view the text in this application code, however
  this may result in a worse user experience.

  Option 2 has been implemented
*/
const MASTER_DETAIL_SIBLINGS_HEIGHT = 500
const DETAIL_IMAGE_MAX_HEIGHT = 300
const HOVER_CARD_DESCRIPTION_MAX_HEIGHT = 140

const REQUIRED_DINNERS = 6
const USER = {
  firstName: "Dylan",
  lastName: "Lester",
}
const DELIVERY_DATE = new Date("2020/01/16")

type CartItem = Meal & { cartItemId: string }

interface Cart {
  items: CartItem[]
  error?: "MAX_ITEMS_REACHED" | "NOT_ENOUGH_ITEMS"
}

type cartReducerActions =
  | { type: "ADD_ITEM"; meal: Meal }
  | { type: "REMOVE_ITEM"; cartItemId: string }
  | { type: "CONFIRM_ITEMS" }
  | { type: "CLOSE_ERROR_MODAL" }

const cartReducer = (state: Cart, action: cartReducerActions): Cart => {
  switch (action.type) {
    case "ADD_ITEM": {
      if (state.items.length === REQUIRED_DINNERS) {
        return { ...state, error: "MAX_ITEMS_REACHED" }
      }

      return {
        ...state,
        items: [...state.items, { ...action.meal, cartItemId: nanoid() }],
      }
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(x => x.cartItemId !== action.cartItemId),
      }
    }

    case "CONFIRM_ITEMS": {
      if (state.items.length !== REQUIRED_DINNERS) {
        return { ...state, error: "NOT_ENOUGH_ITEMS" }
      }

      return state
    }

    case "CLOSE_ERROR_MODAL": {
      return { ...state, error: undefined }
    }

    default:
      throw new Error()
  }
}

const getMealsFilteredByCategory = (meals: Meal[], category: Category) =>
  category.id === "all"
    ? meals
    : meals.filter(x => x.categories.some(x => x.id === category.id))

const kilojouleToKilocalorie = (kj: number) => kj / 4.184
const basicFormat = formatNumber({ round: 2 })
const percentageFormat = (value: number) =>
  formatNumber({ suffix: "%", round: 0 })(value * 100)

export default MealSelectionsPage
