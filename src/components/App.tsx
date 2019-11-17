import React, { useRef, useState, useEffect, useReducer } from "react"
import nanoid from "nanoid"
import { FiTrash2 } from "react-icons/fi"
import TooltipTrigger from "react-popper-tooltip"
import formatNumber from "format-number"

import { meals, Meal } from "../lib/meals"

const IMG_SERVER = "http://127.0.0.1:59756/"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colours = {
  primary: "#02593d",
  info: "#757575",
  text: "#4a4a4a",
  border: "#e0e0e0",
}

interface Category {
  id: string
  name: string
}

const categories: Category[] = [
  { id: "all", name: "Show All Dinners" },
  { id: "freshChilled", name: "Fresh Chilled" },
  { id: "asian", name: "Asian" },
  { id: "beef", name: "Beef" },
  { id: "chicken", name: "Chicken" },
  { id: "indian", name: "Indian" },
  { id: "internationalTastes", name: "International Tastes" },
  { id: "lamb", name: "Lamb" },
]

type CartItem = Meal & { cartItemId: string }

type cartReducerActions =
  | { type: "add"; meal: Meal }
  | { type: "remove"; cartItemId: string }

const cartReducer = (state: CartItem[], action: cartReducerActions) => {
  switch (action.type) {
    case "add":
      return [...state, { ...action.meal, cartItemId: nanoid() }]
    case "remove":
      return state.filter(x => x.cartItemId !== action.cartItemId)
    default:
      throw new Error()
  }
}

const DEFAULT_DETAIL_VIEW_HEIGHT = 450
const REQUIRED_DINNERS = 6

const App: React.FC = () => {
  const [detailViewHeight, setDetailViewHeight] = useState(
    DEFAULT_DETAIL_VIEW_HEIGHT
  )
  const detailViewRef = useRef<HTMLDivElement>(null)

  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [cart, cartDispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    if (detailViewRef.current) {
      // if this can be done in CSS that would be better
      setDetailViewHeight(detailViewRef.current.getBoundingClientRect().height)
    }
  }, [])

  const heightOfMasterDetailSectionSiblings =
    detailViewHeight > DEFAULT_DETAIL_VIEW_HEIGHT
      ? detailViewHeight
      : DEFAULT_DETAIL_VIEW_HEIGHT

  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: 5,
        maxWidth: 1160,
        backgroundColor: "whiteSmoke",
        border: "1px solid lightgrey",
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
            {cart.length} dinner{cart.length !== 1 && "s"} selected /{" "}
            <strong>{REQUIRED_DINNERS - cart.length} left to select</strong>
          </div>
        </div>
        <Button>Confirm Selections</Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 2fr",
          gridColumnGap: "1.5rem",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            maxHeight: heightOfMasterDetailSectionSiblings,
            overflowY: "auto",
          }}
        >
          <MealCategories
            selectedCategory={selectedCategory}
            onSelectCategory={category => setSelectedCategory(category)}
          />
        </div>
        <div
          style={{
            maxHeight: heightOfMasterDetailSectionSiblings,
            overflowY: "auto",
          }}
        >
          <MealListMaster
            onAddToCart={meal => cartDispatch({ type: "add", meal })}
            selectedMeal={selectedMeal}
            onSelectMeal={mealId =>
              setSelectedMeal(x => (x === mealId ? null : mealId))
            }
          />
        </div>
        <div ref={detailViewRef}>
          {selectedMeal && (
            <MealListDetail
              meal={selectedMeal}
              onAddToCart={meal => cartDispatch({ type: "add", meal })}
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
            {cart.length} dinner{cart.length !== 1 && "s"} selected /{" "}
            <strong>{REQUIRED_DINNERS - cart.length} left to select</strong>
          </span>
        </div>
        <CheckoutList
          meals={cart}
          onRemoveFromCart={meal =>
            cartDispatch({ type: "remove", cartItemId: meal.cartItemId })
          }
        />
      </div>
    </div>
  )
}

const MealCategories: React.FC<MealCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {categories.map((category, i) => {
        const isFirst = i === 0
        const isLast = i === categories.length - 1
        const isSelected = category.id === selectedCategory.id

        return (
          <li
            key={category.id}
            style={{
              textAlign: "center",
              padding: "1rem",
              border: "1px solid lightgrey",
              color: isSelected ? "darkgreen" : "grey",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              cursor: "pointer",
              borderBottom: isLast ? "auto" : "none",
              borderTopLeftRadius: isFirst ? 5 : "auto",
              borderTopRightRadius: isFirst ? 5 : "auto",
              borderBottomLeftRadius: isLast ? 5 : "auto",
              borderBottomRightRadius: isLast ? 5 : "auto",
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

const MealListMaster: React.FC<MealListMasterProps> = ({
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
  onAddToCart: (meal: Meal) => void
  selectedMeal: Meal | null
  onSelectMeal: (meal: Meal) => void
}

const MealListDetail: React.FC<MealListDetailProps> = ({
  meal,
  onAddToCart,
}) => {
  return (
    <>
      <img
        src={IMG_SERVER + meal.id + ".jpg"}
        alt={meal.name}
        style={{ width: "100%" }}
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
              <FiTrash2 style={{ marginRight: "0.5rem" }} /> Delete
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
            <p style={{ color: "grey", fontFamily: "sans-serif" }}>
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
                  borderBottom: tab === 0 ? "2px solid OliveDrab" : "inherit",
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
                  borderBottom: tab === 1 ? "2px solid OliveDrab" : "inherit",
                }}
                onClick={() => setTab(1)}
              >
                Nutritional Information
              </button>
            </div>

            {tab === 0 ? (
              <p style={{ fontFamily: "sans-serif" }}>
                {meal.ingredients.map(x => x.name).join(", ")}
                {meal.contains.length && (
                  <strong>
                    {" "}
                    Contains {meal.contains.map(x => x.name).join(", ")}
                  </strong>
                )}
              </p>
            ) : (
              <table style={{ fontFamily: "sans-serif", width: "100%" }}>
                <thead>
                  <th></th>
                  <th>Per 100g</th>
                  <th>
                    Per serve ({meal.nutritionalInformation.servingSizeG}g)
                  </th>
                </thead>
                <tbody>
                  <tr>
                    <td>Energy (kj)</td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(meal.nutritionalInformation.energyKj)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        meal.nutritionalInformation.energyKj * servingMultiplier
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Enery (cal)</td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        kilojouleToKilocalorie(
                          meal.nutritionalInformation.energyKj
                        )
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        kilojouleToKilocalorie(
                          meal.nutritionalInformation.energyKj
                        ) * servingMultiplier
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Protein</td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(meal.nutritionalInformation.protein)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        meal.nutritionalInformation.protein * servingMultiplier
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Fat (total)</td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(meal.nutritionalInformation.fatTotal)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        meal.nutritionalInformation.fatTotal * servingMultiplier
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Fat (saturated)</td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(meal.nutritionalInformation.fatSaturated)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        meal.nutritionalInformation.fatSaturated *
                          servingMultiplier
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Carbs (total)</td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(meal.nutritionalInformation.carbsTotal)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        meal.nutritionalInformation.carbsTotal *
                          servingMultiplier
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Carbs (sugars)</td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(meal.nutritionalInformation.carbsSugars)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        meal.nutritionalInformation.carbsSugars *
                          servingMultiplier
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Fibre</td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(meal.nutritionalInformation.fibre)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        meal.nutritionalInformation.fibre * servingMultiplier
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Sodium</td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(meal.nutritionalInformation.sodium)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {basicFormat(
                        meal.nutritionalInformation.sodium * servingMultiplier
                      )}
                    </td>
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

const Button: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ style, ...props }) => {
  return (
    <button
      type="button"
      style={{
        backgroundColor: "darkgreen",
        padding: "0.75rem 1rem",
        borderRadius: "2rem",
        border: "none",
        color: "white",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    />
  )
}

const InfoButton = React.forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>(({ style, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      style={{
        backgroundColor: "grey",
        borderRadius: "50%",
        border: "none",
        color: "white",
        fontStyle: "italic",
        fontFamily: "serif",
        fontSize: "1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "1.25rem",
        width: "1.25rem",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      i
    </button>
  )
})

const kilojouleToKilocalorie = (kj: number) => kj / 4.184
const basicFormat = formatNumber({ round: 2 })

export default App
