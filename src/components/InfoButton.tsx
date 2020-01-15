import React from "react"

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

export default InfoButton
