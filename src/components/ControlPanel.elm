module Components.ControlPanel exposing (controlPanel)

import Html as H
import Html.Attributes as A

import Components.PassButton exposing (passButton)
import Components.TurnIndicator exposing (turnIndicator)
import Constants as C
import Model


type alias Props = {
  turn: Model.Color
}

controlPanel props =
  H.div [A.class "row", A.style [("text-align", "center")]]
  [
    H.div [A.class "col s4", A.style [("text-align", "center")]]
      [
        turnIndicator { color = props.turn, size = C.grid_spacing * 2 }
      ],
    H.div [A.class "col s4", A.style [("text-align", "center")]]
      [
        passButton {}
      ]
  ]
