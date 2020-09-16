var dat=Date();
var title=document.title;
var but=document.getElementById("button1");
but.onclick=function(){
  document.getElementById("demo").innerHTML="<h1>" + title +"</h1><br/><h2>" + dat +"</h2>" ;
};