import React from "react"

import Header from "./Header"
import Footer from "./Footer"
import Button from "./Button"

const PlanSelectionsPage: React.FC = () => {
  return (
    <>
      <Header />

      <section></section>

      <Footer>
        <div style={{ width: "100%", textAlign: "right" }}>
          <Button>Next</Button>
        </div>
      </Footer>
    </>
  )
}

export default PlanSelectionsPage
