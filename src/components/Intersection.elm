module Components.Intersection exposing (intersection)

import Html as H
import Html.Attributes as A

import Constants as C
import Components.Stone exposing (stone)
import Model


type alias IntersectionProps = {
  col: Int,
  row: Int,
  isTopEdge: Bool,
  isRightEdge: Bool,
  isLeftEdge: Bool,
  isBottomEdge: Bool,
  isStarPoint: Bool,
  state: Model.Color,
  width: Float
}

intersection : IntersectionProps -> H.Html message
intersection props =
  -- Layout
  H.div
    [
      A.style
        [
          ("float", "left"),
          ("lineHeight", "1"),
          ("paddingTop", toString props.width ++ "%"),
          ("position", "relative"),
          ("textAlign", "center"),
          ("width", toString props.width ++ "%")
        ]
    ]
    [
      -- Wrapper
      H.div
        [
          A.style
            [
              ("cursor", (if props.state == Model.Empty then "pointer" else "auto")),
              ("position", "absolute"),
              ("top", "0"),
              ("right", "0"),
              ("bottom", "0"),
              ("left", "0")
            ]
        ]
        [
          -- Star Point Marker
          (if
            props.isStarPoint
          then
            H.div
              [
                A.style
                  [
                    ("background", "#63380E"),
                    ("border-radius", "9000px"),
                    ("height", "6px"),
                    ("position", "absolute"),
                    ("left", "50%"),
                    ("top", "50%"),
                    ("transform", "translate(-50%, -50%)"),
                    ("width", "6px")
                  ]
              ] []
            else
              H.text ""),
          -- Grid Lines
          H.div
            [
              A.style
                [
                  ("background", "#63380E"),
                  ("height", "1px"),
                  ("position", "absolute"),
                  ("top", "50%"),
                  ("right", if props.isRightEdge then "50%" else "0"),
                  ("left", if props.isLeftEdge then "50%" else "0"),
                  ("transform", "translateY(-50%)")
                ]
            ] [],
          H.div
            [
              A.style
                [
                  ("background", "#63380E"),
                  ("position", "absolute"),
                  ("left", "50%"),
                  ("top", if props.isTopEdge then "50%" else "0"),
                  ("bottom", if props.isBottomEdge then "50%" else "0"),
                  ("transform", "translateX(-50%)"),
                  ("width", "1px")
                ]
            ] [],
          -- Render a stone if someone played here.
          case props.state of
            Model.Black -> stone Model.Black C.grid_spacing
            Model.White -> stone Model.White C.grid_spacing
            Model.Empty -> H.text ""
        ]
    ]