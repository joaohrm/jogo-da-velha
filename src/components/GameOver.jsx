export default function GameOver({ winner, onRestart }){
    return (
        <div id="game-over">
            <h2>Fim do jogo!</h2>
            { winner ? <p>{ winner } venceu!</p> : <p>Empate!</p> }
            <p>
                <button onClick={ onRestart }>Jogar novamente</button>
            </p>
        </div>
    )
}