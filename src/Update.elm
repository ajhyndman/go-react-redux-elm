module Update exposing (update, Action (..))

import Array

import Model


type Action = PLACE_STONE Int Int
            | PASS
            | NoOp

type alias Point = { row: Int, col: Int }


-- Helper to get a value (with default) from a 2D array
getIn : Int -> Int -> any -> Array.Array (Array.Array any) -> any
getIn row col default grid =
  let
    thisRow = Maybe.withDefault Array.empty (Array.get row grid)
  in
    Maybe.withDefault default (Array.get col thisRow)


-- get the valid neighbours of the current point
getNeighbours : Model.Board -> Point -> List Point
getNeighbours board point =
  let
    up = { point | row = point.row - 1 }
    right = { point | col = point.col + 1 }
    down = { point | row = point.row + 1 }
    left = { point | col = point.col - 1 }
    height = Array.length board
    width = Array.length (Maybe.withDefault Array.empty (Array.get 0 board))
  in
    [up, right, down, left]
    |> List.filter (
      \neighbour ->
        (neighbour.row >= 0 && neighbour.row < height)
        && (neighbour.col >= 0 && neighbour.col < width)
    )

-- calculate the liberties of the group of a color at this point
-- NOTE: This function *can* currently count liberties multiple times,
--       but it doesn't matter, because we only care if it's zero.
getLiberties : Model.Board -> Point -> Model.Color -> Int
getLiberties board point color =
  let
    thisRow = Maybe.withDefault Array.empty (Array.get point.row board)
    thisColor = Maybe.withDefault Model.Empty (Array.get point.col thisRow)
    opponentColor = if color == Model.Black then Model.White else Model.Black
  in
    if thisColor == opponentColor
    then 0
    else if thisColor == Model.Empty
    then 1
    else
      let
        neighbours = getNeighbours board point
        visitedBoard =
          Array.set
            point.row
            (Array.set point.col opponentColor thisRow)
            board
      in
        neighbours |> (List.foldl
          (\neighbour liberties -> liberties + getLiberties visitedBoard neighbour color)
          0
        )

-- find and remove all of the stones connected to this one
removeGroup : Model.Board -> Point -> Model.Board
removeGroup board point =
  let
    thisRow = Maybe.withDefault Array.empty (Array.get point.row board)
    thisColor = Maybe.withDefault Model.Empty (Array.get point.col thisRow)
    neighbours = getNeighbours board point
    nextBoard =
      Array.set
        point.row
        (Array.set point.col Model.Empty thisRow)
        board
  in
    neighbours |> (List.foldl
      (\neighbour prevBoard ->
        if (getIn neighbour.row neighbour.col Model.Empty prevBoard == thisColor)
        then
          removeGroup prevBoard neighbour
        else
          prevBoard)
      nextBoard
    )

-- Analogous to the main Redux Reducers
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
        player = model.turn
        opponent = if player == Model.Black then Model.White else Model.Black
      in
        (if
          pointState == Model.Empty
        then
          let
            rowContents = Maybe.withDefault Array.empty (Array.get row model.board)
            tryStone =
              { model
              | board = Array.set row (Array.set col model.turn rowContents) model.board,
                turn = if model.turn == Model.Black then Model.White else Model.Black
              }
            neighbours = getNeighbours tryStone.board point
            removedDeadStones = neighbours |> (List.foldl
              (\neighbour prevBoard ->
                let
                  neighbourColor = getIn neighbour.row neighbour.col Model.Empty prevBoard
                  neighbourLiberties = getLiberties prevBoard neighbour opponent
                in
                  if neighbourColor == opponent && neighbourLiberties == 0
                  then removeGroup prevBoard neighbour
                  else prevBoard
              )
              tryStone.board
            )
            liberties = getLiberties removedDeadStones point player
          in
            if liberties == 0
            then Debug.log "You have attempted suicide!" model
            else
              let
                final =
                  { tryStone
                  | board = removedDeadStones,
                    history = model.board :: model.history
                  }
                prevState = List.head model.history
              in
                if Just final.board == prevState
                then Debug.log "You have invoked Ko.  You may not play here this turn." model
                else final
        else
          model)
    PASS ->
      { model | turn = (if model.turn == Model.Black then Model.White else Model.Black) }
    _ ->
      model
