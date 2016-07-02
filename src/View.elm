module View exposing (view)

import Html as H
import Html.Attributes as A
import Html.Events as E

import Model
import Update
import Stone exposing (stone)


view : Model.Model -> H.Html a
view model =
  H.div
    []
    [stone Model.Black 500]
