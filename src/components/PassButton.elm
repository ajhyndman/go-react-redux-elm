module Components.PassButton exposing (passButton)

import Html as H
import Html.Attributes as A
import Html.Events as E

import Update


type alias Props = {}

passButton : Props -> H.Html Update.Action
passButton props =
  H.button
    [
      E.onClick Update.PASS,
      A.class "waves-effect waves-light btn blue-grey darken-4"
    ]
    [
      H.text "Pass"
    ]
