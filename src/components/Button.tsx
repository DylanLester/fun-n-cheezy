import React from "react"

const Button: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ style, ...props }) => {
  return (
    <button
      type="button"
      style={{
        minWidth: "5rem",
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

export default Button
