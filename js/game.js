		/// This function begin when DOM is fully ready
        $(document).ready(function () {
			//Fetch HTML properties
		    var drawCanvas = $("#drawCanvas")[0];  
            
			// Fetch the context and stipulate it as having no alpha/opacity
			var context = drawCanvas.getContext("2d", {alpha: false}); 
			
			//Fetch weight and height properties
            var width = $("#drawCanvas").width();
            var height = $("#drawCanvas").height();
 
				
            var snake_width = 10; 
            var position;
            var snakeFood1;
			var snakeFood2;
            var userPoint;
			var speed = 10;
            var mySnakeArray;
			/*
				This function determine the position of snake, generate the food and reduce the speed of snake.
				Also, it initialize the point of user as zero
			*/
           function start() {
                position = "down";
                createSnake();
                generateFood1();
				generateFood2();
				userPoint = 0;
                if (typeof game_loop != "undefined") clearInterval(game_loop);
                game_loop = setInterval(paintSnake, speed);
				speed = speed + 10;
            }
			
            start();
			/*
				This function initialize the size of snake as soon as soon the game begin  
			*/
           function createSnake() {
                var snakeSize = 10;
                mySnakeArray = [];
                for (var m = 0; m<snakeSize-1;m++) {
                    mySnakeArray.push({ x: 20, y: 0 });
                }
            }
	
			/*
				This function generate random number for position of food
			*/
            function generateFood1() {
                snakeFood1 = {
                    x: Math.round(Math.random() * (width - snake_width) / snake_width),
                    y: Math.round(Math.random() * (height - snake_width) / snake_width),
                };
             }

			function generateFood2() {
                snakeFood2 = {
                    x: Math.round(Math.random() * (width - snake_width) / snake_width),
                    y: Math.round(Math.random() * (height - snake_width) / snake_width),
                };
             }
			 
			/*
				This function paint the entire game and detect collision.
			*/
            function paintSnake() {
                context.fillStyle = "#a9ecef"; //background color
                context.fillRect(0, 0, width, height);
                context.strokeStyle = "#0b0121"; //border color
                context.strokeRect(0, 0, width, height);
				context.font = "20px Georgia"; //text font 
				
				//initial position of snake
                var pop_x = mySnakeArray[0].x;
                var pop_y = mySnakeArray[0].y;

				//current position of snake
                if (position == "right") pop_x++;
                else if (position == "left") pop_x--;
                else if (position == "down") pop_y++;
                else if (position == "up") pop_y--;
               
				 // Check if collision occur within snake or against wall.
                 if (pop_x == -1 || pop_x == width / snake_width || pop_y == -1 || pop_y == height / snake_width || check_collision(pop_x, pop_y, mySnakeArray)) {
                     start();
                     return;
                }
				 if (pop_x == snakeFood2.x && pop_y == snakeFood2.y) {
                    var snake_tail = { x: pop_x, y: pop_y };
                    userPoint = userPoint+5;
                    generateFood2();
                }
				else if (pop_x == snakeFood1.x && pop_y == snakeFood1.y) {
                    var snake_tail = { x: pop_x, y: pop_y };
                    userPoint = userPoint+5;
                    generateFood1();
                }
                else {
                    var snake_tail = mySnakeArray.pop();
                    snake_tail.x = pop_x; snake_tail.y = pop_y;
                }
 
                mySnakeArray.unshift(snake_tail);
				
                for (var i = 0; i < mySnakeArray.length; i++) {
                    var k = mySnakeArray[i];
                    paintCell(k.x, k.y);
                }
				
                paintCell(snakeFood1.x, snakeFood1.y);
                paintCell(snakeFood2.x, snakeFood2.y);
				
				//updating score in regular interval and display the position of score 
				var score_text = "Score: " + userPoint;
				context.fillText(score_text, width-125, 20, 200);

            }

			//This function paint the snake, food for snake.  
           function paintCell(x, y) {
                context.fillStyle = "brown";
                context.fillRect(x * snake_width, y * snake_width, snake_width, snake_width);
                context.strokeStyle = "black";
                context.strokeRect(x * snake_width, y * snake_width, snake_width, snake_width);
            }

			//This function check if it is on wall position
            function check_collision(x, y, array) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].x == x && array[i].y == y)
                        return true;
                }
                return false;
            }
			
		   // This function position the direction of snake
          $(document).keydown(function (e) {
                var keyInput = e.which;
                if (keyInput == "40" && position != "up") position = "down";
                else if (keyInput == "39" && position != "left") position = "right";
                else if (keyInput == "38" && position != "down") position = "up";
                else if (keyInput == "37" && position != "right") position = "left";
            })
        })