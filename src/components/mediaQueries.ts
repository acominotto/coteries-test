
const breakpoints = [576, 1024]

// quick media queries

export const [mobile, tablet] = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

export const desktop =  `@media (min-width: ${breakpoints[1]}px)`