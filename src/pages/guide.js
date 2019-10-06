import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import MasteryGuide from "../components/MasteryGuide"

const Guide = () => (
  <Layout>
    <SEO title="Mastery Guide" 
      description="Master your improv game. Read our tips and tricks on how to be an improv superstar."
    />
    <MasteryGuide />
  </Layout>
)

export default Guide
