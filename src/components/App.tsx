import React, { useRef, useState, useEffect } from "react"

import { meals, Meal, spaghetti } from "../lib/meals"

const IMG_SERVER = "http://127.0.0.1:59756/"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colours = {
  primary: "#02593d",
  info: "#757575",
  text: "#4a4a4a",
  border: "#e0e0e0",
}

const categories = [
  { id: "all", name: "Show All Dinners" },
  { id: "freshChilled", name: "Fresh Chilled" },
  { id: "asian", name: "Asian" },
  { id: "beef", name: "Beef" },
  { id: "chicken", name: "Chicken" },
  { id: "indian", name: "Indian" },
  { id: "internationalTastes", name: "International Tastes" },
  { id: "lamb", name: "Lamb" },
]

const App: React.FC = () => {
  const [detailViewHeight, setDetailViewHeight] = useState(450)
  const detailViewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (detailViewRef.current) {
      // if this can be done in CSS that would be better
      setDetailViewHeight(detailViewRef.current.getBoundingClientRect().height)
    }
  }, [])

  return (
    <div style={{ padding: "0 1rem", maxWidth: 1160 }}>
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
            1 dinner(s) selected / <strong>6 left to select</strong>
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
        <div style={{ maxHeight: detailViewHeight, overflowY: "auto" }}>
          <MealCategories />
        </div>
        <div style={{ maxHeight: detailViewHeight, overflowY: "auto" }}>
          <MealListMaster />
        </div>
        <div ref={detailViewRef}>
          <MealListDetail meal={spaghetti} />
        </div>
      </div>

      <div
        style={{
          border: "1px solid lightgrey",
          marginTop: "5rem",
          padding: "2rem",
          borderRadius: 5,
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
            1 dinner(s) selected / <strong>6 left to select</strong>
          </span>
        </div>
        <CheckoutList />
      </div>
    </div>
  )
}

const MealCategories: React.FC = () => {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {categories.map((category, i) => {
        const isFirst = i === 0
        const isLast = i === categories.length - 1

        return (
          <li
            key={category.id}
            style={{
              textAlign: "center",
              padding: "1rem",
              border: "1px solid lightgrey",
              color: "grey",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              borderBottom: isLast ? "auto" : "none",
              borderTopLeftRadius: isFirst ? 5 : "auto",
              borderTopRightRadius: isFirst ? 5 : "auto",
              borderBottomLeftRadius: isLast ? 5 : "auto",
              borderBottomRightRadius: isLast ? 5 : "auto",
            }}
          >
            {category.name}
          </li>
        )
      })}
    </ul>
  )
}

const MealListMaster: React.FC = () => {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {meals.map(meal => (
        <li
          key={meal.id}
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid lightgrey",
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
          <InfoButton style={{ marginLeft: "0.5rem", marginRight: "1rem" }} />{" "}
          <Button>+ Add</Button>
        </li>
      ))}
    </ul>
  )
}

const MealListDetail: React.FC<{ meal: Meal }> = ({ meal }) => {
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
        <InfoButton />
      </h3>
      <p style={{ color: "grey", fontFamily: "sans-serif" }}>
        {meal.description}
      </p>
      <Button style={{ float: "right" }}>+ Add Meal</Button>
    </>
  )
}

const CheckoutList: React.FC = () => {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {[spaghetti].map((meal, i, self) => {
        const isLast = i === self.length - 1

        return (
          <li
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
              }}
            >
              (X) Delete
            </button>
          </li>
        )
      })}
    </ul>
  )
}

const Button: React.FC<{ style?: React.CSSProperties }> = ({
  style,
  ...props
}) => {
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

const InfoButton: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  return (
    <button
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
    >
      i
    </button>
  )
}

export default App
