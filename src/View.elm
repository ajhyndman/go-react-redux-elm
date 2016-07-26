module View exposing (view)

import Html as H
import Html.Attributes as A

import Model
import Update
import Components.Board exposing (board)
import Components.ControlPanel exposing (controlPanel)


view : Model.Model -> H.Html Update.Action
view model =
  H.div []
    [
      H.div [A.class "container"]
        [
          board { boardState = model.board }
        ],
      H.div
        [
          A.class "page-footer blue-grey darken-2",
          A.style [("marginTop", "20px"), ("padding", "20px")]
        ]
        [
          H.div [A.class "container"]
            [
              controlPanel {
                captures = model.captures,
                turn = model.turn
              }
            ]
        ]
    ]
