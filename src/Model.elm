module Model exposing (..)

import Constants as C


type Color = Black | White | Empty

type alias Board =
  List (List Color)

type alias Model =
  {
    turn: Color,
    board: Board
  }

init : Model
init =
  {
    turn = Black,
    board =
      List.map
        (\row -> List.map (\row -> Empty) [1..C.grid_size])
        [1..C.grid_size]
  }
