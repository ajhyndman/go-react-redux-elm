module Components.TurnIndicator exposing (turnIndicator)

import Html as H
import Html.Attributes as A

import Model
import Components.Stone exposing (stone)
import Update


type alias Props = {
  color: Model.Color,
  size: Float
}

turnIndicator : Props -> H.Html Update.Action
turnIndicator props =
  H.div
  [
    A.style [
      ("display", "inline-block"),
      ("height", toString props.size ++ "px"),
      ("position", "relative"),
      ("width", toString props.size ++ "px")
    ]
  ]
  [
    stone { color = props.color, containerWidth = props.size }
  ]
