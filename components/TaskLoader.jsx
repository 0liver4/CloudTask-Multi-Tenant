import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={720}
    height={460}
    viewBox="0 0 720 460"
    {...props}
  >
    <rect x="5" y="0" rx="13" ry="13" width="230" height="40" />
    <rect x="5" y="60" rx="15" ry="15" width="322" height="144" />
    <rect x="350" y="60" rx="15" ry="15" width="322" height="144" />
    <rect x="5" y="220" rx="15" ry="15" width="322" height="144" />
    <rect x="350" y="220" rx="15" ry="15" width="322" height="144" />

  </ContentLoader>
)

export default MyLoader

