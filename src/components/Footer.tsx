import React from "react"

import { PAGE_CONTENT_MAX_WIDTH } from "../lib/utils"

const Footer: React.FC = ({ children }) => {
  return (
    <>
      <div style={{ marginBottom: "5rem" }} />

      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          boxShadow:
            "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            maxWidth: PAGE_CONTENT_MAX_WIDTH,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // The padding for the x axis serves to align this section with the rest of the page's sections
            padding: "0.75rem 1rem",
          }}
        >
          {children}
        </div>
      </footer>
    </>
  )
}

export default Footer
