import React from "react"
import TooltipTrigger from "react-popper-tooltip"
import formatNumber from "format-number"

import {
  USER,
  PAGE_CONTENT_MAX_WIDTH,
  HOVER_CARD_DESCRIPTION_MAX_HEIGHT,
  IMG_SERVER,
} from "../lib/utils"
import Header from "./Header"
import Footer from "./Footer"
import Button from "./Button"
import InfoButton from "./InfoButton"
import { smallerMeals, SmallerMeal } from "../lib/meals"

const PlanSelectionsPage: React.FC = () => {
  return (
    <>
      <Header />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          columnGap: "6rem",
          margin: "2rem auto 0",
          padding: "0 1rem",
          maxWidth: PAGE_CONTENT_MAX_WIDTH,
        }}
      >
        <div>
          <h1
            style={{
              borderBottom: "4px solid olivedrab",
              color: "darkgreen",
              paddingBottom: "1rem",
              fontSize: "1.8rem",
            }}
          >
            Order for {USER.firstName} {USER.lastName}
          </h1>

          <section>
            <h2
              style={{
                color: "darkgreen",
                marginBottom: "0.3rem",
                fontSize: "1.8rem",
              }}
            >
              Select a Meal Plan &amp; Dinner Packs
            </h2>
            <p style={{ margin: 0, fontFamily: "sans-serif" }}>
              If you're <strong>new</strong> to Fun n' Cheezy and your goal is
              weight loss, we recommend starting on one of our{" "}
              <strong>Jump Start</strong> meal plans.
            </p>
            <p style={{ fontFamily: "sans-serif" }}>
              For more information about the <strong>Jump Start</strong>,{" "}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">click here</a>
            </p>
            <p style={{ fontFamily: "sans-serif", marginBottom: 0 }}>
              <strong>
                After your first two weeks, for on-going weight loss and or
                convenience, we recommend the standard 1200, 1500, or 1800
                calorie meal plans.
              </strong>
            </p>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              style={{
                fontFamily: "sans-serif",
                textDecoration: "none",
                color: "darkgreen",
                display: "block",
                borderBottom: "4px solid olivedrab",
                padding: "1.5rem 0",
                marginBottom: "2rem",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  color: "olivedrab",
                  fontWeight: "bolder",
                  marginRight: "0.25rem",
                }}
              >
                ?
              </span>{" "}
              I need help to decide
            </a>

            <select style={mealPlanSelectStyles}>
              <option value="">Jump Start</option>
              <option value="standard">Jump Start Standard - $145.00</option>
              <option value="extra">Jump Start Extra - $158.00</option>
            </select>

            <select style={mealPlanSelectStyles}>
              <option value="">1200 calorie plans</option>
              <option value="1200">
                7 Day - Breakfast, Lunch, Dinner - $152.00
              </option>
              <option value="1200-7LD">7 Day - Lunch, Dinner - $130.00</option>
              <option value="1200-7BD">
                7 Day - Breakfast, Dinner - $114.00
              </option>
              <option value="1200-7BL">
                7 Day - Breakfast, Lunch - $93.00
              </option>
              <option value="1200-7L">7 Day - Lunch - $64.00</option>
              <option value="1200-5">
                5 Day - Breakfast, Lunch, Dinner - $118.00
              </option>
              <option value="1200-5LD">5 Day - Lunch,Dinner - $104.00</option>
              <option value="1200-5BD">
                5 Day - Breakfast, Dinner - $92.00
              </option>
              <option value="1200-5BL">
                5 Day - Breakfast, Lunch - $77.00
              </option>
              <option value="1200-5L">5 Day - Lunch - $50.00</option>
              <option value="1200-4">
                4 Day - Breakfast, Lunch, Dinner - $99.00
              </option>
              <option value="1200-3">
                3 Day - Breakfast, Lunch, Dinner - $82.00
              </option>
            </select>

            <select style={mealPlanSelectStyles}>
              <option value="">1500 calorie plans</option>
              <option value="1500">
                7 Day - Breakfast, Lunch, Dinner - $166.00
              </option>
              <option value="1500-7LD">7 Day - Lunch, Dinner - $140.00</option>
              <option value="1500-7BD">
                7 Day - Breakfast, Dinner - $118.00
              </option>
              <option value="1500-7BL">
                7 Day - Breakfast, Lunch - $103.00
              </option>
              <option value="1500-7L">7 Day - Lunch - $76.00</option>
              <option value="1500-5">
                5 Day - Breakfast, Lunch, Dinner - $128.00
              </option>
              <option value="1500-5LD">5 Day - Lunch, Dinner - $111.00</option>
              <option value="1500-5BD">
                5 Day - Breakfast, Dinner - $94.00
              </option>
              <option value="1500-5BL">
                5 Day - Breakfast, Lunch - $83.00
              </option>
              <option value="1500-5L">5 Day - Lunch - $57.00</option>
              <option value="1500-4">
                4 Day - Breakfast, Lunch, Dinner - $109.00
              </option>
              <option value="1500-3">
                3 Day - Breakfast, Lunch, Dinner - $89.00
              </option>
            </select>

            <select style={mealPlanSelectStyles}>
              <option value="">1800 calorie plans</option>
              <option value="1800">
                7 Day - Breakfast, Lunch, Dinner - $189.00
              </option>
              <option value="1800-7LD">7 Day - Lunch, Dinner - $161.00</option>
              <option value="1800-7BD">
                7 Day - Breakfast, Dinner - $118.00
              </option>
              <option value="1800-7BL">
                7 Day - Breakfast, Lunch - $125.00
              </option>
              <option value="1800-5">
                5 Day - Breakfast, Lunch, Dinner - $145.00
              </option>
              <option value="1800-5LD">5 Day - Lunch, Dinner - $120.00</option>
              <option value="1800-5BD">
                5 Day - Breakfast, Dinner - $94.00
              </option>
              <option value="1800-5BL">
                5 Day - Breakfast, Lunch - $97.00
              </option>
            </select>

            <select style={mealPlanSelectStyles}>
              <option value="">Dinners only</option>
              <option value="D5">5 Dinners - $65.00</option>
              <option value="D7">7 Dinners - $84.00</option>
              <option value="D10">10 Dinners - $114.00</option>
              <option value="D14">14 Dinners - $150.00</option>
              <option value="D21">21 Dinners (Frozen Only) - $219.00</option>
              <option value="D28">28 Dinners (Frozen Only) - $290.00</option>
            </select>
          </section>

          <section style={{ marginTop: "2.5rem" }}>
            <h2
              style={{
                color: "darkgreen",
                marginBottom: "0.3rem",
                fontSize: "1.8rem",
              }}
            >
              Select your Smaller Meals &amp; Desserts
            </h2>
            <p
              style={{
                margin: 0,
                fontFamily: "sans-serif",
                paddingBottom: "1.75rem",
                borderBottom: "4px solid olivedrab",
              }}
            >
              Our extra meals and desserts are a perfect addition for the whole
              family.
            </p>

            <ul
              style={{
                marginTop: "2rem",
                padding: 0,
                listStyle: "none",
                maxWidth: "32rem",
              }}
            >
              {smallerMeals.map(smallerMeal => (
                <li
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 10rem",
                    borderTop: "1px solid lightgrey",
                    padding: "0.5rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        marginBottom: "0.25rem",
                        fontFamily: "sans-serif",
                        fontSize: "0.9rem",
                      }}
                    >
                      {smallerMeal.name} ({smallerMeal.numberOfServings}-pack)
                    </div>
                    <div
                      style={{
                        color: "grey",
                        fontFamily: "sans-serif",
                        fontSize: "0.8rem",
                      }}
                    >
                      {formatNumber({ prefix: "$", padRight: 2 })(
                        smallerMeal.priceCents / 100
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <InfoButtonWithPopover smallerMeal={smallerMeal} />{" "}
                    <select
                      style={{
                        flexBasis: "5rem",
                        padding: "1rem",
                        marginLeft: "0.5rem",
                        border: "1px solid lightgrey",
                        borderRadius: 2,
                        backgroundColor: "whiteSmoke",
                      }}
                    >
                      <option value="">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div>
          <div
            style={{
              backgroundColor: "whiteSmoke",
              border: "1px solid lightgrey",
              padding: "1.5rem",
              minHeight: "18rem",
              marginBottom: "1.5rem",
              borderRadius: 5,
            }}
          >
            <h3
              style={{
                padding: "0 0 1.5rem",
                borderBottom: "4px solid olivedrab",
                fontSize: "1.5rem",
                color: "darkgreen",
              }}
            >
              Your pack selections
            </h3>

            <div
              style={{
                color: "darkgreen",
                fontWeight: "bold",
                marginTop: "2.5rem",
              }}
            >
              {USER.firstName} {USER.lastName}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "whiteSmoke",
              border: "1px solid lightgrey",
              padding: "1.5rem",
              borderRadius: 5,
            }}
          >
            <div
              style={{
                color: "darkgreen",
                marginBottom: "1rem",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Do you have a promotion or group code?
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Enter Code"
                style={{
                  width: "100%",
                  border: "1px solid lightgrey",
                  padding: "1rem",
                  borderRadius: 2,
                  boxSizing: "border-box",
                }}
              />{" "}
              <Button
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 3,
                  transform: "translate(0, -50%)",
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Ad */}
      </div>

      <Footer>
        <div style={{ width: "100%", textAlign: "right" }}>
          <Button>Next</Button>
        </div>
      </Footer>
    </>
  )
}

const mealPlanSelectStyles = {
  display: "block",
  width: "100%",
  maxWidth: "25rem",
  padding: "1rem",
  border: "1px solid lightgrey",
  borderRadius: 2,
  marginBottom: "1rem",
  backgroundColor: "whiteSmoke",
}

// ============================================================================
// InfoButtonWithPopover
// ============================================================================

const InfoButtonWithPopover: React.FC<InfoButtonWithPopoverProps> = ({
  smallerMeal,
}) => {
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

            <img
              src={IMG_SERVER + smallerMeal.id + ".jpg"}
              alt={smallerMeal.name}
              style={{ width: "100%", height: "auto" }}
            />
            <p
              style={{
                color: "grey",
                fontFamily: "sans-serif",
                maxHeight: HOVER_CARD_DESCRIPTION_MAX_HEIGHT,
                overflowY: "auto",
              }}
            >
              {smallerMeal.description}
            </p>
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

interface InfoButtonWithPopoverProps {
  smallerMeal: SmallerMeal
}

export default PlanSelectionsPage
