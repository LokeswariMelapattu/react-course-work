-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , reqStatus : String
    }


type Msg
    = SetName String
    | ModifyPlayer Int Bool
    | AddPlayer
    | DeletePlayer Int
    | FetchPlayers (Result Http.Error (List Player))


playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder


fetchPlayers : String -> Cmd Msg
fetchPlayers url =
    Http.get
        { url = url
        , expect = Http.expectJson FetchPlayers playersDecoder
        }



listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


init : () -> ( Model, Cmd Msg )
init _ =
    ( { 
        players = []
      , newPlayer = initPlayer 0
      , reqStatus = "Loading..."
    }
    , fetchPlayers "http://localhost:3001/api/players/"
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetName word ->
            -- Return both the updated model and Cmd.none
            ( { model | newPlayer = { name = word, id = model.newPlayer.id, isActive = model.newPlayer.isActive } }
            , Cmd.none
            )

        AddPlayer ->
            ( model, Cmd.none )

        DeletePlayer id ->
            ( { model
                | players =
                    List.filter (\player -> player.id /= id) model.players
            }
            , Cmd.none
            )

        ModifyPlayer id status ->
            ( { model
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
            , Cmd.none
            )

        FetchPlayers data -> 
             case data of
                Ok players ->
                    let
                        nextId =
                            case listLast players of
                                Just player ->
                                    player.id + 1

                                Nothing ->
                                    1
                    in
                    ( { model | players = players, reqStatus = "", newPlayer = initPlayer nextId }, Cmd.none )

                Err _ ->
                    ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )
        


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Elm Exercise: Players Fetch" ]
        , Html.form [ id "submit-player", onSubmit AddPlayer ]
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
        , ol [ id "players-list" ]
            (List.map viewPlayer model.players)
        , div [ id "request-status" ] [ text model.reqStatus ] -- Add status display
        ]

viewPlayer : Player -> Html Msg
viewPlayer player =
    li [ id ("player-" ++ String.fromInt player.id) ]
        [ div [ class "player-name" ] [ text player.name ]
        , label [ class "player-status" ]
            [ text (if player.isActive then "active" else "inactive")
            , input
                [ type_ "checkbox"
                , checked player.isActive
                , onClick (ModifyPlayer player.id (not player.isActive)) -- Fix type
                , class "player-status"
                ]
                []
            , span [ class "checkmark" ] []
            ]
        , button
            [ class "btn-delete", onClick (DeletePlayer player.id) ] -- Fix type
            [ text "Delete" ]
        ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
