module Update exposing (update, Action (..))

import Array

import Model


type Action = PLACE_STONE Int Int
            | PASS
            | NoOp


update : Action -> Model.Model -> Model.Model
update action model =
  case action of
    PLACE_STONE row col ->
      let
        pointState =
          (Array.get row model.board)
          |> (Maybe.withDefault Array.empty)
          |> Array.get col
          |> (Maybe.withDefault Model.Empty)
        point = { row = row, col = col }
      in
        (if
          pointState == Model.Empty
        then
          let rowContents = Maybe.withDefault Array.empty (Array.get row model.board) in
          { model
          | board = Array.set row (Array.set col model.turn rowContents) model.board,
            turn = if model.turn == Model.Black then Model.White else Model.Black
          }
        else
          model)
    PASS ->
      { model | turn = (if model.turn == Model.Black then Model.White else Model.Black) }
    _ ->
      model
