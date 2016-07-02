module Model exposing (..)

import Constants as C


type Color = Black | White | Empty

type alias Model =
  {
    turn: Color,
    board: List (List Color)
  }

init : Model
init =
  {
    turn = Black,
    board = 
      List.map 
        (\i -> List.map (\i -> Empty) [0..C.grid_size]) 
        [0..C.grid_size]
  }
