module Model exposing (..)

import Array
import Constants as C


type Color
    = Black
    | White
    | Empty


type alias Board =
    Array.Array (Array.Array Color)


type alias Model =
    { turn : Color
    , captures :
        { black : Int
        , white : Int
        }
    , board : Board
    , history : List Board
    }


init : Model
init =
    { turn = Black
    , captures =
        { black = 0
        , white = 0
        }
    , board =
        Array.initialize
            C.grid_size
            (\i ->
                Array.initialize
                    C.grid_size
                    (always Empty)
            )
    , history = []
    }
