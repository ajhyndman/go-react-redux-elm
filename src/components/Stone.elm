module Components.Stone exposing (stone)

import Html as H
import Html.Attributes as A
import Model


type alias Props =
    { color : Model.Color
    , containerWidth : Float
    }


stone : Props -> H.Html a
stone props =
    let
        w =
            props.containerWidth
    in
        H.div
            [ A.style
                [ ( "background"
                  , if props.color == Model.Black then
                        "#101015"
                    else
                        "#EEEEF0"
                  )
                , ( "border-radius", "9001px" )
                , ( "box-shadow"
                  , (if props.color == Model.Black then
                        "inset 0 " ++ toString (w / 6) ++ "px " ++ toString (w / 3) ++ "px 0 rgba(255,255,255,.2),"
                     else
                        "inset 0 " ++ toString (-w / 6) ++ "px " ++ toString (w / 3) ++ "px 0 rgba(0,0,0,.16),"
                    )
                        ++ "0 "
                        ++ toString (w / 12)
                        ++ "px "
                        ++ toString (w / 6)
                        ++ "px 0 rgba(0,0,0,.16),"
                        ++ "0 "
                        ++ toString (w / 12)
                        ++ "px "
                        ++ toString (w / 4)
                        ++ "px 0 rgba(0,0,0,.12)"
                  )
                , ( "position", "absolute" )
                , ( "top", "5%" )
                , ( "right", "5%" )
                , ( "bottom", "5%" )
                , ( "left", "5%" )
                ]
            ]
            []
