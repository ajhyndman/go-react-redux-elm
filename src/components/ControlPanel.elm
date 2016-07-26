module Components.ControlPanel exposing (controlPanel)

import Html as H
import Html.Attributes as A

import Components.PassButton exposing (passButton)
import Components.TurnIndicator exposing (turnIndicator)
import Constants as C
import Model
import Update


type alias Props = {
  captures: {
    black: Int,
    white: Int
  },
  turn: Model.Color
}

controlPanel : Props -> H.Html Update.Action
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
        ],
      H.div [A.class "col s2"]
        [
          H.div [A.class "row"]
            [
              turnIndicator { color = Model.Black, size = 20 },
              H.span [A.class "badge", A.style [("color", "white")]]
                [
                  H.text (toString props.captures.black)
                ]
            ],
          H.div [A.class "row"]
            [
              turnIndicator { color = Model.White, size = 20 },
              H.span [A.class "badge", A.style [("color", "white")]]
                [
                  H.text (toString props.captures.white)
                ]
            ]
        ]
    ]
