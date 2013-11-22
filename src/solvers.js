/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



window.findNRooksSolution = function(n){
  var solution = (new Board({'n':n})).rows();
  for(var i = 0; i < n; i++){
    solution[i][i] = 1;
  }
  return solution;
};

window.countNQueensSolutions = function(n){
  n = n - 1;
  var
    solutionCount = 0,
    col           = new Int8Array(n+1),
    maj           = new Int8Array(n+n+1),
    min           = new Int8Array(n+n+1);
  var recurse = function(x, col, maj, min){
    for(var y = 0; y < n + 1; y++){
      if(maj[n + x - y] || min[x + y]){
        continue;
      }
      if(!col[y]){
        if(x === n){
          return solutionCount++;
        }
        col[y] = 1; 
        maj[n + x - y] = 1; 
        min[x + y] = 1;
        recurse(x + 1, col, maj, min);
        col[y] = 0; 
        maj[n + x - y] = 0; 
        min[x + y] = 0;
      }
    }
  }
  recurse(0, col, maj, min);
  return solutionCount;
}

window.countNRooksSolutions = function(n){
  var
    solutionCount = 0,
    col           = new Int8Array(n);

  var recurse = function(col){
    var sum = _.reduce(col, function(result, value){
      return result + value;
    }, 0);
    if( sum === n){
      solutionCount++;
      return;
    }
    for(var j = 0; j < n; j++){
      if(col[j] === 0){
        col[j] = 1;
        recurse(col);
        col[j] = 0;
      }
    }
  }
  recurse(col);
  return solutionCount;
}



///// NAIVE IMPLEMENTATIONS /////

// window.countNQueensSolutionsNaive = function(n){
//   var memo = {};
//   var recurse = function(n, board){
//     board = board || new Board({'n': n });

//     _.each(board.rows(), function (row, yidx) {
//       _.each(row, function (cell, xidx) {
//         if (cell === 0){
//           board.insert(xidx, yidx, 1);
//         }
//         if (board.hasAnyQueensConflicts()){
//           board.insert(xidx, yidx, 'X');
//         } else {
//           if(cell !== 1 && cell !== 'X'){
//             board.insert(xidx, yidx, 0);
//           }
//         }
//       });
//     });
//     if (board.countThings(0) === 0){
//       if (board.countThings(1) >= n){
//         var key = JSON.stringify(board.rows());
//         memo[key] = true;
//       }
//     } else {
//       _.each(board.rows(), function (row, yidx) {
//         _.each(row, function (cell, xidx) {
//           if (cell === 0){

//             var dupedBoard = new Board(JSON.parse(JSON.stringify(board.rows())));

//             dupedBoard.insert(xidx, yidx, 1); //inserting fo realz
//             recurse(n, dupedBoard);

//           }
//         });
//       });
//     }
//   }
//   recurse(n);
//   var keyCount = 0;
//   for (var keys in memo){
//     keyCount++;
//   }
//   return keyCount;
// };

// window.countNRooksSolutionsNaive = function(n){
//   var memo = {};
//   var recurse = function(n, board){
//     board = board || new Board({'n': n });

//     _.each(board.rows(), function (row, yidx) {
//       _.each(row, function (cell, xidx) {
//         if (cell === 0){
//           board.insert(xidx, yidx, 1);
//         }
//         if (board.hasAnyRooksConflicts()){
//           board.insert(xidx, yidx, 'X');
//         } else {
//           if(cell !== 1 && cell !== 'X'){
//             board.insert(xidx, yidx, 0);
//           }
//         }
//       });
//     });

//     // if (JSON.stringify(board.rows()) === JSON.stringify([[1,"X"],["X",1]])){
//     //   debugger;
//     // }
//     if ( board.countThings(0) === 0 ){
//       // countThings will count the number of the
//       // passed in value that are contained in the board
//       if (board.countThings(1) >= n){
//         var key = JSON.stringify(board.rows());
//         memo[key] = true;
//         // count++;
//       }
//     } else {
//       _.each(board.rows(), function (row, yidx) {
//         _.each(row, function (cell, xidx) {
//           if (cell === 0){

//             var dupedBoard = new Board(copyArray(board.rows()));

//             dupedBoard.insert(xidx, yidx, 1); //inserting fo realz
//             recurse(n, dupedBoard);

//           }
//         });
//       });
//     }
//   }
//   recurse(n);
//   var keyCount = 0;
//   for (var keys in memo){
//     keyCount++;
//   }
//   console.log('Number of solutions for ' + n + ' rooks:', keyCount);
//   return keyCount;
// };

// window.copyArray = function(arr){
//   var result = [];
//   for(var i = 0; i < arr.length; i++){
//     result.push(arr[i].slice(0));
//   }
//   return result;
// }

// *** NOT WORKING***

// window.countNRooksSolutions = function(n){
//   var coords = [];
//   var result;
//   var i = 0;
//   var directions = ["right", "down", "left", "up"];

//   // this will 
//   for( var maxStep = n, path = "right", stepper = 0, x = 0, y = 0; maxStep < 0; stepper++){
//     if(stepper === maxStep){
//       maxStep -= 2;
//       i += 1;
//       path = directions[i];
//       stepper = 0;
//     }
//     coords.push([x,y]);
//     switch(path){
//       case "right":
//         x++;
//         break;
//       case "down":
//         y++;
//         break;
//       case "left":
//         x--;
//         break;
//       case "up":
//         y--;

//         break;
//     }
//   }
//   

//   // if the board is an odd number, we need to add the center cell.
//   if(n % 2 && n > 1){
//     var coord = Math.ceil(n / 2);
//     coords.push([coord, coord]);
//   }

//   var cols = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
//   var rows = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);

//   var recur = function(arrRows, arrCols, rookPositions){
//     for (x = 0; x < arrRows.length; x++) {
//       for (y = 0; y < arrCols.length; y++) {
//         var red = _.reduce(arrRows.concat(arrCols), function(sum, num){ 
//           return sum + num;
//         }, 0);
//         if( red === n * 2 ){
//           result += returnWeightedSymmetry(rookPositions, n);
//         }
//         if (arrRows[x] === 0 && arrCols[y] === 0){
//           arrRows[x] = 1;
//           arrCols[y] = 1;
//           rookPositions[(x + ":" + y)] = true;
//           recur(arrRows, arrCols, rookPositions);
//         }
//       };
//     };
//     // generate solutions
//   }

//   // pre-vetted intitialized boards
//   for (var i = 0; i < coords.length; i++) {
//     cols[ coords[i][0] ] = 1;   //[0,1,0,0,0]
//     rows[ coords[i][1] ] = 1;   //[1,0,0,0,0]
//     var queenPosX = coords[i][0];
//     var queenPosY = coords[i][1];
//     var queenPos = queenPosX + ":" + queenPosY;

//     recur(rows, cols, { queenPos: true });
//   };
//   return result;
// };

// window.returnWeightedSymmetry = function(obj, n){
//   var newObj = {};
//   var coords, x, y;
//   var coord;

//   // rotate 90 degrees
//   _.each(obj, function(item, key){
//     coords = key.split(":");
//     x = coords[0];
//     y = coords[1];
//     x = n - y;
//     y = n - x;
//     coord = x + ":" + y;
//     newObj[coord] = true;

//   })

//   if (JSON.stringify(obj) === JSON.stringify(newObj)){
//     // symmetry is 4-rotational. we're done and don't need to check further.
//     return 1;
//   }

//   // rotate 180 degrees
//   _.each(obj, function(item, key){
//     coords = key.split(":");
//     x = coords[0];
//     y = coords[1];
//     x = n - x;
//     y = n - y;
//     coord = x + ":" + y;
//     newObj[coord] = true;
//   })

//   if (JSON.stringify(obj) === JSON.stringify(newObj)){
//     // symmetry is 2-rotational
//     return 2;
//   }
//   return 4;
// }