module Update exposing (update, Action (..))

import Model


type Action = NoOp


update : Action -> Model.Model -> Model.Model
update action model =
  case action of
    _ ->
      model
