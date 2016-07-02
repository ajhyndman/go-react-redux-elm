module Main exposing (main)

import Html.App as App

import Model
import Update
import View


main : Program Never
main =
  App.beginnerProgram
    {
      model = Model.init,
      update = Update.update,
      view = View.view
    }
