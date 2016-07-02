module Update exposing (update, Action (..))

import Model


type Action = PLACE_STONE
            | PASS
            | NoOp


update : Action -> Model.Model -> Model.Model
update action model =
  case action of
    PLACE_STONE ->
      model
    PASS ->
      model
    _ ->
      model
