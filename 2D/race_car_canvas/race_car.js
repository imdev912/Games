$(function () {
    var anim_id;

    var container = $("#container");
    var car = $("#car");
    var car_1 = $("#car_1");
    var car_2 = $("#car_2");
    var car_3 = $("#car_3");
    var line_1 = $("#line_1");
    var line_2 = $("#line_2");
    var line_3 = $("#line_3");
    var line_4 = $("#line_4")
    var restart_div = $("#restart_div");
    var restart_btn = $("#restart");
    var score = $("#score");
    var level = $("#level");

    var f_light_l = $("#f_light_l");
    var f_light_r = $("#f_light_r");
    var b_light_l = $("#b_light_l");
    var b_light_r = $("#b_light_r");

    var nav_left = $("#nav_left");
    var nav_up = $("#nav_up");
    var nav_right = $("#nav_right");
    var nav_down = $("#nav_down");

    var container_left = parseInt(container.css("left"));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());

    var game_over = false;
    var score_counter = 1;
    var counter_pointer = 128;
    var score_pointer = 512;
    var level_counter = 100;

    var speed = 2;
    var line_speed = 5;

    var move_left = false;
    var move_right = false;
    var move_down = false;
    var move_up = false;

    var x_limit = container_width - car_width;
    var y_limit = container_height - car_height;
    var safe_y = container_height * 0.4;

    $(document).ready(function () {
        var car_x = parseInt(Math.random() * x_limit);
        car.css("left", car_x);
        init();

        nav_left.on("click tap taphold", function () {
            if (game_over === false && parseInt(car.css("left")) > 0) {
                car.css("left", parseInt(car.css("left")) - 10);
            }
        });

        nav_up.on("click tap taphold", function () {
            if (game_over === false && parseInt(car.css("top")) > 0) {
                car.css("top", parseInt(car.css("top")) - 10);
            }
        });

        nav_right.on("click tap taphold", function () {
            if (game_over === false && parseInt(car.css("left")) < container_width - car_width) {
                car.css("left", parseInt(car.css("left")) + 10);
            }
        });

        nav_down.on("click tap taphold", function () {
            if (game_over === false && parseInt(car.css("top")) < container_height - car_height) {
                car.css("top", parseInt(car.css("top")) + 5);
            }
        });
    });

    function init() {
        var car_1_x = parseInt(Math.random() * x_limit);
        var car_2_x = parseInt(Math.random() * x_limit);
        var car_3_x = parseInt(Math.random() * x_limit);

        var car_1_y = parseInt(safe_y - (Math.random() * y_limit));
        var car_2_y = parseInt(safe_y - (Math.random() * y_limit));
        var car_3_y = parseInt(safe_y - (Math.random() * y_limit));

        car_1.css("left", car_1_x).css("top", car_1_y);
        car_2.css("left", car_2_x).css("top", car_2_y);
        car_3.css("left", car_3_x).css("top", car_3_y);

        if (collision(car_1, car_2) || collision(car_1, car_3) || collision(car_2, car_3)) {
            init();
        }
    }
/* ----------------------------------------------------------------------------------- */
    
    $(document).on("keydown", function (event) {
        if (game_over === false) {
            var key = event.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            }
            else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            }
            else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            }
            else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on("keyup", function (event) {
        if (game_over === false) {
            var key = event.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                b_light_l.css("backgroundColor", "#FF681F").css("boxShadow", "none");
                move_left = false;
            }
            else if (key === 38) {
                cancelAnimationFrame(move_up);
                f_light_l.css("backgroundColor", "#efefef").css("boxShadow", "none");
                f_light_r.css("backgroundColor", "#efefef").css("boxShadow", "none");
                move_up = false;
            }
            else if (key === 39) {
                cancelAnimationFrame(move_right);
                b_light_r.css("backgroundColor", "#FF681F").css("boxShadow", "none");
                move_right = false;
            }
            else if (key === 40) {
                cancelAnimationFrame(move_down);
                b_light_l.css("backgroundColor", "#FF681F").css("boxShadow", "none");
                b_light_r.css("backgroundColor", "#FF681F").css("boxShadow", "none");
                move_down = false;
            }
        }
    });

    function left() {
        if (game_over === false && parseInt(car.css("left")) > 0) {
            car.css("left", parseInt(car.css("left")) - 5);
            b_light_l.css("backgroundColor", "#f00").css("boxShadow", "1px 1px 1px 1px #FF681F");
            move_left = requestAnimationFrame(left);
        }
    }

    function up() {
        if (game_over === false && parseInt(car.css("top")) > 0) {
            car.css("top", parseInt(car.css("top")) - 5);
            f_light_l.css("backgroundColor", "#FFF700").css("boxShadow", "1px 1px 1px 1px #fff");
            f_light_r.css("backgroundColor", "#FFF700").css("boxShadow", "1px 1px 1px 1px #fff");
            move_up = requestAnimationFrame(up);
        }
    }

    function right() {
        if (game_over === false && parseInt(car.css("left")) < container_width - car_width) {
            car.css("left", parseInt(car.css("left")) + 5);
            b_light_r.css("backgroundColor", "#f00").css("boxShadow", "1px 1px 1px 1px #FF681F");
            move_right = requestAnimationFrame(right);
        }
    }

    function down() {
        if (game_over === false && parseInt(car.css("top")) < container_height - car_height) {
            car.css("top", parseInt(car.css("top")) + 5);
            b_light_l.css("backgroundColor", "#f00").css("boxShadow", "1px 1px 1px 1px #FF681F");
            b_light_r.css("backgroundColor", "#f00").css("boxShadow", "1px 1px 1px 1px #FF681F");
            move_down = requestAnimationFrame(down);
        }
    }

    /////////////////////////////////////////////////////////////////////////////////

    anim_id = requestAnimationFrame(repeat);
    function repeat() {
        if (game_over === false) {
            if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
                stop_game();
            }

            score_counter++;

            if (score_counter % counter_pointer == 0) {
                score.text(parseInt(score.text()) + 1);
                counter_pointer--;
            }

            if ((parseInt(score.text()) > 0) && (parseInt(score.text()) % level_counter == 0)) {
                level.text(parseInt(level.text()) + 1);
                level_counter *= 2;
            }

            if (score_counter % score_pointer == 0) {
                speed++;
                line_speed++;
                if (score_pointer > 50) {
                    score_pointer--;
                }
            }

            car_down(car_1);
            car_down(car_2);
            car_down(car_3);

            line_down(line_1);
            line_down(line_2);
            line_down(line_3);
            line_down(line_4);

            anim_id = requestAnimationFrame(repeat);
        }
    }

    function car_down(car) {
        var current_top = parseInt(car.css("top"));
        if (current_top > container_height) {
            current_top = -200;
            var car_left = parseInt(Math.random() * x_limit);
            car.css("left", car_left);
        }
        car.css("top", current_top + speed);
        if (collision(car_1, car_2) || collision(car_1, car_3) || collision(car_2, car_3)) {
            init();
        }
    }
    
    function line_down(line) {
        var current_top = parseInt(line.css("top"));
        if (current_top > container_height) {
            current_top = -300;
        }
        line.css("top", current_top + line_speed);
    }

    function stop_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
    }

    restart_btn.click(function () {
        location.reload();
    });
/* ----------------------------------------------------------------------------------- */

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});