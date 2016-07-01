module Main exposing (main)

import Html.App as App

import Model
import Update
import View


main : Program Never
main =
  App.beginnerProgram
    {
      model = init,
      update = Update.update,
      view = View.view
    }


init : Model.Model
init =
  {
    text = "Hello, Violet!"
  }
