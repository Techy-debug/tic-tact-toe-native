import React, { useState } from 'react'
import { Button, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'



function Board() {
    // 🐨 squares is the state for this component. Add useState for squares
    const [squares, setSquares] = useState(Array(9).fill(null))
  
    // 🐨 We'll need the following bits of derived state:
    const nextValue = calculateNextValue(squares)
    const winner = calculateWinner(squares)
    const status = calculateStatus(winner, squares, nextValue)
    // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
    // 💰 I've written the calculations for you! So you can use my utilities
    // below to create these variables
  
    // This is the function your square click handler will call. `square` should
    // be an index. So if they click the center square, this will be `4`.
    function selectSquare(square) {
      // 🐨 first, if there's already winner or there's already a value at the
      // given square index (like someone clicked a square that's already been
      // clicked), then return early so we don't make any state changes
      
      if(winner || squares[square]) {
        return;
      }
  
  
      // 🦉 It's typically a bad idea to mutate or directly change state in React.
      // Doing so can lead to subtle bugs that can easily slip into production.
      //
      const squaresCopy = [...squares]
      squaresCopy[square] = nextValue
  
      setSquares(squaresCopy)
      //
      // 🐨 set the value of the square that was selected
      // 💰 `squaresCopy[square] = nextValue`
      //
      // 🐨 set the squares to your copy
    }
  
    function restart() {
      setSquares(Array(9).fill(null))
    }

    const alertFinalMsg = winner =>
    Alert.alert(
     `${winner} wins`,
      "Lets Rock and Roll... huyyyyyyaa",
      [
        { text: "OK", onPress: () => {} }
      ],
      { cancelable: true }
    );
  
    function renderSquare(i) {
      return (
            
            <TouchableOpacity  style={styles.columnButton} onPress={() => selectSquare(i)}>
                <View style={styles.textWraper}>
                    <Text>
                        {squares[i]}
                    </Text>
                </View>
            </TouchableOpacity>
      )
    }
    
    if(winner) {
        
        alertFinalMsg(winner)
    }
  
    return (
      <View style={styles.boardWrapper} >
        <View>
            <Text>{status}</Text>
        </View>
        <View style={styles.boardRow}>
          {renderSquare(1)}
          {renderSquare(0)}
          {renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.boardRow}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
        <TouchableOpacity style={styles.restartButton} onPress={restart}>
            <Text style={{color: "white"}}>
                Restart
            </Text>
        </TouchableOpacity>
        {/* <Button title="restart" color="#F89221" onPress={restart} /> */}
      </View>
    )
  }



// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
    return winner
      ? `Winner: ${winner}`
      : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`
  }
  
  // eslint-disable-next-line no-unused-vars
  function calculateNextValue(squares) {
    const xSquaresCount = squares.filter(r => r === 'X').length
    const oSquaresCount = squares.filter(r => r === 'O').length
    return oSquaresCount === xSquaresCount ? 'X' : 'O'
  }
  
  // eslint-disable-next-line no-unused-vars
  //B(n)2
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
  

  export default Board;


  const styles = StyleSheet.create({
      boardRow: {
        display: 'flex',
        flexDirection: "row"
      },
      boardWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
      },
      columnButton: {
         width: 100,
         height: 100,
         backgroundColor: "blue",
         margin: 1
      },
      columnButtonWraper: {
          width: 100,
          height: 100,
      },
      textWraper: {
        display: "flex",
        backgroundColor: "#f9e22c",
        height: "100%",
        justifyContent: 'center',
        alignItems: "center"
      },
      restartButton: {
        backgroundColor: "#28d6c0",
        marginTop: 50,
        padding: 10,
        width: 300,
        alignItems: 'center',
        fontWeight: "800",   
        },
  })