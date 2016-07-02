module View exposing (view)

import Html as H
import Html.Attributes as A
import Html.Events as E

import Constants as C
import Model
import Update
import Components.Board exposing (board)


view : Model.Model -> H.Html a
view model =
  H.div [A.class "container"]
    [
      board model.board
    ]
