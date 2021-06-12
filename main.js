// ==UserScript==
// @name         ツイキャス設定スクリプト（visitors_notifer）
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Kyon
// @match       https://twitcasting.tv/c:kyoncas/broadcastertool
// @grant        none
// ==/UserScript==

(function() {
    /*******グローバル変数宣言START*******/
    var visitors_sum =0;
    var endflag = 0;
    //visitors_notifer初期処理START
    var pNow = 1, pSum = 1;
    var audioElemN = new Audio();
    audioElemN.src = "http://rouken-komugi.sakura.ne.jp/sound/NewListener.mp3";
    var audioElemC1 = new Audio();
    audioElemC1.src = "http://rouken-komugi.sakura.ne.jp/sound/ComeBack1.mp3";
    var audioElemC2 = new Audio();
    audioElemC2.src = "http://rouken-komugi.sakura.ne.jp/sound/ComeBack2.mp3";
    var audioElemC3 = new Audio();
    audioElemC3.src = "http://rouken-komugi.sakura.ne.jp/sound/ComeBack3.mp3";
    //visitors_notifer初期処理END
    /*******グローバル変数宣言END*******/

    /*******関数宣言START*******/
    // 初回ページロード実行
    var initFunc = function(){
        var message_string;
        var telop_string;
        /*******OS判定で初期値をセットSTART*******/
    　　　 if (navigator.platform.indexOf("MacIntel") != -1) {
	 　　　    message_string =　"🎉初見さん歓迎🎉 しんけんと一緒に雑談しよ？🐇";
     　　　    telop_string = "初見さん💮 雑談🐇";
   　　　  }　else {
	  　　　   message_string =　"🎮初見さん歓迎🎮 ゼルダの伝説 トワイライトプリンセス";
      　　　   telop_string = "初見💮 ゼル伝 トワプリ";
　　 　　　 　}
    　　　 /*******OS判定で初期値をセットEND*******/
    　　　 /*******配信初期設定START*******/
	　　　 document.getElementById( "tool-category-selector" ).value = "boys_healingvoice_jp";
        document.getElementById( "quality" ).value = "super_hq";
	　　　 //開始メッセージ設定
	　　　 var message = window.prompt("開始メッセージを入力してください", message_string);
	　　　 document.getElementById( "notify-message-form" ).value = message;
	　　　 var telop = window.prompt("テロップを入力してください", telop_string);
	　　　 document.getElementById( "telop" ).value = telop;
	　　　 //放送開始時にコメントを投稿checkbox
	　　　 document.getElementById("auto-post").checked = true;
	　　　 //ツイッターにも投稿checkbox
	　　　 document.getElementById("post-to-twitter").checked = true;
	　　　 // 設定ボタンをクリック
	　　　 document.getElementById("btn btn-small").click();
    　　　 /*******配信初期設定END*******/
　　　 }

    //配信開始時初期処理
    var DataSet2 = function(){
		// テロップ設定ボタンをクリック
		document.getElementById("set_subtitle").click();
		document.getElementById( "hashtag" ).value = "#初見さん歓迎";
	    document.getElementById("set_hash_tag").click();
    }

    function Visinoti(){
    　 　　//情報取得
    　 　　var RawData = document.getElementsByClassName("tw-fraction");
    　 　　//加工・格納
    　 　　var now = RawData[0].innerHTML.replace(/<.*?>\/<.*?>\d*/, '' )
    　 　　visitors_sum = RawData[0].innerHTML.replace(/\d<.*?>\/<.*?>/, '' );
    　 　　//音声再生
    　 　　if ( visitors_sum > pSum ){
        　 　　audioElemN.play();
    　 　　} else if ( now > pNow ){
        　 　　var tempR = getRandomInt(2);
        　 　　if(tempR == 0){
            　 　　audioElemC1.play();
        　 　　}else if(tempR == 1){
            　 　　audioElemC2.play();
        　 　　}else{
            　 　　audioElemC3.play();
        　 　　}
    　 　　}
    　//代入
    　pNow = now;
    　pSum = visitors_sum;
　 　　}
　　　 //乱数生成
　　　 function getRandomInt(max) {
　　　 　　　　return Math.floor(Math.random() * Math.floor(max));
　　　 }

    /*******関数宣言END*******/
　 　　/**** 関数実行START ****/
    initFunc();
　   $(document).ajaxComplete(function(){
        if(visitors_sum != 0 && endflag == 0){
        　   DataSet2();
        　   endflag = 1;
        }
	　   Visinoti();
});
　 　　/**** 関数実行END ****/
})();
