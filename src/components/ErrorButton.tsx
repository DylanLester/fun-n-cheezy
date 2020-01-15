import React from "react"

const ErrorButton: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ style, ...props }) => {
  return (
    <button
      type="button"
      style={{
        minWidth: "5rem",
        backgroundColor: "white",
        padding: "0.75rem 1rem",
        borderRadius: "2rem",
        border: "2px solid FireBrick",
        color: "FireBrick",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    />
  )
}

export default ErrorButton
