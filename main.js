"use strict"


//obj {over : trueval: position}
let moveState = false
let movesPosiible = []
let $pieceSelected
let moveId = ""
var white = "#FFFFFF";
var black = "#000000";
var blackPiece = "<img class='piece blackPiece' src='https://lh5.ggpht.com/K3F-iniKTYk-ZZZI6I2UWe64TqBQrjDEtlqTqu87d6xk7rJvX6ZMcXWa1NSRl7TSAw=w300' />"
var redPiece ="<img class='piece redPiece' src='http://checkers.io/img/red-piece.png' />"
$(function() {
  $('.game').hide()

  //Start button 
  $('#start').on('click', function() {
    $('.game').show();
    chessBoard(8)
    $('.welcome').hide();
  });


  //Restart button
  $('#restart').on('click', function() {
    chessBoard(8)
  });

  
  // $("button").click(function() {
  //   var text = $("input").val()
  //   console.log(text)
  //   if (text !== "" || parseInt(text).isNaN()) {
  //     chessBoard(parseInt(text))
  //   }
  // });
  
});



function chessBoard(cols) {
     $('tbody').empty()
    var rows = new Array(cols + 1).join("<td></td>")
    var rest = new Array(cols + 1).join("<tr> " + rows + " </tr>")
    $('tbody').html(rest)
    $('tr:nth-child(odd) td:nth-child(odd)').addClass("black")
    $('tr:nth-child(odd) td:nth-child(even)').addClass('white')
    $('tr:nth-child(even) td:nth-child(even)').addClass('black')
    $('tr:nth-child(even) td:nth-child(odd)').addClass('white')
  
    $('td:nth-child(odd)').addClass('ood')
    $('td:nth-child(even)').addClass('even')
    $('tr:nth-child(odd)').addClass('odd')
    $('tr:nth-child(even)').addClass('even')
    var black = Math.floor((cols + 1) / 2)
    var red = cols + 1 - black
    // $("tr:nth-child(-n + " + black + ") .white").append(blackPiece)
    // $("tr:nth-child(n + " + red + ") .white").append(redPiece)
    let $white = $('.white')
    
    for (let i = 0; i < 12; i++ ) {
      $white[i].innerHTML = blackPiece
    }

    for (let i = 20; i < $white.length; i++) {
      $white[i].innerHTML = redPiece
    }

    for (let i = 0; i < $white.length; i++) {
    
      if($($white[i]).children().length) {
        let $temp =  $($white[i]).children()
        $($temp).attr('id', i + 1)
        //$($white[i]).children[0].attr('id', i+1)
      }
      $($white[i]).attr('id', i+1)
    }
    $(".piece").css({
      "width": "25px",
      "height": "25px"
    });

    $($white).on('click', function(event) {
      let isRight = false
      // console.log("array ", movesPosiible)
      // console.log('array of ids', movesPosiible)
      // console.log('id selected ', $($pieceSelected).attr("id"))
      if (moveState && movesPosiible.length) {
        for (var i = 0; i < movesPosiible.length; i++) {
          if (parseInt($(this).attr('id')) === movesPosiible[i].val
            &&  $(this).attr("id") !== $($pieceSelected).attr('id'))  {
            isRight = true
            $($pieceSelected).detach();
            $($pieceSelected).attr("id", $(this).attr("id"))
            let pos = parseInt($(this).attr("id"))
            console.log("curent position ", pos)

            $(this).append($pieceSelected)
            $(".white").css('background-color', 'white');
            console.log(movesPosiible[i])
            if (movesPosiible[i]['over'] !== -1)
              $('#' + movesPosiible[i]['over'] + '> img').detach();
            movesPosiible = []
            $($pieceSelected).css({"border": "",
              "border-color": ""});
            $pieceSelected = '';


            //king statement 
            if (pos >= 1 && pos <= 4) {
              console.log("I am king")
              $("#" + pos + ">img").css('background-color', '#FFA500');
              $("#" + pos + ">img").addClass('king');
            }
          }
        }
        
        if (!isRight &&  $(this).attr("id") !== $($pieceSelected).attr('id')) 
          alert("Incorrect movement!")
        
        
      }
    });

    $('.piece').on('click', function(event) {

    //console.log("clientY", event.clientY)
    if ($pieceSelected) {
      $($pieceSelected).css({"border": "",
      "border-color": ""});
      movesPosiible = []
      $(".white").css('background-color', 'white');
    }
    $(this).css({"border": "solid",
      "border-color": "yellow"});
    moveState = true
    $pieceSelected = $(this)

    let pieceID = parseInt($($pieceSelected).attr('id'))
    console.log("king?", $($pieceSelected).hasClass("king"))
    movesPosiible.push(pieceID)
    let obj = {}
        if($($pieceSelected).hasClass('redPiece')) {
          if ($($pieceSelected).parent().hasClass('even')) {
            if ($('#' + (pieceID - 3)).attr('class') !== "white even"
              && $('#' + (pieceID - 3)).children().length === 0) {
              $('#' + (pieceID - 3)).css('background-color', 'yellow');
              obj = {"over": -1, "val": pieceID - 3}
              movesPosiible.push(obj)
              //if is king 
              if ($($pieceSelected).hasClass("king") && 
                $('#' + (pieceID + 3)).children().length === 0) {
                console.log("king ", 1)
                obj = {"over": -1, "val": pieceID + 3}
                $('#' + (pieceID + 3)).css('background-color', 'yellow');
                movesPosiible.push(obj)
              }
            } else if ($($pieceSelected).hasClass("king")  &&
                $($('#' + (pieceID + 3)).children()[0]).hasClass('blackPiece')) {
                obj = {"over": pieceID + 3, "val": pieceID + 7}
                console.log("king ", 2)
                if ($('#' + (pieceID + 7)).children().length === 0) {
                  $('#' + (pieceID + 7)).css('background-color', 'yellow');
                  movesPosiible.push(obj)
                }
              } else { // there is a neghtbor 
              
              if ($($('#' + (pieceID - 3)).children()[0]).hasClass('blackPiece')) {
                //console.log(" wrong blackPiece ", pieceID)
                obj = {"over": pieceID - 3, "val": pieceID - 7}
                if ($('#' + (pieceID - 7)).children().length === 0) {
                  $('#' + (pieceID - 7)).css('background-color', 'yellow');
                  movesPosiible.push(obj)
                }
              }
            }
            
            //secnond half
            if ($('#' + (pieceID - 4)).attr('class') !== "white even"
              && $('#' + (pieceID - 4)).children().length === 0) {
              $('#' + (pieceID - 4)).css('background-color', 'yellow');
              obj = {"over": -1, "val": pieceID - 4}
              movesPosiible.push(obj)

              //if is king 
              if ($($pieceSelected).hasClass("king") && 
                $('#' + (pieceID + 4)).children().length === 0) {
                console.log("king ", 3)
                obj = {"over": -1, "val": pieceID + 4}
                $('#' + (pieceID + 4)).css('background-color', 'yellow');
                movesPosiible.push(obj)
              }
            } else if ($($pieceSelected).hasClass("king")  &&
                $($('#' + (pieceID + 4)).children()[0]).hasClass('blackPiece')) {
                console.log("king ", 4)
                obj = {"over": pieceID + 4, "val": pieceID + 9}
                if ($('#' + (pieceID + 9)).children().length === 0) {
                  $('#' + (pieceID + 9)).css('background-color', 'yellow');
                  movesPosiible.push(obj)
                }
              } else { //negithbor
              if ($($('#' + (pieceID - 4)).children()[0]).hasClass('blackPiece')) {
                //console.log(" wrong 2 blackPiece ", pieceID)
                if ($('#' + (pieceID - 9)).children().length === 0) {
                  $('#' + (pieceID - 9)).css('background-color', 'yellow');
                  obj = {"over": pieceID - 4, "val": pieceID - 9}
                  movesPosiible.push(obj)
                }
              }
            }
          } else {

            if ($('#' + (pieceID - 5)).attr('class') !== "white ood"
              && $('#' + (pieceID - 5)).children().length === 0) {
              $('#' + (pieceID - 5)).css('background-color', 'yellow');
              obj = {"over": -1, "val": pieceID - 5}
              movesPosiible.push(obj)

              //if is king 
              if ($($pieceSelected).hasClass("king") && 
                $('#' + (pieceID + 5)).children().length === 0) {
                console.log("king ", 5)
                obj = {"over": -1, "val": pieceID + 5}
                $('#' + (pieceID + 5)).css('background-color', 'yellow');
                movesPosiible.push(obj)
              }
            } else if ($($pieceSelected).hasClass("king")  &&
                $($('#' + (pieceID + 5)).children()[0]).hasClass('blackPiece')) {
                obj = {"over": pieceID + 5, "val": pieceID + 9}
                console.log("king ", 6)
                if ($('#' + (pieceID + 9)).children().length === 0) {
                  $('#' + (pieceID + 9)).css('background-color', 'yellow');
                  movesPosiible.push(obj)
                }
              } else { //neightbor
              if (($($('#' + (pieceID - 5)).children()[0])).hasClass('blackPiece')) {
                //console.log("-7 blackPiece ", pieceID)
                if ($('#' + (pieceID - 9)).children().length === 0) {
                  $('#' + (pieceID - 9)).css('background-color', 'yellow');
                  obj = {"over": pieceID - 5, "val": pieceID - 9}
                  movesPosiible.push(obj)
                }
              }
            }

            //second half
            if ($('#' + (pieceID - 4)).attr('class') !== 'white ood'
              && $('#' + (pieceID - 4)).children().length === 0) {
              $('#' + (pieceID - 4)).css('background-color', 'yellow');
              obj = {"over": -1, "val": pieceID - 4}
              movesPosiible.push(obj)
              //if is king 
              if ($($pieceSelected).hasClass("king") && 
                $('#' + (pieceID + 4)).children().length === 0) {
                console.log("king ", 7)
                obj = {"over": -1, "val": pieceID + 4}
                $('#' + (pieceID + 4)).css('background-color', 'yellow');
                movesPosiible.push(obj)
              }
            } else if ($($pieceSelected).hasClass("king")  &&
                $($('#' + (pieceID + 4)).children()[0]).hasClass('blackPiece')) {
                obj = {"over": pieceID + 4, "val": pieceID + 7}
                console.log("king ", 8)
                if ($('#' + (pieceID + 7)).children().length === 0) {
                  $('#' + (pieceID + 7)).css('background-color', 'yellow');
                  movesPosiible.push(obj)
                }
              } else {
              
              if ($($('#' + (pieceID - 4)).children()[0]).hasClass('blackPiece')) {
                //console.log(" -4 blackPiece ", pieceID)
                if ($('#' + (pieceID - 7)).children().length === 0) {
                  $('#' + (pieceID - 7)).css('background-color', 'yellow');
                  obj = {"over": pieceID - 4, "val": pieceID - 7}
                  movesPosiible.push(obj)
                }
              }
            }
          }
          //black pieces
        } else {
          if ($($pieceSelected).parent().hasClass('even')) {
            if ($('#' + (pieceID + 5)).attr('class') !== "white even"
              && $('#' + (pieceID + 5)).children().length === 0) {
              $('#' + (pieceID + 5)).css('background-color', 'yellow');
              obj = {"over": -1, "val": pieceID + 5}
              movesPosiible.push(obj)
            } else {
              if ($($('#' + (pieceID + 5)).children()[0]).hasClass('redPiece')) {
                //console.log("redPiece")
                if ($('#' + (pieceID + 9)).children().length === 0) {
                  $('#' + (pieceID + 9)).css('background-color', 'yellow');
                  obj = {"over": pieceID + 5, "val": pieceID + 9}
                  movesPosiible.push(obj)
                }
              }
            }
            if ($('#' + (pieceID + 4)).attr('class') !== "white even"
              && $('#' + (pieceID + 4)).children().length === 0) {
              $('#' + (pieceID + 4)).css('background-color', 'yellow');
              obj = {"over": -1, "val": pieceID + 4}
              movesPosiible.push(obj)
            } else {
              if ($($('#' + (pieceID + 4)).children()[0]).hasClass('redPiece')) {
                //console.log(" wrong redPiece ",  $('#' + (pieceID + 7)).children.length
                //, " ", pieceID + 7)
                if ($('#' + (pieceID + 7)).children().length === 0) {
                  $('#' + (pieceID + 7)).css('background-color', 'yellow');
                  obj = {"over": pieceID  + 4, "val": pieceID + 7}
                  movesPosiible.push(obj)
                }
              }
            }
          } else {
            if ($('#' + (pieceID + 3)).attr('class') !== "white ood"
              && $('#' + (pieceID + 3)).children().length === 0) {
              $('#' + (pieceID + 3)).css('background-color', 'yellow');
              obj = {"over": -1, "val": pieceID + 3}
              movesPosiible.push(obj)
            }  else {
              if ($($('#' + (pieceID + 3)).children()[0]).hasClass('redPiece')) {
               
                if ($('#' + (pieceID + 7)).children().length === 0) {
                  $('#' + (pieceID + 7)).css('background-color', 'yellow');
                  obj = {"over": pieceID + 3, "val": pieceID + 7}
                  movesPosiible.push(obj)
                }
              }
            }
            if ($('#' + (pieceID + 4)).attr('class') !== "white ood"
              && $('#' + (pieceID + 4)).children().length === 0) {
              $('#' + (pieceID + 4)).css('background-color', 'yellow');
              obj = {"over": -1, "val": pieceID + 4}
              movesPosiible.push(obj)
            } else {
              if ($($('#' + (pieceID + 4)).children()[0]).hasClass('redPiece')) {
                console.log("redPiece")
                if ($('#' + (pieceID + 9)).children().length === 0) {
                  $('#' + (pieceID + 9)).css('background-color', 'yellow');
                  obj = {"over": pieceID+ 4, "val": pieceID + 9}
                  movesPosiible.push(obj)
                }
              }
            }
          }
        }
        //console.log($(this).attr('id'))

    //let $btnDeatach =  $(this).detach();
    //console.log($btnDeatach)
    });
}