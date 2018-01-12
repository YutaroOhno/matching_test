$(document).on ('turbolinks:load', function(){

  function burst(left, right, duration, col1, col2, col3, count){
          const burst = new mojs.Burst({
            left: left,
            top: right,
            radius:   { 0: 300 },
            count:    count,
            children: {
              shape:        'circle',
              radius:       10,
              fill:         [ col1, col2, col3 ],
              strokeWidth:  500,
              duration:     duration,
              delay:     1200
            }
          }).replay();
  }

  //delayを引数としてとると速度が遅くなるので、もう一個。
  function backBurst(left, right, duration, col1, col2, col3, count) {
          const burst = new mojs.Burst({
            left: left,
            top: right,
            radius:   { 0: 200 },
            count:    count,
            children: {
              shape:        'circle',
              radius:       10,
              fill:         [ col1, col2, col3 ],
              strokeWidth:  300,
              duration:     duration,
              delay:     2000
            }
          }).replay();
  }

  var matchingEffect = function(wreaseEffect, textEffect, burstEffect, snowEffect) {
      var leftContent = document.getElementById('left-bg');
      new mojs.Tween({
      　　repeat: 0,
      　　delay: 0,
      　　speed: 0.3,
      　　onUpdate: function(progress) {
      　　　　var bounceProgress = mojs.easing.bounce.out(progress);
      　　　　leftContent.style.transform = 'translateX(' + 800 * bounceProgress + 'px)';
      　　}
      }).play();

      var rightContent = document.getElementById('right-bg');
      new mojs.Tween({
      　　repeat: 0,
      　　delay: 0,
      　　speed: 0.3,
      　　onUpdate: function(progress) {
      　　　　var bounceProgress = mojs.easing.bounce.out(progress);
      　　　　rightContent.style.transform = 'translateX(' + -800 * bounceProgress + 'px)';
      　　}
      }).play();


      setTimeout(function() {
        textEffect();
      }, 1000);

      setTimeout(function() {
        snowEffect();
      }, 500);

      setTimeout(function() {
        wreaseEffect();
      }, 2000);

      setTimeout(function() {
        burstEffect();
      }, 3000);

  }

  function buildHTML(data) {
      var html = `
      <div id="wrap">
      <div id="left-bg">
      <img id="left-avatar" class="user_avatar" src="${data.follower_avatar.url}">
      <div id="left_name" class="user_name">
      ${data.follower_name}
      </div>
      </div>
      <div id="right-bg">
      <img id="right-avatar" class="user_avatar" src="${data.following_avatar.url}">
      <br>
      <div id="right_name" class="user_name">
      ${data.following_name}
      </div>
      </div>
      <img id="wreath" src="/assets/wreath.png">
      </div>
      </div>
      <div id="christmas_message" class="ef">
      Merry Christmas
      </div>
      `

      return html
  }

  var christmasMessage = function() {

    $('#christmas_message').css('opacity', '1');

    $('.ef').textillate({

      // ループのオンオフ、falseの場合、outは発動しない
      loop: false,

      // テキストが置き換えられるまでの表示時間
      minDisplayTime: 2000,

      // 遅延時間
      initialDelay: 0,

      // アニメーションが自動的にスタートするかどうか
      autoStart: true,

      // フェードインのエフェクトの詳細設定
      in: {
        // エフェクトの名前（animate.cssをご参照下さい）
        effect: 'fadeInLeftBig',

        // 遅延時間の指数
        delayScale: 1.5,

        // 文字ごとの遅延時間
        delay: 100,

        // trueにすることでアニメーションをすべての文字に同時に適用される
        sync: false,

        // trueにすることで文字を順番にではなく、ランダムに入ってくるようにする
        // (注：syncがtrueの場合は無効になる)
        shuffle: true
      },

    });
  }

  var startBurst = function() {
      burst(630, 470, 1000, '#ceae7b', 'gold', 'white', 5);
      burst(630, 400, 2000, '#ceae7b', '#e73233', 'white', 10);
      burst(630, 330, 2000, 'orange', '#fcfbe0', 'red', 10);
      burst(730, 470, 1300, '#ceae7b', '#fcfbe0', 'white');
      burst(730, 400, 1900, 'red', '#d0894b', 'white', 7);
      burst(730, 330, 1900, 'orange', '#d5c594', 'white', 7);
      burst(830, 470, 1700, 'white', 'gold', 'orange', 8);
      burst(830, 400, 3000, '#d0894b', 'white', 'red', 11);
      burst(830, 330, 3000, 'red', '#d0894b', 'white', 11);

      //delay
      backBurst(650, 330, 1700, '#fcfbe0', 'gold', 'white', 8);
      backBurst(650, 390, 1700, 'red', '#fcfbe0', 'white', 8);
      backBurst(750, 400, 2000, 'red', 'gold', '#d0894b', 11);
      backBurst(850, 470, 1700, 'white', '#fcfbe0', 'orange', 11);
      backBurst(670, 480, 1700, '#d0894b', 'orange', 'white', 11);
      backBurst(780, 470, 1700, 'red', 'orange', 'gold', 11);
      backBurst(780, 440, 1700, '#ceae7b', 'white', 'red', 11);
      backBurst(850, 330, 1700, '#ceae7b', '#fcfbe0', 'white', 11);

    }


  var animateWreath = function(){
    $('#wreath').animate({opacity: '1'}, 3000);
  }

  var snowEffect = function() {
    $(document).snowfall({
      minSize  : 1,    // 雪の最小サイズ
      maxSize  : 10,    // 雪の最大サイズ
      minSpeed : 1,    // 雪の最低速度
      maxSpeed : 5,    // 雪の最高速度
      round    : true, // 雪の形を丸くする
      shadow   : true, // 雪に影をつける
      flakeColor : "#fff", // 雪の色を指定
    });
  }

  $(".like_form").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){

  if(data.matching) {

    $('body').html("");
    $('body').html(buildHTML(data));

    matchingEffect(animateWreath, christmasMessage, startBurst, snowEffect);

    // christmasMessage(startBurst)



  } else {
    $("#follow_form").html(`<div class="btn btn-default">いいね済</div>`)
  }

    })
    .fail(function(){
      window.alert('テキストを入力するか、画像ファイルを選んでください。');
    })
    return false;
  });

});
