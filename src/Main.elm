module Main exposing (main)

import Html

import Model
import Update
import View


main : Program Never Model.Model Update.Action
main =
  Html.beginnerProgram
    {
      model = Model.init,
      update = Update.update,
      view = View.view
    }
