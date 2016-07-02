module View exposing (view)

import Html as H
import Html.Attributes as A
import Html.Events as E

import Constants as C
import Model
import Update
import Components.Intersection exposing (intersection)


view : Model.Model -> H.Html a
view model =
  H.div
    []
    [
      intersection {
        isBottomEdge = False,
        isLeftEdge = False,
        isRightEdge = False,
        isTopEdge = False,
        isStarPoint = True,
        state = Model.Black,
        width = C.grid_spacing
      }
    ]
