module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    }


type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int


init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
            { model | newPlayer = { name = name, id = model.newPlayer.id, isActive = model.newPlayer.isActive } }

        AddPlayer ->
                let
                    newPlayer1 =
                        { id = (List.length model.players + 1), name = model.newPlayer.name, isActive = model.newPlayer.isActive }
                in
                { model
                    | players = model.players ++ [newPlayer1]  -- Wrap newPlayer1 in a list
                    , newPlayer = initPlayer 0 -- Reset new player after adding
                }


        DeletePlayer id ->
             { model
                | players =
                    List.filter (\player -> player.id /= id) model.players 
             }

        ModifyPlayer id status ->
            { model
                | players =
                    List.map
                        (\player ->
                            if player.id == id then
                                { player | isActive = status }
                            else
                                player
                        )
                        model.players
            }
 
           

view : Model -> Html Msg
view model =
    div []
        [h1 [] [ text "Elm Exercise: Players CRUD112"],
        Html.form [ id "submit-player" , onSubmit AddPlayer]
        [ input
                [ id "input-player"
                , type_ "text"
                , placeholder "Enter player name"
                , value model.newPlayer.name 
                , onInput SetName
                ]
                []
            , button [ id "btn-add", type_ "submit" ] [ text "Add Player" ]
            ]
        , ol [ id "players-list"]
            (List.map viewPlayer model.players)
        ]


viewPlayer : Player -> Html Msg
viewPlayer player =
    li [ id ("player-" ++ String.fromInt player.id) ]
        [ div [ class "player-name" ] [ text player.name ]
        , label [ class "player-status" ]
            [ text (if player.isActive then "active" else "inactive")
            , input [ type_ "checkbox", checked player.isActive, onClick (ModifyPlayer player.id (not player.isActive)), class "player-status" ] []
            , span [ class "checkmark" ] []
            ]
        , button [ class "btn-delete", onClick (DeletePlayer player.id) ] [ text "Delete" ]
        ]

 

 

main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
