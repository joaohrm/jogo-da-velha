import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }){
    const [ playerName, setPlayerName ] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false);

    function handleEditClick(){
        setIsEditing(editing => !editing);
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let playerNameField = isEditing ? <input type="text" required value={ playerName } onChange={ handleChange } /> : <span className="player-name">{ playerName }</span>;

    return (
        <li className={ isActive ? 'active' : undefined }>
            <span className="player">
            { playerNameField }
            <span className="player-symbol">{ symbol }</span>
            </span>
            <button onClick={ handleEditClick }>{ isEditing ? 'Salvar' : 'Editar' }</button>
        </li>
    );
}