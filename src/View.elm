module View exposing (view)

import Html as H
import Html.Attributes as A
import Html.Events

import Model
import Update


view : Model.Model -> H.Html a
view model =
  H.div
    []
    [H.text model.text]
