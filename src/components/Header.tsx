import React, { useState } from "react"
import { GoSignOut, GoChevronRight } from "react-icons/go"
import { MdPhone } from "react-icons/md"
import formatNumber from "format-number"

import { PAGE_CONTENT_MAX_WIDTH } from "../lib/utils"

const Header: React.FC = () => {
  const [tab, setTab] = useState(2)

  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // The padding for the x axis serves to align this section with the rest of the page's sections
          padding: "0.75rem 1rem",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <GoSignOut
            style={{
              color: "OliveDrab",
              marginRight: "0.5rem",
              fontSize: "0.9rem",
            }}
          />{" "}
          <span
            style={{
              color: "darkgreen",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              fontSize: "0.9rem",
            }}
          >
            Abandon Order
          </span>
        </a>

        <h4
          style={{
            margin: 0,
            fontFamily: "sans-serif",
            color: "darkgreen",
            fontSize: "1.5rem",
          }}
        >
          Fun n<span style={{ color: "OliveDrab" }}>'</span> Cheezy
        </h4>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MdPhone
            style={{
              color: "darkgreen",
              marginRight: "0.5rem",
              fontSize: "0.9rem",
            }}
          />{" "}
          <span
            style={{
              color: "darkgreen",
              fontFamily: "sans-serif",
              fontSize: "0.9rem",
            }}
          >
            Call use on <strong>13 15 12</strong>
          </span>
        </a>
      </div>

      <nav
        style={{
          backgroundColor: "darkgreen",
          // The padding for the x axis serves to align this section with the rest of the page's sections
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            maxWidth: PAGE_CONTENT_MAX_WIDTH,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HeaderNavTab
            onClick={() => setTab(0)}
            isSelected={tab === 0}
            step={0}
            text="Delivery date"
          />
          <GoChevronRight style={HeaderNavChevronStyles} />
          <HeaderNavTab
            onClick={() => setTab(1)}
            isSelected={tab === 1}
            step={1}
            text="Plan selections"
          />
          <GoChevronRight style={HeaderNavChevronStyles} />
          <HeaderNavTab
            onClick={() => setTab(2)}
            isSelected={tab === 2}
            step={2}
            text="Meal selections"
          />
          <GoChevronRight style={HeaderNavChevronStyles} />
          <HeaderNavTab
            onClick={() => setTab(3)}
            isSelected={tab === 3}
            step={3}
            text="Confirm order"
          />
        </div>
      </nav>
    </header>
  )
}

const HeaderNavChevronStyles: React.CSSProperties = {
  color: "DarkSeaGreen",
  fontSize: "0.9rem",
}

const HeaderNavTab: React.FC<HeaderNavTabProps> = ({
  onClick,
  isSelected,
  step,
  text,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "1.25rem 1rem",
        margin: "0 0.75rem",
        textAlign: "center",
        cursor: "pointer",
        borderBottom: isSelected
          ? "4px solid YellowGreen"
          : "4px solid transparent",
      }}
    >
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: isSelected ? "white" : "DarkSeaGreen",
          marginBottom: "0.25rem",
        }}
      >
        Step {formatNumber({ padLeft: 2 })(step + 1)}
      </div>
      <div
        style={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          color: isSelected ? "white" : "DarkSeaGreen",
        }}
      >
        {text}
      </div>
    </div>
  )
}

interface HeaderNavTabProps {
  onClick: () => void
  isSelected: boolean
  step: number
  text: string
}

export default Header
