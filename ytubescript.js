// ==UserScript==
// @name        New script - youtube.com
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 4/19/2023, 10:16:01 PM
// ==/UserScript==


window.onload = function(){
  const navbar = document.querySelector('div#masthead-container');
  const button = document.createElement('button')

  button.innerText = 'GATHER DATA!!'
  button.style = "background-color=white; margin-left=10vw;"
  button.onclick = function (){
    data = new Array();
    video_datas = document.querySelectorAll('h3.style-scope.ytd-rich-grid-media');
    video_datas.forEach(gather_data);
    console.log(data);
  }

  navbar.append(button)


  function gather_data(item){
    divided_data = new Map();
    metadata = item.innerHTML;
    ind_start = metadata.indexOf("aria-label");
    ind_end = metadata.indexOf("title=");
    newStr = metadata.substring(ind_start+12, ind_end-2);
    newStr = newStr.replaceAll('&quot;', '\"');
    nesStr = newStr.replaceAll('&amp;', '&');
    title = item.innerText;
    i_title = title.length;
    divided_data.set('title', title);
    string_notitle = newStr.substring(i_title+4).split(" ");
    author = new String();
    date = new String();
    runtime = new String();
    views = new String();
    has_ago = false;
    string_notitle.forEach((str) =>{
      if (isNaN(str) && !(str === "ago") && !(str === "years") && !(str === "seconds") && !(str === "days") && !(str === "minutes,") && !(str === "months")
          && !(str === "views") && !(str === "second") && !(str === "year") && !(str === "day") && !(str === "month") && !(str === "minute,")
          && !(str === "hour,") && !(str === "hours,") && !(str === "hour") && !(str === "hours") && !(str === "minutes") && !(str === "minute")
          && !(str === "weeks"))
      {
        if (author.length == 0)
        {
          author = author.concat(str);
        }
        else if (!has_ago)
        {
          author = author.concat(" " + str);
        }
        else
        {
          views = views.concat(str);
        }
      }
      else
      {
        if (str === "views")
        {

        }
        if (date.indexOf("ago") == -1)
        {
          if (date.length == 0)
          {
            date = date.concat(str);
          }
          else date = date.concat(" " + str);
        }
        else if (runtime.indexOf("second") == -1)
        {
          has_ago = true;
          if (runtime.length == 0)
          {
            runtime = runtime.concat(str);
          }
          else runtime = runtime.concat(" " + str);
        }
        else
        {
          if (views.length == 0)
          {
            views = views.concat(str);
          }
          else views = views.concat(" " + str);
        }
      }

    })
    divided_data.set('author', author);
    divided_data.set('date', date);
    divided_data.set('runtime', runtime);
    divided_data.set('views', views);

    data.push(divided_data);
  }
};