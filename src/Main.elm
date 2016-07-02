module Main exposing (main)

import Html.App as App

import Model
import Update
import View


grid_size : Int
grid_size = 19

grid_spacing : Int
grid_spacing = 40

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
